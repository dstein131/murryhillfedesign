// src/pages/Register.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for Portals
import { useDispatch } from 'react-redux';
import { verifyToken } from '../redux/userSlice'; // Import verifyToken thunk directly
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Import API for backend communication
import './Register.css'; // Import the dedicated CSS file

const Register = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      if (window.google) {
        // Remove any previously rendered Google button
        const buttonContainer = document.getElementById('register-google-signin-button');
        if (buttonContainer) buttonContainer.innerHTML = '';

        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
          callback: handleGoogleCallback,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('register-google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
          }
        );

        console.log('Google Sign-In button rendered for Register.');
      } else {
        console.error('Google Identity Services script not loaded.');
      }
    }

    // Cleanup when modal closes
    return () => {
      const buttonContainer = document.getElementById('register-google-signin-button');
      if (buttonContainer) buttonContainer.innerHTML = '';
    };
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/users/register', { username, email, password });
      localStorage.setItem('token', response.data.token); // Save the token
      await dispatch(verifyToken()).unwrap(); // Verify and set user data
      alert('Registration successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  const handleGoogleCallback = async (response) => {
    try {
      const { credential } = response;
      console.log('Google login credential received:', credential);

      // Dispatch the googleLogin thunk with the credential and unwrap the result
      const googleResponse = await api.post('/api/users/auth/google', { token: credential });
      localStorage.setItem('token', googleResponse.data.token); // Save the token
      await dispatch(verifyToken()).unwrap(); // Verify and set user data
      alert('Google registration successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      console.error('Google registration failed:', err);
      setError('Google registration failed. Please try again.');
    }
  };

  if (!show) return null; // Do not render anything if the modal is not shown

  return ReactDOM.createPortal(
    <div className={`register-modal ${show ? 'register-modal--visible' : ''}`}>
      <div className="register-modal__overlay" onClick={handleClose}></div>
      <div className="register-modal__content">
        <button className="register-modal__close" onClick={handleClose}>
          &times;
        </button>
        <h2 className="register-modal__title">Register</h2>
        {error && <p className="register-modal__error">{error}</p>}
        <form className="register-modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="register-modal__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="register-modal__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="register-modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-modal__submit">
            Register
          </button>
        </form>
        <div id="register-google-signin-button" className="register-modal__google-button" style={{ marginTop: '20px' }}></div>
      </div>
    </div>,
    document.body // Render the modal into the body to avoid CSS conflicts
  );
};

export default Register;
