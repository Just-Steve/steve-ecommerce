import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ENV API Base
const API_URL = import.meta.env.VITE_API_URL;

// Initial State
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

// Helper to get readable error
const extractErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// CHECK AUTH
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
