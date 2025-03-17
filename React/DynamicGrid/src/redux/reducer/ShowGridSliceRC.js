import { createSlice } from "@reduxjs/toolkit";

const ShowGridSlice = createSlice({
  name: "showGrid",
  initialState: { value: false },
  reducers: {
    setShowGrid: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowGrid } = ShowGridSlice.actions;
export default ShowGridSlice.reducer;
