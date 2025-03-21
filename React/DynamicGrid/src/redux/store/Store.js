import { configureStore } from "@reduxjs/toolkit";
import {
  RowReducer,
  ColsReducer,
  ShowGridReducer,
  RowPageReducer,
  rowsPerPageReducer,
  searchReducer,
  progressReducer,
  colsPerPageReducer,
  ColPageReducer,
  GridDataReducer
} from "../reducer";

const Store = configureStore({
  reducer: {
    rows: RowReducer,
    columns: ColsReducer,
    showGrid: ShowGridReducer,
    rowPage: RowPageReducer,
    rowsPerPage: rowsPerPageReducer,
    search: searchReducer,
    progress: progressReducer,
    colsPerPage: colsPerPageReducer,
    colPage: ColPageReducer,
    gridData: GridDataReducer,
  },
});
export default Store;
