import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your API utility

// Fetch all orders for the authenticated user
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/orders', { withCredentials: true });
      console.log('API Response for Orders:', response.data); // Debug API response
      return response.data.orders; // Ensure this matches your backend structure
    } catch (err) {
      console.error('Error Fetching Orders:', err.response?.data?.message || err.message); // Debug error
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders.');
    }
  }
);

// Fetch a specific order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/orders/${orderId}`, { withCredentials: true });
      console.log('API Response for Order:', response.data); // Debug API response
      return response.data.order;
    } catch (err) {
      console.error('Error Fetching Order by ID:', err.response?.data?.message || err.message); // Debug error
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch order.');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Initialize as an empty array
    user: null, // Add user information field
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
        state.orders = action.payload.orders || []; // Extract orders array
        state.user = action.payload.user || null; // Extract user information
        state.error = null;
        console.log('State after fetching orders:', state); // Debug state
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Fetch Orders Error:', action.payload); // Debug error
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
        console.log('State after fetching order by ID:', state); // Debug state
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Fetch Order by ID Error:', action.payload); // Debug error
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
