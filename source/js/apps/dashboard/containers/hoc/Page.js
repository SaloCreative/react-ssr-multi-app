import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { goToNotFound, isBrowser } from '../../../../helpers';
import CONFIG from '../../../../config';
import Loader from '../../../../components/loader';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

export default function Page(ComposedComponent) {
  class composedPage extends React.Component {
    componentWillMount() {
      const { match } = this.props;
      const { language } = match.params;
      const languageChanged = language !== i18next.language;
      const languageWhitelist = CONFIG.languages;
      const languageInWhitelist = languageWhitelist.includes(language);
  
      if (language) {
        if (!languageInWhitelist) { goToNotFound('en'); }
        if (languageChanged) {
          i18next.changeLanguage(language);
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

  composedPage.propTypes = {
    match: PropTypes.object.isRequired
  };
  hoistNonReactStatic(composedPage, ComposedComponent);
  composedPage.displayName = `Page(${ getDisplayName(ComposedComponent) })`;
  return composedPage;
}