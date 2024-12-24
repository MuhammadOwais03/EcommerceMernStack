import React from "react";
import "./styles/LatestCollection.css";

import p_img6 from "../src/assets/p_img6.png";
import p_img8 from "../src/assets/p_img8.png";
import p_img9 from "../src/assets/p_img9.png";
import p_img15 from "../src/assets/p_img15.png";
import p_img24 from "../src/assets/p_img24.png";
import p_img35 from "../src/assets/p_img35.png";
import p_img36 from "../src/assets/p_img36.png";
import p_img38 from "../src/assets/p_img38.png";
import p_img47 from "../src/assets/p_img47.png";
import p_img51 from "../src/assets/p_img51.png";

const collections = [
    {
        image: p_img6,
        name: "Kid Tapered Slim Fit Trouser",
        price: "$38",
    },
    {
        image: p_img8,
        name: "Men Round Neck Pure Cotton T-shirt",
        price: "$64",
    },
    {
        image: p_img9,
        name: "Boy Round Neck Pure Cotton T-shirt",
        price: "$60",
    },
    {
        image: p_img15,
        name: "Women Zip-Front Relaxed Fit Jacket",
        price: "$74",
    },
    {
        image: p_img24,
        name: "Men Tapered Fit Flat-Front Trousers",
        price: "$58",
    },
    {
        image: p_img35,
        name: "Girls Round Neck Cotton Top",
        price: "$56",
    },
    {
        image: p_img36,
        name: "Women Zip-Front Relaxed Fit Jacket",
        price: "$68",
    },
    {
        image: p_img38,
        name: "Kid Tapered Slim Fit Trouser",
        price: "$40",
    },
    {
        image: p_img47,
        name: "Men Printed Plain Cotton Shirt",
        price: "$52",
    },
    {
        image: p_img51,
        name: "Women Zip-Front Relaxed Fit Jacket",
        price: "$78",
    },
];

const LatestCollections = () => {
    return (
        <div className="collections-container">
            <h2 className="collections-title">
                LATEST <span>COLLECTIONS</span> <span className="line"></span>
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

export default LatestCollections;
