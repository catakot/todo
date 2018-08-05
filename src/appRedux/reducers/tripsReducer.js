import * as TripActions from 'appRedux/actions/trip';


const initialState = {
  tripsCollection: []
};



export default function (state = initialState, action) {
  switch (action.type) {
    case TripActions.TRIPS_CREATE:
      let tripsCollection = state.tripsCollection.slice();
      tripsCollection.push(action.trip);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    default:
      return state;
  }
}

