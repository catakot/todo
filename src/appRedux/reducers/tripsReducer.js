import * as TripActions from 'appRedux/actions/trip';


const initialState = {
  tripsCollection: [],
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TripActions.TRIP_CREATE: {
      let tripsCollection = state.tripsCollection.slice();
      tripsCollection.push(action.trip);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIP_REMOVE: {
      let tripsCollection = state.tripsCollection.filter(x => x.attributes.id != action.trip.attributes.id);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIP_UPDATE: {
      let tripsCollection = state.tripsCollection.map(item => {
        if (item.attributes.id == action.trip.attributes.id) {
          return action.trip;
        }
        return item;
      });
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIPS_LOADED: {
      return Object.assign({}, state, { tripsCollection: action.trips, isLoaded: true });
    }
    default:
      return state;
  }
}

