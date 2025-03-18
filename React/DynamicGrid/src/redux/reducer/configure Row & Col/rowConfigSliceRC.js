import { createSlice } from "@reduxjs/toolkit";

const RowConfigSlice = createSlice({
  name: "rowConfig",
  initialState: { value: "" },
  reducers: {
    setRowConfig: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRowConfig } = RowConfigSlice.actions;
export default RowConfigSlice.reducer;
