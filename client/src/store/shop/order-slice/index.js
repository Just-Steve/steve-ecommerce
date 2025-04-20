import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  error: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// === Async Thunks ===

// Create a new order
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

// Capture payment
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
        { paymentId, payerId, orderId }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to capture payment");
    }
  }
);

// Get all orders by user
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
      );
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
      );
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch order details");
    }
  }
);

// === Slice ===

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create new order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem("currentOrderId", action.payload.orderId);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.error = action.payload;
      })

      // Get all orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
      })

      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      })

      // Capture payment (optional: update UI or status)
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// === Selectors ===
export const selectOrderLoading = (state) => state.shoppingOrder.isLoading;
export const selectOrderError = (state) => state.shoppingOrder.error;
export const selectOrderList = (state) => state.shoppingOrder.orderList;
export const selectOrderDetails = (state) => state.shoppingOrder.orderDetails;
export const selectApprovalURL = (state) => state.shoppingOrder.approvalURL;
export const selectOrderId = (state) => state.shoppingOrder.orderId;

// === Exports ===
export const { resetOrderDetails, clearOrderError } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
