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
    updateStd: (state, action) => {
      console.log("Action: ", action.payload);
      state.studentList = state.studentList.map((std) =>
        std.id === action.payload.id ? action.payload : std
      );
    },
  },
});

export const { setFormData, deleteStd, updateStd } = StudentSlice.actions;

export default StudentSlice.reducer;
