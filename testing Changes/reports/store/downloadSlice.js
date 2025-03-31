import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../../services/api";
import { toast } from "react-toastify";

const initialState = {
    isAuthenticated: false,
    user: null,
    isDownloading: false,
};

export const downloadCSV = createAsyncThunk(
    "report/downloadCSV",
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get("/report/download-csv", {
                responseType: "blob",
                headers: { "Content-Type": "text/csv" },
            });

            if (!response.data) throw new Error("Failed to download CSV");

            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("CSV downloaded successfully");
        } catch (error) {
            toast.error(error.message || "Failed to download CSV");
            return rejectWithValue(error.message || "Failed to download CSV");
        }
    });

const downloadSlice = createSlice({
    name: "downloadCSV",
    initialState,
    reducers: {
        setIsDownloading: (state, action) => {
            state.isDownloading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadCSV.pending, (state) => {
                state.isDownloading = true;
            })
            .addCase(downloadCSV.fulfilled, (state) => {
                state.isDownloading = false;
            })
            .addCase(downloadCSV.rejected, (state) => {
                state.isDownloading = false;
            });
    },
});

export const { setIsDownloading } = downloadSlice.actions;
export default downloadSlice.reducer;
