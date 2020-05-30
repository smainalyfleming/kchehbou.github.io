L.Mixin.Selectable = {
 includes: L.Mixin.Events,
 setSelected: function(s) {
  var selected = !!s;
  if (this._selected !== selected) {
   this._selected = selected;
   this.fire("selected")
  }
 },
 isSelected: function() {
  return !!this._selected
 }
};
L.Mixin.Selection = {
 includes: L.Mixin.Events,
 getSelection: function() {
  return this._selected
 },
 setSelection: function(item) {
  if (this._selected === item) {
   if (item !== null) {
    item.setSelected(!item.isSelected());
    if (!item.isSelected()) this._selected = null
   }
  } else {
   if (this._selected) this._selected.setSelected(false);
   this._selected = item;
   if (this._selected) this._selected.setSelected(true)
  }
  this.fire("selection_changed")
 }
};
L.Control.LayersLegend = L.Control.Layers.extend({
 _onInputClick: function() {
  var inputs = this._layerControlInputs,
   input, layer;
  var addedLayers = [],
   removedLayers = [];
  this._handlingClick = true;
  for (var i = inputs.length - 1; i >= 0; i--) {
   input = inputs[i];
   layer = this._getLayer(input.layerId).layer;
   if (input.checked) this._map.fireEvent("legend_selected", {
    layer: layer,
    input: input
   }, true)
  }
  this._handlingClick = false;
  this._refocusOnMap()
 }
});
L.control.layersLegend = function(baseLayers, overlays, options) {
 return new L.Control.LayersLegend(baseLayers, overlays, options)
};
L.GPX.include(L.Mixin.Selectable);
