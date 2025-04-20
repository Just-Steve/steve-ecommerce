import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
  error: null,  // To store any errors from the search
};

// === Async Thunks ===

// Get search results
export const getSearchResults = createAsyncThunk(
  "/search/getSearchResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch search results"
      );
    }
  }
);

// === Slice ===

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    // Reset search results
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    // Reset error message
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state (loading)
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error when a new search starts
      })
      // Handle successful search results
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      // Handle failed search request
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
        state.error = action.payload;  // Set error state if the request fails
      });
  },
});

// === Selectors ===
export const selectSearchResults = (state) => state.searchSlice.searchResults;
export const selectSearchLoading = (state) => state.searchSlice.isLoading;
export const selectSearchError = (state) => state.searchSlice.error;

// === Exports ===
export const { resetSearchResults, resetError } = searchSlice.actions;
export default searchSlice.reducer;
