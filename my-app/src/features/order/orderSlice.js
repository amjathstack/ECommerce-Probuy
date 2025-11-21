import { auth } from "@/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:3000/api/order";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (token, thunkAPI) => {
  try {
    const response = await axios.get(URL, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch cart");
  }
});

export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async (token, thunkAPI) => {
  try {
    const response = await axios.get(URL, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    console.log(token)
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch cart");
  }
});

export const addToOrder = createAsyncThunk("orders/addToOrder", async (order, thunkAPI) => {
  try {
    const token = auth.currentUser?.getIdToken()
    const response = await axios.post(URL, order, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add item");
  }
});

const cartSlice = createSlice({
  name: "orders",
  initialState: {
    allOrderItems: [],
    orderItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToOrderItems: (state, action) => {
      state.orderItems.push(action.payload);
      toast.success('Order placed successfully!')
    },
    clearOrder: (state) => {
      state.orderItems = [];
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrderItems = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems.push(action.payload);
      })
      .addCase(addToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export const { addToOrderItems, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;
