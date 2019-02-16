import showApollo from './controllers/apollo';
import { handleCookies } from './middleware/cookies';
import { handleLanguage } from './middleware/language';

export default (app) => {
  app.route('/:language/apollo').get(handleLanguage, handleCookies, showApollo);
  app.route('/:language/apollo/*').get(handleLanguage, handleCookies, showApollo);
};