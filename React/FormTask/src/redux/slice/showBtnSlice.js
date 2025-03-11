import { createSlice } from "@reduxjs/toolkit";

const showBtnSlice = createSlice({
  name: "showBtn",
  initialState: { value: true },
  reducers: {
    setShowBtn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowBtn } = showBtnSlice.actions;
export default showBtnSlice.reducer;
