import React from 'react';
import { renderToString } from 'react-dom/server';
import OneApp from '../component/OneApp';

// eslint-disable-next-line no-unused-vars
export default function home(request, response, next) {
  response.locals.reactBody = renderToString(<OneApp />);
  response.set('Cache-Control', 'private no-cache must-revalidate');
  response.status(200).render('home');
}
