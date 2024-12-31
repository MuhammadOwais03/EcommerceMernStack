import React, {useState, useEffect} from "react";
import "./styles/LatestCollection.css";


import p_img36 from "../src/assets/p_img36.png";

import p_img40 from "../src/assets/p_img40.png";
import p_img45 from "../src/assets/p_img45.png";
import p_img48 from "../src/assets/p_img48.png";
import p_img52 from "../src/assets/p_img52.png";



const BestSellers = ({products}) => {

     const [collections, setCollections] = useState([])
    
        useEffect(()=>{
            products = products.filter(product => product.bestSellers === true)
            setCollections(products.slice(0, 5))
        },[])
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
                    <a key={index} className="collection-item" href={`/product/${item._id}`}>
                        <img
                            src={item.images[0]}
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
