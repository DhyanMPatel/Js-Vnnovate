import { configureStore } from "@reduxjs/toolkit";
import { RowReducer, ColsReducer, ShowGridReducer } from "./rootReducer";

// import RowReducer from "../reducer/RowSlice";
// import ColsReducer from "../reducer/ColsSlice";
// import ShowGridReducer from "../reducer/ShowGridSlice";



const Store = configureStore({
  reducer: {
    rows: RowReducer,
    columns: ColsReducer,
    showGrid: ShowGridReducer,
  },
});
export default Store;
