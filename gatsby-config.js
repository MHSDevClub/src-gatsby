module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://13.211.228.211`,
        contentTypes: [
          'post',
          'organisation',
        ],
      }
    },
  ],
}
