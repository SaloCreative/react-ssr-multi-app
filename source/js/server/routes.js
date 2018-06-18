import showApollo from './controllers/apollo';
import showRedux from './controllers/redux';
import { handleCookies } from './middleware/cookies';

export default (app) => {
  app.route('/redux').get(handleCookies, showRedux);
  app.route('/redux/*').get(handleCookies, showRedux);
  app.route('/apollo').get(handleCookies, showApollo);
  app.route('/apollo/*').get(handleCookies, showApollo);
};