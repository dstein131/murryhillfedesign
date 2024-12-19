// src/redux/paymentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a payment intent
export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ items, currency }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/payments/create-payment-intent',
        { items, currency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // { clientSecret, amount, currency }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create payment intent.';
      return rejectWithValue(errorMessage);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecret: '',
    paymentLoading: false,
    paymentError: null,
    paymentSuccess: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.clientSecret = '';
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
