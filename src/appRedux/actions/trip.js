import {v4} from 'node-uuid';
import EsriGraphic from "esri/Graphic";
import TripStatus from 'const/tripStatus';
import * as MapActions from 'appRedux/actions/map';

export const TRIP_CREATE = 'TRIP_CREATE';
export const TRIP_UPDATE = 'TRIP_UPDATE';
export const TRIP_REMOVE = 'TRIP_REMOVE';
export const TRIPS_LOADED = 'TRIPS_LOADED';

export function appTrip(mapPoint) {
  return (dispatch, getState) => {
    let id = getState().trips.tripsCollection.length;
    let attrs = {
      id: v4(),
      title: 'New place to visit',
      status: TripStatus.NEW
    };

    let tripGraphic = createTripGraphic(mapPoint, attrs);

    dispatch({
      type: TRIP_CREATE,
      trip: tripGraphic
    });

    dispatch(MapActions.addPinToMap(tripGraphic));
  };
}


export function updateTripAttrs(attrs) {
  return (dispatch, getState) => {

    let tripsCollection = getState().trips.tripsCollection;
    let tripToUpdate = tripsCollection.find(function (trip) {
      return trip.attributes.id == attrs.id;
    });

    let tripGraphic = createTripGraphic(tripToUpdate.geometry, attrs);

    dispatch(MapActions.removePinFromMap(tripToUpdate));
    dispatch(MapActions.addPinToMap(tripGraphic));
    dispatch({
      type: TRIP_UPDATE,
      trip: tripGraphic
    });
  };
}

export function removeTripById(id) {
  return (dispatch, getState) => {

    let tripsCollection = getState().trips.tripsCollection;
    let tripToRemove = tripsCollection.find(function (trip) {
      return trip.attributes.id == id;
    });

    dispatch(MapActions.removePinFromMap(tripToRemove));

    dispatch({
      type: TRIP_REMOVE,
      trip: tripToRemove
    });
  };
}

export function loadTrips() {
  return (dispatch, getState) => {

    let tripsFromStorage = loadState();
    let tripsCollection = tripsFromStorage ? tripsFromStorage.trips : [];
    tripsCollection = tripsCollection.map(item => EsriGraphic.fromJSON(item));

    
    dispatch({
      type: TRIPS_LOADED,
      trips: tripsCollection
    });

    
    dispatch(MapActions.addManyPinsToMap(tripsCollection));
  };
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    return undefined;
  }
};



const createTripGraphic = (mapPoint, attrs) => {
  let geom = mapPoint.clone();
  geom.z = undefined;
  return new EsriGraphic({
    geometry: geom,
    symbol: getSymbolByTripStatus(attrs.status),
    attributes: attrs
  });
};

const getSymbolByTripStatus = (status) => {
  switch (status) {
    case TripStatus.COMPLETED:
      return {
        type: "simple-marker",
        color: [0, 255, 0, 1]
      };
    default:
      return {
        type: "simple-marker",
        color: [255, 0, 0, 1]
      };
  }
};