// src/pages/Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, googleLogin } from '../redux/userSlice'; // Import both thunks
import api from '../api/api'; // Import API for backend communication

const Login = ({ show, handleClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      if (window.google) {
        // Remove any previously rendered Google button
        const buttonContainer = document.getElementById('google-signin-button-login');
        if (buttonContainer) buttonContainer.innerHTML = '';

        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
          callback: handleGoogleCallback,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button-login'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
          }
        );

        console.log('Google Sign-In button rendered for Login.');
      } else {
        console.error('Google Identity Services script not loaded.');
      }
    }

    // Cleanup when modal closes
    return () => {
      const buttonContainer = document.getElementById('google-signin-button-login');
      if (buttonContainer) buttonContainer.innerHTML = '';
    };
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting login:', { email, password });

      // Dispatch the login thunk with credentials
      await dispatch(login({ email, password })).unwrap();

      console.log('Login successful');
      onSuccess(); // Close the modal on successful login
    } catch (err) {
      console.error('Login error:', err);
      setError(err || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCallback = async (response) => {
    try {
      const { credential } = response;
      console.log('Google login credential received:', credential);

      // Dispatch the googleLogin thunk with the credential
      await dispatch(googleLogin(credential)).unwrap();

      alert('Google login successful!');
      onSuccess(); // Close the modal on successful login
    } catch (err) {
      console.error('Google login failed:', err);
      setError(err || 'Google login failed. Please try again.');
    }
  };

  return (
    <div className={`modal ${show ? 'modal--visible' : ''}`}>
      <div className="modal__overlay" onClick={handleClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose}>
          &times;
        </button>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div id="google-signin-button-login" style={{ marginTop: '20px' }}></div>
      </div>
    </div>
  );
};

export default Login;
