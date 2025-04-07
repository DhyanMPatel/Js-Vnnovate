# Promises

- intro how Promises work
  1. A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.
  2. A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.
  3. `A promise is a special JavaScript object that links the “producing code” and the “consuming code” together.` In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.
- Promises handled all Synchronous Error only, they are asynchronous so Sync task complete first.
- Syntax:

  ```js
  let promise = new Promise(function (resolve, reject) {
    /// Executor (the producing code, "singer")
  });
  ```

- Consuming functions can be registered (subscribed) using the methods .then and .catch.
- If we are insterested in Error only then use `.then(null,ErrorHandlingFunc)` or `.catch(alert)`.
- The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.
- When `finally` throws an error, then the execution goes to the nearest error handler.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert); // catch will not Trigger. Because Error generate leter, so promise can't handle
```

## Static Method of Promise

    1. Promise.all(iterable) - we want many promises to execute in parallel and wait until all of them are ready.
    2. Promise.allSattled - print all promises even if there are any promise with Rejection. Result contain arr of State and value/reason of all Promises.
    3. Promise.race(iterable) - wait for first served
    4. Promise.any(iterable)
    5. Promise.resolve(value)
    6. Promise.reject(error)

# Async/Await

- `async` before a function means, `a function always return Promises`
- `await` works only inside async functions.
- Modern browsers allow top-level `await` in modules
- `await` accepts “thenables”.
- Async class methods
- `async/await` works well with `Promise.all`

# Microtask VS Macrotask

## Microtask

- MicroTask are `lightweight Asynchronous operations`
- MicroTask are **Stored in Microtask queue** (internal of JS engine).
- MicroTask **run just after synchronous task** completed.
- Ex:- `Promise.then()`, `Promise.catch()`, `async/await`, etc.

## Macrotask

- Macrotask are `bigger Asynchronous operations`.
- Macrotask are **Stored in Macrotask queue**.
- Macrotask **run after Microtask queue is empty**.
- Ex:- `setTimeout()`, `setInterval()`, `addEventListener`, etc.