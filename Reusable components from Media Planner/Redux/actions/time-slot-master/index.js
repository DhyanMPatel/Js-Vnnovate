import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createTimeSlotAPI,
  deleteTimeSlotAPI,
  getTimeSlotByIdAPI,
  getTimeSlotsAPI,
  updateTimeSlotAPI,
} from "..";

// Create Time Slot
export const createTimeSlot = createAsyncThunk(
  "timeSlot/create",
  async (timeSlotData, { rejectWithValue }) => {
    try {
      const response = await createTimeSlotAPI(timeSlotData);
      if (response?.status) {
        toast.success(response?.message || "Time Slot added successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create time slot"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get time slots
export const getTimeSlots = createAsyncThunk(
  "timeSlot/getAll",
  async (timeSlotData, { rejectWithValue }) => {
    try {
      const response = await getTimeSlotsAPI(timeSlotData);
      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch time slots"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get Time Slot By Id
export const getTimeSlotById = createAsyncThunk(
  "timeSlot/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTimeSlotByIdAPI(id);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch time slot");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Update Time Slot
export const updateTimeSlot = createAsyncThunk(
  "timeSlot/update",
  async ({ id, ...timeSlotData }, { rejectWithValue }) => {
    try {
      const response = await updateTimeSlotAPI(id, timeSlotData);
      if (response?.status) {
        toast.success(response?.message || "Time Slot updated successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update time slot"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Delete Time Slot
export const deleteTimeSlot = createAsyncThunk(
  "timeSlot/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTimeSlotAPI(id);
      if (response?.status) {
        toast.success(response?.message || "Time Slot deleted successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete time slot"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
