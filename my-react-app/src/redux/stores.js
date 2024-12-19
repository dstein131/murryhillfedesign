// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import servicesReducer from './servicesSlice';
import addonsReducer from './addonsSlice';
import cartReducer from './cartSlice';
import paymentReducer from './paymentSlice'; // Import paymentReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    services: servicesReducer,
    addons: addonsReducer,
    cart: cartReducer,
    payment: paymentReducer, // Add paymentReducer here
    // Add other reducers here if needed
  },
});

export default store;
