# Redux-Saga

- Handle side effect using **Generator** (`function*`).
- Install required Dependencies

  ```bash
  npm install axios redux-saga @reduxjs/toolkit react-redux
  ```

- Example

  ```js
  import { createStore, applyMiddleware } from "redux";
  import createSagaMiddleware from "redux-saga";
  import { call, put, takeEvery } from "redux-saga/effects";

  // Initial State
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };

  // Action Types
  const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
  const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
  const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

  // Reducer
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true };
      case FETCH_USERS_SUCCESS:
        return { loading: false, users: action.payload, error: "" };
      case FETCH_USERS_FAILURE:
        return { loading: false, users: [], error: action.payload };
      default:
        return state;
    }
  };

  /// Saga
  function* fetchUser() {
    try {
      const response = yield call(
        fetch,
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = yield response.json();

      yield put({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      put({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  }

  function* watchFetchUser() {
    yield takeEvery(FETCH_USERS_REQUEST, fetchUser);
  }

  // Create Saga Middleware
  const sagaMiddleware = createSagaMiddleware();

  /// Store
  const userStore = createStore(userReducer, applyMiddleware(sagaMiddleware));

  // Run Saga
  sagaMiddleware.run(watchFetchUser);

  // Dispatch Action
  userStore.dispatch({ type: FETCH_USERS_REQUEST });
  ```

- Latest Approatch

  ```js
  /// Create API Server (api.js)
  import axios from "axios";

  const API = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 5000, // 5-second timeout
  });

  /// Functions for call by sagas
  export const fetchUsersAPI = () => API.get("/users");
  export const fetchUsersByIdAPI = (id) => API.get(`/users/${id}`)


  /// Create Redux Slice (usersSlice.js)
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
      loading: false,
      users: [],
      error: "",
  };
  const usersSlice = createSlice({
      name: "users",
      initialState,
      reducers: {
          fetchUsersRequest: (state) => {
              state.loading = true;
          },
          fetchUsersSuccess: (state, action) => {
              state.loading = false;
              state.users = action.payload;
          },
          fetchUsersFailure: (state, action) => {
              state.loading = false;
              state.error = action.payload;
          },
      },
  });

  export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;
  export default usersSlice.reducer;


  /// Create Redux-saga for API Calls (sagas.js)
  import { call, put, takeEvery } from "redux-saga/effects";
  import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from "./usersSlice";
  import { fetchUsersAPI } from "./api";

  /// Worker saga
  function* fetchUsers (){
      try {
          const response = yield call(fetchUsersAPI);
          yield put(fetchUsersSuccess(response.data)); // Dispatch success action
      } catch (error) {
          yield put(fetchUsersFailure(error.message)); // Dispatch failure action
      }
  }

  /// Watcher saga
  function* watchFetchUSers(){
      yield takeEvery(fetchUsersRequest.type, fetchUsers)
  }
  export default watchFetchUsers;

  /// Configure Redux-store with saga middleware (store.js)
  import { configureStore } from "@reduxjs/toolkit";
  import createSagaMiddleware from "redux-saga";
  import usersReducer from "./usersSlice";
  import watchFetchUsers from "./sagas";

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
      reducer:{
          users: usersReducer
      },
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({thunk: false}).concate(sagaMiddleware),   // Disable thunk and add saga
  })

  sagaMiddleware.run(watchFetchUsers);

  export default store;

  /// Dispatch API request in a React Component. (UsersList.js).
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchUsersRequest } from "./usersSlice";

  const userList = () =>{
      const dispatch = useDispatch();
      const { users, loading, error } = useSelector((state) => state.users);

      useEffect(()=>{
          dispatch(fetchUsersRequest());
      }, [dispatch])

      return (
          <div>
          <h2>User List</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <ul>
              {users.map((user) => (
                  <li key={user.id}>{user.name}</li>
              ))}
          </ul>
          </div>
      );
  };

  export default UsersList;

  ```
