import EsriGraphic from "esri/Graphic";
import TripStatus from 'const/tripStatus';
import * as MapActions from 'appRedux/actions/map';

export const TRIPS_CREATE = 'TRIPS_CREATE';

export function appTrip(mapPoint) {
  return (dispatch, getState) => {
    let id = getState().trips.tripsCollection.length;
    let attrs = {
      id: id,
      title: 'New place to visit',
      status: TripStatus.NEW
    };

    var tripGraphic = createTripGraphic(mapPoint, attrs);

    dispatch({
      type: TRIPS_CREATE,
      trip: tripGraphic
    });

    dispatch(MapActions.addPinToMap(tripGraphic));
  };
}

function createTripGraphic(mapPoint, attrs) {
  let geom = mapPoint.clone();
  geom.z = undefined;
  return new EsriGraphic({
    geometry: geom,
    symbol: getSymbolByTripStatus(attrs.status),
    attributes: attrs
  });
}

function getSymbolByTripStatus(status) {
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
}