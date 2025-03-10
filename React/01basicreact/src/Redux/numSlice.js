import { createSlice } from "@reduxjs/toolkit";

const numSlice = createSlice({
  name: "number",
  initialState: { num: 0 },
  reducers: {
    increment: (state) => {
      state.num += 1;
    },
    decrement: (state) => {
      state.num -= 1;
    },
  },
});

export const { increment, decrement } = numSlice.actions;
export default numSlice.reducer;
