import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

export default function Footer({loading}) {
  return loading ? (
    <ActivityIndicator size="small" color="rgba(255,255,255, 0.6)" />
  ) : null;
}

Footer.propTypes = {
  loading: PropTypes.bool,
};

Footer.defaultProps = {
  loading: false,
};
