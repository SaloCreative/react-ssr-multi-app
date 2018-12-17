import buildClient from '../../client/buildApolloClient';
import { apollo } from '../../apollo';
import AppConfig from './config';
import Client from './routes/app/client';

// Render app
buildClient({
  appName: AppConfig.name,
  Client,
  apollo: apollo(AppConfig.GraphQLUrl)
});

if (module.hot) {
  module.hot.accept('./routes/app/client', buildClient({
    appName: AppConfig.name,
    Client,
    apollo: apollo(AppConfig.GraphQLUrl)
  }));
}