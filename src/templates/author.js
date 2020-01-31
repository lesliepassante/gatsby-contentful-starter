import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import ArticleList from '../components/article-list'

class AuthorTemplate extends React.Component {
  render() {
    const author = get(this.props, 'data.contentfulPerson')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${author.name} | ${siteTitle}`} />
          <div className="wrapper">
            <h1 className="section-headline">{author.name}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: author.shortBio.childMarkdownRemark.html,
              }}
            />
          </div>
          {posts && (
            <div className="wrapper">
              <h2 className="section-headline">
                Recent articles by {author.name}
              </h2>
              <ArticleList posts={posts} />
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default AuthorTemplate

export const pageQuery = graphql`
  query AuthorBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      filter: { author: { slug: { eq: $slug } } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    contentfulPerson(slug: { eq: $slug }) {
      title
      name
      twitter
      company
      shortBio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
