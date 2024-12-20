// src/pages/Login.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for Portals
import { useDispatch } from 'react-redux';
import { login, googleLogin, register, verifyToken } from '../redux/userSlice'; // Import user actions
import './Login.css'; // Import the dedicated CSS file

const Login = ({ show, handleClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
  const [username, setUsername] = useState(''); // For Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      if (window.google) {
        // Remove any previously rendered Google button
        const buttonContainer = document.getElementById('login-google-signin-button');
        if (buttonContainer) buttonContainer.innerHTML = '';

        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
          callback: handleGoogleCallback,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('login-google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
          }
        );

        console.log('Google Sign-In button rendered for Login/Register.');
      } else {
        console.error('Google Identity Services script not loaded.');
      }
    }

    // Cleanup when modal closes
    return () => {
      const buttonContainer = document.getElementById('login-google-signin-button');
      if (buttonContainer) buttonContainer.innerHTML = '';
    };
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        // Handle Registration
        const response = await dispatch(register({ username, email, password })).unwrap();
        console.log('Registration successful:', response);

        // Optionally, dispatch verifyToken to ensure state consistency
        await dispatch(verifyToken()).unwrap();
        console.log('Token verified after registration.');

        onSuccess(); // Close the modal on successful registration
      } else {
        // Handle Login
        const resultAction = await dispatch(login({ email, password })).unwrap();
        console.log('Login successful:', resultAction);

        // Optionally, dispatch verifyToken to ensure state consistency
        await dispatch(verifyToken()).unwrap();
        console.log('Token verified after login.');

        onSuccess(); // Close the modal on successful login
      }
    } catch (err) {
      console.error(`${isRegister ? 'Registration' : 'Login'} error:`, err);
      setError(err.message || `${isRegister ? 'Registration' : 'Login'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCallback = async (response) => {
    try {
      const { credential } = response;
      console.log('Google credential received:', credential);

      // Dispatch the appropriate thunk based on the current form
      if (isRegister) {
        // Handle Google Registration
        const googleResponse = await dispatch(register({ token: credential })).unwrap();
        console.log('Google Registration successful:', googleResponse);
      } else {
        // Handle Google Login
        const googleResponse = await dispatch(googleLogin(credential)).unwrap();
        console.log('Google Login successful:', googleResponse);
      }

      // Optionally, dispatch verifyToken to ensure state consistency
      await dispatch(verifyToken()).unwrap();
      console.log('Token verified after Google authentication.');

      alert(`${isRegister ? 'Google registration' : 'Google login'} successful!`);
      onSuccess(); // Close the modal on successful authentication
    } catch (err) {
      console.error('Google authentication failed:', err);
      setError('Google authentication failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  if (!show) return null; // Do not render anything if the modal is not shown

  return ReactDOM.createPortal(
    <div className={`login-modal ${show ? 'login-modal--visible' : ''}`}>
      <div className="login-modal__overlay" onClick={handleClose}></div>
      <div className="login-modal__content">
        <button className="login-modal__close" onClick={handleClose}>
          &times;
        </button>
        <h2 className="login-modal__title">{isRegister ? 'Register' : 'Login'}</h2>
        {error && <p className="login-modal__error">{error}</p>}
        <form className="login-modal__form" onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              className="login-modal__input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="login-modal__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-modal__submit" disabled={loading}>
            {loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        <div id="login-google-signin-button" className="login-modal__google-button"></div>
        <p className="login-modal__toggle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={toggleForm} className="login-modal__toggle-button">
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>,
    document.body // Render the modal into the body to avoid CSS conflicts
  );
};

export default Login;
