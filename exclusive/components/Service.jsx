import React from 'react'
import exchange_icon from '../src/assets/exchange_icon.png'
import quality_icon from '../src/assets/quality_icon.png'
import support_icon from '../src/assets/support_img.png'
import './styles/service.css'


// export const Service = () => {
//     return (
//         <div className="service-container">
//             <div className="ser">
//                 <img src={exchange_icon} alt="" />
//                 <p className='bold' >Easy Exchange</p>
//                 <p className='light' >We offer hassle free exchange policy</p>
//             </div>
//             <div className="ser">
//                 <img src={quality_icon} alt="" />
//                 <p className='bold' >Easy Exchange</p>
//                 <p className='light' >We offer hassle free exchange policy</p>
//             </div>
//             <div className="ser">
//                 <img src={support_icon} alt="" />
//                 <p className='bold' >Easy Exchange</p>
//                 <p className='light' >We offer hassle free exchange policy</p>
//             </div>


//         </div>
//     )
// }


export const Service = () => {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Easy Exchange",
      description: "We offer hassle free exchange policy"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "7 Days Return",
      description: "We provide 7 days free return policy"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Best Customer Support",
      description: "We provide 24/7 customer support"
    }
  ];

  return (
    <div className="relative px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
              Why Choose Us
            </span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Our Promise to You
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-900/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Have questions? Our team is here to help you find the perfect fit.
          </p>
          <a 
            href="/contact-us" 
            className="inline-flex items-center gap-2 text-gray-900 font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

