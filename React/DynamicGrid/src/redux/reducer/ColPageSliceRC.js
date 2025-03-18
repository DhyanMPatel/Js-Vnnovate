import { createSlice } from "@reduxjs/toolkit";

const ColPageSlice = createSlice({
  name: "colPage",
  initialState: { value: 0 },
  reducers: {
    setColPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setColPage } = ColPageSlice.actions;
export default ColPageSlice.reducer;
