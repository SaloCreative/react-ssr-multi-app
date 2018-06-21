import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import hoistNonReactStatic from 'hoist-non-react-statics';

// HELPERS
import { isBrowser } from '../../../../helpers';
import history from '../../../../config/browserHistory';
import CONFIG from '../../../../config';
import Loader from '../../../../components/loader';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

export default function Page(ComposedComponent) {
  class composedPage extends React.Component {
    state = {
      languageValid: true
    };

    static getDerivedStateFromProps(nextProps) {
      const { language } = nextProps.match.params;
      const languageInWhitelist = CONFIG.languages.includes(language);
      
      if (language) {
        // Redirect if not a whitelisted language
        if (!languageInWhitelist) {
          return {
            languageValid: false
          };
        }
        
        // Check if the language has changed
        if (language !== i18next.language) {
          i18next.changeLanguage(language);
          try {
            localStorage.clear();
            localStorage.setItem('version', VERSION);
          } catch (e) {
            // console && console.log('could not set');
          }
        }
      }
      return {
        languageValid: true
      };
    }

    componentDidMount() {
      const { path } = this.props.match;
      const { languageValid } = this.state;
      if (!languageValid) {
        const url = path.replace(':language', 'en');
        history.push(url);
      }
    }
    
    render() {
      const { languageValid } = this.state;
      if (!languageValid) return null;
      const loading = false;
      return (
        <React.Fragment>
          { loading && isBrowser && <Loader ready={ !loading } /> }
          { !loading && <ComposedComponent { ...this.props } /> }
        </React.Fragment>
      );
    }
  }

  composedPage.propTypes = {
    match: PropTypes.object.isRequired
  };
  hoistNonReactStatic(composedPage, ComposedComponent);
  composedPage.displayName = `Page(${ getDisplayName(ComposedComponent) })`;
  return composedPage;
}