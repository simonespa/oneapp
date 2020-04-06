import express from 'express';
import exphbs from 'express-handlebars';
import Asset from './helpers/asset';
import ignoreFavicon from './middlewares/ignore-favicon';
import home from './middlewares/home';
import error from './middlewares/error';

const app = express();

Asset.init(`${process.cwd()}/assets/assets-manifest.json`);

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    helpers: {
      assets: Asset.assets
    }
  })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');
app.locals.layout = false;

if (process.env.NODE_ENV === 'production') {
  app.locals.production = true;
}

app.use('/assets', express.static('assets'));

app.use(ignoreFavicon);
app.get('*', home);
app.use(error);

process.on('uncaughtException', (error) => {
  console.log(error);
});

export default app;
