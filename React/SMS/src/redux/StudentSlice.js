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
    deleteStd: (state, action) => {
      state.studentList = state.studentList.filter(
        (std) => std.id !== action.payload
      );
    },
  },
});

export const { setFormData, deleteStd } = StudentSlice.actions;

export default StudentSlice.reducer;
