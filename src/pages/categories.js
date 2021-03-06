import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import _ from "lodash";
import Layout from "../layout";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class CategoriesPage extends Component {
  render() {
    const { data } = this.props;
    const { group } = data.allMdx;

    return (
      <Layout>
        <SEO />
        <Helmet title={`Categories – ${config.siteTitle}`} />
        <div className="container">
          <section>
            <header>
              <h1>Categories</h1>
            </header>
            <div className="tag-container">
              {group.map(category => (
                <Link
                  to={`/categories/${_.kebabCase(category.fieldValue)}`}
                  key={category.fieldValue}
                >
                  <span key={category.fieldValue}>
                    {category.fieldValue}{" "}
                    <strong className="count">{category.totalCount}</strong>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoriesQuery {
    allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
