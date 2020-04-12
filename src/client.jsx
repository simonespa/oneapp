import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from './state';
import OneApp from './pages/OneApp';

// Gets the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;
// Builds the store
const store = configureAppStore(preloadedState); // Clientside Store Creation
// Allows the global variable to be garbage-collected
delete window.PRELOADED_STATE;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <OneApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-body'),
);
