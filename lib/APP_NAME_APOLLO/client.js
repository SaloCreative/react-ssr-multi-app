import buildClient from '../../client/buildApolloClient';
import apollo from './config/apollo';
import AppConfig from './config';
import Client from './routes/app/client';

// Render app
buildClient(AppConfig.name, apollo, Client);

if (module.hot) {
  module.hot.accept('./routes/app/client', buildClient(AppConfig.name, store, Client));
}