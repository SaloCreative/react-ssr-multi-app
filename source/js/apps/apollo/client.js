import buildClient from '../../client/buildClient';
import { apollo } from '../../apollo';

import AppConfig from './config';
import Client from './routes/app/client';

// Render app
buildClient({
  appName: AppConfig.name,
  Client,
  apollo: apollo(AppConfig.GraphQLUrl)
});