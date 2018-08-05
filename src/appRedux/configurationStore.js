import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import mapReducer from './reducers/mapReducer';
import tripsReducer from './reducers/tripsReducer';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch (err) {
    console.log('There is a problem during attempt to save state to local storage.');
  }
};

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    map: mapReducer,
    trips: tripsReducer
  });

  let devtools = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;
  let store = applyMiddleware(thunk)(devtools(createStore))(rootReducer, initialState);

  store.subscribe(() => {
    saveState({ trips: store.getState().trips.tripsCollection });
  });
  return store;
}