//==========================================================================
// EliMZ_PartyMapSettings.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.0♦ Adds specific settings for the player on the map, according to the party leader.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-party-map-settings-for-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

You can change some configurations for the party sprites according to the 
actor that is the leader:

● Move Speed
● Opacity
● BlendMode
● Move Frequency
● Walk Animations
● Step Animations
● Direction Fix
● Through
● Turn Switches on
● Play Common Event
● Run script calls

============================================================================
How to use
============================================================================

Just set the following note tags on your actor's note(They are case 
sensitive):

<MoveSpeed:number>      Default is 4
<Opacity:number>        Default is 255
<BlendMode:number>      Default is 0
<MoveFrequency:number>  Default is 6
<StepAnime:true/false>  Default is false
<WalkAnime:true/false>  Default is true
<DirFix:true/false>     Default is false
<Through:true/false>    Default is false
<LeaderSw:ID>           Turn this switch ID on, when this actor is leader.
                        (Off, otherwise)
<LeaderScript: script>  Run a script call.
<LeaderCEvent: ID>      Run a common event(Only work on Map or Battle scene).

============================================================================
Update Log
============================================================================

https://tinyurl.com/partyMapSettings

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_PartyMapSettings = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.PartyMapSettings = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-party-map-settings-for-rpg-maker-mv",
    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    toBoolean(string){
        return string.toLowerCase() === "true"
    }
}

const Plugin = Eli.PartyMapSettings
const Alias = Eli.PartyMapSettings.alias

Plugin.initialize()

/* ------------------------------- GAME PLAYER ------------------------------ */

Alias.Game_Player_refresh = Game_Player.prototype.refresh
Game_Player.prototype.refresh = function() {
    Alias.Game_Player_refresh.call(this)
    if($gameParty.exists()) {
        this.refreshPartyMapSeetings()
    }
}

Game_Player.prototype.refreshPartyMapSeetings = function(){
    const actorId = $gameParty.leader().actorId()
    const meta = $dataActors[actorId].meta
    const { LeaderScript, LeaderCEvent } = meta
    const isValidScene = Eli.Utils.isScene(Scene_Map) || Eli.Utils.isScene(Scene_Battle)

    this.refreshPartyMapSettingsMainNotes(meta)

    if(LeaderScript){
        this.refreshLeaderMapSettingsScript(meta)
    }

    if(LeaderCEvent && isValidScene){
        this.refreshLeaderMapSettingsCommonEvent(meta)
    }

    this.refreshPartyMapSettingsSwitches()
}

Game_Player.prototype.refreshPartyMapSettingsMainNotes = function(meta){
    const {
        MoveSpeed = 4, 
        Opacity = 255, 
        BlendMode = 0, 
        MoveFrequency = 6,
        WalkAnime = "true", 
        StepAnime = "false", 
        DirFix = "false", 
        Through = "false"
    } = meta

    this.setMoveSpeed(      Number(MoveSpeed)           )
    this.setOpacity(        Number(Opacity)             )
    this.setBlendMode(      Number(BlendMode)           )
    this.setMoveFrequency(  Number(MoveFrequency)       )
    this.setWalkAnime(      Plugin.toBoolean(WalkAnime) )
    this.setStepAnime(      Plugin.toBoolean(StepAnime) )
    this.setDirectionFix(   Plugin.toBoolean(DirFix)    )
    this.setThrough(        Plugin.toBoolean(Through)   )
}

Game_Player.prototype.refreshLeaderMapSettingsScript = function(meta){
    eval(meta.LeaderScript)
}

Game_Player.prototype.refreshLeaderMapSettingsCommonEvent = function(meta){
    const commonEventId = Number(meta.LeaderCEvent)
    $gameTemp.reserveCommonEvent(commonEventId)
}

Game_Player.prototype.changeLeaderMapSettingsSwitch = function(member){
    const actorId = member.actorId()
    const meta = $dataActors[actorId].meta

    if(meta.hasOwnProperty("LeaderSw")){
        const switchId = Number(meta.LeaderSw)
        const isLeader = $gameParty.leader() === member

        $gameSwitches.setValue(switchId, isLeader)
    }
}

Game_Player.prototype.refreshPartyMapSettingsSwitches = function(){
    $gameParty.members().forEach(this.changeLeaderMapSettingsSwitch)
}

}