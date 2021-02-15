/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

import './layout.css';

const useStyles = createUseStyles({
  link: {
    color: ({ theme }) => theme.brightPrimary,
    textDecoration: 'none',
    '&:hover': {
      color: ({ theme }) => theme.brightTertiary,
    },
  },
});

const Layout = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            textAlign: `center`,
          }}
        >
          © {new Date().getFullYear()}, Made with ♥️ by
          {` `}
          <a href="https://github.com/over-engineer" className={classes.link} rel="noreferrer" target="_blank">
            over-engineer
          </a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
