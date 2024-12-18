// src/redux/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

// Async thunk for traditional login
const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      console.log('Login API response:', response.data); // Debugging
      return response.data; // Ensure this structure matches your state
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for verifying token
const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage'); // Debugging
        return rejectWithValue('No token found');
      }

      const response = await api.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('VerifyToken API response:', response.data); // Debugging
      return response.data; // { user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Token verification failed.';
      console.error('VerifyToken API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for Google login
const googleLogin = createAsyncThunk(
  'user/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/auth/google', { token: credential });
      console.log('GoogleLogin API response:', response.data); // Debugging
      return response.data; // { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Google login failed. Please try again.';
      console.error('GoogleLogin API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logging out the user (renamed to performLogoutUser)
const performLogoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/users/logout'); // Optional: Invalidate session on the server
      localStorage.removeItem('token'); // Clear token from localStorage
      console.log('User logged out successfully'); // Debugging
      return;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Logout failed. Please try again.';
      console.error('Logout API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

// Create slice
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
      console.log('setUser called:', action.payload); // Debugging
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
      console.log('setLoading called:', action.payload); // Debugging
    },
    setError: (state, action) => {
      state.error = action.payload; // Error message string
      console.log('setError called:', action.payload); // Debugging
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Login pending...'); // Debugging
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user, is_superadmin, applications, roles } = action.payload;
        console.log('Login fulfilled with payload:', action.payload); // Debugging
        localStorage.setItem('token', token);
        state.user = user;
        state.is_superadmin = is_superadmin;
        state.applications = applications;
        state.roles = roles;
        state.isAuthenticated = !!user;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed. Please try again.';
        console.error('Login rejected:', action.payload); // Debugging
      });

    // Handle verifyToken
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('VerifyToken pending...'); // Debugging
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        const { user, is_superadmin, applications, roles } = action.payload;
        console.log('VerifyToken fulfilled with payload:', action.payload); // Debugging
        state.user = user;
        state.is_superadmin = is_superadmin;
        state.applications = applications;
        state.roles = roles;
        state.isAuthenticated = !!user;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.is_superadmin = false;
        state.applications = [];
        state.roles = [];
        state.isAuthenticated = false;
        state.error = action.payload || 'Token verification failed.';
        console.error('VerifyToken rejected:', action.payload); // Debugging
      });

    // Handle googleLogin
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('GoogleLogin pending...'); // Debugging
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const { token, user, is_superadmin, applications, roles } = action.payload;
        console.log('GoogleLogin fulfilled with payload:', action.payload); // Debugging
        localStorage.setItem('token', token);
        state.user = user;
        state.is_superadmin = is_superadmin;
        state.applications = applications;
        state.roles = roles;
        state.isAuthenticated = !!user;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google login failed. Please try again.';
        console.error('GoogleLogin rejected:', action.payload); // Debugging
      });

    // Handle performLogoutUser
    builder
      .addCase(performLogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Logout pending...'); // Debugging
      })
      .addCase(performLogoutUser.fulfilled, (state) => {
        console.log('Logout fulfilled'); // Debugging
        state.user = null;
        state.is_superadmin = false;
        state.applications = [];
        state.roles = [];
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(performLogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed. Please try again.';
        console.error('Logout rejected:', action.payload); // Debugging
      });
  },
});

// Export actions
export const { setUser, setLoading, setError } = userSlice.actions;

// Export thunks
export { login, verifyToken, googleLogin, performLogoutUser };

// Export reducer
export default userSlice.reducer;
