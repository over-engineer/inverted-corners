const theme = {
  // Bright colors
  brightPrimary: '#ff6164',
  brightSecondary: '#ff8264',
  brightTertiary: '#ffa264',
  // Dark colors
  darkPrimary: '#0f1419',
  darkSecondary: '#181e29',
  darkTertiary: '#273042',
  darkQuaternary: '#3a4861',
  // Text colors
  textPrimary: '#ffffff',
};

module.exports = {
  siteMetadata: {
    title: `Inverted Corners — CSS Houdini Paint worklet`,
    description: `A Houdini Paint worklet for inverted corners using the CSS Paint API.`,
    author: `@over-engineer`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-jss`,
      options: { theme },
    },
  ],
};
