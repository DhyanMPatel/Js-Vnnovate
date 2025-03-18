import { configureStore } from "@reduxjs/toolkit";
import {
  RowReducer,
  ColsReducer,
  ShowGridReducer,
  PageReducer,
  rowsPerPageReducer,
  searchReducer,
  progressReducer,
} from "../reducer";

const Store = configureStore({
  reducer: {
    rows: RowReducer,
    columns: ColsReducer,
    showGrid: ShowGridReducer,
    page: PageReducer,
    rowsPerPage: rowsPerPageReducer,
    search: searchReducer,
    progress: progressReducer,
  },
});
export default Store;
