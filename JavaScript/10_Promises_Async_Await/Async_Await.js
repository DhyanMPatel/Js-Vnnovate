/// Async/await

/*
async function f1() {
  return 1; // or return Promise.resolve(1);
}
f1().then((result) => console.log(result)); // Return - 1

async function f() {
  let promise = new Promise((res, rej) => {
    setTimeout(() => res("Done!"), 1000);
  });
  let result = await promise; // wait until the promise resolves

  console.log(result); // Return - Done!
}
f();
*/

/*
/// Await with Thenable
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // Return - [Function (anonymous)]
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  console.log(result); // Return - 2
}

f();
*/

/*
/// Class with async method
class User {
  async wait() {
    return await Promise.resolve("Done!");
  }
}
new User().wait().then((result) => {
  console.log(result);
});
*/

/// Error Handling
//      - we can append .catch() to handle it.
async function f() {
  try {
    let data = await fetch("http://no-such-url");
    let user = await data.json();
  } catch (err) {
    console.log(err); // TypeError: failed to fetch
  }
}
f();
