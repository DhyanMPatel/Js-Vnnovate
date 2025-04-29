# Redux-Persist

- Redux-Persist is a library that allow the state in redux store to persist across browser.
- `Redux Persist` is a state management tool that allows the state in a Redux store to persist across browser and app sessions.

## Why Redux Persist?

- **improving user experience** by pre-loading the store with persistent data.

- To **keep user logged in** even after a page refresh.
- To **keep cart items** or **form data** even if the page reloads.

## Another Ways to persist data

- `Manual localStorage`: When you want full control and very lightweight apps.
- `redux-storage` (middleware): For more customizable, advanced control.
- `Backend Save`: For **syncing data across devices** or securing sensitive data.

## It Offer

- Custom caching strategies
- Deciding which parts of the state to persist and exclude
- The storage mechanism to use

- Built-in features

  1. migrations
  2. transforms
  3. custom merges

- Offline support in Mobile apps.
  - Persistant State allow users to interact with app even when Offline, and when the network connection is restored, the stored state is rehydrated.

## How Redux-Persist Works:

### Persist:

- When Redux store changes, Redux-Persist saves the updated state into a storage (e.g., localStorage).

### Rehydrate:

- When reload the app, Redux-Persist reads the saved state from storage and restores it into Redux store.
- State hydration is the process of retrieving previously persisted states from storage and storing it in the Redux store.

## Persisting state with Redux Persist

### Currently, our store looks like the code below:

- Without Redux-Persist Library:

  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import userReducer from "./slices/userSlice";

  export const store = configureStore({
    reducer: userReducer,
  });
  ```

### To use Redux Persist,

- With Redux Persist:

  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import userReducer from "./slices/userSlice";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage"; // localStorage for web

  // Create a Persist Config:
  const persistConfig = {
    key: "root", // key name to store data in localStorage
    storage, // type of storage to use
  };

  // Wrap Root Reducer with persistReducer:
  const persistedReducer = persistReducer(persistConfig, userReducer);

  // Create Store with the Persisted Reducer:
  export const store = configureStore({
    reducer: persistedReducer,
    devTool: process.env.VITE_APP_MODE !== "Production", // Enable Redux devTool not for Production mode.

    middleware: (getDefaultMiddleware) => {
      getDefaultMiddleware({
        SerializableCheck: {
          ignoredAction: ["persist/PERSIST", "persist/REHYDRATE"], // Say that, ignore the serializable warning on this perticular actions.
        },
      });
    },
    /*
      - Normally, Redux Toolkit automatically checks that all Redux actions and state are serializable.
  
      - Serializable means: can it be safely converted into JSON? (Objects, arrays, strings are serializable; functions, promises are not.)
      */
  });

  // Create a Persistor:
  export const persistor = persistStore(store);
  ```

- we can also use other storage engines like `sessionStorage` and `Redux Persist Cookie Storage Adapter`.

- To use sessionStorage,

```js
import storageSession from "redux-persist/lib/storage/session";
```

## PersistGate

- In most use cases, we might want to delay the rendering of our app’s UI until the persisted data is available in the Redux store. For that, Redux Persist includes the `PersistGate` component.

- To use PersistGate, go to the `index.js` file in the `src` directory and add the following import:

  ```js
  import { persistor, store } from "./redux/store";
  import { PersistGate } from "redux-persist/integration/react";
  // ...

  onst container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
      <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
      </PersistGate>
      </Provider>
  </React.StrictMode>
  )
  ```

## Customizing what’s persisted

- We can customize a part of our state to persist by using the `blacklist` and `whitelist` properties of the `config` object passed to `persistReducer`.

- With the `blacklist` property, we can specify **which part of the state does not persist**.
- While the `whitelist` property does the opposite, specifying **which part of the state to persist**.

Ex: there are `user` and `notes` reducer in `rootReducer` and i want to always persist `user` reducer but not `notes` reducer.

```js
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  //   OR
  blacklist: ["notes"],
};
```

## Nested persists using Redux Persist

- also called as **Persist Specific Reducers Separately**.
- If we have two or more reducers in Redux Toolkit, like userReducer and notesReducer, and we want to add them to our store

  ```js
  const rootReducer = combineReducers({
    user: userReducer,
    notes: NotesReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
  });
  ```

- But if we want to set a different configuration. let’s say we want to change the storage engine for `userReducer` to `sessionStorage`. To do so, we can use **nested persists**, a feature that allows us to nest `persistReducer`, giving us the ability to set different configurations for reducers.

  ```js
  const rootPersistConfig = {
    key: "root",
    storage,
  };

  const userPersistConfig = {
    key: "user",
    storage: storageSession,
  };

  const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer), // Nested persist
    notes: notesReducer,
  });

  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
  });
  ```

## Here’s how hydration works using the REHYDRATE action:

- This is steps to retrieve data from persist storage

  1. The persisted state is retrieved from storage using `persistStore`.
  2. The retrieved state is then sent as the payload for the `REHYDRATE` action
  3. The retrieved state is combined with the current state in the Redux store by the `persistReducer`, which watches for the rehydrate action

  ```js
  import { createSlice } from "@reduxjs/toolkit";
  import { REHYDRATE } from "redux-persist";

  const initialState = {
    user: {},
    isLoggedIn: false,
  };
  const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
      signIn: (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoggedIn = true;
      },
      signOut: (state) => {
        state.user = {};
        state.isLoggedIn = false;
      },
    },
    extraReducers: (builder) => {
      // 2)
      builder.addCase(REHYDRATE, (state) => {
        if (state.user) {
          state.isLoggedIn = true;
        }
      });
    },
  });

  export const { signIn, signOut } = userSlice.actions;
  export default userSlice.reducer;
  ```

## Rehydrate manually

- `Persistor` provide some methods that manually control persistance.

  1. `persistor.purge()` - Clean LocalStorage
  2. `persistor.flush()` -
  3. `persistor.pause()` -

- Useful for **logout flows** where want to **clear persisted user data**.

## Transforming persistent data with Redux Persist

- Transforming gives control over what is stored, how it is stored, and if it is stored after being rehydrated.

## Synchronous migration with createMigrate in Redux Persist
