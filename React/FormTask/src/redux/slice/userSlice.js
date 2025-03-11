import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: JSON.parse(localStorage.getItem("UserData")) || [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
