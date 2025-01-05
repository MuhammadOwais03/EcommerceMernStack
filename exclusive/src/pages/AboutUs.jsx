import React, {useEffect} from 'react';
import '../../components/styles/about.css'
import about_img from '../assets/about_img.png'

const AboutUs = ({setMenuOpen}) => {

  useEffect(()=>{
    setMenuOpen(false)
  },[])

  return (
    <div className="about-us">
      <section className="about-us-section">
        <h2 className="section-title">ABOUT <span>US</span></h2>
        <div className="about-us-content">
          <img
            src={about_img} // Replace with actual image URL
            alt="About us"
            className="about-us-image"
          />
          <div className="about-us-text">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with
              a simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p>
              Since our inception, we’ve worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h3>Our Mission</h3>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We’re dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="why-choose-us-section">
        <h2 className="section-title">WHY <span>CHOOSE US</span></h2>
        <div className="features">
          <div className="feature">
            <h4>Quality Assurance:</h4>
            <p>
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="feature">
            <h4>Convenience:</h4>
            <p>
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="feature">
            <h4>Exceptional Customer Service:</h4>
            <p>
              Our team of dedicated professionals is here to assist you every
              step of the way, ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>

      <section className="subscribe-section">
        <h2>Subscribe now & get <span>20%</span> off</h2>
        <p>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />
          <button type="submit" className="subscribe-button">SUBSCRIBE</button>
        </form>
      </section>
    </div>
  );
};

export default AboutUs;
