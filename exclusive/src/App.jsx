import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Login from './pages/Login';
import { Product } from './pages/Product';
import Sign from './pages/Sign';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/login" element={<Login />} />
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/sign' element={<Sign/>}/>
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
