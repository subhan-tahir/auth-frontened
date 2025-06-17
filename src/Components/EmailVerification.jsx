import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './EmailVerification.css';

const EmailVerification = ({ email, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setVerificationCode(newCode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const code = verificationCode.join('');
      const response = await axios.post('http://localhost:5000/api/email/verify-code', {
        email,
        code
      });

      if (response.data.message === 'Email verified successfully') {
        onVerificationComplete();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/email/send-code', { email });
      setTimeLeft(600);
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-verification-container">
      <div className="verification-box">
        <h2>Email Verification</h2>
        <p className="verification-subtitle">
          We've sent a verification code to <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="verification-form">
          <div className="code-inputs">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="code-input"
                disabled={loading}
              />
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="timer">
            Time remaining: {formatTime(timeLeft)}
          </div>

          <button
            type="submit"
            className="verify-button"
            disabled={loading || verificationCode.some(digit => !digit)}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <button
            type="button"
            className="resend-button"
            onClick={handleResendCode}
            disabled={loading || timeLeft > 0}
          >
            {timeLeft > 0
              ? `Resend code in ${formatTime(timeLeft)}`
              : 'Resend verification code'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification; 