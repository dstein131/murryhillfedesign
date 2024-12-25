import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

/**
 * Async Thunk for Traditional Login
 * Handles user login by sending credentials to the backend.
 * On success, stores the JWT token and updates the user state.
 */
export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      console.log('Login API response:', response.data); // Debugging
      return response.data; // Expected structure: { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async Thunk for User Registration
 * Handles user registration by sending user data to the backend.
 * On success, stores the JWT token and updates the user state.
 */
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/register', userData);
      console.log('Register API response:', response.data); // Debugging
      return response.data; // Expected structure: { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      console.error('Register API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async Thunk for Verifying JWT Token
 * Validates the JWT token by fetching the current user's data.
 * On success, updates the user state.
 */
export const verifyToken = createAsyncThunk(
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
      return response.data; // Expected structure: { user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Token verification failed.';
      console.error('VerifyToken API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async Thunk for Google Login/Registration
 * Handles authentication via Google by sending the Google credential to the backend.
 * On success, stores the JWT token and updates the user state.
 */
export const googleLogin = createAsyncThunk(
  'user/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/auth/google', { token: credential });
      console.log('GoogleLogin API response:', response.data); // Debugging
      return response.data; // Expected structure: { token, user, is_superadmin, applications, roles }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Google login failed. Please try again.';
      console.error('GoogleLogin API error:', errorMessage); // Debugging
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async Thunk for Logging Out the User
 * Handles user logout by optionally notifying the backend and clearing the JWT token.
 */
export const performLogoutUser = createAsyncThunk(
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

/**
 * Initial State for User Slice
 */
const initialState = {
  user: null,
  is_superadmin: false,
  applications: [],
  roles: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * User Slice
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, is_superadmin, applications, roles } = action.payload;
      state.user = user;
      state.is_superadmin = is_superadmin;
      state.applications = applications;
      state.roles = roles;
      state.isAuthenticated = !!user;
      console.log('setUser called:', action.payload); // Debugging
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      console.log('setLoading called:', action.payload); // Debugging
    },
    setError: (state, action) => {
      state.error = action.payload;
      console.log('setError called:', action.payload); // Debugging
    },
  },
  extraReducers: (builder) => {
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
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
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
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed. Please try again.';
      })
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
      })
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
      })
      .addCase(performLogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performLogoutUser.fulfilled, (state) => {
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
      });
  },
});

// Export actions and reducer
export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
