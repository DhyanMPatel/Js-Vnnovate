import { createStore } from "https://cdn.skypack.dev/redux";

const initialState = { count: 0 };

// Reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

// It will called when action is dispatched.
store.subscribe(() => console.log("Updated State: " + store.getState().count));

store.dispatch({ type: "INCREMENT" }); // count: 1
store.dispatch({ type: "DECREMENT" }); // count: 0
store.dispatch({ type: "INCREMENT" }); // count: 1
