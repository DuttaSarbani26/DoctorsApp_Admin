import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    token: null
}

export const authSignIn = createAsyncThunk(
    "authSignIn",
    async(payload) => {
        const response = await AxiosInstance.post(endPoints.auth.signIn, payload)
        console.log(response)
        return response.data
    }
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

      .addCase(authSignIn.pending, (state, { payload }) => { 
        state.loading = true
      })
      .addCase(authSignIn.fulfilled, (state, { payload }) => {
       state.loading = false
      })
      .addCase(authSignIn.rejected, (state, { payload }) => {
       })
     }
})

export default authSlice;