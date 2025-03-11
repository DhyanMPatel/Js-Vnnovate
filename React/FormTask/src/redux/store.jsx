import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";
import showBtnReducer from "./slice/showBtnSlice";
import editUserReducer from "./slice/editUserSlice";
import initialValuesReducer from "./slice/initialValuesSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    editUser: editUserReducer,
    showBtn: showBtnReducer,
    initialValues: initialValuesReducer,
  },
});

export default store;
