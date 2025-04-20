// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   featureImageList: [],
//   error: null,
// };

// // === Thunks ===

// // Fetch feature images
// export const getFeatureImages = createAsyncThunk(
//   "common/getFeatureImages",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/common/feature/get`
//       );
//       return data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch feature images"
//       );
//     }
//   }
// );

// // Add a new feature image using FormData
// export const addFeatureImage = createAsyncThunk(
//   "common/addFeatureImage",
//   async (image, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", image); // image must be a File

//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return data.data; // Return the newly added feature image
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to add feature image"
//       );
//     }
//   }
// );

// // Delete a feature image
// export const deleteFeatureImage = createAsyncThunk(
//   "common/deleteFeatureImage",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/common/feature/delete/${id}`
//       );
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete feature image"
//       );
//     }
//   }
// );

// // === Slice ===

// const commonSlice = createSlice({
//   name: "common",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     resetLoading: (state) => {
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // GET
//       .addCase(getFeatureImages.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getFeatureImages.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.featureImageList = action.payload;
//       })
//       .addCase(getFeatureImages.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // ADD
//       .addCase(addFeatureImage.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addFeatureImage.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.featureImageList.push(action.payload);
//       })
//       .addCase(addFeatureImage.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // DELETE
//       .addCase(deleteFeatureImage.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteFeatureImage.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.featureImageList = state.featureImageList.filter(
//           (img) => img._id !== action.payload
//         );
//       })
//       .addCase(deleteFeatureImage.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // === Selectors ===

// export const selectFeatureImages = (state) => state.common.featureImageList;
// export const selectIsLoading = (state) => state.common.isLoading;
// export const selectError = (state) => state.common.error;

// // === Exports ===

// export const { clearError, resetLoading } = commonSlice.actions;
// export default commonSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
