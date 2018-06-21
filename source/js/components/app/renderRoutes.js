import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from '../../auth';

// Route Component
export default function renderRoutes(props, routesConfig, language) {
  return (
    <Switch>
      { routesConfig.map(route => (
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
      )) }
    </Switch>
  );
}