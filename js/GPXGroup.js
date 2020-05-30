
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
