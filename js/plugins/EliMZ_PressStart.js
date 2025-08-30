//============================================================================
// EliMZ_PressStart.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦3.0.0♦ Adds a press start sprite on title screen or scene map.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-press-start-for-rpg-maker-mv/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Choose an image to use for the press start feature.
• Creates show, idle and hide animation for the Start sprite.
• Choose what button you will press on the press start feature
(or just press any button).
• Choose an MV/MZ animation to play when you press the button.
• Optionally choose a delay for the 'Press Start' to play the hide 
animation when you press the button.
• Can be used on title screen and scene map.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1hsvAoIyjBX6YW3D8_Xg6p97WwsNbkx3DmkFUBs29gwI/edit?usp=sharing

============================================================================

@param image
@text Press Start Image
@type file
@dir img/system
@desc Choose an image from the system folder to appear on the title screen or scene map.
@default
@require 1

@param animeIn
@text Show Animation
@type struct<animeSt>
@desc Movement and alpha animation to show the image.
@default 

@param animeIdle
@text Idle Anime
@type struct<animeIdleSt>
@desc The alpha animation for when the sprite is idle on the screen.
@default 

@param animation
@text Animation Id
@type animation
@desc Select an animation to play when the button is pressed.
@default 0

@param animeOut
@text Hide Animation
@type struct<animeHideSt>
@desc Movement and alpha animation to hide the image.
@default 

@param anyButton
@text Any Button Will work
@type boolean
@desc If set to true, any button pressed will work remove the Press Start image.
@default true

@param keyboardButton
@text Keyboard Button
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Choose the keyboard button. Default is Enter.
@default enter
@parent anyButton

@param gamepadButton
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default none
@parent anyButton

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true
@parent anyButton

@command createMapSprite
@text Show Press Start
@desc Show the press start sprite on map scene.

*/

/* ------------------------------- SHOW ANIME ------------------------------- */
{
/*~struct~animeSt:

@param duration
@text Move Duration
@type text
@desc The duration for the window to move from Initial to Target Position.
@default 1

@param easing
@text Easing
@type combo
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
@desc Choose the easing type. Can use \v[id].
@default linear

@param separator1
@text Initial

@param initialAlignX
@text Align X
@type select
@option left
@option center
@option right
@option left_offScreen
@option right_offScreen
@desc Select left to only use offset value.
@default left
@parent separator1

@param initialOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator1

@param initialAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@option top_offScreen
@option bottom_offScreen
@desc Select top to only use offset value.
@default top
@parent separator1

@param initialOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator1

@param initialAlpha
@text Alpha
@type text
@desc From 0 to 1.
@default 0
@parent separator1

@param separator2
@text Target

@param targetAlignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left
@parent separator2

@param targetOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator2

@param targetAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top
@parent separator2

@param targetOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator2

@param targetAlpha
@text Alpha
@type text
@desc From 0 to 1.
@default 1
@parent separator2

*/
}

/* ------------------------------- IDLE ALPHA ------------------------------- */
{
/*~struct~animeIdleSt:

@param alpha
@text Min and Max Alpha
@type text
@desc From 0 to 1. Separate each alpha value with a comma.
@default 0.3, 1

@param duration
@text Duration
@type text
@desc The duration for the alpha go from min to max value.
@default 

*/
}

/* ------------------------------- HIDE ANIME ------------------------------- */
{
/*~struct~animeHideSt:

@param duration
@text Move Duration
@type text
@desc The duration for the window to move from Initial to Target Position.
@default 1

@param delay
@text Start Delay
@type number
@desc Choose a delay(in frames) for the Sprite to play the hide animation after you press a button.
@default 60

@param easing
@text Easing
@type combo
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
@desc Choose the easing type. Can use \v[id].
@default linear

@param initialAlignX
@text Align X
@type select
@option left
@option center
@option right
@option left_offScreen
@option right_offScreen
@desc Select left to only use offset value.
@default left

@param initialOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0

@param initialAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@option top_offScreen
@option bottom_offScreen
@desc Select top to only use offset value.
@default top

@param initialOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0

@param initialAlpha
@text Alpha
@type text
@desc From 0 to 1.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_PressStart = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.PressStart = {

    Parameters: class {
        constructor(parameters){
            this.animation = Number(parameters.animation)
            this.anyButton = parameters.anyButton === "true"
            this.overwrite = parameters.overwrite === "true"
            this.gamepadButton = parameters.gamepadButton
            this.image = parameters.image
            this.keyboardButton = parameters.keyboardButton
            this.showAnime = this.parseShowAnime(JSON.parse(parameters.animeIn))
            this.idleAnime = this.parseIdleAnime(JSON.parse(parameters.animeIdle))
            this.hideAnime = this.parseHideAnime(JSON.parse(parameters.animeOut))
        }

        parseShowAnime(parameters){
            return {
                duration: Number(parameters.duration),
                easing: parameters.easing,
                initial:{
                    alignX: parameters.initialAlignX,
                    alignY: parameters.initialAlignY,
                    offsetX: Number(parameters.initialOffsetX),
                    offsetY: Number(parameters.initialOffsetY),
                    alpha: Number(parameters.initialAlpha)
                },
                target:{
                    alignX: parameters.targetAlignX,
                    alignY: parameters.targetAlignY,
                    offsetX: Number(parameters.targetOffsetX),
                    offsetY: Number(parameters.targetOffsetY),
                    alpha: Number(parameters.targetAlpha)
                },
            }
        }

        parseHideAnime(parameters){
            return {
                duration: Number(parameters.duration),
                easing: parameters.easing,
                initial: this.showAnime.target,
                startDelay: Number(parameters.delay),
                target:{
                    alignX: parameters.initialAlignX,
                    alignY: parameters.initialAlignY,
                    offsetX: Number(parameters.initialOffsetX),
                    offsetY: Number(parameters.initialOffsetY),
                    alpha: Number(parameters.initialAlpha)
                },
            }
        }

        parseIdleAnime(parameters){
            return {
                duration: Number(parameters.duration),
                alpha: parameters.alpha.split(",").map(item => Number(item))
            }
        }
    },
    Sprite_PressStart: class extends Sprite{

        initialize(){
            super.initialize()
            this.initMembers()
            this.createBitmap()
        }
    
        initMembers(){
            this.phase = 0
        }

        createBitmap(){
            this.bitmap = ImageManager.loadSystem(Plugin.getParam().image)
            this.bitmap.addLoadListener(this.createShowAnime.bind(this))
        }

        createShowAnime(){
            const anime = Eli.PressStart.getParam().showAnime
            const defaultData = this.createAnimeDefaultData(anime)
            const animeProps = this.createAnimeProps(anime)
            const animations = Eli.AnimeManager.createAnimations(this, animeProps, defaultData)
            this.animeGroup = new Eli.AnimeGroup(animations, defaultData)
            this.animeGroup.play()
            
            this.phase = 1
        }

        createIdleAnime(){
            const anime = Eli.PressStart.getParam().idleAnime
            this.alpha = anime.alpha[0]
            this.animeAlpha = new Eli.AnimeTiny(this, "alpha", anime.alpha[1], anime.duration, "linear", "alternate", Infinity)
        }

        createHideAnime(){
            const hideAnime = Eli.PressStart.getParam().hideAnime
            const defaultData = this.createAnimeDefaultData(hideAnime)
            const animeProps = this.createAnimeProps(hideAnime)
            const animations = Eli.AnimeManager.createAnimations(this, animeProps, defaultData)
            this.animeGroup = new Eli.AnimeGroup(animations, defaultData)
            this.animeGroup.play()
        }

        createAnimeDefaultData(anime){
            const defaultData = Eli.AnimeManager.createDefaultData()
            defaultData.duration = anime.duration
            defaultData.easing = anime.easing
            defaultData.startDelay = anime.startDelay

            return defaultData
        }

        createAnimeProps(anime){
            const [initialX, initialY] = this.createAnimePosition(anime.initial, anime.target.offsetX, anime.target.offsetY)
            const [targetX, targetY] = this.createAnimePosition(anime.target)

            return {
                x: {value: [initialX, targetX]},
                y: {value: [initialY, targetY]},
                alpha: {value: [anime.initial.alpha, anime.target.alpha]},
            }
        }

        createAnimePosition(position, targetOffsetX = 0, targetOffsetY = 0){
            const {alignX, alignY, offsetX, offsetY} = position
        
            const x = {
                left: offsetX,
                center: (Graphics.width/2 - this.bitmap.width/2) + offsetX,
                right: (Graphics.width - this.bitmap.width) + offsetX,
                left_offScreen: 0 - (Math.abs(targetOffsetX) + this.bitmap.width),
                right_offScreen: Graphics.width + this.bitmap.width + Math.abs(targetOffsetX),
            }[alignX]
        
            const y = {
                top: offsetY,
                center: (Graphics.height/2 - this.bitmap.height/2) + offsetY,
                bottom: (Graphics.height - this.bitmap.height) + offsetY,
                top_offScreen: 0 - (Math.abs(targetOffsetY) + this.bitmap.height),
                bottom_offScreen: Graphics.height + this.bitmap.height + Math.abs(targetOffsetY),
            }[alignY]
            
            return [Math.round(x), Math.round(y)]
        }

        update(){
            super.update()
            this.updateGeneral()
        }

        updateGeneral(){
            switch(this.phase){
                case 1:
                    this.updatePhase1()
                break
                case 2:
                    this.updatePhase2()
                break
                case 3:
                    this.updatePhase3()
                break
                case 4: // play out anime
                    this.updatePhase4()
                break
                case 5: // destroy
                    this.updatePhase5()
                break
            }
            
        }

        isBusy(){
            return this.phase > 0
        }

        updatePhase1(){
            this.animeGroup.update()

            if(!this.animeGroup.isRunning()){
                this.createIdleAnime()
                this.phase = 2
            }
        }

        updatePhase2(){
            this.animeAlpha.update()

            if(this.isButtonPressed()){
                this.alpha = 1
                this.phase = 3

                if(Plugin.getParam().animation > 0){
                    this.startInnerAnimation(Plugin.getParam().animation, false, 0)
                }
            }
        }

        updatePhase3(){
            this.updateInnerMVAnimationSprites()
            this.updateInnerMZAnimationSprites()

            if(!this.isInnerAnimationPlaying()){
                this.createHideAnime()
                this.phase = 4
            }
        }

        updatePhase4(){
            this.animeGroup.update()

            if(!this.animeGroup.isRunning()){
                this.phase = 5
            }
        }

        updatePhase5(){
            this.phase = 0
            this.parent.removeChild(this)
            this.destroy()
            setTimeout(() => {
                SceneManager._scene.startSprite = null
            }, 100)
        }

        isButtonPressed(){
            return Plugin.isButtonTriggered() || TouchInput.isTriggered()
        }
  
    },
    showSpriteEnabled: true,
    button: '',

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initButtons()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = ['createMapSprite']
        Eli.PluginManager.registerCommands(this, commands)
    },

    initButtons(){
        if(this.parameters.keyboardButton !== "none"){
            this.setKeyboardButton()
        }

        if(this.parameters.gamepadButton !== "none"){
            this.setGamePadButton()
        }
    },

    setKeyboardButton(){
        const keyName = this.parameters.keyboardButton.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        this.button = Input.keyMapper[keyCode]
    },

    setGamePadButton(){
        const keyName = this.parameters.gamepadButton.toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        this.button = Input.gamepadMapper[keyCode]
    },

    getParam(){
        return this.parameters
    },

    getButton(){
        return this.button
    },

    enableStartSprite(value){
        this.showSpriteEnabled = value
    },

    createMapSprite(){
        if(SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.createPressStart()
        }
    },

    isButtonTriggered(){
        if(this.parameters.anyButton){
            return Input._latestButton || TouchInput.isClicked()
        }else{
            return Input.isTriggered(this.getButton())
        }
    },

}

const Plugin = Eli.PressStart
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE TITLE ------------------------------ */
Alias.Scene_Title_create = Scene_Title.prototype.create
Scene_Title.prototype.create = function() {
    Alias.Scene_Title_create.call(this)
    this.createStartSprite()
}

Scene_Title.prototype.createStartSprite = function(){
    if(Plugin.showSpriteEnabled){
        this.startSprite = new Plugin.Sprite_PressStart()
        this.addChild(this.startSprite)
        Plugin.enableStartSprite(false)
    }
}

Alias.Scene_Title_isBusy = Scene_Title.prototype.isBusy
Scene_Title.prototype.isBusy = function() {
    const alias = Alias.Scene_Title_isBusy.call(this)
    return this.isStartSpriteBusy() || alias
}

Scene_Title.prototype.isStartSpriteBusy = function(){
    return this.startSprite?.isBusy()
}

/* -------------------------------- SCENE MAP ------------------------------- */
Alias.Scene_Map_isBusy = Scene_Map.prototype.isBusy
Scene_Map.prototype.isBusy = function() {
    const alias = Alias.Scene_Map_isBusy.call(this)
    return this.isStartSpriteBusy() || alias
}

Alias.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled
Scene_Map.prototype.isMenuEnabled = function() {
    const alias = Alias.Scene_Map_isMenuEnabled.call(this)
    return !this.isStartSpriteBusy() && alias
}

Alias.Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk
Scene_Map.prototype.isMapTouchOk = function() {
    return Alias.Scene_Map_isMapTouchOk.call(this) && !this.isStartSpriteBusy()
}

Alias.Scene_Map_isPlayerActive = Scene_Map.prototype.isPlayerActive
Scene_Map.prototype.isPlayerActive = function() {
    return Alias.Scene_Map_isPlayerActive.call(this) && !this.isStartSpriteBusy()
}

Scene_Map.prototype.isStartSpriteBusy = function(){
    return this.startSprite?.isBusy()
}

Scene_Map.prototype.createPressStart = function(){
    if(!this.startSprite) {
        this.startSprite = new Plugin.Sprite_PressStart()
        this.addChild(this.startSprite)
    }
}

/* ----------------------------- SCENE GAME END ----------------------------- */
Alias.Scene_GameEnd_terminate = Scene_GameEnd.prototype.terminate
Scene_GameEnd.prototype.terminate = function() {
    Alias.Scene_GameEnd_terminate.call(this)
    Plugin.enableStartSprite(true)
}

/* ----------------------------- SCENE GAME OVER ---------------------------- */
Alias.Scene_Gameover_terminate = Scene_Gameover.prototype.terminate
Scene_Gameover.prototype.terminate = function() {
    Alias.Scene_Gameover_terminate.call(this)
    Plugin.enableStartSprite(true)
}

}