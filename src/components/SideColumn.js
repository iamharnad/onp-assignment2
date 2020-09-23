import React, { useState, useEffect } from 'react'
import { getArticleFromEachCategory } from '../utils'
import ArticleThumbnail from './ArticleThumbnail'

function SideColumn({ news, reRenderComponent, renderCount }) {
  const [articles, setArticles] = useState([])

  
  useEffect(() => {
    setArticles(
      articles.length ? articles.slice(0, 3) : getArticleFromEachCategory(news)
    )
  }, [news])

  return (
    <div className='side-column-container'>
      {articles.map(article => (
        <ArticleThumbnail
          key={article.id}
          article={article}
          styleType='side'
          renderCount={renderCount}
          reRenderComponent={reRenderComponent}
        />
      ))}
    </div>
  )
}

export default SideColumn