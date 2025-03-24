import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  samples: [],
  error: "",
};

const SampleGridSlice = createSlice({
  name: "sampleGrid",
  initialState,
  reducers: {
    fetchSamplesRequest: (state) => {
      state.loading = true;
    },
    fetchSampleSuccess: (state, action) => {
      state.loading = false;
      state.samples = action.payload;
    },
    fetchSampleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSamplesRequest, fetchSampleSuccess, fetchSampleFailure } =
  SampleGridSlice.actions;
export default SampleGridSlice.reducer;
