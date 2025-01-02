import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';


import OrdersList from './pages/OrdersList';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Login from './pages/Login';
import { Product } from './pages/Product';
import Sign from './pages/Sign';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProfilePage from './pages/profile';
import { ToastContainer, toast } from 'react-toastify';


import { fetchData } from '../server';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('Fetching products...');
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

    fetchData('users/user-details/' + localStorage.getItem('userId'), null, 'GET', localStorage.getItem('accessToken')).then((response) => {

      console.log(response)

      if (response.statusCode === 200) {

        setCartCount(response.data.cartCount);
        setUserData(response.data.user);
        setIsLogin(true);
        console.log(response.data.user)
      }
    }).catch((error) => {
      console.error('Error fetching cart:', error);
    });


    fetchData('orders/get-orders/' + localStorage.getItem('userId'), null, 'GET', localStorage.getItem('accessToken')).then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log(response.orders);
        setOrders(response.orders);
      }
    }).catch((error) => {
      console.error('Error fetching orders:', error);
    });

    setUserId(localStorage.getItem('userId'));

  }, [userId, isLogin, cartCount]);

  useEffect(() => {
    console.log('orders:', orders);
  }, [products]);

  

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
        <div>
          <ToastContainer />
        </div>

        <Navbar setProducts={setProducts} products={products} cartCount={cartCount} isLogin={isLogin} setUserId={setUserId} setUserData={setUserData} setCartCount={setCartCount} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/collections" element={<Collections products={products} />} />
          <Route path="/product/:id" element={<Product userId={userId} setCartCount={setCartCount} setUserData={setUserData} userData={userData} />} />
          <Route path="/sign" element={<Sign setUserId={setUserId} setCartCount={setCartCount} />} />
          <Route path="/checkout" element={<Checkout setUserId={setUserId} setOrders={setOrders} setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart products={products} userData={userData} setCartCount={setCartCount} />} />
          <Route path="/orders" element={<OrdersList products={products} userData={userData} setCartCount={setCartCount} orders={orders} />} />
          <Route path="/profile" element={<ProfilePage setUserId={setUserId} setCartCount={setCartCount} userData={userData} />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
