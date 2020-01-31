import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        contentfulNavigation(title: { eq: "Site Navigation" }) {
          links {
            slug
            title
          }
        }
      }
    `}
    render={data => (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/blog/">Blog</Link>
          </li>
          {data.contentfulNavigation &&
            data.contentfulNavigation.links.map(link => {
              return (
                <li className={styles.navigationItem}>
                  <Link to={`/${link.slug}/`}>{link.title}</Link>
                </li>
              )
            })}
        </ul>
      </nav>
    )}
  />
)
