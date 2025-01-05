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

  useEffect(()=>{
    console.log("IIII")
    setMenu(false)
  },[])


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
      setFilteredCollections(products); // Default to all products
    } else {
      const filtered = products.filter(
        (product) =>
          (filterCategories.length === 0 || filterCategories.includes(product.category)) &&
          (filterSubCategories.length === 0 || filterSubCategories.includes(product.subCategory))
      );
      setFilteredCollections(filtered);
    }
  }, [filterCategories, filterSubCategories, products]);

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
              <li><input type="checkbox" value="Men" onChange={filterByCategory} /> <p>Men</p></li>
              <li><input type="checkbox" value="Women" onChange={filterByCategory} /> <p>Women</p></li>
              <li><input type="checkbox" value="Kids" onChange={filterByCategory} /> <p>Kids</p></li>
            </ul>
          </div>
          <span className="line-filter"></span>
          <div className="filter-by-type">
            <ul>
              <li><h3>Sub Categories</h3></li>
              <li><input type="checkbox" value="Topwear" onChange={filterByCategory} /><p>Topwear</p></li>
              <li><input type="checkbox" value="Bottomwear" onChange={filterByCategory} /><p>Bottomwear</p></li>
              <li><input type="checkbox" value="Winterwear" onChange={filterByCategory} /><p>Winterwear</p></li>
            </ul>
          </div>
        </div>
        <div className="all-collection-cards">
          <div className="collections-upper">
            <div className="heading">
              All<span>Collections</span><span className="line"></span>
            </div>
            <div className="sort-by">
              <select name="sort-by" id="sort-by" onChange={handleSortChange}>
                <option value="newest">Sort by Relevant</option>
                <option value="price_low">Sort by Low to High</option>
                <option value="price_high">Sort by High to Low</option>
              </select>
            </div>
          </div>
          <div className="collections-flex">
            {filteredCollections.length > 0 ? (
              filteredCollections.map((item, index) => (
                <Link key={index} className="collection-card" to={`/product/${item._id}`}>
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="collection-card-image"
                  />
                  <h3 className="collection-card-name">{item.name}</h3>
                  <p className="collection-card-price">${item.price}</p>
                </Link>
              ))
            ) : (
              <p>No products found matching the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
