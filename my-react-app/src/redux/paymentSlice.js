// src/redux/paymentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Import the centralized Axios instance

// Async thunk to create a payment intent
export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ items, currency }, { rejectWithValue }) => {
    try {
      // Using the centralized API instance ensures the request goes to the backend
      const response = await api.post('api/payments/create-payment-intent', { items, currency });
      return response.data; // { clientSecret, amount, currency }
    } catch (err) {
      // Handle errors more gracefully
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to create payment intent.';
      return rejectWithValue(errorMessage);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecret: '',
    amount: 0,
    currency: 'usd',
    paymentLoading: false,
    paymentError: null,
    paymentSuccess: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.clientSecret = '';
      state.amount = 0;
      state.currency = 'usd';
      state.paymentLoading = false;
      state.paymentError = null;
      state.paymentSuccess = false;
    },
    setPaymentSuccess: (state) => {
      state.paymentSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentSuccess = false;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.clientSecret = action.payload.clientSecret;
        state.amount = action.payload.amount;
        state.currency = action.payload.currency;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      });
  },
});

export const { resetPaymentState, setPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
