import React, { useState } from "react";
import "../../components/styles/sign.css";

function Sign() {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Login

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">{isSignUp ? "Sign Up —" : "Login —"}</h1>
        <form>
          {/* Name Field (only for Sign Up) */}
          {isSignUp && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                required
              />
            </div>
          )}

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
            {isSignUp ? (
              <a href="#" className="form-link">
                Forgot your password?
              </a>
            ) : (
              <a href="#" className="form-link">
                Forgot your password?
              </a>
            )}
            <button
              type="button"
              className="form-link-button"
              onClick={toggleForm}
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
