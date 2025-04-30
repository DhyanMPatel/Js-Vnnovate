import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    fullName: "",
    gender: "",
    message: "",
    fromDate: "",
    toDate: "",
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
      (state.formData.fullName = action.payload.fullName),
        (state.formData.gender = action.payload.gender),
        (state.formData.message = action.payload.message),
        (state.formData.fromDate = action.payload.fromDate),
        (state.formData.toDate = action.payload.toDate),
        (state.formData.standard = action.payload.standard),
        (state.formData.sports = action.payload.sports),
        (state.formData.file = action.payload.file);
    },
  },
});

export const { setFormData } = StudentSlice.actions;

export default StudentSlice.reducer;
