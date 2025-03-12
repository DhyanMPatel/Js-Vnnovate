import { createSlice } from "@reduxjs/toolkit";

const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    value: JSON.parse(localStorage.getItem("EditUser")) || null,
  },
  reducers: {
    setEditUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditUser } = editUserSlice.actions;
export default editUserSlice.reducer;
