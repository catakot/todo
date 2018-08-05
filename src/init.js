import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from 'appRedux/configurationStore';

import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

export const mapApp = {
  render: () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }
};

registerServiceWorker();
