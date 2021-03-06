import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TripActions from 'appRedux/actions/trip';

import EsriMapView from 'esri/views/SceneView';
import ScaleBar from 'esri/widgets/ScaleBar';

import 'styles/map.css';

class MapComponent extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    center: PropTypes.object,
    zoom: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      esriMapView: null
    };
  }

  componentDidMount = () => {
    if (this.props.map) {
      this.createMapView();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center ||
      this.props.zoom !== prevProps.zoom) {
      this.state.esriMapView.goTo({
        target: this.props.center,
        zoom: this.props.zoom
      }, {
          easing: 'ease-in-out'
        });
    }
  }

  createMapView = () => {
    const esriMapView = new EsriMapView({
      container: this.refs.map,
      map: this.props.map,
      zoom: this.props.zoom,
      center: this.props.center
    });
    esriMapView.on("click", this.onMapClick);

    esriMapView.when((view) => {
      this.initMapComponents();
    });

    this.setState({ esriMapView: esriMapView });
  };

  initMapComponents = () => {
    let scaleBar = new ScaleBar({
      unit: 'metric',
      view: this.state.esriMapView
    });

    this.state.esriMapView.ui.add(scaleBar, 'bottom-right');
  }

  onMapClick = (e) => {
    let { dispatch } = this.props;
    dispatch(TripActions.appTrip(e.mapPoint, { x: e.x, y: e.y }));
  }

  render() {
    return (
      <div ref='map' className='map'>
      </div>
    );
  }
}


export default connect(
  state => {
    return {
      map: state.map.mapManager.map,
      zoom: state.map.zoom,
      center: state.map.center
    };
  }
)(MapComponent);

