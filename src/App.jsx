import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Homepage from './pages/HomePage/Homepage'
import Episodes from './pages/Episodes/Episodes';
import About from './pages/About/About';

function App() {

  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path='/' element={ <Homepage/>}/>
        <Route path='/About' element={ <About/>}/>
        <Route path='/Episodes' element={ <Episodes/>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
