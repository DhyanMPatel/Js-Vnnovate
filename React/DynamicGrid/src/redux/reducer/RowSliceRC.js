import { createSlice } from "@reduxjs/toolkit";

const RowSlice = createSlice({
  name: "rows",
  initialState: { value: "" },
  reducers: {
    setRows: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRows } = RowSlice.actions;
export default RowSlice.reducer;
