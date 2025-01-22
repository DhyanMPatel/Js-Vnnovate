/*
/// Promise Chaining
//      - we have a sequence of asynchronous tasks to be performed one after another
//      - .then() create new Promise(resolved with 2*value)

//      Note - we can also add many .then to a single promise. This is not chaining.

new Promise(function (res, rej) {
  setTimeout(() => res(1), 1000);
})
  .then((result) => {
    console.log(result); // Return - 1
    return result * 2;
  })
  .then((result) => {
    console.log(result); // Return - 2
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result); // Return - 4
    return result * 2;
  })
  .then((result) => {
    console.log(result); // Return - 8
    return result * 2;
  });
*/

/// Fetch(url) - work in

fetch("/article/promise-chaining/user.json")
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });

// same as above, but response.json() parses the remote content as JSON
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => alert(user.name)); // iliakan, got user name

/*
/// Experiment
//  - JavaScript checks the object returned by the .then handler in line (*): if it has a callable method named then, then it calls that method providing native functions resolve, reject as arguments (similar to an executor) and waits until one of them is called. In the example above resolve(2) is called after 1 second (**). Then the result is passed further down the chain.

//  - This feature allows us to integrate custom objects with promise chains without having to inherit from Promise.
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(alert); // shows 2 after 1000ms
*/
