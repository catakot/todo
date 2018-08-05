

export const MAP_ADD_GRAPHIC = 'MAP_ADD_GRAPHIC';
export const MAP_REMOVE_GRAPHIC = 'MAP_REMOVE_GRAPHIC';
export const MAP_ADD_MANY_GRAPHICS = "MAP_ADD_MANY_GRAPHICS";

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

export function removePinFromMap(graphic) {
  return (dispatch, getState) => {
    const mapManeger = getState().map.mapManager;
    mapManeger.removeGraphic(graphic);

    dispatch({
      type: MAP_REMOVE_GRAPHIC,
      graphic: graphic
    });
  };
}

export function addManyPinsToMap(graphics) {
  return (dispatch, getState) => {
    const mapManeger = getState().map.mapManager;
    mapManeger.addManyGraphics(graphics);

    dispatch({
      type: MAP_ADD_MANY_GRAPHICS,
      graphics: graphics
    });
  };
}