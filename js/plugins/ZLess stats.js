/*:
 * @target MZ
 * @plugindesc Change params shown on status/equip scenes.
 * @author Caethyril
 * @url https://steamcommunity.com/app/1096900/discussions/0/3875966763776176985/
 * @help Free to use and/or modify for any project, no credit required.
 */
;void (() => {
'use strict';

  /** Param IDs to show, 0~7: MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK. */
  const PARAM_IDS = [4, 5, 6, 7];

  // Override - change maximum number of params shown.
  Window_StatusParams.prototype.maxItems = function() {
    return PARAM_IDS.length;
  };

  // Override - remap index to new param ID list.
  Window_StatusParams.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const id   = PARAM_IDS[index];
    const name = TextManager.param(id);
    const value = this._actor.param(id);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, rect.x, rect.y, 160);
    this.resetTextColor();
    this.drawText(value, rect.x + 160, rect.y, 60, "right");
  };

  // Override - only draw selected param IDs.
  Window_EquipStatus.prototype.drawAllParams = function() {
    for (let n = PARAM_IDS.length; n--;) {
      const x = this.itemPadding();
      const y = this.paramY(n);
      this.drawItem(x, y, PARAM_IDS[n]);
    }
  };

})();