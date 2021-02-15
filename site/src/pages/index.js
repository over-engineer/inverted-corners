import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import GitHubForkRibbon from 'react-github-fork-ribbon';

import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

import Demo from '../components/demo';
import Docs from '../components/docs';

const useStyles = createUseStyles({
  
});

const IndexPage = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  
  return (
    <Layout>
      <SEO
        title="Docs"
        description="A Houdini Paint worklet for inverted corners using the CSS Paint API."
        meta={[
          {
            name: `author`,
            content: `over-engineer`,
          },
          {
            name: `keywords`,
            content: `inverted, corners, reversed, houdini, css, paint, worklet`,
          },
        ]}
      />

      <Header />
      <Demo />
      <Docs />

      <GitHubForkRibbon
        position="right"
        color="orange"
        href="https://github.com/over-engineer/inverted-corners"
        target="_blank"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
    </Layout>
  );
};

export default IndexPage;
