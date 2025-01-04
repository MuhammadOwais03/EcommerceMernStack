import React from 'react'
import { Link } from 'react-router-dom'
import '../components/styles/footer.css'


export const Footer = () => {
  return (

    <>

      <div className="footer">
        <div className="footer-upper">
          <div className="footer-1">
            <h1>EXCLUSIVE<span className="dot">.</span></h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div className="footer-2">
            <h3>Company</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-3">
            <h3>Get In Touch</h3>
            <ul>
              <li>+1-000-000-0000</li>
              <li>owaisiqbal2021@gmail.com</li>
              <li><Link to="https://linkedin.com/in/muhammad-owais-1b782b269/" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>

            </ul>
          </div>
        </div>
        <div className="footer-lower" style={{ width: '100%', backgroundColor: '#000', padding: '1px 0', textAlign: 'center', color: '#fff' }}>
          <p>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
        </div>
      </div>

    </>
  )
}
