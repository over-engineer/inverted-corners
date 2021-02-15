import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import Logo from '../images/logo.svg';

const useStyles = createUseStyles({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  logo: {
    width: '80%',
    maxWidth: '100px',
  },
  title: {
    fontSize: '4em',
    textAlign: 'center',
    lineHeight: '0.8em',
  },
  subtitle: {
    color: ({ theme }) => theme.brightSecondary,
    marginTop: '1.2em',
    textAlign: 'center',
  },
  highlight: {
    color: ({ theme }) => theme.brightSecondary,
    display: 'block',
  },
  link: {
    color: ({ theme }) => theme.brightPrimary,
    textDecoration: 'none',
    '&:hover': {
      color: ({ theme }) => theme.brightTertiary,
    },
  },
});

const Header = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.header}>
      <img src={Logo} className={classes.logo} alt="Inverted Corners logo" />

      <h1 className={classes.title}>
        <span className={classes.highlight}>Inverted</span>
        Corners
      </h1>

      <p className={classes.subtitle}>
        A <a href="https://ishoudinireadyyet.com/" className={classes.link} rel="noreferrer" target="_blank">Houdini</a> Paint worklet for inverted corners.
      </p>
    </div>
  );
};

export default Header;
