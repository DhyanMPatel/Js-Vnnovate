import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import numReducer from "./numSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer, // same as name in counterSlice.js
    number: numReducer,
  },
});

export default store;
