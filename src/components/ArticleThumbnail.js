import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toProperCase } from '../utils'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { setItem, getItem } from './storage';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


function ArticleThumbnail({ article, styleType, isCategoryThumbnail, reRenderParent }) {
  const classes = useStyles();
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
  
  
  const onFavItem = (e) => {
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
    if (reRenderParent) {
      reRenderParent()
    }
  }

  
  const unFavItem = (e) => {
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
    if (reRenderParent) {
      reRenderParent()
    }
  }
  return (
    <Link to={`/categories/${article.category}/articles/${article.id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={article.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <div className="favIcon">
              {!favItems.includes(article.id) ? 
                <FavoriteBorder style={{ color: '#fff', fontSize: 30 }} onClick={(e) => onFavItem(e)}/>
                :
                <Favorite style={{color: '#fff', fontSize: 30}} onClick = {(e) => unFavItem(e)}/>
              }
            </div>
            <Typography gutterBottom variant="h6" component="h5">
              {
                !isCategoryThumbnail && <div style={{color: 'blue'}}>
                  {toProperCase(article.category)}
                </div>
              }
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {article.heading.substring(0, 70)+'...'}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {isCategoryThumbnail && <p>{article.subheading}</p>}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {moment(article.time, 'YYYYMMDD').fromNow()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )

  return (
    <div className={`article-${styleType}`}>
      <div className='article-thumbnail-image-container'>
        <Link to={`/categories/${article.category}/articles/${article.id}`}>
          <img src={article.image} alt="category" style={{ maxWidth: '100px' }} />
        </Link>
      </div>
      <div className='article-thumbnail-content-container'>
        {
          
          !isCategoryThumbnail && <Link to={`/categories/${article.category}`} className='category-link'>
            {toProperCase(article.category)}
          </Link>
        }
        <p className={isCategoryThumbnail ? 'heading' : ''}>{article.heading.substring()}</p>
        {
          
          isCategoryThumbnail && <p>{article.subheading}</p>
        }
        <p>{moment(article.time, 'YYYYMMDD').fromNow()}</p>
      </div>
    </div>
  )
}

export default ArticleThumbnail