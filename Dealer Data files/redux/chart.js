import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    reportName: "monika",
    reportChart: [],
    userName: [],
    userLeads: [],
    reportTable: "",
    brandName: "",
    password: "",
    accNum: "",
    dataSet: "Udaan Sales",
  },
  reducers: {
    handleReportName: (state, action) => {
      state.reportName = action.payload;
    },
    handleReportTable: (state, action) => {
      state.reportTable = action.payload;
    },
    handleReportChart: (state, action) => {
      state.reportChart = [...state.reportChart, action.payload];
    },
    handleUserName: (state, action) => {
      state.userName = [...state.userName, action.payload];
    },
    handleLeadsName: (state, action) => {
      state.userLeads = [...state.userLeads, action.payload];
    },
    handleBrandName: (state, action) => {
      state.brandName = action.payload;
    },
    handlePassword: (state, action) => {
      state.password = action.payload;
    },
    handleDataSet: (state, action) => {
      state.dataSet = action.payload;
    },
    handleAcctNumber: (state, action) => {
      state.accNum = action.payload;
    },
  },
});

export const {
  handleAcctNumber,
  handleReportTable,
  handleReportChart,
  handleBrandName,
  handlePassword,
  handleUserName,
  handleLeadsName,
  handleDataSet,
  handleAccChange,
  handleReportName,
} = chartSlice.actions;

export default chartSlice.reducer;
