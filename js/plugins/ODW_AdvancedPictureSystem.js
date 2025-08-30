//=============================================================================
// Open Digital World - Advanced Picture System Plugin v2.0.0
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.0.0] - Improve image and text bitmap management.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-advanced-picture-system
 * 
 * @base ODW_Core
 * @orderAfter ODW_Core
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Advanced Picture System Plugin
 *-----------------------------------------------------------------------------
 * 
 * This plugin lets you manipulate images or text transformed into images
 * by means of various transformations: moving, scaling, rotating, spinning,
 * flipping vertically or horizontally, fading and tinting. Texts can also
 * include icons and other text commands (e.g. \C[x], \{ or \}, ...). Finally,
 * this plugin enables common events to be triggered by various mouse or
 * keyboard actions (hover, press, click). 
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * 1. Install and configure your plugin.
 * 
 * 2. Use the available plugin commands to display, manipulate or delete images.
 * 
 * Important: this plugin uses its own "picture" object. It is not possible to
 * manipulate images displayed with the RMMZ editor's native functions, and
 * vice versa.
 * 
 * See also README.md for more information about settings, commands, ...
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * Possibly with any plugins that modify the behavior of pictures.
 * 
 * DISCLAIMER: This plugin offers no guarantee of compatibility with VisuStella
 * plugins or those of other creators. However, patches can be made available
 * on the itch.io download platform on request.
 * 
 *-----------------------------------------------------------------------------
 * Support and feedbacks
 *-----------------------------------------------------------------------------
 * 
 * For plugin support, please join us here:
 * 
 * https://forums.rpgmakerweb.com/index.php?threads/odw-plugins-collection-releases.173595/
 * 
 *-----------------------------------------------------------------------------
 * Version history
 *-----------------------------------------------------------------------------
 * 
 * 26.05.2024 v1.0.0
 *   - Initial release.
 * 02.06.2024 v1.1.0
 *   - Improved the plugin commands selection list with separators.
 *   - Added new plugin commands for quick image creation (with default system settings).
 *   - Added a new plugin command to bind common events to existing pictures (can use variables).
 *   - Replaced the custom interpreter with the default core interpreter.
 * 07.06.2024 v1.2.0
 *   - Improved the Sprite_Picture custom code.
 *   - Added new plugin commands for quick and standard animated picture creation.
 *   - Added new plugin commands to start and stop animated picture.
 * 01.12.2024 v2.0.0
 *   - Improved the global code.
 *   - Added the core plugin functions and features.
 *   - Added color settings type such as #HEX, rgba or window skin.
 *   - Removed general font settings.
 *   - Removed general error log settings.
 * 
 *-----------------------------------------------------------------------------
 * Terms of use - MIT License
 *-----------------------------------------------------------------------------
 * 
 * Copyright (c) 2024 Open Digital World
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 *-----------------------------------------------------------------------------
 * 
 * 
 * @param variableId
 * @text Variable ID (Picture CE Trigger)
 * @desc The variable ID reserved for recording the ID of the picture triggering a common event.
 * @type number
 * @default 0
 * 
 * 
 * @command null-1
 * @text ----- Quick Commands -------------------
 * 
 * 
 * @command createImageQuick
 * @text Quick Create Image
 * @desc Displays an image as a picture with default system settings.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Image
 * @desc The image file used as a picture.
 * @type file
 * @dir img/pictures
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * 
 * @command createTextQuick
 * @text Quick Create Text
 * @desc Displays a text as a picture with default system settings.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Text
 * @desc The text to display as a picture.
 * @type string
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * 
 * @command createAnimationQuick
 * @text Quick Create Animation
 * @desc Displays a sprite as an animated picture with default system settings.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Sprite
 * @desc The sprite file used as a picture.
 * @type file
 * @dir img/pictures
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg animationFrames
 * @text Animation Frames
 * @desc The number of frames that make up the animated picture. A number between 1 and 100.
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * 
 * @arg animationDuration
 * @text Animation Duration
 * @desc The number of frames the animated picture will take to complete a full animation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * 
 * @command bindCommonEventQuick
 * @text Quick Bind Common Event
 * @desc Binds a common event to an existing picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg ceType
 * @text Common Event Type
 * @desc The common event type to call.
 * @type select
 * @option On Mouse Enter
 * @option On Mouse Exit
 * @option On Press
 * @option On Click
 * @default On Click
 * 
 * @arg ceId
 * @text Common Event ID
 * @desc The common event ID to call. Can use a variable v[id] or a number between 1 and 999.
 * @type string
 * @default 0
 * 
 * 
 * @command null-2
 * @text ----- Standard Commands ----------------
 * 
 * 
 * @command createImage
 * @text Create Image
 * @desc Displays an image as a picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Image
 * @desc The image file used as a picture.
 * @type file
 * @dir img/pictures
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg scaleX
 * @text Scale Width
 * @desc The scale width of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg scaleY
 * @text Scale Height
 * @desc The scale height of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg angle
 * @text Rotation Angle
 * @desc The rotation angle of the picture. A number between 0 and 360.
 * @type number
 * @min 0
 * @max 360
 * @default 0
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity of the picture. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg blendMode
 * @text Blend Mode
 * @desc The blend mode of the picture.
 * @type select
 * @option Normal
 * @option Additive
 * @option Multiply
 * @option Screen
 * @default Normal
 * 
 * @arg ceOnMouseEnter
 * @text Common Event: On Mouse Enter
 * @desc The common event to call when the picture is hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnMouseExit
 * @text Common Event: On Mouse Exit
 * @desc The common event to call when the picture is no more hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnPress
 * @text Common Event: On Press
 * @desc The common event to call when the picture is pressed.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnClick
 * @text Common Event: On Click
 * @desc The common event to call when the picture is clicked.
 * @type common_event
 * @default 0
 * 
 * 
 * @command createText
 * @text Create Text
 * @desc Displays a text as a picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Text
 * @desc The text to display as a picture.
 * @type string
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg scaleX
 * @text Scale Width
 * @desc The scale width of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg scaleY
 * @text Scale Height
 * @desc The scale height of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg angle
 * @text Rotation Angle
 * @desc The rotation angle of the picture. A number between 0 and 360.
 * @type number
 * @min 0
 * @max 360
 * @default 0
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity of the picture. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg blendMode
 * @text Blend Mode
 * @desc The blend mode of the picture.
 * @type select
 * @option Normal
 * @option Additive
 * @option Multiply
 * @option Screen
 * @default Normal
 * 
 * @arg fontName
 * @text Font Name
 * @desc The font name of the text picture. A value from the list of custom fonts (leave blank for default font name).
 * @type string
 * 
 * @arg fontSize
 * @text Font Size
 * @desc The font size of the text picture. A number between 0 and 108 (0 uses default font size).
 * @type number
 * @min 0
 * @max 108
 * @default 0
 * 
 * @arg fontStyle
 * @text Font Style
 * @desc The font style of the text picture.
 * @type select
 * @option Normal
 * @option Italic
 * @option Bold
 * @option Italic Bold
 * @default Normal
 * 
 * @arg textColor
 * @text Text Color
 * @desc The main color of the text picture. Can be #HEX, rgba() or a color code from the window skin (0 to 31).
 * @type string
 * 
 * @arg outlineColor
 * @text Outline Color
 * @desc The outline color of the text picture. Can be #HEX, rgba() or a color code from the window skin (0 to 31).
 * @type string
 * 
 * @arg outlineWidth
 * @text Outline Width
 * @desc The outline width of the text picture. A number between 0 and 12.
 * @type number
 * @min 0
 * @max 12
 * @default 0
 * 
 * @arg ceOnMouseEnter
 * @text Common Event: On Mouse Enter
 * @desc The common event to call when the picture is hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnMouseExit
 * @text Common Event: On Mouse Exit
 * @desc The common event to call when the picture is no more hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnPress
 * @text Common Event: On Press
 * @desc The common event to call when the picture is pressed.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnClick
 * @text Common Event: On Click
 * @desc The common event to call when the picture is clicked.
 * @type common_event
 * @default 0
 * 
 * 
 * @command createAnimation
 * @text Create Animation
 * @desc Displays a sprite as an animated picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg name
 * @text Picture Sprite
 * @desc The sprite file used as a picture.
 * @type file
 * @dir img/pictures
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg scaleX
 * @text Scale Width
 * @desc The scale width of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg scaleY
 * @text Scale Height
 * @desc The scale height of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg angle
 * @text Rotation Angle
 * @desc The rotation angle of the picture. A number between 0 and 360.
 * @type number
 * @min 0
 * @max 360
 * @default 0
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity of the picture. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg blendMode
 * @text Blend Mode
 * @desc The blend mode of the picture.
 * @type select
 * @option Normal
 * @option Additive
 * @option Multiply
 * @option Screen
 * @default Normal
 * 
 * @arg animationFrames
 * @text Animation Frames
 * @desc The number of frames that make up the animated picture. A number between 1 and 100.
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * 
 * @arg animationDuration
 * @text Animation Duration
 * @desc The number of frames the animated picture will take to complete a full animation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg animationAuto
 * @text Animation Auto
 * @desc Indicates whether the animation starts automatically or not.
 * @type boolean
 * @default false
 * 
 * @arg ceOnMouseEnter
 * @text Common Event: On Mouse Enter
 * @desc The common event to call when the picture is hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnMouseExit
 * @text Common Event: On Mouse Exit
 * @desc The common event to call when the picture is no more hovered by the mouse.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnPress
 * @text Common Event: On Press
 * @desc The common event to call when the picture is pressed.
 * @type common_event
 * @default 0
 * 
 * @arg ceOnClick
 * @text Common Event: On Click
 * @desc The common event to call when the picture is clicked.
 * @type common_event
 * @default 0
 * 
 * 
 * @command erase
 * @text Erase
 * @desc Erases a picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * 
 * @command null-3
 * @text ----- Transformations ------------------
 * 
 * 
 * @command reset
 * @text Reset
 * @desc Resets the picture to its original state.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command transform
 * @text Transform
 * @desc Transforms the picture position, scale, rotation, opacity and tint.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg scaleX
 * @text Scale Width
 * @desc The scale width of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg scaleY
 * @text Scale Height
 * @desc The scale height of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg angle
 * @text Rotation Angle
 * @desc The rotation angle of the picture. A number between -360 and 360.
 * @type number
 * @min -360
 * @max 360
 * @default 0
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity of the picture. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg red
 * @text Red
 * @desc The red tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg green
 * @text Green
 * @desc The green tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg blue
 * @text Blue
 * @desc The blue tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg grey
 * @text Grey
 * @desc The grey tone. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command move
 * @text Move
 * @desc Changes the picture position.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg moveType
 * @text Move Type
 * @desc The type of the picture move (relative = current state, or absolute = initial state).
 * @type select
 * @option Relative
 * @option Absolute
 * @default Absolute
 * 
 * @arg positionX
 * @text Position X
 * @desc The X position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg positionY
 * @text Position Y
 * @desc The Y position of the picture relative to the screen. Can use a variable v[id] or a number in [pixel].
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command scale
 * @text Scale
 * @desc Changes the picture scale.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg scaleType
 * @text Scale Type
 * @desc The type of the picture scale (relative = current state, or absolute = initial state).
 * @type select
 * @option Relative
 * @option Absolute
 * @default Absolute
 * 
 * @arg scaleX
 * @text Scale Width
 * @desc The scale width of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg scaleY
 * @text Scale Height
 * @desc The scale height of the picture. A number between 0 and 2000.
 * @type number
 * @min 0
 * @max 2000
 * @default 100
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command rotate
 * @text Rotate
 * @desc Changes the picture angle.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg rotationType
 * @text Rotation Type
 * @desc The type of the picture rotation (relative = current state, or absolute = initial state).
 * @type select
 * @option Relative
 * @option Absolute
 * @default Absolute
 * 
 * @arg angle
 * @text Rotation Angle
 * @desc The rotation angle of the picture. A number between -360 and 360.
 * @type number
 * @min -360
 * @max 360
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command spinStart
 * @text Start Spinning
 * @desc Starts spinning the picture (continuous rotation).
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg origin
 * @text Picture Origin
 * @desc The origin point for transforming the picture.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @arg rotationSpeed
 * @text Rotation Speed
 * @desc The rotation speed of the picture. A number between -90 and 90.
 * @type number
 * @min -90
 * @max 90
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command spinStop
 * @text Stop Spinning
 * @desc Stops spinning the picture (continuous rotation).
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command flipVertical
 * @text Flip Vertical
 * @desc Flips the picture vertically.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command flipHorizontal
 * @text Flip Horizontal
 * @desc Flips the picture horizontally.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command fade
 * @text Fade
 * @desc Fades the picture (opacity = x).
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity of the picture. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command fadeIn
 * @text Fade In
 * @desc Fades in the picture (opacity = 255).
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command fadeOut
 * @text Fade Out
 * @desc Fades out the picture (opacity = 0).
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The easing type of the picture transformation.
 * @type select
 * @option Linear
 * @option Slow Start
 * @option Slow End
 * @option Slow Start End
 * @default Linear
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command tint
 * @text Tint
 * @desc Changes the picture tone.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * @arg red
 * @text Red
 * @desc The red tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg green
 * @text Green
 * @desc The green tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg blue
 * @text Blue
 * @desc The blue tone. A number between -255 and 255.
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @arg grey
 * @text Grey
 * @desc The grey tone. A number between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @arg duration
 * @text Duration
 * @desc The number of frames that the picture will take to finish the transformation. A number between 0 and 3600.
 * @type number
 * @min 0
 * @max 3600
 * @default 0
 * 
 * @arg wait
 * @text Wait
 * @desc Indicates whether the current event will wait the picture to finish the transformation or not.
 * @type boolean
 * @default false
 * 
 * 
 * @command null-4
 * @text ----- Animations -----------------------
 * 
 * 
 * @command startAnimation
 * @text Start Animation
 * @desc Starts the animation of an animated picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 * 
 * @command stopAnimation
 * @text Stop Animation
 * @desc Stops the animation of an animated picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID. Can use a variable v[id] or a number between 1 and 100.
 * @type string
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.ODW_AdvancedPictureSystem = true;

var ODW = ODW || {};
ODW.APS = ODW.APS || {};
ODW.APS.pluginName = "ODW_AdvancedPictureSystem";
ODW.APS.pluginVersion = [2, 0, 0];

(($) => {

	'use strict';

	/*
	 *-----------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *-----------------------------------------------------------------------------
	 */

	const pluginParams = PluginManager.parameters(ODW.APS.pluginName);

	// Declare plugin params.
	$._variableId = pluginParams.variableId;

	/*
	 *-----------------------------------------------------------------------------
	 * VARIABLE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the variable ID.
	 * 
	 * @return number
	 */
	$.variableId = function() {
		return ODW.integer(this._variableId);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * PICTURE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Convert a picture id.
	 * 
	 * @param string The picture id to convert
	 * 
	 * @return number
	 */
	$.pictureId = function(id) {
		const pictureId = ODW.integer(ODW.variable(id));
		if (pictureId > 100) {
			ODW.logError(this.pluginName, "A picture id is greater than 100. This image will not be displayed.");
			return 0;
		}
		if (pictureId < 1) {
			ODW.logError(this.pluginName, "A picture id is lower than 1. This image will not be displayed.");
			return 0;
		}
		return pictureId;
	};
	
	/*
	 *-----------------------------------------------------------------------------
	 * COMMON EVENT
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Convert a common event type into number.
	 * 
	 * @param string The common event type to convert
	 * 
	 * @return number
	 */
	$.ceType = function(ceType) {
		switch (ceType) {
			case "On Mouse Enter": return 0;
			case "On Mouse Exit":  return 1;
			case "On Press":       return 2;
			case "On Click":       return 3;
			default:               return 3;
		}
	};

	/*
	 * Convert a common event id.
	 * 
	 * @param string The common event id to convert
	 * 
	 * @return number
	 */
	$.ceId = function(id) {
		const ceId = ODW.integer(ODW.variable(id));
		if (ceId > 999) {
			ODW.logError(this.pluginName, "A common event id is greater than 999. This common event will not be binded.");
			return 0;
		}
		if (ceId < 1) {
			ODW.logError(this.pluginName, "A common event id is lower than 1. This common event will not be binded.");
			return 0;
		}
		return ceId;
	};

})(ODW.APS);

//=============================================================================
// Plugin Manager
//=============================================================================

PluginManager.registerCommand(ODW.APS.pluginName, "createImageQuick", args => {
	const type = 0;
	const id = ODW.APS.pictureId(args.id);
	const name = ODW.string(args.name);
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = 100;
	const scaleY = 100;
	const angle = 0;
	const opacity = 255;
	const blendMode = ODW.blendMode();
	const fontName = "";
	const fontSize = 0;
	const fontStyle = "";
	const textColor = "";
	const outlineColor = "";
	const outlineWidth = 0;
	const animationFrames = 1;
	const animationDuration = 0;
	const animationAuto = false;
	const ceOnMouseEnter = 0;
	const ceOnMouseExit = 0;
	const ceOnPress = 0;
	const ceOnClick = 0;
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});

PluginManager.registerCommand(ODW.APS.pluginName, "createTextQuick", args => {
	const type = 1;
	const id = ODW.APS.pictureId(args.id);
	const name = " " + ODW.string(args.name) + " ";	// Add spaces for margin with outline
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = 100;
	const scaleY = 100;
	const angle = 0;
	const opacity = 255;
	const blendMode = ODW.blendMode();
	const fontName = ODW.fontName();
	const fontSize = ODW.fontSize();
	const fontStyle = ODW.fontStyle();
	const textColor = ODW.textColor();
	const outlineColor = ODW.outlineColor();
	const outlineWidth = ODW.outlineWidth();
	const animationFrames = 1;
	const animationDuration = 0;
	const animationAuto = false;
	const ceOnMouseEnter = 0;
	const ceOnMouseExit = 0;
	const ceOnPress = 0;
	const ceOnClick = 0;
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});

PluginManager.registerCommand(ODW.APS.pluginName, "createAnimationQuick", args => {
	const type = 2;
	const id = ODW.APS.pictureId(args.id);
	const name = ODW.string(args.name);
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = 100;
	const scaleY = 100;
	const angle = 0;
	const opacity = 255;
	const blendMode = ODW.blendMode();
	const fontName = "";
	const fontSize = 0;
	const fontStyle = "";
	const textColor = "";
	const outlineColor = "";
	const outlineWidth = 0;
	const animationFrames = ODW.integer(args.animationFrames);
	const animationDuration = ODW.integer(args.animationDuration);
	const animationAuto = true;
	const ceOnMouseEnter = 0;
	const ceOnMouseExit = 0;
	const ceOnPress = 0;
	const ceOnClick = 0;
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});

PluginManager.registerCommand(ODW.APS.pluginName, "bindCommonEventQuick", args => {
	const id = ODW.APS.pictureId(args.id);
	const ceType = ODW.APS.ceType(args.ceType);
	const ceId = ODW.APS.ceId(args.ceId);
	$gameScreen.apsBindPictureCE(id, ceType, ceId);
});

PluginManager.registerCommand(ODW.APS.pluginName, "createImage", args => {
	const type = 0;
	const id = ODW.APS.pictureId(args.id);
	const name = ODW.string(args.name);
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = ODW.integer(args.scaleX);
	const scaleY = ODW.integer(args.scaleY);
	const angle = ODW.integer(args.angle);
	const opacity = ODW.integer(args.opacity);
	const blendMode = ODW.blendMode(args.blendMode);
	const fontName = "";
	const fontSize = 0;
	const fontStyle = "";
	const textColor = "";
	const outlineColor = "";
	const outlineWidth = 0;
	const animationFrames = 1;
	const animationDuration = 0;
	const animationAuto = false;
	const ceOnMouseEnter = ODW.integer(args.ceOnMouseEnter);
	const ceOnMouseExit = ODW.integer(args.ceOnMouseExit);
	const ceOnPress = ODW.integer(args.ceOnPress);
	const ceOnClick = ODW.integer(args.ceOnClick);
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});

PluginManager.registerCommand(ODW.APS.pluginName, "createText", args => {
	const type = 1;
	const id = ODW.APS.pictureId(args.id);
	const name = " " + ODW.string(args.name) + " ";	// Add spaces for margin with outline
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = ODW.integer(args.scaleX);
	const scaleY = ODW.integer(args.scaleY);
	const angle = ODW.integer(args.angle);
	const opacity = ODW.integer(args.opacity);
	const blendMode = ODW.blendMode(args.blendMode);
	const fontName = ODW.fontName(args.fontName);
	const fontSize = ODW.fontSize(args.fontSize);
	const fontStyle = ODW.fontStyle(args.fontStyle);
	const textColor = ODW.textColor(args.textColor);
	const outlineColor = ODW.outlineColor(args.outlineColor);
	const outlineWidth = ODW.outlineWidth(args.outlineWidth);
	const animationFrames = 1;
	const animationDuration = 0;
	const animationAuto = false;
	const ceOnMouseEnter = ODW.integer(args.ceOnMouseEnter);
	const ceOnMouseExit = ODW.integer(args.ceOnMouseExit);
	const ceOnPress = ODW.integer(args.ceOnPress);
	const ceOnClick = ODW.integer(args.ceOnClick);
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});


PluginManager.registerCommand(ODW.APS.pluginName, "createAnimation", args => {
	const type = 2;
	const id = ODW.APS.pictureId(args.id);
	const name = ODW.string(args.name);
	const origin = ODW.origin(args.origin);
	const positionX = ODW.integer(ODW.variable(args.positionX));
	const positionY = ODW.integer(ODW.variable(args.positionY));
	const scaleX = ODW.integer(args.scaleX);
	const scaleY = ODW.integer(args.scaleY);
	const angle = ODW.integer(args.angle);
	const opacity = ODW.integer(args.opacity);
	const blendMode = ODW.blendMode(args.blendMode);
	const fontName = "";
	const fontSize = 0;
	const fontStyle = "";
	const textColor = "";
	const outlineColor = "";
	const outlineWidth = 0;
	const animationFrames = ODW.integer(args.animationFrames);
	const animationDuration = ODW.integer(args.animationDuration);
	const animationAuto = ODW.boolean(args.animationAuto);
	const ceOnMouseEnter = ODW.integer(args.ceOnMouseEnter);
	const ceOnMouseExit = ODW.integer(args.ceOnMouseExit);
	const ceOnPress = ODW.integer(args.ceOnPress);
	const ceOnClick = ODW.integer(args.ceOnClick);
	$gameScreen.apsCreatePicture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
});

PluginManager.registerCommand(ODW.APS.pluginName, "erase", args => {
	const id = ODW.APS.pictureId(args.id);
	$gameScreen.apsErasePicture(id);
});

PluginManager.registerCommand(ODW.APS.pluginName, "reset", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsResetPicture(id, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "transform", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin(args.origin);
		const positionX = ODW.integer(ODW.variable(args.positionX));
		const positionY = ODW.integer(ODW.variable(args.positionY));
		const scaleX = ODW.integer(args.scaleX);
		const scaleY = ODW.integer(args.scaleY);
		const angle = ODW.integer(args.angle);
		const opacity = ODW.integer(args.opacity);
		const red = ODW.integer(args.red);
		const green = ODW.integer(args.green);
		const blue = ODW.integer(args.blue);
		const grey = ODW.integer(args.grey);
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsTransformPicture(id, origin, positionX, positionY, scaleX, scaleY, angle, opacity, [red, green, blue, grey], easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "move", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin(args.origin);
		const moveType = ODW.isReferenceRelative(ODW.reference(args.moveType)) ? 1 : 0;
		const positionX = ODW.integer(ODW.variable(args.positionX)) + moveType * picture.x();
		const positionY = ODW.integer(ODW.variable(args.positionY)) + moveType * picture.y();
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsMovePicture(id, origin, positionX, positionY, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "scale", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin(args.origin);
		const scaleType = ODW.isReferenceRelative(ODW.reference(args.scaleType)) ? 1 : 0;
		const scaleX = ODW.integer(args.scaleX) + scaleType * picture.scaleX();
		const scaleY = ODW.integer(args.scaleY) + scaleType * picture.scaleY();
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsScalePicture(id, origin, scaleX, scaleY, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "rotate", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin(args.origin);
		const rotationType = ODW.isReferenceRelative(ODW.reference(args.rotationType)) ? 1 : 0;
		const angle = ODW.integer(args.angle) + rotationType * picture.angle();
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsRotatePicture(id, origin, angle, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "spinStart", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin(args.origin);
		const rotationSpeed = ODW.integer(args.rotationSpeed);
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsSpinPicture(id, origin, rotationSpeed, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "spinStop", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = picture.origin();
		const rotationSpeed = 0;
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsSpinPicture(id, origin, rotationSpeed, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "flipVertical", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin("Middle Center");
		const scaleX = picture.scaleX();
		const scaleY = -1 * picture.scaleY();
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsScalePicture(id, origin, scaleX, scaleY, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "flipHorizontal", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const origin = ODW.origin("Middle Center");
		const scaleX = -1 * picture.scaleX();
		const scaleY = picture.scaleY();
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsScalePicture(id, origin, scaleX, scaleY, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "fade", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const opacity = ODW.integer(args.opacity);
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsFadePicture(id, opacity, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "fadeIn", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const opacity = 255;
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsFadePicture(id, opacity, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "fadeOut", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const opacity = 0;
		const easingType = ODW.easingType(args.easingType);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsFadePicture(id, opacity, easingType, duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "tint", function(args) {
	const id = ODW.APS.pictureId(args.id);
	const picture = $gameScreen.picture(id);
	if (picture) {
		const red = ODW.integer(args.red);
		const green = ODW.integer(args.green);
		const blue = ODW.integer(args.blue);
		const grey = ODW.integer(args.grey);
		const duration = ODW.integer(args.duration);
		const wait = ODW.boolean(args.wait);
		$gameScreen.apsTintPicture(id, [red, green, blue, grey], duration);
		if (wait) {
			this.wait(duration);
		}
	}
});

PluginManager.registerCommand(ODW.APS.pluginName, "startAnimation", args => {
	const id = ODW.APS.pictureId(args.id);
	$gameScreen.apsStartAnimation(id);
});

PluginManager.registerCommand(ODW.APS.pluginName, "stopAnimation", args => {
	const id = ODW.APS.pictureId(args.id);
	$gameScreen.apsStopAnimation(id);
});

//=============================================================================
//  00000    00000   000000   0000000
// 0     0  0     0  0     0  0
// 0        0     0  0     0  0
// 0        0     0  000000   00000
// 0        0     0  0   0    0
// 0     0  0     0  0    0   0
//  00000    00000   0     0  0000000
//=============================================================================

//=============================================================================
//  00000   000000   0000000  0000000   00000   0000000
// 0     0  0     0        0  0        0     0     0
// 0     0  0     0        0  0        0           0
// 0     0  000000         0  00000    0           0
// 0     0  0     0        0  0        0           0
// 0     0  0     0  0     0  0        0     0     0
//  00000   000000    00000   0000000   00000      0
//=============================================================================

//=============================================================================
// Game_Screen
//=============================================================================

// New function.
Game_Screen.prototype.apsCreatePicture = function(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick) {
	const realPictureId = this.realPictureId(id);
	const picture = new APS_Game_Picture(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick);
	this._pictures[realPictureId] = picture;
};

// New function.
Game_Screen.prototype.apsErasePicture = function(id) {
	const realPictureId = this.realPictureId(id);
	this._pictures[realPictureId] = null;
};

// New function.
Game_Screen.prototype.apsBindPictureCE = function(id, ceType, ceId) {
	const picture = this.picture(id);
	if (picture) {
		picture.bindCE(ceType, ceId);
	}
};

// New function.
Game_Screen.prototype.apsResetPicture = function(id, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.reset(easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsTransformPicture = function(id, origin, positionX, positionY, scaleX, scaleY, angle, opacity, tone, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.transform(origin, positionX, positionY, scaleX, scaleY, angle, opacity, tone, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsMovePicture = function(id, origin, positionX, positionY, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.move(origin, positionX, positionY, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsScalePicture = function(id, origin, scaleX, scaleY, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.scale(origin, scaleX, scaleY, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsRotatePicture = function(id, origin, angle, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.rotate(origin, angle, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsSpinPicture = function(id, origin, rotationSpeed, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.spin(origin, rotationSpeed, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsFadePicture = function(id, opacity, easingType, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.fade(opacity, easingType, duration);
	}
};

// New function.
Game_Screen.prototype.apsTintPicture = function(id, tone, duration) {
	const picture = this.picture(id);
	if (picture) {
		picture.tint(tone, duration);
	}
};

// New function.
Game_Screen.prototype.apsStartAnimation = function(id) {
	const picture = this.picture(id);
	if (picture) {
		picture.startAnimation();
	}
};

// New function.
Game_Screen.prototype.apsStopAnimation = function(id) {
	const picture = this.picture(id);
	if (picture) {
		picture.stopAnimation();
	}
};

// New function.
Game_Screen.prototype.apsIsAnimated = function(id) {
	const picture = this.picture(id);
	if (picture) {
		return picture.isAnimated();
	}
};

//=============================================================================
// APS_Game_Picture
//=============================================================================

function APS_Game_Picture() {
	this.initialize(...arguments);
};

APS_Game_Picture.prototype.initialize = function(type, id, name, origin, positionX, positionY, scaleX, scaleY, angle, opacity, blendMode, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth, animationFrames, animationDuration, animationAuto, ceOnMouseEnter, ceOnMouseExit, ceOnPress, ceOnClick) {
	this._type = type;
	this._id = id;
	this._name = name;
	this._width = 0;
	this._height = 0;
	this._origin = origin;
	this._x = positionX;
	this._y = positionY;
	this._scaleX = scaleX;
	this._scaleY = scaleY;
	this._angle = angle;
	this._rotationSpeed = 0;
	this._opacity = opacity;
	this._tone = [0, 0, 0, 0];
	this._blendMode = blendMode;
	this._fontName = fontName;
	this._fontSize = fontSize;
	this._fontStyle = fontStyle;
	this._textColor = textColor;
	this._outlineColor = outlineColor;
	this._outlineWidth = outlineWidth;
	this._animationFrames = animationFrames;
	this._animationDuration = animationDuration;
	this._hasAnimation = animationAuto;
	this._ceOnMouseEnter = ceOnMouseEnter;
	this._ceOnMouseExit = ceOnMouseExit;
	this._ceOnPress = ceOnPress;
	this._ceOnClick = ceOnClick;
	this.initAnimation();
	this.initInitial();
	this.initTarget();
};

APS_Game_Picture.prototype.isImage = function() {
	return this._type === 0;
};

APS_Game_Picture.prototype.isText = function() {
	return this._type === 1;
};

APS_Game_Picture.prototype.isAnimation = function() {
	return this._type === 2;
};

APS_Game_Picture.prototype.id = function() {
	return this._id;
};

APS_Game_Picture.prototype.name = function() {
	return this._name;
};

APS_Game_Picture.prototype.width = function() {
	return this._width;
};

APS_Game_Picture.prototype.setWidth = function(width) {
	this._width = width;
};

APS_Game_Picture.prototype.height = function() {
	return this._height;
};

APS_Game_Picture.prototype.setHeight = function(height) {
	this._height = height;
};

APS_Game_Picture.prototype.origin = function() {
	return this._origin;
};

APS_Game_Picture.prototype.x = function() {
	return this._x;
};

APS_Game_Picture.prototype.y = function() {
	return this._y;
};

APS_Game_Picture.prototype.scaleX = function() {
	return this._scaleX;
};

APS_Game_Picture.prototype.scaleY = function() {
	return this._scaleY;
};

APS_Game_Picture.prototype.angle = function() {
	return this._angle;
};

APS_Game_Picture.prototype.rotationSpeed = function() {
	return this._rotationSpeed;
};

APS_Game_Picture.prototype.opacity = function() {
	return this._opacity;
};

APS_Game_Picture.prototype.tone = function() {
	return this._tone;
};

APS_Game_Picture.prototype.blendMode = function() {
	return this._blendMode;
};

APS_Game_Picture.prototype.fontName = function() {
	return this._fontName;
};

APS_Game_Picture.prototype.fontSize = function() {
	return this._fontSize;
};

APS_Game_Picture.prototype.fontStyle = function() {
	return this._fontStyle;
};

APS_Game_Picture.prototype.textColor = function() {
	return this._textColor;
};

APS_Game_Picture.prototype.outlineColor = function() {
	return this._outlineColor;
};

APS_Game_Picture.prototype.outlineWidth = function() {
	return this._outlineWidth;
};

APS_Game_Picture.prototype.animationFrames = function() {
	return this._animationFrames;
};

APS_Game_Picture.prototype.animationDuration = function() {
	return this._animationDuration;
};

APS_Game_Picture.prototype.hasAnimation = function() {
	return this._hasAnimation;
};

APS_Game_Picture.prototype.ceOnMouseEnter = function() {
	return this._ceOnMouseEnter;
};

APS_Game_Picture.prototype.ceOnMouseExit = function() {
	return this._ceOnMouseExit;
};

APS_Game_Picture.prototype.ceOnPress = function() {
	return this._ceOnPress;
};

APS_Game_Picture.prototype.ceOnClick = function() {
	return this._ceOnClick;
};

APS_Game_Picture.prototype.frameWidth = function() {
	return this._frameWidth;
};

APS_Game_Picture.prototype.frameHeight = function() {
	return this._frameHeight;
};

APS_Game_Picture.prototype.frameX = function() {
	return this._frameX;
};

APS_Game_Picture.prototype.frameY = function() {
	return this._frameY;
};

APS_Game_Picture.prototype.initAnimation = function() {
	this._frameWidth = 0;
	this._frameHeight = 0;
	this._frameX = 0;
	this._frameY = 0;
	this._frameIndex = 0;
	this._frameCount = 0;
};

APS_Game_Picture.prototype.initInitial = function() {
	this._initialOrigin = this._origin;
	this._initialX = this._x;
	this._initialY = this._y;
	this._initialScaleX = this._scaleX;
	this._initialScaleY = this._scaleY;
	this._initialAngle = this._angle;
	this._initialRotationSpeed = 0;
	this._initialOpacity = this._opacity;
	this._initialTone = [0, 0, 0, 0];
};

APS_Game_Picture.prototype.initTarget = function() {
	this._target = "";
	this._targetOrigin = this._origin;
	this._targetX = this._x;
	this._targetY = this._y;
	this._targetScaleX = this._scaleX;
	this._targetScaleY = this._scaleY;
	this._targetAngle = this._angle;
	this._targetRotationSpeed = this._rotationSpeed;
	this._targetOpacity = this._opacity;
	this._targetTone = this._tone;
	this._duration = 0;
	this._wholeDuration = 0;
	this._easingType = 0;
	this._easingExponent = 0;
};

APS_Game_Picture.prototype.bindCE = function(ceType, ceId) {
	switch (ceType) {
		case 0:
			this._ceOnMouseEnter = ceId;
		case 1:
			this._ceOnMouseExit = ceId;
		case 2:
			this._ceOnPress = ceId;
		case 3:
			this._ceOnClick = ceId;
	}
};

APS_Game_Picture.prototype.reset = function(easingType, duration) {
	this._target = "reset";
	this._targetOrigin = this._initialOrigin;
	this._targetX = this._initialX;
	this._targetY = this._initialY;
	this._targetScaleX = this._initialScaleX;
	this._targetScaleY = this._initialScaleY;
	this._targetAngle = this._initialAngle;
	this._targetRotationSpeed = this._initialRotationSpeed;
	this._targetOpacity = this._initialOpacity;
	this._targetTone = this._initialTone;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.transform = function(origin, x, y, scaleX, scaleY, angle, opacity, tone, easingType, duration) {
	this._target = "transform";
	this._targetOrigin = origin;
	this._targetX = x;
	this._targetY = y;
	this._targetScaleX = scaleX;
	this._targetScaleY = scaleY;
	this._targetAngle = angle;
	this._targetRotationSpeed = 0;
	this._targetOpacity = opacity;
	this._targetTone = tone;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.move = function(origin, x, y, easingType, duration) {
	this._target = "move";
	this._targetOrigin = origin;
	this._targetX = x;
	this._targetY = y;
	this._targetScaleX = this._scaleX;
	this._targetScaleY = this._scaleY;
	this._targetAngle = this._angle;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.scale = function(origin, scaleX, scaleY, easingType, duration) {
	this._target = "scale";
	this._targetOrigin = origin;
	this._targetX = this._x;
	this._targetY = this._y;
	this._targetScaleX = scaleX;
	this._targetScaleY = scaleY;
	this._targetAngle = this._angle;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.rotate = function(origin, angle, easingType, duration) {
	this._target = "rotate";
	this._targetOrigin = origin;
	this._targetX = this._x;
	this._targetY = this._y;
	this._targetScaleX = this._scaleX;
	this._targetScaleY = this._scaleY;
	this._targetAngle = angle;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.spin = function(origin, rotationSpeed, easingType, duration) {
	this._target = "spin";
	this._targetOrigin = origin;
	this._targetRotationSpeed = rotationSpeed;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.fade = function(opacity, easingType, duration) {
	this._target = "fade";
	this._targetOpacity = opacity;
	this._duration = duration;
	this._wholeDuration = duration;
	this._easingType = easingType;
	this._easingExponent = 2;
};

APS_Game_Picture.prototype.tint = function(tone, duration) {
	this._target = "tint";
	this._targetTone = tone;
	this._duration = duration;
};

APS_Game_Picture.prototype.startAnimation = function() {
	this._hasAnimation = true;
};

APS_Game_Picture.prototype.stopAnimation = function() {
	this._hasAnimation = false;
};

APS_Game_Picture.prototype.isAnimated = function() {
	return this.hasAnimation() && this.animationFrames() > 1 && this.animationDuration() > 0;
};

APS_Game_Picture.prototype.update = function() {
	if (this._duration > 0) {
		switch (this._target) {
			case "reset":
				this.updateMove();
				this.updateScale();
				this.updateRotation();
				this.updateSpinInit();
				this.updateFade();
				this.updateTint();
				break;
			case "transform":
				this.updateMove();
				this.updateScale();
				this.updateRotation();
				this.updateSpinInit();
				this.updateFade();
				this.updateTint();
				break;
			case "move":
				this.updateMove();
				break;
			case "scale":
				this.updateScale();
				break;
			case "rotate":
				this.updateRotation();
				break;
			case "spin":
				this.updateSpinInit();
				break;
			case "fade":
				this.updateFade();
				break;
			case "tint":
				this.updateTint();
				break;
		}
		this._duration--;
	}
	this.updateSpinRun();
	this.updateAnimation();
};

APS_Game_Picture.prototype.updateOrigin = function(width, height) {
	if (this._targetOrigin.x !== this._origin.x) {
		this._x += (this._targetOrigin.x - this._origin.x) * (Math.abs(this._scaleX) / 100) * width;
	}
	if (this._targetOrigin.y !== this._origin.y) {
		this._y += (this._targetOrigin.y - this._origin.y) * (Math.abs(this._scaleY) / 100) * height;
	}
	this._origin = this._targetOrigin;
};

APS_Game_Picture.prototype.updateMove = function() {
	this._x = this.applyEasing(this._x, this._targetX);
	this._y = this.applyEasing(this._y, this._targetY);
};

APS_Game_Picture.prototype.updateScale = function() {
	this._scaleX = this.applyEasing(this._scaleX, this._targetScaleX);
	this._scaleY = this.applyEasing(this._scaleY, this._targetScaleY);
};

APS_Game_Picture.prototype.updateRotation = function() {
	this._angle = Math.round(this.applyEasing(this._angle, this._targetAngle) * 100) / 100;
};

APS_Game_Picture.prototype.updateSpinInit = function() {
	this._rotationSpeed = Math.round(this.applyEasing(this._rotationSpeed, this._targetRotationSpeed) * 100) / 100;
};

APS_Game_Picture.prototype.updateSpinRun = function() {
	if (this._rotationSpeed !== 0) {
		this._angle += this._rotationSpeed / 2;
	}
};

APS_Game_Picture.prototype.updateFade = function() {
	this._opacity = this.applyEasing(this._opacity, this._targetOpacity);
};

APS_Game_Picture.prototype.updateTint = function() {
	const d = this._duration;
	for (let i = 0; i < 4; i++) {
		this._tone[i] = (this._tone[i] * (d - 1) + this._targetTone[i]) / d;
	}
};

APS_Game_Picture.prototype.updateAnimation = function() {
	this._frameWidth = Math.floor(this.width() / this.animationFrames());
	this._frameHeight = this.height();	
	if (this.isAnimated()) {
		if (this._frameCount <= 0) {
			this._frameX = this._frameIndex * this._frameWidth;
			this._frameY = 0;
			this._frameIndex++;
			if (this._frameIndex >= this.animationFrames()) {
				this._frameIndex = 0;
			}
			this._frameCount = Math.floor(this.animationDuration() / this.animationFrames());
		}
		this._frameCount--;
	} else {
		this._frameCount = 0;
	}
};

APS_Game_Picture.prototype.applyEasing = function(current, target) {
	const d = this._duration;
	const wd = this._wholeDuration;
	const lt = this.calcEasing((wd - d) / wd);
	const t = this.calcEasing((wd - d + 1) / wd);
	const start = (current - target * lt) / (1 - lt);
	return start + (target - start) * t;
};

APS_Game_Picture.prototype.calcEasing = function(t) {
	const exponent = this._easingExponent;
	switch (this._easingType) {
		case 1: // Slow start
			return this.easeIn(t, exponent);
		case 2: // Slow end
			return this.easeOut(t, exponent);
		case 3: // Slow start and end
			return this.easeInOut(t, exponent);
		default:
			return t;
	}
};

APS_Game_Picture.prototype.easeIn = function(t, exponent) {
	return Math.pow(t, exponent);
};

APS_Game_Picture.prototype.easeOut = function(t, exponent) {
	return 1 - Math.pow(1 - t, exponent);
};

APS_Game_Picture.prototype.easeInOut = function(t, exponent) {
	if (t < 0.5) {
		return this.easeIn(t * 2, exponent) / 2;
	} else {
		return this.easeOut(t * 2 - 1, exponent) / 2 + 0.5;
	}
};

//=============================================================================
//  00000    00000   0000000  0     0  0000000
// 0     0  0     0  0        00    0  0
// 0        0        0        0 0   0  0
//  00000   0        00000    0  0  0  00000
//       0  0        0        0   0 0  0
// 0     0  0     0  0        0    00  0
//  00000    00000   0000000  0     0  0000000
//=============================================================================

//=============================================================================
// Scene_Map
//=============================================================================

ODW.APS.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function() {
	return ODW.APS.Scene_Map_isAnyButtonPressed.call(this) || this._spriteset.apsIsAnySpritePressed();
};

//=============================================================================
//  00000   000000   000000   0000000  0000000  0000000
// 0     0  0     0  0     0     0        0     0
// 0        0     0  0     0     0        0     0
//  00000   000000   000000      0        0     00000
//       0  0        0   0       0        0     0
// 0     0  0        0    0      0        0     0
//  00000   0        0     0  0000000     0     0000000
//=============================================================================

//=============================================================================
// Sprite_Picture
//=============================================================================

ODW.APS.Sprite_Picture_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		Sprite_Clickable.prototype.update.call(this);
		this.updateBitmap();
		if (this.visible) {
			this.updateSize();
			this.updateFrame();
			this.updateOrigin();
			this.updatePosition();
			this.updateScale();
			this.updateTone();
			this.updateOther();
		}
	} else {
		ODW.APS.Sprite_Picture_update.call(this);
	}
};

ODW.APS.Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		const pictureName = picture.name();
		if (this._pictureName !== pictureName) {
			this._pictureName = pictureName;
			if (picture.isImage()) {
				this.apsLoadBitmapImage(picture.name());
			}
			if (picture.isText()) {
				this.apsLoadBitmapText(picture.name(), picture.fontName(), picture.fontSize(), picture.fontStyle(), picture.textColor(), picture.outlineColor(), picture.outlineWidth());
			}
			if (picture.isAnimation()) {
				this.apsLoadBitmapAnimation(picture.name());
			}
		}
		this.visible = true;
	} else {
		ODW.APS.Sprite_Picture_updateBitmap.call(this);
	}
};

ODW.APS.Sprite_Picture_updateSize = Sprite_Picture.prototype.updateSize;
Sprite_Picture.prototype.updateSize = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		picture.setWidth(this.bitmap.width);
		picture.setHeight(this.bitmap.height);
	} else {
		ODW.APS.Sprite_Picture_updateSize.call(this)
	}
};

ODW.APS.Sprite_Picture_updateFrame = Sprite_Picture.prototype.updateFrame;
Sprite_Picture.prototype.updateFrame = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		if (picture.isAnimation()) {
			this.setFrame(picture.frameX(), picture.frameY(), picture.frameWidth(), picture.frameHeight());
		}
	} else {
		ODW.APS.Sprite_Picture_updateFrame.call(this)
	}
};

ODW.APS.Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
Sprite_Picture.prototype.updateOrigin = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		picture.updateOrigin(this.width, this.height);
		this.anchor.x = picture.origin().x;
		this.anchor.y = picture.origin().y;
	} else {
		ODW.APS.Sprite_Picture_updateOrigin.call(this);
	}
};

ODW.APS.Sprite_Picture_isClickEnabled = Sprite_Picture.prototype.isClickEnabled;
Sprite_Picture.prototype.isClickEnabled = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		return picture.ceOnClick() && !$gameMessage.isBusy();
	} else {
		return ODW.APS.Sprite_Picture_isClickEnabled.call(this);
	}
};

ODW.APS.Sprite_Picture_onMouseEnter = Sprite_Picture.prototype.onMouseEnter;
Sprite_Picture.prototype.onMouseEnter = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		const pictureId = picture.id();
		const commonEvent = picture.ceOnMouseEnter();
		const variableId = ODW.APS.variableId();
		if (commonEvent > 0) {
			$gameTemp.reserveCommonEvent(commonEvent);
			if (variableId > 0) {
				$gameVariables.setValue(variableId, pictureId);
			}
		}
	} else {
		ODW.APS.Sprite_Picture_onMouseEnter.call(this);
	}
};

ODW.APS.Sprite_Picture_onMouseExit = Sprite_Picture.prototype.onMouseExit;
Sprite_Picture.prototype.onMouseExit = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		const pictureId = picture.id();
		const commonEvent = picture.ceOnMouseExit();
		const variableId = ODW.APS.variableId();
		if (commonEvent > 0) {
			$gameTemp.reserveCommonEvent(commonEvent);
			if (variableId > 0) {
				$gameVariables.setValue(variableId, pictureId);
			}
		}
	} else {
		ODW.APS.Sprite_Picture_onMouseExit.call(this);
	}
};

ODW.APS.Sprite_Picture_onPress = Sprite_Picture.prototype.onPress;
Sprite_Picture.prototype.onPress = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		const pictureId = picture.id();
		const commonEvent = picture.ceOnPress();
		const variableId = ODW.APS.variableId();
		if (commonEvent > 0) {
			$gameTemp.reserveCommonEvent(commonEvent);
			if (variableId > 0) {
				$gameVariables.setValue(variableId, pictureId);
			}
		}
	} else {
		ODW.APS.Sprite_Picture_onPress.call(this);
	}
};

ODW.APS.Sprite_Picture_onClick = Sprite_Picture.prototype.onClick;
Sprite_Picture.prototype.onClick = function() {
	const picture = this.picture();
	if (picture && picture instanceof APS_Game_Picture) {
		const pictureId = picture.id();
		const commonEvent = picture.ceOnClick();
		const variableId = ODW.APS.variableId();
		if (commonEvent > 0) {
			$gameTemp.reserveCommonEvent(commonEvent);
			if (variableId > 0) {
				$gameVariables.setValue(variableId, pictureId);
			}
		}
	} else {
		ODW.APS.Sprite_Picture_onClick.call(this);
	}
};

// New function.
Sprite_Picture.prototype.apsLoadBitmapImage = function(name) {
	this.bitmap = ImageManager.loadPicture(name);
};

// New function.
Sprite_Picture.prototype.apsLoadBitmapText = function(name, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth) {
	const tempWindow = new APS_Window_Picture(name, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth);
	this.bitmap = tempWindow.contents;
	tempWindow.destroy();
};

// New function.
Sprite_Picture.prototype.apsLoadBitmapAnimation = function(name) {
	this.bitmap = ImageManager.loadPicture(name);
};

//=============================================================================
// Spriteset_Base
//=============================================================================

// New function.
Spriteset_Base.prototype.apsIsAnySpritePressed = function() {
	return this._pictureContainer.children.some(sprite => sprite.isPressed());
};

//=============================================================================
// 0     0  0000000  0     0  000000    00000   0     0
// 0     0     0     00    0  0     0  0     0  0     0
// 0     0     0     0 0   0  0     0  0     0  0     0
// 0  0  0     0     0  0  0  0     0  0     0  0  0  0
// 0  0  0     0     0   0 0  0     0  0     0  0  0  0
// 0  0  0     0     0    00  0     0  0     0  0  0  0
//  00000   0000000  0     0  000000    00000    00000
//=============================================================================

//=============================================================================
// APS_Window_Picture
//=============================================================================

function APS_Window_Picture() {
	this.initialize(...arguments);
};

APS_Window_Picture.prototype = Object.create(Window_Base.prototype);
APS_Window_Picture.prototype.constructor = APS_Window_Picture;

APS_Window_Picture.prototype.initialize = function(name, fontName, fontSize, fontStyle, textColor, outlineColor, outlineWidth) {
	Window_Base.prototype.initialize.call(this, new Rectangle());
	this.padding = 0;
	this._name = name;
	this._fontName = fontName;
	this._fontSize = fontSize;
	this._fontStyle = fontStyle;
	this._textColor = textColor;
	this._outlineColor = outlineColor;
	this._outlineWidth = outlineWidth;
	this.refresh();
};

APS_Window_Picture.prototype.refresh = function() {
	const size = this.textSizeEx(this._name);
	this.move(0, 0, size.width, size.height);
	this.createContents();
	this.drawTextEx(this._name, 0, 0, 0);
};

APS_Window_Picture.prototype.destroy = function() {
	this.contents = null;
	Window_Base.prototype.destroy.call(this);
};

APS_Window_Picture.prototype.resetFontSettings = function() {
	this.contents.fontFace = this._fontName;
	this.contents.fontSize = this._fontSize;
	this.contents.fontItalic = ODW.isFontStyleItalic(this._fontStyle);
	this.contents.fontBold = ODW.isFontStyleBold(this._fontStyle);
	this.contents.textColor = this._textColor;
	this.contents.outlineWidth = this._outlineWidth;
	this.contents.outlineColor = this._outlineColor;
};
