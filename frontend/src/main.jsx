import React from 'react'
import ReactDOM from 'react-dom/client'
import TestConnection from './pages/ChapterList'
import ChapterList from './pages/ChapterList'
import Banner from './pages/Banner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Banner/>
    <ChapterList />
  </React.StrictMode>
)