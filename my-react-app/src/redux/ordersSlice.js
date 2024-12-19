// src/redux/ordersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all orders for the authenticated user
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/orders', {
        withCredentials: true, // Include cookies if needed for authentication
      });
      return response.data.orders;
    } catch (error) {
      // Return the error message as the rejected value
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders.'
      );
    }
  }
);

// Async thunk to fetch a specific order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        withCredentials: true,
      });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch the order.'
      );
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
    clearSelectedOrder(state) {
      state.selectedOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchOrderById
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
