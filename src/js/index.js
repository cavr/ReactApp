import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import 'isomorphic-fetch';
import logger from 'dev/logger';

import rootReducer from 'reducers';
import Routes from 'routes';

// Load SCSS
import '../scss/app.scss';

// Load polyfills
require('smoothscroll-polyfill').polyfill();
require('es6-promise').polyfill();

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk);

  store = createStore(
    rootReducer,
    middleware
  );
} else {
  // In development mode beside thunk
  // logger and DevTools are added
  const middleware = applyMiddleware(thunk, logger);
  let enhancer;

  // Enable DevTools if browser extension is installed
  if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
    enhancer = compose(
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
    );
  } else {
    enhancer = compose(middleware);
  }

  store = createStore(
    rootReducer,
    enhancer
  );
}

const history = syncHistoryWithStore(browserHistory, store);

// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
    <Routes history={ history } />
  </Provider>,
  document.getElementById('root')
);
