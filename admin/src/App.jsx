import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

import getCookieValue from '../extra/getToken';

import Navbar from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import AddItems from './pages/AddItems';
import Sign from './pages/login';
import ListItems from './pages/listItems';
import Orders from './pages/Orders';


function App() {
  const [myLocalStorageValue, setMyLocalStorageValue] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setMyLocalStorageValue(accessToken); // Set the cookie value in the state
  }, []);

  useEffect(() => {
    console.log('Cookie Value:', myLocalStorageValue);
  }, [myLocalStorageValue]);

  return (
    <>
      {myLocalStorageValue ? (
        <Router>
          <div className="main-admin-container">
            <div className="navbar">
              <Navbar setMyLocalStorageValue={setMyLocalStorageValue}/>
            </div>
            <div className="main-body">
              <div className="sidebar">
                <Sidebar />
              </div>
              <div className="other">
                {/* Define routes here */}
                <Routes>
                  <Route path="/add" element={<AddItems myLocalStorageValue={myLocalStorageValue} />} />
                  <Route path="/list" element={<ListItems myLocalStorageValue={myLocalStorageValue}/>} />
                  <Route path="/orders" element={<Orders/>} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      ) : (
        <Sign setMyLocalStorageValue={setMyLocalStorageValue}/>
      )}
    </>
  );
}

export default App;
