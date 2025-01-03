import React, {useEffect} from "react";
import "../../components/styles/ordersList.css";

const OrdersList = ({setMenuOpen, orders }) => {


  useEffect(()=>{
    setMenuOpen(false)
    },[])

  console.log(orders); // logs all the orders with products
  return (
    <div className="orders-container">
      <h2>
        MY <span>ORDERS</span>
      </h2>
      <div className="orders-list">
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <div className="order-header">
              <h2>Order: {new Date(order.createdAt).toLocaleString()}</h2>
              <p>Order Total: ${order.orderTotal}</p>
            </div>
            {order.products.map((item) => (
              <div className="order-item" key={item.product._id}>
                <img
                  src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.product.name || "Product Image"}
                  className="order-image"
                />
                <div className="order-details">
                  <h3>{item.product.name || "Product Name"}</h3>
                  <p>
                    {item.product.price ? `$${item.product.price}` : "Price Unavailable"} &nbsp;
                    Quantity: {item.quantity || 0} &nbsp;
                    Size: {item.size || "N/A"}
                  </p>
                  <p>Date: {new Date(order.createdAt).toDateString()}</p>
                  <p>Payment: {order.paymentMethod}</p>
                </div>
                <div className="order-status">
                  <span className={`status-dot ${order.orderStatus.toLowerCase()}`}></span>
                  {order.orderStatus}
                </div>
                <div className="order-footer">
                  <button className="track-order-btn">Track Order</button>
                </div>
              </div>
            ))}

          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
