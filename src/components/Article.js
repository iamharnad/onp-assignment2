import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toProperCase } from '../utils'
import SideColumn from './SideColumn'
import Trending from './Trending'
import moment from 'moment'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { getItem, setItem } from './storage'

function Article({ news }) {
  
  const { category, articleId } = useParams()

  
  const article = news[category] ? news[category].find(a => a.id == articleId) : {}
  const articleText = article.article ? article.article.split('\n') : []

  const [favItems, setFavItem] = useState([])
  useEffect(() => {
    getItems()
  }, [])

  const getItems = () => {
    let FavItems = getItem('favouriteArray')
    if (FavItems && FavItems.length) {
      FavItems = JSON.parse(FavItems)
      setFavItem(FavItems)
    }
  }


  const onFavItem = e => {
    e.preventDefault()
    e.stopPropagation()
    let itemArray = getItem('favouriteArray')
    if (itemArray) {
      itemArray = JSON.parse(itemArray)
    }
    let favouriteArray = []
    if (itemArray && itemArray.length) {
      favouriteArray = [...itemArray]
    }
    favouriteArray.push(article.id)
    setItem('favouriteArray', favouriteArray)
    getItems()
  }
  const unFavItem = e => {
    e.preventDefault()
    e.stopPropagation()
    let itemArray = getItem('favouriteArray')
    if (itemArray) {
      itemArray = JSON.parse(itemArray)
    }
    let favouriteArray = []
    if (itemArray && itemArray.length) {
      favouriteArray = [...itemArray]
    }
    let index = favouriteArray.indexOf(article.id)
    favouriteArray.splice(index, 1)
    setItem('favouriteArray', favouriteArray)
    getItems()
  }


  return (
    <>
      <div id='main-content-side-container'>
        <div>
          <Link to={`/categories/${category}`}>
            Category: {toProperCase(category)}
          </Link>
          <h2>{article.heading}</h2>
          <p>By: {article.author} | {moment(article.time).format('LL')}</p>
          <div className="detailCon">
            <img src={article.image} alt="" style={{ maxHeight: '300px', margin: '10px 0' }} />
            <div className="favIcon">
              {!favItems.includes(article.id) ? 
                <FavoriteBorder style={{color: '#fff', fontSize: 30}} onClick={(e) => onFavItem(e)}/>
                :
                <Favorite style={{color: '#fff', fontSize: 30}} onClick={(e) => unFavItem(e)}/>
              }
            </div>
          </div>
          {/* Splitting the different lines of the article into separate paragraphs */}
          {articleText.map((text, i) => (
            <Fragment key={i}>
              <p className='article-text'>{text}</p>
              <br></br>
            </Fragment>
          ))}
        </div>
        <SideColumn news={news} />
      </div>
      <Trending news={news} />
    </>
  )
}

export default Article