// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Stores user details
    is_superadmin: false, // Indicates if the user is a superadmin
    applications: [], // List of user applications
    roles: [], // List of user roles
    isAuthenticated: false, // Authentication status
    loading: false, // Indicates if an async operation is in progress
    error: null, // Stores error messages
  },
  reducers: {
    setUser: (state, action) => {
      const { user, is_superadmin, applications, roles } = action.payload;
      state.user = user;
      state.is_superadmin = is_superadmin;
      state.applications = applications;
      state.roles = roles;
      state.isAuthenticated = !!user; // Sets to true if user exists
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
    setError: (state, action) => {
      state.error = action.payload; // Error message string
    },
    logout: (state) => {
      localStorage.removeItem('token'); // Clear token from localStorage
      state.user = null;
      state.is_superadmin = false;
      state.applications = [];
      state.roles = [];
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

/**
 * Async thunk for traditional login
 * Dispatches setUser with user data upon successful login
 */
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Send login credentials to the API
    const response = await api.post('/api/users/login', credentials);
    const { token, user, is_superadmin, applications, roles } = response.data;

    // Save the token to localStorage
    localStorage.setItem('token', token);

    // Dispatch setUser with all necessary user data
    dispatch(setUser({ user, is_superadmin, applications, roles }));

    // Clear any previous errors
    dispatch(setError(null));
  } catch (err) {
    console.error('Error logging in:', err);
    // Extract error message from response or set a default message
    const errorMessage =
      err.response?.data?.message || 'Login failed. Please try again.';
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Async thunk for verifying token on app load or refresh
 * Dispatches setUser if token is valid
 */
export const verifyToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      const response = await api.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { user, is_superadmin, applications, roles } = response.data;

      // Dispatch setUser with all necessary user data
      dispatch(setUser({ user, is_superadmin, applications, roles }));
    } else {
      // No token found, ensure state reflects unauthenticated user
      dispatch(setUser(null));
    }
  } catch (err) {
    console.error('Error verifying token:', err);
    // If token verification fails, clear user data
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Async thunk for logging out the user
 * Optionally calls the logout API endpoint to invalidate the session
 */
export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await api.post('/api/users/logout'); // Optional: Invalidate session on the server
  } catch (err) {
    console.error('Error logging out:', err);
    // Even if the API call fails, proceed to clear local state
  } finally {
    // Dispatch logout to clear user data from Redux store
    dispatch(logout());
    dispatch(setLoading(false));
  }
};

/**
 * Async thunk for Google login
 * Dispatches setUser with user data upon successful Google authentication
 */
export const googleLogin = (credential) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Send the Google credential to the backend for verification
    const response = await api.post('/api/users/auth/google', { token: credential });
    const { token, user, is_superadmin, applications, roles } = response.data;

    // Save the token to localStorage
    localStorage.setItem('token', token);

    // Dispatch setUser with all necessary user data
    dispatch(setUser({ user, is_superadmin, applications, roles }));

    // Clear any previous errors
    dispatch(setError(null));
  } catch (err) {
    console.error('Google login failed:', err);
    // Extract error message from response or set a default message
    const errorMessage =
      err.response?.data?.message || 'Google login failed. Please try again.';
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
