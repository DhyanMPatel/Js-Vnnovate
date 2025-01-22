/// Asynchronous Task Run after Execution Stack clear.

let promise = Promise.resolve();

promise.then(() => console.log("promise done"));

console.log("This Display First");
function print() {
  console.log("This Display First too.");
}
print();
class Print {
  print() {
    console.log("This will Display first too");
  }
}
new Print().print();

/// bellow follow order
Promise.resolve()
  .then(() => console.log("promise done!"))
  .then(() => console.log("code finished"));
