//=============================================================================
// Drag_CustomShop.js
//=============================================================================
/*:
 * @plugindesc Limited merchant inventory, plus possibility to setup random number of object.
 *
 * @author Drag
 *
 * @param Hide Out Of Stock Items
 * @desc Must be set to "true" or "false". If not, default "false" will apply. 
 * @default false
 *
 * @help
 *
 * This plugin will let you setup customized shop with stocks. 
 *
 * Multiple plugin command are provided. See below.
 *
 * ABOUT PLUGIN COMMANDS :
 *
 * Plugin commands parameters between [ ] are optionnal.
 *
 *
 *
 * - setShop
 *
 * This plugin command will let you create a new shop with stocks :
 *
 * customShop setShop typeObject idObject numberItem priceItem
 *
 * typeObject : A string. The type of the object in your database (item, armor,
 * weapon)
 *
 * idObject : A number. The ID of the object in your database.
 *
 * numberItem : A number. The stock of that object the merchant will sell. You 
 * can set a random number between a min-max value by separating two number by
 *  a "-" (but no space). You can also use the keyword "inf" to setup an
 * infinite stock.
 *
 * priceItem : A number. The price of the object.
 *
 * Ex : customShop setShop weapon 1 10 500
 *      customShop setShop item 5 5-10 100
 *
 * You can setup multiple object in the same plugin command by separating 
 * the different object by a ,
 *
 * Ex : customShop setShop item 2 2-5 150, weapon 1 1 300, armor 3 1 500
 *
 * Note : This plugin command does not open a shop, you'll have to use the plugin 
 * command openShop or open a normal shop with the engine command to do so.
 * 
 *
 *
 * - openShop
 *
 * This plugin command will let you open a shop that you have created in 
 * a different event/different map :
 *
 * customShop openShop [mapId eventId]
 *
 * mapId : A number. the map ID in your project where your shop has been 
 * created. If not specified, current map ID will be applied.
 *
 * eventId : A number. the event ID in your project where your shop has been
 * created. If not specified, current event ID will be applied.
 *
 * Ex : customShop openShop
 *      customShop openShop 5 3
 *
 *
 *
 * - setStock 
 *
 * This plugin command will let you setup the number of items sold by the
 * next shop to be open. This will not overwrite stocks of a custom shop 
 * already created. You can also use that plugin command with normal shops.
 *
 * customShop setStock numberItem [numberItem1] [numberItem2] [...]
 *
 * Ex : customShop setStock 5 3 1
 *
 * numberItem : the number of object the shop will sold. You can also use the 
 * keyword "inf" to setup an infinite stock.
 *
 * Note : This plugin command does not open a shop, you'll have to use the plugin 
 * command openShop or open a normal shop with the engine command to do so.
 *
 *
 *
 * - addItem : 
 * 
 * This plugin command will add an item to a specific shop with the specified 
 * stock OR it will increase the item stock if the item is already sold by the 
 * shop.
 *
 * customShop addItem typeObject idObject numberItem priceItem [mapId] [eventId]
 *
 * typeObject : A string. The type of the object in your database (item, armor,
 * weapon)
 *
 * idObject : A number. The ID of the object in your database.
 *
 * numberItem : A number. The stock of that object the merchant will sell. You 
 * can set a random number between a min-max value by separating two number by
 *  a - (but no space). You can also use the keyword "inf" to setup an infinite 
 * stock.
 *
 * priceItem : A number. The price of the object.
 *
 * mapId : A number. the map ID in your project where your shop has been 
 * created. If not specified, current map ID will be applied.
 *
 * eventId : A number. the event ID in your project where your shop has been
 * created. If not specified, current event ID will be applied.
 *
 * Ex : customShop addItem weapon 3 5 500
 *
 *
 *
 * - removeItem :
 *
 * This plugin command will remove an item to the specified shop.
 *
 * customShop removeItem typeObject idObject [mapId] [eventId]
 *
 * typeObject : A string. The type of the object in your database (item, armor,
 * weapon)
 *
 * idObject : A number. The ID of the object in your database.
 *
 * mapId : A number. the map ID in your project where your shop has been 
 * created. If not specified, current map ID will be applied.
 *
 * eventId : A number. the event ID in your project where your shop has been 
 * created. If not specified, current event ID will be applied.
 *
 * Ex : customShop removeItem weapon 3 5
 
 */

var Imported = Imported || {};
Imported.myCustomShop = true;

var Drag = Drag || {};
Drag.pCMD = Drag.pCMD || {};
Drag.customShop = Drag.customShop || {};

(function() {
	
	Drag.customShop.param = PluginManager.parameters('Drag_CustomShop');
	Drag.customShop.hideOutOfStock = Drag.customShop.param["Remove Out Of Stock Items"];
	
	Drag.customShop.goods = [];
	Drag.customShop.currentShop = -1;
	
	//--------------------------------------------------------------------------------------------------------------------------------------------
	//plugin commands
	
	if (!Drag.aliased) {
		var Drag_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
		Game_Interpreter.prototype.pluginCommand = function(command, args) {
			if (Drag.pCMD[command]) {
				Drag.pCMD[command](args, this._eventId, this._mapId);
				return;
			};
			Drag_Game_Interpreter_pluginCommand.call(this, command, args);
		};
		Drag.aliased = true;
	};
	
	Drag.pCMD.customShop = function(args, eventId, mapId) {
		switch (args[0].toLowerCase()) {
			case "setshop": //create a shop, then open it
				if (!Drag.customShop.isCustomShop(mapId, eventId)) { //if shop has not been created yet
					//read args to get item, quantity & price
					let goods = [];
					for (var i = 1; i < args.length; i += 4) {
						let good = Drag.customShop.createGood(args[i], args[i+1], args[i+3], args[i+2])
						//store all good infos
						if (good)
							goods.push(good);
					}
					if (goods.length > 0)
						Drag.customShop.addShop(goods, mapId, eventId);
				}
				Drag.customShop.currentShop = [mapId, eventId];
				SceneManager.push(Scene_Shop);
				break;
			case "openshop": //open a specific shop
				if (args[1] && args[2]) Drag.customShop.currentShop = [parseInt(args[1]), parseInt(args[2])];
				else if (args[1] && !args[2]) Drag.customShop.currentShop = [0, parseInt(args[1])];
				else Drag.customShop.currentShop = [mapId, eventId];
				SceneManager.push(Scene_Shop);
				break;
			case "resetshop": //erase a specific shop
				if (args[1] && args[2]) Drag.customShop.removeShop(args[1], args[2]);
				else Drag.customShop.removeShop(mapId, eventId);
				break;
			case "setid": //set id for the next shop to be open
				Drag.customShop.setId = parseInt(args[1]);
				break;
			case "setstock": //set item quantity for the next shop to be open, do not overwrite an already created shop 
				Drag.customShop.setStock = [];
				for (var i = 1; i < args.length; i++) {
					let stock = args[i].split('-');
					if (stock.length > 1) {
						let rand = Math.floor(Math.random() * (parseInt(stock[1]) - parseInt(stock[0]) + 1) + parseInt(stock[0]));
						Drag.customShop.setStock.push(rand);
					} else {
						Drag.customShop.setStock.push(args[i]);
					}
				}
				break;
			case "additem": //add an item to a specific shop, increase the item stock if the item is already sold by the shop
				let good = Drag.customShop.createGood(args[1], args[2], args[3], args[4]);
				if (good) {
					if (args[5]) mapId = args[5];
					if (args[6]) eventId = args[6];
					if (Drag.customShop.isCustomShop(mapId, eventId)) {
						let goods = Drag.customShop.getGoods(mapId, eventId);
						let index = Drag.customShop.indexOfItem(goods, good[1], good[0]);
						if (index > -1) {
							let quantity = goods[index][4] === "i" || good[4] === "i" || good[4] === "inf" || good[4] === "infinite" ? "i" : good[4] + goods[index][4];
							Drag.customShop.setQuantity(good[1], good[0], quantity, mapId, eventId);
						} else {
							Drag.customShop.addGood(good, mapId, eventId);
						}
					}
				}
				break;
			case "removeitem": //remove an item to a specific shop
				if (args[3]) mapId = args[3];
				if (args[4]) eventId = args[4];
				Drag.customShop.removeGood(args[2], args[1], mapId, eventId);
				break;
			default:
				console.log("customShop: invalid module command : " + args[0]);
				break;
		}
	};
	
	//---------------------------------------------------------------------------------------------------------------------
	//plugin stuff
	
	Drag.customShop.addShop = function(goods, mapId, eventId) {
		if (mapId && eventId) {
			if (!Drag.customShop.goods[mapId]) Drag.customShop.goods[mapId] = [];
			Drag.customShop.goods[mapId][eventId] = goods;
		} else if (Array.isArray(Drag.customShop.currentShop)) {
			if (!Drag.customShop.goods[Drag.customShop.currentShop[0]]) Drag.customShop.goods[Drag.customShop.currentShop[0]] = []; 
			Drag.customShop.goods[Drag.customShop.currentShop[0]][Drag.customShop.currentShop[1]] = goods;
		} else {
			console.log("customShop: error, unable to add custom shop");
		}
	};
	
	Drag.customShop.removeShop = function(mapId, eventId) {
		if (mapId && eventId) {
			if (!Drag.customShop.goods[mapId]) Drag.customShop.goods[mapId] = [];
			Drag.customShop.goods[mapId].splice(eventId, 1);
		} else if (Array.isArray(Drag.customShop.currentShop)) {
			if (!Drag.customShop.goods[Drag.customShop.currentShop[0]]) Drag.customShop.goods[Drag.customShop.currentShop[0]] = []; 
			Drag.customShop.goods[mapId].splice(Drag.customShop.currentShop[1], 1);
		} else {
			console.log("customShop: error, unable to remove custom shop");
		}
	};
	
	Drag.customShop.getGoods = function(mapId, eventId) {
		if (mapId && eventId && Drag.customShop.goods[mapId]) return Drag.customShop.goods[mapId][eventId];
		else if (Array.isArray(Drag.customShop.currentShop) && Drag.customShop.goods[Drag.customShop.currentShop[0]]) return Drag.customShop.goods[Drag.customShop.currentShop[0]][Drag.customShop.currentShop[1]];
		else return [];
	};
	
	Drag.customShop.createGood = function(type, id, price, quantity) {
		let good = [];
		//get good type (item/armor/weapon)
		good[0] = Drag.customShop.getType(type);
		//get good id
		good[1] = parseInt(id) > 0 ? parseInt(id) : false;
		//get good price
		good[2] = 1;
		good[3] = parseInt(price) > -1 ? parseInt(price) : -1;
		//get good quantity
		if (quantity === "i" || quantity === "inf" || quantity === "infinite") {
			good[4] = "i";
		} else {
			let nb = quantity.toString().split('-').length > 1 ? Math.floor(Math.random() * (parseInt(quantity.split('-')[1]) - parseInt(quantity.split('-')[0]) + 1) + parseInt(quantity.split('-')[0])) : parseInt(quantity);
			good[4] = !(Drag.customShop.hideOutOfStock && parseInt(nb) < 1) && !isNaN(nb) ? nb : -1;
		}
		return good[0] !== -1 && good[1] && good[3] !== -1 && good[4] !== -1 ? good : false;
	};
	
	Drag.customShop.getType = function(type) {
		if (type.itypeId) return 0;
		if (type.wtypeId) return 1;
		if (type.atypeId) return 2;
		switch (type) {
			case "item" || 0:
				return 0;
				break;
			case "weapon" || 1:
				return 1;
				break;
			case "armor" || 2:
				return 2;
				break;
			default:
				return -1;
				break;
		}
	};
	
	Drag.customShop.addGood = function(good, mapId, eventId) {
		let goods = Drag.customShop.getGoods(mapId, eventId);		
		goods.push(good);
		// this._shopGoods.push(good);
	};
	
	Drag.customShop.removeGood = function(id, type, mapId, eventId) {
		if (Drag.customShop.isCustomShop(mapId, eventId)) {
			let goods = Drag.customShop.getGoods(mapId, eventId);
			type = Drag.customShop.getType(type);
			let index = Drag.customShop.indexOfItem(goods, id, type);
			goods.splice(index, 1);
		}
	};
	
	Drag.customShop.setQuantity = function(id, type, number, mapId, eventId) {
		let goods = Drag.customShop.getGoods(mapId, eventId);
		let index = Drag.customShop.indexOfItem(goods, id, type);
		if (index > -1) {
			if (Drag.customShop.hideOutOfStock && parseInt(number) === 0) {
				goods.splice(index, 1);
			} else if (number === "i" || number === "inf" || number === "infinite") {
				goods[index][4] = "i";
			} else if (parseInt(number) > -1) {
				goods[index][4] = parseInt(number);
			}
		}
	};
	
	Drag.customShop.indexOfItem = function(goods, id, type) {
		for (let i = 0; i < goods.length; i++) {
			if (goods[i][0] == type && goods[i][1] == id) {
				return i;
			}
		}
		return -1;
	};
	
	Drag.customShop.isCustomShop = function(mapId, eventId) {
		if (!Array.isArray(Drag.customShop.currentShop) && !mapId && !eventId) return false;
		if (!mapId) mapId = Drag.customShop.currentShop[0];
		if (!eventId) eventId = Drag.customShop.currentShop[1];
		if (!Array.isArray(Drag.customShop.goods)) return false;
		if (!Drag.customShop.goods[mapId]) return false;
		if (!Drag.customShop.goods[mapId][eventId]) return false;
		return true;
	};
	
	//--------------------------------------------------------------------------------------------------------------------------------------------
	//Game Interpreter
	
	Drag_Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
	Game_Interpreter.prototype.command302 = function() {
		Drag.customShop.currentShop = [this._mapId, this._eventId];
		Drag_Game_Interpreter_command302.call(this);
	};

	
	//--------------------------------------------------------------------------------------------------------------------------------------------
	//Window ShopBuy
	
	Window_ShopBuy.prototype.makeItemList = function() {
		this._quantity = [];
		this._data = [];
		this._price = [];
		this._shopGoods.forEach(goods => {
			let item = null;
			switch (goods[0]) {
				case 0:
					item = $dataItems[goods[1]];
					break;
				case 1:
					item = $dataWeapons[goods[1]];
					break;
				case 2:
					item = $dataArmors[goods[1]];
					break;
			}
			if (item) {
				this._data.push(item);
				this._price.push(goods[2] === 0 ? item.price : goods[3]);
				this._quantity.push(goods[4]);
			}
		}, this);
	};
	
	Window_ShopBuy.prototype.isEnabled = function(item) {
		return (item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item) && this.isInStock(item));
	};
	
	Window_ShopBuy.prototype.windowWidth = function() {
		return 1000;
	};
	
	Window_ShopBuy.prototype.quantity = function(item) {
		return this._quantity[this._data.indexOf(item)] || 0;
	};
	
	Window_ShopBuy.prototype.isInStock = function(item) {
		let quantity = this.quantity(item);
		return quantity === "i" || quantity > 0;
	};
	
	Window_ShopBuy.prototype.setQuantity = function(item, number) { 
		if (this._data.indexOf(item) > -1) {
			this._quantity[this._data.indexOf(item)] = number;
			let type = Drag.customShop.getType(item);
			Drag.customShop.setQuantity(item.id, type, number);
		} else {
			let good = Drag.customShop.createGood(item, item.id, item.price, number);
			if (good)
				Drag.customShop.addGood(good, number);
		}
	};
	
	Window_ShopBuy.prototype.drawItem = function(index) {
		var item = this._data[index];
		var rect = this.itemRect(index);
		var priceWidth = 96;
		var numberWidth = 96;
		rect.width -= this.textPadding();
		this.changePaintOpacity(this.isEnabled(item));
		this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth - numberWidth); //item, x, y, maxwidth
		if (this.quantity(item) === "i")
			this.drawText("∞", rect.x + rect.width - priceWidth - numberWidth, rect.y, numberWidth, 'middle'); //item, x, y, maxwidth, align
		else 
			this.drawText(this.quantity(item), rect.x + rect.width - priceWidth - numberWidth, rect.y, numberWidth, 'middle'); //item, x, y, maxwidth, align
		this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right'); //item, x, y, maxwidth, align
		this.changePaintOpacity(true);
	};
	
	//---------------------------------------------------------------------------------------------------------------------------------------------
	//Scene_Shop
	
	Drag_Scene_Shop_CreateBuyWindow = Scene_Shop.prototype.createBuyWindow;
	Scene_Shop.prototype.createBuyWindow = function() {
		this.setupShop();
		Drag_Scene_Shop_CreateBuyWindow.call(this);
	};
	
	Scene_Shop.prototype.setupShop = function() {
		Drag.customShop.currentShop = Drag.customShop.setId ? [0, Drag.customShop.setId] : Drag.customShop.currentShop;
		if (Drag.customShop.isCustomShop()) {
			this._goods = Drag.customShop.getGoods();
		} else if (this._goods) {
			Drag.customShop.addShop(this._goods);
			if (Array.isArray(Drag.customShop.setStock)) {
				for (let i = 0; i < Drag.customShop.setStock.length && i < this._goods.length; i++) {
					Drag.customShop.setQuantity(this._goods[i][1], this._goods[i][0], Drag.customShop.setStock[i]);				
				}
			}
		} else {
			this._goods = [];
			goods = [];
		}
		Drag.customShop.setStock = null;
		Drag.customShop.setId = null;
	}
	
	Scene_Shop.prototype.maxBuy = function() {
		let quantity = this.itemQuantity() === "i" ? $gameParty.maxItems(this._item) : this.itemQuantity();
		let max = Math.min($gameParty.maxItems(this._item) - $gameParty.numItems(this._item), quantity);
		let price = this.buyingPrice();
		if (price > 0) {
			return Math.min(max, Math.floor(this.money() / price));
		} else {
			return max;
		}
	};
	
	Scene_Shop.prototype.itemQuantity = function() {
		return this._buyWindow.quantity(this._item);
	};
	
	Scene_Shop.prototype.loseQuantity = function(number) {
		if (this.itemQuantity() !== "i")
			this._buyWindow.setQuantity(this._item, this.itemQuantity() - number);
	};
	
	Scene_Shop.prototype.gainQuantity = function(number) {
		if (this.itemQuantity() !== "i")
			this._buyWindow.setQuantity(this._item, this.itemQuantity() + number);
	};
	
	var Drag_Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number) {
		this.loseQuantity(number);
		Drag_Scene_Shop_doBuy.apply(this, arguments);
	};
	
	var Drag_Scene_Shop_doSell = Scene_Shop.prototype.doSell;
	Scene_Shop.prototype.doSell = function(number) {
		this.gainQuantity(number);
		Drag_Scene_Shop_doSell.apply(this, arguments);
	};
	
	Drag_Scene_Shop_terminate = Scene_Shop.prototype.terminate;
	Scene_Shop.prototype.terminate = function() {
		Drag_Scene_Shop_terminate.call(this);
		Drag.customShop.currentShop = -1;
	};

})();