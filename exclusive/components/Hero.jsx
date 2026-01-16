

import React from 'react';
 import hero_img from '../src/assets/hero_img.png'

const Hero = () => {
  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
           src={hero_img}
          alt="Hero section showcasing our latest arrivals" 
          className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite]"
          style={{ animationName: 'subtle-zoom' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center h-full min-h-[600px] md:min-h-[700px]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl space-y-8 animate-[fadeIn_1s_ease-out]">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <span className="w-8 h-0.5 bg-white"></span>
              <span className="text-xs md:text-sm font-semibold text-white tracking-[0.2em] uppercase">
                Our Bestsellers
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
              Latest
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Arrivals
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-gray-200 max-w-lg leading-relaxed">
              Discover our curated collection of premium fashion pieces that define modern elegance and timeless style.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/collections" 
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Shop Now</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              <a 
                href="/collections" 
                className="group inline-flex items-center justify-center gap-3 bg-transparent text-white px-8 py-4 rounded-full font-semibold text-sm md:text-base border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                <span className='text-white'>View Collection</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-300 mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-300 mt-1">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">4.9★</div>
                <div className="text-sm text-gray-300 mt-1">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-white/5 backdrop-blur-lg rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-40 right-32 w-32 h-32 bg-white/5 backdrop-blur-lg rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>

      <style jsx>{`
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
