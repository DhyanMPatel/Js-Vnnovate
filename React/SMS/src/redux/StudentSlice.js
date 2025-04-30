import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
};

const StudentSlice = createSlice({
  name: "studentList",
  initialState: initialState,
  reducers: {
    setFormData: (state, action) => {
      state.studentList.push(action.payload);
    },
  },
});

export const { setFormData } = StudentSlice.actions;

export default StudentSlice.reducer;
