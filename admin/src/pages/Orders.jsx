import React, { useState, useEffect } from 'react';
import box from '../assets/box.png';
import '../components/styles/order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Order Placed');

  useEffect(() => {
    // Simulate fetching data from API

    let accessToken = localStorage.getItem('accessToken');

    const fetchOrders = async () => {
      const response = await fetch('http://localhost:5000/api/orders/get-all-orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }); // Replace with your API endpoint
      const data = await response.json();
      setOrders(data.orders);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    let accessToken = localStorage.getItem('accessToken');
  
    const updateOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/update-order/${id}/${newStatus}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          return false; // Handle failure
        }
        const data = await response.json();
        console.log(data);
        return true; // Successful update
      } catch (error) {
        console.error("Error updating order:", error);
        return false; // Handle error
      }
    };
  
    // Await the result of updateOrders
    const res = await updateOrders();
  
    if (res) {
      // Update the local state only if the API call was successful
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, orderStatus: newStatus } : order
        )
      );
    }
  };
  

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div className="order" key={order._id}>
          <div className="order-logo">
            <img
              src={box}
              alt="Order Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="order-item-detail">
            <div className="order-items-name">
              {order.products.map((item) => (
                <p key={item._id}>
                  {item.product.name} x {item.quantity}
                </p>
              ))}
            </div>
            <h5>{`${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`}</h5>
            <div className="order-customer-info">
              <p>
                {order.deliveryInfo.street}, {order.deliveryInfo.city},{' '}
                {order.deliveryInfo.country}, {order.deliveryInfo.zipcode}
              </p>
            </div>
          </div>
          <div className="order-details">
            <ul>
              <li>Items: {order.products.length}</li>
              <li>Total: ${order.orderTotal}</li>
              <li>Payment: {order.paymentMethod === 'cash-on-delivery'?"COD":order.paymentMethod}</li>
            </ul>
          </div>
          <div className="order-price">
            <p>${order.orderTotal}</p>
          </div>
          <div className="order-actions">
            <select
              value={order.orderStatus}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
