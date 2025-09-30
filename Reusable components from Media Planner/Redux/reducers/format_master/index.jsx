import { createSlice } from "@reduxjs/toolkit";
import { dummyFormats } from "../../../utils/formatConstants";
import {
  addFormat,
  deleteFormat,
  fetchAllFormats,
  fetchFormatById,
  updateFormat,
} from "../../actions/format_master";

const initialState = {
  loading: false,
  error: null,
  success: false,
  formats: dummyFormats || [],
  formatDetails: null,
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
};

const formatMasterSlice = createSlice({
  name: "formatMaster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFormat.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addFormat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log("add Format payload", payload);
      state.formats.push(payload);
    });
    builder.addCase(addFormat.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
    builder.addCase(fetchAllFormats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllFormats.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log("fetch All Formats payload", payload);
      state.formats = payload || [];
      // state.totalItems = payload?.totalFormats || 0;
      // state.totalPages = payload?.totalPages || 1;
      // state.currentPage = payload?.currentPage || 1;
      // state.pageSize = action.payload.perPage || 10;
      state.error = null;
    });
    builder.addCase(fetchAllFormats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message || "Failed to fetch Formats";
    });
    builder.addCase(fetchFormatById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFormatById.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log("fetch Format by ID payload", payload);
      state.formatDetails = payload || null;
    });
    builder.addCase(fetchFormatById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message || "Failed to fetch Format by ID";
    });
    builder.addCase(updateFormat.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateFormat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log("update Format payload", payload);
      state.formats = state.formats.map((format) =>
        format.id === payload.id ? payload : format
      );
      //   state.formatDetails = payload?.data;
    });
    builder.addCase(updateFormat.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message || "Failed to update Format";
      state.success = false;
    });
    builder.addCase(deleteFormat.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFormat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log("delete Format payload", payload);
      state.formats = state.formats.filter(
        (format) => format.id !== payload.id
      );
      if (state.formatDetails?.id === payload.id) {
        state.formatDetails = null;
      }
    });
    builder.addCase(deleteFormat.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message || "Failed to delete Format";
      state.success = false;
    });
  },
});

export default formatMasterSlice.reducer;
