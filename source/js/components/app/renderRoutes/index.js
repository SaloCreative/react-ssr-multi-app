import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route Component
const renderRoutes = (componentProps, routesConfig, language) => {
  return (
    <Switch>
      { routesConfig.map(route => (
        <Route
          key={ route.path }
          exact={ route.exact }
          path={ route.path }
          ignoreScrollBehavior={ false }
          render={ (props) => (
            <route.component
              title={ route.title }
              { ...componentProps }
              match={ props.match }
            />
          ) }
        />
      )) }
    </Switch>
  );
};

export default renderRoutes;