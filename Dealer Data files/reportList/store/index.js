import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../../Service/Api";

export const getData = createAsyncThunk("Reports/getData", async (params) => {
  const response = await Axios.get("admin/kpi/reports", { params });
  const persistReports = localStorage.getItem("ReportList");
  setTimeout(() => {
    console.log(persistReports);
  }, 2500);

  const retailerData = response.data.retailers;

  const result = {
    data: retailerData,
    params,
    totalCount: response.data.totalCount,
    totalPages: parseInt(Math.ceil(response.data.totalCount / params.perPage)),
  };
  return result;
});

export const getDropdownValue = createAsyncThunk(
  "reports/getDropdownValue",
  async (params) => {
    const response = await Axios.get("admin/kpi/reports", { params });

    console.log(response);

    const result = {
      data: response.data.retailers,
      totalCount: response.data.totalCount,
      totalPages: parseInt(
        Math.ceil(response.data.totalCount / params.perPage)
      ),
      params,
    };
    return result;
  }
);

export const ReportSlice = createSlice({
  name: "Reports",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    responseData: "",
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.params = action.payload.params;
      state.totalCount = action.payload.totalCount;
      state.total = action.payload.totalPages;
    });
    builder.addCase(getDropdownValue.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.params = action.payload.params;
      state.totalCount = action.payload.totalCount;
      state.total = action.payload.totalPages;
    });
  },
});

export default ReportSlice.reducer;
