import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "@/firebase";


const URL = "http://localhost:3000/api/products";

export const fetchProductTitle = createAsyncThunk(
  "products/fetchProductTitle",
  async (formData, thunkAPI) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.post(
        `http://localhost:3000/api/ai`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch product title");
    }
  }
);


export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${URL}`);
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch products");
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async ({formData, token}, thunkAPI) => {
  try {
    const response = await axios.post(`${URL}`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
    thunkAPI.dispatch(fetchProducts());
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add products");
  }
});



const productsSlice = createSlice({
  name: "products",
  initialState: {
    productTitle: '',
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.productTitle = action.payload;
      })
      .addCase(fetchProductTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { clearCart } = productsSlice.actions;
export default productsSlice.reducer;
