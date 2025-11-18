import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from '../features/components/componentsSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productSlice';
import addressReducer from '../../src/features/address/addressSlice';
import orderReducer from '../../src/features/order/orderSlice';

export const store = configureStore({
    reducer: {
        components: componentsReducer,
        cart: cartReducer,
        products: productsReducer,
        address: addressReducer,
        orders: orderReducer
    },
});