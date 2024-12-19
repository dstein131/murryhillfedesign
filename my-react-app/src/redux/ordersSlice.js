// src/redux/ordersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

// Fetch all orders for the authenticated user
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/orders', { withCredentials: true });
    return response.data.orders; // Ensure response structure matches
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders.');
  }
});

// Fetch a specific order by ID
export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`, { withCredentials: true });
    return response.data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch order.');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],        // Initialize as an empty array
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || []; // Ensure it assigns an array
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchOrderById
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
