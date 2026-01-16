


import React, { useState, useContext, useEffect } from "react";
import stripe_logo from "../assets/stripe_logo.png";
import { TotalContext } from "../TotalContext";
import { fetchData } from "../../server";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = ({ setMenuOpen, setOrders, setCartCount }) => {
  const navigation = useNavigate();
  const { total } = useContext(TotalContext);
  const [order, setOrder] = useState({
    userId: localStorage.getItem("userId"),
    deliveryInfo: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    },
    paymentMethod: "cash-on-delivery",
    cartSummary: {
      subtotal: total - 10,
      shippingFee: 10,
      total: total,
    },
  });

  console.log("Order State:", order);

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      deliveryInfo: {
        ...prevOrder.deliveryInfo,
        [name]: value,
      },
    }));
  };

  const handlePaymentChange = (method) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      paymentMethod: method,
    }));
  };

  const handlePlaceOrder = () => {
    // alert(`Order placed with ${order.paymentMethod} payment method!`);
    console.log("Order Details:", order);

    let accessToken = localStorage.getItem("accessToken");

    fetchData("orders/create-order", order, "POST", accessToken).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("201")
          setOrders(response.order);
          setCartCount(0)
          toast.success("Order placed successfully!");
          // navigation("/orders");
        } else {
          console.log("400")
          toast.error(response.message);
        }
      }).catch((error) => {
        console.error("Error placing order:", error);
        toast.error("An error occurred while placing the order. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b-2 border-gray-900">
                  DELIVERY <span>INFORMATION</span>
                </h2>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={order.deliveryInfo.firstName}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={order.deliveryInfo.lastName}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={order.deliveryInfo.email}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                />
                <input
                  type="text"
                  placeholder="Street"
                  name="street"
                  value={order.deliveryInfo.street}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={order.deliveryInfo.city}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={order.deliveryInfo.state}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    name="zipcode"
                    value={order.deliveryInfo.zipcode}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={order.deliveryInfo.country}
                    onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={order.deliveryInfo.phone}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                />
              </form>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Cart Totals */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b-2 border-gray-900 mb-6">
                  CART <span>TOTALS</span>
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${order.cartSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Shipping Fee</span>
                    <span className="font-medium">${order.cartSummary.shippingFee}.00</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">${order.cartSummary.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b-2 border-gray-900 mb-6">
                  PAYMENT <span>METHOD</span>
                </h2>

                <div className="space-y-3">
                  <button
                    type="button"
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      order.paymentMethod === "stripe"
                        ? "border-gray-900 bg-gray-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePaymentChange("stripe")}
                  >
                    <img src={stripe_logo} alt="Stripe" className="h-6 mx-auto" />
                  </button>

                  <button
                    type="button"
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      order.paymentMethod === "cash-on-delivery"
                        ? "border-gray-900 bg-gray-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePaymentChange("cash-on-delivery")}
                  >
                    <span className="font-medium text-gray-900">CASH ON DELIVERY</span>
                  </button>
                </div>
              </div>

              <button 
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 active:bg-black transition-colors shadow-sm" 
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;