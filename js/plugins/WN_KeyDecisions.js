//================================================================
// WN_KeyDecisions.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2024 wnascimento
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var WN = WN || {}; // Namespace
WN.KDS = WN.KDS || {};
WN.KDS.version = '1.2.0';

/*:
 * @target MZ
 * @plugindesc (v1.2.0) Transforms the choices window into a key decision window.
 * @author wnascimento
 * @url https://wnascimento.itch.io/
 *
 * @help
 * Note: This plugin edits the choices window and does not create a new one.
 * 
 * =============================================================================
 * How to use:
 * =============================================================================
 *  1. Create an Event
 *  2. Add a Plugin Command in this Event.
 *  3. Select the plugin "WN_KeyDecisions" and the command "Set Key Decision".
 *  4. Modify the arguments as you wish and when done, click OK.
 *  5. IMPORTANT: In the same event flow, CREATE CHOICES RIGHT AFTER THE PLUGIN COMMAND!
 *  6. Done!
 * 
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2024-12-25 (v1.2.0) - Edit: "Complete Fullscreen" argument is now the parameter "Borderless".
 *                       Add: Parameter to set the style of the key decision window.
 *                       Fix: Update draw texts and pictures now only when necessary.
 *                       Fix: Clearer and organized arguments.
 * 2024-10-18 (v1.1.2) - Add: Arguments, description and help now also in Portuguese.
 *                       Fix: Cleaning and improving the code structure.
 * 2024-10-10 (v1.1.1) - Add: Adjustments x and y for the position of the text and images.
 *                       Add: Option to display images in choices.
 * 2024-10-01 (v1.0.0) - First version.
 *
 * =============================================================================
 * Free for commercial and non commercial use.
 * Please, give credit to "wnascimento" if you use this plugin.
 * 
 * For more plugins and information, visit:
 * https://wnascimento.itch.io/
 * 
 * 
 * @param description
 * @text << Optional Config. >>
 * @desc The settings below are optional and can be changed as needed.
 * 
 * @param windowSkinFileName
 * @text Window Skin File
 * @desc File name of the window skin to be used (located in the img/system folder).
 * @default Window
 * @parent description
 * 
 * @param isBorderless
 * @type boolean
 * @default false
 * @text Borderless
 * @desc If true (ON), the choices will occupy the entire screen WITHOUT borders (only the selection area).
 * @parent description
 * 
 * 
 * @command set
 * @text Set Key Decision
 * @desc Settings to transform the choice window to a key decision.
 * 
 * @arg isHorizontalList
 * @type boolean
 * @default true
 * @text Horizontal List
 * @desc If false (OFF), the choices will be displayed in a vertical list.
 * 
 * @arg isCursorVisible
 * @type boolean
 * @default true
 * @text Highlight Hover
 * @desc if true (ON), the area of the selected choice will be highlighted.
 * 
 * @arg blurAmount
 * @type number
 * @default 8
 * @min 0
 * @max 20
 * @text Blur Amount
 * @desc Defines the blur amount (default = 8).
 * 
 * @arg txtArgs
 * @type struct<TxtArgs>
 * @text Text Settings
 * @desc Settings for the text display.
 * @default {"show":"true","position":"center","size":"26","hoverSizeAdj":"1.50","offsetX":"0","offsetY":"0"}
 * 
 * @arg picArgs
 * @type struct<PicArgs>
 * @text Picture Settings
 * @desc Settings for the picture display.
 * @default {"show":"true","paths":"[]","scale":"1.00","hoverScaleAdj":"1.50","offsetX":"0","offsetY":"0"}
*/
/*~struct~TxtArgs:
 * @param show
 * @type boolean
 * @default true
 * @text Show Text
 * @desc If true (ON), the choices will be displayed as text.
 * 
 * @param position
 * @type select
 * @option top
 * @option center
 * @option bottom
 * @option left
 * @option right
 * @default center
 * @text Position
 * @desc The position of the text inside the choice.
 * 
 * @param size
 * @type number
 * @default 26
 * @text Size
 * @desc Sets the font size (default = 26).
 * 
 * @param hoverSizeAdj
 * @type number
 * @decimals 2
 * @default 1.50
 * @min 0.01
 * @text Hover Size
 * @desc Sets the font size adjustment when hovering over a choice, with 2 being Size*2 (default = 1.50).
 *
 * @param offsetX
 * @type number
 * @default 0
 * @min -9999
 * @text Offset X
 * @desc Adds an offset to the x position. 0 is the original position (default = 0).
 * 
 * @param offsetY
 * @type number
 * @default 0
 * @min -9999
 * @text Offset Y
 * @desc Adds an offset to the y position. 0 is the original position (default = 0).
 * 
*/
/*~struct~PicArgs:
 * @param show
 * @type boolean
 * @default true
 * @text Show Pictures
 * @desc If true (ON), the choices will be displayed as pictures.
 * 
 * @param paths
 * @type file[]
 * @dir img
 * @default []
 * @text Picture List
 * @desc Sets the path of the pictures to be displayed as choices.
 * 
 * @param scale
 * @type number
 * @decimals 2
 * @default 1.00
 * @min 0
 * @text Scale
 * @desc Sets the scale of the pictures to be displayed as choices (default = 1).
 * 
 * @param hoverScaleAdj
 * @type number
 * @decimals 2
 * @default 1.50
 * @min 0.01
 * @text Hover Scale
 * @desc Sets the scale adjustment of the pictures when hovering over a choice, with 2 being Scale*2 (default = 1.50).
 *
 * @param offsetX
 * @type number
 * @default 0
 * @min -9999
 * @text Offset X
 * @desc Adds an offset to the x position. 0 is the original position (default = 0).
 * 
 * @param offsetY
 * @type number
 * @default 0
 * @min -9999
 * @text Offset Y
 * @desc Adds an offset to the y position. 0 is the original position (default = 0).
*/

/*:pt 
 * @target MZ
 * @plugindesc (v1.2.0) Transforma a janela de escolhas em uma janela de decisões-chave.
 * @autor wnascimento
 * @url https://wnascimento.itch.io/
 *
 * @help
 * Nota: Este plugin edita a janela de escolhas e não cria uma nova.
 * 
 * =============================================================================
 * Como usar:
 * =============================================================================
 *  1. Crie um Evento.
 *  2. Adicione um Comando de Plugin neste Evento.
 *  3. Selecione o plugin "WN_KeyDecisions" e o comando "Definir Decisão-Chave".
 *  4. Modifique os argumentos conforme desejar e, quando terminar, clique em OK.
 *  5. IMPORTANTE: No mesmo fluxo de evento, CRIE ESCOLHAS LOGO APÓS O COMANDO DE PLUGIN!
 *  6. Pronto!
 * 
 * =============================================================================
 * Registro de Alterações
 * =============================================================================
 * 2024-12-25 (v1.2.0) - Edit: Argumento "Tela Cheia Completa" agora é o parâmetro "Sem Bordas".
 *                       Add: Parâmetro para definir o estilo da janela de decisões-chave.
 *                       Fix: Atualizar textos e imagens agora apenas quando necessário.
 *                       Fix: Argumentos mais claros e organizados.
 * 2024-10-18 (v1.1.2) - Add: Argumentos, descrição e ajuda agora também em português.
 *                       Fix: Limpeza e melhoria na estrutura do código.
 * 2024-10-10 (v1.1.1) - Add: Ajustes de x e y para a posição do texto e imagens.
 *                       Add: Opção de exibir imagens nas escolhas.
 * 2024-10-01 (v1.0.0) - Primeira versão.
 *
 * =============================================================================
 * Livre para uso comercial e não comercial.
 * Por favor, dê crédito a "wnascimento" se usar este plugin.
 * 
 * Para mais plugins e informações, visite:
 * https://wnascimento.itch.io/
 * 
 * @param description
 * @text << Config. Opcionais >>
 * @desc As configurações abaixo são opcionais e podem ser alteradas conforme necessário.
 * 
 * @param windowSkinFileName
 * @text Arquivo de Estilo da Janela
 * @desc Nome do arquivo da estilo da janela a ser usada (localizado na pasta img/system).
 * @default Window
 * @parent description
 * 
 * @param isBorderless
 * @type boolean
 * @default false
 * @text Sem Bordas
 * @desc Se verdadeiro (ON), as escolhas ocuparão toda a tela SEM bordas (apenas a área de seleção).
 * @parent description
 * 
 * 
 * @command set
 * @text Definir Decisão-Chave
 * @desc Configurações para transformar a janela de escolhas em uma decisão-chave.
 * 
 * @arg isHorizontalList
 * @type boolean
 * @default true
 * @text Lista Horizontal
 * @desc Se falso (OFF), as escolhas serão exibidas em uma lista vertical.
 * 
 * @arg isCursorVisible
 * @type boolean
 * @default true
 * @text Destaque ao Selecionar 
 * @desc Se verdadeiro (ON), a área da escolha selecionada será destacada.
 * 
 * @arg blurAmount
 * @type number
 * @default 8
 * @min 0
 * @max 20
 * @text Nível de Desfoque
 * @desc Define a quantidade de desfoque (padrão = 8).
 * 
 * @arg txtArgs
 * @type struct<BRTxtArgs>
 * @text Configurações de Texto
 * @desc Configurações para a exibição do texto.
 * @default {"show":"true","position":"center","size":"26","hoverSizeAdj":"1.50","offsetX":"0","offsetY":"0"}
 * 
 * @arg picArgs
 * @type struct<BRPicArgs>
 * @text Configurações de Imagem
 * @desc Configurações para a exibição de imagens.
 * @default {"show":"true","paths":"[]","scale":"1.00","hoverScaleAdj":"1.50","offsetX":"0","offsetY":"0"}
*/
/*~struct~BRTxtArgs:
 * @param show
 * @type boolean
 * @default true
 * @text Exibir Texto
 * @desc Se verdadeiro (ON), as escolhas serão exibidas como texto.
 * 
 * @param position
 * @type select
 * @option top
 * @option center
 * @option bottom
 * @option left
 * @option right
 * @default center
 * @text Posição
 * @desc A posição do texto dentro da escolha.
 *  
 * @param size
 * @type number
 * @default 26
 * @text Tamanho
 * @desc Define o tamanho da fonte (padrão = 26).
 * 
 * @param hoverSizeAdj
 * @type number
 * @decimals 2
 * @default 1.50
 * @min 0.01
 * @text Tamanho ao Selecionar
 * @desc Define o ajuste de tamanho da fonte ao passar sobre uma escolha, com 2 sendo Tamanho*2 (padrão = 1.50).
 * 
 * @param offsetX
 * @type number
 * @default 0
 * @min -9999
 * @text Deslocamento X
 * @desc Adiciona um deslocamento à posição x. 0 é a posição original (padrão = 0).
 * 
 * @param offsetY
 * @type number
 * @default 0
 * @min -9999
 * @text Deslocamento Y
 * @desc Adiciona um deslocamento à posição y. 0 é a posição original (padrão = 0).
*/
/*~struct~BRPicArgs:
 * @param show
 * @type boolean
 * @default true
 * @text Exibir Imagens
 * @desc Se verdadeiro (ON), as escolhas serão exibidas como imagens.
 * 
 * @param paths
 * @type file[]
 * @dir img
 * @default []
 * @text Lista de Imagens
 * @desc Define o caminho das imagens a serem exibidas como escolhas.
 * 
 * @param scale
 * @type number
 * @decimals 2
 * @default 1.00
 * @min 0
 * @text Escala
 * @desc Define a escala das imagens a serem exibidas como escolhas (padrão = 1).
 * 
 * @param hoverScaleAdj
 * @type number
 * @decimals 2
 * @default 1.50
 * @min 0.01
 * @text Escala ao Selecionar 
 * @desc Define o ajuste de escala das imagens ao passar sobre uma escolha, com 2 sendo Escala*2 (padrão = 1.50).
 * 
 * @param offsetX
 * @type number
 * @default 0
 * @min -9999
 * @text Deslocamento X
 * @desc Adiciona um deslocamento à posição x. 0 é a posição original (padrão = 0).
 * 
 * @param offsetY
 * @type number
 * @default 0
 * @min -9999
 * @text Deslocamento Y
 * @desc Adiciona um deslocamento à posição y. 0 é a posição original (padrão = 0).
 * 
*/

WN.KDS = function () {
  'use strict';

  const pluginName = 'WN_KeyDecisions';
  const pictureCache = {}; // Cache of images to optimize performance
  let lastIndex = -1; // Last index of the choice (to refresh the window only when necessary)
  let KDS_cfg = {}; // Configurations

  // Get the plugin parameter
  try {
    const parameters = PluginManager.parameters(pluginName);
    KDS_cfg.windowSkinFileName = String(parameters.windowSkinFileName) || 'Window';
    KDS_cfg.isBorderless = parameters.isBorderless === 'true';
  }
  catch (e) {
    console.error('WN_KeyDecisions: File not found. Check if the file exists in the img/system folder.');
    KDS_cfg.windowSkinFileName = 'Window';
  }

  // Register the plugin command to set the key decision settings
  PluginManager.registerCommand(pluginName, 'set', args => {
    try {
      KDS_cfg.isHorizontalList = args.isHorizontalList === 'true';
      KDS_cfg.isCursorVisible = args.isCursorVisible === 'true';
      KDS_cfg.blurAmount = Number(args.blurAmount) || 8;

      KDS_cfg.txtArgs = convertSettings(JSON.parse(args.txtArgs || {}));
      KDS_cfg.picArgs = convertSettings(JSON.parse(args.picArgs || {}));

      // Convert the settings to the correct type
      function convertSettings(args) {
        if (!args) return {};
        args.show = args.show === 'true';
        args.offsetX = Number(args.offsetX) || 0;
        args.offsetY = Number(args.offsetY) || 0;

        if (args.size !== undefined) {
          args.size = Number(args.size) || 26;
          args.position = args.position || 'center';
          args.hoverSizeAdj = Number(args.hoverSizeAdj) || 1.5;
        } else {
          args.scale = Number(args.scale) || 1;
          args.paths = JSON.parse(args.paths) || [];
          args.hoverScaleAdj = Number(args.hoverScaleAdj) || 1.5;
        }
        return args;
      }
      KDS_cfg.activated = true;
    }
    catch (e) {
      console.error('WN_KeyDecisions: Error setting the key decision settings: ', e, '\nCheck the arguments and try again.');
      KDS_cfg.activated = false;
    }
  });


  //=============================================================================
  // Window_ChoiceList Functions
  //=============================================================================

  const _WN_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function () {
    _WN_Window_ChoiceList_initialize.call(this);
    this.firstUpdate = true;
  };

  // Get the maximum number of columns or lines depending on the type of list
  const _WN_Window_ChoiceList_maxCols = Window_ChoiceList.prototype.maxCols;
  Window_ChoiceList.prototype.maxCols = function () {
    if (KDS_cfg.activated && KDS_cfg.isHorizontalList)
      return this.maxItems();
    else
      return _WN_Window_ChoiceList_maxCols.call(this);
  };

  // Check if the list is horizontal or vertical
  const _WN_Window_ChoiceList_isHorizontal = Window_ChoiceList.prototype.isHorizontal;
  Window_ChoiceList.prototype.isHorizontal = function () {
    if (KDS_cfg.activated)
      return !!KDS_cfg.isHorizontalList;
    else
      return _WN_Window_ChoiceList_isHorizontal.call(this);
  };

  // Update the placement of the window 
  const _WN_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function () {
    if (KDS_cfg.activated)
      this.WN_setCompleteFullscreen();
    else
      _WN_Window_ChoiceList_updatePlacement.call(this);
  }

  // Calculate the rectangle of the choice
  const _WN_Window_ChoiceList_itemRect = Window_ChoiceList.prototype.itemRect;
  Window_ChoiceList.prototype.itemRect = function (index) {
    let rect = _WN_Window_ChoiceList_itemRect.call(this, index);
    let offset = KDS_cfg.isBorderless ? this.margin * 2 : -this.padding * 2;

    if (KDS_cfg.activated) {
      rect = this.WN_calculateRect(rect, index, offset, KDS_cfg.isHorizontalList);
    }
    return rect;
  };

  // Draw the choice and adjust the size
  const _WN_Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
  Window_ChoiceList.prototype.drawItem = function (index) {
    if (!KDS_cfg.activated) {
      _WN_Window_ChoiceList_drawItem.call(this, index);
    }
    else {
      const rect = this.itemRect(index);
      const isHovered = index === this.index();
      this.cursorVisible = KDS_cfg.isCursorVisible;

      if (KDS_cfg.picArgs.show) {
        this.WN_drawPicture(rect, index, isHovered);
      }
      if (KDS_cfg.txtArgs.show) {
        this.WN_drawText(rect, index, isHovered);
      }
    }
  }

  // Start the window and apply the blur filter if necessary
  const _WN_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function () {
    _WN_Window_ChoiceList_start.call(this);
    if (KDS_cfg.activated) {
      this.WN_loadCustomWindowskin();
      if (KDS_cfg.blurAmount > 0)
        this.WN_applyBlur();
    }
  };

  // Update the window and refresh the choices when the index changes
  const _WN_Window_ChoiceList_update = Window_ChoiceList.prototype.update;
  Window_ChoiceList.prototype.update = function () {
    _WN_Window_ChoiceList_update.call(this);

    if (KDS_cfg.activated && this.isOpen()) {
      if (this.firstUpdate) {
        this.refresh();
        this.firstUpdate = false;
      }

      if (lastIndex !== this.index()) {
        lastIndex = this.index();
        this.refresh();
      }
    }
  };

  // Remove the plugin settings when the window is closing
  const _WN_Window_ChoiceList_updateClose = Window_Base.prototype.updateClose;
  Window_ChoiceList.prototype.updateClose = function () {
    _WN_Window_ChoiceList_updateClose.call(this);

    if (KDS_cfg.activated && this.isClosed()) {
      if (KDS_cfg.blurFilter)
        this.WN_removeBlur();

      this.WN_removeCustomWindowskin();
      this.firstUpdate = true;
      KDS_cfg.activated = false;
    }
  };


  //=============================================================================
  // Additional Functions
  //=============================================================================


  // Calculate the rectangle of the choice 
  Window_ChoiceList.prototype.WN_calculateRect = function (rect, index, offset, isHorizontal) {
    let itemsNumber = this.maxItems() || 1;

    rect.width = (Graphics.boxWidth + offset) / (isHorizontal ? itemsNumber : 1);
    rect.height = (Graphics.boxHeight + offset) / (isHorizontal ? 1 : itemsNumber);
    rect.x = isHorizontal ? (index * rect.width) : 0;
    rect.y = isHorizontal ? 0 : (index * rect.height);

    return rect;
  };


  // Draw the picture of the choice and adjust the size
  Window_ChoiceList.prototype.WN_drawPicture = function (rect, index, isHovered) {
    const picPath = KDS_cfg.picArgs.paths[index];

    this.WN_savePicture(picPath);

    const pic = pictureCache[picPath];
    const width = pic.width * KDS_cfg.picArgs.scale;
    const height = pic.height * KDS_cfg.picArgs.scale;
    const x = rect.x + (rect.width - width) / 2 + KDS_cfg.picArgs.offsetX;
    const y = rect.y + (rect.height - height) / 2 + KDS_cfg.picArgs.offsetY;

    const adj = isHovered ? KDS_cfg.picArgs.hoverScaleAdj : 1;

    this.contents.blt(pic, 0, 0, pic.width, pic.height, x - width * (adj - 1) / 2, y - height * (adj - 1) / 2, width * adj, height * adj);
  }

  // Save the picture in the cache
  Window_ChoiceList.prototype.WN_savePicture = function (path) {
    if (!pictureCache[path]) {
      pictureCache[path] = ImageManager.loadBitmap('img/', path);
    }
  }

  // Draw the text of the choice and adjust the size
  Window_ChoiceList.prototype.WN_drawText = function (rect, index, isHovered) {
    // Set the font size and adjust the size when hovering
    this.contents.fontSize = Math.round(
      KDS_cfg.txtArgs.size * (isHovered ? KDS_cfg.txtArgs.hoverSizeAdj : 1)
    );

    let rect_y = rect.y;
    let rect_x = rect.x;

    // Change the text size and get the text height
    const text = `\\FS[${this.contents.fontSize}]${this.commandName(index)}`;
    const textWidth = this.textSizeEx(text).width;
    const textHeight = this.textSizeEx(text).height;
    const offsetX = KDS_cfg.txtArgs.offsetX;
    const offsetY = KDS_cfg.txtArgs.offsetY;

    switch (KDS_cfg.txtArgs.position) {
      case 'top':
        rect_x += (rect.width - textWidth) / 2;
        rect_y += this.padding * 2;
        break;
      case 'bottom':
        rect_x += (rect.width - textWidth) / 2;
        rect_y += rect.height - textHeight - this.padding * 2;
        break;
      case 'left':
        rect_x += this.padding * 2;
        rect_y += (rect.height - textHeight) / 2;
        break;
      case 'right':
        rect_x += rect.width - textWidth - this.padding * 2;
        rect_y += (rect.height - textHeight) / 2;
        break;
      default:
        rect_x += (rect.width - textWidth) / 2;
        rect_y += (rect.height - textHeight) / 2;
    }
    this.drawTextEx(text, rect_x + offsetX, rect_y + offsetY);
  }

  // Set the window to occupy the entire screen without margins
  Window_ChoiceList.prototype.WN_setCompleteFullscreen = function () {
    const offset = this.margin * 4;
    this.x = 0;
    this.y = 0;
    this.width = Graphics.boxWidth;
    this.height = Graphics.boxHeight;

    if (KDS_cfg.isBorderless && offset > 0) {
      this.x -= offset;
      this.y -= offset;
      this.width += offset * 2;
      this.height += offset * 2;
    }
  }

  // Apply the blur filter to the game layer
  Window_ChoiceList.prototype.WN_applyBlur = function () {
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = KDS_cfg.blurAmount;

    // Get the game layer and apply the blur filter
    const gameLayer = SceneManager._scene.children.find((layer) => layer instanceof Spriteset_Map || layer instanceof Spriteset_Battle);
    if (gameLayer) {
      gameLayer.filters = gameLayer.filters || [];
      gameLayer.filters.push(blurFilter);
      KDS_cfg.blurFilter = blurFilter;
    }
  }

  // Remove the blur filter from the game layer
  Window_ChoiceList.prototype.WN_removeBlur = function () {
    const gameLayer = SceneManager._scene.children.find((layer) => layer instanceof Spriteset_Map || layer instanceof Spriteset_Battle);

    // Remove the blur filter from the game layer
    if (gameLayer && gameLayer.filters) {
      gameLayer.filters = gameLayer.filters.filter(filter => filter !== KDS_cfg.blurFilter);
      KDS_cfg.blurFilter = null;
    }
  }

  // Load the custom window skin
  Window_ChoiceList.prototype.WN_loadCustomWindowskin = function () {
    this.windowskin = ImageManager.loadSystem(KDS_cfg.windowSkinFileName);
  };

  // Remove the custom window skin
  Window_ChoiceList.prototype.WN_removeCustomWindowskin = function () {
    this.loadWindowskin();
  }

  // End of the plugin

}

WN.KDS();