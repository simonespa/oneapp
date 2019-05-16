import express from 'express';
import exphbs from 'express-handlebars';
import Asset from './helper/asset';
import home from './middleware/home';

const app = express();

app.disable('x-powered-by');

Asset.setManifestPath(`${process.cwd()}/assets/manifest.json`);

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    helpers: {
      asset: Asset.assetHelper
    }
  })
);
app.set('view engine', 'hbs');
app.set('views', 'src/view');
app.locals.layout = false;

app.use('/assets', express.static('assets'));

app.get('*', home);

export default app;
