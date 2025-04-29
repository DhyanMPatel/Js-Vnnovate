import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import studentReducer from "./StudentSlice";

const persistConfig = {
  key: "StudentList",
  storage,
};

const persistedReducer = persistReducer(persistConfig, studentReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
