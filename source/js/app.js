import express from 'express';
import i18nMiddleware from 'i18next-express-middleware';
import 'babel-polyfill';

import createi18nServerInstance from './server/i18n.server'; // initialised i18next instances
import routes from './server/routes';

// Load SCSS
import '../scss/app.scss';

import { ENV } from './helpers';

const app = express();
const hostname = '0.0.0.0';
let port = 8080;
if (ENV === 'production' || ENV === 'staging') {
  port = 80;
}

app.use('/client', express.static('build/client'));
app.use(i18nMiddleware.handle(createi18nServerInstance()));
app.disable('x-powered-by');

routes(app);

// Handle the 404
app.use((req, res) => {
  res.status(404).send({ code: 404, status: 'fail', message: 'The requested resource not found' });
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});