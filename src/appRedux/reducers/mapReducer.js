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
        default:
            return state;
    }
}

