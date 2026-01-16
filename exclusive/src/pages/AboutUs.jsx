import React, {useEffect} from 'react';
import about_img from '../assets/about_img.png'

const AboutUs = ({setMenuOpen}) => {

  useEffect(()=>{
    setMenuOpen(false)
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            ABOUT <span className="text-gray-900">US</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-12">
            <img
              src={about_img}
              alt="About us"
              className="w-full h-auto rounded-lg shadow-md"
            />
            
            <div className="space-y-6 text-gray-700">
              <p className="leading-relaxed">
                Forever was born out of a passion for innovation and a desire to
                revolutionize the way people shop online. Our journey began with
                a simple idea: to provide a platform where customers can easily
                discover, explore, and purchase a wide range of products from the
                comfort of their homes.
              </p>
              <p className="leading-relaxed">
                Since our inception, we've worked tirelessly to curate a diverse
                selection of high-quality products that cater to every taste and
                preference. From fashion and beauty to electronics and home
                essentials, we offer an extensive collection sourced from trusted
                brands and suppliers.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 pt-4">Our Mission</h3>
              <p className="leading-relaxed">
                Our mission at Forever is to empower customers with choice,
                convenience, and confidence. We're dedicated to providing a
                seamless shopping experience that exceeds expectations, from
                browsing and ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            WHY <span className="text-gray-900">CHOOSE US</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Quality Assurance:</h4>
              <p className="text-gray-700 leading-relaxed">
                We meticulously select and vet each product to ensure it meets our
                stringent quality standards.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Convenience:</h4>
              <p className="text-gray-700 leading-relaxed">
                With our user-friendly interface and hassle-free ordering process,
                shopping has never been easier.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Exceptional Customer Service:</h4>
              <p className="text-gray-700 leading-relaxed">
                Our team of dedicated professionals is here to assist you every
                step of the way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Subscribe now & get <span className="text-white" style={{color:"white"}}>20%</span> off
          </h2>
          <p className="text-gray-300 mb-8">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-white text-gray-900 focus:ring-2 focus:ring-white focus:border-transparent transition-all outline-none"
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;