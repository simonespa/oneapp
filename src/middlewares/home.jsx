import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { configureAppStore } from '../state';
import OneApp from '../pages/OneApp';
import pkg from '../../package.json';

export default async function home(request, response) {
  const context = {};

  // Create serverside store
  const store = configureAppStore({
    app: {
      name: pkg.name,
      version: pkg.version,
    },
  });

  response.locals.reactBody = renderToString(
    <Provider store={store}>
      <StaticRouter location={request.url} context={context}>
        <OneApp />
      </StaticRouter>
    </Provider>,
  );

  // https://redux.js.org/recipes/server-rendering#security-considerations
  response.locals.preloadedState = JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c',
  );

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    response.set('Cache-Control', 'public, max-age=86400');
    response.redirect(301, context.url);
  } else {
    // we're good, send the response
    response.status(200).render('home');
  }
}
