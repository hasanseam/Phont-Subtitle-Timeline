
import './App.css'
import Display from './Display'
import LeftBar from './LeftBar'


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
      <Display/>
      <LeftBar></LeftBar>
    </div>
  )
}

export default App
