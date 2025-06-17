import React, { useState, useEffect } from "react";
import authVideo from "../assets/signupFormVideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isOnline) {
      toast.error("No internet connection. Please check your network");
      setErrors({
        general: "No internet connection. Please check your network.",
      });
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/login`,
        { email, password }
      );
      console.log("login response...", response);
      if (response.data.success) {
        const { username, email: userEmail } = response.data.data;
        const { token, exptime } = response.data.token;
        
        localStorage.setItem("username", username);
        localStorage.setItem("token", JSON.stringify({ token, exptime }));
        toast.success(response.data.msg || "Login successful!", {});
        navigate("/");
      } else if (response.status === 400) {
        toast.error(response.data.msg || "Login failed.");
        setErrors({ general: response.data.msg || "Login failed." });
      } else if (response.status === 401) {
        toast.error(response.data.msg || "Login failed.");
        setErrors({ general: response.data.msg || "Login failed." });
      } else {
        toast.error(response.data.msg || "Login failed.");
        setErrors({ general: response.data.msg || "Login failed." });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMsg =
        error.response?.data?.msg ||
        "An error occurred during login. Please try again.";
      toast.error(errorMsg);
      setErrors({ general: errorMsg });

      if (error.response) {
        if (error.response.status === 400) {
          setErrors({ general: error.response.data.msg || "Bad request." });
        } else if (error.response.status === 401) {
          setErrors({
            general: error.response.data.msg || "Invalid login credentials.",
          });
        } else {
          setErrors({ general: "Server error. Please try again later." });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordVisibilityHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex w-full flex-row h-full overflow-hidden items-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
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

      <section className="flex-1 h-full ml-auto p-2">
        <div className="flex">
          <div className="signup-form max-w-[600px] w-full md:ml-10 ml-0 mr-auto md:px-10 p-2">
            <form onSubmit={submitHandler}>
              {!isOnline && (
                <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                  You are offline. Please check your internet connection.
                </div>
              )}

              {errors.general && (
                <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                  {errors.general}
                </div>
              )}

              <div className="py-10 text-3xl underline text-center font-bold text-black">
                <h1>Log In Now</h1>
              </div>

              {/* email */}
              <div className="form-field py-3">
                <label htmlFor="email" className="font-bold text-[20px] pb-5">
                  Email
                </label>
                <div
                  className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${
                    errors.email
                      ? "border-red-500"
                      : formSubmitted
                      ? "border-green-500"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    id="email"
                    className="border-0 outline-none w-full bg-transparent"
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* password */}
              <div className="form-field py-3">
                <label
                  htmlFor="password"
                  className="font-bold text-[20px] pb-5"
                >
                  Password
                </label>
                <div
                  className={`flex items-center rounded-[12px] py-[18px] px-[20px] border ${
                    errors.password
                      ? "border-red-500"
                      : formSubmitted
                      ? "border-green-500"
                      : ""
                  }`}
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="border-0 outline-none w-full bg-transparent"
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

              {/*submit-button */}
              <div className="py-3">
                <button
                  type="submit"
                  className={`${
                    theme === "light"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } rounded-[30px] text-center h-[58px] text-[18px] font-bold w-full flex items-center justify-center ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading || !isOnline}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      color={theme === "light" ? "white" : "black"}
                    />
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>

              <div>
                <p className="text-center text-lg mt-1">
                  Don't have an account?{" "}
                  <Link to="/signup" className="underline">
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
