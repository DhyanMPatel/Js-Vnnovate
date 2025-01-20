// Export
//      - Export before declarations
//      - No semicolons after export class/function
//      - Also, we can put export separately.

/*
// export an array
export let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}
*/

/*
// Export can be seperate
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye }; // a list of exported variables
*/

/*
/// Export "as"
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi as hi, sayBye as bye };

import {hi, bye} from sayBye.js /// we can import like this
*/

/*
/// Import
//      -

import { sayHi, sayBye } from "./say.js";
sayHi("John"); // Hello, John!
sayBye("John"); // Bye, John!

/// import 'as'
import { sayHi as hi, sayBye } from "./say.js";
sayHi("John"); // Hello, John!
sayBye("John"); // Bye, John!

import * as say from "./say.js";
say.hi("John"); // Hello, John
say.bye("John"); // Bye, John
*/

/*
/// Export Default
//  - default export should be only one in one file.
//  - there are mainly 2 type of modules
//      - Modules that contain a library, pack of functions, like say.js above
//      - Modules that declare a single entity, e.g. a module user.js exports only class User.

// 📁 user.js
export default class User {
  // just add "default"
  constructor(name) {
    this.name = name;
  }
}

// 📁 main.js
import User from "./user.js"; // not {User}, just User
new User("John");

// export a single value, without making a variable
// export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
*/

/*
/// Re-export
//      - syntax `export ... from ...`

export { sayHi } from "./say.js"; // re-export sayHi
export { default as User } from "./user.js"; // re-export default

// 📁 auth/index.js
// import login/logout and immediately export them
import { login, logout } from "./helpers.js"; // also can do as above in one line
export { login, logout };

import { login, logout } from "auth/index.js";

export * from './user.js'; // to re-export named exports
export {default} from './user.js'; // to re-export the default export
*/
