import React from "react";
import Link from "gatsby-link"
import Img from "../../components/strapiImg";

const slugify = require('slugify');

const News = ({ data }) => (
    <div>
        <h1>News</h1>
        <ul>
            {data.allStrapiPost.edges.map(document => (
                <li key={document.node.id}>
                    <h2><Link to={`/${document.node.fields.slug}`}>{document.node.title}</Link></h2>
                    <p><Link to={`/orgs/${slugify(document.node.author.displayName, { lower: true })}`} >{document.node.author.displayName}</Link></p>
                    <p>{document.node.createdAt}</p>
                    <Img src={document.node.coverImage.url} />
                    <p>{document.node.content}</p>
                </li>
            ))}
        </ul>
    </div>
)

export default News

export const query = graphql`
  query news {
    allStrapiPost(sort: {fields: [createdAt], order: DESC}) {
      edges {
        node {
          title 
          content
          author {
              displayName
              id
          }
          fields {
              slug
          }
          coverImage {
              url
          }
          createdAt(formatString: "DD MMM")
        }
      }
    }
  }
`