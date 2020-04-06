import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

export function configureAppStore(preloadedState = {}) {
  let composeEnhancers;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = composeWithDevTools(applyMiddleware(thunk));
  } else {
    composeEnhancers = applyMiddleware(thunk);
  }

  return createStore(reducer, preloadedState, composeEnhancers);
}
