import React, { useState, useEffect } from 'react';
import authVideo from '../assets/signupFormVideo.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine); // Initial network status

    const navigate = useNavigate();
    console.log("ENV ==== ",import.meta.env.VITE_APP_BACKEND_BASE_URL)
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/login`, { email, password });
           
            if (response.status === 200) {
                const username = response.data.data.username; // Assuming `username` is in the `data`
                console.log('Login successful:', username);
                localStorage.setItem('username', username); // Save username to localStorage
                navigate('/'); // Redirect to home page
            } else {
                setErrors({ general: response.data.msg || 'Invalid login details' });
            }
        } catch (error) {
            setErrors({
                general: 'Invalid email or password.',
            });
            console.error('Login failed:', error);
        }
    };

    const passwordVisibilityHandler = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        // Online and offline events to detect changes in the network status dynamically:
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        <div className="flex w-full flex-row h-full gap-5 overflow-hidden items-center">
            {/* Auth Sidebar */}
            <section className="h-full md:flex hidden">
                <div className="w-[400px] h-screen">
                    <video
                        src={authVideo}
                        className="w-full object-cover h-full block"
                        autoPlay
                        loop
                        muted
                    ></video>
                </div>
            </section>

            {/* Auth Content */}
            <section className="flex-1 h-full ml-auto p-2">
                <div className="flex">
                    <div className="signup-form max-w-[600px] w-full md:ml-10 ml-0 mr-auto md:px-10 p-2">
                        <form onSubmit={submitHandler}>
                            {/* Network Status */}
                            {!isOnline && (
                                <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                                    You are offline. Please check your internet connection.
                                </div>
                            )}

                            {/* General Error */}
                            {errors.general && (
                                <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                                    {errors.general}
                                </div>
                            )}

                            <div className="py-10 text-3xl underline text-center font-bold text-black">
                                <h1>Log In Now</h1>
                            </div>

                            {/* Email Field */}
                            <div className="form-field py-3">
                                <label htmlFor="email" className="font-bold text-[20px] pb-5">
                                    Email
                                </label>
                                <div
                                    className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${errors.email ? 'border-red-500' : formSubmitted ? 'border-green-500' : ''}`}
                                >
                                    <input
                                        type="text"
                                        id="email"
                                        className="border-0 outline-none w-full"
                                        value={email}
                                        autoComplete="on"
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
                                    className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${errors.password ? 'border-red-500' : formSubmitted ? 'border-green-500' : ''}`}
                                >
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        id="password"
                                        className="border-0 outline-none w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="cursor-pointer text-xl transition-all ease-in-out duration-500"
                                        onClick={passwordVisibilityHandler}
                                    >
                                        {passwordVisible ? <IoEye /> : <FaEyeSlash />}
                                    </span>
                                    {formSubmitted && (
                                        <span className="text-xl pl-5">
                                            {errors.password ? (
                                                <FaExclamationCircle className="text-red-500" />
                                            ) : (
                                                <FaCircleCheck className="text-green-500" />
                                            )}
                                        </span>
                                    )}
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="py-3">
                                <button
                                    type="submit"
                                    className="bg-black rounded-[30px] text-center text-white h-[58px] text-[18px] font-bold w-full"
                                    disabled={!isOnline}
                                >
                                    Log In
                                </button>
                            </div>

                            {/* Sign-Up Link */}
                            <div>
                                <p className="text-center text-lg text-gray-600 mt-1">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-black underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
