import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import UserInfo from "../components/UserInfo";
import PostMeta from "../components/PostMeta";
import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default class PostTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.mdx;
    const post = postNode.frontmatter;

    if (!post.id) {
      post.id = slug;
    }

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} – ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="container content-container">
          <article>
            <header>
              <h1>{post.title}</h1>
              <PostMeta post={post} />
              <PostTags tags={post.tags} />
            </header>
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </article>
          <UserInfo config={config} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
      body
      timeToRead
      excerpt
    }
  }
`;
