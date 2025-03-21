# Thunk

- Thunk function receives `dispatch` and `getstate` as an argument. and allow us to **dispatch actions asynchronously**.
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
            type: "FETCH_USERS_SUCCESS",
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
                dispatch({ type: FETCH_USERS - SUCCESS, payload: users });
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
