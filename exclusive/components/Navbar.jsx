


import React, { useEffect, useState } from 'react';

const Navbar = ({ menuOpen, setMenuOpen, setProducts, products, cartCount, isLogin, setUserId, setUserData, setCartCount, setIsLogin }) => {
    const [search, setSearch] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        setSearchProducts(products);
    }, [products]);

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
        window.location.href = '/sign/login';
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setProducts(searchProducts);
        } else {
            const filteredProducts = searchProducts.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            EXCLUSIVE<span className="text-gray-400">.</span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8 lg:gap-12">
                        <li>
                            <a href="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group">
                                HOME
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/collections" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group">
                                COLLECTION
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/about-us" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group">
                                ABOUT
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/contact-us" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group">
                                CONTACT
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={toggleMenu}
                            className="md:hidden p-2 text-gray-700 hover:text-black transition-colors duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* Search Icon */}
                        <button 
                            onClick={searchOpen}
                            className="p-2 text-gray-700 hover:text-black transition-colors duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown}
                                className="p-2 text-gray-700 hover:text-black transition-colors duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                            
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fadeIn">
                                    {isLogin ? (
                                        <>
                                            <a 
                                                href="/orders" 
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                Orders
                                            </a>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a 
                                                href="/sign/login" 
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                Login
                                            </a>
                                            <a 
                                                href="/sign/signup" 
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                Sign Up
                                            </a>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <a 
                            href="/cart" 
                            className="relative p-2 text-gray-700 hover:text-black transition-colors duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <div className="px-4 py-4 space-y-3">
                    <a href="/" className="block py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300">
                        HOME
                    </a>
                    <a href="/collections" className="block py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300">
                        COLLECTION
                    </a>
                    <a href="/about-us" className="block py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300">
                        ABOUT
                    </a>
                    <a href="/contact-us" className="block py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300">
                        CONTACT
                    </a>
                </div>
            </div>

            {/* Search Bar */}
            <div className={`bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${search ? 'max-h-20' : 'max-h-0'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search products..."
                            className="w-full bg-white border border-gray-300 rounded-full px-5 py-3 pl-12 text-sm focus:outline-none focus:border-gray-900 transition-colors duration-300"
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;