import * as MapActions from 'appRedux/actions/map';
import Map from 'utils/map';
import { mapConfig } from 'config/config';


const initialState = {
    zoom: mapConfig.mapViewOptions.zoom,
    center: mapConfig.mapViewOptions.center,
    mapManager: new Map(mapConfig)
};



export default function (state = initialState, action) {
    switch (action.type) {
        case MapActions.MAP_ZOOM_TO: {
            let mapPosition = {
                zoom: 9,
                center: action.target.geometry
            };
            return { ...{}, ...state, ...mapPosition };
        }
        default:
            return state;
    }
}

