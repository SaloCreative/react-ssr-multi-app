import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExternalRedirect extends Component {
  constructor(props) {
    super(props);
    window.location = props.url;
  }

  render() {
    return null;
  }
}

ExternalRedirect.propTypes = {
  url: PropTypes.string.isRequired
};