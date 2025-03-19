import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../../../services/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  isLoading: false,
  passwordUpdated: false,
  notification: [],
  reportData: [],
  //   reportDetails: [],
};

export const getReports = createAsyncThunk(
  "auth/getreports",
  async (data, { dispatch }) => {
    try {
      const response = await Axios.get("/report/list");
      console.log(`API Response: Report`, response.data);

      if (response.data.success) {
        return response.data.data || [];
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return [];
      }
    } catch (error) {
      console.error("Error fetching Posts:", error);
      toast.error("Failed to fetch posts", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return [];
    }
  }
);

export const handleAddReport = createAsyncThunk(
  "auth/addReport",
  async (data, { dispatch }) => {
    const response = await Axios.post("/report/add", data);
    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(data.message);
    }
    return response;
  }
);

export const handleDeleteReport = createAsyncThunk(
  "auth/delete-report",
  async (id, { dispatch }) => {
    const response = await Axios.delete(`/post/delete/${id}`);

    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(data.message);
    }
  }
);

const ReportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    gotoLogin: (state) => {
      state.passwordUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportData = action.payload;
      })
      .addCase(getReports.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(handleAddReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleAddReport.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleAddReport.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(handleDeleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleDeleteReport.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(handleDeleteReport.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutSuccess, gotoLogin } = ReportSlice.actions;
export default ReportSlice.reducer;
