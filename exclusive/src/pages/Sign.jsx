import React from "react";
import "../../components/styles/sign.css";

function Sign() {
  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Sign Up —</h1>
        <form>
          {/* Name Field */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              required
            />
          </div>

          {/* Links */}
          <div className="form-links">
            <a href="#" className="form-link">
              Forgot your password?
            </a>
            <a href="#" className="form-link">
              Login Here
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
