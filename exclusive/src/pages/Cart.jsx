import React, { useState } from "react";
import "../../components/styles/cart.css";
import p_img1 from '../assets/p_img1.png'

const Cart = ({products}) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Kid Tapered Slim Fit Trouser",
            price: 38,
            size: "M",
            quantity: 1,
            image: p_img1, // Replace with your image URL
        },
        {
            id: 2,
            name: "Kid Tapered Slim Fit Trouser",
            price: 38,
            size: "XXL",
            quantity: 1,
            image: p_img1, // Replace with your image URL
        },
    ]);

    const shippingFee = 10;

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + shippingFee;
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-left">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="cart-item-detail">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <p>Size: {item.size}</p>
                            </div>
                        </div>
                        <div className="cart-item-qunatity">
                        <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            />
                        </div>
                        <div className="item-details">
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                &#128465;
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-totals">
                <h3>Cart Totals</h3>
                <div className="totals-item">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="totals-item">
                    <span>Shipping Fee</span>
                    <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="totals-item">
                    <strong>Total</strong>
                    <strong>${calculateTotal().toFixed(2)}</strong>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
