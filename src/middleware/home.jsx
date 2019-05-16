// eslint-disable-next-line no-unused-vars
export default function home(request, response, next) {
  response.set('Cache-Control', 'private no-cache must-revalidate');
  response.status(200).render('home');
}
