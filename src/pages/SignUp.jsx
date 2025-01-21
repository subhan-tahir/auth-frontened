import React, { useState,useEffect, useContext } from 'react';
import authVideo from '../assets/signupFormVideo.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { CircularProgress } from '@mui/material'; // Material UI spinner
import { ThemeContext } from '@emotion/react';

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  const homePage = useNavigate();
 const {theme} =  useContext(ThemeContext);
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) newErrors.username = 'Enter your name';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isOnline) {
      setErrors({ general: 'No internet connection. Please check your network.' });
      return;
    }
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log('Form not validated', formErrors);
      return;
    }
  
    try {
      setIsLoading(true)
      const signupResponse = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/employees`, { username, email, password });
      console.log(signupResponse)
      const getusernameFromresponse = signupResponse;
      console.log(getusernameFromresponse.data)
      console.log(signupResponse.data.success)
      if (signupResponse.data.success) {

        homePage('/');
      } else {
        setErrors({
          emailExist: response.data.msg || 'An account with that email address already exists. Please log in to continue.',
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
  
      if (error.response.status === 400) {
        setErrors({
          emailExist: error.response.data.msg,
        });
      } else {
        setErrors({
          general: 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  let passwordVisibilityHandler = () => {
    setPasswordVisible(!passwordVisible)
  }

  useEffect(() => {
          const updateOnlineStatus = () => setIsOnline(navigator.onLine);
  
          window.addEventListener('online', updateOnlineStatus);
          window.addEventListener('offline', updateOnlineStatus);
  
          return () => {
              window.removeEventListener('online', updateOnlineStatus);
              window.removeEventListener('offline', updateOnlineStatus);
          };
      }, []);

  return (
    <>
      <div className="flex w-full items-center flex-row relative gap-5 h-screen">
        {/* Auth Sidebar */}
        <section className="h-full md:flex hidden">
          <div className="w-[400px] h-full">
            <video
              src={authVideo}
              className="w-full object-cover h-full"
              autoPlay
              loop
              muted
            ></video>
          </div>
        </section>
        {/* Auth Content */}
        <section className="flex-1 h-full ml-auto relative z-20 p-2">
          <div className="flex h-full">
            <div className="signup-form h-full max-w-[600px] w-full md:ml-10 ml-0 mr-auto md:px-10 md:p-2">
              <form onSubmit={submitHandler}>
                {errors.emailExist && (
                  <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                    {errors.emailExist}
                  </div>
                )}
                <div className="md:py-6 py-1 md:mt-0 -mt-4  text-[2rem] underline text-center font-bold text-black">
                  <h1>Sign Up Now</h1>
                </div>
                {/* Username Field */}
                <div className="form-field-group gap-5 flex justify-between md:flex-nowrap flex-wrap">
                  <div className="form-field py-3 w-full">
                    <label htmlFor="username" className="font-bold text-[20px] pb-5">
                      Username
                    </label>
                    <div
                      className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${errors.username ? 'border-red-500' : formSubmitted ? 'border-green-500' : ''
                        }`}
                    >
                      <input
                        type="text"
                        id="username"
                        className="border-0 outline-none w-full bg-transparent"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      {formSubmitted && (
                        <span className="pl-2 text-xl">
                          {errors.username ? (
                            <FaExclamationCircle className="text-red-500" />
                          ) : (
                            <FaCircleCheck className="text-green-500" />
                          )}
                        </span>
                      )}
                    </div>
                    {errors.username && <p className="text-red-500 block w-full text-sm">{errors.username}</p>}
                  </div>
                </div>
                {/* Email Field */}
                <div className="form-field py-3">
                  <label htmlFor="email" className="font-bold text-[20px] pb-5">
                    Email
                  </label>
                  <div
                    className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${errors.email ? 'border-red-500' : formSubmitted ? 'border-green-500' : ''
                      }`}
                  >
                    <input
                      type="text"
                      id="email"
                      className="border-0 outline-none w-full bg-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {formSubmitted && (
                      <span className="pl-2 text-xl">
                        {errors.email ? (
                          <FaExclamationCircle className="text-red-500" />
                        ) : (
                          <FaCircleCheck className="text-green-500" />
                        )}
                      </span>
                    )}
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                {/* Password Field */}
                <div className="form-field py-3">
                  <label htmlFor="password" className="font-bold text-[20px] pb-5">
                    Password
                  </label>
                  <div
                    className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${errors.password ? 'border-red-500' : formSubmitted ? 'border-green-500' : ''
                      }`}
                  >
                    <input
                      type={`${passwordVisible ? 'text' : 'password'}`}
                      id="password"
                      className="border-0 outline-none w-full bg-transparent"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className='cursor-pointer text-xl ' onClick={passwordVisibilityHandler}>{passwordVisible ? (<IoEye />) : (<FaEyeSlash />)}</span>
                    {formSubmitted && (
                      <span className="pl-2 text-xl">
                        {errors.password ? (
                          <FaExclamationCircle className="text-red-500" />
                        ) : (
                          <FaCircleCheck className="text-green-500" />
                        )}
                      </span>
                    )}
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                {/* Checkbox */}
                <div className="py-3 flex gap-2">
                  <input
                    type="checkbox"
                    id="user_agree_to_terms"
                    className="signup-checkbox"
                  />
                  <label htmlFor="user_agree_to_terms" className=" m-0">
                    I agree with devop's Terms of Service, Privacy Policy, and default
                    Notification Settings.
                  </label>
                </div>
                {/* Submit Button */}
                <div className="py-3">
                  <button className={`${theme === 'light' ? 'bg-black text-white'  :'bg-white text-black'} rounded-[30px] text-center  h-[58px] text-[18px] font-bold w-full 
                    ${isLoading ? 'opacity-50 cursor-not-allowed ' : ''}`}
                    disabled={isLoading || !isOnline} >
                    {isLoading ? <CircularProgress  size={24} color="inherit"/> : 'Create Account'}
                  </button>
                </div>
                <div>
                  <p className="text-center text-lg  mt-1">
                    Already have an account?{' '}
                    <Link to={'/login'} className=" underline">
                      Log In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default SignUp;
