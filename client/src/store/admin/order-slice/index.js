import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

// Fetch all orders
export const getAllOrdersForAdmin = createAsyncThunk(
  "order/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/admin/orders/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Get order details
export const getOrderDetailsForAdmin = createAsyncThunk(
  "order/getOrderDetailsForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/orders/details/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/api/admin/orders/update/${id}`, { orderStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order status");
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get All Orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
      })

      // Get Order Details
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedOrder = action.payload.data;

        // Optimistically update orderList if present
        state.orderList = state.orderList.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );

        // Also update details view if it's open
        if (state.orderDetails && state.orderDetails._id === updatedOrder._id) {
          state.orderDetails = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
