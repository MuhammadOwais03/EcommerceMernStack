import React, { useState, useContext, useEffect } from "react";
import "../../components/styles/checkout.css";
import stripe_logo from "../assets/stripe_logo.png";
import { TotalContext } from "../TotalContext";
import { fetchData } from "../../server";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = ({setMenuOpen, setOrders, setCartCount}) => {
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


  useEffect(()=>{
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
          alert("Order placed successfully!");
          // navigation("/orders");
        } else {
          console.log("400")
          toast.error(response.message);
        }
  }).catch((error) => {
    console.error("Error placing order:", error);
    toast.error("An error occurred while placing the order. Please  try again.");
  }); 
      

  };

  return (
    <div className="checkout-container">
      <div className="delivery-info">
        <h2>
          DELIVERY <span>INFORMATION</span>
        </h2>
        <form className="delivery-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={order.deliveryInfo.firstName}
              onChange={handleDeliveryChange}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={order.deliveryInfo.lastName}
              onChange={handleDeliveryChange}
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={order.deliveryInfo.email}
            onChange={handleDeliveryChange}
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={order.deliveryInfo.street}
            onChange={handleDeliveryChange}
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={order.deliveryInfo.city}
              onChange={handleDeliveryChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={order.deliveryInfo.state}
              onChange={handleDeliveryChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={order.deliveryInfo.zipcode}
              onChange={handleDeliveryChange}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={order.deliveryInfo.country}
              onChange={handleDeliveryChange}
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={order.deliveryInfo.phone}
            onChange={handleDeliveryChange}
          />
        </form>
      </div>

      <div className="cart-summary">
        <div className="cart-totals">
          <h2>
            CART <span>TOTALS</span>
          </h2>
          <div className="totals-item">
            <span>Subtotal</span>
            <span>{order.cartSummary.subtotal}</span>
          </div>
          <div className="totals-item">
            <span>Shipping Fee</span>
            <span>${order.cartSummary.shippingFee}.00</span>
          </div>
          <div className="totals-item total">
            <span>Total</span>
            <span>{order.cartSummary.total}</span>
          </div>
        </div>

        <div className="payment-method">
          <h2>
            PAYMENT <span>METHOD</span>
          </h2>
          <div className="payment-options">
            <button
              type="button"
              className={order.paymentMethod === "stripe" ? "active" : ""}
              onClick={() => handlePaymentChange("stripe")}
            >
              <img src={stripe_logo} alt="Stripe" />
            </button>

            <button
              type="button"
              className={
                order.paymentMethod === "cash-on-delivery" ? "active" : ""
              }
              onClick={() => handlePaymentChange("cash-on-delivery")}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;
