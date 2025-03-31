import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../../services/api";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  reportImages: [],
  open: false,
  selectedDialog: null,
  selectedImages: [],
};

export const getImages = createAsyncThunk(
  "images/getAll", 
  async (_, { rejectWithValue }) => {
  try {
    const response = await Axios.get("/images");
    if (!response.data.success) throw new Error("Failed to fetch images");
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Failed to fetch images");
    return rejectWithValue(error.message || "Failed to fetch images");
  }
});

export const getImagesByReports = createAsyncThunk(
  "images/getByReport", 
  async (reportCategoryId, { rejectWithValue }) => {
  try {
    const response = await Axios.get(`/images/${reportCategoryId}`);
    if (!response.data.success) throw new Error("Failed to fetch report images");
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Failed to fetch report images");
    return rejectWithValue(error.message || "Failed to fetch report images");
  }
});

export const uploadImages = createAsyncThunk(
  "images/upload", 
  async ({ reportCategoryId, data }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(`/images/upload/${reportCategoryId}`, data);
    if (!response.data.success) throw new Error("Failed to upload images");
    toast.success("Images uploaded successfully");
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Failed to upload images");
    return rejectWithValue(error.message || "Failed to upload images");
  }
});

export const reorderImages = createAsyncThunk("images/reorder", async ({ reportCategoryId, data }, { dispatch, rejectWithValue }) => {
  try {
    const response = await Axios.put(`/images/reorder/${reportCategoryId}`, data);
    if (!response.data.success) throw new Error("Failed to reorder images");
    toast.success("Images reordered successfully");
    dispatch(getImagesByReports(reportCategoryId));
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Failed to reorder images");
    return rejectWithValue(error.message || "Failed to reorder images");
  }
});

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setSelectedDialog: (state, action) => {
      state.selectedDialog = action.payload;
    },
    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportImages = action.payload;
      })
      .addCase(getImagesByReports.fulfilled, (state, action) => {
        state.isLoading = false;
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

export const { setOpen, setSelectedDialog, setSelectedImages } = imageSlice.actions;
export default imageSlice.reducer;
