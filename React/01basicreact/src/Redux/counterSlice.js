import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increase: (state) => {
      // same as {type: "counter/increase"}
      state.value += 1;
    },
    decrease: (state) => {
      // same as {type: "counter/decrease"}
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // same as {type: "counter/incrementByAmount"}
      state.value += action.payload;
    },
  },
});

export const { increase, decrease, incrementByAmount } = counterSlice.actions; // This are actions
export default counterSlice.reducer; // This are reducer
