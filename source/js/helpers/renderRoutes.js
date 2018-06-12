import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route Component
export default function renderRoutes(props, routesConfig) {
  return (
    <Switch>
      { routesConfig.map(route => {
        return (
          <Route
            key={ route.path }
            exact={ route.exact }
            path={ route.path }
            render={ (routeProps) => <route.component { ...props } match={ routeProps.match } /> }
          />
        );
      }) }
    </Switch>
  );
}