import { createSlice } from "@reduxjs/toolkit";

const RowPageSlice = createSlice({
  name: "rowPage",
  initialState: { value: 0 },
  reducers: {
    setRowPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRowPage } = RowPageSlice.actions;
export default RowPageSlice.reducer;
