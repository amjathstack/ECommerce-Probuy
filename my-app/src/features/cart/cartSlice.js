import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/products/cart";


export const fetchCart = createAsyncThunk("cart/fetchCart", async (thunkAPI) => {
  try {
    const response = await axios.get(`${URL}`);
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch cart");
  }
});


export const addToCart = createAsyncThunk("cart/addToCart", async (product, thunkAPI) => {
  try {
    const response = await axios.post(URL, product);
    return response.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to add item");
  }
});


export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, thunkAPI) => {
    try {

      await axios.delete(URL, { data: { productId }, headers: { "Content-Type": "application/json" } });
      return productId;

    } catch (err) {

      console.error("Error removing item:", err);
      return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message || "Failed to remove item");

    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, thunkAPI) => {
    try {
      const { cartItems } = thunkAPI.getState().cart;
      const response = await axios.put(URL, { cartData: cartItems }, { headers: { 'Content-Type': 'application/json' } })
      return response.data.message
    } catch (error) {

      console.error(error.message)

    }
  }
)

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {

  try {
    const cartData = {}
    const response = await axios.put(`/api/products/cart`, cartData, { headers: { "Content-Type": "application/json" } });
    console.log(response.data);
    return response.data.message;


  } catch (err) {

    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch cart");

  }
});



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCartItems: (state, action) => {
      const { userId, productId, title, image, price, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (i) => i.productId === productId
      );

      const qty = Number(quantity);

      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + qty;
      } else {
        state.cartItems.push({
          userId,
          productId,
          title,
          image,
          price,
          quantity: qty,
        });
      }
    },
    updateCartItems: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);
      item.quantity = Number(item.quantity) + Number(quantity);
    },
    deleteCartItems: (state, action) => {
      const filteredCartItems = state.cartItems.filter((i) => i.productId !== action.payload);
      state.cartItems = filteredCartItems
    },
    clearToCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCartItems, deleteCartItems, addToCartItems, clearToCart } = cartSlice.actions;
export default cartSlice.reducer;
