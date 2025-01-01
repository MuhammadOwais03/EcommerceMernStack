import React, { useState, useContext } from "react";
import "../../components/styles/checkout.css";
import stripe_logo from '../assets/stripe_logo.png';
import { TotalContext } from "../TotalContext";

const Checkout = () => {
    const { total } = useContext(TotalContext);
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

  console.log("Total in Checkout:", total);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    alert(`Order placed with ${paymentMethod} payment method!`);
  };

  return (
    <div className="checkout-container">
      <div className="delivery-info">
        <h2>
          DELIVERY <span>INFORMATION</span>
        </h2>
        <form className="delivery-form">
          <div className="form-row">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="form-row">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Zipcode" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone" />
        </form>
      </div>

      <div className="cart-summary">
        <div className="cart-totals">
          <h2>
            CART <span>TOTALS</span>
          </h2>
          <div className="totals-item">
            <span>Subtotal</span>
            <span>{total - 10}</span>
          </div>
          <div className="totals-item">
            <span>Shipping Fee</span>
            <span>$10.00</span>
          </div>
          <div className="totals-item total">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>

        <div className="payment-method">
          <h2>
            PAYMENT <span>METHOD</span>
          </h2>
          <div className="payment-options">
            <button
              type="button"
              className={paymentMethod === "stripe" ? "active" : ""}
              onClick={() => handlePaymentChange("stripe")}
            >
              <img
                src={stripe_logo}
                alt="Stripe"
              />
            </button>
            
            <button
              type="button"
              className={paymentMethod === "cash-on-delivery" ? "active" : ""}
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
