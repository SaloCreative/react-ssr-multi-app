import showDashboard from './controllers/dashboard';

export default (app) => {
  app.route('/dashboard').get(showDashboard);
  app.route('/dashboard/*').get(showDashboard);
};