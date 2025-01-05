import React, { useEffect, useState } from 'react';
import './styles/navbar.css';
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ menuOpen, setMenuOpen, setProducts, products, cartCount, isLogin, setUserId, setUserData, setCartCount, setIsLogin }) => {
    const [search, setSearch] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        setSearchProducts(products);
    }, [])

    const searchOpen = () => {
        setSearch((prev) => !prev);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        setUserId(null);
        setUserData({});
        setCartCount(0);
        setIsLogin(false);
        Navigate('/sign/login');
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            console.log("1")
            // Restore the original product list when search is cleared
            setProducts(searchProducts);
        } else {
            console.log("2")
            // Filter the products
            const filteredProducts = searchProducts.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>EXCLUSIVE<span className="dot">.</span></h1>
            </div>

            <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/collections">COLLECTION</Link></li>
                <li><Link to="/about-us">ABOUT</Link></li>
                <li><Link to="/contact-us">CONTACT</Link></li>
                {/* <button className="admin-button">Admin Panel</button> */}
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
                                        {/* <Link to="/profile">Profile</Link> */}
                                        <Link to="/orders">Orders</Link>
                                        <Link to="/" onClick={handleLogout}>Logout</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/sign/login">Login</Link>
                                        <Link to="/sign/signup">Sign Up</Link>
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
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </nav>
    );
};

export default Navbar;
