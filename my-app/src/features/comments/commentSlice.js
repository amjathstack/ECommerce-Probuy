import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3000/api/products/comments";

export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async ({ token, productId }, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}?productId=${productId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data.message)
            return response.data.message
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch address");
        }
    }
);


export const addToComment = createAsyncThunk(
    "comment/addToComment",
    async ({ token, formData }, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response.data.message)
            return response.data.message
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch address");
        }
    }
);



const commentSlice = createSlice({
    name: "comment",
    initialState: {
        commentList: [],
        loading: false,
        error: null,
    },
    reducers: {
        addComment: (state, action) => {
            const { comment, productId, rating, userId } = action.payload;
            state.commentList.push({comment, productId, rating, userId});
        },
        clearCommentList: (state) => {
            state.commentList = []
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                if(Array.isArray(action.payload)){
                    state.commentList = action.payload;
                }else{
                    state.commentList = []
                }
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



    },
});

export const { addComment, clearCommentList } = commentSlice.actions;
export default commentSlice.reducer;
