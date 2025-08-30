/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/vehicleencounters/
 * @target MZ
 * @plugindesc Allows you to have encounters while on a vehicle
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Description: This plugin lets you have encounters on the boat, ship, and
 * airship. It allows for custom encounter steps, battlebacks, and encounter
 * lists per vehicle.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * ✓ You should be able to add this plugin to a saved game
 * ✓ You can modify plugin parameters and have them reflected in saved games
 * ✓ You can remove this plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * This plugin's JS filename MUST remain CGMZ_VehicleEncounters.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version brings the code up to modern [CGMZ] standards.
 * In doing so, some small optimizations were made by pre-processing the plugin
 * parameters a bit more.
 *
 * Version 1.0.2:
 * - Small code optimization
 * 
 * @param Boat Options
 * @param Ship Options
 * @param Airship Options
 *
 * @param Boat Encounters
 * @type troop[]
 * @default []
 * @parent Boat Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Boat Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Boat Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Boat Battleback1
 * @type file
 * @dir img/battlebacks1
 * @default 
 * @parent Boat Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Boat Battleback2
 * @type file
 * @dir img/battlebacks2
 * @default 
 * @parent Boat Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Boat Encounter Switch
 * @type switch
 * @parent Boat Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
 *
 * @param Ship Encounters
 * @type troop[]
 * @default []
 * @parent Ship Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Ship Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Ship Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Ship Battleback1
 * @type file
 * @dir img/battlebacks1
 * @parent Ship Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Ship Battleback2
 * @type file
 * @dir img/battlebacks2
 * @parent Ship Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Ship Encounter Switch
 * @type switch
 * @parent Ship Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
 *
 * @param Airship Encounters
 * @type troop[]
 * @default []
 * @parent Airship Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Airship Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Airship Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Airship Battleback1
 * @type file
 * @dir img/battlebacks1
 * @parent Airship Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Airship Battleback2
 * @type file
 * @dir img/battlebacks2
 * @parent Airship Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Airship Encounter Switch
 * @type switch
 * @parent Airship Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/vehicleencounters/
 * @target MZ
 * @plugindesc Te permite tener encuentros mientras se está en un vehículo
 * @help
 * ============================================================================
 * Para terminos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Descripción: Este plugin te permite tener encuentros en el bote, el barco y
 * dirigible. Permite pasos de encuentro personalizados, batallas y listas de 
 * encuentros por vehículo.
 * ----------------------------------------------------------------------------
 * Documentación:
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * ✓ You should be able to add this plugin to a saved game
 * ✓ You can modify plugin parameters and have them reflected in saved games
 * ✓ You can remove this plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * This plugin's JS filename MUST remain CGMZ_VehicleEncounters.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version brings the code up to modern [CGMZ] standards.
 * In doing so, some small optimizations were made by pre-processing the plugin
 * parameters a bit more.
 *
 * Version 1.0.2:
 * - Small code optimization
 * 
 * @param Boat Options
 * @text Opciones de Bote
 * @param Ship Options
 * @text Opciones de Barco
 * @param Airship Options
 * @text Opciones de Dirigible
 *
 * @param Boat Encounters
 * @text Encuentros de Bote
 * @type troop[]
 * @default []
 * @parent Boat Options
 * @desc ID de tropas que el vehículo puede encontrar. Dejar esto vacío significa que no hay encuentros.
 *
 * @param Boat Encounter Steps
 * @text Pasos de encuentro en bote
 * @type number
 * @min 1
 * @default 60
 * @parent Boat Options
 * @desc Promedio de pasos antes del encuentro en este vehículo.
 *
 * @param Boat Battleback1
 * @text Contrabatalla de Botes1
 * @type file
 * @dir img/battlebacks1
 * @parent Boat Options
 * @desc Contrabatalla 1 para usar en encuentros en este vehículo.
 
 * @param Boat Battleback2
 * @text Contrabatalla de Botes2
 * @type file
 * @dir img/battlebacks2
 * @parent Boat Options
 * @desc Contrabatalla 2 para usar en encuentros en este vehículo.
 *
 * @param Boat Encounter Switch
 * @text Interruptor de encuentro con bote
 * @type switch
 * @parent Boat Options
 * @default 0
 * @desc Interruptor que enciende/apaga los encuentros en este vehículo.
 *
 * @param Ship Encounters
 * @text Encuentros de Barco
 * @type troop[]
 * @default []
 * @parent Ship Options
 * @desc ID de tropas que el vehículo puede encontrar. Dejar esto vacío significa que no hay encuentros.
 *
 * @param Ship Encounter Steps
 * @text Pasos de encuentro de barcos
 * @type number
 * @min 1
 * @default 60
 * @parent Ship Options
 * @desc Promedio de pasos antes del encuentro en este vehículo.
 *
 * @param Ship Battleback1
 * @text Contrabatalla de Barcos1
 * @type file
 * @dir img/battlebacks1
 * @parent Ship Options
 * @desc Contrabatalla 1 para usar en encuentros en este vehículo.
 
 * @param Ship Battleback2
 * @text Contrabatalla de Barcos2
 * @type file
 * @dir img/battlebacks2
 * @parent Ship Options
 * @desc Contrabatalla 2 para usar en encuentros en este vehículo.
 *
 * @param Ship Encounter Switch
 * @text Interruptor de encuentro de barcos
 * @type switch
 * @parent Ship Options
 * @default 0
 * @desc Interruptor que enciende/apaga los encuentros en este vehículo.
 *
 * @param Airship Encounters
 * @text Encuentros de aeronaves
 * @type troop[]
 * @default []
 * @parent Airship Options
 * @desc ID de tropas que el vehículo puede encontrar. Dejar esto vacío significa que no hay encuentros.
 *
 * @param Airship Encounter Steps
 * @text Pasos de encuentro de dirigible
 * @type number
 * @min 1
 * @default 60
 * @parent Airship Options
 * @desc Promedio de pasos antes del encuentro en este vehículo.
 *
 * @param Airship Battleback1
 * @text Contrabatalla de Dirigibles1
 * @type file
 * @dir img/battlebacks1
 * @parent Airship Options
 * @desc Contrabatalla 1 para usar en encuentros en este vehículo.
 
 * @param Airship Battleback2
 * @text Contrabatalla de Dirigibles2
 * @type file
 * @dir img/battlebacks2
 * @parent Airship Options
 * @desc Contrabatalla 2 para usar en encuentros en este vehículo.
 *
 * @param Airship Encounter Switch
 * @text Interruptor de encuentro de dirigible
 * @type switch
 * @parent Airship Options
 * @default 0
 * @desc Interruptor que enciende/apaga los encuentros en este vehículo.
*/
Imported.CGMZ_VehicleEncounters = true;
CGMZ.Versions["Vehicle Encounters"] = "1.0.2";
CGMZ.VehicleEncounters = {};
CGMZ.VehicleEncounters.parameters = PluginManager.parameters('CGMZ_VehicleEncounters');
CGMZ.VehicleEncounters.BoatEncounters = CGMZ_Utils.parseJSON(CGMZ.VehicleEncounters.parameters["Boat Encounters"], [], "[CGMZ] Vehicle Encounters", "Your Boat Encounters parameter did not have valid JSON and could not be read.").map(x => Number(x));
CGMZ.VehicleEncounters.ShipEncounters = CGMZ_Utils.parseJSON(CGMZ.VehicleEncounters.parameters["Ship Encounters"], [], "[CGMZ] Vehicle Encounters", "Your Ship Encounters parameter did not have valid JSON and could not be read.").map(x => Number(x));
CGMZ.VehicleEncounters.AirshipEncounters = CGMZ_Utils.parseJSON(CGMZ.VehicleEncounters.parameters["Airship Encounters"], [], "[CGMZ] Vehicle Encounters", "Your Airship Encounters parameter did not have valid JSON and could not be read.").map(x => Number(x));
CGMZ.VehicleEncounters.BoatEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Boat Encounter Steps"]);
CGMZ.VehicleEncounters.ShipEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Ship Encounter Steps"]);
CGMZ.VehicleEncounters.AirshipEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Airship Encounter Steps"]);
CGMZ.VehicleEncounters.BoatEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Boat Encounter Switch"]);
CGMZ.VehicleEncounters.ShipEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Ship Encounter Switch"]);
CGMZ.VehicleEncounters.AirshipEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Airship Encounter Switch"]);
CGMZ.VehicleEncounters.BoatBattleback1 = CGMZ.VehicleEncounters.parameters["Boat Battleback1"];
CGMZ.VehicleEncounters.BoatBattleback2 = CGMZ.VehicleEncounters.parameters["Boat Battleback2"];
CGMZ.VehicleEncounters.ShipBattleback1 = CGMZ.VehicleEncounters.parameters["Ship Battleback1"];
CGMZ.VehicleEncounters.ShipBattleback2 = CGMZ.VehicleEncounters.parameters["Ship Battleback2"];
CGMZ.VehicleEncounters.AirshipBattleback1 = CGMZ.VehicleEncounters.parameters["Airship Battleback1"];
CGMZ.VehicleEncounters.AirshipBattleback2 = CGMZ.VehicleEncounters.parameters["Airship Battleback2"];
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Update to check if vehicle interior map should be called, encounters in vehicle
//=============================================================================
//-----------------------------------------------------------------------------
// Make encounter count (avg steps differ based on vehicle)
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
Game_Player.prototype.makeEncounterCount = function() {
	const n = this.isInBoat()*CGMZ.VehicleEncounters.BoatEncounterSteps +
			this.isInShip()*CGMZ.VehicleEncounters.ShipEncounterSteps +
			this.isInAirship()*CGMZ.VehicleEncounters.AirshipEncounterSteps;
    if(n > 0) {
		this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
	} else {
		alias_CGMZ_VehicleEncounters_makeEncounterCount.call(this);
	}
};
//-----------------------------------------------------------------------------
// Can encounter on all vehicles, if switch is on.
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_canEncounter = Game_Player.prototype.canEncounter;
Game_Player.prototype.canEncounter = function() {
	if(this._vehicleGettingOn || this._vehicleGettingOff) {
		return false;
	}
	if(!$gameParty.hasEncounterNone() && $gameSystem.isEncounterEnabled() && !this.isMoveRouteForcing() && !this.isDebugThrough()) {
		if(this.isInBoat() && (CGMZ.VehicleEncounters.BoatEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.BoatEncounterSwitch))) {
			return true;
		} else if(this.isInShip() && (CGMZ.VehicleEncounters.ShipEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.ShipEncounterSwitch))) {
			return true;
		} else if(this.isInAirship() && (CGMZ.VehicleEncounters.AirshipEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.AirshipEncounterSwitch))) {
			return true;
		}
	}
	if(!this.isInBoat() && !this.isInShip()) {
		return alias_CGMZ_VehicleEncounters_canEncounter.call(this);
	}
	return false;
};
//-----------------------------------------------------------------------------
// Different encounter lists for vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
Game_Player.prototype.makeEncounterTroopId = function() {
	let encounterId = 0;
	if(this.isInBoat()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.BoatEncounters.length);
		return CGMZ.VehicleEncounters.BoatEncounters[encounterId];
	} else if(this.isInShip()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.ShipEncounters.length);
		return CGMZ.VehicleEncounters.ShipEncounters[encounterId];
	} else if(this.isInAirship()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.AirshipEncounters.length);
		return CGMZ.VehicleEncounters.AirshipEncounters[encounterId];
	} else {
		return alias_CGMZ_VehicleEncounters_makeEncounterTroopId.call(this);
	}
};
//-----------------------------------------------------------------------------
// Undo 1/2 encounter rate for ship
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
Game_Player.prototype.encounterProgressValue = function() {
    let val = alias_CGMZ_VehicleEncounters_encounterProgressValue.call(this);
	if(this.isInShip()) val *= 2;
	return val;
};
//=============================================================================
// Sprite_Battleback
//-----------------------------------------------------------------------------
// Show battlebacks for vehicle encounters
//=============================================================================
//-----------------------------------------------------------------------------
// Show different battleback1 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_battleback1Name = Sprite_Battleback.prototype.battleback1Name
Sprite_Battleback.prototype.battleback1Name = function() {
    if($gamePlayer.isInBoat()) {
		return CGMZ.VehicleEncounters.BoatBattleback1;
	} else if($gamePlayer.isInShip()) {
		return CGMZ.VehicleEncounters.ShipBattleback1;
	} else if($gamePlayer.isInAirship()) {
		return CGMZ.VehicleEncounters.AirshipBattleback1;
	} else {
		return alias_CGMZ_VehicleEncounters_battleback1Name.call(this);
	}
};
//-----------------------------------------------------------------------------
// Show different battleback2 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_battleback2Name = Sprite_Battleback.prototype.battleback2Name
Sprite_Battleback.prototype.battleback2Name = function() {
    if($gamePlayer.isInBoat()) {
		return CGMZ.VehicleEncounters.BoatBattleback2;
	} else if($gamePlayer.isInShip()) {
		return CGMZ.VehicleEncounters.ShipBattleback2;
	} else if($gamePlayer.isInAirship()) {
		return CGMZ.VehicleEncounters.AirshipBattleback2;
	} else {
		return alias_CGMZ_VehicleEncounters_battleback2Name.call(this);
	}
};