import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Stores user details
    isAuthenticated: false,
    loading: true,
    error: null, // Optional: Track authentication-related errors
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Determine authentication state
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload; // Capture error messages
    },
    logout: (state) => {
      localStorage.removeItem('token'); // Clear token
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setLoading, setUser, setError, logout } = userSlice.actions;

// Async thunk for login
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('api/users/login', credentials); // Replace with your login endpoint
    const { token, user } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Set user and authentication state
    dispatch(setUser(user));
  } catch (err) {
    console.error('Error logging in:', err);
    dispatch(setError(err.response?.data?.message || 'Login failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Async thunk for verifying token
export const verifyToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await api.get('api/users/me'); // Replace with your verification endpoint
      dispatch(setUser(response.data.user));
    } else {
      dispatch(setUser(null));
    }
  } catch (err) {
    console.error('Error verifying token:', err);
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
