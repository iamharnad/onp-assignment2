import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { setItem, getItem } from './storage';

const UserFavDropDown = ({news, onClose, menuCount}) => {
  const [ favItems, setFavItems ] = useState([])

  
  useEffect(() => {
    let FavItems = getItem('favouriteArray')
    if (FavItems && FavItems.length) {
      FavItems = JSON.parse(FavItems)
      let items  = []
      FavItems.map(item => {
        return Object.keys(news).map(function(key, index) {
          let currentItem = news[key].find(art => art.id === item)
          if (currentItem) {
            currentItem.cat = key;
            items.push(currentItem)
          }
        });
      })
      setFavItems(items)
    }
  }, [news, menuCount])

  
  const renderItems = () => {
    if (!favItems.length) {
      return <p style={{textAlign: 'center', padding: 10}}>No article in favourite.</p>
    } else {
      return favItems.map((item, index) => {
        if (index < 3) {
          return  <li key={index} onClick={() => onClose()}>
                    <Link to={`/categories/${item.cat}/articles/${item.id}`}>
                      <div className="imgBox">
                        <img src={item.image} />
                      </div>
                      <div className="contentBox">
                        <h4>{item.cat}</h4>
                        <p>{item.subheading}</p>
                      </div>
                    </Link>
                  </li>  
        }
        
      })
    }
  }


  return (
    <>
      <ul className="dropDownBoxinner">
        {renderItems()}
      </ul>
      {favItems.length ?
        <Link to="/favourites" onClick={() => onClose()}><button className="viewAllBtn">
          View All
        </button>
        </Link>
        : ''
      }
      
    </>
  )
}

export default UserFavDropDown