import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import doctorSlice from "../slice/doctorSlice";
import appointmentSlice from "../slice/appointmentSlice";
import locationSlice from "../slice/locationSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        doctor: doctorSlice.reducer,
        appointment: appointmentSlice.reducer,
        location: locationSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;