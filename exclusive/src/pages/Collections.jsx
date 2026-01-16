import React, { useState, useEffect } from 'react';
import '../../components/styles/collections.css';
import { Link } from "react-router-dom";
import menu_icon from "../assets/menu_icon.png";




const Collections = ({ setMenu, products }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterSubCategories, setFilterSubCategories] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState(products);
  const [sortOption, setSortOption] = useState("newest");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedCollections = [...products];
    if (value === "price_low") {
      sortedCollections.sort((a, b) => a.price - b.price);
    } else if (value === "price_high") {
      sortedCollections.sort((a, b) => b.price - a.price);
    }
    setFilteredCollections(sortedCollections);
  };

  useEffect(() => {
    setMenu(false);
  }, []);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const filterByCategory = (e) => {
    const value = e.target.value;

    // Handling subCategory filters
    if (['Topwear', 'Bottomwear', 'Winterwear'].includes(value)) {
      if (e.target.checked) {
        setFilterSubCategories((prev) => [...prev, value]);
      } else {
        setFilterSubCategories((prev) => prev.filter((subCategory) => subCategory !== value));
      }
    }
    // Handling main category filters
    else {
      if (e.target.checked) {
        setFilterCategories((prev) => [...prev, value]);
      } else {
        setFilterCategories((prev) => prev.filter((category) => category !== value));
      }
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredCollections([]);
      return;
    }

    if (filterCategories.length === 0 && filterSubCategories.length === 0) {
      setFilteredCollections(products);
    } else {
      const filtered = products.filter(
        (product) =>
          (filterCategories.length === 0 || filterCategories.includes(product.category)) &&
          (filterSubCategories.length === 0 || filterSubCategories.includes(product.subCategory))
      );
      setFilteredCollections(filtered);
    }
  }, [filterCategories, filterSubCategories, products]);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden px-4 pt-6 pb-4">
        <button 
          onClick={openMenu}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-900 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Filters</h2>
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-black rounded-full"></span>
                  Categories
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Men" 
                      onChange={filterByCategory}
                      id="men"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="men" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Men
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Women" 
                      onChange={filterByCategory}
                      id="women"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="women" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Women
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Kids" 
                      onChange={filterByCategory}
                      id="kids"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="kids" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Kids
                    </label>
                  </li>
                </ul>
              </div>

              <div className="w-full h-px bg-gray-200 mb-8"></div>

              {/* Sub Categories */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-black rounded-full"></span>
                  Sub Categories
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Topwear" 
                      onChange={filterByCategory}
                      id="topwear"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="topwear" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Topwear
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Bottomwear" 
                      onChange={filterByCategory}
                      id="bottomwear"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="bottomwear" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Bottomwear
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Winterwear" 
                      onChange={filterByCategory}
                      id="winterwear"
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="winterwear" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                      Winterwear
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Sidebar */}
          <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}>
            <div 
              className={`absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                  <button 
                    onClick={closeMenu}
                    className="p-2 text-gray-500 hover:text-black transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-black rounded-full"></span>
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Men" 
                        onChange={filterByCategory}
                        id="men-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="men-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Men
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Women" 
                        onChange={filterByCategory}
                        id="women-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="women-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Women
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Kids" 
                        onChange={filterByCategory}
                        id="kids-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="kids-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Kids
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-px bg-gray-200 mb-8"></div>

                {/* Sub Categories */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-black rounded-full"></span>
                    Sub Categories
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Topwear" 
                        onChange={filterByCategory}
                        id="topwear-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="topwear-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Topwear
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Bottomwear" 
                        onChange={filterByCategory}
                        id="bottomwear-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="bottomwear-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Bottomwear
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input 
                        type="checkbox" 
                        value="Winterwear" 
                        onChange={filterByCategory}
                        id="winterwear-mobile"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      />
                      <label htmlFor="winterwear-mobile" className="ml-3 text-sm text-gray-700 cursor-pointer">
                        Winterwear
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  All <span className="text-gray-500">Collections</span>
                </h1>
                <span className="hidden sm:block w-12 h-0.5 bg-gray-800"></span>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-gray-900 cursor-pointer transition-colors duration-300"
                >
                  <option value="newest">Sort by Relevant</option>
                  <option value="price_low">Sort by Low to High</option>
                  <option value="price_high">Sort by High to Low</option>
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredCollections.length > 0 ? (
                filteredCollections.map((item, index) => (
                  <a 
                    key={index} 
                    href={`/product/${item._id}`}
                    className="group cursor-pointer block"
                  >
                    <div className="overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-500">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={item.images ? item.images[0] : item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      ${item.price}
                    </p>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-base">No products found matching the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;