// src/redux/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Ensure this points to your Axios instance or fetch wrapper

/**
 * Fetch the current user's cart from the server.
 * The server should return a structure like:
 * {
 *   cart_id: number,
 *   items: [
 *     {
 *       cart_item_id: number,
 *       service_id: number,
 *       title: string,
 *       quantity: number,
 *       price: number,
 *       addons: [
 *         {
 *           cart_item_addon_id: number,
 *           addon_id: number,
 *           name: string,
 *           price: number
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/carts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { cart_id, items: [...] }
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to fetch cart.';
    return rejectWithValue(errorMessage);
  }
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ service_id, quantity = 1, addons = [] }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/api/carts/items',
        { service_id, quantity, addons },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After adding an item, we can re-fetch the cart or return updated items directly.
      // For simplicity, just return the response, then handle logic in reducers.
      return response.data; // { message, cart_item_id }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add item to cart.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cart_item_id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(
        `/api/carts/items/${cart_item_id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // { message: 'Cart item quantity updated successfully.' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update item quantity.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cart_item_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`/api/carts/items/${cart_item_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // { message: 'Cart item removed successfully.' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove cart item.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete('/api/carts/clear', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { message: 'Cart cleared successfully.' }
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to clear cart.';
    return rejectWithValue(errorMessage);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart_id: null,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCartState: (state) => {
      state.cart_id = null;
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cart_id = action.payload.cart_id || null;
      state.items = action.payload.items || [];
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // addItemToCart
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // After adding an item, we can re-fetch cart to get updated items.
      // For simplicity, let's just trigger a re-fetch from within your components after adding.
      // Or you can do it here by calling fetchCart if desired.
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // updateCartItemQuantity
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // After updating quantity, re-fetch cart or manually update the quantity in state.
      // Let's opt for a re-fetch in components after a successful update.
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // removeCartItem
    builder.addCase(removeCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // After removing an item, re-fetch cart or manually remove item from state.
      // Let's do a re-fetch in components for consistency.
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // clearCart
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cart_id = null;
      state.items = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
