//==========================================================================
// EliMZ_SkillCost.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_CustomParameters
@orderAfter VisuMZ_1_ElementStatusCore
@orderAfter VisuMZ_1_SkillsStatesCore

@plugindesc ♦2.1.3♦ Adds more cost types for skills.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-skill-costs-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
============================================================================
Features
============================================================================

● Multiple skill costs via note tags:
• Variables, items, Hp, and Gold!
• Custom Parameters (HP/MP types, need Eli Custom Parameter)
● Add text prefixes and suffixes to each cost to change colors or insert 
any escape code!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1zqq5AYHHh2xWhYPgYLepkkQHDY_Gl4dA0YkZWx-Xx3Q/edit?usp=sharing

============================================================================

@param drawStyle
@text Draw Style
@type select
@option default
@option single
@option all
@desc Default will only draw MP and TP. Single will draw only one cost. All, will draw all cost types.
@default all

@param separator
@text Text Separator
@desc If you choosen default or all, you can type here the text that will separate each cost type.
@default
@parent drawStyle

@param maxCols
@text Max Skill Cols
@type number
@desc Default is 2.
It's recomendable that you put that to 1, if you set draw style to all.
@default 1

@param costOrder
@text Type Order
@type select[]
@option hp @option mp @option tp @option gold @option item @option variable @option customParameter
@desc The order that each cost type will be drawn in front of the skill name.
@default ["hp","mp","tp","gold","item","variable","customParameter"]

@param costStyle
@text Label Style
@type select
@option Cost + Type
@option Type + Cost
@desc How each cost label will be drawn. If the value will be first or the Cost type will be first.
@default Type + Cost

@param typeSettings
@text Type Settings

@param hp
@text HP
@type struct<textSt>
@desc Additional settings specific for this cost type.
@default {"prefix":"\\c[1]\\}","between":"\\{","suffix":"\\c[0]"}
@parent typeSettings

@param mp
@text MP
@type struct<textSt>
@desc Additional settings specific for this cost type.
@default {"prefix":"\\c[5]\\}","between":"\\{","suffix":"\\c[0]"}
@parent typeSettings

@param tp
@text TP
@type struct<textSt>
@desc Additional settings specific for this cost type.
@default {"prefix":"\\c[3]\\}","between":"\\{","suffix":"\\c[0]"}
@parent typeSettings

@param gold
@text Gold
@type struct<textSt>
@desc Additional settings specific for this cost type.
@default {"prefix":"\\c[14]\\}","between":"\\{","suffix":"\\c[0]"}
@parent typeSettings

@param item
@text Item
@type struct<itemSettings>
@desc Additional settings specific for this cost type.
@default {"style":"Icon","prefix":"\\}","between":"\\{ x","suffix":""}
@parent typeSettings

@param variables
@text Variables
@type struct<variableSettings>[]
@desc You need to put here all variables used as cost for skills.
@default []
@parent typeSettings

@param customParameters
@text Custom Parameters
@type struct<customParameterSettings>[]
@desc You need to put all the custom parameters used as skill costs here.
@default []
@parent typeSettings

*/

/* -------------------------- PREFIXES AND SUFFIXES ------------------------- */
{

/*~struct~textSt:

@param prefix
@text Text Prefix
@type text
@desc A custom text before Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param between
@text Text Between
@type text
@desc A custom text between Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param suffix
@text Text Suffix
@type text
@desc A custom text after Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

*/

}

/* ------------------------------ ITEM SETTING ------------------------------ */
{

/*~struct~itemSettings:

@param style
@text Type Style
@type select
@option Icon
@option Name
@desc How the item label type will be drawn.
@default Icon

@param prefix
@text Text Prefix
@type text
@desc A custom text before Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param between
@text Text Between
@type text
@desc A custom text between Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param suffix
@text Text Suffix
@type text
@desc A custom text after Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

*/

}

/* ---------------------------- VARIABLE SETTING ---------------------------- */
{

/*~struct~variableSettings:

@param id
@text Var Id
@type variable
@desc The variable Id that will be used as cost for skills.
@default 0

@param prefix
@text Text Prefix
@type text
@desc A custom text before Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param between
@text Text Between
@type text
@desc A custom text between Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

@param suffix
@text Text Suffix
@type text
@desc A custom text after Type/Cost or Cost/Type. Can use escape codes. Leave empty to not use.
@default

*/

}

/* ------------------------ CUSTOM PARAMETER SETTING ------------------------ */
{

/*~struct~customParameterSettings:

@param name
@text Name
@type text
@desc The Custom parameter short name. 
It is case sensitive.
@default rep

@param prefix
@text Text Prefix
@type text
@desc A custom text before Type/Cost or Cost/Type. Can use escape codes.
@default

@param between
@text Text Between
@type text
@desc A custom text between Type/Cost or Cost/Type. Can use escape codes.
@default

@param suffix
@text Text Suffix
@type text
@desc A custom text after Type/Cost or Cost/Type. Can use escape codes.
@default

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SkillCost = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.SkillCost = {

    Parameters: class {
        constructor(parameters){
            this.drawStyle = parameters.drawStyle
            this.costStyle = parameters.costStyle
            this.separator = parameters.separator || " "
            this.maxCols = Number(parameters.maxCols)
            this.costOrder = JSON.parse(parameters.costOrder)
            this.typeSettings = {
                hp: JSON.parse(parameters.hp),
                mp: JSON.parse(parameters.mp),
                tp: JSON.parse(parameters.tp),
                gold: JSON.parse(parameters.gold),
                item: JSON.parse(parameters.item),
                variables: this.parseVariableData(JSON.parse(parameters.variables)),
                customParameters: this.parseCustomParametersData(JSON.parse(parameters.customParameters)),
            }
        }

        parseVariableData(varData){

            for(let i = 0; i < varData.length; i++){
                varData[i] = JSON.parse(varData[i])
                varData[i].id = Number(varData[i].id)
            }

            return varData
        }

        parseCustomParametersData(cparamData){

            for(let i = 0; i < cparamData.length; i++){
                cparamData[i] = JSON.parse(cparamData[i])
            }

            return cparamData
        }
    },

    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_SkillCost")
        this.parameters = new this.Parameters(parameters)

        // const rawParameters = PluginManager.parameters("EliMZ_SkillCost")
        // const varData = JSON.parse(rawParameters.variables)
        // const cparamData = JSON.parse(rawParameters.customParameters)

        // for(let i = 0; i < varData.length; i++){
        //     varData[i] = JSON.parse(varData[i])
        //     varData[i].id = Number(varData[i].id)
        // }

        // for(let i = 0; i < cparamData.length; i++){
        //     cparamData[i] = JSON.parse(cparamData[i])
        // }

        // this.parameters.drawStyle = rawParameters.drawStyle
        // this.parameters.costStyle = rawParameters.costStyle
        // this.parameters.separator = rawParameters.separator || " "
        // this.parameters.maxCols = Number(rawParameters.maxCols)
        // this.parameters.costOrder = JSON.parse(rawParameters.costOrder)
        // this.parameters.typeSettings = {
        //     hp: JSON.parse(rawParameters.hp),
        //     mp: JSON.parse(rawParameters.mp),
        //     tp: JSON.parse(rawParameters.tp),
        //     gold: JSON.parse(rawParameters.gold),
        //     item: JSON.parse(rawParameters.item),
        //     variables: varData,
        //     customParameters: cparamData,
        // }
    },

    getParam(){
        return this.parameters
    },

    setCustomCostsToDataSkill(dataSkill){
        this.createCustomCostOnDataSkill(dataSkill)
    
        if(this.skillHaveCustomCost(dataSkill, "CParam")){
            this.setCustomParameterCostsOnSkill(dataSkill)
        }
    
        if(this.skillHaveCustomCost(dataSkill, "Items")){
            this.setItemsCostsOnSkill(dataSkill)
        }
    
        if(this.skillHaveCustomCost(dataSkill, "Var")){
            this.setVariableCost(dataSkill)
        }
        
        if(this.skillHaveCustomCost(dataSkill, "Gold")){
            this.setGoldCostsOnSkill(dataSkill)
        }
    
        if(this.skillHaveCustomCost(dataSkill, "Hp")){
            this.setHpCostOnSkill(dataSkill)
        }
    },

    skillHaveCustomCost(dataSkill, costType){
        return dataSkill.meta.hasOwnProperty(`${costType}Cost`)
    },
    
    createCustomCostOnDataSkill(dataSkill){
        dataSkill.cparamCost = {}
        dataSkill.itemsCost = {}
        dataSkill.weaponsCost = {}
        dataSkill.armorsCost = {}
        dataSkill.variableCost = {}
        dataSkill.goldCost = 0
        dataSkill.hpCost = {cost: 0, allowDeath: false}
    },
    
    setCustomParameterCostsOnSkill(dataSkill){
        const metaData = dataSkill.meta.CParamCost.split(";")

        for(const cost of metaData){
            const [name, value] = cost.split(":")
            dataSkill.cparamCost[Eli.String.removeSpaces(name)] = Number(value)
        }
    },
    
    setItemsCostsOnSkill(dataSkill){
        const metaData = dataSkill.meta.ItemsCost.split(";")
    
        for(const cost of metaData){
            const [nameOrId, value] = cost.split(":")
            let itemId = 0
    
            if(isNaN(nameOrId)){
                itemId = $dataItems.findIndex(data => data?.name?.toLowerCase() === nameOrId.toLowerCase())
            }else{
                itemId = nameOrId
            }
    
            if(itemId > 0){
                dataSkill.itemsCost[Number(itemId)] = Number(value)
            }
        }
    },
    
    setVariableCost(dataSkill){
        const metaData = dataSkill.meta.VarCost.split(";")

        for(const cost of metaData){
            const [id, value] = cost.split(":")
            dataSkill.variableCost[Number(id)] = Number(value)
        }
    },
    
    setGoldCostsOnSkill(dataSkill){
        dataSkill.goldCost = Number(dataSkill.meta.GoldCost || 0)
    },
    
    setHpCostOnSkill(dataSkill){
        const [value, allowDeath] = dataSkill.meta.HpCost.split(",")
        dataSkill.hpCost.cost = Eli.String.removeSpaces(value)
    
        if(allowDeath !== undefined){
            dataSkill.hpCost.allowDeath = Eli.String.removeSpaces(allowDeath).toLowerCase() === "true"
        }else{
            dataSkill.hpCost.allowDeath = false
        }
    },
    
}

{

const Plugin = Eli.SkillCost
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_processDataSkills = Scene_Boot.prototype.processDataSkills
Scene_Boot.prototype.processDataSkills = function(data){
    Alias.Scene_Boot_processDataSkills.call(this, data)
    Plugin.setCustomCostsToDataSkill(data)
}

/* ---------------------------- GAME_BATTLERBASE ---------------------------- */
Alias.Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return  Alias.Game_BattlerBase_canPaySkillCost.call(this, skill) && 
            this.canPayExtraCosts(skill)
}

Game_BattlerBase.prototype.canPayExtraCosts = function(skill){
    return  this.canPaySkillCParamCost(skill) && this.canPaySkillItemsCost(skill) && 
            this.canPaySkillVariableCost(skill) && this.canPaySkillGoldCost(skill) && 
            this.canPaySkillHpCost(skill)
}

Game_BattlerBase.prototype.canPaySkillCParamCost = function(skill){
    let canPay = [true]

    if(Plugin.skillHaveCustomCost(skill, "CParam")){

        for(const param in skill.cparamCost){
            const _propertyName = `_${param}`
            const costValue = this.skillCustomParameterCost(skill, param)
            canPay.push(this[_propertyName] >= costValue)
        }
    }

    return !canPay.includes(false)
}

Game_BattlerBase.prototype.canPaySkillItemsCost = function(skill) {
    let canPay = [true]

    if(Plugin.skillHaveCustomCost(skill, "Items")){

        for(const itemId in skill.itemsCost){
            const dataItem = $dataItems[itemId]
            const currentAmount = $gameParty.numItems(dataItem)
            const cost = this.skillItemCost(skill, itemId)

            canPay.push(currentAmount >= cost)
        }
    }

    return !canPay.includes(false)
}

Game_BattlerBase.prototype.canPaySkillVariableCost = function(skill) {
    let canPay = [true]

    if(Plugin.skillHaveCustomCost(skill, "Var")){

        for(const varId in skill.variableCost){
            const currentValue = $gameVariables.value(Number(varId))
            const cost = this.skillVariableCost(skill, varId)
            canPay.push(currentValue >= cost)
        }
    }

    return !canPay.includes(false)
}

Game_BattlerBase.prototype.canPaySkillGoldCost = function(skill){
    let canPay = true

    if(Plugin.skillHaveCustomCost(skill, "Gold")){
        canPay = $gameParty.gold() >= this.skillGoldCost(skill)
    }

    return canPay
}

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
    let canPay = true

    if(Plugin.skillHaveCustomCost(skill, "Hp")){
        const {cost, allowDeath} = this.skillHPCost(skill)
        const realCost = this.calculateSkillHpCost(cost)

        canPay = allowDeath || this._hp > realCost
    }

    return canPay
}

Game_BattlerBase.prototype.calculateSkillHpCost = function(rawCost) {
    const stringCost = String(rawCost)

    if(stringCost.includes("%")){
        const percent = Number(stringCost.replace("%", "")) / 100
        return Math.round(this.mhp * percent)
    }else{
        return Number(rawCost)
    }
}

Alias.Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Alias.Game_BattlerBase_paySkillCost.call(this, skill)
    this.paySkillCParamCost(skill)
    this.paySkillItemsCost(skill)
    this.paySkillVariableCost(skill)
    this.paySkillGoldCost(skill)
    this.paySkillHpCost(skill)
}

Game_BattlerBase.prototype.paySkillCParamCost = function(skill){
    for(const param in skill.cparamCost){
        const _propertyName = `_${param}`
        const value = this.skillCustomParameterCost(skill, param)
        this[_propertyName] -= value
    }
}

Game_BattlerBase.prototype.paySkillItemsCost = function(skill) {
    for(const itemId in skill.itemsCost){
        const amount = this.skillItemCost(skill, itemId)
        const dataItem = $dataItems[itemId]

        $gameParty.loseItem(dataItem, amount)
    }
}

Game_BattlerBase.prototype.paySkillVariableCost = function(skill){
    for(const varId in skill.variableCost){
        const cost = this.skillVariableCost(skill, varId)
        const currentValue = $gameVariables.value(Number(varId))

        $gameVariables.setValue(varId, currentValue - cost)
    }
}

Game_BattlerBase.prototype.paySkillGoldCost = function(skill){
    const cost = this.skillGoldCost(skill)
    $gameParty.loseGold(cost)  
}

Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
    const {cost, allowDeath} = this.skillHPCost(skill)
    const realCost = this.calculateSkillHpCost(cost)

    if(realCost > 0){
        const hp = this._hp
        const value = hp - realCost
        const min = allowDeath ? 0 : 1
        const result = hp.clamp(min, value)

        this.setHp(result)
    }
}

/* ---------------------------- UTILITY FUNCTIONS --------------------------- */

Game_BattlerBase.prototype.skillItemCost = function(skill, itemId) {
    const cost = skill.itemsCost[itemId] || 0
    return cost || 0
}

Game_BattlerBase.prototype.skillCustomParameterCost = function(skill, param) {
    const cost = skill.cparamCost[param]
    return cost || 0
}

Game_BattlerBase.prototype.skillVariableCost = function(skill, varId) {
    const cost = skill.variableCost[varId]
    return cost || 0
}

Game_BattlerBase.prototype.skillGoldCost = function(skill) {
    return skill.goldCost
}

Game_BattlerBase.prototype.skillHPCost = function(skill) {
    return skill.hpCost
}

/* ------------------------------- GAME ENEMY ------------------------------- */
Game_Enemy.prototype.canPaySkillGoldCost = function(skill){
    return true
}

Game_Enemy.prototype.canPaySkillItemsCost = function(skill){
    return true
}

Game_Enemy.prototype.paySkillGoldCost = function(skill){}
Game_Enemy.prototype.paySkillItemsCost = function(skill){}

/* ---------------------------- WINDOW_SKILLLIST ---------------------------- */
//Overwrite 
Window_SkillList.prototype.maxCols = function() {
    return Plugin.getParam().maxCols
}

Alias.Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    switch(Plugin.getParam().drawStyle){
        case "default":
            Alias.Window_SkillList_drawSkillCost.call(this, skill, x, y, width)
            break
        case "single":
            this.drawSingleCost(skill, y, width)
            break
        case "all":
            this.drawMultipleCost(skill, y, width)
            break
    }
} 

Window_SkillList.prototype.drawSingleCost = function(skill, y, width){
    const index = this._data.indexOf(skill)
    const rect = this.getTextLineRect(index) 
    const text = this.createSingleCostText(skill)
    const textWidth = this.getTextWidth(text)
    const x = rect.right - textWidth

    this.drawTextEx(text, x, y, width)
}

Window_SkillList.prototype.createSingleCostText = function(skill){
    const drawFunctions = this.getCostTextMethods()
    const separator = Plugin.getParam().separator
    let text = ``

    for(const costType of Plugin.getParam().costOrder){
        const funcName = drawFunctions[costType]
        text += this[funcName](skill)

        if(text.length > 0){
            break
        }
    }

    return text.substring(separator.length)
}

Window_SkillList.prototype.getCostTextMethods = function(){
    return {
        hp: "createHPCostText",
        mp: "createMPCostText",
        tp: "createTPCostText",
        gold: "createGoldCostText",
        item: "createItemsCostText",
        variable: "createVariablesCostText",
        customParameter: "createCustomParameterCostText"
    }
}

Window_SkillList.prototype.drawMultipleCost = function(skill, y, width){
    const index = this._data.indexOf(skill)
    const rect = this.getTextLineRect(index) 
    const text = this.createAllCostText(skill)
    const textWidth = this.getTextWidth(text)
    const x = rect.right - textWidth

    this.drawTextEx(text, x, y, width)
}

Window_SkillList.prototype.createAllCostText = function(skill){
    const drawFunctions = this.getCostTextMethods()
    const separator = Plugin.getParam().separator
    let text = ``

    for(const costType of Plugin.getParam().costOrder){
        const funcName = drawFunctions[costType]
        text += this[funcName](skill)
    }
    
    return text.substring(separator.length)
}

Window_SkillList.prototype.createCustomParameterCostText = function(skill){
    let text = ''

    for(const param in skill.cparamCost){
        const textData = Plugin.getParam().typeSettings.customParameters.find(item => item.name === param)
        const cost = this._actor.skillCustomParameterCost(skill, param)
        const type = param[0].toUpperCase() + param.substring(1)

        text += this.createFormatedCostText(textData, type, cost)
    }

    return text
}

Window_SkillList.prototype.createItemsCostText = function(skill){
    let text = ''

    for(const itemId in skill.itemsCost){
        const textData = Plugin.getParam().typeSettings.item
        const cost = this._actor.skillItemCost(skill, itemId)
        const type = {
            Icon: `\\i[${$dataItems[itemId].iconIndex}]`,
            Name: `${$dataItems[itemId].name}`,
        }[textData.style]

        text += this.createFormatedCostText(textData, type, cost)
    }

    return text
}

Window_SkillList.prototype.createVariablesCostText = function(skill){
    let text = ''

    for(const varId in skill.variableCost){
        const textData = Plugin.getParam().typeSettings.variables.find(item => item.id == varId)
        const cost = this._actor.skillVariableCost(skill, varId)
        const type = $dataSystem.variables[varId]

        text += this.createFormatedCostText(textData, type, cost)
    }

    return text
}

Window_SkillList.prototype.createGoldCostText = function(skill){
    const goldCost = this._actor.skillGoldCost(skill)
    let text = ''

    if(goldCost > 0){
        const textData = Plugin.getParam().typeSettings.gold
        const cost = goldCost
        const type = $dataSystem.currencyUnit
        
        text += this.createFormatedCostText(textData, type, cost)
    }
    
    return text
}

Window_SkillList.prototype.createHPCostText = function(skill){
    const {cost, allowDeath} = this._actor.skillHPCost(skill)
    const hp = this._actor.calculateSkillHpCost(cost)
    let text = ''
    
    if(hp > 0){
        const textData = Plugin.getParam().typeSettings.hp
        const type = TextManager.basic(3)
        text += this.createFormatedCostText(textData, type, cost)
    }
    
    return text
}

Window_SkillList.prototype.createMPCostText = function(skill){
    const mpCost = this._actor.skillMpCost(skill)
    let text = ''

    if(mpCost > 0){
        const textData = Plugin.getParam().typeSettings.mp
        const cost = mpCost
        const type = TextManager.basic(5)
        
        text += this.createFormatedCostText(textData, type, cost)
    }
    
    return text
}

Window_SkillList.prototype.createTPCostText = function(skill){
    const tpCost = this._actor.skillTpCost(skill)
    let text = ''

    if(tpCost > 0){
        const textData = Plugin.getParam().typeSettings.tp
        const cost = tpCost
        const type = TextManager.basic(7)

        text += this.createFormatedCostText(textData, type, cost)
    }
    
    return text
}

Window_SkillList.prototype.createFormatedCostText = function(textData, type, cost){
    const {prefix, between, suffix} = textData
    const separator = Plugin.getParam().separator
    
    const labelText = {
        "Type + Cost": `${type}${between}${cost}`,
        "Cost + Type": `${cost}${between}${type}`,
    }[Plugin.getParam().costStyle]

    const text = `${separator}${prefix}${labelText}${suffix}`

    return text
}

}