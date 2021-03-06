import React from 'react';
import PropTypes from 'prop-types';

// HELPERS
import { isBrowser } from '../../../helpers';

export default class ExternalRedirect extends React.Component {
  constructor(props) {
    super(props);
    if (isBrowser) {
      window.location = props.url;
    }
  }

  render() {
    return null;
  }
}

ExternalRedirect.propTypes = {
  url: PropTypes.string.isRequired
};