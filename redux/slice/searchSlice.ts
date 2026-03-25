import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState {
  results: any[];
  loading: boolean;
}

const initialState: SearchState = {
  results: [],
  loading: false,
};

export const searchDoctorDepartment = createAsyncThunk(
  "search/doctorDepartment",
  async (searchData: string) => {
    const res = await axios.get(
      `http://localhost:5000/admin/department/doctors/${searchData}`,
      { withCredentials: true }
    );

    return res.data.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchDoctorDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDoctorDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchDoctorDepartment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearResults } = searchSlice.actions;

export default searchSlice.reducer;