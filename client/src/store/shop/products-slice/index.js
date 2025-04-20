import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  productList: [],
  productDetails: null,
};

// === Async Thunks ===

// Fetch all products with filters/sorting
export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Fetch single product details
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch product details");
    }
  }
);

// === Slice ===

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
    clearProductError: (state) => {
      state.error = null;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // All Products
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })

      // Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        state.error = action.payload;
      });
  },
});

// === Selectors ===
export const selectProductsLoading = (state) => state.shoppingProducts.isLoading;
export const selectProductsError = (state) => state.shoppingProducts.error;
export const selectProductList = (state) => state.shoppingProducts.productList;
export const selectProductDetails = (state) => state.shoppingProducts.productDetails;

// === Exports ===
export const {
  clearProductDetails,
  clearProductError,
  setProductDetails, // <-- added export here
} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
