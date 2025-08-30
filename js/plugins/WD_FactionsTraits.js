//=============================================================================
// Plugin Name: Factions, Relationship and Traits manager
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Manages Factions, Relationship and Traits
// Use: Feel free to use for private and commercial projects once obtained from itch.io or Ko-Fi
//=============================================================================

/*:
 * @plugindesc Manages Factions, Relationship and Traits
 * @target MZ
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param buttonFlag
 * @text Show Menu Command
 * @type boolean
 * @desc Show a command to open the Scene?
 * @default true
 *
 * @param ButtonName
 * @text Menu Command Name
 * @desc The text displayed on the menu command.
 * @default Status
 *
 * @param FactionsName
 * @text Tab 1 Name
 * @desc The text displayed on the Factions tab.
 * @default Factions
 *
 * @param RelationshipsName
 * @text Tab 2 Name
 * @desc The text displayed on the Relationships tab.
 * @default Relationships
 *
 * @param TraitsName
 * @text Tab 3 Name
 * @desc The text displayed on the Traits tab.
 * @default Traits
 *
 * @param tab4Name
 * @text Tab 4 Name
 * @desc The text displayed on the 4th tab.
 * @default Tab4
 *
 * @param tab5Name
 * @text Tab 5 Name
 * @desc The text displayed on the 5th tab.
 * @default Tab5
 *
 * @param tabsCount
 * @text Number of Tabs
 * @type number
 * @desc How many tabs to use?
 * @default 3
 * @min 1
 * @max 5
 *
 * @command callScene
 * @text Call Factions scene
 * @desc Calls the plugin scene.
 * 
 * @command showMenuCommand
 * @text Show plugin command in menu?
 * @desc Decide if you want to show the plugin command in the game menu.
 * 
 * @arg newButtonFlag
 * @text Show command?
 * @desc Decide if you want to show the plugin command in the game menu.
 * @type boolean
 * @default true
 * 
 * @command ChangeMenuButtonName
 * @text Set Menu Command Name
 * @desc Changes the name of the menu command.
 * 
 * @arg NewButtonName
 * @text New Menu Command Name
 * @desc The new name to set for the menu command.
 * @type text
 * 
 * @command ChangeFactionsName
 * @text Set Tab1 Name
 * @desc Changes the name of the Tab 1 (Factions by Default).
 * 
 * @arg NewFactionsName
 * @text New Tab1 Name
 * @desc The new name to set for the Tab 1 (Factions by Default).
 * @type text
 * 
 * @command ChangeRelationshipsName
 * @text Set Tab2 Name
 * @desc Changes the Tab 2 (Relationships by Default).
 * 
 * @arg NewRelationshipsName
 * @text New Tab2 Name
 * @desc The new name to set for the Tab 2 (Relationships by Default).
 * @type text
 * 
 * @command ChangeTraitsName
 * @text Set Tab3 Name
 * @desc Changes the Tab 3 (Traits by Default).
 * 
 * @arg NewTraitsName
 * @text New Tab3 Name
 * @desc The new name to set for the Tab 3 (Traits by Default).
 * @type text
 *
 * @command ChangeTab4Name
 * @text Set Tab4 Name
 * @desc Changes the Tab 4.
 * 
 * @arg NewTab4Name
 * @text New Tab4 Name
 * @desc The new name to set for the Tab 4.
 * @type text
 *
 * @command ChangeTab5Name
 * @text Set Tab5 Name
 * @desc Changes the Tab 5.
 * 
 * @arg NewTab5Name
 * @text New Tab5 Name
 * @desc The new name to set for the Tab 5.
 * @type text
 *
 * @help WD_FactionsTraits.js
 *
 * You can call this plugin either by enabling a new command in the
 * game menu, by calling it via Plugin Command or manually using the
 * script call SceneManager.push(Scene_WDFactions);
 *
 * This will open the Scene that contains from 1 to 5 tabs based on 
 * your Plugin Parameter preferences (default value is 3 tabs named 
 * Factions, Relationships and Traits). You can rename the tabs both
 * via Parameters or Plugin Commands
 * 
 * To show the elements in the proper tab you need to edit the Note 
 * field of the item using the following rules:
 * - You can use the format <Tab1Item: true>, change the number with 
 *   the corresponding Tab
 * - You can use the format <(Tab Name)Item: true>, for example if
 *   the Tab name is Factions it will be <FactionsItem: true> 
 * Both tagging method works, you can tag an item multiple times.
 * The plugin will suppress those items in the standard Rpg Maker MZ 
 * inventory window.
 *
 * Possible Compatibility Issues: The plugin alters the Window_ItemList.prototype.includes
 * function to suppress plugin items. Any other plugin that needs his own code for 
 * Window_ItemList.prototype.includes won't work. Contact me to make a compatibility fix.
 * Other plugins that modify the Inventory, but uses a non-modified includes function, 
 * should work without problems
 *
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 *
 * //////////////////////////////////////////////////
 * VERSION 2.0 Changelog
 * - Code totally reworked from scratch but kept retrocompatible with 1.0
 * - Added missing save functionality, v1.0 plugin would forget the changes to
 *   the commands names if done via plugin command
 * - Added the possibility to select from 1 to 5 tabs instead of using only 3,
 *   the plugin will auto-align the commands (or hide the command window if only
 *   1 tab is used)
 * VERSION 1.0 Changelog
 * - Initial Release
 * //////////////////////////////////////////////////
 */
 
!function(){const t=PluginManager.parameters("WD_FactionsTraits");let e="true"===t.buttonFlag,n=String(t.ButtonName||"Status"),i=String(t.FactionsName||"Factions"),a=String(t.RelationshipsName||"Relationships"),s=String(t.TraitsName||"Traits"),o=String(t.tab4Name||"Tab4"),r=String(t.tab5Name||"Tab5"),c=parseInt(t.tabsCount||3),h=0,d=[],p=-1;const m=Window_MenuCommand.prototype.addOriginalCommands;Window_MenuCommand.prototype.addOriginalCommands=function(){m.call(this),y(),e&&this.addCommand(n,"WD_Factions",!0)};const u=Scene_Menu.prototype.createCommandWindow;function l(){this.initialize(...arguments)}function b(){this.initialize(...arguments)}function w(){this.initialize(...arguments)}function W(){this.initialize(...arguments)}function g(t){const e=$gameParty.items(),n=t+"Item";let c,h=[],p=[];switch(t){case"Tab1":c=i+"Item";break;case"Tab2":c=a+"Item";break;case"Tab3":c=s+"Item";break;case"Tab4":c=o+"Item";break;case"Tab5":c=r+"Item";break;default:return console.error("Unexpected argument at getTabElements in WD_Factions"),0}for(const t of e)!t.meta.hasOwnProperty(n)||"true"!==t.meta[n]&&" true"!==t.meta[n]||(p.push(t),h.push(t.id)),!t.meta.hasOwnProperty(c)||"true"!==t.meta[c]&&" true"!==t.meta[c]||h.includes(t.id)||p.push(t);return d=p,p.length}function _(t){const e=[i+"Item",a+"Item",s+"Item",o+"Item",r+"Item","Tab1Item","Tab2Item","Tab3Item","Tab4Item","Tab5Item"];let n=!1;for(const i of e){(c=i,!(!t.meta.hasOwnProperty(c)||"true"!==t.meta[c]&&" true"!==t.meta[c]))&&(n=!0)}var c;return!n}function f(){let t=[];t.push(n),t.push(i),t.push(a),t.push(s),t.push(o),t.push(r),t.push(c),t.push(e),$gameSystem.savearrayWDfactionsSaveParameters(t)}function y(){const t=$gameSystem.getarrayWDfactionsSaveParameters();n=t[0],i=t[1],a=t[2],s=t[3],o=t[4],r=t[5],c=t[6],e=t[7]}Scene_Menu.prototype.createCommandWindow=function(){u.call(this),y(),e&&this._commandWindow.setHandler("WD_Factions",this.commandWDfactions.bind(this))},Scene_Menu.prototype.commandWDfactions=function(){SceneManager.push(l)},l.prototype=Object.create(Scene_MenuBase.prototype),l.prototype.constructor=l,l.prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},l.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),y(),c>1&&this.createTabsWindow(),this.createElementsWindow(),this.createDescriptionWindow(),1===c&&(h=1,this._elementsWindow.wakeUp())},l.prototype.createTabsWindow=function(){const t=this.tabsWindowRect();this._tabsWindow=new b(t),this._tabsWindow.setHandler("tab1",this.onTabs1Ok.bind(this)),this._tabsWindow.setHandler("tab2",this.onTabs2Ok.bind(this)),this._tabsWindow.setHandler("tab3",this.onTabs3Ok.bind(this)),this._tabsWindow.setHandler("tab4",this.onTabs4Ok.bind(this)),this._tabsWindow.setHandler("tab5",this.onTabs5Ok.bind(this)),this._tabsWindow.setHandler("cancel",this.onTabsCancel.bind(this)),this.addWindow(this._tabsWindow)},l.prototype.tabsWindowRect=function(){const t=.1*Graphics.boxWidth,e=.1*Graphics.boxHeight,n=.8*Graphics.boxWidth,i=.13*Graphics.boxHeight;return new Rectangle(t,e,n,i)},l.prototype.onTabs1Ok=function(){h=1,0===g("Tab1")?(this._elementsWindow.deactivate(),this._tabsWindow.activate()):this._elementsWindow.wakeUp()},l.prototype.onTabs2Ok=function(){h=2,0===g("Tab2")?(this._elementsWindow.deactivate(),this._tabsWindow.activate()):this._elementsWindow.wakeUp()},l.prototype.onTabs3Ok=function(){h=3,0===g("Tab3")?(this._elementsWindow.deactivate(),this._tabsWindow.activate()):this._elementsWindow.wakeUp()},l.prototype.onTabs4Ok=function(){h=4,0===g("Tab4")?(this._elementsWindow.deactivate(),this._tabsWindow.activate()):this._elementsWindow.wakeUp()},l.prototype.onTabs5Ok=function(){h=5,0===g("Tab5")?(this._elementsWindow.deactivate(),this._tabsWindow.activate()):this._elementsWindow.wakeUp()},l.prototype.onTabsCancel=function(){this.popScene()},l.prototype.createElementsWindow=function(){const t=this.elementsWindowRect();this._elementsWindow=new w(t),this._elementsWindow.setHandler("ok",this.onElementsOk.bind(this)),this._elementsWindow.setHandler("cancel",this.onElementsCancel.bind(this)),this.addWindow(this._elementsWindow)},l.prototype.elementsWindowRect=function(){const t=.1*Graphics.boxWidth,e=c>1?.23*Graphics.boxHeight:.1*Graphics.boxHeight,n=.8*Graphics.boxWidth,i=c>1?.47*Graphics.boxHeight:.6*Graphics.boxHeight;return new Rectangle(t,e,n,i)},l.prototype.onElementsOk=function(){if(null!==this._elementsWindow._selectedItem){const t=this._elementsWindow._selectedItem;let e=!1;for(const n of t.effects)n.hasOwnProperty("code")&&44===n.code&&($gameTemp.reserveCommonEvent(n.dataId),e=!0);this._elementsWindow._selectedItem=null,e?(this.popScene(),SceneManager.goto(Scene_Map)):this._elementsWindow.activate()}else this._elementsWindow.activate()},l.prototype.onElementsCancel=function(){1!==c?(this._elementsWindow.deactivate(),h=0,this._elementsWindow.wakeUp(),this._tabsWindow.activate()):this.popScene()},l.prototype.createDescriptionWindow=function(){const t=this.WDFdescriptionWindowRect();this._WDFdescriptionWindow=new W(t),this.addWindow(this._WDFdescriptionWindow)},l.prototype.WDFdescriptionWindowRect=function(){const t=.1*Graphics.boxWidth,e=.7*Graphics.boxHeight,n=.8*Graphics.boxWidth,i=.15*Graphics.boxHeight;return new Rectangle(t,e,n,i)},SceneManager.Scene_WDFactions=l,b.prototype=Object.create(Window_HorzCommand.prototype),b.prototype.constructor=b,b.prototype.initialize=function(t){Window_HorzCommand.prototype.initialize.call(this,t)},b.prototype.maxCols=function(){return c},b.prototype.makeCommandList=function(){this.addCommand(i,"tab1",!0),this.addCommand(a,"tab2",!0),c>2&&this.addCommand(s,"tab3",!0),c>3&&this.addCommand(o,"tab4",!0),c>4&&this.addCommand(r,"tab5",!0)},w.prototype=Object.create(Window_Selectable.prototype),w.prototype.constructor=w,w.prototype.initialize=function(t){Window_Selectable.prototype.initialize.call(this,t),this._index=-1,this._cursorFixed=!1,this._cursorAll=!1,this._helpWindow=null,this._handlers={},this._doubleTouch=!1,this._canRepeat=!0,this._selectedItem=null,this.deactivate()},w.prototype.maxItems=function(){switch(h){case 0:return 0;case 1:return g("Tab1");case 2:return g("Tab2");case 3:return g("Tab3");case 4:return g("Tab4");case 5:return g("Tab5");default:return 0}},w.prototype.processOk=function(){if(this.isCurrentItemEnabled()){if(d.length>0){const t=this._index;this._selectedItem=d[t]}this.playOkSound(),this.updateInputData(),this.deactivate(),this.callOkHandler()}else this.playBuzzerSound()},w.prototype.drawItem=function(t){const e=d[t].iconIndex,n=d[t].name,i=this.itemRect(t);this.drawIcon(e,i.x+2,i.y+4),this.drawTextEx(n,i.x+50,i.y,i.width)},w.prototype.wakeUp=function(){const t=function(){switch(h){case 0:return"None";case 1:return"Tab1";case 2:return"Tab2";case 3:return"Tab3";case 4:return"Tab4";case 5:return"Tab5";default:return"None"}}();"None"===t?(this.contents&&(this.contents.clear(),this.contentsBack.clear()),this._index=-1,this.deactivate()):(g(t),this.paint(),this.select(0),this.activate(),SceneManager._scene._WDFdescriptionWindow.loadDesc())},w.prototype.update=function(){this.processCursorMove(),this.processHandling(),this.processTouch(),Window_Scrollable.prototype.update.call(this),this._index!==p&&(p=this._index,SceneManager._scene._WDFdescriptionWindow.refresh())},W.prototype=Object.create(Window_Base.prototype),W.prototype.constructor=W,W.prototype.initialize=function(t){Window_Base.prototype.initialize.call(this,t),this.loadDesc()},W.prototype.loadDesc=function(){const t=SceneManager._scene._elementsWindow._index;if(-1!==t&&d.length>0){const e=d[t].description;let n,i=28,a=!0;for(;a;)this.contents.fontSize=i,(n=this.textSizeExNoReset(e)).width>this.contentsWidth()||n.height>this.contentsHeight()?--i<6&&(a=!1):a=!1;const s=(this.contentsHeight()-n.height)/2;this.drawText(e,0,s,this.contentsWidth(),"center")}else this.contents.clear()},W.prototype.refresh=function(){this.contents.clear(),this.loadDesc()},W.prototype.textSizeExNoReset=function(t){const e=this.createTextState(t,0,0,0);return e.drawing=!1,this.processAllText(e),{width:e.outputWidth,height:e.outputHeight}},Window_ItemList.prototype.includes=function(t){switch(this._category){case"item":return DataManager.isItem(t)&&1===t.itypeId&&_(t);case"weapon":return DataManager.isWeapon(t)&&_(t);case"armor":return DataManager.isArmor(t)&&_(t);case"keyItem":return DataManager.isItem(t)&&2===t.itypeId&&_(t);default:return!1}},Game_System.prototype.savearrayWDfactionsSaveParameters=function(t){this._arrayWDfactionsSaveParameters=t},Game_System.prototype.getarrayWDfactionsSaveParameters=function(){if(!this._arrayWDfactionsSaveParameters){const e="true"===t.buttonFlag;return[String(t.ButtonName||"Status"),String(t.FactionsName||"Factions"),String(t.RelationshipsName||"Relationships"),String(t.TraitsName||"Traits"),String(t.tab4Name||"Tab4"),String(t.tab5Name||"Tab5"),parseInt(t.tabsCount||3),e]}return this._arrayWDfactionsSaveParameters},PluginManager.registerCommand("WD_FactionsTraits","callScene",function(t){SceneManager.push(l)}),PluginManager.registerCommand("WD_FactionsTraits","showMenuCommand",function(t){e="true"===t.newButtonFlag,f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeMenuButtonName",function(t){n=String(t.NewButtonName),f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeFactionsName",function(t){i=String(t.NewFactionsName),f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeRelationshipsName",function(t){a=String(t.NewRelationshipsName),f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeTraitsName",function(t){s=String(t.NewTraitsName),f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeTab4Name",function(t){o=String(t.NewTab4Name),f()}),PluginManager.registerCommand("WD_FactionsTraits","ChangeTab5Name",function(t){r=String(t.NewTab5Name),f()})}();