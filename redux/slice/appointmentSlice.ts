import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState: {
  loading: boolean;
  appointmentList: any[];
  appointmentAcceptList: any[];
  error: any;
  
} = {
  loading: false,
  appointmentList: [],
  error: null,
  appointmentAcceptList: [],
};

// 👉 Get Pending Appointments
export const appointmentList = createAsyncThunk(
  "appointmentList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.doctor.appointmentList);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error fetching appointments");
    }
  }
);

// 👉 Confirm Appointment
export const confirmAppointment = createAsyncThunk(
  "appointmentConfirm",
  async (id: string, { rejectWithValue }) => {
    try {
      const url = endPoints.doctor.confirmAppointment.replace(":id", id);
      const res = await AxiosInstance.put(url);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error confirming appointment");
    }
  }
);


// 👉 Cancel Appointment
export const cancelAppointment = createAsyncThunk(
  "appointmentCancel",
  async (id: string, { rejectWithValue }) => {
    try {
      const url = endPoints.doctor.rejectAppointment.replace(":id", id);
      const res = await AxiosInstance.put(
        url);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error cancelling appointment");
    }
  }
);


// ✅ Fetch Accepted Appointments (Confirmed)
export const appointmentAcceptedList = createAsyncThunk(
  "appointmentAcceptedList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.doctor.appointmentAcceptList);

      return res.data.data; // your backend returns { data: list }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

    /* Appointment List   */


      .addCase(appointmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentList = action.payload;
      })
      .addCase(appointmentList.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

     /* Appointment  Confirm */


      .addCase(confirmAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmAppointment.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 Optimistic update (no refetch needed)
        const updatedId = action.meta.arg;

        state.appointmentList = state.appointmentList.map((item) =>
          item._id === updatedId
            ? { ...item, status: "Confirmed" }
            : item
        );
      })
      .addCase(confirmAppointment.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })



        /* Appointment Cancel */

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;

        const updatedId = action.meta.arg;

        state.appointmentList = state.appointmentList.map((item) =>
          item._id === updatedId
            ? { ...item, status: "Cancelled" }
            : item
        );
      })
      .addCase(cancelAppointment.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

/* Appointment Accepted List */

      .addCase(appointmentAcceptedList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(appointmentAcceptedList.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentAcceptList = action.payload;
      })

      // ❌ Error
      .addCase(appointmentAcceptedList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});





export default appointmentSlice;