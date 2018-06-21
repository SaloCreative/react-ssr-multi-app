import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from '../../auth';
import { Consumer as LanguageConsumer } from '../../context/language';

// Route Component
export default function renderRoutes(props, routesConfig) {
  return (
    <Switch>
      <LanguageConsumer>
        { ({ language }) => {
          return routesConfig.map(route => {
            return (
              <AuthRoute
                language={ language }
                exact={ route.exact }
                key={ route.path }
                path={ route.path }
                componentProps={ props }
                title={ route.title }
                component={ route.component }
                authenticated={ route.authenticated }
                notAuthenticated={ route.notAuthenticated }
                permissions={ route.permissions ? route.permissions : [] }
                redirect={ route.redirect ? route.redirect : '/404' }
              />
            );
          });
        } }
      </LanguageConsumer>
    </Switch>
  );
}