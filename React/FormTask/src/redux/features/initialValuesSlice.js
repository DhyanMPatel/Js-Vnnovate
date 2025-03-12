import { createSlice } from "@reduxjs/toolkit";

const initialValuesSlice = createSlice({
  name: "initialValues",
  initialState: {
    value: {
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      hobbies: [],
      country: "",
      state: "",
      city: "",
      birthDate: "",
      birthTime: "",
    },
  },
  reducers: {
    setInitialValues: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setInitialValues } = initialValuesSlice.actions;
export default initialValuesSlice.reducer;
