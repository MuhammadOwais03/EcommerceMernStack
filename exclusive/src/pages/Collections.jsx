import React, { useState, useEffect } from 'react';
import '../../components/styles/collections.css';

import p_img36 from "../assets/p_img36.png";
import p_img40 from "../assets/p_img40.png";
import p_img45 from "../assets/p_img45.png";
import p_img48 from "../assets/p_img48.png";
import p_img52 from "../assets/p_img52.png";
import menu_icon from "../assets/menu_icon.png";

const collections = [
  {
    image: p_img36,
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "$38",
    type: "topwear",
    category: "Womens",
  },
  {
    image: p_img45,
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: "$64",
    type: "topwear",
    category: "Mens",
  },
  {
    image: p_img48,
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: "$60",
    type: "topwear",
    category: "Mens",
  },
  {
    image: p_img40,
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: "$74",
    type: "topwear",
    category: "Mens",
  },
  {
    image: p_img52,
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: "$58",
    type: "bottomwear",
    category: "Mens",
  },
];

const Collections = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState(collections);


  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const filterByCategory = (e) => {
    const value = e.target.value;

    if (['topwear', 'bottomwear', 'winterwear'].includes(value)) {
      if (e.target.checked) {
        setFilterTypes((prev) => [...prev, value]);
      } else {
        setFilterTypes((prev) => prev.filter((item) => item !== value));
      }
    } else {
      if (e.target.checked) {
        setFilterCategories((prev) => [...prev, value]);
      } else {
        setFilterCategories((prev) => prev.filter((item) => item !== value));
      }
    }
  };


  useEffect(() => {
    if (filterCategories.length === 0 && filterTypes.length === 0) {
      setFilteredCollections(collections);
    } else {
      const filtered = collections.filter(
        (item) =>
          (filterTypes.length === 0 || filterTypes.includes(item.type)) &&
          (filterCategories.length === 0 || filterCategories.includes(item.category))
      );
      setFilteredCollections(filtered);
    }
  }, [filterCategories, filterTypes]);


  useEffect(() => {
    console.log("Filtered Collections:", filteredCollections);
  }, [filteredCollections]);

  return (
    <>
      <div className="ham">
        <img src={menu_icon} alt="menu icon" className="menu_icon-filter" onClick={openMenu} />
      </div>
      <div className="main-collection-container">
        <div className={`filter-container ${menuOpen ? 'show' : ''}`}>
          <h1>Filter</h1>
          <div className="filter-by-category">
            <i className="fa-solid fa-xmark" onClick={closeMenu}></i>
            <ul>
              <li><h3>Categories</h3></li>
              <li><input type="checkbox" value="Mens" onChange={filterByCategory} /> <p>Mens</p></li>
              <li><input type="checkbox" value="Womens" onChange={filterByCategory} /> <p>Womens</p></li>
              <li><input type="checkbox" value="Kids" onChange={filterByCategory} /> <p>Kids</p></li>
            </ul>
          </div>
          <span className="line-filter"></span>
          <div className="filter-by-type">
            <ul>
              <li><h3>Type</h3></li>
              <li><input type="checkbox" value="topwear" onChange={filterByCategory} /><p>Topwear</p></li>
              <li><input type="checkbox" value="bottomwear" onChange={filterByCategory} /><p>Bottomwear</p></li>
              <li><input type="checkbox" value="winterwear" onChange={filterByCategory} /><p>Winterwear</p></li>
            </ul>
          </div>
        </div>
        <div className="all-collection-cards">
          <div className="collections-upper">
            <div className="heading">
              All<span>Collections</span><span className="line"></span>
            </div>
            <div className="sort-by">
              <select name="sort-by" id="sort-by">
                <option value="newest">Sort by Relevant</option>
                <option value="price">Sort by Low to High</option>
                <option value="price">Sort by High to Low</option>
              </select>
            </div>
          </div>
          <div className="collections-flex">
            {filteredCollections.map((item, index) => (
              <a key={index} className="collection-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="collection-card-image"
                />
                <h3 className="collection-card-name">{item.name}</h3>
                <p className="collection-card-price">{item.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
