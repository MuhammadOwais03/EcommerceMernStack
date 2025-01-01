import React from "react";
import "../../components/styles/ordersList.css";

const OrdersList = () => {
  const orders = [
    {
      id: 1,
      image: "https://via.placeholder.com/100", // Replace with actual image URL
      name: "Men Round Neck Pure Cotton T-shirt",
      price: "$64",
      quantity: 1,
      size: "XXL",
      date: "Wed Jan 01 2025",
      payment: "COD",
      status: "Shipped",
    },
  ];

  return (
    <div className="orders-container">
      <h2>
        MY <span>ORDERS</span>
      </h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <img src={order.image} alt={order.name} className="order-image" />
            <div className="order-details">
              <h3>{order.name}</h3>
              <p>
                {order.price} &nbsp; Quantity: {order.quantity} &nbsp; Size:{" "}
                {order.size}
              </p>
              <p>Date: {order.date}</p>
              <p>Payment: {order.payment}</p>
            </div>
            <div className="order-status">
              <span className="status-dot"></span>
              {order.status}
            </div>
            <button className="track-order-btn">Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
