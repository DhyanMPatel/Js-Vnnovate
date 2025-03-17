import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: { value: "" },
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
