import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Login from './pages/Login';
import { Product } from './pages/Product';
import Sign from './pages/Sign';
import Cart from './pages/Cart';
import { fetchData } from '../server';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId ,setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData('products/all-product')
      .then(data => {
        console.log(data);
        setProducts(data.products);
        setLoading(false); // Data fetched, set loading to false
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Even on error, stop loading
      });

      fetchData('users/user-details/'+localStorage.getItem('userId')).then((response) => {
        if(response.statusCode === 200) {
          setCartCount(response.data.cartCount);
          setUserData(response.data.user);
        }
      }).catch((error) => {
        console.error('Error fetching cart:',error);
      });

      setUserId(localStorage.getItem('userId'));

  }, []);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Navbar cartCount={cartCount}/>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/collections" element={<Collections products={products} />} />
          <Route path="/product/:id" element={<Product userId={userId} setCartCount={setCartCount}/>} />
          <Route path="/sign" element={<Sign setUserId={setUserId} />} />
          <Route path="/cart" element={<Cart products={products}/>}/>
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
