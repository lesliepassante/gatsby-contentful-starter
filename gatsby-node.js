const Promise = require('bluebird')
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  await createAuthor(createPage, graphql)
  await createBlogPosts(createPage, graphql)
  await createStaticPages(createPage, graphql)
}

function createAuthor(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/author.js')
    resolve(
      graphql(
        `
          {
            allContentfulPerson {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const authors = result.data.allContentfulPerson.edges
        authors.forEach(author => {
          createPage({
            path: `/author/${author.node.slug}/`,
            component: template,
            context: {
              slug: author.node.slug,
            },
          })
        })
      })
    )
  })
}

function createStaticPages(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/static-page.js')
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulPage.edges
        pages.forEach(page => {
          createPage({
            path: `/${page.node.slug}/`,
            component: template,
            context: {
              slug: page.node.slug,
            },
          })
        })
      })
    )
  })
}

function createBlogPosts(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: template,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
