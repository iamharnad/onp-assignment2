import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { getItem, setItem } from './storage';

function HeroSection({ article }) {

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
    <div className="breakingCon">
      <h1>Breaking News</h1>
      <Link to={`/categories/${article.category}/articles/${article.id}`}>
        <img src={article.image} alt="breaking news" style={{ minWidth: '500px', maxWidth: '50vw' }} />
        <div className="favIcon">
          {!favItems.includes(article.id) ?
            <FavoriteBorder style={{ color: '#fff', fontSize: 30 }} onClick={(e) => onFavItem(e)}/>
            :
            <Favorite style={{ color: '#fff', fontSize: 30 }} onClick={(e) => unFavItem(e)}/>
          }
        </div>
      </Link>
      <h2>{article.heading}</h2>
      <p>{article.subheading}</p>
    </div>
  )
}

export default HeroSection