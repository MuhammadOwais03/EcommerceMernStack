


import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../../server";
import { TotalContext } from "../TotalContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ isLogin, setMenuOpen, products, userData, setCartCount }) => {
    const { total, setTotal } = useContext(TotalContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setMenuOpen(false);
    }, []);

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
                            image: product.images[0] || 'default-image-url.png',
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
        let accessToken = localStorage.getItem('accessToken');
        let userId = localStorage.getItem('userId');

        let data = {
            userId: userId,
            productId: id,
            sizeType: size
        };

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
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        console.log(total);
        return total;
    };

    const calculateTotal = () => {
        const newTotal = calculateSubtotal() + shippingFee;
        setTotal(newTotal);
        console.log(newTotal, total);
        return newTotal;
    };
    
    if (isLogin === false) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart</h2>
                    <p className="text-gray-600 mb-8">Please log in to view your cart</p>
                    <Link 
                        to="/sign/login" 
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg"
                    >
                        Log In
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        );  
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart</h2>
                    <p className="text-gray-600 mb-8">Your cart is empty</p>
                    <Link 
                        to="/collections" 
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg"
                        style={{color:"white"}}
                    >
                        Start Shopping
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
                        <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
                            Shopping Cart
                        </span>
                        <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h2>
                    <p className="text-gray-600 mt-2">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id + item.size} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-100 rounded-xl overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                                                <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                    ${item.price}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id, item.size)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                            <span>Size: <span className="font-semibold text-gray-900">{item.size}</span></span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value))}
                                                    className="w-16 px-3 py-2 text-center font-semibold text-gray-900 focus:outline-none"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Shipping Fee</span>
                                    <span className="font-semibold text-gray-900">${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="w-full h-px bg-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        ${calculateTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link 
                                to="/checkout" 
                                className="block w-full bg-black text-white py-4 rounded-full font-bold text-center hover:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:scale-105"
                                style={{color:"white"}}
                            >
                                Proceed to Checkout
                            </Link>

                            {/* Additional Info */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Free shipping on orders over $100</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Easy returns within 7 days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;