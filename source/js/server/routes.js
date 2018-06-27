import showApollo from './controllers/apollo';
import showRedux from './controllers/redux';
import { handleCookies } from './middleware/cookies';
import { handleLanguage } from './middleware/language';

export default (app) => {
  app.route('/:language/redux').get(handleLanguage, handleCookies, showRedux);
  app.route('/:language/redux/*').get(handleLanguage, handleCookies, showRedux);
  app.route('/:language/apollo').get(handleLanguage, handleCookies, showApollo);
  app.route('/:language/apollo/*').get(handleLanguage, handleCookies, showApollo);
};