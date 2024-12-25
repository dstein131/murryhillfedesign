// src/pages/Register.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for Portals
import { useDispatch, useSelector } from 'react-redux';
import { register, googleLogin, verifyToken } from '../redux/userSlice'; // Import user actions
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the dedicated CSS file

const Register = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for registration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user); // Access user state from Redux

  useEffect(() => {
    if (show) {
      if (window.google && window.google.accounts) {
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
    setError(''); // Reset error state before attempting registration
    setLoading(true); // Start loading

    try {
      // Dispatch the register thunk with username, email, and password
      const resultAction = await dispatch(register({ username, email, password })).unwrap();
      console.log('Registration successful:', resultAction);

      // Optionally, dispatch verifyToken to ensure state consistency
      await dispatch(verifyToken()).unwrap();
      console.log('Token verified after registration.');

      // Provide user feedback and navigate
      alert('Registration successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleGoogleCallback = async (response) => {
    setError(''); // Reset error state before attempting Google authentication
    setLoading(true); // Start loading

    try {
      const { credential } = response;
      console.log('Google login credential received:', credential);

      // Dispatch the googleLogin thunk with the credential
      const googleResponse = await dispatch(googleLogin({ token: credential })).unwrap();
      console.log('Google Registration/Login successful:', googleResponse);

      // Optionally, dispatch verifyToken to ensure state consistency
      await dispatch(verifyToken()).unwrap();
      console.log('Token verified after Google authentication.');

      // Provide user feedback and navigate
      alert('Google registration successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      console.error('Google authentication failed:', err);
      setError(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setLoading(false); // End loading
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
          <button type="submit" className="register-modal__submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div
          id="register-google-signin-button"
          className="register-modal__google-button"
          style={{ marginTop: '20px', width: '100%' }}
        ></div>
      </div>
    </div>,
    document.body // Render the modal into the body to avoid CSS conflicts
  );
};

export default Register;
