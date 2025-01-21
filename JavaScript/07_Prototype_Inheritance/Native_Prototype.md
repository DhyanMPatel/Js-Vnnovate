# Native prototype

- All built-in constructor functions use `prototype`.

## Object.prototype

    ```js
    let obj = {}; // Same as let obj = new Object();
    console.log(obj);

    /// Return - true, because obj inharite from Object.
    console.log(obj.__proto__ === Object.prototype);
    console.log(obj.toString === Object.prototype.toString);
    console.log(obj.toString === obj.__proto__.toString);

    /// But there is no more [[prototype]] of Object
    console.log(Object.prototype.__proto__); // Return - null
    ```

## Other Built-in Prototypes

- There is other Prototypes such as `Array`, `Date`, `Function` and others also keep methods in prototypes.
- When we create an arr [1,2,3], use `new Array()` initially. So `Array.prototype` become it's prototype and provide methods. That's very memory-efficient
- Example

  ```js
  let arr = [1, 2, 3];

  console.log(arr.__proto__ === Array.Prototype); // Return - true
  console.log(arr.__proto__.__proto__ === Object.Prototype); // Return - true
  console.log(arr.__proto__.__proto__.__proto__); // Return - null
  ```

  ```js
  function f() {}

  console.log(f.__proto__ == Function.prototype); // true
  console.log(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects
  ```

## Changing native prototypes

- Native Prototypes can be modify, means if we add method in `String.prototype`,

  ```js
  String.prototype.show = function () {
    console.log(`${this}!`);
  };

  "Boom".show(); // Return - Boom!
  ```

- Note -> Prototypes are global, so it’s easy to get a conflict. If two libraries add a method String.prototype.show, then one of them will be overwriting the method of the other. So, generally, modifying a native prototype is considered a bad idea.

  ```js
  if (!String.prototype.repeat) {
    // if there's no such method

    // add it to the prototype

    String.prototype.repeat = function (n) {
      // repeat the string n times

      // actually, the code should be a little bit more complex than that
      // (the full algorithm is in the specification)
      // but even an imperfect polyfill is often considered good enough
      return new Array(n + 1).join(this);
    };
  }

  console.log("La".repeat(3)); // LaLaLa
  ```

## Borrowing Properties

- that’s when we take a method from one object and copy it into another.

  ```js
  let obj = {
    0: "Hello",
    1: " World!",
  };
  obj.join = Array.prototype.join;
  console.log(obj.join(",")); // Return - Hello, World!
  ```

### Home work

- Why Borrowing Properties example is not work in browser, means not give proper output?
