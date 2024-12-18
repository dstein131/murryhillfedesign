// src/redux/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

// Async thunk for traditional login
export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      return response.data; // { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for verifying token
export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await api.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // { user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Token verification failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for Google login
export const googleLogin = createAsyncThunk(
  'user/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/auth/google', { token: credential });
      return response.data; // { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Google login failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/users/logout'); // Optional: Invalidate session on the server
      return;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Logout failed. Please try again.';
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
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user, is_superadmin, applications, roles } = action.payload;
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
      });

    // Handle verifyToken
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        const { user, is_superadmin, applications, roles } = action.payload;
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
      });

    // Handle googleLogin
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const { token, user, is_superadmin, applications, roles } = action.payload;
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
      });

    // Handle logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.is_superadmin = false;
        state.applications = [];
        state.roles = [];
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed. Please try again.';
      });
  },
});

// Export actions
export const { setUser, setLoading, setError, logout } = userSlice.actions;

// Export thunks (ensure no duplicates)
export { login, verifyToken, googleLogin, logoutUser };

// Export reducer
export default userSlice.reducer;
