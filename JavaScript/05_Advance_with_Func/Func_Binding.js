// Function Binding
//      - When we passing Object methods as callback, there's a known problem: "Lossing This"
//      - We loss `this` while we change any 

let obj = {
  name: "Vnnovate",
  sayHii() {
    console.log(`Hii, ${this.name}`);
  },
};

/*
setTimeout(obj.sayHii, 1000); // Return - "Hii, undefined"
let f = obj.sayHii;
setTimeout(f, 1200); // Return - "Hii, undefined"
*/

/*
/// Solution - 1: a Wrapper
//      - if obj method will change before setTimeout() then setTimeout display with changed data not previous data.
setTimeout(function () {
  obj.sayHii(); // Return - "Hello, undefined changed.
}, 1400);
setTimeout(() => {
  obj.sayHii(); // Return - "Hello, undefined changed.
}, 1600);

obj = { // This will change data before setTimeout(), but we can't use object properties
  sayHii() {
    console.log(`Hello, ${this.name} changed.`);
  },
};
*/

/*
// Solution - 2: funcName.Bind()
//      - This solve above 2 Problem
//      - All arguments are passed to the original func “as is”
//      - only "this" fixed by binding.
//      - If Obj has multiple methods and we plan to actively pass it around, then we could bind them all method using for...in loop or use `_.bindAll(obj, methodNames)`

let user = {
  name: "Vnn",
  sayBye(parse) {
    console.log(`Bye, ${this.name}${parse}`);
  },
};
function sayHii(parse) {
  console.log(`Hii, ${this.name}. ${parse} Again.`);
}
let funcUser = sayHii.bind(user);
funcUser(); // Return - "Hii, Vnn. undefined Again."
funcUser("Dhyan"); // Return  - "Hii, Vnn. Dhyan Again."
setTimeout(funcUser, 800); // Return - "Hii, Vnn. undefined Again."

let objUser = user.sayBye.bind(user);
objUser("!"); // Return - "Bye, Vnn!"
setTimeout(objUser, 1000); // Return - "Bye, Vnnundefined"
user = { // this is reassign of user properties
  name:"This is another", // name now changed to "This is another" otherwise "undefined" if we not define.
  sayBye() {
    console.log(`Again, Bye ${this.name}`); // This will not change value before setTimeout
  },
};
user.sayBye()

// use to bind all methods in Object
for (let key in user) {
  if (typeof user[key] == "function") {
    user[key] = user[key].bind(user);
  }
}
*/

/*
/// Partial Functions - we create a function by fixing some parameters of the existing one.
//      - until we bind only "this", but we can bind also "args"
//      - Syntax -> let bound = funcName.bind(context, [arg1], [arg2], ...)

//      - Please note that we actually don’t use this here. But bind requires it, so we must put in something like null.
function mul(a, b) {
  return a * b;
}
let double = mul.bind(null, 2);

double(3); // Return - 6, == mul(2,3)
double(10); // Return - 20, == mul(2,10)

let triple = mul.bind(null, 3);
triple(3); // Return - 9, == mul(3,3)
triple(10); // Return - 30, == mul(3,10)
*/

/*
/// Experiment
//      1)
function f() {
  console.log(this); // ?
}
let user = {
  g: f.bind(null),
};
user.g(); // Return - null, use "use strict" at top

//      2)
function f() {
  console.log(this.name);
}
foo = f.bind({ name: "Vnnovate" }).bind({ name: "Vnn" }); // Can't change "This" by additional binding

foo(); // Return - Vnnovate

//      3)
function sayHi() {
  console.log(this.name);
}
sayHi.test = 5;
let bound = sayHi.bind({
  name: "Vnn",
});
console.log(sayHi.test); // return - 5
console.log(bound.test); // during binding with sayHi we not pass test only passed name
*/

/*
/// HomeWork
function partial(func, ...Time) {
  return function (...parse) {
    return func.call(this, ...Time, ...parse);
  };
}

let user = {
  name: "Vnn",
  say(time, parse) {
    console.log(`[${time}] ${parse}, ${this.name}`);
  },
};

user.sayHii = partial(
  user.say,
  new Date().getHours() + ": " + new Date().getMinutes()
);

user.sayHii("Hello");
*/
