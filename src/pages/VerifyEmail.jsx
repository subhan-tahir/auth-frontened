import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../context/ThemeContext";
import { CircularProgress } from "@mui/material";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [verifyEmailError, setVerifyEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);
  const location = useLocation();

  // Get email from localStorage or URL params (set during signup)
  const email = localStorage.getItem("email");
   
console.log("email",email);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setVerifyEmailError(""); // Clear error on input change
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6 || !/^\d{6}$/.test(fullCode)) {
      setVerifyEmailError("Please enter a valid 6-digit code.");
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    // if (!email) {
    //   setVerifyEmailError("Email not found. Please sign up again.");
    //   toast.error("Email not found. Please sign up again.");
    //   return;
    // }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/verify-code`,
        { email: email, code: fullCode }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Email verified successfully!", {
          onClose: () => {
            localStorage.removeItem("signupEmail"); // Clean up
            navigate("/login");
          },
        });
      } else {
        setVerifyEmailError(response.data.message || "Verification failed.");
        toast.error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      setVerifyEmailError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/resend-code`,
        { email }
      );
      if (response.data.success) {
        toast.success(
          response.data.message || "Verification code resent successfully!"
        );
      } else {
        toast.error(
          response.data.message || "Failed to resend verification code."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend verification code."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
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
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Confirm your email address
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We’ve sent a 6-digit code to{" "}
          <span className="font-medium text-black">
            {email || "your email"}
          </span>
        </p>

        {verifyEmailError && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">
            {verifyEmailError}
          </div>
        )}

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)} // Use handleChange
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition ${
            code.every((digit) => digit !== "")
              ? ""
              : "opacity-50 cursor-not-allowed"
          } ${isLoading ? "cursor-not-allowed opacity-50 " : ""}`}
          disabled={!code.every((digit) => digit !== "")}
        >
          Continue
          {isLoading && (
            <CircularProgress sx={{ color: "white", ml: 1 }} size={20} />
          )}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Didn't get the code?{" "}
          <button
            onClick={handleResend}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
