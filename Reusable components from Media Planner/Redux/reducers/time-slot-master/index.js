import { createSlice } from "@reduxjs/toolkit";
import { dummyTimeSlots } from "../../../utils/timeSlotMasterConstants";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlotById,
  getTimeSlots,
  updateTimeSlot,
} from "../../actions/time-slot-master";

const initialState = {
  loading: false,
  error: null,
  success: false,
  timeSlots: dummyTimeSlots || [],
  timeSlotDetails: null,
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
};

const timeSlotMasterSlice = createSlice({
  name: "timeSlotMaster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTimeSlot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeSlots.push(payload?.data);
      })
      .addCase(createTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create time slot";
      });
    builder
      .addCase(getTimeSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTimeSlots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeSlots = payload?.data;
        state.totalPages = payload?.totalPages || 1;
        state.totalItems = payload?.totalPositions || 0;
        state.currentPage = payload?.currentPage || 1;
        state.pageSize = payload?.perPage || 10;
      })
      .addCase(getTimeSlots.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch time slots";
      });
    builder
      .addCase(getTimeSlotById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTimeSlotById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeSlotDetails = payload?.data;
      })
      .addCase(getTimeSlotById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch time slot details";
      });
    builder
      .addCase(updateTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTimeSlot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeSlots = state.timeSlots.map((timeSlot) =>
          timeSlot.id === payload?.data?.id ? payload?.data : timeSlot
        );
      })
      .addCase(updateTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update time slot";
      });
    builder
      .addCase(deleteTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTimeSlot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeSlots = state.timeSlots.filter(
          (timeSlot) => timeSlot.id !== payload?.data?.id
        );
      })
      .addCase(deleteTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete time slot";
      });
  },
});

export default timeSlotMasterSlice.reducer;
