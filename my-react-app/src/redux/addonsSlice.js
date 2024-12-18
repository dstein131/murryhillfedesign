// src/redux/addonsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Axios instance

// Async thunks for Service Add-Ons

// Fetch all add-ons for a specific service
export const fetchAddons = createAsyncThunk(
  'addons/fetchAddons',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/services/${serviceId}/addons`);
      return { serviceId, addons: response.data.addons };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch add-ons.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create a new add-on for a service
export const createAddon = createAsyncThunk(
  'addons/createAddon',
  async ({ serviceId, addonData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/services/${serviceId}/addons`, addonData);
      return { serviceId, addon: response.data.addon }; // Assuming the API returns the created add-on
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create add-on.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Update an existing add-on
export const updateAddon = createAsyncThunk(
  'addons/updateAddon',
  async ({ serviceId, addonId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/services/${serviceId}/addons/${addonId}`, updatedData);
      return { serviceId, addon: response.data.addon }; // Assuming the API returns the updated add-on
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update add-on.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete an add-on
export const deleteAddon = createAsyncThunk(
  'addons/deleteAddon',
  async ({ serviceId, addonId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/services/${serviceId}/addons/${addonId}`);
      return { serviceId, addonId };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete add-on.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Addons Slice
const addonsSlice = createSlice({
  name: 'addons',
  initialState: {
    addonsByService: {}, // { [serviceId]: [addons] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Addons
    builder
      .addCase(fetchAddons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.loading = false;
        const { serviceId, addons } = action.payload;
        state.addonsByService[serviceId] = addons;
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Addon
    builder
      .addCase(createAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddon.fulfilled, (state, action) => {
        state.loading = false;
        const { serviceId, addon } = action.payload;
        if (!state.addonsByService[serviceId]) {
          state.addonsByService[serviceId] = [];
        }
        state.addonsByService[serviceId].push(addon);
      })
      .addCase(createAddon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Addon
    builder
      .addCase(updateAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddon.fulfilled, (state, action) => {
        state.loading = false;
        const { serviceId, addon } = action.payload;
        const index = state.addonsByService[serviceId]?.findIndex(a => a.addon_id === addon.addon_id);
        if (index !== -1 && state.addonsByService[serviceId]) {
          state.addonsByService[serviceId][index] = addon;
        }
      })
      .addCase(updateAddon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Addon
    builder
      .addCase(deleteAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddon.fulfilled, (state, action) => {
        state.loading = false;
        const { serviceId, addonId } = action.payload;
        if (state.addonsByService[serviceId]) {
          state.addonsByService[serviceId] = state.addonsByService[serviceId].filter(a => a.addon_id !== addonId);
        }
      })
      .addCase(deleteAddon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addonsSlice.reducer;
