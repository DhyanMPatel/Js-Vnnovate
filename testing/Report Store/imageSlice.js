import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../../services/api";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  reportImages: [],
  // reportId: [],
};

export const getImages = createAsyncThunk(
  "auth/getImages",
  async (id, { dispatch }) => {
    try {
      const response = await Axios.get("/images");
      if (response.data.success) {
        // console.log(`Get All Images: `, response.data.data);
        return response.data.data || [];
      }
    } catch (error) {
      toast.error("Failed to fetch Images", {
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

export const getImagesbyReports = createAsyncThunk(
  "auth/get-Images-by-Reports",
  async (reportCategoryId, { rejectWithValue }) => {
    // console.log(`reportCategoryId: ${reportCategoryId}`);
    try {
      const response = await Axios.get(`/images/${reportCategoryId}`);
      //   console.log(`Images Reports: `, response);

      if (response.data.success) {
        return response.data.data || [];
      }
    } catch (error) {
      toast.error("Failed to fetch Reports Images", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue("Failed to fetch Images.");
    }
  }
);

export const uploadImages = createAsyncThunk(
  "auth/upload-images",
  async (reportCategoryId, data, { dispatch }) => {
    try {
      const response = await Axios.post(
        `/images/upload/${reportCategoryId}`,
        data
      );
      console.log(`Upload Image Reponse: `, response);
    } catch (error) {
      toast.error("Failed to upload Images", {
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

const ImageSlice = createSlice({
  name: "images",
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
      .addCase(getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportImages = action.payload;
      })
      .addCase(getImages.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(getImagesbyReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImagesbyReports.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.reportImages = action.payload;
      })
      .addCase(getImagesbyReports.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadImages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutSuccess, gotoLogin } = ImageSlice.actions;
export default ImageSlice.reducer;
