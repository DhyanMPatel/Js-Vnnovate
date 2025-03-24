# MiddleWare

- Middleware update the Redux data flow by **adding an extra step** at the start of `dispatch`.
- middleware can run logic like `HTTP requests`, `logging`, `authentication`.
- There are many kind of middleware for Redux,

  1. redux-thunk (for sync/async login inside action creators)

     - Thunk is programming turm that means "**a peace of code that does some delayed work**".
     - `configureStore` automatically setup thunk middleware by default.
     - Thunk function allow us to **dispatch function** instead of plain Object.
     - It takes **dispatch** and **getState** as an arguments

  2. redux-saga ()

     - Use **generator functions** (`function*`) for side effect.
     - Saga seperate side effects fron action creators.

  3. Custom Middleware
  4. Logger Middleware

## what is Middleware?

- Middleware is a **function** that intercept actions before reach to the reducer, it allow us to **modify actions**, **perform async operation**, etc.

## Why

- We use Middleware to handle **side effects** that Redux alone can't manage efficiently, This include

  1. Api request
  2. logging actions
  3. modify and stop action before reach reducers
  4. handle authentication and authorization

## When

- When we need to **fetch api data** and **update redux store**
- When we need to **delay**, **modify**, or **cancel actions** based on conditions.

## Where

- Middleware is used inside the **Redux store setup**.
