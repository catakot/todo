import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TripActions from 'appRedux/actions/trip';

import TripListItem from './tripListItem';
import 'styles/tripsList.css';


class TripsListComponent extends Component {
  static propTypes = {
    tripsCollection: PropTypes.array
  };

  constructor(props) {
    super(props);

  }


  render() {
    let style = {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#ffffff87',
      zIndex: '1',
      padding: '10px',
      bottom: 40,
      overflow: 'auto',
    };
    return (
      <div style={style}>
        <ul class="list-group">
          {this.props.tripsCollection.map((trip, i) =>
            <TripListItem key={i} attrs={trip.attributes} onValueChanged={() => { }}></TripListItem>
          )}
        </ul>
      </div>
    );
  }
}


export default connect(
  state => {
    return {
      tripsCollection: state.trips.tripsCollection
    };
  }
)(TripsListComponent);

