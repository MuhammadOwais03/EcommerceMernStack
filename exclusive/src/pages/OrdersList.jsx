import React, {useEffect} from "react";
import "../../components/styles/ordersList.css";

// const OrdersList = ({setMenuOpen, orders }) => {


//   useEffect(()=>{
//     setMenuOpen(false)
//     },[])

//   console.log(orders); // logs all the orders with products
//   return (
//     <div className="orders-container">
//       <h2>
//         MY <span>ORDERS</span>
//       </h2>
//       <div className="orders-list">
//         {orders.map((order) => (
//           <React.Fragment key={order._id}>
//             <div className="order-header">
//               <h2>Order: {new Date(order.createdAt).toLocaleString()}</h2>
//               <p>Order Total: ${order.orderTotal}</p>
//             </div>
//             {order.products.map((item) => (
//               <div className="order-item" key={item.product._id}>
//                 <img
//                   src={item.product.images?.[0] || "https://via.placeholder.com/100"}
//                   alt={item.product.name || "Product Image"}
//                   className="order-image"
//                 />
//                 <div className="order-details">
//                   <h3>{item.product.name || "Product Name"}</h3>
//                   <p>
//                     {item.product.price ? `$${item.product.price}` : "Price Unavailable"} &nbsp;
//                     Quantity: {item.quantity || 0} &nbsp;
//                     Size: {item.size || "N/A"}
//                   </p>
//                   <p>Date: {new Date(order.createdAt).toDateString()}</p>
//                   <p>Payment: {order.paymentMethod}</p>
//                 </div>
//                 <div className="order-status">
//                   <span className={`status-dot ${order.orderStatus.toLowerCase()}`}></span>
//                   {order.orderStatus}
//                 </div>
//                 <div className="order-footer">
//                   <button className="track-order-btn">Track Order</button>
//                 </div>
//               </div>
//             ))}

//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

const OrdersList = ({ setMenuOpen, orders }) => {

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  console.log(orders);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
              Order History
            </span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            <span className="text-gray-500">MY </span>
            <span className="text-gray-900">ORDERS</span>
          </h2>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-white font-semibold text-base md:text-lg">
                    Order: {new Date(order.createdAt).toLocaleString()}
                  </h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-white font-bold text-sm md:text-base">
                    Total: ${order.orderTotal}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100">
                {order.products.map((item) => (
                  <div key={item.product._id} className="p-6 hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-full md:w-32 h-40 md:h-32 bg-gray-100 rounded-xl overflow-hidden shadow-md">
                          <img
                            src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                            alt={item.product.name || "Product Image"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">
                          {item.product.name || "Product Name"}
                        </h4>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-gray-900">
                              {item.product.price ? `$${item.product.price}` : "Price Unavailable"}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>Quantity: <span className="font-semibold text-gray-900">{item.quantity || 0}</span></span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span>Size: <span className="font-semibold text-gray-900">{item.size || "N/A"}</span></span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(order.createdAt).toDateString()}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            {order.paymentMethod}
                          </div>
                        </div>
                      </div>

                      {/* Order Status */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            order.orderStatus.toLowerCase() === 'delivered' ? 'bg-green-500' :
                            order.orderStatus.toLowerCase() === 'pending' ? 'bg-yellow-500' :
                            order.orderStatus.toLowerCase() === 'cancelled' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}></span>
                          <span className="text-sm font-semibold text-gray-900">
                            {order.orderStatus}
                          </span>
                        </div>

                        <button className="bg-black text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <a 
              href="/collections" 
              className="text-white inline-flex items-center gap-2 bg-black  px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg"
              style={{color:"white"}}
            >
              Start Shopping
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
