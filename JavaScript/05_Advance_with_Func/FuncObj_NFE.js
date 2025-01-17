/// Function
//      - in JS, Functions are Action Objects
//      - function have 2 Built-in properties
//          1. name
//          2. length
//      - Object method have name too.

/*
/// Contextual name
function sayHi1() {
  console.log("Hi");
}
console.log(sayHi1.name); // Return - sayHi1

let sayHi2 = function () {
  console.log("Hii");
};
console.log(sayHi2.name); // Return - sayHi2

function f(sayHi3 = function () {}) {
  console.log(sayHi3.name); // Return - sayHi3
}
f();
*/

/*
/// Object method have name too
let obj = {
  sayHi() {},
  sayBye: function () {},
};
console.log(obj.sayHi.name); // Return - sayHi
console.log(obj.sayBye.name); // Return - sayBye
*/

/*
let arr1 = [function f() {}];
console.log(arr1[0].name); // f

// function created inside array
let arr = [function () {}];
alert(arr[0].name); // <empty string>
// the engine has no way to set up the right name, so there is none
*/

/*
/// length
//      - return function parameter
//      - Rest parameter is not counted

function func1(a) {}
function func2(a, b) {}
function many(a, b, ...c) {}

console.log(func1.length, func2.length, many.length);
*/

/*
/// Custom Properties - Home Work
function makeCounter() {
  function counter() {
    return counter.count++;
  }
  counter.count = 0;

  return counter;
}
let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

// also we can do
counter.count = 10;
console.log(counter()); // 10
console.log(counter()); // 11
*/

/*
/// NFE
//  - there are 2 special things about the name Function
//      1. it allow function to reference itself internally
//      2. it is not visible outside of function

let sayHi = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHi();
// func(); // Error - not defined

let sayHiDefficult = function (who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHiDefficult("Guest"); // re-call by variable
  }
};
sayHiDefficult();
sayHiDefficult("Owner"); // Possible

// Create reference
let copySayHi = sayHi;
sayHi = null; // Here work
copySayHi();

let copySayHiDefficult = sayHiDefficult;
// sayHiDefficult = null; // Now Error - sayHiDefficult is not a function
copySayHiDefficult();
*/

/// Experiment
// make function that set counter, decrease counter
function makeCounter() {
  let count = 0;
  function counter() {
    return count++;
  }
  counter.set = (value) => {
    count = value;
  };
  counter.decrease = () => {
    return count--;
  };
  return counter;
}

/// Sum of arbitrary amount of brackets
function sum(a) {
  let total = a;
  function f(b) {
    total += b;
    return f; // not call itSelf, return itSelf
  }

  f.toString = function () {
    return total;
  };

  return f;
}

console.log(sum(10)(5)(20));
