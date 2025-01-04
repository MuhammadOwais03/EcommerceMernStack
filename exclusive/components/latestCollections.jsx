import React, {useState, useEffect} from "react";
import "./styles/latestCollection.css";

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
import { Link } from "react-router-dom";

const LatestCollections = ({products}) => {


    const [collections, setCollections] = useState([])

    useEffect(()=>{
        setCollections(products.slice(0, 10))
    },[])

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
                    <Link key={index} className="collection-item" to={`/product/${item._id}`}>
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="collection-image"
                        />
                        <h3 className="collection-name">{item.name}</h3>
                        <p className="collection-price">{item.price}$</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LatestCollections;
