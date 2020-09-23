import React, { useEffect, useState } from 'react'
import ArticleThumbnail from './ArticleThumbnail'
import Button from '@material-ui/core/Button'
import { getItem } from './storage'

const Favourite = ({ news }) => {
  
	
	const [allItems, setAllItems] = useState([])
	const [showReadMoreButton, setShowReadMoreButton] = useState(true)
	const [renderCount, setRenderCount] = useState(1)

	useEffect(() => {
		let FavItems = getItem('favouriteArray')
		if (FavItems && FavItems.length) {
			FavItems = JSON.parse(FavItems)
			let items = []
			FavItems.map(item => {
				return Object.keys(news).map(function (key, index) {
					let currentItem = news[key].find(art => art.id === item)
					if (currentItem) {
						currentItem.cat = key
						items.push(currentItem)
					}
				})
			})
			if (showReadMoreButton) { 
				setAllItems(items.slice(0, 3))
			} else {
				setAllItems(items)
			}
		}
	}, [showReadMoreButton, news, renderCount])

	const reRenderParent = () => {
		setRenderCount(renderCount + 1)
	}

  return (
    <div>
			<div id='main-content-side-container' className="favArtCon">
				<div className="trending-articles-container">
					{
						allItems.length
							? allItems.map(article => (
									<ArticleThumbnail
										key={article.id}
										article={{ ...article, category: article.cat }}
										reRenderParent={() => reRenderParent()}
									/>
								))
							: <p style={{textAlign: 'center', width: '100%'}}>No Article in favourite</p>
					}
				</div>
				{allItems.length ? <Button
					variant='contained'
					color='primary'
					onClick={() => setShowReadMoreButton(!showReadMoreButton)}
					style={{ marginBottom: 30 }}
				>
					{showReadMoreButton ? 'Read more' : 'Read less'}
				</Button>:null}

      </div>
    </div>
  )
}

export default Favourite
