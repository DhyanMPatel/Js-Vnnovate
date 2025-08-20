import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFormatAPI,
  deleteFormatAPI,
  getAllFormatsAPI,
  getFormatAPI,
  updateFormatAPI,
} from "..";
import { toast } from "react-toastify";
export const addFormat = createAsyncThunk(
  "format/addFormat",
  async (formatData, { rejectWithValue }) => {
    try {
      const response = await addFormatAPI(formatData);

      if (response?.status) {
        toast.success(response?.message || "Format added successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }

      return response;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to add format";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const fetchAllFormats = createAsyncThunk(
  "format/fetchAllFormats",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getAllFormatsAPI(params);
      return data;
    } catch (error) {
      toast.error("Failed to fetch formats");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchFormatById = createAsyncThunk(
  "format/fetchFormatById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getFormatAPI(id);
      return data;
    } catch (error) {
      toast.error("Failed to fetch format");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateFormat = createAsyncThunk(
  "format/updateFormat",
  async ({ id, ...formatData }, { rejectWithValue }) => {
    try {
      console.log(id, formatData, "FormatData Async");
      const response = await updateFormatAPI(id, formatData);

      if (response?.status) {
        toast.success(response?.message || "Format updated successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }

      return response;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update format";

      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteFormat = createAsyncThunk(
  "format/deleteFormat",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteFormatAPI(id);

      if (response?.status) {
        toast.success(response?.message || "Format deleted successfully!");
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
      return response;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete format!";

      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);
