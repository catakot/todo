import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TripActions from 'appRedux/actions/trip';

import TripListItem from './tripListItem';
import 'styles/tripsList.css';
import 'styles/react-toggle.css';


class TripsListComponent extends Component {
  static propTypes = {
    tripsCollection: PropTypes.array
  };

  constructor(props) {
    super(props);

  }

  componentDidMount = () => {
    if (!this.props.tripsIsLoaded) {
      let { dispatch } = this.props;
      dispatch(TripActions.loadTrips());
    }
  }

  onRemoveItem = (id) => {
    let { dispatch } = this.props;
    dispatch(TripActions.removeTripById(id));
  }

  onSaveChanged = (attrs) => {
    let { dispatch } = this.props;
    dispatch(TripActions.updateTripAttrs(attrs));
  }

  renderTripsList = () => {
    return (<div className="d-flex p-3 tripsList__container">
      <div>
        <ul className="list-group">
          {this.props.tripsCollection.map((trip, i) =>
            <TripListItem key={trip.attributes.id} attrs={trip.attributes} tripid={trip.attributes.id}
              onSave={this.onSaveChanged} onRemove={this.onRemoveItem}>
            </TripListItem>
          )}
        </ul>
      </div>
    </div>);
  }

  render() {
    return this.props.tripsCollection.length > 0 ? this.renderTripsList() : '';
  }
}


export default connect(
  state => {
    return {
      tripsCollection: state.trips.tripsCollection,
      tripsIsLoaded: state.trips.isLoaded
    };
  }
)(TripsListComponent);

