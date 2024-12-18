// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import servicesReducer from './servicesSlice';
import addonsReducer from './addonsSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    services: servicesReducer,
    addons: addonsReducer,
    cart: cartReducer, // Add the cart reducer here
    // Add other reducers here if needed
  },
});

export default store;
