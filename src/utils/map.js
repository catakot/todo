import EsriMap from 'esri/Map';
import TileLayer from 'esri/layers/TileLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import OpenStreetMapLayer from 'esri/layers/OpenStreetMapLayer';




class EsriMapManager {
  userGraphicLayer = null;

  constructor(config) {
    this.config = config;
    this._map = null;
  }

  createMap() {
    let layers = [];
    let basemap = '';

    this.config.layers.forEach(function (layer) {

      const { type, ...layerConfig } = layer;

      switch (type) {
        case 'basemap':
          basemap = layer.name;
          break;
        case 'tile':
          layers.push(new TileLayer(layerConfig));
          break;
        case 'mapImage':
          layers.push(new MapImageLayer(layerConfig));
          break;
        case 'feature':
          layers.push(new FeatureLayer(layerConfig));
          break;
        case 'osm':
          layers.push(new OpenStreetMapLayer(layerConfig));
          break;
      }
    }, this);

    // Add userGraphics layer
    this.userGraphicLayer = new GraphicsLayer({
      id: 'userGraphics',
      title: 'Объекты на карте'
    });

    layers.push(this.userGraphicLayer);

    return new EsriMap({
      basemap: basemap,
      layers: layers
    });
  }

  get map() {
    if (!this._map) {
      this._map = this.createMap();
    }
    return this._map;
  }

  set map(map) {
    this._map = map;
  }

  addGraphic(graphic) {
    this.userGraphicLayer.add(graphic);
  }

  removeGraphic(graphic) {
    this.userGraphicLayer.remove(graphic);
  }

  addManyGraphics(graphics) {
    this.userGraphicLayer.addMany(graphics);
  }
}

export default EsriMapManager;