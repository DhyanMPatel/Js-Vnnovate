import { createSlice } from "@reduxjs/toolkit";

const rowsPerPageSlice = createSlice({
  name: "rowsPerPage",
  initialState: { value: 5 },
  reducers: {
    setRowsPerPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRowsPerPage } = rowsPerPageSlice.actions;
export default rowsPerPageSlice.reducer;
