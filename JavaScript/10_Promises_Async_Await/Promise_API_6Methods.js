/// Promise Methods
//      - There are 6 static method

/*
/// Promise.all(iterable)
//      - All Promises run parallaly.
//      - all Values are return same as defined, no 'first solved is first'.
//      - If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.
//      - Promise.all(iterable) allows non-promise “regular” values in iterable

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  //   new Promise((res, rej) => setTimeout(() => rej(new Error("Whoops!")), 1800)),
  4, // Acceptable
  5,
  new Promise((res) => setTimeout(() => res(3), 1000)),
])
  .then((result) => {
    console.log(result); // Return - [1,2,4,5,3], if no any rejection
  })
  .catch((error) => {
    console.log(`Promise.all return with Rejection only`);
  });
*/

/*
/// Promise.allSettled
//      - Same as Promise.all just,
//      - waits for all promises to settle, regardless of the result.
//      - means if there is rejection with any promise steel we go ferthur and resulting array has:
//          1. {status:"fulfilled", value:result} for successful responses,
//          2. {status:"rejected", reason:error} for errors.

Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  new Promise((res, rej) => setTimeout(() => rej(new Error("Whoops!")), 1800)),
  4, // Acceptable
  5,
  new Promise((res) => setTimeout(() => res(3), 1000)),
])
  .then((result) => {
    console.log(result); // Return  - arr of multiple Objects
  })
  .catch((error) => {
    console.log(`Promise.all return with Rejection only`);
  });
*/

/*
/// Promise.race
//      - Here 'first solved' and wait for that first Promise only
//      - wait only for first stabble Promise whether it is result or error
//      - here race means

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  new Promise((res, rej) => setTimeout(() => rej(new Error("Whoops!")), 1800)),
  4, // Acceptable
  5,
  new Promise((res) => setTimeout(() => res(3), 1000)),
])
  .then((result) => {
    console.log(result); // Return - 4
  })
  .catch((error) => {
    console.log(error);
  });
*/

/*
/// Promise.any
//      - Same as Promise.race, just difference is that it wait for first Fulfilled Promise (Resolved). If all of the given promises are rejected, then the returned promise is rejected with `AggregateError` – a special error object that stores all promise errors in its errors property.
//      -

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then((result) => {
  console.log(result); // Return - 1
});

// All Rejected Promise
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // Return - AggregateError
  console.log(error.errors[0]); // Return - Error: Ouch!
  console.log(error.errors[1]); // Return - Error: Error!
});
*/

/// Promise.resolve/reject

Promise.resolve(value); // Same as - `let promise = new Promise(resolve => resolve(value));`
Promise.reject(error); // Same as - `let promise = new Promise((res,rej) => rej(err));`

/*
/// Experiment
///     1) This display real-time Example
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);
*/
