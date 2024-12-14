import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

const Login = ({ show, handleClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(login({ email, password })); // Dispatch login thunk without unwrap
      onSuccess(); // Close the modal on successful login
    } catch (err) {
      setError('Login failed. Please try again.'); // Set error message
    } finally {
      setLoading(false);
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
      </div>
    </div>
  );
};

export default Login;
