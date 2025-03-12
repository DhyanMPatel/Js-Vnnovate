import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/userSlice";
import showBtnReducer from "../features/showBtnSlice";
import editUserReducer from "../features/editUserSlice";
import initialValuesReducer from "../features/initialValuesSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    editUser: editUserReducer,
    showBtn: showBtnReducer,
    initialValues: initialValuesReducer,
  },
});

export default store;
