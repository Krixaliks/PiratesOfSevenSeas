//==============================================================================
// YR_NewParameters.js
//==============================================================================

/*:
 * @plugindesc ver 1.07 Allows creation of custom parameters.
 * @author Yorae Rasante
 *
 * @param Parameters
 * @type struct<ParameterData>[]
 * @desc The parameters made by the plugin
 * @default
 *
 *
 * @help ver 1.07
 * Commissioned by: inVictor
 * 
 * Now with the ability to replace the original ones!
 * 
 * Set the parameters' data and it should be good to go.
 * Actual parameters' id should be 1 value lower than its number on the list.
 * For example, the first parameter's id would be 0, and the second 1,
 * despite the list saying 1 and 2.
 * 
 * The stat should be able to be called by using:
 *  battler.(command Name)
 * For example, if the command name is "test",
 *  battler.test
 * 
 * To exchange the original values for your custom formulas,
 * just set their command name as the original parameter they would replace,
 * be the original ones (mhp, mmp, atk, def, mat, mdf, agi, luk), the
 * xparams (hit, eva, cri, cev, mev, mrf, cnt, hrg, mrg, trg) or the
 * sparams (tgr, grd, rec, pha, mcr, tcr, pdr, mdr, fdr, exr).
 * and use originalBase or originalValue (they are the same) in the
 * parameter's base formula to get the values from the database and traits.
 * For xparams and sparams, DO NOT FORGET to change the Minimum.
 * They are percentage values, meaning they are expected to go under 1.
 * The default minimum is 1, thus it could cause issues.
 * 
 * Notetags:
 *  Actors, Classes, Enemies (Actors has preference over Classes):
 *    <change stat base formula: x>
 *      stat should be the stat's command name
 *      x should be the formula
 *    Allows you to set a different formula for this battler for the stat's
 *    base than the one set on the stat itself.
 *    For example, two actors' base atk are different, even at the same level.
 * 
 *  Actors, Classes, Enemies, Weapons, Armors, and States:
 *    <stat Plus: +x>
 *    <stat Plus: -x>
 *      stat should be the stat's command name
 *    Adds/Subtract value to the "plus" variable.
 *    "Plus" is added to the base, like for stat-up items.
 * 
 *    <stat Rate: x%>
 *    <stat Rate: x.y>
 *      stat should be the stat's command name
 *    Multiplies the value of the parameter's rate.
 *    That value is multiplied by the sum of "Base" and "Plus".
 *    It is used in things like states that multiply strength.
 * 
 *    <stat Flat: +x>
 *    <stat Flat: -x>
 *      stat should be the stat's command name
 *    Adds/Subtract value to the "Flat" variable.
 *    "Flat" is added to the result, after most other calculations.
 * 
 *    <stat Min: x>
 *    <stat Max: x>
 *      stat should be the stat's command name
 *    Sets the minimun/maximum value the stat can have.
 *    Preference is for the higher value, both for minimum and maximum.
 * 
 *    <Max stat Buff: +x>
 *    <Max stat Buff: -x>
 *    <Max stat Debuff: +x>
 *    <Max stat Debuff: -x>
 *      stat should be the stat's command name
 *    Changes the stat's buff/debuff limit by the set number.
 * 
 *  Skills and Items:
 *    <Apply Buff stat x Turns>
 *    <Apply Debuff stat x Turns>
 *      stat should be the stat's command name
 *    Applies a buff/debuff of x turns to the stat.
 * 
 *    <stat Buff Turns: +x>
 *    <stat Buff Turns: -x>
 *    <stat Debuff Turns: +x>
 *    <stat Debuff Turns: -x>
 *      stat should be the stat's command name
 *    Changes the duration of a buff/debuff the stat may have.
 * 
 *   <Custom stat Buff Turns>
 *    turn = x;
 *   </Custom stat Buff Turns>
 *   <Custom stat Debuff Turns>
 *    turn = x;
 *   </Custom stat Debuff Turns>
 *      stat should be the stat's command name
 *    Sets the duration of a buff/debuff the stat may have to "turn".
 * 
 *  If you have YEP_EquipBattleSkills, Skills:
 *    <Equip stat: +x>
 *    <Equip stat: -x>
 * 
 * Functions:
 *  battler.clearYRparamPlus()
 *    Sets all Plus of the battler's custom stats to 0.
 * 
 *  battler.setYRparam(paramId, value)
 *    Sets the plus of the custom parameter to get the stat to the value.
 * 
 *  battler.setYRparamPlus(paramId, value)
 *    Sets the plus of the custom parameter to the value.
 * 
 *  battler.addYRparamPlus(paramId, value)
 *    Adds value to the custom parameter's plus.
 * 
 *  battler.minusYRparamPlus(paramId, value)
 *    Subtracts value of the custom parameter's plus.
 * 
 *  battler.setYRparamCustomMin(paramId, value)
 *    Sets the custom parameter's minimum value.
 *    If a higher value is set through other means, the higher value wins.
 * 
 *  battler.setYRparamCustomMax(paramId, value)
 *    Sets the custom parameter's maximum value.
 *    If a higher value is set through other means, the higher value wins.
 * 
 *  battler.clearYRparamCustomLimits()
 *    Removes limits set with setYRparamCustomMin and setYRparamCustomMax.
 * 
 *  battler.addYRBuff(paramId, turns)
 *    Adds a buff to the custom parameter.
 * 
 *  battler.addYRDebuff(paramId, turns)
 *    Adds a debuff to the custom parameter.
 * 
 *  battler.removeYRBuff(paramId)
 *    Removes the buffs and debuffs of the custom parameter.
 * 
 *  battler.removeAllYRBuffs()
 *    Removes the buffs and debuffs of all custom parameters.
 * 
 *  battler.overwriteYRBuffTurns(paramId, turns)
 *    If "turns" is higher, set the buff/debuff's remaining turns for it.
 * 
 *  battler.setYRBuffTurns(paramId, turns)
 *    Sets the buff/debuff's remaining turns.
 * 
 *  battler.isYRBuffAffected(paramId)
 *  battler.isYRDebuffAffected(paramId)
 *  battler.isYRBuffOrDebuffAffected(paramId)
 *    Tells if the battler is being affected by a buff, debuff or either.
 * 
 *  battler.YRBuff(paramId)
 *    Tells the current levels of buff on the battler.
 *    Debuffs are negative.
 * 
 *  battler.YRBuffTurns(paramId)
 *    Tells the current remaining number of turns for the buff.
 * 
 *  battler._YRparamPlus[paramId]
 *    The value of the parameter's plus.
 *    Also for items.
 *    For checking/editting the value directly.
 *    Only use if you know what you're doing.
 * 
 *  battler._YRparamRate[paramId]
 *    The value of the parameter's rate.
 *    Also for items.
 *    For checking/editting the value directly.
 *    Only use if you know what you're doing.
 * 
 *  battler._YRparamFlat[paramId]
 *    The value of the parameter's flat.
 *    Also for items.
 *    For checking/editting the value directly.
 *    Only use if you know what you're doing.
 * 
 */

/*~struct~ParameterData:
 * @param paramCommand
 * @text Parameter's Command Name
 * @type text
 * @desc Name used in commands to call the parameter (warning: case sensitive)
 * @default
 *
 * @param paramName
 * @text Parameter's Text Name
 * @type text
 * @desc Name used in messages about the parameter
 * @default
 *
 * @param paramPresetBase
 * @text Preset Parameter Base
 * @type text
 * @desc Formula used for all non-set base of this parameter, including enemies
 * @default this.level ? (level * 1) : 1
 *
 * @param paramFormula
 * @text Parameter Formula
 * @type text
 * @desc Formula used for calculating the parameter's value
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param paramBuffFormula
 * @text Buff Formula
 * @type text
 * @desc Formula used for calculating the parameter's buffs
 * @default buffLevel * 0.25 + 1.0
 *
 * @param paramMin
 * @text Parameter's Minimum Value
 * @type text
 * @desc The minimun value possible for the parameter
 * @default customMin || 1
 *
 * @param paramMax
 * @text Parameter's Maximum Value
 * @type text
 * @desc The highest value possible for the parameter
 * @default customMax || (user.isActor() ? 999 : 999)
 * 
 * @param buffLimit
 * @text Parameter's Default Buff Limit
 * @type number
 * @min 0
 * @decimals 0
 * @desc Default number of times this parameter can be buffed.
 * @default 2
 * 
 * @param buffMax
 * @text Parameter's Maximum Buff Limit
 * @type number
 * @min 0
 * @decimals 0
 * @desc Max number of times this parameter can be buffed.
 * @default 3
 * 
 * @param debuffLimit
 * @text Parameter's Default Debuff Limit
 * @type number
 * @min 0
 * @decimals 0
 * @desc Default number of times this parameter can be debuffed.
 * @default 2
 * 
 * @param debuffMax
 * @text Parameter's Maximum Debuff Limit
 * @type number
 * @min 0
 * @decimals 0
 * @desc Max number of times this parameter can be debuffed.
 * @default 3
 * 
 * @param buffIcon1
 * @text Icon for Buff Level 1
 * @type number
 * @min 0
 * @decimals 0
 * @desc Icon number for buff.
 * @default 0
 * 
 * @param buffIcon2
 * @text Icon for Buff Level 2
 * @type number
 * @min 0
 * @decimals 0
 * @desc Icon number for buff when second charge. 0 is same as normal charge.
 * @default 0
 * 
 * @param debuffIcon1
 * @text Icon for Debuff Level 1
 * @type number
 * @min 0
 * @decimals 0
 * @desc Icon number for debuff.
 * @default 0
 * 
 * @param debuffIcon2
 * @text Icon for Debuff Level 2
 * @type number
 * @min 0
 * @decimals 0
 * @desc Icon number for debuff when second charge. 0 is same as normal charge.
 * @default 0
 */

var Imported = Imported || {};
Imported.YR_NewParameters = true;

var YR = YR || {};
YR.NewParams = YR.NewParams || {};

YR.parameters = PluginManager.parameters('YR_NewParameters');
YR.NewParams.params = JSON.parse(YR.parameters['Parameters']);

YR.NewParams.oldParam = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
YR.NewParams.oldXParam = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
YR.NewParams.oldSParam = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

for (var i = 0; i < YR.NewParams.params.length; i++) {
  YR.NewParams.params[i] = JSON.parse(YR.NewParams.params[i]);
  var oldParamIndex = ["mhp","mmp","atk","def","mat","mdf","agi","luk"].indexOf(YR.NewParams.params[i].paramCommand);
  if (oldParamIndex > -1) YR.NewParams.oldParam[oldParamIndex] = i;
  oldParamIndex = ["hit","eva","cri","cev","mev","mrf","cnt","hrg","mrg","trg"].indexOf(YR.NewParams.params[i].paramCommand);
  if (oldParamIndex > -1) YR.NewParams.oldXParam[oldParamIndex] = i;
  oldParamIndex = ["tgr", "grd","rec","pha","mcr","tcr","pdr","mdr","fdr","exr"].indexOf(YR.NewParams.params[i].paramCommand);
  if (oldParamIndex > -1) YR.NewParams.oldSParam[oldParamIndex] = i;
};

YR_NewParams_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
YR_NewParams_DatabaseLoaded = false;
DataManager.isDatabaseLoaded = function() {
  if (!YR_NewParams_DataManager_isDatabaseLoaded.call(this)) return false;
  if (!YR_NewParams_DatabaseLoaded) {
    for (var i = 0; i < YR.NewParams.params.length; i++) {
      eval("Object.defineProperty(Game_BattlerBase.prototype, YR.NewParams.params[" + i + "].paramCommand, { get: function() { return this.YRparam(" + i + "); }, configurable: true });");
    }

    DataManager.setNewParams($dataActors);
    DataManager.setNewParams($dataClasses);
    DataManager.setNewParams($dataEnemies);

    DataManager.getNewParamNotetags($dataActors);
    DataManager.getNewParamNotetags($dataClasses);
    DataManager.getNewParamNotetags($dataEnemies);
    DataManager.getNewParamNotetags($dataWeapons);
    DataManager.getNewParamNotetags($dataArmors);
    DataManager.getNewParamNotetags($dataStates);
    DataManager.getNewParamItemNotetags($dataItems);
    DataManager.getNewParamItemNotetags($dataSkills);
    if (Imported.YEP_EquipBattleSkills) DataManager.getNewParamEquipSkillNotetags($dataSkills);
    
    YR_NewParams_DatabaseLoaded = true;
  }
  return true;
};

DataManager.setNewParams = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];

    obj._YRparamBase = [];

    for (var i = 0; i < YR.NewParams.params.length; i++) {
      obj._YRparamBase[i] = YR.NewParams.params[i].paramPresetBase;
    }

    var notedata = obj.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CHANGE[ ](.*)[ ]BASE FORMULA:[ ](.*)>/i)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamBase[id] = RegExp.$2;
      }
    }
  }
};

DataManager.getNewParamNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];

    obj._YRparamPlus = [];
    obj._YRparamRate = [];
    obj._YRparamFlat = [];
    obj._YRparamCustomMin = [];
    obj._YRparamCustomMax = [];
    obj._YRparamMaxBuff = [];
    obj._YRparamMaxDebuff = [];
    
    for (var i = 0; i < YR.NewParams.params.length; i++) {
      obj._YRparamPlus[i] = 0;
      obj._YRparamRate[i] = 1;
      obj._YRparamFlat[i] = 0;
      obj._YRparamMaxBuff[i] = YR.NewParams.params[i].buffLimit;
      obj._YRparamMaxDebuff[i] = YR.NewParams.params[i].debuffLimit;
    }

    var notedata = obj.note.split(/[\r\n]+/);
    var noteYRPlus = /<(.*)[ ]PLUS:[ ]([\+\-]\d+)>/i;
    var noteYRPercRate = /<(.*)[ ]RATE:[ ](\d+)\%>/i;
    var noteYRSetRate = /<(.*)[ ]RATE:[ ](\d+).(\d+)>/i;
    var noteYRFlat = /<(.*)[ ]FLAT:[ ]([\+\-]\d+)>/i;
    var noteYRCustMin = /<(.*)[ ]MIN:[ ](\d+)>/i;
    var noteYRCustMax = /<(.*)[ ]MAX:[ ](\d+)>/i;
    var noteYRMaxBuff = /<MAX[ ](.*)[ ]BUFF:[ ]([\+\-]\d+)>/i;
    var noteYRMaxDebuff = /<MAX[ ](.*)[ ]DEBUFF:[ ]([\+\-]\d+)>/i;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];

      if (line.match(noteYRPlus)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamPlus[id] += parseInt(RegExp.$2);
      } else if (line.match(noteYRPercRate)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamRate[id] *= parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(noteYRSetRate)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamRate[id] *= parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
      } else if (line.match(noteYRFlat)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamFlat[id] += parseInt(RegExp.$2);
      } else if (line.match(noteYRCustMin)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamCustomMin[id] = parseInt(RegExp.$2);
      } else if (line.match(noteYRCustMax)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamCustomMax[id] = parseInt(RegExp.$2);
      } else if(line.match(noteYRMaxBuff)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamMaxBuff[id] += parseInt(RegExp.$2);
      } else if(line.match(noteYRMaxDebuff)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj._YRparamMaxDebuff[id] += parseInt(RegExp.$2);
      }
    }
  }
};

DataManager.getNewParamItemNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    
    obj.YRbuffApplyTurnsNote = [];
    obj.YRdebuffApplyTurnsNote = [];
    obj.modifyTurnYRBuff = [];
    obj.modifyTurnYRDebuff = [];
    obj.modifyTurnYRBuffEval = [];
    obj.modifyTurnYRDebuffEval = [];

    for (var i = 0; i < YR.NewParams.params.length; i++) {
      obj.YRbuffApplyTurnsNote[i] = 0;
      obj.YRdebuffApplyTurnsNote[i] = 0;
      obj.modifyTurnYRBuff[i] = 0;
      obj.modifyTurnYRDebuff[i] = 0;
      obj.modifyTurnYRBuffEval[i] = '';
      obj.modifyTurnYRDebuffEval[i] = '';
    }

    var notedata = obj.note.split(/[\r\n]+/);
    var evalMode = 'none';
    var evalLine = '';
    var evalId = -1;
    var noteYRBuffApply = /<APPLY BUFF[ ](.*)[ ](\d+)[ ]TURNS>/i;
    var noteYRDebuffApply = /<APPLY DEBUFF[ ](.*)[ ](\d+)[ ]TURNS>/i;
    var noteYRTurnYRBuff = /<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i;
    var noteYRTurnYRDebuff = /<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i;
    var noteYRTurnYRBuffEval = /<CUSTOM[ ](.*)[ ]BUFF TURNS>/i;
    var noteYRTurnYRDebuffEval = /<CUSTOM[ ](.*)[ ]DEBUFF TURNS>/i;
    var noteYRTurnYRBuffEvalClose = /<\/CUSTOM[ ](.*)[ ]BUFF TURNS>/i;
    var noteYRTurnYRDebuffEvalClose = /<\/CUSTOM[ ](.*)[ ]DEBUFF TURNS>/i;

    for (var i = 0; i < notedata.length; i++)  {
      var line = notedata[i];

      if (line.match(noteYRBuffApply)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj.YRbuffApplyTurnsNote[id] = parseInt(RegExp.$2);
      } else if (line.match(noteYRDebuffApply)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj.YRdebuffApplyTurnsNote[id] = parseInt(RegExp.$2);
      } else if (line.match(noteYRTurnYRBuff)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj.modifyTurnYRBuff[id] = parseInt(RegExp.$2);
      } else if (line.match(noteYRTurnYRDebuff)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj.modifyTurnYRDebuff[id] = parseInt(RegExp.$2);
      } else if (line.match(noteYRTurnYRBuffEval)) {
        evalId = this.getYRparamId(RegExp.$1);
        if (evalId !== -1) evalMode = 'custom buff turns';
      } else if (line.match(noteYRTurnYRBuffEvalClose)) {
        evalId = -1;
        evalMode = 'none';
      } else if (line.match(noteYRTurnYRDebuffEval)) {
        evalId = this.getYRparamId(RegExp.$1);
        if (evalId !== -1) evalMode = 'custom debuff turns';
      } else if (line.match(noteYRTurnYRDebuffEvalClose)) {
        evalId = -1;
        evalMode = 'none';
      } else if (evalMode === 'custom buff turns') {
        obj.modifyTurnYRBuffEval[evalId] = obj.modifyTurnYRBuffEval[evalId] + line + '\n';
      } else if (evalMode === 'custom debuff turns') {
        obj.modifyTurnYRDebuffEval[evalId] = obj.modifyTurnYRDebuffEval[evalId] + line + '\n';
      }
    }
  }
};

DataManager.getNewParamEquipSkillNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    
    obj.YREquipSkillNote = [];

    for (var i = 0; i < YR.NewParams.params.length; i++) {
      obj.YREquipSkillNote[i] = 0;
    }

    var notedata = obj.note.split(/[\r\n]+/);
    var noteYREquipSkill = /<EQUIP[ ](.*):[ ]([\+\-]\d+)>/i;

    for (var i = 0; i < notedata.length; i++)  {
      var line = notedata[i];

      if (line.match(noteYREquipSkill)) {
        var id = this.getYRparamId(RegExp.$1);
        if (id !== -1) obj.YREquipSkillNote[id] += parseInt(RegExp.$2);
      }
    }
  }
}

DataManager.getYRparamId = function(paramName) {
  return YR.NewParams.params.map(function(e) {return e.paramCommand;}).indexOf(paramName);;
};

YR.NewParams.GBB_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
  YR.NewParams.GBB_initMembers.call(this);
  this.clearYRparamPlus();
  this.clearYRBuffs();
};

YR.NewParams.GB_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._YRparamCache = undefined;
    YR.NewParams.GB_refresh.call(this);
};

Game_BattlerBase.prototype.YRparam = function(paramId) {
  this._YRparamCache = this._YRparamCache || [];
  if (this._YRparamCache[paramId]) return this._YRparamCache[paramId];
  var base = this.YRparamBase(paramId);
  var plus = this.YRparamPlus(paramId);
  var paramRate = this.YRparamRate(paramId);
  var buffRate = this.YRparamBuffRate(paramId);
  var flat = this.YRparamFlat(paramId);
  var minValue = this.YRparamMin(paramId);
  var maxValue = Math.max(minValue, this.YRparamMax(paramId));
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = YR.NewParams.params[paramId].paramFormula;
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'FORMULA ERROR');
  }
  value = Math.max(minValue, Math.min(value, maxValue));
  this._YRparamCache[paramId] = value;
  return this._YRparamCache[paramId];
};

YR.NewParams.oldParamFunc = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
  if (YR.NewParams.oldParam[paramId] !== undefined) return this.YRparam(YR.NewParams.oldParam[paramId]);
  else return (YR.NewParams.oldParamFunc.call(this, paramId));
}

YR.NewParams.oldXParamFunc = Game_BattlerBase.prototype.xparam;
Game_BattlerBase.prototype.xparam = function(paramId) {
  if (YR.NewParams.oldXParam[paramId] !== undefined) return this.YRparam(YR.NewParams.oldXParam[paramId]);
  else return (YR.NewParams.oldXParamFunc.call(this, paramId));
}

YR.NewParams.oldSParamFunc = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(paramId) {
  if (YR.NewParams.oldSParam[paramId] !== undefined) return this.YRparam(YR.NewParams.oldSParam[paramId]);
  else return (YR.NewParams.oldSParamFunc.call(this, paramId));
}


Game_BattlerBase.prototype.YRparamBase = function(paramId) {
  return 0;
};

Game_BattlerBase.prototype.YRparamMin = function(paramId) {
  var customMin = this.customYRparamMin(paramId);
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = YR.NewParams.params[paramId].paramMin;
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'MIN FORMULA ERROR');
  }
  value = Math.ceil(value);
  return value;
};

Game_BattlerBase.prototype.YRparamMax = function(paramId) {
  var customMax = this.customYRparamMax(paramId);
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = YR.NewParams.params[paramId].paramMax;
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'MAX FORMULA ERROR');
  }
  value = Math.ceil(value);
  return value;
};

Game_BattlerBase.prototype.customYRparamMin = function(paramId) {
  if (!this._setYRparamCustomMin) this._setYRparamCustomMin = [];
  return this._setYRparamCustomMin[paramId];
};

Game_BattlerBase.prototype.customYRparamMax = function(paramId) {
  if (!this._setYRparamCustomMax) this._setYRparamCustomMax = [];
  return this._setYRparamCustomMax[paramId];
};

Game_BattlerBase.prototype.clearYRparamCustomLimits = function() {
  this._setYRparamCustomMin = [];
  this._setYRparamCustomMax = [];
};

Game_BattlerBase.prototype.setYRparamCustomMin = function(paramId, value) {
  if (!this._setYRparamCustomMin) this._setYRparamCustomMin = [];
  this._setYRparamCustomMin[paramId] = value;
};

Game_BattlerBase.prototype.setYRparamCustomMax = function(paramId, value) {
  if (!this._setYRparamCustomMax) this._setYRparamCustomMax = [];
  this._setYRparamCustomMax[paramId] = value;
};

Game_Battler.prototype.customYRparamMin = function(paramId) {
  var value = Game_BattlerBase.prototype.customYRparamMin.call(this, paramId);
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj._YRparamCustomMin && obj._YRparamCustomMin[paramId]) {
      if (!value) {
        value = obj._YRparamCustomMin[paramId];
      } else {
        value = Math.max(obj._YRparamCustomMin[paramId], value);
      }
    }
  }
  return value;
};

Game_Battler.prototype.customYRparamMax = function(paramId) {
  var value = Game_BattlerBase.prototype.customYRparamMax.call(this, paramId);
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj._YRparamCustomMax && obj._YRparamCustomMax[paramId]) {
      if (!value) {
        value = obj._YRparamCustomMax[paramId];
      } else {
        value = Math.max(obj._YRparamCustomMax[paramId], value);
      }
    }
  }
  return value;
};

Game_BattlerBase.prototype.clearYRparamPlus = function() {
  this._YRparamPlus = [];
  for (var i = 0; i < YR.NewParams.params.length; i++) {
    this._YRparamPlus[i] = 0;
  }
};

Game_BattlerBase.prototype.setYRparam = function(paramId, value) {
  this._YRparamPlus[id] = 0;
  this._YRparamCache = [];
  this._YRparamPlus[paramId] = value - this.YRparam(paramId);
  this.refresh();
};

Game_BattlerBase.prototype.setYRparamPlus = function(paramId, value) {
  this._YRparamPlus[paramId] = value;
  this.refresh();
};

Game_BattlerBase.prototype.addYRparamPlus = function(paramId, value) {
  this._YRparamPlus[paramId] += value;
  this.refresh();
};

Game_BattlerBase.prototype.minusYRparamPlus = function(paramId, value) {
  this._YRparamPlus[paramId] -= value;
  this.refresh();
};

Game_Battler.prototype.YRparamPlus = function(paramId) {
  var value = this._YRparamPlus[paramId];
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj._YRparamPlus) value += obj._YRparamPlus[paramId];
  }
  return value;
};

Game_Battler.prototype.YRparamRate = function(paramId) {
  var rate = 1;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj._YRparamRate) rate *= obj._YRparamRate[paramId];
  }
  var oldParamId = ["mhp","mmp","atk","def","mat","mdf","agi","luk"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) rate *= this.traitsPi(Game_BattlerBase.TRAIT_PARAM, oldParamId);
  return rate;
};

Game_Battler.prototype.YRparamFlat = function(paramId) {
  var value = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj._YRparamFlat) value += obj._YRparamFlat[paramId];
  }
  return value;
};

YR.NewParams.GA_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  var actor = $dataActors[actorId];
  this._YRparamBase = actor._YRparamBase;
  this._YRparamMin = actor._YRparamMin;
  this._YRparamMax = actor._YRparamMax;
  this._YRparamRate = actor._YRparamRate;
  this._YRparamFlat = actor._YRparamFlat;
  YR.NewParams.GA_setup.call(this, actorId);
};

Game_Actor.prototype.YRparamBase = function(paramId) {
  var a = this;
  var b = this;
  var user = this;
  var subject = this;
  var level = this.level || 1;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var originalBase = 0;
  var oldParamId = ["mhp","mmp","atk","def","mat","mdf","agi","luk"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.currentClass().params[oldParamId][this._level];
  oldParamId = ["hit","eva","cri","cev","mev","mrf","cnt","hrg","mrg","trg"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, oldParamId);
  oldParamId = ["tgr", "grd","rec","pha","mcr","tcr","pdr","mdr","fdr","exr"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, oldParamId);
  var originalValue = originalBase;
  var code = (this._YRparamBase[paramId] !== YR.NewParams.params[paramId].paramPresetBase) ? this._YRparamBase[paramId] : this.currentClass()._YRparamBase[paramId];
  try {
    var value = eval(code);
  } catch (e) {
    value = 0;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'FORMULA ERROR');
  }
  return value;
}

Game_Actor.prototype.YRparamPlus = function(paramId) {
  var value = Game_Battler.prototype.YRparamPlus.call(this, paramId);
  value += this.actor()._YRparamPlus[paramId];
  value += this.currentClass()._YRparamPlus[paramId];
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj._YRparamPlus) value += obj._YRparamPlus[paramId];
    if (Imported.YEP_EquipCore) value += this.evalYRParamPlus(obj, paramId);
    var oldParamId = ["mhp","mmp","atk","def","mat","mdf","agi","luk"].indexOf(YR.NewParams.params[paramId].paramCommand);
    if (oldParamId > -1) value += obj.params[oldParamId];
  }
  if (Imported.YEP_EquipBattleSkills && !DataManager.isBattleTest()) {
    var battleSkillsRaw = this.battleSkillsRaw();
    for (var i = 0; i < battleSkillsRaw.length; ++i) {
      var skill = $dataSkills[battleSkillsRaw[i]];
      if (skill === null) continue;
      value += skill.YREquipSkillNote[paramId];
    }
  }
  return value;
};

Game_Actor.prototype.YRparamRate = function(paramId) {
  var rate = Game_Battler.prototype.YRparamRate.call(this, paramId);
  rate *= this.actor()._YRparamRate[paramId];
  rate *= this.currentClass()._YRparamRate[paramId];
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj._YRparamRate) rate *= obj._YRparamRate[paramId];
  }
  return rate;
};

Game_Actor.prototype.YRparamFlat = function(paramId) {
  var value = Game_Battler.prototype.YRparamFlat.call(this, paramId);
  value += this.actor()._YRparamFlat[paramId];
  value += this.currentClass()._YRparamFlat[paramId];
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj._YRparamFlat) value += obj._YRparamFlat[paramId];
  }
  return value;
};

Game_Enemy.prototype.YRparamBase = function(paramId) {
  var a = this;
  var b = this;
  var user = this;
  var subject = this;
  var level = this.level || 1;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var originalBase = 0;
  var oldParamId = ["mhp","mmp","atk","def","mat","mdf","agi","luk"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.enemy().params[oldParamId];
  oldParamId = ["hit","eva","cri","cev","mev","mrf","cnt","hrg","mrg","trg"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, oldParamId);
  oldParamId = ["tgr", "grd","rec","pha","mcr","tcr","pdr","mdr","fdr","exr"].indexOf(YR.NewParams.params[paramId].paramCommand);
  if (oldParamId > -1) originalBase = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, oldParamId);
  var originalValue = originalBase;
  this._YRparamBase = this.enemy()._YRparamBase;
  var code = this._YRparamBase[paramId];
  try {
    var value = eval(code);
  } catch (e) {
    value = 0;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'FORMULA ERROR');
  }
  return value;
};

Game_Enemy.prototype.YRparamPlus = function(paramId) {
  var value = Game_Battler.prototype.YRparamPlus.call(this, paramId);
  value += this.enemy()._YRparamPlus[paramId];
  return value;
};

Game_Enemy.prototype.YRparamRate = function(paramId) {
  var rate = Game_Battler.prototype.YRparamRate.call(this, paramId);
  rate *= this.enemy()._YRparamRate[paramId];
  return rate;
};

Game_Enemy.prototype.YRparamFlat = function(paramId) {
  var value = Game_Battler.prototype.YRparamFlat.call(this, paramId);
  value += this.enemy()._YRparamFlat[paramId];
  return value;
};

///////////////////////////////
/// YEP_EquipCore
//////////////////////////////

YR.NewParams.GA_evalParamPlus = Game_Actor.prototype.evalParamPlus;
Game_Actor.prototype.evalParamPlus = function(item, paramId) {
  for (var i = 0; i < YR.NewParams.params.length; i++) eval("var "+ YR.NewParams.params[i].paramCommand +" = 0");
  return YR.NewParams.GA_evalParamPlus.call(this, item, paramId);
};

Game_Actor.prototype.evalYRParamPlus = function(item, paramId) {
  if (!item) return 0;
  if (!item.parameterEval || item.parameterEval === '') return 0;
  var value = 0;
  var hp = 0;
  var maxhp = 0;
  var mhp = 0;
  var mp = 0;
  var maxmp = 0;
  var mmp = 0;
  var sp = 0;
  var maxsp = 0;
  var msp = 0;
  var atk = 0;
  var str = 0;
  var def = 0;
  var mat = 0;
  var int = 0;
  var spi = 0;
  var mdf = 0;
  var res = 0;
  var agi = 0;
  var spd = 0;
  var luk = 0;
  var all = 0;
  for (var i = 0; i < YR.NewParams.params.length; i++) eval("var "+ YR.NewParams.params[i].paramCommand +" = 0");
  var a = this;
  var user = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = item.parameterEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM PARAMETER FORMULA ERROR');
  }
  eval("value = " + YR.NewParams.params[paramId].paramCommand + ";");
  return value + all;
};

///////////////////////////////
/// YEP_X_AttachAugments
//////////////////////////////
if (Imported.YEP_X_AttachAugments) {
  
  YR.NewParams.IM_processAugmentEffect = ItemManager.processAugmentEffect;
  ItemManager.processAugmentEffect = function(line, mainItem, effectItem, slot) {
    // PARAM: +/-X%
    if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
      var param = String(RegExp.$1).trim();
      for (var i = 0; i < YR.NewParams.params.length; i++) {
        if (param === YR.NewParams.params[i].paramCommand) {
          var value = parseInt(RegExp.$2);
          return this.applyAugmentYRParamRate(mainItem, i, value);
        }
      }
    }
    // PARAM: +/-X
    if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
      var param = String(RegExp.$1).trim();
      for (var i = 0; i < YR.NewParams.params.length; i++) {
        if (param === YR.NewParams.params[i].paramCommand) {
          var value = parseInt(RegExp.$2);
          return this.applyAugmentYRParamPlus(mainItem, i, value);
        }
      }
    }
    YR.NewParams.IM_processAugmentEffect.call(this, line, mainItem, effectItem, slot);
  };

  ItemManager.applyAugmentYRParamRate = function(mainItem, paramId, value) {
    value = parseFloat(value * 0.01);
    if ($gameTemp._augmentSetting === 'attach') {
      mainItem._YRparamRate[paramId] += value;
      mainItem._YRparamRate[paramId] = parseFloat(mainItem._YRparamRate[paramId].toFixed(2));
    } else {
      mainItem._YRparamRate[paramId] -= value;
      mainItem._YRparamRate[paramId] = parseFloat(mainItem._YRparamRate[paramId].toFixed(2));
    }
  };

  ItemManager.applyAugmentYRParamPlus = function(mainItem, paramId, value) {
    mainItem._YRparamPlus[paramId] += value;
  };

}

//////////////////////////////
// Buffs
/////////////////////////////

YR.NewParams.GBB_clearBuffs = Game_BattlerBase.prototype.clearBuffs;
Game_BattlerBase.prototype.clearBuffs = function() {
  YR.NewParams.GBB_clearBuffs.call(this);
  this.clearYRBuffs();
};

YR.NewParams.GBB_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
  if (Imported.YEP_BuffsStatesCore) {
    this._cacheYRparamBuffRate = {};
  }
  YR.NewParams.GBB_refresh.call(this);
};

Game_BattlerBase.prototype.YRparamBuffRate = function(paramId) {
  if (this._cacheYRparamBuffRate === undefined) this._cacheYRparamBuffRate = {};
  if (this._cacheYRparamBuffRate[paramId] !== undefined) {
    return this._cacheYRparamBuffRate[paramId];
  }
  var buffLevel = this._YRbuffs[paramId];
  var code = YR.NewParams.params[paramId].paramBuffFormula;
  try {
    var rate = eval(code);
  } catch (e) {
    var rate = 1;
    Yanfly.Util.displayError(e, code, 'YR PARAM' + paramId + 'BUFF RATE FORMULA ERROR');
  }
  this._cacheYRparamBuffRate[paramId] = rate;
  return this._cacheYRparamBuffRate[paramId];
};

Game_BattlerBase.prototype.eraseYRBuff = function(paramId) {
  this._YRbuffs[paramId] = 0;
  this._YRbuffTurns[paramId] = 0;
};

Game_BattlerBase.prototype.clearYRBuffs = function(paramId) {
  if (!this._YRbuffs) this._YRbuffs = [];
  if (!this._YRbuffTurns) this._YRbuffTurns = [];
  
  for (var i = 0; i < YR.NewParams.params.length; i++) {
    this._YRbuffs[i] = 0;
    this._YRbuffTurns[i] = 0;
  }
};

Game_BattlerBase.prototype.YRBuffLength = function() {
  return this._YRbuffs.length;
};

Game_BattlerBase.prototype.YRBuff = function(paramId) {
  return this._YRbuffs[paramId];
};

Game_BattlerBase.prototype.isYRBuffAffected = function(paramId) {
  return this._YRbuffs[paramId] > 0;
};

Game_BattlerBase.prototype.isYRDebuffAffected = function(paramId) {
  return this._YRbuffs[paramId] < 0;
};

Game_BattlerBase.prototype.isYRBuffOrDebuffAffected = function(paramId) {
  return this._YRbuffs[paramId] !== 0;
};

Game_BattlerBase.prototype.isYRMaxBuffAffected = function(paramId) {
  var limit = Math.max(1, this.YRmaxBuffLimit(paramId));
  var max = YR.NewParams.params[paramId].buffMax;
  return this._YRbuffs[paramId] === Math.min(limit, max);
};

Game_BattlerBase.prototype.YRmaxBuffLimit = function(paramId) {
  var value = YR.NewParams.params[paramId].buffLimit;
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    if (state._YRparamMaxBuff) value += state._YRparamMaxBuff[paramId];
  }
  return value;
};

Game_BattlerBase.prototype.isYRMaxDebuffAffected = function(paramId) {
  var limit = Math.min(-1, this.YRmaxDebuffLimit(paramId));
  var max = YR.NewParams.params[paramId].debuffMax * -1;
  return this._YRbuffs[paramId] === Math.max(limit, max);
};

Game_BattlerBase.prototype.YRmaxDebuffLimit = function(paramId) {
  var value = -1 * YR.NewParams.params[paramId].debuffLimit;
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    if (state._YRparamMaxDebuff) value -= state._YRparamMaxDebuff[paramId];
  }
  return value;
};

Game_Actor.prototype.YRmaxBuffLimit = function(paramId) {
  var value = Game_Battler.prototype.YRmaxBuffLimit.call(this, paramId);
  value += this.actor()._YRparamMaxBuff[paramId];
  value += this.currentClass()._YRparamMaxBuff[paramId];
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (!equip) continue;
    if (equip._YRparamMaxBuff) value += equip._YRparamMaxBuff[paramId];
  }
  return value;
};

Game_Actor.prototype.YRmaxDebuffLimit = function(paramId) {
  var value = Game_Battler.prototype.YRmaxDebuffLimit.call(this, paramId);
  value -= this.actor()._YRparamMaxDebuff[paramId];
  value -= this.currentClass()._YRparamMaxDebuff[paramId];
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (!equip) continue;
    if (equip._YRparamMaxDebuff) value -= equip._YRparamMaxDebuff[paramId];
  }
  return value;
};

Game_Enemy.prototype.YRmaxBuffLimit = function(paramId) {
  var value = Game_Battler.prototype.YRmaxBuffLimit.call(this, paramId);
  value += this.enemy()._YRparamMaxBuff[paramId];
  return value;
};

Game_Enemy.prototype.YRmaxDebuffLimit = function(paramId) {
  var value = Game_Battler.prototype.YRmaxDebuffLimit.call(this, paramId);
  value -= this.enemy()._YRparamMaxDebuff[paramId];
  return value;
};

Game_BattlerBase.prototype.increaseYRBuff = function(paramId) {
  if (!this.isYRMaxBuffAffected(paramId)) {
      this._YRbuffs[paramId]++;
  }
};

Game_BattlerBase.prototype.decreaseYRBuff = function(paramId) {
  if (!this.isYRMaxDebuffAffected(paramId)) {
      this._YRbuffs[paramId]--;
  }
};

Game_BattlerBase.prototype.overwriteYRBuffTurns = function(paramId, turns) {
  if (this._YRbuffTurns[paramId] < turns) {
      this._YRbuffTurns[paramId] = turns;
  }
};

Game_BattlerBase.prototype.isYRBuffExpired = function(paramId) {
  return this._YRbuffTurns[paramId] === 0;
};

Game_BattlerBase.prototype.updateYRBuffTurns = function() {
  for (var i = 0; i < this._YRbuffTurns.length; i++) {
      if (this._YRbuffTurns[i] > 0) {
          this._YRbuffTurns[i]--;
      }
  }
};

YR.NewParams.GB_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
  this.updateYRBuffTurns();
  YR.NewParams.GB_onTurnEnd.call(this);
};

Game_Battler.prototype.addYRBuff = function(paramId, turns) {
  if (this.isAlive()) {
      this.increaseYRBuff(paramId);
      if (this.isYRBuffAffected(paramId)) {
          this.overwriteYRBuffTurns(paramId, turns);
      }
      this._result.pushAddedYRBuff(paramId);
      this.refresh();
  }
};

Game_Battler.prototype.addYRDebuff = function(paramId, turns) {
  if (this.isAlive()) {
      this.decreaseYRBuff(paramId);
      if (this.isYRDebuffAffected(paramId)) {
          this.overwriteYRBuffTurns(paramId, turns);
      }
      this._result.pushAddedYRDebuff(paramId);
      this.refresh();
  }
};

Game_Battler.prototype.removeYRBuff = function(paramId) {
  if (this.isAlive() && this.isYRBuffOrDebuffAffected(paramId)) {
      this.eraseYRBuff(paramId);
      this._result.pushRemovedYRBuff(paramId);
      this.refresh();
  }
};

Game_Battler.prototype.removeAllYRBuffs = function() {
  for (var i = 0; i < this.YRBuffLength(); i++) {
      this.removeYRBuff(i);
  }
};

Game_Battler.prototype.removeYRBuffsAuto = function() {
  for (var i = 0; i < this.YRBuffLength(); i++) {
      if (this.isYRBuffExpired(i)) {
          this.removeYRBuff(i);
      }
  }
};

Game_BattlerBase.prototype.YRBuffTurns = function(paramId) {
  return this._YRbuffTurns[paramId];
};

YR.NewParams.GAR_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
  YR.NewParams.GAR_clear.call(this);
  this.addedYRBuffs = [];
  this.addedYRDebuffs = [];
  this.removedYRBuffs = [];
};

YR.NewParams.GAR_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
Game_ActionResult.prototype.isStatusAffected = function() {
  return (YR.NewParams.GAR_isStatusAffected.call(this) ||
            this.addedYRBuffs.length > 0 || this.addedYRDebuffs.length > 0);
};

Game_ActionResult.prototype.isYRBuffAdded = function(paramId) {
  return this.addedYRBuffs.contains(paramId);
};

Game_ActionResult.prototype.pushAddedYRBuff = function(paramId) {
  if (!this.isYRBuffAdded(paramId)) {
      this.addedYRBuffs.push(paramId);
  }
};

Game_ActionResult.prototype.isYRDebuffAdded = function(paramId) {
  return this.addedYRDebuffs.contains(paramId);
};

Game_ActionResult.prototype.pushAddedYRDebuff = function(paramId) {
  if (!this.isYRDebuffAdded(paramId)) {
      this.addedYRDebuffs.push(paramId);
  }
};

Game_ActionResult.prototype.isYRBuffRemoved = function(paramId) {
  return this.removedYRBuffs.contains(paramId);
};

Game_ActionResult.prototype.pushRemovedYRBuff = function(paramId) {
  if (!this.isYRBuffRemoved(paramId)) {
      this.removedYRBuffs.push(paramId);
  }
};

YR.NewParams.GB_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    this.removeYRBuffsAuto();
    YR.NewParams.GB_onAllActionsEnd.call(this);
};

if (Imported.YEP_BattleEngineCore) {
  YR.NewParams.GB_regenerateAll = Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function() {
      YR.NewParams.GB_regenerateAll.call(this);
      if (!BattleManager.timeBasedBuffs()) {
        this.removeYRBuffsAuto();
      }
  };
};

YR.NewParams.GBB_buffIcons = Game_BattlerBase.prototype.buffIcons;
Game_BattlerBase.prototype.buffIcons = function() {
  var icons = YR.NewParams.GBB_buffIcons.call(this);
  for (var i = 0; i < this._YRbuffs.length; i++) {
    if (this._YRbuffs[i] !== 0 && this.YRBuffIconIndex(this._YRbuffs[i], i) != 0) {
      icons.push(this.YRBuffIconIndex(this._YRbuffs[i], i));
    }
  }
  return icons;
};

Game_BattlerBase.prototype.YRBuffIconIndex = function(buffLevel, paramId) {
  if (buffLevel > 0) {
    if (buffLevel === 1 || YR.NewParams.params[paramId].buffIcon2 == 0) {
      return YR.NewParams.params[paramId].buffIcon1;
    } else {
      return YR.NewParams.params[paramId].buffIcon2;
    }
  } else if (buffLevel < 0) {
    if (buffLevel === (-1) || YR.NewParams.params[paramId].debuffIcon2 == 0) {
      return YR.NewParams.params[paramId].debuffIcon1;
    } else {
      return YR.NewParams.params[paramId].debuffIcon2;
    }
  } else {
    return 0;
  }
};

YR.NewParams.WBL_displayChangedBuffs = Window_BattleLog.prototype.displayChangedBuffs;
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
  YR.NewParams.WBL_displayChangedBuffs.call(this, target);
  var result = target.result();
  this.displayYRBuffs(target, result.addedYRBuffs, TextManager.buffAdd);
  this.displayYRBuffs(target, result.addedYRDebuffs, TextManager.debuffAdd);
  this.displayYRBuffs(target, result.removedYRBuffs, TextManager.buffRemove);
};

Window_BattleLog.prototype.displayYRBuffs = function(target, buffs, fmt) {
    buffs.forEach(function(paramId) {
        this.push('popBaseLine');
        this.push('pushBaseLine');
        this.push('addText', fmt.format(target.name(), YR.NewParams.params[paramId].paramName));
    }, this);
};

Game_BattlerBase.prototype.setYRBuffTurns = function(paramId, turns) {
  if (Imported.YEP_BattleEngineCore && !Yanfly.Param.BECTimeBuffs) {
    turns = Math.floor(turns);
  }
  this._YRbuffTurns[paramId] = turns;
};

YR.NewParams.GA_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  YR.NewParams.GA_applyItemUserEffect.call(this, target);
  if (!target) return;
  this.applyYRBuff(target);
  this.applyYRDebuff(target);
  this.applyModifyYRBuffTurns(target);
  this.applyModifyYRDebuffTurns(target);
};

Game_Action.prototype.applyYRBuff = function(target) {
  if (!this.item()) return;
  var item = this.item();
  if (item.YRbuffApplyTurnsNote.length === 0) return;
  for (var n = 0; n < item.YRbuffApplyTurnsNote.length; n++) {
    if (item.YRbuffApplyTurnsNote[n] !== 0) {
      target.addYRBuff(n, item.YRbuffApplyTurnsNote[n]);
    }
  }
};

Game_Action.prototype.applyYRDebuff = function(target) {
  if (!this.item()) return;
  var item = this.item();
  if (item.YRdebuffApplyTurnsNote.length === 0) return;
  for (var n = 0; n < item.YRdebuffApplyTurnsNote.length; n++) {
    if (item.YRdebuffApplyTurnsNote[n] !== 0) {
      target.addYRDebuff(n, item.YRdebuffApplyTurnsNote[n]);
    }
  }
};

Game_Action.prototype.applyModifyYRBuffTurns = function(target) {
  if (!this.item()) return;
  var affected = false;
  for (var i = 0; i < this.item().modifyTurnYRBuff.length; ++i) {
    if (!target.isYRBuffAffected(i)) continue;
    var turn = this.item().modifyTurnYRBuff[i] + target.YRBuffTurns(i);
    turn = this.applyYRBuffTurnsEval(turn, i, target);
    target.setYRBuffTurns(i, turn);
    if (target.YRBuffTurns(i) <= 0) target.eraseYRBuff(i);
    affected = true;
  }
  if (affected) target.refresh();
};

Game_Action.prototype.applyYRBuffTurnsEval = function(turn, paramId, target) {
  if (this.item().modifyTurnYRBuffEval[paramId] === '') return turn;
  var item = this.item();
  var a = this.subject();
  var b = target;
  var user = this.subject();
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = this.item().modifyTurnYRBuffEval[paramId];
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM BUFF TURN SET ERROR');
  }
  return turn;
};

Game_Action.prototype.applyModifyYRDebuffTurns = function(target) {
  if (!this.item()) return;
  var affected = false;
  for (var i = 0; i < this.item().modifyTurnYRDebuff.length; ++i) {
    if (!target.isYRDebuffAffected(i)) continue;
    var turn = this.item().modifyTurnYRDebuff[i] + target.YRBuffTurns(i);
    turn = this.applyYRDebuffTurnsEval(turn, i, target);
    target.setYRBuffTurns(i, turn);
    if (target.YRBuffTurns(i) <= 0) target.eraseYRBuff(i);
    affected = true;
  }
  if (affected) target.refresh();
};

Game_Action.prototype.applyYRDebuffTurnsEval = function(turn, paramId, target) {
  if (this.item().modifyTurnYRDebuffEval[paramId] === '') return turn;
  var item = this.item();
  var a = this.subject();
  var b = target;
  var user = this.subject();
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = this.item().modifyTurnYRDebuffEval[paramId];
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM DEBUFF TURN SET ERROR');
  }
  return turn;
};

///////////////////////////////
/// YEP_BuffsStatesCore
//////////////////////////////

if (Imported.YEP_BuffsStatesCore) {
  YR.NewParams.GBB_statesAndBuffs = Game_BattlerBase.prototype.statesAndBuffs;
  Game_BattlerBase.prototype.statesAndBuffs = function() {
    array = YR.NewParams.GBB_statesAndBuffs.call(this);
    for (var i = 0; i < YR.NewParams.params.length; i++) {
      if (this._YRbuffs[i] !== 0 && this.YRBuffIconIndex(this._YRbuffs[i], i) != 0) array.push(['YRparam', i]);
    }
    return array;
  };

  YR.NewParams.SSI_drawStateTurns = Sprite_StateIcon.prototype.drawStateTurns;
  Sprite_StateIcon.prototype.drawStateTurns = function(state) {
    if (state[0] === 'YRparam') {
      if (!Yanfly.Param.BSCShowTurns) return;
      var turns = this._battler.YRBuffTurns(state[1]);
      turns = Yanfly.Util.toGroup(Math.ceil(turns));
      var wx = Yanfly.Param.BSCTurnBufferX;
      var wy = Yanfly.Param.BSCTurnBufferY - 2;
      var ww = Window_Base._iconWidth;
      var wh = Window_Base.prototype.lineHeight.call(this);
      var contents = this._turnCounterSprite.bitmap;
      contents.fontSize = Yanfly.Param.BSCFontSize;
      if (this._battler.isYRBuffAffected(state[1])) {
        contents.textColor = this.textColor(Yanfly.Param.BSCBuffColor);
      } else {
        contents.textColor = this.textColor(Yanfly.Param.BSCDebuffColor);
      }
      contents.drawText(turns, wx, wy, ww, wh, Yanfly.Param.BSCTurnAlign);
    } else {
      YR.NewParams.SSI_drawStateTurns.call(this, state);
    }
  }

  YR.NewParams.SSI_drawStateCounter = Sprite_StateIcon.prototype.drawStateCounter;
  Sprite_StateIcon.prototype.drawStateCounter = function(state) {
    if (state[0] === 'YRparam') {
      if (!Yanfly.Param.BSCShowBuffRate) return;
      var value = this._battler.YRparamBuffRate(state[1]);
      var text = Math.floor(value * 100) + '%';
      var wx = Yanfly.Param.BSCCounterBufferX || 0;
      var wy = (Yanfly.Param.BSCCounterBufferY || 8) - 2;
      var ww = Window_Base._iconWidth;
      var wh = Window_Base.prototype.lineHeight.call(this);
      var contents = this._turnCounterSprite.bitmap;
      contents.fontSize = Yanfly.Param.BSCFontSize * 0.75;
      contents.textColor = this.textColor(0);
      contents.drawText(text, wx, wy, ww, wh, 'center');
    } else {
      YR.NewParams.SSI_drawStateCounter.call(this, state);
    }
  };

  Window_Base.prototype.drawActorIconsTurns = function(actor, wx, wy, ww) {
    var iw = Window_Base._iconWidth;
    var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
    var max = icons.length;
    var shownMax = Math.floor(ww / iw);
    for (var i = 0; i < actor.states().length; ++i) {
      if (shownMax <= 0) break;
      var state = actor.states()[i];
      if (state.iconIndex <= 0) continue;
      if (state.autoRemovalTiming > 0) {
        this.drawStateTurns(actor, state, wx, wy);
      }
      this.drawStateCounter(actor, state, wx, wy);
      wx += iw;
      --shownMax;
    }
    for (var i = 0; i < 8; ++i) {
      if (shownMax <= 0) break;
      if (actor._buffs[i] === 0) continue;
      this.drawBuffTurns(actor, i, wx, wy);
      if (Yanfly.Param.BSCShowBuffRate) {
        this.drawBuffRate(actor, i, wx, wy);
      }
      wx += iw;
      --shownMax;
    }
    this.resetFontSettings();
    this.resetTextColor();
    Window_Base.prototype.drawOtherActorIconsTurns.call(this, actor, wx, wy, shownMax * iw);
    if (this._OAIx) this._OAIx = wx;
    if (this._OAIw) this._OAIw = shownMax * iw;
  };
  
  if (Window_Base.prototype.drawOtherActorIconsTurns) YR.NewParams.WB_drawOtherActorIconsTurns = Window_Base.prototype.drawOtherActorIconsTurns;
  Window_Base.prototype.drawOtherActorIconsTurns = function(actor, wx, wy, ww) {
    this._OAIx = wx;
    this._OAIw = ww;
    if (YR.NewParams.WB_drawOtherActorIconsTurns) YR.NewParams.WB_drawOtherActorIconsTurns.call(this, actor, wx, wy, ww);
    wx = this._OAIx;
    ww = this._OAIw;
    var iw = Window_Base._iconWidth;
    var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
    var max = icons.length;
    var shownMax = Math.floor(ww / iw);
    for (var i = 0; i < YR.NewParams.params.length; ++i) {
      if (shownMax <= 0) break;
      if (actor._YRbuffs[i] === 0 || actor.YRBuffIconIndex(actor._YRbuffs[i], i) == 0) continue;
      this.drawYRBuffTurns(actor, i, wx, wy);
      if (Yanfly.Param.BSCShowBuffRate) {
        this.drawYRBuffRate(actor, i, wx, wy);
      }
      wx += iw;
      --shownMax;
    this._OAIx = wx;
    this._OAIw = shownMax * iw;
    }
    this.resetFontSettings();
    this.resetTextColor();
  };
};

Window_Base.prototype.drawYRBuffTurns = function(actor, paramId, wx, wy) {
  if (!Yanfly.Param.BSCShowTurns) return;
  var turns = Yanfly.Util.toGroup(Math.ceil(actor.YRBuffTurns(paramId)));
  wx += Yanfly.Param.BSCTurnBufferX;
  wy += Yanfly.Param.BSCTurnBufferY;
  this.changePaintOpacity(true);
  this.contents.fontSize = Yanfly.Param.BSCFontSize;
  if (actor.isYRBuffAffected(paramId)) {
    this.changeTextColor(this.textColor(Yanfly.Param.BSCBuffColor));
  } else {
    this.changeTextColor(this.textColor(Yanfly.Param.BSCDebuffColor));
  }
  var align = Yanfly.Param.BSCTurnAlign;
  this.drawText(turns, wx, wy, Window_Base._iconWidth, align);
  this.resetFontSettings();
  this.resetTextColor();
};

Window_Base.prototype.drawYRBuffRate = function(actor, paramId, wx, wy) {
  var value = actor.YRparamBuffRate(paramId);
  if (value === undefined) return;
  value = Math.floor(value * 100) + '%';
  this.contents.fontSize = (Yanfly.Param.BSCCounterSize || 16) * 0.75;
  wx += Yanfly.Param.BSCCounterBufferX || 0;
  wy += Yanfly.Param.BSCCounterBufferY || 8;
  this.changePaintOpacity(true);
  this.drawText(value, wx, wy, Window_Base._iconWidth, 'center');
  this.resetFontSettings();
  this.resetTextColor();
};