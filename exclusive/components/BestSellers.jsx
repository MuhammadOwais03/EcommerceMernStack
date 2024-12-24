import React from "react";
import "./styles/LatestCollection.css";


import p_img36 from "../src/assets/p_img36.png";

import p_img40 from "../src/assets/p_img40.png";
import p_img45 from "../src/assets/p_img45.png";
import p_img48 from "../src/assets/p_img48.png";
import p_img52 from "../src/assets/p_img52.png";

const collections = [
    {
        image: p_img36,
        name: "Women Zip-Front Relaxed Fit Jacket",
        price: "$38",
    },
    {
        image: p_img45,
        name: "Men Slim Fit Relaxed Denim Jacket",
        price: "$64",
    },
    {
        image: p_img48,
        name: "Men Slim Fit Relaxed Denim Jacket",
        price: "$60",
    },
    {
        image: p_img40,
        name: "Men Slim Fit Relaxed Denim Jacket",
        price: "$74",
    },
    {
        image: p_img52,
        name: "Men Slim Fit Relaxed Denim Jacket",
        price: "$58",
    },
    
];

const BestSellers = () => {
    return (
        <div className="collections-container">
            <h2 className="collections-title">
                Best<span>Sellers</span> <span className="line"></span>
            </h2>
            <p className="collections-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
            </p>
            <div className="collections-grid">
                {collections.map((item, index) => (
                    <a key={index} className="collection-item">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="collection-image"
                        />
                        <h3 className="collection-name">{item.name}</h3>
                        <p className="collection-price">{item.price}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
