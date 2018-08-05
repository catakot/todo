

export const MAP_ADD_GRAPHIC = 'MAP_ADD_GRAPHIC';

export function addPinToMap(graphic) {
  return (dispatch, getState) => {
    const mapManeger = getState().map.mapManager;
    mapManeger.addGraphic(graphic);

    dispatch({
      type: MAP_ADD_GRAPHIC,
      graphic: graphic
    });  
  };
}