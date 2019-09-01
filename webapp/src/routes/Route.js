import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  doesntMatter,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!doesntMatter) {
    if (!signed && isPrivate) {
      return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
      return <Redirect to="/dashboard" />;
    }
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Layout>
      <Route {...rest} component={Component} />
    </Layout>
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  doesntMatter: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  doesntMatter: false,
};
