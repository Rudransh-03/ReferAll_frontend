import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/HomePage/Home'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
    {/* <header className='fixed top-0'><Header /></header> */}
    <Header />
    <Home />
    <Footer />
    </div>
  )
}

export default App
