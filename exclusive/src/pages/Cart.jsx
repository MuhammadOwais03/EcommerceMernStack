import React, { useState, useEffect, useContext } from "react";
import "../../components/styles/cart.css";
import p_img1 from '../assets/p_img1.png'
import { fetchData } from "../../server";
import { TotalContext } from "../TotalContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Cart = ({ products, userData, setCartCount }) => {
    const { total, setTotal } = useContext(TotalContext);
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

    useEffect(() => {
        if (userData?.cartData && products) {
            const items = [];
            Object.entries(userData.cartData).forEach(([productId, sizes]) => {
                const product = products.find((p) => p._id === productId);
                if (product) {
                    Object.entries(sizes).forEach(([size, quantity]) => {
                        items.push({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            size,
                            quantity,
                            image: product.images[0] || 'default-image-url.png', // Provide fallback for image
                        });
                    });
                }
            });
            setCartItems(items);
        }
    }, [userData, products]);


    const shippingFee = 10;



    const handleQuantityChange = (id, size, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.size === size
                    ? { ...item, quantity: Math.max(quantity, 1) }
                    : item
            )
        );

        let accessToken = localStorage.getItem("accessToken");
        let userId = localStorage.getItem("userId");

        const data = {
            userId,
            productId: id,
            sizeType: size,
            quantity,
        };


        fetchData("cart/update-cart", data, "POST", accessToken)
            .then((response) => {
                if (response?.status === 200) {
                    console.log("Cart updated successfully", response);

                } else {
                    console.error("Failed to update item quantity:", response?.message || "Unknown error");
                    toast.error("An error occurred while updating the item quantity. Please try again.");
                }
            })
            .catch((error) => { 
                console.error("Error updating item:", error); 
                toast.error("An error occurred while updating the item. Please try again.");
            });
    };


    const handleRemoveItem = (id, size) => {

        let accessToken = localStorage.getItem('accessToken')
        let userId = localStorage.getItem('userId')

        let data = {
            userId: userId,
            productId: id,
            sizeType: size
        }



        fetchData('cart/remove-cart', data, 'POST', accessToken)
            .then((response) => {
                if (response?.status === 200) {
                    setCartItems((prevItems) => prevItems.filter((item) => item.id + item.size !== id + size));
                    setCartCount(response.cartCount);
                    toast.success('Item removed from cart');
                    console.log("Item removed successfully", response);
                } else {
                    console.error("Failed to remove item:", response?.message || "Unknown error");
                }
            })
            .catch((error) => {
                console.error("Error while removing item:", error);
                toast.error("An error occurred while removing the item. Please try again.");
            });



    };

    const calculateSubtotal = () => {
        let total = 0;
        // return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });

        console.log(total)

        return total;
    };

    const calculateTotal = () => {
        const newTotal = calculateSubtotal() + shippingFee; // Compute the total
        setTotal(newTotal); // Update the state
        console.log(newTotal, total); // Log the newly calculated total
        return newTotal; // Return the total value
    };
    




    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id + item.size}>
                        <div className="cart-item-left">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="cart-item-detail">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <p>Size: {item.size}</p>
                            </div>
                        </div>
                        <div className="cart-item-quantity">
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value))}
                            />
                        </div>
                        <div className="item-details">
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveItem(item.id, item.size)}
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
                <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
            </div>
        </div>
    );
};

export default Cart;
