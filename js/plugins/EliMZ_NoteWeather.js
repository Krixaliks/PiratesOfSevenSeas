//============================================================================
// EliMZ_NoteWeather.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.2.0♦ Manage your weather through map note tags!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-noteweather-rpg-maker-mv

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/eli-noteweather-rpg-maker-mv/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Automatically add or remove weather in any map via note tags
● Use conditions via switches or variables to add/remove the weather.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1hFmh3E3h_rfA0ErapqQnM_N9lTGdQ3l_dQX6H6ynmVg/edit?usp=sharing

============================================================================

@param clearWeather
@text Clear Weather Note
@type boolean
@desc If true, if a map has no Weather note tag, it will clear the weather.
@default true

@param conditionClear
@text Clear Weather Condition
@type boolean
@desc If true, if a map has a note tag condition, and it fails, it will clear the weather.
@default true

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_NoteWeather = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.NoteWeather = {

    version: 5.20,
    url: "https://hakuenstudio.itch.io/eli-noteweather-rpg-maker-mv",
    alias: {},
    parameters: {
        clearWeather: true,
        conditionClear: true,
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_NoteWeather")
        this.parameters.clearWeather = parameters.clearWeather === "true"
        this.parameters.conditionClear = parameters.conditionClear === "true"
    },

    initPluginCommands(){},

    createWeatherData(note){
        const weatherData = []
        const rawNote = Eli.String.removeSpaces(note).toLowerCase()
        const weathers = rawNote.split(";")

        for(const weather of weathers){
            const parsedNote = Eli.Utils.convertEscapeVariablesOnly(weather).split(",")
            const weatherType = parsedNote[0]
            const power = Number(parsedNote[1])
            const duration = Number(parsedNote[2])
            const condition = this.createWeatherCondition(parsedNote)

            weatherData.push({
                data: [weatherType, power, duration],
                condition: condition
            })
        }

        return weatherData
    },

    createWeatherCondition(parsedNote){
        const condition = parsedNote[3]
        switch(condition){
            case "sw":
                return {
                    type: "sw",
                    id: Number(parsedNote[4]) || 0,
                    value: parsedNote[5] === "true"
                }
            case "var":
                return {
                    type: "var",
                    id: Number(parsedNote[4]) || 0,
                    operator: parsedNote[5] || "===",
                    value: Number(parsedNote[6]) || 0,
                }
            default:
                return {
                    type: null,
                    id: null,
                    operator: null,
                    value: null
                }
        }
    },

    checkWeatherCondition(condition){
        if(condition.type === "sw"){
            return $gameSwitches.value(condition.id)

        }else if(condition.type === "var"){
            const varValue = $gameVariables.value(condition.id)
            const value = condition.value

            switch(condition.operator){
                case "equal":       return varValue === value
                case "biggerequal": return varValue >= value
                case "lessequal":   return varValue <= value
                case "bigger":      return varValue > value
                case "less":        return varValue < value
            }

        }else{
            return true
        }
    },

    param(){
        return this.parameters
    },

}

const Plugin = Eli.NoteWeather
const Alias = Eli.NoteWeather.alias

Plugin.initialize()

/* -------------------------------- SCENE MAP ------------------------------- */

Alias.Scene_Map_beforeStartAndTransferIsOn = Scene_Map.prototype.beforeStartAndTransferIsOn
Scene_Map.prototype.beforeStartAndTransferIsOn = function() {
    Alias.Scene_Map_beforeStartAndTransferIsOn.call(this)
    if(!DataManager.isEventTest()) {
        this.setWeather()
    }
}

Scene_Map.prototype.hasNoteWeather = function(){
    return $dataMap.meta.hasOwnProperty("Weather")
}

Scene_Map.prototype.setWeather = function(){
    if(this.hasNoteWeather()){
        const noteData = Plugin.createWeatherData($dataMap.meta.Weather)
        const weather = noteData.find(item => Plugin.checkWeatherCondition(item.condition))

        if(weather){
            $gameScreen.changeWeather(...weather.data)

        }else if(Plugin.param().conditionClear){
            $gameScreen.clearWeather()
        }
        
    }else if(Plugin.param().clearWeather){
        $gameScreen.clearWeather()
    }
}

}