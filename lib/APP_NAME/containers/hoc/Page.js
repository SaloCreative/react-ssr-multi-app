import React from 'react';
import i18next from 'i18next';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { goToNotFound, isBrowser } from '../../../helpers';
import CONFIG from '../../../config';
import Loader from '../../../components/loader';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

export default function Page(ComposedComponent) {
  class composedPage extends React.Component {
    componentWillMount() {
      const { match } = this.props;
      const languageChanged = match.params.language !== i18next.language;
      const languageWhitelist = CONFIG.languages;
      const languageInWhitelist = languageWhitelist.indexOf(match.params.language) !== -1;
  
      if (match.params.language) {
        if (!languageInWhitelist) { goToNotFound(); }
        if (languageChanged) {
          i18next.changeLanguage(match.params.language);
          try {
            localStorage.clear();
            localStorage.setItem('version', VERSION);
          } catch (e) {
            // console && console.log('could not set');
          }
        }
      }
    }
    
    render() {
      const loading = false;

      return ([
        loading && isBrowser && <Loader key='loader' ready={ !loading } />,
        !loading && <ComposedComponent key='component' { ...this.props } />
      ]);
    }
  }
  hoistNonReactStatic(composedPage, ComposedComponent);
  composedPage.displayName = `Page(${ getDisplayName(ComposedComponent) })`;
  return composedPage;
}