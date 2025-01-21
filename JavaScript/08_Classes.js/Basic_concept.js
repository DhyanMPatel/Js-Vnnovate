/// Class
//      - When class is created
//          1. Using `class User{...}` create function name User. The function code is taken from the constructor method (assumed empty if we don’t write such method).
//          2. Store class methods, such as `sayHi`, in `User.prototype`.

class User {
  age = 19; // class fields
  constructor(name) {
    this.name = name;
  }
  giveName() {
    return `${this.name}`;
  }
  sayHi() {
    console.log(`Hii, ${this.name}`);
  }
  // ...
}

/*
let user = new User();
console.log(user.age); // Return - 19
console.log(User.prototype.age); // Return - undefined
*/

/*
/// Class Expression
let Animal = class {
  isWalk() {
    console.log("This is not Walking.");
  }
};

/// Named Class Expression
let NCE = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class
  }
};
new NCE().sayHi(); // works, shows MyClass definition
// console.log(MyClass); // error, MyClass name isn't visible outside of the class
*/

/*
/// Can make Dynamically
function makeClass(parse) {
  return class {
    sayHi() {
      console.log(`Hii, ${parse}`);
    }
  };
}
let DynamicClass = new makeClass("Vnno");
new DynamicClass().sayHi();
*/

/*
let user1 = new User("Vnno");
user1.sayHi();
console.log(`user1 Name is ${user1.giveName()}!`);

// class is a function
console.log(typeof User); // Return - function

// ...or, more precisely, the constructor method
console.log(User === User.prototype.constructor); // Return - true

// The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, giveName, sayHi
*/

// console.log(User);

/*
/// Getter/Setter
class Animal {
  constructor(name) {
    this.name = name;
  }
  ["say" + "Hi"]() {
    console.log(`Hii, ${this.name}`);
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (!value) {
      console.log(`please provide name`);
    }
    this._name = value;
  }
}
let dog = new Animal(); // Return - please provide name

let cat = new Animal("Cat");
console.log(cat.name); // Return - Cat

/// Computed method name
new Animal("Budy").sayHi(); // Return - Hii, Budy
*/

/*
// bound method with class field
class Button {
  constructor(val) {
    this.value = val;
  }
  click = () => {
    console.log("Clicked", this.value);
  };
}
let btn = new Button("Btn");
setTimeout(btn.click, 1000);
*/

/// Experiment
class Clock {
  constructor(template) {
    this.template = template;
  }
  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let minute = date.getMinutes();
    if (minute < 10) minute = "0" + minute;

    let second = date.getSeconds();
    if (second < 10) second = `0${second}`;

    let output = this.template
      .replace("h", hours)
      .replace("m", minute)
      .replace("s", second);

    console.log(output);
  }

  stop() {
    clearInterval(this.timmer);
  }
  start() {
    this.render();
    this.timmer = setInterval(() => this.render(), 1000);
  }
}

class ExtentedClock extends Clock {
  /// Bydefault, no need to write constructor like bellow
  constructor(...args) {
    super(...args);
  }
}

let clock = new Clock("h:m:s");

let exClock = new ExtentedClock("h-m-s");

// clock.start();
// setTimeout(() => {
//   clock.stop();
// }, 10000);

exClock.start();
setTimeout(() => {
  exClock.stop();
}, 10000);
