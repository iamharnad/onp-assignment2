import React, { useEffect, useState } from 'react'
import Routes from './components/Routes'
import Header from './components/Header'
import axios from 'axios'
import './styles/styles.css'
import Footer from './components/Footer'

function App() {
  
  const [news, setNews] = useState({})

  useEffect(() => {
   
    axios.get('/data.json')
      .then((res) => {
        setNews(res.data)
      })
  }, [])

  return (
    <>
      <Header news={news} />
        <Routes news={news} />
      <Footer />
    </>
  )
}

export default App