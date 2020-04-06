export default function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  response.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.locals.message = error.message;
  response.locals.stacktrace = error.stack;
  response.status(500).render('error');
}
