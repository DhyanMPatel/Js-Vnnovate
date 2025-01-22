/// Error Handling with Promise

/*
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    console.log(result);
    throw new Error("Whoops!"); // rejects the promise
  })
  .catch((err) => {
    console.log(err);
  }); // Error: Whoops!
*/

/*
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    console.log(result);
    blabla(); // no such function
  })
  .catch((err) => {
    console.log(err);
  }); // ReferenceError: blabla is not defined
*/

/// Rethrowing with promises
new Promise((res, rej) => {
  throw new Error("Whoops!");
})
  .catch((result) => {
    if (result instanceof SyntaxError) {
      // Handle like that
    } else {
      console.log("Can't handle such error");
      throw result; // This is called Rethrowing
    }
  })
  .then((result) => {
    console.log("This will Skipped Because above catch() throw error");
  })
  .catch((result) => {
    if (result instanceof Error) {
      console.log("Ok, Error is from Error Object:", result);
    }
    // don't return anything => execution goes the normal way
  });

/*
/// Experiment
//  - In any case we should have the unhandledrejection event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.
<script>
"use strict";

window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
</script>
*/
