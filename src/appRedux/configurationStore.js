import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import mapReducer from './reducers/mapReducer';
import tripsReducer from './reducers/tripsReducer';

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    map: mapReducer,
    trips: tripsReducer
  });

  let devtools = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;
  return applyMiddleware(thunk)(devtools(createStore))(rootReducer, initialState);
}