import React from "react";
import Link from "gatsby-link";
import Img from "../components/strapiImg";

const PostTemplate = ({ data }) => (
    <div>
        <p><Link to={`/orgs/${data.strapiPost.author.id}`} >{data.strapiPost.author.displayName}</Link></p>
        <p>{data.strapiPost.createdAt}</p>
        <h1>{data.strapiPost.title}</h1>
        <Img src={data.strapiPost.coverImage.url} />
        <p>{data.strapiPost.content}</p>
    </div>
);

export default PostTemplate;

export const query = graphql`
    query PostTemplate($slug: String!) {
        strapiPost(fields: { slug: { eq: $slug } }) {
            title
            coverImage {
                url
            }
            createdAt(formatString: "DD MMM")
            author {
                id
                displayName
            }
            content
        }
    }
`