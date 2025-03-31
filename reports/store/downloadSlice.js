import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isDownloading: false,
};

export const downloadCSV = createAsyncThunk(
  "report/download-csv",
  async (_, { dispatch }) => {
    try {
      const response = await Axios.get("report/download-csv", {
        responseType: "blob",
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (!response.data) {
        toast.error("Failed to Download CSV!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to Download CSV", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
);

const DownloadSlice = createSlice({
  name: "download-csv",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    gotoLogin: (state) => {
      state.passwordUpdated = false;
    },
    setIsDownloading: (state, action) => {
      state.isDownloading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadCSV.pending, (state) => {
        state.isDownloading = true;
      })
      .addCase(downloadCSV.fulfilled, (state, action) => {
        state.isDownloading = false;
      })
      .addCase(downloadCSV.rejected, (state, action) => {
        state.isDownloading = false;
      });
  },
});

export const { logoutSuccess, gotoLogin, setIsDownloading } =
  DownloadSlice.actions;

export default DownloadSlice.reducer;
