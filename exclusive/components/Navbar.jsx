import React, { useState } from 'react';
import './styles/navbar.css';
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, isLogin }) => {
    const [search, setSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const searchOpen = () => {
        setSearch((prev) => !prev);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>FOREVER<span className="dot">.</span></h1>
            </div>

            <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/collections">COLLECTION</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
                <button className="admin-button">Admin Panel</button>
            </ul>
            <div className="navbar-actions">
                <div className="icons">
                    <i className="fa-solid fa-bars menu-toggle" onClick={toggleMenu}></i>
                    <i className="fa-solid fa-magnifying-glass" onClick={searchOpen}></i>
                    <div className="profile-icon" onClick={toggleDropdown}>
                        <i className="fa-regular fa-user"></i>
                        {dropdownOpen && (
                            <div className="user-dropdown">
                                {isLogin ? (
                                    <>
                                        <Link to="/profile">Profile</Link>
                                        <Link to="/orders">Orders</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/sign">Login</Link>
                                        <Link to="/sign">Sign Up</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <Link to='/cart' className="cart-icon">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="cart-count">{cartCount}</span>
                    </Link>
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
