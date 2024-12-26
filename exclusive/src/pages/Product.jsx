import React, { useState } from 'react';
import '../../components/styles/product.css';
import p_img45 from "../assets/p_img45.png";
import p_img52 from "../assets/p_img52.png";

export const Product = () => {
    const [mainImage, setMainImage] = useState(p_img45);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    return (
        <>
            <div className="product-detail-container">
                <div className="product-images-container">
                    <div className="all-images">
                        <div className="img-onside" onClick={() => handleImageClick(p_img45)}>
                            <img src={p_img45} alt="" />
                        </div>
                        <div className="img-onside" onClick={() => handleImageClick(p_img52)}>
                            <img src={p_img52} alt="" />
                        </div>
                        <div className="img-onside" onClick={() => handleImageClick(p_img45)}>
                            <img src={p_img45} alt="" />
                        </div>
                        <div className="img-onside" onClick={() => handleImageClick(p_img45)}>
                            <img src={p_img45} alt="" />
                        </div>
                    </div>
                    <div className="main-image">
                        <img src={mainImage} alt="" />
                    </div>
                </div>
                <div className="product-detail">
                    <h1 className="product-name">
                        Men Round Neck Pure Cotton T-shirt
                    </h1>
                    <p className="product-price">
                        $24
                    </p>
                    <p className="product-description">
                        A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                    </p>
                    <div className="size-selection">
                        <p>Select Size</p>
                        <div className="size-options">
                            <div className="size-option">S</div>
                            <div className="size-option">M</div>
                            <div className="size-option">L</div>
                            <div className="size-option">XL</div>
                            <div className="size-option">XXL</div>
                        </div>
                    </div>
                    <div className="cart-btn">
                        <button>Add to Cart</button>
                    </div>
                    <hr />
                    <p style={{ fontSize: "14px", color: "#8a8e91" }}>
                        100% Original product. <br />
                        Cash on delivery is available on this product. <br />
                        Easy return and exchange policy within 7 days.
                    </p>
                </div>
            </div>
        </>
    );
};