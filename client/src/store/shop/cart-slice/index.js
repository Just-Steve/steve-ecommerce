import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// === Async Thunks ===

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
        { userId, productId, quantity }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart items");
    }
  }
);

// Delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete cart item");
    }
  }
);

// Update item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
        { userId, productId, quantity }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
  }
);

// === Slice ===

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        state.error = action.payload;
      })

      // Update quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// === Selectors ===
export const selectCartItems = (state) => state.shoppingCart.cartItems;
export const selectCartLoading = (state) => state.shoppingCart.isLoading;
export const selectCartError = (state) => state.shoppingCart.error;

// === Exports ===
export const { clearCartError, resetCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
