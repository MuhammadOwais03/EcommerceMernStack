import React, { useState } from "react";
import "../../components/styles/sign.css";
import { fetchData, stack } from "../../server";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sign({setUserId}) {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Login
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigate();
  console.log(stack);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name,email,password)

    if (isSignUp) {
      // Sign Up
      const data = {
        name:name,
        email:email,
        password:password,
        password2:confirmPassword
      }


      console.log(data);

      fetchData('users/register',data,'POST').then((response) => {
        console.log(response);
        if(response.statusCode === 201) {
          setIsSignUp(false);
        }
        else {
          alert(res.message);
        }
      }).catch((error) => {
        console.error('Error signing up:',error);
      });
    }
    else {
      // Login
      const data = {
        email:email,
        password:password
      }

      fetchData('users/login',data,'POST').then((response) => {
        console.log(response);
        if(response.statusCode === 200) {
          localStorage.setItem('accessToken',response.data.accessToken);
          setUserId(response.data.user._id);
          localStorage.setItem('userId',response.data.user._id);
          if(stack.length > 0) {
            const path = stack.pop();
            navigation(path);
          }
          else {
            navigation('/');
          }
        }
        else {
          toast.error(response.message);
          
        }
      }).catch((error) => {
        console.error('Error logging in:',error);
      });
    }

  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">{isSignUp ? "Sign Up —" : "Login —"}</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field (only for Sign Up) */}
          {isSignUp && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                required
                onChange={(event) => setName(event.target.value)}
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
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input"
                required
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          )}

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
