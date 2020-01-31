import React from 'react'
import ArticlePreview from './article-preview'

export default ({ posts }) => (
  <ul className="article-list">
    {posts.map(({ node }) => {
      return (
        <li key={node.slug}>
          <ArticlePreview article={node} />
        </li>
      )
    })}
  </ul>
)
