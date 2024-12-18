// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import servicesReducer from './servicesSlice';
import addonsReducer from './addonsSlice';
// Import other reducers as needed

const store = configureStore({
  reducer: {
    user: userReducer,
    services: servicesReducer,
    addons: addonsReducer,
    // Add other reducers here
  },
});

export default store;
