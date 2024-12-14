import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Stores user details
    isAuthenticated: false,
    loading: false, // Updated default state
    error: null, // Track authentication-related errors
  },
  reducers: {
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

export const { setUser, setLoading, setError, logout } = userSlice.actions;

// Async thunk for login
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Send login credentials to the API
    const response = await api.post('api/users/login', credentials);
    const { token } = response.data;

    // Save the token to localStorage
    localStorage.setItem('token', token);

    // Fetch and set user data using the token
    const userResponse = await api.get('api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });

    // Set user state with the response
    dispatch(setUser(userResponse.data.user));
    dispatch(setError(null)); // Clear any previous errors
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
            const response = await api.get('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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


// Async thunk for logging out
export const logoutUser = () => async (dispatch) => {
  try {
    await api.post('api/users/logout'); // Optional API call to invalidate the session on the server
    dispatch(logout()); // Clear local state
  } catch (err) {
    console.error('Error logging out:', err);
    dispatch(logout()); // Ensure local state is cleared regardless of API response
  }
};

export default userSlice.reducer;
