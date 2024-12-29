import React from 'react'

import './styles/navbar.css'

const Navbar = () => {
  return (
    <>
       <div className="navbar-logo">
            <h1>FOREVER<span className="dot">.</span></h1>
        </div> 
        <div className="navbar-logout-btn">
            <button>Logout</button>
        </div>
    
    </>
  )
}

export default Navbar