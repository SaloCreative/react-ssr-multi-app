import showRedux from './controllers/redux';

export default (app) => {
  app.route('/redux').get(showRedux);
  app.route('/redux/*').get(showRedux);
};