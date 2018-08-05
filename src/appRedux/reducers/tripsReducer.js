import * as TripActions from 'appRedux/actions/trip';


const initialState = {
  tripsCollection: [],
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TripActions.TRIP_CREATE: {
      let tripsCollection = addItemInReversOrder(state.tripsCollection, action.trip);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIP_REMOVE: {
      let tripsCollection = state.tripsCollection.filter(x => x.attributes.id != action.trip.attributes.id);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIP_UPDATE: {
      let tripsCollection = addItemInReversOrder(state.tripsCollection, action.trip);
      return Object.assign({}, state, { tripsCollection: tripsCollection });
    }
    case TripActions.TRIPS_LOADED: {
      return Object.assign({}, state, { tripsCollection: action.trips, isLoaded: true });
    }
    default:
      return state;
  }
}

const addItemInReversOrder = (sourceCollection, itemToInsert) => {
  let resultCollection = [];
  let added = false;
  sourceCollection.forEach(item => {
    if (item.attributes.id == itemToInsert.attributes.id) {
      return;
    }
    if (item.attributes.title > itemToInsert.attributes.title || added) {
      resultCollection.push(item);
    } else {
      resultCollection.push(itemToInsert);
      resultCollection.push(item);
      added = true;
    }
  });
  if (!added) {
    resultCollection.push(itemToInsert);
  }
  return resultCollection;
};

