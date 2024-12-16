import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SubtitleTimeline from './SubtitleTimeline'
import Leftbar from './leftbar'
import Display from './Display'

const App = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <Leftbar/>
      <Display/>
    </div>
  )
}

export default App
