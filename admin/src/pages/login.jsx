import React, { useState } from "react";
import "../components/styles/sign.css";
import { Navigate } from 'react-router-dom';

const postRequest = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  return response.json();
};

function Sign({setMyLocalStorageValue}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 

    const data = { email, password };
    console.log("Data:", data); 
    try {
      const response = await postRequest(
        "http://localhost:5000/api/users/admin-login",
        data
      );
      console.log("Login Successful:", response);
      const accessToken = response.data.token
      localStorage.setItem('accessToken', accessToken)
      setMyLocalStorageValue(accessToken)
      return <Navigate to="/add" />;

      
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Admin Login <span className="line"></span> </h1>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          
          

          {/* Submit Button */}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
