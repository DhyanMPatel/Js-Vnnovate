/// Variable Scope
//      - There are multiple scope like, code block, nested function

/*
// Nested Function

function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log("Hello, " + getFullName());
  console.log("Bye, " + getFullName());
}
sayHiBye("Vnnovate", "Ahm");
*/

/*
function makeCounter() {
  let count = 0; 

  return function () {
    return count++; // so count made in global context
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
*/

/// Laxical Environment
//  - Every running function, and script as a whole have an internal(hidden) associated Object is known as Laxical Environment.
//  - it has 2 part
//      1. Environment record - an Object store it's local variable and properties
//      2. A reference of outer lexical Environment
//  - it only exist "Theoritically". we can't get this object in oue code and manipulate it directly.
// - When code want to access the variable - the inner LE is searched first, then the outer one, then more outer one and so on.

/*
/// Closure
//      - A closure is a function that remember its outer variables and can access them
//      - But when a function is created using new Function, its [[Environment]] is set to reference not the current Lexical Environment, but the global one.
function getFunc() {
  let value = "Test";

  // let func = function () {
  // console.log(value);
  // };

  let func = new Function("console.log(value);"); // Error - value is not defined
  return func;
}
getFunc()();
*/

/*
/// Garbage Collection
//      - usually, Laxical Environment is removed from the memory with all it's variable after function call finishes. because it is not reachable.
//      - However, nested function is still reachable after  the end of funtion.
//      - An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.

function f() {
  let value = 123;

  return function () {
    console.log(value);
  };
}

let g1 = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
*/

/// Real-life Example
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g2 = f();
// g();

/*
/// home Work
function makeCounter() {
  let count = 0; 

  return function () {
    return count++; // so count made in global context
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
*/
