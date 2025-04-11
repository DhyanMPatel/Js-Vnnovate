# Thunk

- Thunk function receives `dispatch` and `getstate` as an argument. and allow us to **dispatch actions asynchronously**.
- First install dependencies

  ```bash
  npm install @reduxjs/toolkit react-redux redux-thunk
  ```

- Thunk can contain any logic sync or async.

- Ex.

  ```js
  import { createStore, applyMiddleware } from "redux";
  import thunk from "redux-thunk";
  import axios from "axios";

  // Initial State
  const initialValue = {
      loading: false,
      users: [],
      error: "",
  };

  /// Actions
  const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
  const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
  const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

  /// Sync Thunk (sample)
    const displayUser = () => {
        return (dispatch, getState) => {
            const beforeUsers = getState().users;
            console.log("Before Users: ", beforeUsers);     // Before Users:  []

            dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: {
                id: 1,
                name: "Dhyan",
                age: "20",
                email: "dhyan@sample.com",
            },
            });

            const afterUsers = getState().users;
            console.log("After Users: ", afterUsers);       // After Users:  [{ id: 1, name: "Dhyan", age: "20", email: "dhyan@sample.com" }]
        };
    };



  /// Async Thunk
    const fetchUser = () => {
        return async (dispatch) => {
            dispatch: ({ type: FETCH_USERS_REQUEST });

            try {
                const users = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
                );
                dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
            } catch (error) {
                dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
            }
        };
    };

  /// Reducer
  const userReducer = (state = initialValue, action) => {
        switch (action.type) {
            case FETCH_USERS_REQUEST:
                return {...state, loading: true};
            case FETCH_USERS_SUCCESS:
                return {loading: false, users: action.payload, error: "" };
            case FETCH_USERS_FAILURE:
                return {loading; false, users: [], error: action.payload};
            default:
                return state;
        }
  };

  /// Store
  const userStore = createStore(userReducer, applyMiddleware(thunk))

  /// Dispatch thunk
    store.dispatch(fetchUser());        // dispatching Function
    store.dispatch(displayUser());      //
  ```

- Current approach to apply Redux thunk

  ```bash
  npm install @reduxjs/toolkit react-redux redux-thunk
  ```

  ```js
  // Create the Redux slice (UsersSlice.js)
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  const initialState = {
    loading: false,
    users: [],
    error: "",
  };

  const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (response.data.success) {
      return response;
    }
  });

  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Reducers
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUsers.pending, (state) =>{
            state.loading = true;
        }).addCase(fetchUsers.fulfilled, (state, action) =>{
            state.loading = false;
            state.users = action.payload
        }).addCase(fetchUsers.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message
        })
    }
  });

  export const {} = userSlice.actions;
  export default userSlice.reducer;

  // Configure Store (Store.js)

  import { configureStore } from '@redux/toolkit';
  import userReducer from './UserSlice';

  const store = cronfigureStore({
    reducer:{
        users: userReducer
    }
  });

  export default store;

  // Provide Store to React (index.jsx)
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Provider } from 'react-redux';
  import store from './store';
  imponrt App from './App';

  reactDOM.render(
    <Provider store = {store}>
    <App />
    </Provider>,
    document.getElementById("root")
  )

  // Dispatch Thunk actions in a component
  import {useDispatch, useSelector} from 'react-redux';
  function displayUsers=()=>{
    const dispatch = useDispatch();
    const {users, loading, error} => useSelector((store) => store.users)

    useEffect(() =>{
        dispatch(fetchUsers())
    },[]);

    return (
        <>
          <h2> Users List </h2>
          <ul>
            {
              users.map((user) =>{
                return <li key={user.id}>{user.name}</li>
              })
            }
          </ul>
          </h2>
        </>
    )
  }
  ```
