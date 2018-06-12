import { handleCookies } from './middleware/cookies';

export default (app) => {
  app.route('/dashboard').get(handleCookies, showDashboard);
  app.route('/dashboard/*').get(handleCookies, showDashboard);
};