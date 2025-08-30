//============================================================================
// EliMZ_ClassCurves.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦2.4.3♦ Make a custom growth stats for classes independent of the editor.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-class-curve-for-rpg-maker/rate?source=game

@help 
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================
 
• Add a status curve for each standard parameter, fully customizable and 
independent of the editor.
• You can use fixed values.
• You can use random values.
• You can use values ​​within a minimum and maximum range.
• You can use formulas.
• Works for enemies, if you are using EliMZ_EnemyClass.js
• Works with custom parameters, if you are using EliMZ_CustomParameters.js
• Growth chance value, which allows you to control when a parameter will 
increase or not on level up. Similar to the Fire Emblem series.
• Change growth chance rate based on items, equipment, skills, or state!
• Decide if an actor will always join in the party with initial stats, 
regarding its level.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1hbtwcVcIeYtlNoGH3scTc0bmI_h_kkfbMoBa5kmxZN8/edit?usp=sharing

============================================================================

@param levelZero
@text Minimum stats
@type struct<stNormalParamList>
@desc The minimum normal stats for all classes at level 0.
@default {"mhp":"1","mmp":"0","atk":"1","def":"1","mat":"1","mdf":"1","agi":"1","luk":"1"}

@param levelZeroCustom
@text Minimum Custom stats
@type struct<stCustomParamList>[]
@desc The minimum custom stats for all classes at level 0.
Only works with Eli Custom Parameters.
@default ["{\"name\":\"Charisma (crm)\",\"value\":\"1\"}","{\"name\":\"Perception (per)\",\"value\":\"1\"}","{\"name\":\"Wisdom (wis)\",\"value\":\"1\"}","{\"name\":\"Reputation (rep)\",\"value\":\"1\"}"]

@param preset
@text Preset Class Curve
@type struct<stpreset>[]
@desc Here you can build your custom parameter curves for your classes.
@default ["{\"name\":\"Default\",\"normalParameters\":\"{\\\"mhp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mmp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"atk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"def\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mat\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mdf\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"agi\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"luk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"}\",\"customParameters\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Perception (per)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Charisma (crm)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Wisdom (wis)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Reputation (rep)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]

*/

/* ------------------------ MINIMUM NORMAL PARAMETERS ----------------------- */
{
/*~struct~stNormalParamList:

@param mhp
@text Maximum Hp
@type text
@desc
@default 1

@param mmp
@text Maximum Mp
@type text
@desc
@default 0

@param atk
@text Atk
@type text
@desc
@default 1

@param def
@text Def
@type text
@desc
@default 1

@param mat
@text Magic Atk
@type text
@desc
@default 1

@param mdf
@text Magic Def
@type text
@desc
@default 1

@param agi
@text Agility
@type text
@desc
@default 1

@param luk
@text Luck
@type text
@desc
@default 1

*/
}

/* ------------------------ MINIMUM CUSTOM PARAMETERS ----------------------- */
{

/*~struct~stCustomParamList:

@param name
@text Custom Parameter Name
@type text
@desc This parameter is for visual purposes only. 
It does nothing inside the code.
@default

@param value
@text Value
@type text
@desc
@default 0

*/

}

/* --------------------------------- PRESETS -------------------------------- */
{
/*~struct~stpreset:

@param name
@text Name
@type text
@desc The name for reference in the class's note field.
@default NewClassCurve

@param normalParameters
@text Normal Parameters
@type struct<normalParametersSt>
@desc Build the curves for regular parameters: Atk, Def, Hp, etc.
@default {"mhp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mmp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","atk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","def":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mat":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mdf":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","agi":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","luk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"}

@param customParameters
@text Custom
@type struct<customCurveSt>[]
@desc Only works with Eli Custom Parameters.
Set the curve for each custom parameter.
@default ["{\"name\":\"Perception (per)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Charisma (crm)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Wisdom (wis)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Reputation (rep)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"]

*/
}

/* ---------------------------- NORMAL PARAMETERS --------------------------- */
{
/*~struct~normalParametersSt:

@param mhp
@text Maximum Hp
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mmp
@text Maximum Mp
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param atk
@text Atk
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param def
@text Def
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mat
@text Magic Atk
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mdf
@text Magic Def
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param agi
@text Agility
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param luk
@text Luck
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

*/
}

/* ------------------------------ X PARAMETERS ------------------------------ */
{
/*~struct~xparametersSt:

@param hit
@text Hit rate
@type note
@desc Can use number or formulas.
@default 0

@param eva
@text Evasion
@type note
@desc Can use number or formulas.
@default 0

@param cri
@text Critical rate
@type note
@desc Can use number or formulas.
@default 0

@param cev
@text Critical evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mev
@text Magic evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mrf
@text Magic reflection rate
@type note
@desc Can use number or formulas.
@default 0

@param cnt
@text Counter attack rate
@type note
@desc Can use number or formulas.
@default 0

@param hrg
@text Hp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param mrg
@text Mp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param trg
@text Tp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* ------------------------------ S PARAMETERS ------------------------------ */
{
/*~struct~sparametersSt:

@param tgr
@text Target rate
@type note
@desc Can use number or formulas.
@default 0

@param grd
@text Guard effect rate
@type note
@desc Can use number or formulas.
@default 0

@param rec
@text Recovery effect rate
@type note
@desc Can use number or formulas.
@default 0

@param pha
@text Pharmacology
@type note
@desc Can use number or formulas.
@default 0

@param mcr
@text Mp Cost Rate
@type note
@desc Can use number or formulas.
@default 0

@param tcr
@text Tp Charge Rate
@type note
@desc Can use number or formulas.
@default 0

@param pdr
@text Physical Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param mdr
@text Magic Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param fdr
@text Floor Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param exr
@text Experience Rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* -------------------- DEFAULT PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~defaultCurveSt:

@param growthChance
@text Growth chance
@type text
@desc The chance that the actor will have to raise this parameter when level up. From 0 to 100.
@default 100

@param initial
@text Initial
@type note
@desc The initial value of this parameter.
@default 10

@param min
@text Min
@type note
@desc The minimum value that a parameter can raise when level up.
@default 0

@param max
@text Max
@type note
@desc The maximum value that a parameter can raise when level up.
@default 5

@param cap
@text Limit
@type note
@desc The higher value that a class can have for this parameter.
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

/* --------------------- CUSTOM PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~customCurveSt:

@param name
@text Custom Parameter Name
@type text
@desc This parameter is for visual purposes only. 
It does nothing inside the code.
@default

@param growthChance
@text Growth chance
@type text
@desc The chance that the actor will have to raise this parameter when level up. From 0 to 100.
@default 100

@param initial
@text Initial
@type note
@desc The initial value of this parameter.
@default 10

@param min
@text Min
@type note
@desc The minimum value that a parameter can raise when level up.
@default 0

@param max
@text Max
@type note
@desc The maximum value that a parameter can raise when level up.
@default 5

@param cap
@text Limit
@type note
@desc The higher value that a class can have for this parameter.
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ClassCurves = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.ClassCurves = {

    Parameters: class {
        constructor(parameters){
            const {paramCurves, customParamCurves, defaultCurveName} = this.parseClassCurves(JSON.parse(parameters.preset))
            this.levelZero = this.parseLevelZeroParamValues(JSON.parse(parameters.levelZero))
            this.levelZeroCustom = this.parseLevelZeroCustomParamValues(JSON.parse(parameters.levelZeroCustom))
            this.paramsCurve = paramCurves
            this.cparamsCurve = customParamCurves
            this.defaultCurveName = defaultCurveName
        }

        parseLevelZeroParamValues(parameters){
            return [
                Number(parameters.mhp), 
                Number(parameters.mmp), 
                Number(parameters.atk), 
                Number(parameters.def), 
                Number(parameters.mat), 
                Number(parameters.mdf), 
                Number(parameters.agi), 
                Number(parameters.luk)
            ]
        }

        parseLevelZeroCustomParamValues(parameters){
            const allParams = []

            for(const param of parameters){
                const parsedParam = JSON.parse(param)
                allParams.push(Number(parsedParam.value))
            }

            return allParams
        }

        parseClassCurves(parameters){
            const paramCurves = {}
            const customParamCurves = {}
            let defaultCurveName = null

            for(const param of parameters){
                const parsedParam = JSON.parse(param)
                const curveName = Eli.String.removeSpaces(parsedParam.name)

                paramCurves[curveName] = this.parseParamCurves(JSON.parse(parsedParam.normalParameters))
                customParamCurves[curveName] = this.parseCustomParamCurves(JSON.parse(parsedParam.customParameters))

                if(!defaultCurveName){
                    defaultCurveName = curveName
                }
            }

            return {paramCurves, customParamCurves, defaultCurveName}
        }

        parseParamCurves(parameters){
            return [
                this.parseCurveData(JSON.parse(parameters.mhp)), 
                this.parseCurveData(JSON.parse(parameters.mmp)), 
                this.parseCurveData(JSON.parse(parameters.atk)), 
                this.parseCurveData(JSON.parse(parameters.def)), 
                this.parseCurveData(JSON.parse(parameters.mat)), 
                this.parseCurveData(JSON.parse(parameters.mdf)), 
                this.parseCurveData(JSON.parse(parameters.agi)), 
                this.parseCurveData(JSON.parse(parameters.luk)), 
            ]
        }

        parseCustomParamCurves(parameters){
            const allParams = []

            for(const param of parameters){
                const parsedParam = JSON.parse(param)
                const curveData = this.parseCurveData(parsedParam)
                curveData.name = parsedParam.name
                allParams.push(curveData)
            }

            return allParams
        }

        parseCurveData(parameters){
            return {
                growthChance: Number(parameters.growthChance), 
                initial: JSON.parse(parameters.initial), 
                min: JSON.parse(parameters.min), 
                max: JSON.parse(parameters.max), 
                cap: JSON.parse(parameters.cap), 
                bonus: JSON.parse(parameters.bonus)
            }
        }
    },

    initialize(){
        this.initParameters()
    },

    initParameters(){
        this.parameters = new this.Parameters(PluginManager.parameters("EliMZ_ClassCurves"))
    },

    getParam(){
        return this.parameters
    },

    getClassCurve(classId, isCustom){
        if(classId > 0){
            const dataClass = $dataClasses[classId]
            const name = dataClass.meta.CustomCurve

            if(name){
                return this.getParamCurve(Eli.String.removeSpaces(name), isCustom)
            }else{
                return this.getDefaultParamCurve(isCustom)
            }
            
        }else{
            return this.getDefaultParamCurve(isCustom)
        }
        
    },

    getParamCurve(name, isCustom){
        if(isCustom){
            return this.getParam().cparamsCurve[name]
        }else{
            return this.getParam().paramsCurve[name]
        }
    },

    getDefaultParamCurve(isCustom){
        if(isCustom){
            return this.getParam().cparamsCurve[this.getParam().defaultCurveName]
        }else{
            return this.getParam().paramsCurve[this.getParam().defaultCurveName]
        }
    },

    createNewClassHistory(){
        return {
            params: new Array(8),
            level: 0,
        }
    },

    fillLevelZero(history){
        for(let id = 0; id < history.params.length; id++){
            history.params[id] = new Array(100).fill(0)
            history.params[id][0] = this.getParam().levelZero[id]
        }
    },

    getRegularParamId(paramName){
        return {mhp: 0, mmp: 1, atk: 2, def: 3, mat: 4, mdf: 5, agi: 6, luk: 7}[paramName]
    },

    addGrowthChanceEffect(data){
        if(data.meta.GrowthChanceParam){
            this.addGrowChanceEffectParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceEffectCParam(data)
        }
    },
    
    addGrowChanceEffectParam(data){
        const growthChanceParam = Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",")

        for(const chance of growthChanceParam){
            let [paramId, value] = chance.split(":")
            paramId = isNaN(paramId) ? this.getRegularParamId(paramId) : Number(paramId)
            
            data.effects.push({
                code: "Growth Chance Param", dataId: paramId, value1: Number(value), value2: 0
            })
        }
    },
    
    addGrowChanceEffectCParam(data){
        const growthChanceCParam = Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",")

        for(const chance of growthChanceCParam){
            let [cparamId, value] = chance.split(":")
            cparamId = Eli.CustomParameter.findCParamId(cparamId)

            data.effects.push({
                code: "Growth Chance Custom Param", dataId: cparamId, value1: Number(value), value2: 0
            })
        }
    },
    
    addGrowthChanceValue(data){
        this.createGrowthChanceForDataObject(data)

        if(data.meta.GrowthChanceParam){
            this.addGrowChanceValueParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceValueCParam(data)
        }
    },

    createGrowthChanceForDataObject(data){
        data.growthChanceParam = [0, 0, 0, 0, 0, 0, 0, 0]
    },
    
    addGrowChanceValueParam(data){
        const growthChanceCParam = Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",")

        for(const chance of growthChanceCParam){
            let [paramId, value] = chance.split(":")
            paramId = isNaN(paramId) ? this.getRegularParamId(paramId) : Number(paramId)
            
            data.growthChanceParam[paramId] = Number(value)
        }
    },
    
    addGrowChanceValueCParam(data){
        const growthChanceCParam = Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",")

        for(const chance of growthChanceCParam){
            let [cparamId, value] = chance.split(":")
            cparamId = Eli.CustomParameter.findCParamId(cparamId)
    
            data.growthChanceCParam[cparamId] = Number(value)
        }
    },

}

if(Imported.Eli_CustomParameter){

    Eli.ClassCurves.createGrowthChanceForDataObject = function(data){
        data.growthChanceParam = [0, 0, 0, 0, 0, 0, 0, 0]
        data.growthChanceCParam = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
    }

    Eli.ClassCurves.createNewClassHistory = function(){
        return {
            params: new Array(8),
            cparams: new Array(Eli.CustomParameter.cParamsLength()),
            level: 0,
        }
    },

    Eli.ClassCurves.fillLevelZero = function(history){
        for(let id = 0; id < history.params.length; id++){
            history.params[id] = new Array(100).fill(0)
            history.params[id][0] = this.parameters.levelZero[id]
        }

        for(let id = 0; id < history.cparams.length; id++){
            history.cparams[id] = new Array(100).fill(0)
            history.cparams[id][0] = this.parameters.levelZeroCustom[id]
        }
    }
}

{

const Plugin = Eli.ClassCurves
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_processDataSkills = Scene_Boot.prototype.processDataSkills
Scene_Boot.prototype.processDataSkills = function(data){
    Alias.Scene_Boot_processDataSkills.call(this, data)
    Plugin.addGrowthChanceEffect(data)
}

Alias.Scene_Boot_processDataItems = Scene_Boot.prototype.processDataItems
Scene_Boot.prototype.processDataItems = function(data){
    Alias.Scene_Boot_processDataItems.call(this, data)
    Plugin.addGrowthChanceEffect(data)
}

Alias.Scene_Boot_processDataWeapons = Scene_Boot.prototype.processDataWeapons
Scene_Boot.prototype.processDataWeapons = function(data){
    Alias.Scene_Boot_processDataWeapons.call(this, data)
    Plugin.addGrowthChanceValue(data)
}

Alias.Scene_Boot_processDataArmors = Scene_Boot.prototype.processDataArmors
Scene_Boot.prototype.processDataArmors = function(data){
    Alias.Scene_Boot_processDataArmors.call(this, data)
    Plugin.addGrowthChanceValue(data)
}

Alias.Scene_Boot_processDataStates = Scene_Boot.prototype.processDataStates
Scene_Boot.prototype.processDataStates = function(data){
    Alias.Scene_Boot_processDataStates.call(this, data)
    Plugin.addGrowthChanceValue(data)
}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
Alias.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    Alias.Game_BattlerBase_initMembers.call(this)
    this.initMembers_ClassCurves()
}

Game_BattlerBase.prototype.initMembers_ClassCurves = function() {
    this.clearGrowthChanceParamPlus()

    if(Imported.Eli_CustomParameter){
        this.clearGrowthChanceCParamPlus()
    }
}

Game_BattlerBase.prototype.clearGrowthChanceParamPlus = function() {
    this.growthChanceParamPlus = [0, 0, 0, 0, 0, 0, 0, 0]
}

Game_BattlerBase.prototype.clearGrowthChanceCParamPlus = function() {
    this.growthChanceCParamPlus = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
}

Game_BattlerBase.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = this.growthChanceParamPlus[paramId]
    let stateChance = 0

    for(const state of this.states()){
        if(state){
            stateChance += state.growthChanceParam[paramId]
        }
    }

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = this.growthChanceCParamPlus[paramId]
    let stateChance = 0

    for(const state of this.states()){
        if(state){
            stateChance += state.growthChanceCParam[paramId]
        }
    }

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.addGrowthChanceParamPlus = function(paramId, value) {
    this.growthChanceParamPlus[paramId] = this.growthChanceParamPlus[paramId] + value
}

Game_BattlerBase.prototype.addGrowthChanceCParamPlus = function(paramId, value) {
    this.growthChanceCParamPlus[paramId] = this.growthChanceCParamPlus[paramId] + value
}

/* ------------------------------ GAME BATTLER ------------------------------ */
Alias.Game_Battler_initMembers_ClassCurves = Game_Battler.prototype.initMembers_ClassCurves
Game_Battler.prototype.initMembers_ClassCurves = function() {
    Alias.Game_Battler_initMembers_ClassCurves.call(this)
    this.hasFilledHoldLevels = false
    this._classHistory = {}
}

Game_Battler.prototype.paramMin = function(id, isCustom) {
    if(isCustom){
        return Plugin.getParam().levelZeroCustom[id]
    }else{
        return Plugin.getParam().levelZero[id]
    }
}

Game_Battler.prototype.initClassHistory = function(classId){
    this.initParamHistory(classId)
    this.fillHistoryFirstLevel(false, classId)
    
    if(Imported.Eli_CustomParameter){
        this.fillHistoryFirstLevel(true, classId)
    }
}

Game_Battler.prototype.initParamHistory = function(classId){
    const history = Plugin.createNewClassHistory(classId)
    Plugin.fillLevelZero(history)
    this._lastParamsGain = new Array(8).fill(0)

    if(Imported.Eli_CustomParameter){
        const length = history.cparams.length
        this._lastCParamsGain = new Array(length).fill(0)
    }

    this._classHistory[classId] = history
}

Game_Battler.prototype.fillHistoryFirstLevel = function(isCustom, classId){
    const history = this.getClassHistoryParams(isCustom, classId)
    
    for(let id = 0; id < history.length; id++){    
        const initialParam = this.initialParamCurve(id, isCustom, classId)
        const level = 1

        history[id][level] = initialParam
    }

    this.getClassHistory(classId).level = 1
}

Game_Battler.prototype.getClassHistory = function(classId = this._classId){
    return this._classHistory[classId]
}

Game_Battler.prototype.getClassHistoryParams = function(isCustom, classId){
    if(isCustom){
        return this.cparamsHistory(classId)
    }else{
        return this.paramsHistory(classId)
    }
}

Game_Battler.prototype.paramsHistory = function(classId = this._classId){
    return this.getClassHistory(classId).params
}

Game_Battler.prototype.cparamsHistory = function(classId = this._classId){
    return this.getClassHistory(classId).cparams
}

Game_Battler.prototype.updateClassHistoryLevel = function(classId, targetLevel){
    for(let i = 2; i <= targetLevel; i++){
        this.levelUpClassHistory(classId, i)
    }
}

Game_Battler.prototype.levelUpClassHistory = function(classId, targetLevel){
    if(targetLevel <= this.getClassHistory(classId).level) return

    const isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        this.setHistoryLevel(targetLevel, !isCustom, classId)
    }

    this.getClassHistory(classId).level++
}

Game_Battler.prototype.levelDownClassHistory = function(classId, targetLevel){
    if(targetLevel >= this.getClassHistory(classId).level) return

    const isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        this.setHistoryLevel(targetLevel, !isCustom, classId)
    }

    this.getClassHistory(classId).level--
}

Game_Battler.prototype.setHistoryLevel = function(level, isCustom, classId){
    const isLevelUp = level > this.getClassHistory(classId).level
    const history = this.getClassHistoryParams(isCustom, classId)

    for(let id = 0; id < history.length; id++){
        const curveValue = this.getParamValueFromCustomCurve(id, isCustom, classId)
        const paramValue = this.setParamValueWithCustomCurve(history, id, isCustom, level, curveValue, classId)

        this.fillHistory(history, isCustom, level, id, curveValue, paramValue, isLevelUp)
    }
}

Game_Battler.prototype.holdInitialCurve = function(){
    if(this.canHoldInitialCurve() && !this.hasFilledHoldLevels){
        this.fillHistoryWithInitialCurve(this._classId, false)

        if(Imported.Eli_CustomParameter){
            this.fillHistoryWithInitialCurve(this._classId, true)
        }

        this._level = levelToHold
        this.hasFilledHoldLevels = true
    }
}

Game_Battler.prototype.canHoldInitialCurve = function(){
    return this.getDatabase().meta.hasOwnProperty('HoldCurve')
}

Game_Battler.prototype.fillHistoryWithInitialCurve = function(isCustom, classId){
    const levelToHold = this.getHoldCurveLevel()
    const stopFill = levelToHold + 1
    const paramHistory = this.getClassHistoryParams(isCustom, classId)

    for(let i = 0; i < paramHistory.length; i++){
        const parameter = paramHistory[i]
        const value = parameter[1]
    
        parameter.fill(value, 2, stopFill)
    }
}

Game_Battler.prototype.getHoldCurveLevel = function(){
    return Number(this.getDatabase().meta.HoldCurve)
}

Game_Battler.prototype.hasParamGrowthChance = function(id, isCustom, classId){
    const failChance = Math.randomInt(101)
    const growthChance = this.paramGrowthChance(id, isCustom, classId)
    const hasChance = growthChance >= failChance
    
    return hasChance
}

Game_Battler.prototype.getParamValueFromCustomCurve = function(id, isCustom, classId){
    if(this.hasParamGrowthChance(id, isCustom, classId)){
        return this.generateParamValueFromCurve(id, isCustom, classId)
    }else{
        return 0
    }
}

Game_Battler.prototype.generateParamValueFromCurve = function(id, isCustom, classId){
    const minCurve = this.minParamCurve(id, isCustom, classId)
    const maxCurve = this.maxParamCurve(id, isCustom, classId)
    const curveValue = Math.randomInt(maxCurve + 1)

    return Math.max(minCurve, curveValue)
}

Game_Battler.prototype.setParamValueWithCustomCurve = function(history, id, isCustom, level, curveValue, classId){
    const capCurve = this.capParamCurve(id, isCustom, classId)
    const newParamValue = history[id][level-1] + curveValue

    return Math.min(capCurve, newParamValue)
}

Game_Battler.prototype.setLastParamsGain = function(paramId, isCustom, value, paramValue, classId){
    const capValue = this.capParamCurve(paramId, isCustom, classId)

    if(paramValue + value >= capValue){
        const lastParam = (paramValue + value) - capValue
        this._lastParamsGain[paramId] = lastParam

    }else{

        if(isCustom){
            this._lastCParamsGain[paramId] = value
        }else{
            this._lastParamsGain[paramId] = value
        }
    }
}

Game_Battler.prototype.fillHistory = function(history, isCustom, level, paramId, curveValue, paramValue, isLevelUp){
    if(isLevelUp){
        history[paramId][level] = paramValue
        this.setLastParamsGain(paramId, isCustom, curveValue, paramValue)
        
    }else{
        history[paramId][level + 1] = 0
        this.setLastParamsGain(paramId, isCustom, 0, paramValue)
    }
}

Game_Battler.prototype.paramGrowthChance = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const classChance = curve[id]['growthChance']
    const battlerChance = isCustom ? this.getGrowthChanceCParamPlus(id) : this.getGrowthChanceParamPlus(id)

    return (classChance + battlerChance).clamp(0, 100)
}

Game_Battler.prototype.initialParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['initial']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.minParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['min']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.maxParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['max']

    return this.evaluateParameter(param);
}

Game_Battler.prototype.capParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['cap']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.evaluateParameter = function(param){
    if(isNaN(param)){
        return eval(param)
    }else{
        return Number(param)
    }
}

Game_Battler.prototype.lastParamsGain = function(){
    return this._lastParamsGain
}

Game_Battler.prototype.lastCParamsGain = function(){
    return this._lastCParamsGain
}

Game_Battler.prototype.changeClassHistoryLevel = function(targetLevel){
    const currentLevel = this._level
    const levelDifference = Math.abs(currentLevel - targetLevel)

    if(currentLevel < targetLevel){

        for(let i = 0; i < levelDifference; i++){
            this.levelUp()
        }

    }else if(currentLevel > targetLevel){

        for(let i = 0; i < levelDifference; i++){
            this.levelDown()
        }
    }
}

Game_Battler.prototype.prepareClass = function(classId, keepExp){
    const targetLevel = keepExp ? this._level : 1

    if(this.canInitClassHistory(classId)){
        this.initClassHistory(classId, targetLevel)
    }
    
    this.updateClassHistoryLevel(classId, targetLevel)
}

Game_Battler.prototype.canInitClassHistory = function(classId){
    return !this._classHistory.hasOwnProperty(classId)
}

/* ------------------------------- GAME ACTOR ------------------------------- */
Alias.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    this.setupMainClass(actorId)
    Alias.Game_Actor_setup.call(this, actorId)
    this.fillMainClass(actorId)
}

Alias.Game_Actor_param = Game_Actor.prototype.param
Game_Actor.prototype.param = function(paramId) {
    const alias = Alias.Game_Actor_param.call(this, paramId)
    const maxValue = this.capParamCurve(paramId)
    const minValue = this.paramMin(paramId)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_cparam = Game_Actor.prototype.cparam
Game_Actor.prototype.cparam = function(paramId) {
    const alias = Alias.Game_Actor_cparam.call(this, paramId)
    const maxValue = this.capParamCurve(paramId, true)
    const minValue = this.paramMin(paramId, true)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_levelUp = Game_Actor.prototype.levelUp
Game_Actor.prototype.levelUp = function() {
    this.levelUpClassHistory(this._classId, this._level + 1)
    Alias.Game_Actor_levelUp.call(this)
}

Alias.Game_Actor_levelDown = Game_Actor.prototype.levelDown
Game_Actor.prototype.levelDown = function() {
    Alias.Game_Actor_levelDown.call(this)
    this.levelDownClassHistory(this._classId, this._level)
}

Alias.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel
Game_Actor.prototype.changeLevel = function(level, show) {
    this.changeClassHistoryLevel(level)
    Alias.Game_Actor_changeLevel.call(this, level, show)
}

Alias.Game_Actor_changeClass = Game_Actor.prototype.changeClass
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this.prepareClass(classId, keepExp)
    Alias.Game_Actor_changeClass.call(this, classId, keepExp)
}

// Overwrite, since we do not use the params from $dataClasses anymore.
Game_Actor.prototype.paramBase = function(paramId) {
    return this.paramsHistory()[paramId][this._level]
}

Game_Actor.prototype.cparamBase = function(paramId) {
    return this.cparamsHistory()[paramId][this._level]
}

Game_Actor.prototype.setupMainClass = function(actorId){
    const actor = $dataActors[actorId]
    this._classId = actor.classId

    if(this.canInitClassHistory(this._classId)){
        this.initParamHistory(this._classId)
    }
}

Game_Actor.prototype.fillMainClass = function(actorId){
    this._level = 1
    this.fillHistoryFirstLevel(false, this._classId)

    if(Imported.Eli_CustomParameter){
        this.fillHistoryFirstLevel(true, this._classId)
    }

    this.holdInitialCurve()
    this.changeLevel($dataActors[actorId].initialLevel)
    this.getClassHistory(this._classId).level = $dataActors[actorId].initialLevel
    this.recoverAll()
}

Game_Actor.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
    let equipChance = 0

    for(const equip of this.equips()){
        if(equip){
            equipChance += equip.growthChanceParam[paramId]
        }
    }

    return battlerChance + equipChance
}

Game_Actor.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
    let equipChance = 0

    for(const equip of this.equips()){
        if(equip){
            equipChance += equip.growthChanceCParam[paramId]
        }
    }

    return battlerChance + equipChance
}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

    Alias.Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        this.setupMainClass(enemyId)
        Alias.Game_Enemy_setup.call(this, enemyId, x, y)
        this.fillMainClass()
    }

    Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
    Game_Enemy.prototype.cparamBase = function(paramId) {
        if(this._classId > 0){
            return this.cparamsHistory()[paramId][this._level]
        }else{
            return Alias.Game_Enemy_cparamBase.call(this, paramId)
        }
    }

    Alias.Game_Enemy_param = Game_Enemy.prototype.param
    Game_Enemy.prototype.param = function(paramId) {
        let value = Alias.Game_Enemy_param.call(this, paramId)

        if(this._classId > 0){
            const maxValue = this.capParamCurve(paramId)
            const minValue = this.paramMin(paramId)
            value = value.clamp(minValue, maxValue)
        }

        return value
    }

    Alias.Game_Enemy_cparam = Game_Enemy.prototype.cparam
    Game_Enemy.prototype.cparam = function(paramId) {
        let value = Alias.Game_Enemy_cparam.call(this, paramId)

        if(this._classId > 0){
            const maxValue = this.capParamCurve(paramId, true)
            const minValue = this.paramMin(paramId, true)
            value = value.clamp(minValue, maxValue)
        }

        return value
    }

    // Alias from Enemy Class
    Alias.Game_Enemy_levelUp = Game_Enemy.prototype.levelUp
    Game_Enemy.prototype.levelUp = function() {
        this.levelUpClassHistory(this._classId, this._level + 1)
        Alias.Game_Enemy_levelUp.call(this)
    }

    // Alias from Enemy Class
    Alias.Game_Enemy_levelDown = Game_Enemy.prototype.levelDown
    Game_Enemy.prototype.levelDown = function() {
        Alias.Game_Enemy_levelDown.call(this)
        this.levelDownClassHistory(this._classId, this._level)
    }

    // Alias from Enemy Class
    Alias.Game_Enemy_changeLevel = Game_Enemy.prototype.changeLevel
    Game_Enemy.prototype.changeLevel = function(level, show) {
        this.changeClassHistoryLevel(level)
        Alias.Game_Enemy_changeLevel.call(this, level, show)
    }

    // Alias from Enemy Class
    Alias.Game_Enemy_changeClass = Game_Enemy.prototype.changeClass
    Game_Enemy.prototype.changeClass = function(classId, keepExp) {
        this.prepareClass(classId, keepExp)
        Alias.Game_Enemy_changeClass.call(this, classId, keepExp)
    }

    Game_Enemy.prototype.hasInitialLevel = function(){
        return this.enemy().meta.hasOwnProperty('InitialLevel')
    }

    // Overwrite from Enemy Class. We do not use the params from $dataClasses anymore.
    Game_Enemy.prototype.getParamBaseFromClass = function(paramId) {
        return this.paramsHistory()[paramId][this._level]
    }

    Game_Enemy.prototype.setupMainClass = function(enemyId){
        const enemy = $dataEnemies[enemyId]
        const meta = enemy.meta
        this._classId = Number(meta.ClassId) || 0
        
        if(this._classId > 0 && this.canInitClassHistory(this._classId)){
            this.initParamHistory(this._classId)
        }
    }

    Game_Enemy.prototype.fillMainClass = function(){
        if(this._classId > 0){
            this.fillHistoryFirstLevel(false, this._classId)

            if(Imported.Eli_CustomParameter){
                this.fillHistoryFirstLevel(true, this._classId)
            }

            this.holdInitialCurve()
            this.changeLevel(this._initialLevel)
            this.getClassHistory(this._classId).level = this._initialLevel
        }

        this.recoverAll()
    }

    Game_Enemy.prototype.getGrowthChanceParamPlus = function(paramId) {
        const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
        let equipChance = 0

        for(const equip of this.equips()){
            if(equip){
                equipChance += equip.growthChanceParam[paramId]
            }
        }

        return battlerChance + equipChance
    }

    Game_Enemy.prototype.getGrowthChanceCParamPlus = function(paramId) {
        const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
        let equipChance = 0

        for(const equip of this.equips()){
            if(equip){
                equipChance += equip.growthChanceCParam[paramId]
            }
        }

        return battlerChance + equipChance
    }
}

/* ------------------------------- GAME ACTION ------------------------------ */
Game_Action.EFFECT_GROWTH_CHANCE_PARAM            = "Growth Chance Param"
Game_Action.EFFECT_GROWTH_CHANCE_CPARAM           = "Growth Chance Custom Param"

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectGrowthChance(target, effect)
}

Game_Action.prototype.applyItemEffectGrowthChance = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_GROWTH_CHANCE_PARAM:
            this.itemEffectGrowChanceParam(target, effect)
        break
        case Game_Action.EFFECT_GROWTH_CHANCE_CPARAM:
            this.itemEffectGrowChanceCParam(target, effect)
        break
    }
}

Game_Action.prototype.itemEffectGrowChanceParam = function(target, effect) {
    target.addGrowthChanceParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectGrowChanceCParam = function(target, effect) {
    target.addGrowthChanceCParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

}