// import React, { useState, useEffect } from "react";
// import "../../components/styles/sign.css";
// import { fetchData, stack } from "../../server";
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';


// function Sign({ setMenuOpen, setUserId, setIsLogin, isLogin }) {
//   const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Login
//   const { Type } = useParams();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigation = useNavigate();
//   console.log(stack);

//   const toggleForm = () => {
//     setIsSignUp(!isSignUp);
//   };

//   useEffect(() => {

//     console.log(Type)
//     setMenuOpen(false);

//     if (Type.toLowerCase() === 'login') {
//       setIsSignUp(false)
//     } else if (Type.toLowerCase() === 'signup') {
//       setIsSignUp(true)
//     } else {
//       if (!isLogin && isSignUp) {
//         setIsSignUp(false)
//       }
//     }


//   }, [Type])


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(name, email, password)

//     if (isSignUp) {
//       // Sign Up
//       const data = {
//         name: name,
//         email: email,
//         password: password,
//         password2: confirmPassword
//       }


//       console.log(data);

//       fetchData('users/register', data, 'POST').then((response) => {
//         console.log(response);
//         if (response.statusCode === 201) {
//           setIsSignUp(false);
//         }
//         else {
//           alert(res.message);
//         }
//       }).catch((error) => {
//         console.error('Error signing up:', error);
//       });
//     }
//     else {
//       // Login
//       const data = {
//         email: email,
//         password: password
//       }

//       fetchData('users/login', data, 'POST').then((response) => {
//         console.log(response);
//         if (response.statusCode === 200) {
//           localStorage.setItem('accessToken', response.data.accessToken);
//           setUserId(response.data.user._id);
//           localStorage.setItem('userId', response.data.user._id);
//           if (stack.length > 0) {
//             const path = stack.pop();
//             navigation(path);
//           }
//           else {
//             navigation('/');
//           }
//         }
//         else {
//           toast.error(response.message);

//         }
//       }).catch((error) => {
//         console.error('Error logging in:', error);
//       });
//     }

//   }

//   return (
//     <div className="container">
//       <div className="form-wrapper">
//         <h1 className="form-title">{isSignUp ? "Sign Up" : "Login"} <span className="line"></span> </h1>
//         <form onSubmit={handleSubmit}>
//           {/* Name Field (only for Sign Up) */}
//           {isSignUp && (
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="form-input"
//                 required
//                 onChange={(event) => setName(event.target.value)}
//               />
//             </div>
//           )}

//           {/* Email Field */}
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email"
//               className="form-input"
//               required
//               onChange={(event) => setEmail(event.target.value)}
//             />
//           </div>

//           {/* Password Field */}
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               className="form-input"
//               required
//               onChange={(event) => setPassword(event.target.value)}
//             />
//           </div>
//           {isSignUp && (
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="form-input"
//                 required
//                 onChange={(event) => setConfirmPassword(event.target.value)}
//               />
//             </div>
//           )}

//           {/* Links */}
//           <div className="form-links">
//             {isSignUp ? (
//               <a href="#" className="form-link">
//                 Forgot your password?
//               </a>
//             ) : (
//               <a href="#" className="form-link">
//                 Forgot your password?
//               </a>
//             )}
//             <button
//               type="button"
//               className="form-link-button"
//               onClick={toggleForm}
//             >
//               {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="form-button">
//             {isSignUp ? "Sign Up" : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Sign;


import React, { useState, useEffect } from "react";
import { fetchData, stack } from "../../server";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sign({ setMenuOpen, setUserId, setIsLogin, isLogin }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const { Type } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    console.log(Type);
    setMenuOpen(false);

    if (Type.toLowerCase() === 'login') {
      setIsSignUp(false);
    } else if (Type.toLowerCase() === 'signup') {
      setIsSignUp(true);
    } else {
      if (!isLogin && isSignUp) {
        setIsSignUp(false);
      }
    }
  }, [Type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, email, password);

    if (isSignUp) {
      const data = {
        name: name,
        email: email,
        password: password,
        password2: confirmPassword
      };

      console.log(data);

      fetchData('users/register', data, 'POST').then((response) => {
        console.log(response);
        if (response.statusCode === 201) {
          setIsSignUp(false);
        } else {
          alert(response.message);
        }
      }).catch((error) => {
        console.error('Error signing up:', error);
      });
    } else {
      const data = {
        email: email,
        password: password
      };

      fetchData('users/login', data, 'POST').then((response) => {
        console.log(response);
        if (response.statusCode === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          setUserId(response.data.user._id);
          localStorage.setItem('userId', response.data.user._id);
          if (stack.length > 0) {
            const path = stack.pop();
            navigation(path);
          } else {
            navigation('/');
          }
        } else {
          toast.error(response.message);
        }
      }).catch((error) => {
        console.error('Error logging in:', error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-black"></span>
              <span className="w-8 h-0.5 bg-black"></span>
              <span className="w-8 h-0.5 bg-gradient-to-r from-black to-transparent"></span>
            </div>
            <p className="text-gray-600 mt-4">
              {isSignUp ? "Sign up to get started" : "Sign in to your account"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Name Field (only for Sign Up) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {/* Confirm Password (only for Sign Up) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-3 pt-2">
              {!isSignUp && (
                <a 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Forgot your password?
                </a>
              )}
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-300 text-left"
                onClick={toggleForm}
              >
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3.5 rounded-lg font-semibold text-base hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-105 mt-6"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            {/* <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div> */}
          </div>

          {/* Social Login Buttons */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:border-gray-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:border-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div> */}
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing, you agree to our{" "}
          <a href="#" className="text-black hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-black hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

export default Sign;