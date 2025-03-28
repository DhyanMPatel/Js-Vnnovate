import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../../../services/api";
import dayjs from "dayjs";
import { getImagesbyReports } from "./imageSlice";

const initialState = {
  isAuthenticated: false,
  user: null,
  // profile: null,
  isLoading: false,
  // passwordUpdated: false,
  notification: [],
  reportData: [],
  reportDetail: [],
  month: null,
  filteredReport: [],
  reportWithImage: [],
};

export const getReports = createAsyncThunk(
  "auth/getreports",
  async (id, { dispatch }) => {
    try {
      const response = await Axios.get("/report/list");
      // console.log(`Report response: `, response);

      if (response.data.success) {
        //   response.data.data.map((report) => {
        //     report.createdAt = dayjs(report.createdAt).format("YYYY-MMM-DD");
        //     report.updatedAt = dayjs(report.updatedAt).format("YYYY-MMM-DD");
        //   });

        await Promise.all(
          response.data.data.map(async (report) => {
            await dispatch(getImagesbyReports(report.id));
            report.createdAt = dayjs(report.createdAt).format("YYYY-MMM-DD");
            report.updatedAt = dayjs(report.updatedAt).format("YYYY-MMM-DD");
          })
        );

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
      toast.error("Failed to fetch Reports", {
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
    console.log(`Final Image Data: `, data);
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
    const response = await Axios.delete(`/report/delete/${id}`);

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
    return response;
  }
);

/// Get Report Detail and Images based on Report
export const getReportDetail = createAsyncThunk(
  "auth/get-report-detail",
  async (id, { rejectWithValue }) => {
    try {
      const reportResponse = await Axios.get(`/report/list/${id}`);
      const imageResponse = await Axios.get(`/images/${id}`);
      if (reportResponse.data.success && imageResponse.data.success) {
        // console.log(`Report Details: `, reportResponse);
        // console.log(`Image Response: `, imageResponse);

        const reportDetailWithImages = {
          ...reportResponse.data.data,
          images: imageResponse.data.data || [],
        };

        // console.log(`report Detail With Images: `, reportDetailWithImages);

        return reportDetailWithImages;
      } else {
        toast.error(reportResponse.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return rejectWithValue(reportResponse.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch Report details", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue("Failed to fetch Report details.");
    }
  }
);

export const UpdateReportDetail = createAsyncThunk(
  "report/update-report",
  async ({ id, data }, { dispatch }) => {
    try {
      const response = await Axios.put(`/report/update/${id}`, data);

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
        return response;
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
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Report!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw error;
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
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setFilteredReport: (state, action) => {
      state.filteredReport = action.payload;
    },
    setReportWithImage: (state, action) => {
      state.reportWithImage = action.payload;
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
    builder
      .addCase(getReportDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReportDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportDetail = action.payload;
      })
      .addCase(getReportDetail.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(UpdateReportDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(UpdateReportDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedReport = action.payload.data;

        state.reportData = state.reportData.map((rep) =>
          rep._id === updatedReport._id ? updatedReport : rep
        );
      })
      .addCase(UpdateReportDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  logoutSuccess,
  gotoLogin,
  setMonth,
  setFilteredReport,
  setReportWithImage,
} = ReportSlice.actions;
export default ReportSlice.reducer;
