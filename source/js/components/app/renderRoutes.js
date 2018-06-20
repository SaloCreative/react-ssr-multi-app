import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from '../../auth';

// Route Component
export default function renderRoutes(props, routesConfig) {
  return (
    <Switch>
      { routesConfig.map(route => {
        return (
          <AuthRoute
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
      }) }
    </Switch>
  );
}

// import React from 'react';
// import { Switch, Redirect } from 'react-router-dom';
// import { RouteAuth } from '@lushdigital/auth-api';

// // Route Component
// export default function renderRoutes(props, routesConfig) {
//   return (
//     <Switch>
//       { routesConfig.map(route => {
//         if (route.renderRedirect) {
//           return (
//             <Redirect
//               exact={ route.exact }
//               key={ route.path }
//               path={ route.path }
//               to={ route.redirect ? route.redirect : '/404' }
//             />
//           );
//         }

//         return (
//           <AuthRoute
//             exact={ route.exact }
//             key={ route.path }
//             path={ route.path }
//             componentProps={ props }
//             pageTitle={ route.pageTitle }
//             component={ route.component }
//             requireLogin={ route.requireLogin }
//             permissions={ route.permissions ? route.permissions : [] }
//             redirect={ route.redirect ? route.redirect : '/404' }
//           />
//         );
//       }) }
//     </Switch>
//   );
// }