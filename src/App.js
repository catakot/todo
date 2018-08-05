import React, { Component } from 'react';
import EsriMapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import OpenStreetMapLayer from 'esri/layers/OpenStreetMapLayer';

class App extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.divStyle = {
      color: 'blue'
    };
    this.mapStyle = {
      width: '100%',
      height: '500px'
    };
  }



  componentDidMount = () => {
    let map = new EsriMap({
      //  basemap: 'osm',
      layers: [
        new OpenStreetMapLayer()
      ]
    });

    const esriMapView = new EsriMapView({
      container: this.mapRef.current,
      map: map
    });
  }


  render() {


    return (
      <div>
        Hello world
           <div ref={this.mapRef} style={this.mapStyle}></div>
      </div>
    );
  }
}

export default App;
