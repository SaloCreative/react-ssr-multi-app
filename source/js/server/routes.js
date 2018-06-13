import showDashboard from './controllers/dashboard';

export default (app) => {
  app.route('/:language/dashboard').get(showDashboard);
  app.route('/:language/dashboard/*').get(showDashboard);
};