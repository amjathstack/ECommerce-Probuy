import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const URL = "http://localhost:3000/api/products";

export const fetchProductTitle = createAsyncThunk(
  "products/fetchProductTitle",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/ai`,
        formData, { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data)

      return response.data.message;
    } catch (err) {
      console.log(err.message)
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


export const fetchVendorProducts = createAsyncThunk("products/fetchVendorProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`/api/vendor/products`);
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch products");
  }
});


export const addProduct = createAsyncThunk("products/addProduct", async ({ formData }, thunkAPI) => {

  try {

    const response = await axios.post('/api/vendor/products', formData);
    console.log(response.data);
    return response.data.message;

  } catch (err) {

    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add products");

  }
});

export const editProduct = createAsyncThunk("products/editProduct", async ({ formData }, thunkAPI) => {

  console.log("Got response")

  try {

    const response = await axios.put('/api/vendor/products', formData);
    console.log(response.data)
    return response.data.message;

  } catch (err) {

    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add products");

  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async ({ productId }, thunkAPI) => {
  try {

    const response = await axios.delete('/api/vendor/products', { data: { productId }, headers: { 'Content-Type': 'application/json' } });
    toast.success("Product is deleted!");
    return response.data.message._id

  } catch (error) {

    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add products");

  }
})



const productsSlice = createSlice({
  name: "products",
  initialState: {
    productTitle: '',
    products: [],
    vendorProducts: [],
    loading: false,
    error: null,
  },
  reducers: {

    clearCart: (state) => {
      state.products = [];
    },
    clearProductDetails: (state) => {
      state.productTitle = '';
    }

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

      .addCase(fetchVendorProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProducts = action.payload;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProducts = [...state.vendorProducts, action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProducts = state.vendorProducts.filter((i) => i._id !== action.payload._id);
        state.vendorProducts = [...state.vendorProducts, action.payload];
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload;
        state.vendorProducts = state.vendorProducts.filter(
          (product) => product._id !== deletedId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false; state.error = action.payload
      })

  },
});

export const { clearCart, clearProductDetails } = productsSlice.actions;
export default productsSlice.reducer;
