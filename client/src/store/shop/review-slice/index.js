import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null, 
};

// === Async Thunks ===

// Add a review
export const addReview = createAsyncThunk(
  "/review/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
        formdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add review");
    }
  }
);

// Get reviews for a product/order
export const getReviews = createAsyncThunk(
  "/review/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/review/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// === Slice ===

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    // Clear reviews
    clearReviews: (state) => {
      state.reviews = [];
    },
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add Review
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally, you can add the review to the current list
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  
      })

      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload;  
      });
  },
});

// === Selectors ===
export const selectReviews = (state) => state.reviewSlice.reviews;
export const selectReviewsLoading = (state) => state.reviewSlice.isLoading;
export const selectReviewsError = (state) => state.reviewSlice.error;

// === Exports ===
export const { clearReviews, clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
