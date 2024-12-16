import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'; // Import login action
import { useNavigate } from 'react-router-dom';

const Register = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Identity Services
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Add this to your .env file
      callback: handleGoogleLogin,
    });

    // Render the Google Sign-In button
    window.google?.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/users/register', { username, email, password });
      localStorage.setItem('token', response.data.token); // Save the token
      dispatch(login(response.data.user)); // Automatically log in the user
      alert('Registration successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { credential } = response;
      const googleResponse = await api.post('/auth/google', { token: credential });
      localStorage.setItem('token', googleResponse.data.token); // Save the token
      dispatch(login(googleResponse.data.user)); // Log in the user
      alert('Google login successful!');
      handleClose(); // Close the modal
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className={`modal ${show ? 'modal--visible' : ''}`}>
      <div className="modal__overlay" onClick={handleClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose}>
          &times;
        </button>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <div id="google-signin-button" style={{ marginTop: '20px' }}></div>
      </div>
    </div>
  );
};

export default Register;
