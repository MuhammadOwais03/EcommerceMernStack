import React from 'react'

import './styles/navbar.css'

const Navbar = ({setMyLocalStorageValue}) => {

  const onLogout = () => {
    console.log('Logout');
    setMyLocalStorageValue(null);

  }
  return (
    <>
       <div className="navbar-logo">
            <h1>FOREVER<span className="dot">.</span></h1>
        </div> 
        <div className="navbar-logout-btn">
            <button onClick={onLogout}>Logout</button>
        </div>
    
    </>
  )
}

export default Navbar