import React, {useState} from 'react'
import SideColumn from './SideColumn'
import Trending from './Trending'
import HeroSection from './HeroSection'
import { getRandomArticle } from '../utils'

function Home({ news }) {
  
  const article = getRandomArticle(news)
  const [renderCount, setRenderCount] = useState(1)

  return (
    <div>

      <div id='main-content-side-container'>
        <HeroSection article={article} />
        <SideColumn news={news} />
      </div>
      <Trending news={news} />
    </div>
  )
}

export default Home