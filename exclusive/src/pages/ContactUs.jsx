import React, {useEffect} from 'react';
import contact_img from '../assets/contact_img.png';

const ContactUs = ({setMenuOpen}) => {
  useEffect(()=>{
      setMenuOpen(false)
    },[])
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          CONTACT <span className="text-gray-900">US</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-12">
          {/* Left Section */}
          <div className="w-full">
            <img
              src={contact_img}
              alt="Office setup"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Our Store</h3>
              <p className="text-gray-700 leading-relaxed">
                54709 Willms Station<br />Suite 350, Washington, USA
              </p>
              <p className="text-gray-700 leading-relaxed">
                Tel: (415) 555-0132<br />Email: admin@forever.com
              </p>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Careers at Forever</h3>
              <p className="text-gray-700 leading-relaxed">
                Learn more about our teams and job openings.
              </p>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 active:bg-black transition-colors shadow-sm">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;