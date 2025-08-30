//============================================================================
// Eli_MessageActions.js
//============================================================================

/*:
@target MZ
@orderAfter EliMZ_EscapeCodes
@orderAfter EliMVZ_EscapeCodes
@orderAfter CGMZ_Core
@orderAfter CGMZ_Encyclopedia

@plugindesc ♦2.1.3♦ Adds action escape codes to be used on any window!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-message-actions-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● Add new escape codes that can:
• Draw images from any img folder!
• Change switches, self switches, and variables.
• Play common event
• Show animations, balloon
• Scroll, fade(in and out), tint, shake, and flash the map!
• Change wether
• Play BGM, BGS, ME, SE
• Change font to bold or italic
• Change font outline color and width
• Align Left | Center | Right
• Change face image/index of the message window
• Change font face (Eli FontManager or Eli BitmapFontPro)
● Works almost on every window, including scroll text!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1UxMk8qhA1rHiq8NA9Cu2Z7QKePhELlFVSKy7YOsIAm4/edit?usp=sharing

============================================================================

@param underlineHeight
@text Underline height
@type text
@desc the height of the line that will be used as underline.
@default 1

@param strikeThroughHeight
@text Strike Through height
@type text
@desc The height of the line that will be used to strike through the text.
@default 1

@param alignMode
@text Persistent Alignment
@type boolean
@on Auto
@off Manual
@desc If true, the align style will persist across new lines, until you remove it or the window initialize again.
@default true

@param label1
@text General Codes

@param txt
@text Text
@type struct<txtSt>
@desc Action Codes related to the text itself.
Only A-Z. Not case sensitive.
@default {"align":"ALIGN","underline":"UL","strike":"TS","textBackground":"BGC","bold":"BOLD","italic":"ITALIC","color":"COLOR","outColor":"OUTCOLOR","outWidth":"OUTWIDTH"}
@parent label1

@param sound
@text Sound
@type struct<soundSt>
@desc Action Codes related to the sound.
Only A-Z. Not case sensitive.
@default {"pbgm":"PBGM","fobgm":"FBGM","pbgs":"PBGS","fobgs":"FBGS","pme":"PME","pse":"PSE"}
@parent label1

@param event
@text Eventing
@type struct<eventSt>
@desc Action Codes related to event commands.
Only A-Z. Not case sensitive.
@default {"changeSwitch":"CSW","changeSelfSwitch":"CSSW","changeVariable":"CVAR","commonEvent":"PCE","balloon":"SBI","animation":"SAN","scrollMap":"SCROLL","fade":"FADE","tint":"TINT","flash":"FLASH","shake":"SHAKE","weather":"WEATHER"}
@parent label1

@param advanced
@text Advanced
@type struct<advancedSt>
@desc Advanced Action Codes.
@default {"formula":"SCRIPT","image":"DRAWIMG"}
@parent label1

@param label2
@text Message Codes

@param msgFace
@text Face
@type struct<msgFaceSt>
@desc Action codes to modify the face on the message.
Only A-Z. Not case sensitive.
@default {"actorFace":"ACTORFACE","memberFace":"PARTYFACE","faceFile":"FACENAME","faceIndex":"FACEINDEX","faceAll":"CHANGEFACE"}
@parent label2

@param msgDefault
@text Others
@type struct<msgDefaultSt>
@desc Action codes related to message.
Only A-Z. Not case sensitive.
@default {"wait":"WAIT"}
@parent label2

@param label3
@text From Other Plugins

@param extensionPlugins
@text Extension Plugins
@type struct<extensionPluginsST>
@desc Action codes related to other plugins.
Only A-Z. Not case sensitive.
@default {"changeMessageSE":"CSE","changeFont":"FNT"}
@parent label3

*/

/* ------------------------------- TEXT CODES ------------------------------- */
{

/*~struct~txtSt:

@param align
@text Horizontal Align
@type text
@desc \Align[Option] 
Option can be Left, Center, or Right
@default ALIGN

@param underline
@text Underline
@type text
@desc \UL[boolean]
True for enable. False for disable.
@default UL

@param strike
@text Strikethrough
@type text
@desc \TS[boolean]
True for enable. False for disable.
@default TS

@param textBackground
@text Text Background
@type text
@desc \BGC[boolean, color]
Boolean = true or false | color = Hex, Html, or window colors(0, 1, 2, etc..).
@default BGC

@param bold
@text Bold Font
@type text
@desc \Bold[boolean]
True for enable. False for disable.
@default BOLD

@param italic
@text Italic Font
@type text
@desc \Italic[boolean]
True for enable. False for disable.
@default ITALIC

@param color
@text Text Color
@type text
@desc \Color[color]
Can use Hex, Html, or window colors(0, 1, 2, etc..).
@default COLOR

@param outColor
@text Text Outline Color
@type text
@desc \OutColor[color]
Hex, Html, or window colors(0, 1, 2, etc..).
@default OUTCOLOR

@param outWidth
@text Text Outline Width
@type text
@desc \OutWidth[number]
@default OUTWIDTH

*/

}

/* --------------------------- SOUND ESCAPE CODES --------------------------- */
{
/*~struct~soundSt:

@param pbgm
@text Play BGM
@type text
@desc \PBgm[file, volume, pitch, pan]
File is case sensitive.
@default PBGM

@param fobgm
@text Fade Out Bgm
@type text
@desc \FBgm[duration]
Duration is in seconds.
@default FBGM

@param pbgs
@text Play BGS
@type text
@desc \PBgm[file, volume, pitch, pan]
File is case sensitive.
@default PBGS

@param fobgs
@text Fade Out BGS
@type text
@desc \FBgs[duration]
Duration is in seconds.
@default FBGS

@param pme
@text Play ME
@type text
@desc \PMe[file, volume, pitch, pan]
@default PME

@param pse
@text Play SE
@type text
@desc \PSe[file, volume, pitch, pan]
@default PSE

*/
}

/* --------------------------- EVENT ESCAPE CODES --------------------------- */
{

/*~struct~eventSt:

@param changeSwitch
@text Change Switch
@type text
@desc \CSw[Id, value]
Replace value with: true, false, or toggle
@default CSW

@param changeSelfSwitch
@text Change Self Switch
@type text
@desc \CSSW[MapId, EventId, SwitchId, value]
Replace value with: true, false, or toggle
@default CSSW

@param changeVariable
@text Change Variable
@type text
@desc \CVar[Id, operator, value]
Replace operator with: -, =, +, %, *, or /
@default CVAR

@param commonEvent
@text Play Common Event
@type text
@desc \Pce[ID]
@default PCE

@param balloon
@text Show Balloon
@type text
@desc \SBI[CharId, BalloonId]
See help file for the Char ID.
@default SBI

@param animation
@text Show Animation
@type text
@desc \SBI[CharId, AnimationId]
See help file for the Char ID.
@default SAN

@param scrollMap
@text Scroll Map
@type text
@desc \Scroll[Direction, Distance, Speed]
@default SCROLL

@param fade
@text Fade In/Out
@type text
@desc \Fade[type, duration]
Replace type with: In or Out. Duration is on frames.
@default FADE

@param tint
@text Tint Screen
@type text
@desc \Tint[r, g, b, gray, duration]
Replace R, G, B, GRAY with values from -255 to 255.
@default TINT

@param flash
@text Flash Screen
@type text
@desc \Flash[r, g, b, intensity, duration]
Replace R, G, B, INTENSITY with values from -255 to 255.
@default FLASH

@param shake
@text Shake Screen
@type text
@desc \Shake[power, speed, duration]
@default SHAKE

@param weather
@text Change Weather
@type text
@desc \Weather[type, power, duration]
Replace type with: none, rain, storm, or snow
@default WEATHER

*/

}

/* -------------------------------- ADVANCED -------------------------------- */
{
/*~struct~advancedSt:

@param formula
@text Evaluate Code
@type text
@desc \Script[Formula]
Any valid javascript formula.
@default SCRIPT

@param image
@text Draw Image
@type text
@desc \DrawImg[folder, fileName, keepRatio, center]
Replace keepRatio with true or false. Folder and filename are case sensitive.
@default DRAWIMG

*/
}

/* --------------------------- MESSAGE FACE CODES --------------------------- */
{

/*~struct~msgFaceSt:

@param actorFace
@text Set Actor Face
@type text
@desc \ActorFace[ActorId]
Will set that actor face to the message.
@default ACTORFACE

@param memberFace
@text Set Party Member Face
@type text
@desc \PartyFace[MemberIndex]
Will set that member face to the message.
@default PARTYFACE

@param faceFile
@text Set Face File
@type text
@desc \FaceName[file]
Will set that face file to the message.
@default FACENAME

@param faceIndex
@text Set Face Index
@type text
@desc \FaceIndex[Number]
Will set that face index to the message.
@default FACEINDEX

@param faceAll
@text Set Face File & Index
@type text
@desc \ChangeFace[File, Index]
Will set that face and index to the message.
@default CHANGEFACE

*/

}

/* -------------------------- MESSAGE DEFAULT CODES ------------------------- */
{

/*~struct~msgDefaultSt:

@param wait
@text Wait Frames
@type text
@desc \Wait[Frames]
Will make the message wait that amount of frames.
@default WAIT

*/

}

/* ------------------------------ OTHER PLUGINS ----------------------------- */
{

/*~struct~extensionPluginsST:

@param changeMessageSE
@text Message Sounds
@type text
@desc \CSE[Id/Index]
Only A-Z. Not case sensitive. (Eli Message Sounds)
@default CSE

@param changeFont
@text Change Font
@type text
@desc \FNT[FontFace]
Only A-Z. Not case sensitive. (Eli Font Manager or Bitmap Font)
@default FNT

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MessageActions = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.MessageActions = {

    canProcessActionCodes: true,
    inlineImgReg: new RegExp(),
    iconCodes: [],
    rawIconCodes: [],
    commonEvents: [],
    actionCodes: {},

    Parameters: class {
        constructor(parameters){
            this.underlineHeight = Number(parameters.underlineHeight)
            this.strikeThroughHeight = Number(parameters.strikeThroughHeight)
            this.alignMode = parameters.alignMode === "true"
            this.txt = JSON.parse(parameters.txt)
            this.sound = JSON.parse(parameters.sound)
            this.event = JSON.parse(parameters.event)
            this.advanced = JSON.parse(parameters.advanced)
            this.msgDefault = JSON.parse(parameters.msgDefault)
            this.msgFace = JSON.parse(parameters.msgFace),
            this.extensionPlugins = JSON.parse(parameters.extensionPlugins)
        }
    },

    initialize(){
        this.initParameters()
        this.initActionCodes()
        this.makeIconCodeList()
        this.inlineImgReg = new RegExp(`\\${this.parameters.advanced.image}\\[(.+)\\]`, "gmi")
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initActionCodes(){
        const {txt, sound, event, advanced, extensionPlugins, msgDefault, msgFace} = this.parameters
        const codeList = {
            ...txt, ...sound, ...event, ...advanced, ...extensionPlugins, ...msgDefault, ...msgFace
        }
        
        for(const key in codeList){
            const funcName = `actionCode_${key.toUpperCase()}`
            const funcKey = codeList[key].toLowerCase()
            this.actionCodes[funcKey] = funcName
        }

    },

    makeIconCodeList(){
        const escapeChar = "i"
        const iconCodes = [new RegExp(`\\x1b${escapeChar}\\[([^\\[]*)\\]`, 'gi')]
        const extraCodes = [/\\i/gi]

        if(Imported.Eli_EscapeCodes){
            const extraIconCodes = Eli.EscapeCodes.list.filter(item => item.functionName.toLowerCase().includes("icon"))

            for(const code of extraIconCodes){
                iconCodes.push(code.reg)
            }

            extraCodes.push(
                new RegExp(`\\${Eli.EscapeCodes.parameters.items.nameIcon}`, 'gi'),
                new RegExp(`\\${Eli.EscapeCodes.parameters.weapons.nameIcon}`, 'gi'),
                new RegExp(`\\${Eli.EscapeCodes.parameters.armors.nameIcon}`, 'gi'),
                new RegExp(`\\${Eli.EscapeCodes.parameters.skills.nameIcon}`, 'gi'),
                new RegExp(`\\${Eli.EscapeCodes.parameters.states.nameIcon}`, 'gi'),
            )

        }

        this.iconCodes = iconCodes
        this.rawIconCodes = extraCodes
    },

    getBitmapFromDrawCode(folder, filename){
        const path = `img/${folder}/`
        const bitmap = ImageManager.loadBitmap(path, filename)

        return bitmap
    },

    calculateVariableValue(operationType, currentValue, newValue){
        switch(operationType){
            case "=": return newValue
            case "+": return currentValue + newValue
            case "-": return currentValue - newValue
            case "*": return currentValue * newValue
            case "/": return currentValue / newValue
            case "%": return currentValue % newValue
        }

        return 0
    },

    getCharacter(id){
        if(id >= 0){
            return $gameMap.event(id) || $gameMap.event($gameMap._interpreter._eventId)

        } else if(id === -1){
            return $gamePlayer

        }else if(id < -1){
            return $gamePlayer.followers()._data[Math.abs(id + 2)]

        }else{
            return $gameMap.vehicles().find(item => item._type === id.toLowerCase())
        }
    },

    getParam(){
        return this.parameters
    },

    obtainEscapeParam(textState){
        const text = textState.text.slice(textState.index)
        
        if(text.startsWith("[")){
            return this.getEscapeParamResult(text, textState)
        }else{
            return ""
        }
    },

    getEscapeParamResult(text, textState){
        const end = text.indexOf("]")
        textState.index += end+1
        const result = Eli.String.removeSpaces(text.substring(1, end))

        return result
    },

    removeEval(text){
        const rawText = Eli.EscapeCodes.getRawEvalText(text)
        text = text.replace(rawText, "")

        return text
    },

    removeEvalTernary(text){
        const rawText = Eli.EscapeCodes.getIfRawText(text)
        text = text.replace(rawText, "")

        return text
    },
}

{

const Plugin = Eli.MessageActions
const Alias = {}

Plugin.initialize()

class Sprite_InlineImageContainer extends Sprite{}

/* --------------------------------- BITMAP --------------------------------- */
Alias.Bitmap_initialize = Bitmap.prototype.initialize
Bitmap.prototype.initialize = function(width, height){
    Alias.Bitmap_initialize.call(this, width, height)
    this.initMsgActionMembers()
}

Alias.Bitmap_clear = Bitmap.prototype.clear
Bitmap.prototype.clear = function(){
    Alias.Bitmap_clear.call(this)
    if(this.imgAreas){
        this.imgAreas = []
        this.hasInlineImage = false
    }
}

Alias.Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline
Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth){
    if(this.background.canDraw){
        this.drawTextBackgroundColor(text, tx, ty)
    }

    Alias.Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth)
}

Alias.Bitmap_drawTextBody = Bitmap.prototype._drawTextBody
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth){
    Alias.Bitmap_drawTextBody.call(this, text, tx, ty, maxWidth)

    if(this.underline){
        this.drawTextUnderline(text, tx, ty)
    }

    if(this.strikeThrough){
        this.drawTextStrikeThrough(text, tx, ty)
    }
}

Alias.Bitmap_drawText = Bitmap.prototype.drawText
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align){
    this.lineHeight = lineHeight

    if(this.hasInlineImage){
        this.drawTextWithInlineImage(text, x, y, maxWidth, lineHeight, align, Alias.Bitmap_drawText)
    }else{
        Alias.Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align)
    }
}

Bitmap.prototype.initMsgActionMembers = function(){
    this.hasInlineImage = false
    this.underline = false
    this.background = {color: 0, canDraw: false}
    this.strikeThrough = false
    this.imgAreas = []
    this.lineHeight = 0
}

Bitmap.prototype.drawTextBackgroundColor = function(text, tx, ty){
    const context = this.context
    const textHeight = this.lineHeight/2 + this.fontSize/4
    const width = this.measureTextWidth(text)

    context.fillStyle = this.background.color
    context.fillRect(tx, ty - textHeight, width + 1, this.fontSize)
}

Bitmap.prototype.drawTextStrikeThrough = function(text, tx, ty){
    const width = this.measureTextWidth(text)
    const strikeHeight = Plugin.getParam().strikeThroughHeight
    const dif = this.fontSize/4 + strikeHeight

    this.context.fillStyle = this.textColor
    this.context.fillRect(tx, ty-dif, width+1, strikeHeight)
}

Bitmap.prototype.drawTextUnderline = function(text, tx, ty){
    const width = this.measureTextWidth(text)
    const underlineHeight = Plugin.getParam().underlineHeight
    
    this.context.fillStyle = this.textColor
    this.context.fillRect(tx, ty+underlineHeight, width+1, underlineHeight)
}

Bitmap.prototype.drawTextWithInlineImage = function(text, x, y, maxWidth, lineHeight, align, callBack){
    let oldX = x
    let oldWidth = 0

    for(const char of text){
        oldWidth = this.measureTextWidth(char)

        for(const rect of this.imgAreas){
            if(rect.contains(oldX+oldWidth, y)){
                oldX += rect.width + oldWidth
            }
        }

        callBack.call(this, char, oldX, y, maxWidth, lineHeight, align)
        oldX = oldX + oldWidth
    }
}

Bitmap.prototype.adjustCharacterToNotDrawAboveImage = function(textState){
    for(const rect of this.imgAreas){
        const x = textState.x
        const y = textState.y
        textState.x += rect.contains(x, y) ? rect.width : 0
    }

    return textState
}

/* ---------------------------- GAME COMMON EVENT --------------------------- */
Alias.Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive
Game_CommonEvent.prototype.isActive = function() {
    let isCalledByMessage = false

    if(this.isActivatedByEscapeCode()){
        this.removeFromMessage(this.event().id)
        isCalledByMessage = true
    }

    return Alias.Game_CommonEvent_isActive.call(this) || isCalledByMessage
}

Game_CommonEvent.prototype.removeFromMessage = function(id) {
    const index = Plugin.commonEvents.indexOf(id)
    Plugin.commonEvents.splice(index, 1)
}

Game_CommonEvent.prototype.isActivatedByEscapeCode = function() {
    return Plugin.commonEvents.includes(this.event().id)
}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
Alias.Game_Interpreter_loadImages = Game_Interpreter.prototype.loadImages
Game_Interpreter.prototype.loadImages = function() {
    Alias.Game_Interpreter_loadImages.call(this)
    this.loadInlineImagesOfShowAndScrollText()
}

Game_Interpreter.prototype.loadInlineImagesOfShowAndScrollText = function(){
    const list = this._list.filter(item => item.code === 401 || item.code === 405)

    for(const command of list){
        const text = command.parameters[0]
        const match = Plugin.inlineImgReg.exec(text)

        if(match){
            let id, folder, filename

            if(command.code === 405){
                [id, folder, filename] = Eli.String.removeSpaces(match[1]).split(",")
            }else{
                [folder, filename] = Eli.String.removeSpaces(match[1]).split(",")
            }

            const path = `img/${folder}/`
            ImageManager.loadBitmap(path, filename)
        }
    }
}

/* ------------------------------- WINDOW BASE ------------------------------ */
Alias.Window_Base_initialize = Window_Base.prototype.initialize
Window_Base.prototype.initialize = function(rect){
    Alias.Window_Base_initialize.call(this, rect)
    this.setDefaultTextAlignment()
}

Alias.Window_Base_createTextState = Window_Base.prototype.createTextState
Window_Base.prototype.createTextState = function(text, x, y, width) {
    const textState = Alias.Window_Base_createTextState.call(this, text, x, y, width)
    this.currentTextState = textState

    return textState
}

// Show Ballon
Window_Base.prototype.actionCode_BALLOON = function(textState){
    let [charId, balloonId] = Plugin.obtainEscapeParam(textState).split(",")
    const character = Plugin.getCharacter(Number(charId))

    if(character){
        $gameTemp.requestBalloon(character, Number(balloonId))
    }
}

// Show Animation
Window_Base.prototype.actionCode_ANIMATION = function(textState){
    let [charId, animationId] = Plugin.obtainEscapeParam(textState).split(",")
    const character = Plugin.getCharacter(Number(charId))

    if(character){
        $gameTemp.requestAnimation([character], Number(animationId))
    }
}

// OutlineColor
Window_Base.prototype.actionCode_OUTCOLOR = function(textState){
    const color = Plugin.obtainEscapeParam(textState)

    if(isNaN(color)){
        this.changeOutlineColor(Eli.ColorManager.getHexOrName(color))
    }else{
        this.changeOutlineColor(ColorManager.textColor(Number(color)))
    }
}

Window_Base.prototype.actionCode_ALIGN = function(textState, defaultAlign){
    const align = defaultAlign || Plugin.obtainEscapeParam(textState).toLowerCase()

    if(align === "left"){
        textState.x = textState.startX

    }else if(align === "center"){
        const [baseWidth, textWidth] = this.getWidthsMeasureForAlign(textState)
        const x = (baseWidth/2) - (textWidth/2)
        textState.x = x

    }else if(align === "right"){
        const [baseWidth, textWidth] = this.getWidthsMeasureForAlign(textState)
        const x = baseWidth - (textWidth + this.getItemPadding())
        textState.x = x

    }

    this.currentAlign = align
}

Window_Base.prototype.getWidthsMeasureForAlign = function(textState){
    Plugin.canProcessActionCodes = false

    const rawLineText = textState.text.substring(textState.index).split("\n")[0]
    const textWidth = Math.ceil(Eli.Utils.getTextWidth(rawLineText))
    const baseWidth = this.contentsWidth()

    Plugin.canProcessActionCodes = true

    return [baseWidth, textWidth]
}

// Paint Background
Window_Base.prototype.actionCode_TEXTBACKGROUND = function(textState){
    const [flag, color] = Plugin.obtainEscapeParam(textState).split(",")

    if(isNaN(color)){
        this.contents.background.color = color || this.contents.background.color
    }else{
        this.contents.background.color = ColorManager.textColor(Number(color))
    }
    
    this.contents.background.canDraw = JSON.parse(flag.toLowerCase()) || false
}

Window_Base.prototype.changeDefaultFont = function(textState){
    const fontFace = Plugin.obtainEscapeParam(textState)

    if(Eli.FontManager.pro){
        Eli.FontManager.changeContainerFont(this.constructor.name, fontFace)
        this.setCustomFont()

    }else{
        this.contents.fontFace = fontFace
    }
}

// Play Common Event
Window_Base.prototype.actionCode_COMMONEVENT = function(textState){
    const commonEventId = Number(Plugin.obtainEscapeParam(textState))
    const index = $gameMap._commonEvents.findIndex(item => item._commonEventId === commonEventId)

    if(index === -1){
        $gameMap._commonEvents.push(new Game_CommonEvent(commonEventId))
    }

    if(!Plugin.commonEvents.includes(commonEventId)){
        Plugin.commonEvents.push(commonEventId)
    }
}

Window_Base.prototype.setDefaultTextAlignment = function() {
    this.currentAlign = 'left'
}

Alias.Window_Base_processNewLine = Window_Base.prototype.processNewLine
Window_Base.prototype.processNewLine = function(textState) {
    Alias.Window_Base_processNewLine.call(this, textState)
    this.fixAlign(textState)
}

Alias.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    if(Plugin.canProcessActionCodes){
        this.processActionEscapeCharacters(code, textState)
    }else{
        this.removeActionEscapeCharacters(code, textState)
    }
    
    Alias.Window_Base_processEscapeCharacter.call(this, code, textState)
}

Window_Base.prototype.processActionEscapeCharacters = function(code, textState) {
    const key = code.toLowerCase()
    const funcName = Plugin.actionCodes[key]

    if(this[funcName]){
        this[funcName].bind(this, textState)()
    }
}

Window_Base.prototype.removeActionEscapeCharacters = function(code, textState) {
    const key = code.toLowerCase()
    const funcName = Plugin.actionCodes[key]

    if(this[funcName]){
        Plugin.obtainEscapeParam(textState)
    }
}

Alias.Window_Base_flushTextState = Window_Base.prototype.flushTextState
Window_Base.prototype.flushTextState = function(textState) {
    textState = this.contents.adjustCharacterToNotDrawAboveImage(textState)
    Alias.Window_Base_flushTextState.call(this, textState)
}

Window_Base.prototype.actionCode_COLOR = function(textState){
    const color = Plugin.obtainEscapeParam(textState)

    if(isNaN(color)){
        this.changeTextColor(Eli.ColorManager.getHexOrName(color))
    }else{
        this.processColorChange(Number(color))
    }
}

// Change Switch
Window_Base.prototype.actionCode_CHANGESWITCH = function(textState){
    const [id, value] = Eli.String.removeSpaces(Plugin.obtainEscapeParam(textState)).toLowerCase().split(",")

    if(value === "toggle"){
        var newValue = !$gameSwitches.value(Number(id))
    }else{
        var newValue = value === "true"
    }

    $gameSwitches.setValue(id, newValue)
}

// Change Self Switch
Window_Base.prototype.actionCode_CHANGESELFSWITCH = function(textState){
    let [mapId, eventId, swId, value] = Eli.String.removeSpaces(Plugin.obtainEscapeParam(textState)).toLowerCase().split(",")
    mapId = mapId == 0 ? $gameMap.mapId() : Number(mapId)
    eventId = eventId == 0 ? $gameMap._interpreter._eventId : Number(eventId)
    swId = swId.toUpperCase()
    const key = [mapId, eventId, swId]

    if(value === "toggle"){
        var newValue = !$gameSelfSwitches.value(key)
    }else{
        var newValue = value === "true"
    }

    $gameSelfSwitches.setValue(key, newValue)
}

// Change variable
Window_Base.prototype.actionCode_CHANGEVARIABLE = function(textState){
    let [varId, operator, value] = Plugin.obtainEscapeParam(textState).split(",")
    varId = Number(varId)
    
    if(isNaN(value)){
        value = eval(value) || 0
    }else{
        value = Number(value) || 0
    }

    const currentValue = $gameVariables.value(varId)
    const newValue = Plugin.calculateVariableValue(operator, currentValue, value)
    $gameVariables.setValue(varId, newValue)
}

//Scroll map
Window_Base.prototype.actionCode_SCROLLMAP = function(textState){
    const [direction, distance, speed] = Plugin.obtainEscapeParam(textState).split(",").map(item => Number(item))
    $gameMap.startScroll(direction, distance, speed)
}

// Fade out/In
Window_Base.prototype.actionCode_FADE = function(textState){
    const [type, duration] = Plugin.obtainEscapeParam(textState).split(",")
    const isFadeIn = type.toLowerCase().includes("in")

    if(isFadeIn){
        $gameScreen.startFadeIn(Number(duration) || 24)
    }else{
        $gameScreen.startFadeOut(Number(duration) || 24)
    }
}

// Tint Screen
Window_Base.prototype.actionCode_TINT = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [r, g, b, gray, duration] = parameters.split(",").map(item => Number(item))

    $gameScreen.startTint([r, g, b, gray], duration)
}

// FLASH
Window_Base.prototype.actionCode_FLASH = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [r, g, b, intensity, duration] = parameters.split(",").map(item => Number(item))

    $gameScreen.startFlash([r, g, b, intensity], duration)
}

// Shake
Window_Base.prototype.actionCode_SHAKE = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [power, speed, duration] = parameters.split(",").map(item => Number(item))

    $gameScreen.startShake(power, speed, duration)
}

// Set Weather Effect "none", "rain", "storm", "snow"
Window_Base.prototype.actionCode_WEATHER = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [type, power, duration] = parameters.split(",")

    $gameScreen.changeWeather(type.toLowerCase(), Number(power), Number(duration))
}

// Play BGM
Window_Base.prototype.actionCode_PBGM = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [name, volume, pitch, pan] = parameters.split(",")
    const bgm = {
        name: name,
        volume: Number(volume) || AudioManager._bgmVolume,
        pitch: Number(pitch) || 100,
        pan: Number(pan) || 0
    }
    AudioManager.playBgm(bgm)
}

// Fadeout BGM
Window_Base.prototype.actionCode_FOBGM = function(textState){
    const duration = Plugin.obtainEscapeParam(textState)
    AudioManager.fadeOutBgm(Number(duration))
}

// Play BGS
Window_Base.prototype.actionCode_PBGS = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [name, volume, pitch, pan] = parameters.split(",")
    const bgs = {
        name: name,
        volume: Number(volume) || AudioManager._bgsVolume,
        pitch: Number(pitch) || 100,
        pan: Number(pan) || 0
    }

    AudioManager.playBgs(bgs)
}

// Fadeout BGS
Window_Base.prototype.actionCode_FOBGS = function(textState){
    const duration = Plugin.obtainEscapeParam(textState)
    AudioManager.fadeOutBgs(Number(duration))
}

// Play ME
Window_Base.prototype.actionCode_PME = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [name, volume, pitch, pan] = parameters.split(",")
    const me = {
        name: name,
        volume: Number(volume) || AudioManager._meVolume,
        pitch: Number(pitch) || 100,
        pan: Number(pan) || 0
    }
    AudioManager.playMe(me)
}

// Play SE
Window_Base.prototype.actionCode_PSE = function(textState){
    const parameters = Plugin.obtainEscapeParam(textState)
    const [name, volume, pitch, pan] = parameters.split(",")
    const se = {
        name: name,
        volume: Number(volume) || AudioManager._seVolume,
        pitch: Number(pitch) || 100,
        pan: Number(pan) || 0
    }
    AudioManager.playSe(se)
}

// Eval
Window_Base.prototype.actionCode_FORMULA = function(textState){
    const formula = Plugin.obtainEscapeParam(textState)
    eval(formula)
}

// Bold font
Window_Base.prototype.actionCode_BOLD = function(textState){
    this.contents.fontBold = JSON.parse(Plugin.obtainEscapeParam(textState).toLowerCase())
}

// Italic font
Window_Base.prototype.actionCode_ITALIC = function(textState){
    this.contents.fontItalic = JSON.parse(Plugin.obtainEscapeParam(textState).toLowerCase())
}

// Outline width
Window_Base.prototype.actionCode_OUTWIDTH = function(textState){
    const width = Number(Plugin.obtainEscapeParam(textState))
    this.contents.outlineWidth = width
}

// Image on text
Window_Base.prototype.actionCode_IMAGE = function(textState){
    let args = Plugin.obtainEscapeParam(textState).split(",")
    const hasSizeArg = typeof Number(args[0]) === "number"

    if(hasSizeArg){
        var [x, y, folder, fileName, keepRatio, center] = args
    }else{
        var [folder, fileName, keepRatio, center] = args
    }

    const bitmap = Plugin.getBitmapFromDrawCode(folder, fileName)
    keepRatio = keepRatio === undefined ? true : JSON.parse(keepRatio.toLowerCase())
    center = center === undefined ? false : JSON.parse(center.toLowerCase())

    let dx = textState.x
    let dy = textState.y

    this.contents.hasInlineImage = true

    if(hasSizeArg){
        const winHeight = this.contentsHeight()
        const sw = Number(x)
        const sh = Number(y)
        
        let dw = sw
        let dh = sh

        if(keepRatio && sh > winHeight){
            const ratio = Math.trunc(sh/winHeight)
            dw /= ratio
            dh /= ratio
        }

        if(center && sh < winHeight){
            dy = Math.abs(winHeight/2 - dh/2)
        }

        const rect = new Rectangle(dx, dy, dw, dh)
        this.contents.imgAreas.push(rect)

        bitmap.addLoadListener(() => {
            this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh)
        })

        textState.x += dw

    }else{
        
        bitmap.addLoadListener(() => {
            const winHeight = this.contentsHeight()
            const sw = bitmap.width
            const sh = bitmap.height
            
            let dw = sw
            let dh = sh
    
            if(keepRatio && sh > winHeight){
                const ratio = Math.trunc(sh/winHeight)
                dw /= ratio
                dh /= ratio
            }
    
            if(center && sh < winHeight){
                dy = Math.abs(winHeight/2 - dh/2)
            }
    
            const rect = new Rectangle(dx, dy, dw, dh)
            this.contents.imgAreas.push(rect)
            this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh)
        })
    }
   
}

// Underline
Window_Base.prototype.actionCode_UNDERLINE = function(textState){
    this.contents.underline = JSON.parse(Plugin.obtainEscapeParam(textState).toLowerCase())
}

// Strikethrough
Window_Base.prototype.actionCode_STRIKE = function(textState){
    this.contents.strikeThrough = JSON.parse(Plugin.obtainEscapeParam(textState).toLowerCase())
}

// Change Font
Window_Base.prototype.actionCode_CHANGEFONT = function(textState){
    if(Imported.Eli_BitmapFont && Eli.BitmapFont.pro){
        this.changeBitmapFont(textState)

    }else if(Imported.Eli_FontManager){
        this.changeDefaultFont(textState)
    }
}

Window_Base.prototype.changeBitmapFont = function(textState){
    const bitmapFont = Plugin.obtainEscapeParam(textState)
    const fontIndex = Eli.BitmapFont.findParameterFontIndex(bitmapFont)

    Eli.BitmapFont.changeContainerFont(this.constructor.name, fontIndex)
    this.resetFontSettings()
}

Window_Base.prototype.fixAlign = function(textState) {
    if(Plugin.getParam().alignMode){
        this.actionCode_ALIGN(textState, this.currentAlign)
    }
}

// Only for message window.
Window_Base.prototype.actionCode_ACTORFACE = function(textState){}
Window_Base.prototype.actionCode_MEMBERFACE = function(textState){}
Window_Base.prototype.actionCode_FACEFILE = function(textState){}
Window_Base.prototype.actionCode_FACEINDEX = function(textState){}
Window_Base.prototype.actionCode_FACEALL = function(textState){}
Window_Base.prototype.actionCode_WAIT = function(textState){}
Window_Base.prototype.actionCode_CHANGEMESSAGESE = function(textState){}

/* ----------------------------- WINDOW COMMAND ----------------------------- */
Alias.Window_Command_processAllText = Window_Command.prototype.processAllText
Window_Command.prototype.processAllText = function(textState) {
    this.fixAlign(textState)
    Alias.Window_Command_processAllText.call(this, textState)
}

Window_Command.prototype.actionCode_ALIGN = function(textState, defaultAlign){
    const align = defaultAlign || Plugin.obtainEscapeParam(textState).toLowerCase()

    if(align === "center"){
        const [baseWidth, textWidth, extraX] = this.getWidthsMeasureForAlign(textState)
        const x = (baseWidth/2) - (textWidth/2)
        textState.x = x + extraX

    }else if(align === "right"){
        const [baseWidth, textWidth, extraX] = this.getWidthsMeasureForAlign(textState)
        const x = baseWidth - (textWidth + this.getItemPadding())
        textState.x = x + extraX

    }else{

    }

    this.currentAlign = align
}

Window_Command.prototype.getWidthsMeasureForAlign = function(textState){
    Plugin.canProcessActionCodes = false

    const rect = this.itemRect(this.drawingIndex)
    const rawLineText = textState.text
    const textWidth = Math.ceil(Eli.Utils.getTextWidth(rawLineText))
    const baseWidth = rect.width
    const extraX = rect.x

    Plugin.canProcessActionCodes = true

    return [baseWidth, textWidth, extraX]
}

Window_Command.prototype.setDefaultTextAlignment = function() {
    this.currentAlign = 'center'
}

Alias.Window_Command_drawItem = Window_Command.prototype.drawItem
Window_Command.prototype.drawItem = function(index) {
    this.drawingIndex = index
    Alias.Window_Command_drawItem.call(this, index)
}

if(Imported.VisuMZ_0_CoreEngine){

    Window_Command.prototype.fixAlign = function(textState) {}
    Window_Command.prototype.actionCode_ALIGN = function(textState, defaultAlign){}

}else{

    Window_Command.prototype.itemTextAlign = function() {
        return this.currentAlign
    }

    Window_HorzCommand.prototype.itemTextAlign = function(){
        return this.currentAlign
    }

}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */

// We can't fix the align here. It only causes weird behaviors, since the
// options are draw with like "two columns"
Window_Options.prototype.fixAlign = function(textState) {
    // if(Plugin.param().alignMode){
    //     this.ALIGN(textState, this.currentAlign)
    // }
}

Alias.Window_Options_drawText = Window_Options.prototype.drawText
Window_Options.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.currentAlign = align
    Alias.Window_Options_drawText.call(this, text, x, y, maxWidth, align)
}

/* ------------------------------- WINDOW MSG ------------------------------- */

Window_Message.prototype.getFaceRect = function() {
    const rtl = $gameMessage.isRTL()
    const width = ImageManager.faceWidth
    const height = this.innerHeight
    const x = rtl ? this.innerWidth - width - 4 : 4

    return [x, 0, width, height]
}

Alias.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage
Window_Message.prototype.terminateMessage = function() {
    Alias.Window_Message_terminateMessage.call(this)
    this.contents.hasInlineImage = false
    this.contents.imgAreas = []
}

Window_Message.prototype.actionCode_ACTORFACE = function(textState){
    const actorId = Number(Plugin.obtainEscapeParam(textState))
    const actor = $dataActors[actorId]

    if(actor){
        const faceName = actor.faceName
        const faceIndex = actor.faceIndex

        $gameMessage.setFaceImage(faceName, faceIndex)
        this.refreshFace()
    }
}

Window_Message.prototype.actionCode_MEMBERFACE = function(textState){
    const memberIndex = Number(Plugin.obtainEscapeParam(textState))
    const member = $gameParty.members()[memberIndex]

    if(member){
        const faceName = member.faceName()
        const faceIndex = member.faceIndex()

        $gameMessage.setFaceImage(faceName, faceIndex)
        this.refreshFace()
    }
}

Window_Message.prototype.actionCode_FACEFILE = function(textState){
    const faceName = Plugin.obtainEscapeParam(textState)
    const faceIndex = $gameMessage.faceIndex()

    $gameMessage.setFaceImage(faceName, faceIndex)
    this.refreshFace()
}

Window_Message.prototype.actionCode_FACEINDEX = function(textState){
    const faceName = $gameMessage.faceName()
    const faceIndex = Number(Plugin.obtainEscapeParam(textState))

    $gameMessage.setFaceImage(faceName, faceIndex)
    this.refreshFace()
}

Window_Message.prototype.actionCode_FACEALL = function(textState){
    const [faceName, faceIndex] = Plugin.obtainEscapeParam(textState).split(",")
    
    $gameMessage.setFaceImage(faceName, Number(faceIndex))
    this.refreshFace()
}

// Wait Message
Window_Message.prototype.actionCode_WAIT = function(textState){
    const waitCount = Number(Plugin.obtainEscapeParam(textState))
    this.startWait(waitCount)
}

// Change Talk SE
Window_Message.prototype.actionCode_CHANGEMESSAGESE = function(textState){
    const seId = Plugin.obtainEscapeParam(textState)
    Eli.MessageSounds.cmd_changeSe({id:seId})
}

Window_Message.prototype.refreshFace = function() {
    if(Imported.Eli_FaceWindow){
        Eli.FaceWindow.getFaceWindow().refreshFaceSprite($gameMessage.faceName(), $gameMessage.faceIndex())
    }else{
        this.loadMessageFace()
        this._faceBitmap.addLoadListener( () => {
            this.contents.clearRect(...this.getFaceRect())
            this.drawMessageFace()
        })
    }
}

/* --------------------------- WINDOW SCROLL TEXT --------------------------- */
let scrollImgId = 0

Alias.Window_ScrollText_initialize = Window_ScrollText.prototype.initialize
Window_ScrollText.prototype.initialize = function(rect) {
    Alias.Window_ScrollText_initialize.call(this, rect)
    this.createInlineSpriteForImages()
}

Alias.Window_ScrollText_updateMessage = Window_ScrollText.prototype.updateMessage
Window_ScrollText.prototype.updateMessage = function() {
    Alias.Window_ScrollText_updateMessage.call(this)
    if(this.inlineImageSprite){
        this.updateInlineImageSprite()
    }
}

Alias.Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage
Window_ScrollText.prototype.terminateMessage = function() {
    Alias.Window_ScrollText_terminateMessage.call(this)
    this.contents.hasInlineImage = false
    this.contents.imgAreas = []
    this.currentAlign = "left" // MV ONLY?
    this.createInlineSpriteForImages()
}

Window_ScrollText.prototype.createInlineSpriteForImages = function(){
    if(this.inlineImageSprite){
        this.inlineImageSprite.destroy()
    }
    this.inlineImageSprite = new Sprite_InlineImageContainer()
    this.addChild(this.inlineImageSprite)
    this.imageIds = []
}

Window_ScrollText.prototype.updateInlineImageSprite = function(){
    const y = this.origin.y + this.height
    this.inlineImageSprite.y = this.height - y
    this.inlineImageSprite.children.forEach(child => {
        child.visible = child.y < Graphics.height
    })
}

Window_ScrollText.prototype.actionCode_image = function(textState){
    scrollImgId++
    const args = Plugin.obtainEscapeParam(textState).split(",")
    if(args.length > 3){
        args.shift()
    }
    let [folder, fileName, center] = args
    center = center === undefined ? false : true
    const bitmap = Plugin.getBitmapFromDrawCode(folder, fileName)
    let dx = textState.x
    let dy = textState.y

    this.contents.hasInlineImage = true

    bitmap.addLoadListener(() => {
        const sw = bitmap.width
        const sh = bitmap.height
        let dw = sw
        let dh = sh
        if(center){
            dx = this.width/2 - sw/2
        }
        const rect = new Rectangle(dx, dy, dw, dh)
        
        this.contents.imgAreas.push(rect)

        if(this.inlineImageSprite && !this.imageIds.includes(scrollImgId)){
            const sprite = new Sprite(bitmap)
            sprite.visible = false
            sprite.x = dx +16
            sprite.y = dy
            this.imageIds.push(scrollImgId)
            this.inlineImageSprite.addChild(sprite)
        }

    })
}

/* ------------------------------ WINDOW CHOICE ----------------------------- */
Alias.Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize
Window_ChoiceList.prototype.initialize = function() {
    this.initMessageActionsMembers()
    Alias.Window_ChoiceList_initialize.call(this)
}

// Overwrite
Window_ChoiceList.prototype.maxChoiceWidth = function() {
    if(this.cachedMaxChoiceWidth === 0){
        const choices = $gameMessage.choices().map(item => item)
        const itemPadding = this.getItemPadding() * 2
        const tempWin = new Window_Base(new Rectangle(0, 0, 1000, 100))
        let maxWidth = -1
        Plugin.canProcessActionCodes = false
        
        for (const choice of choices) {
            const textWidth = Math.ceil(tempWin.getTextWidth(choice))
            const choiceWidth = textWidth + itemPadding

            if(maxWidth < choiceWidth){
                maxWidth = choiceWidth 
            }
        }

        this.cachedMaxChoiceWidth = maxWidth
        Plugin.canProcessActionCodes = true

        return maxWidth

    }else{
        return this.cachedMaxChoiceWidth
    }
}

Alias.Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem
Window_ChoiceList.prototype.drawItem = function(index) {
    this.drawingIndex = index
    Alias.Window_ChoiceList_drawItem.call(this, index)
}

Alias.Window_ChoiceList_start = Window_ChoiceList.prototype.start
Window_ChoiceList.prototype.start = function() {
    this.initMessageActionsMembers()
    Alias.Window_ChoiceList_start.call(this)
}

Alias.Window_ChoiceList_fixAlign = Window_ChoiceList.prototype.fixAlign
Window_ChoiceList.prototype.fixAlign = function(textState) {
    if(textState.drawing){
        Alias.Window_ChoiceList_fixAlign.call(this, textState)
    }
}

Window_ChoiceList.prototype.initMessageActionsMembers = function() {
    this.cachedMaxChoiceWidth = 0
    this.currentAlign = "left"
}

if(Imported.CGMZ_Encyclopedia){

    Alias.CGMZ_Window_EncyclopediaDisplay_actionCode_IMAGE = CGMZ_Window_EncyclopediaDisplay.prototype.actionCode_IMAGE
    CGMZ_Window_EncyclopediaDisplay.prototype.actionCode_IMAGE = function(textState){
        if(textState.drawing){
            Alias.CGMZ_Window_EncyclopediaDisplay_actionCode_IMAGE.call(this, textState)
        }
    }
}

}