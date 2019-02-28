import express from 'express';

import routes from './server/routes';
import FourOFour from '../assets/pages/404.html';

import { ENV } from './helpers';

const app = express();
const hostname = 'localhost';
let port = 8080;
if (ENV === 'production' || ENV === 'staging') {
  port = 80;
}

app.use('/client', express.static('build/client'));
app.disable('x-powered-by');

app.use((req, res, next) => {
  if (req.url === '/') {
    return res.redirect(301, '/en');
  }
  return next();
});

routes(app);

// Handle the 404
app.use((req, res) => {
  return res.status(404).send(FourOFour);
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});