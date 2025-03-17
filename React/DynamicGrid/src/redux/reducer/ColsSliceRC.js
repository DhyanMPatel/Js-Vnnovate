import { createSlice } from "@reduxjs/toolkit";

const ColsSlice = createSlice({
  name: "columns",
  initialState: { value: "" },
  reducers: {
    setColumns: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setColumns } = ColsSlice.actions;
export default ColsSlice.reducer;
