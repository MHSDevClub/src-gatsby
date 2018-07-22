import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h2>News</h2>
    <ul>
      {data.allStrapiPost.edges.map(document => (
        <li key={document.node.id}>
          <h3><Link to={`/news/${document.node.fields.slug}`}>{document.node.title}</Link></h3>
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiPost (limit:3, sort: {fields: [createdAt], order: DESC}) {
      edges {
        node {
          title
          fields {
            slug
          }
          content
        }
      }
    }
  }
`