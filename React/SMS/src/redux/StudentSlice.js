import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    fullName: "",
    gender: "",
    message: "",
    dateRange: [], // dayjs[] pair
    standard: "",
    sports: [],
    file: null,
  },
};

const StudentSlice = createSlice({
  name: "studentList",
  initialState: initialState,
  reducers: {
    setFormData: (state, action) => {
      (state.fullName = action.payload.fullName),
        (state.formData.gender = action.payload.gender),
        (state.formData.message = action.payload.message),
        (state.formData.dateRange = action.payload.dateRange),
        (state.formData.standard = action.payload.standard),
        (state.formData.sports = action.payload.sports),
        (state.formData.file = action.payload.file);
    },
  },
});

export const { setFormData } = StudentSlice.actions;

export default StudentSlice.reducer;
