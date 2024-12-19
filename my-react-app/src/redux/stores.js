// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import servicesReducer from './servicesSlice';
import addonsReducer from './addonsSlice';
import cartReducer from './cartSlice';
import paymentReducer from './paymentSlice'; // Import paymentReducer
import ordersReducer from './ordersSlice'; // Import the ordersSlice

const store = configureStore({
  reducer: {
    user: userReducer,
    services: servicesReducer,
    addons: addonsReducer,
    cart: cartReducer,
    orders: ordersReducer, // Add the orders reducer here
    payment: paymentReducer, // Add paymentReducer here
    // Add other reducers here if needed
  },
});

export default store;
