import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
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
  GridDataReducer,
  sampleGridReducer,
} from "../reducer";
import watchFetchSamples from "../../components/sample Grid/store/sagas";

const sagaMiddleware = createSagaMiddleware();

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
    sampleGrid: sampleGridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchSamples);
export default Store;
