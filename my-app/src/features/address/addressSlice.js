import { auth } from "@/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3000/api/user/address";

export const fetchAddress = createAsyncThunk(
    "address/fetchAddress",
    async (_, thunkAPI) => {
        try {
            
            const token = await auth.currentUser.getIdToken();
            const response = await axios.get(URL,
                { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } },
            );
            return response.data.message;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch address");
        }
    }
);



export const addToAddress = createAsyncThunk(
    "address/addToAddress",
    async (address, thunkAPI) => {
        try {
            const token = await auth.currentUser?.getIdToken();

            const response = await axios.post(URL, address, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data.message;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Failed to add address");
        }
    }
);





const addressSlice = createSlice({
    name: "address",
    initialState: {
        addressList: [],
        loading: false,
        error: null,
    },
    reducers: {
        addAddress: (state, action) => {
            const { fullName,
                phoneNumber,
                streetAddress1,
                streetAddress2,
                city,
                province,
                postalCode } = action.payload;

            state.addressList.push({
                fullName,
                phoneNumber,
                streetAddress1,
                streetAddress2,
                city,
                province,
                postalCode
            })
        }

    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addressList = action.payload;
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(addToAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addressList = action.payload;
            })
            .addCase(addToAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

export const { addAddress } = addressSlice.actions;
export default addressSlice.reducer;
