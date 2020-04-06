export default function ignoreFavicon(request, response, next) {
  if (
    request.originalUrl &&
    request.originalUrl.split('/').pop() === 'favicon.ico'
  ) {
    return response.sendStatus(204);
  }

  return next();
}
