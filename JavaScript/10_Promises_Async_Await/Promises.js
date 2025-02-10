/// Promises
//      - the `promise` Object by `new Promise` constructor has 2 internal Properties:
//          1. State - there are 3 state "pending" (initial), "fulfilled", "rejected"
//          2. Result - there are 3 Result "undefined" (initial), "value", "error"
//      - There can be only a single result or an error
//      - Reject should with Error objects like `reject(new Error("…"));`
//      - The properties "state" and "result" of the Promise object are internal. We can’t directly access them. We can use the methods .then or .catch or .finally for that.
//      - there is some Difference among .finally() and other:
//          1. A finally handler has no arguments
//          2. A finally handler “passes through” the result or error to the next suitable handler.
//          3. A finally handler also shouldn’t return anything

/*
let promise = new Promise(function (resolve, reject) {
  //   resolve("done!");

  reject(new Error("Whoops!")); // ignored
  setTimeout(() => resolve("Complete"), 1000); // ignored
});

/// .Then, .catch
promise
  .finally(() =>
    // Triggers first
    console.log(`Stop Loading indicator (not run .catch in this Example)`)
  )
  .then(
    (result) => console.log(result), // Return - done
    (error) => console.log(`then: ${error}`) // doesn't run, if pass resolve
  )

  .catch((error) => console.log(error));
*/

/// Experiment
//        2) Delay with Promise
function Delay(ms) {
  return new Promise(function (res, rej) {
    return setTimeout(res, ms);
  });
}
Delay(2000).then(() => console.log("Complete in 2000 Ms"));

//        3) Animate Circle with Promise
