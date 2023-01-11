import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await axiosClient.post("/user/getUserProfile", body);
            console.log('userProfile', response);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })
    },
});

export default postsSlice.reducer;
