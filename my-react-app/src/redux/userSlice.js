import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Add user property to track user details
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on user presence
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token'); // Clear token from localStorage
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setLoading, setUser, logout } = userSlice.actions;

export const verifyToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await api.get('api/users/me'); // Verify token and get user details
      dispatch(setUser(response.data.user)); // Set user info in Redux state
    }
  } catch (err) {
    console.error('Error verifying user token:', err);
    dispatch(setUser(null)); // Clear user on error
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
