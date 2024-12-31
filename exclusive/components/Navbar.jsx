import React, { useState } from 'react';
import './styles/navbar.css'; // Create a CSS file for styling

const Navbar = ({cartCount}) => {
    const [search, setSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const searchOpen = () => {
        setSearch((prev) => !prev);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>FOREVER<span className="dot">.</span></h1>
            </div>

            <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
                <li><a href="/">HOME</a></li>
                <li><a href="/collections">COLLECTION</a></li>
                <li><a href="/about">ABOUT</a></li>
                <li><a href="/contact">CONTACT</a></li>
                <button className="admin-button">Admin Panel</button>
            </ul>
            <div className="navbar-actions">
                <div className="icons">
                    <i class="fa-solid fa-bars menu-toggle" onClick={toggleMenu}></i>
                    <i className="fa-solid fa-magnifying-glass" onClick={searchOpen}></i>
                    <i className="fa-regular fa-user"></i>
                    <i className="cart-icon"><i className="fa-solid fa-cart-shopping"></i><span className="cart-count">{cartCount}</span></i>
                </div>
            </div>
            <div className={`search-input ${search ? 'active' : ''}`}>
                <input type="text" />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </nav>
    );
};

export default Navbar;