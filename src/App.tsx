
import './App.css'
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
