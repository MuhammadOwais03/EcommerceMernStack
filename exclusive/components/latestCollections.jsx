import React, {useState, useEffect} from "react";
import "./styles/latestCollection.css";

import p_img6 from "../src/assets/p_img6.png";
import p_img8 from "../src/assets/p_img8.png";
import p_img9 from "../src/assets/p_img9.png";
import p_img15 from "../src/assets/p_img15.png";
import p_img24 from "../src/assets/p_img24.png";
import p_img35 from "../src/assets/p_img35.png";
import p_img36 from "../src/assets/p_img36.png";
import p_img38 from "../src/assets/p_img38.png";
import p_img47 from "../src/assets/p_img47.png";
import p_img51 from "../src/assets/p_img51.png";
import { Link } from "react-router-dom";


const LatestCollections = ({ products }) => {
  const [collections, setCollections] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setCollections(products.slice(0, 10));
  }, [products]);

  return (
    <div className="relative px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
              New Arrivals
            </span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-3">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Latest Collections
            </span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium fashion pieces designed to elevate your style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {collections.map((item, index) => (
            <a 
              key={index} 
              href={`/product/${item._id}`}
              className="group cursor-pointer block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* Quick View Badge */}
                <div className={`absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  Quick View
                </div>
                
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Action buttons */}
                <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <button className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-black transition-colors duration-300 line-clamp-1">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    ${item.price}
                  </p>
                  
                  {/* Rating stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                    {/* Color options
                    <div className="flex gap-1.5 pt-1">
                    <span className="w-5 h-5 rounded-full bg-black border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                    <span className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                    <span className="w-5 h-5 rounded-full bg-blue-400 border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"></span>
                    </div> */}
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <a 
            href="/collections" 
            className="group inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-semibold text-sm md:text-base hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="text-white">View All Collections</span>
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


export default LatestCollections;
