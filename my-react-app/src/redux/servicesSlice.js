// src/redux/servicesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Axios instance

// Async thunks for Services

// Fetch all services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/services/');
      return response.data.services;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch services.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create a new service
export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/services/', serviceData);
      return response.data.service; // Assuming the API returns the created service
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create service.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Update an existing service
export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/services/${id}`, updatedData);
      return response.data.service; // Assuming the API returns the updated service
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update service.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/services/${id}`);
      return id; // Return the deleted service ID
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete service.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Services Slice
const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Services
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Service
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Service
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(s => s.service_id === action.payload.service_id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Service
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(s => s.service_id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
