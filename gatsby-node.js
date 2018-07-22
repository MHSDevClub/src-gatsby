const slugify = require('slugify');
const path = require('path');

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  const addSlug = (nodeType, slugOrigin) => {
    if (node.internal.type === nodeType) {
      const slug = slugify(slugOrigin, { lower: true });
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  }
  addSlug('StrapiPost', node.title);
  addSlug('StrapiOrganisation', node.displayName);
};


const makeRequest = (graphql, request) => new Promise((resolve, reject) => {  
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const getPosts = makeRequest(graphql, `
    {
      allStrapiPost {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allStrapiPost.edges.forEach(({ node }) => {
      createPage({
        path: `/news/${node.fields.slug}`,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  });

  return Promise.all([
    getPosts,
  ])
};