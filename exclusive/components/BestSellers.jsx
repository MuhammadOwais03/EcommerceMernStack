import React, {useState, useEffect} from "react";
import "./styles/latestCollection.css";



const BestSellers = ({ products }) => {
  const [collections, setCollections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const bestSellers = products.filter(product => product.bestSellers === true);
    setCollections(bestSellers.slice(0, 5));
  }, [products]);

  return (
    <div className="relative px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-white">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
              Customer Favorites
            </span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-3">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Best Sellers
            </span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Our most loved products, chosen by thousands of satisfied customers worldwide.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {collections.map((item, index) => (
            <a 
              key={index} 
              href={`/product/${item._id}`}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Bestseller Rank Badge */}
              <div className="absolute -top-3 -left-3 z-20 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                #{index + 1}
              </div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[2/4] overflow-hidden bg-gray-100">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Bestseller Badge */}
                  <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    Bestseller
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
                    activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button className="flex-1 bg-white text-black py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg">
                      Add to Cart
                    </button>
                    <button className="bg-white text-black p-2.5 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">(2.5k)</span>
                  </div>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      ${item.price}
                    </p>
                    <span className="text-xs text-gray-500 font-medium">In stock</span>
                  </div>

                  {/* Color options
                  <div className="flex gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-black border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                    <span className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                    <span className="w-5 h-5 rounded-full bg-gray-200 border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                  </div> */}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Shop All Button */}
        <div className="text-center mt-16">
          <a 
            href="/bestsellers" 
            className="group inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-semibold text-sm md:text-base hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="text-white">Shop All Bestsellers</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};


export default BestSellers;
