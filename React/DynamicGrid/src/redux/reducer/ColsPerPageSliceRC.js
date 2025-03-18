import { createSlice } from "@reduxjs/toolkit";

const ColsPerPageSlice = createSlice({
  name: "colsPerPage",
  initialState: { value: 5 },
  reducers: {
    setColsPerPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setColsPerPage } = ColsPerPageSlice.actions;
export default ColsPerPageSlice.reducer;
