import { Component } from 'react';
import PropTypes from 'prop-types';
import { isBrowser } from '../../helpers';

export default class ExternalRedirect extends Component {
  componentDidMount() {
    if (isBrowser) {
      window.location = this.props.url;
    }
  }

  render() {
    return null;
  }
}

ExternalRedirect.propTypes = {
  url: PropTypes.string.isRequired
};