import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "page",
  initialState: { value: 0 },
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = PageSlice.actions;
export default PageSlice.reducer;
