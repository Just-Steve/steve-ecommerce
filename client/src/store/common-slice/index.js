import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/api/common/feature";

const initialState = {
  isLoading: false,
  featureImageList: [],
  error: null,
};

// === Thunks ===

// Fetch all feature images
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE}/get`, {
        withCredentials: true,
      });
      // data = { success: true, data: [...] }
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch feature images"
      );
    }
  }
);

// Add a new feature image (expects a URL string)
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (imageUrl, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE}/add`,
        { image: imageUrl },
        { withCredentials: true }
      );
      // data = { success: true, data: newImage }
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add feature image"
      );
    }
  }
);

// Delete a feature image by id
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete feature image"
      );
    }
  }
);

// === Slice ===

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // — GET feature images —
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // — ADD feature image —
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Append the newly added image to the list
        state.featureImageList.push(action.payload);
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // — DELETE feature image —
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted image from the list
        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== action.payload
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = commonSlice.actions;
export default commonSlice.reducer;
