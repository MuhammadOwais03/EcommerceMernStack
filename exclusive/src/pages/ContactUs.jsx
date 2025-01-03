import React from 'react';
import '../../components/styles/contact.css';
import contact_img from '../assets/contact_img.png';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2 className="contact-title">CONTACT <span>US</span></h2>
      <div className="contact-container">
        {/* Left Section */}
        <div className="contact-image-container">
          <img
            src={contact_img} // Replace with the actual image URL
            alt="Office setup"
            className="contact-image"
          />
        </div>

        {/* Right Section */}
        <div className="contact-details">
          <div className="store-info">
            <h3>Our Store</h3>
            <p>54709 Willms Station<br />Suite 350, Washington, USA</p>
            <p>Tel: (415) 555-0132<br />Email: admin@forever.com</p>
          </div>
          <div className="careers-info">
            <h3>Careers at Forever</h3>
            <p>Learn more about our teams and job openings.</p>
            <button className="explore-jobs-button">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
