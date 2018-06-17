import { handleCookies } from './middleware/cookies';
import showRedux from './controllers/redux';

export default (app) => {
  app.route('/redux').get(handleCookies, showRedux);
  app.route('/redux/*').get(handleCookies, showRedux);
};