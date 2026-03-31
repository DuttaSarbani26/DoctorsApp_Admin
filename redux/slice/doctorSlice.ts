import axios from "@/api/axios/axios";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { toast } from "sonner";

const initialState: {
  loading: boolean;
  department: any;
  departmentId: any;
  departmentList: any[];
  doctorList: any[];
  doctorTotal: number;
  error: any;
  appointmentList: any[];
} = {
  loading: false,
  department: null,
  departmentId: null,
  departmentList: [],
  doctorList: [],
  doctorTotal: 0,
  error: null,
  appointmentList: [],
};

const cookie = new Cookies();
export const departmentCreate = createAsyncThunk(
  "departmentCreate",
  async (payload) => {
    const response = await AxiosInstance.post(
      endPoints.doctor.department,
      payload,
    );
    console.log(response);
    return response.data;
  },
);

export const getDepartmentList = createAsyncThunk(
  "getDepartmentList",
  async () => {
    const response = await AxiosInstance.get(endPoints.doctor.departmentList);
    console.log(response);
    return response.data;
  },
);

export const deleteDepartment = createAsyncThunk(
  "deleteDepartment",
  async (id: string) => {
    const response = await AxiosInstance.post(
      endPoints.doctor.departmentDelete,
      { id },
    );
    return { id, ...response.data };
  },
);



export const doctorCreate = createAsyncThunk(
    "doctorCreate",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.post(endPoints.doctor.doctorCreate, payload);
            toast.success(response.data.message || "Doctor created");
            console.log(response);
            return response.data;
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Create failed");
            return rejectWithValue(err.response?.data);
        }
    }
);



export const doctorList = createAsyncThunk(
  "doctorList",
  async ({ page = 1, limit = 10, search = "" }: { page?: number; limit?: number; search?: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(
        `${endPoints.doctor.doctorList}?page=${page}&limit=${limit}&search=${search}`
      );
      console.log("Doctor list response:", res.data); 
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);



export const doctorEdit = createAsyncThunk(
  "doctorEdit",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(
        endPoints.doctor.doctorEdit,
        {
          id,
          ...data,
        }
      );

      toast.success(res.data.message || "Doctor updated");
      return res.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
      return rejectWithValue(err.response?.data);
    }
  }
);


export const doctorDelete = createAsyncThunk(
  "doctorDelete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(
        endPoints.doctor.doctorDelete,
        { id }
      );

      toast.success(res.data.message || "Doctor deleted");

      return { id };
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
      return rejectWithValue(err.response?.data);
    }
  }
);



export const departmentWiseDoctor = createAsyncThunk(
  "departmentWiseDoctor",
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const url = endPoints.doctor.departmentWiseDoctor.replace(
        ":departmentId",
        departmentId
      );

      const res = await AxiosInstance.get(url);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);


export const appointmentList = createAsyncThunk(
  "appointment/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/doctor/appointment/list");
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error fetching appointments");
    }
  }
);




export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* department create */

      .addCase(departmentCreate.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(departmentCreate.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.department._id) {
          cookie.set("id", payload.department._id, { path: "/" });
        }
      })
      .addCase(departmentCreate.rejected, (state, { payload }) => {
        state.loading = false;
      })

      .addCase(getDepartmentList.pending, (state, { payload }) => {})
      .addCase(getDepartmentList.fulfilled, (state, { payload }) => {
        state.departmentList = payload.data;
        state.loading = false;
       
      })
      .addCase(getDepartmentList.rejected, (state, { payload }) => {})

     

     
      .addCase(deleteDepartment.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, { payload }) => {
        state.departmentList = state.departmentList.filter(
          (dept) => dept._id !== payload.id,
        );
      })
      .addCase(deleteDepartment.rejected, (state, { payload }) => {})

      
      .addCase(doctorCreate.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(doctorCreate.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(doctorCreate.rejected, (state, { payload }) => {})


      .addCase(doctorList.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorList.fulfilled, (state, { payload }) => {
  state.loading = false;
  state.doctorList = payload.data || [];
 
  state.doctorTotal = payload.totalItems || payload.totalCount || payload.total || payload.count || 0;
  console.log("Doctor total updated to:", state.doctorTotal, "from payload:", payload);
})
      .addCase(doctorList.rejected, (state) => {
        state.loading = false;
      })



    .addCase(doctorEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorEdit.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.data;

        const index = state.doctorList.findIndex(
          (doc) => doc._id === updated._id
        );

        if (index !== -1) {
          state.doctorList[index] = updated;
        }
      })
      .addCase(doctorEdit.rejected, (state) => {
        state.loading = false;
      })


  

    .addCase(doctorDelete.pending, (state) => {
      state.loading = true;
    })
    .addCase(doctorDelete.fulfilled, (state, action) => {
      state.loading = false;

      state.doctorList = state.doctorList?.filter(
        (doc) => doc._id !== action.payload.id
      );
    })
    .addCase(doctorDelete.rejected, (state) => {
      state.loading = false;
    })
      
      .addCase(departmentWiseDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(departmentWiseDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorList = action.payload.data || [];
      })
      .addCase(departmentWiseDoctor.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default doctorSlice;
