/// Decorator & Forwarding, call/apply

/// Transparent Caching
//  - When to use?
//      - when slow like function takes significant amount of time.
//      - when function call with same input
//      - main work of this caching is optimize that code using caching

//  - Banefit
//      - "cachingDecorator" is reusable
//      - not increase complexity of slow
//      - we can combine multiple decorators if needed

/*
/// Transparent caching with function not with Object
function slow(x) {
  console.log(`Called with ${x}`);
  return x * x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}

let check = cachingDecorator(slow);

console.log(check(10));
console.log(check(10));
console.log(check(20));
console.log(check(20));
*/

/*
/// func.call(context, arg1, arg2, ...)
//      - Transparent caching is defficult in Object to pass "this", that's way func.call() comes in.

function sayHi(parse = "?") {
  console.log(`Hii, ${this.name} ${parse}`);
}
let user1 = { name: "Vnnovate" };
let user2 = { name: "Vaibhav" };

// pass Obj as "this"
sayHi.call(user1, "!");
sayHi.call(user2);

/// transparent caching with Obj using func.call()
let worker = {
  something() {
    return 2;
  },
  slow(x) {
    console.log(`Called with ${x}`);
    return x * this.something();
  },
};

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // "This" referece to worker
    cache.set(x, result);
    return result;
  };
}

// This insure that we overrite slow method with cached version
worker.slow = cachingDecorator(worker.slow); // should be worker.slow because we modify the behavior of that specific method within the worker object. worker.slow will not lost "This" of worker Obj

console.log(worker.slow(10));
console.log(worker.slow(10));
*/

/*
/// Multipal argument
//  - problem is that we use Map that store like cache.set(x, result), but here is "x, y" what should do?
//  - Solution
//      - implement a new Map like data Structure that is versatile and allow multi-keys
//      - use nested Map: like map.set(x) will be the Map, (y, result) is pair. so we can get result as cache.get(x).get(y)
//      - we use String as a key, means implement func that convert x,y to "x, y" as a key and store result based on that key

// using func.call()
let print = {
  something() {
    return 1;
  },
  sayHii(x, y) {
    console.log(`Called with ${x} & ${y}. `);
    return x * y * this.something();
  },
};
function hash(args) {
  return `${(args[0], args[1])}`; // work only for 2 arguments
  // or
  // return [].join.call(arguments); // "Borrowing" - borrow `[].join` from array and use `[].join.call()`
}

print.sayHii = cachingDecorator(print.sayHii, hash);
console.log(print.sayHii(1, 2));

function cachingDecorator(func, hash) {
  let cache = new Map();

  return function () {
    let key = hash(arguments); // arguments is built-in JS Object which provide access to all the args passed to function at runtime that is old method of speed operator

    if (cache.has(key)) {
      return cache.get(key);
    }

    // let result = func.call(this, ...arguments); // passed context and all args
    // or
    let result = func.apply(this, arguments); // passed context and all args
    cache.set(key, result);
    return result;
  };
}

// using func.apply()
//      - insteed using `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`
//      - apply() takes Array like arguments where call() takes list of arguments

// Borrowing the method
//      - Here `join` is borrowed from Array.

function hash() {
  return [].join.call(arguments); // This is called borrowing
}
*/

///   Experiments
/*
//      1) Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}

function work(a, b) {
  console.log(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 3); // Return - 4
work(2, 4); // Return - 6

for (let args of work.calls) {
  console.log("call:" + args.join()); // Return -
}
*/

//      2) Delay Decorator
function func(x) {
  console.log(x);
}

let f1000 = delay(func, 1000);
let f1500 = delay(func, 1500);

f1500("Test 1500"); // Return - test 1500, after 1.5 Sec -> second display
f1000("test 1000"); // Return - test 1000, after 1 Sec -> first display

function delay(func, ms) {
  return function () {
    setTimeout(() => func.apply(this, arguments), ms);
  };
}
