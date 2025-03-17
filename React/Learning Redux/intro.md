# Redux

- `Redux` is a JS library for maintainable global state management.
- It allow us to:
  1. Store `global state` that multiple components can access.
  2. `Update state` predictably using actions & reducers.
  3. Avoid `props drilling`.

## When to use Redux?

- When `large-scale applications` that need **centralized state management**.
- Need to `share data` across multiple unrelated components.
- When State updates are complex (e.g., API calls, caching).

## Redux Toolkit

- `Redux Toolkit` is **official recommended way** to writing Redux logic. It simplifies **Redux setup**, **state management**, and **API handling** while reducing boilerplate code and makes it easier to write Redux applications.

- _Why use `Redux Toolkit` instead of `Traditional Redux`?_
  - No need to write **boilerplate code** of `Action`, `Reducer`, `constants`.
  - Automatically configure using middleware.
  - make redux easy to maintain.

## Installation

- Redux Toolkit includes the Redux code as well as other key packages.

  ```js
    // NPM
    npm install @reduxjs/toolkit
    npm install react-redux

    // Yarn
    yarn add @reduxjs/toolkit
  ```

## What does the Redux core do?

- It provide some small API:
  1. `createStore`: to actually create a Redux store.
  2. `combineReducers`: to combine multiple slice reducers into a single larger reducer.
  3. `applyMiddleware`: to combine multiple middleware into a store enhancer.
  4. `compose`: to combine multiple store enhancers into a single store enhancer.

## What does the Redux Toolkit do?

- Redux Toolkit eliminate the "**boilerplate**" from hand-written Redux logic, prevent common mistakes, and provide APIs that simplify standard Redux tasks.
- Redux Toolkit starts with two key APIs that simplify the most common things you do in every Redux app:

  1. `configureStore`- sets up a well-configured Redux store with a **single function call**, including **combining reducers**, adding **the thunk middleware**, and setting up the Redux DevTools integration.

  2. `createSlice`- Automatically generates **action creator** functions for each reducer, and generates **action type strings** internally based on your reducer's names.

- Redux Toolkit includes other APIs for common Redux tasks:

  1. `createAsyncThunk`: abstracts the standard "dispatch actions before/after an async request" pattern.
  2. `createEntityAdaptor`: prebuilt reducers and selectors for CRUD operations on normalized state.
  3. `createSelector`: a re-export of the standard Reselect API for memoized selectors.
  4. `createListenerMiddleware`: a side effects middleware for running logic in response to dispatched actions.

- `Note`: the RTK package also includes "**RTK Query**", a full data fetching and caching solution for Redux apps, as a separate optional `@reduxjs/toolkit/query` entry point.

## Banefit to use Redux Toolkit

- Redux Toolkit **simplifies store setup** down to a single clear function call.
- Redux Toolkit **eliminates accidental mutations**, which have always been the #1 cause of Redux bugs
- Redux Toolkit **eliminates the need to write any action creators or action types** by hand.
- Redux Toolkit makes it easy to write a **Redux feature's code in one file**.
- Redux Toolkit offers **excellent TS support** and **RTK Query**.

## Redux turms and concepts

- When something happens in the app:
  - The UI dispatches an action
  - The store runs the reducers, and the state is updated based on what occurred
  - The store notifies the UI that the state has changed

### **State Management**

- is a process where it track state in component and re-render when state will change.

  ```js
  function Counter() {
    // State: a counter value
    const [counter, setCounter] = useState(0);

    // Action: code that causes an update to the state when something happens
    const increment = () => {
      setCounter((prevCounter) => prevCounter + 1);
    };

    // View: the UI definition
    return (
      <div>
        Value: {counter}
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
  ```

### **Action**

- Action is plan Js Object that has `type` field.
- We can think of an action as an `event` that describes something that happened in the application.
- There are another field `payload` give additional information about what happened.

  ```js
  const addTodoAction = {
    type: "todos/todoAdded",
    payload: "Buy Milk",
  };
  ```

### **Action Creator**

- is a function that create and returns an action object. Using this method we no need to write `Action` object by hand every time.

  ```js
  const todoAdd = (text) => {
    return {
      type: "todos/todoAdded",
      payload: text,
    };
  };
  ```

### **Reducer**

- Reducer is a function that recieve the current State and an Action object, decide how to update the state if necessary, and return new State:

  ```
  (State, action) => newState
  ```

- We can say reducer is an **event listener** which handle events based on received action type.

- `Reducer` functions get their name because they are similar to the kind of callback function we pass to the `Array.reduce()` method.

- Reducer must follow bellow Rules:

  1. They should only calculate the **new state value** based on the `state` and `action` arguments.
  2. They are not allowed to modify the existing `state`. Instead, they must make _immutable updates_, by copying the existing `state` and making changes to the copied values.
  3. They must be "**pure**" - they cannot do any `asynchronous logic`, `calculate random values`, or `cause other "side effects"`.

- Logic inside Reducer

  - Check to see if the reducer cares about this action. If so, make **copy** of the state, **update** the copy with new values, and return it.
  - Otherwise, return the existing State unchanged.

    ```js
    const initialState = {value: 0}

    const counterReducer(state = initialState, action){
        // Check to see if the reducer cares about this action
        if(action.type == "counter/increment"){

            // If so, make a copy of `state`
            return {
                ...state,
                value: state.value + 1,     // and update the copy with the new value
            };
        }

        // otherwise return the existing state unchanged
        return state;
    }
    ```

- Reducer can use any kind of logic to decide state: `if/else`, `switch`, `loops` and so on.

### Store

- The current **Redux application state** lives in an object called the `store`.
- The `store` is created by passing a reducer, and has a method called `getState` that returns the **current state value**:

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState()); // {Value: 0}
```

### dispatch

- The Redux store has a method called `dispatch`. **The only one way to update the state is to call `store.dispatch()` and pass in an action object**.

  ```js
  store.dispatch({ type: "counter/increment" });

  console.log(store.getState()); // {Value: 1}
  ```

- we typically call action creators to dispatch the right action:

  ```js
  const increment = () => {
    return {
      type: "counter/increment",
    };
  };

  store.dispatch(increment());

  console.log(store.getState()); // {value: 2}
  ```

### Selector

- `Selector` are function that know how to **extract specific piece of information** from a store state value.

  ```js
  const selectCounterValue = (state) => state + 1;

  const currentValue = selectCounterValue(store.getState());

  console.log(currentValue); // 2
  ```

### Slice

- A "`slice`" is a collection of **Redux reducer logic** and **actions** for a single feature in your app.

## Example

```js
// Store
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increase: (state) => {
      state.counter.value += 1;
    },
    decrease: (state) => {
      state.counter.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increase, decrease, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// Wrap app with Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Use Redux state (Counter.js)
function Counter() {
  const count = useSeletcor((state) => {
    state.counter.value;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Counter: {count}</h3>

      <button onClick={() => dispatch(increase())}>increase</button>
      <button onClick={() => dispatch(decrease())}>decrease</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
    </div>
  );
}
```
