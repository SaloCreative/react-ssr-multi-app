import buildClient from '../../helpers/buildClient';
import store from './config/store';
import AppConfig from './config';
import Client from './routes/app/Client';

// Render app
buildClient(AppConfig.name, store, Client);

if (module.hot) {
  module.hot.accept('./routes/app/client', buildClient(AppConfig.name, store, Client));
}