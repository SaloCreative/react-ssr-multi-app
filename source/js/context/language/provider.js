import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Provider } from './index';

export default class LanguageProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.language
    };
  }

  render() {
    const { children } = this.props;
    const { language } = this.state;
    return (
      <Provider value={ { language } }>
        { children }
      </Provider>
    );
  }
}

LanguageProvider.propTypes = {
  children: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired
};