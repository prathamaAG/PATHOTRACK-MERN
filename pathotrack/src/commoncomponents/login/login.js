import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('login'); // 'login' or 'verify'
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:30002/login', { password, email });
      if (response.data.success) {
        setStep('verify'); // Move to OTP verification step
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to login');
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('http://localhost:30002/verify-otp', { otp });
      if (response.data.success) {
        alert('OTP verified successfully!');
        navigate('/homescreen'); // Redirect to homescreen
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('Failed to verify OTP');
    }
  };

  return (
    <div className="login-container">
      {step === 'login' ? (
        <>
          <h2 className="login-title">Admin Login</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
        </>
      ) : (
        <>
          <h2 className="login-title">Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="login-input"
          />
          <button onClick={handleOtpVerification} className="login-button">Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Login;