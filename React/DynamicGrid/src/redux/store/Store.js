import { configureStore } from "@reduxjs/toolkit";
import { RowReducer, ColsReducer, ShowGridReducer } from "../reducer";

const Store = configureStore({
  reducer: {
    rows: RowReducer,
    columns: ColsReducer,
    showGrid: ShowGridReducer,
  },
});
export default Store;
