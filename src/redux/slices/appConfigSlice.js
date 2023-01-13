import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk(
    "user/getMyInfo",
    async () => {
        try {
            const response = await axiosClient.get("/user/getMyInfo");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const updateMyProfile = createAsyncThunk(
    "user/updateMyProfile",
    async (body) => {
        try {
            const response = await axiosClient.put("/user/", body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: {
        isLoading: false,
        toastData: {},
        myProfile: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        });
    },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast } = appConfigSlice.actions;
