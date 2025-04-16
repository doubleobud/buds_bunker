import React, { useLayoutEffect } from 'react';
import Layout from '@theme/Layout';

/**
 * Always hides the navbar by setting <html data-navbar="false">
 * This should only be used on pages like /auth-test or onboarding.
 */
export default function NoNavbarLayout(props) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-navbar', 'false');
  }, []);

  return (
    <Layout {...props}>
      {props.children}
    </Layout>
  );
}
