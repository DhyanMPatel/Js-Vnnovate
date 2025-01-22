# Promises

- intro how Promises work
  1. A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.
  2. A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.
  3. `A promise is a special JavaScript object that links the “producing code” and the “consuming code” together.` In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.
- Promises handled all Synchronous Error only
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
