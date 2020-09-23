import React, { useState, useEffect } from 'react'
import { getArticleFromEachCategory } from '../utils'
import ArticleThumbnail from './ArticleThumbnail'
import Button from '@material-ui/core/Button';

function Trending({ news }) {
  const [showReadMoreButton, setShowReadMoreButton] = useState(true)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    if (showReadMoreButton) {
      
      setArticles(articles.length ? articles.slice(0, 3) : getArticleFromEachCategory(news))
    } else {
     
      setArticles([...articles, ...getArticleFromEachCategory(news)])
    }
  }, [showReadMoreButton, news])

  return (
    <div id='trending-container'>
      <h2>Trending News</h2>
      <div className='trending-articles-container'>
        {articles.map(article => (
          <ArticleThumbnail
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <Button variant="contained" color="primary" onClick={() => setShowReadMoreButton(!showReadMoreButton)}>
        {showReadMoreButton ? 'Read more' : 'Read less'}
      </Button>
    </div>
  )
}

export default Trending