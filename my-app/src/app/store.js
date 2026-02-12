import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from '../features/components/componentsSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productSlice';

export const store = configureStore({
    reducer: {
        components: componentsReducer,
        cart: cartReducer,
        products: productsReducer,
    },
});