import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../../../services/api";
import dayjs from "dayjs";
import { getImagesbyReports } from "./imageSlice";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  notification: [],
  reportData: [],
  reportDetail: {},
  month: null,
  filteredReport: [],
  reportWithImage: [],
};

export const getReports = createAsyncThunk(
  "report/getReports",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios.get("/report/list");
      if (!response.data.success) throw new Error(response.data.message);

      const reports = await Promise.all(
        response.data.data.map(async (report) => {
          await dispatch(getImagesbyReports(report.id));
          return {
            ...report,
            createdAt: dayjs(report.createdAt).format("YYYY-MMM-DD"),
            updatedAt: dayjs(report.updatedAt).format("YYYY-MMM-DD"),
          };
        })
      );

      return reports;
    } catch (error) {
      toast.error(error.message || "Failed to fetch Reports");
      return rejectWithValue(error.message || "Failed to fetch Reports");
    }
  });

export const handleAddReport = createAsyncThunk(
  "report/addReport", 
  async (data, { rejectWithValue }) => {
  try {
    const response = await Axios.post("/report/add", data);
    if (!response.data.success) throw new Error(response.data.message);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Failed to add report");
    return rejectWithValue(error.message || "Failed to add report");
  }
});

export const handleDeleteReport = createAsyncThunk(
  "report/deleteReport", 
  async (id, { rejectWithValue }) => {
  try {
    const response = await Axios.delete(`/report/delete/${id}`);
    if (!response.data.success) throw new Error(response.data.message);
    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error.message || "Failed to delete report");
    return rejectWithValue(error.message || "Failed to delete report");
  }
});

export const getReportDetail = createAsyncThunk(
  "report/getReportDetail", 
  async (id, { rejectWithValue }) => {
  try {
    const [reportResponse, imageResponse] = await Promise.all([
      Axios.get(`/report/list/${id}`),
      Axios.get(`/images/${id}`),
    ]);

    if (!reportResponse.data.success || !imageResponse.data.success)
      throw new Error("Failed to fetch report details");

    return {
      ...reportResponse.data.data,
      images: imageResponse.data.data || [],
    };
  } catch (error) {
    toast.error("Failed to fetch report details");
    return rejectWithValue(error.message || "Failed to fetch report details");
  }
});

export const updateReportDetail = createAsyncThunk(
  "report/updateReport", 
  async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await Axios.put(`/report/update/${id}`, data);
    if (!response.data.success) throw new Error(response.data.message);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Failed to update report");
    return rejectWithValue(error.message || "Failed to update report");
  }
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
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
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportData = action.payload;
      })
      .addCase(getReportDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportDetail = action.payload;
      })
      .addCase(updateReportDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportData = state.reportData.map((report) =>
          report.id === action.payload.id ? action.payload : report
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { logoutSuccess, setMonth, setFilteredReport, setReportWithImage } = reportSlice.actions;
export default reportSlice.reducer;
