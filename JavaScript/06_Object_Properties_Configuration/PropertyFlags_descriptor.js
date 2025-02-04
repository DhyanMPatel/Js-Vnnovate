/// Property Flags & Descriptors

/// Property Flags
//      - generally they do not show up
//      - based on pertiqular properties
//      - if we overrite available properties using defineProperty() then only name will be change not WEC value.
//      - Flags worked in Strict mode only.
//      - There are 3 Types of Flags
//          1. Writable - if true then we can change value, otherwise not.
//          2. Enumerable - if true then we can see in loops, otherwise not.
//          3. Configurable - if true then we can delete, modify, etc. otherwise not.

// Access those Flags
//      - Syntax -> let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)

// create Properties
//      - Using Object.defineProperty we can create properties with WEC, false value.
//      - Syntax -> Object.defineProperty(obj, propertyName, descriptor)
//      - During this method bydefault all flags are false, so we need to write only that flags that we want to be true. if we create new property.

/*
let user = {
  name: "vnn",
};
let nameDescriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.parse(JSON.stringify(nameDescriptor))); // WEC - will be true

Object.defineProperty(user, "age", {
  value: 18,
});
let ageDescriptor = Object.getOwnPropertyDescriptor(user, "age");
console.log(JSON.parse(JSON.stringify(ageDescriptor))); // WEC - will be false
*/

/*
/// Non-Writable
let user = { name: "Vnn" };
Object.defineProperty(user, "name", {
  writable: false,
});
Object.defineProperty(user, "age", {
  value: 14,
  enumerable: true, // If true then can see
  configurable: true,
});
user.name = "Vnnovate"; // Error - not Writable
user.age = 19;

console.log(user);
let descriptor = Object.getOwnPropertyDescriptor(user, "age");
console.log(JSON.stringify(descriptor));
*/

/*
/// Non-enumerable
//      - there are a method or property, bydefault it appear in `for...in` loop.
//      - but if we do't like to display during for...in loop (just like the built-in one) then do enumerable: false

let user = {
  name: "vnn",
  toString() {
    return `Name: ${this.name}`;
  },
};
for (let key in user) console.log(`Key: ${key}`);

Object.defineProperty(user, "toString", {
  enumerable: false,
});
for (let key in user) console.log(key);
console.log(Object.keys(user)); // also exclude "toString()"
*/

/*
/// Non-Configurable
//      - `configurable: flase` is sometimes priset for build-in Objects and properties
//      - Ex -> Math.PI is non-WEC
//      - we cant redefine property if there are only cofigurable: false. otherwise we can do anything like modify value, delete that, etc.

// let descriptor = Object.getOwnPropertyDescriptor(Math, "PI");
// console.log(JSON.stringify(descriptor, null, 2));
// Object.defineProperty(Math, "PI", { writable: true }); // Error - because configurable is false

let obj = {
  name: "Vnnovate",
};
let nameDescriptor = Object.defineProperty(obj, "name", {
  writable: false, // also required to make Immutable
  configurable: false,
});
obj.name = "Vnn"; // No Effect
delete obj.name; // No Effect

for (let ele in obj) console.log(ele); // name, enumerable:true

// let another = Object.defineProperty(obj, "name", {
//   // not Possible Because configurable: false
//   enumerable: false,
//   writable: true,
//   configurable: true,
// });
console.log(obj);
*/

/*
/// Object.defineProperties - use to define many properties at once
//      - Syntax -> Object.definePRoperties(obj,{ prop1: desc1, prop2: decs2, prop3: decs3, ... })

let obj = {};
Object.defineProperties(obj, {
  name: { value: "Vnno", writable: true, enumerable: true },
  age: { value: 17, writable: false, enumerable: true, configurable: true },
});
console.log(obj);
*/

/*
/// Object.getOwnPropertyDescriptors - use to get all property descriptor at once
let obj = {
  name: "Vnnovate",
};
console.log(Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))); // cloning in better way.
*/

/// Object Other Method
//      - There are multiple Objects methods that limit access to the whole Object
//          1. Object.preventExtensions(obj) - forbid addition of new Properties
//          2. Object.seal(obj) - forbid adding/removing properties, using `configurable: false`
//          3. Object.freeze(obj) - forbid adding/removing/modify properties, using `configurable:false` and `writable:false`
//          4. Object.isExtensible(obj) - check obj is extensible or not
//          5. Object.isSeal(obj) - check obj is seeled or not
//          6. Object.isFrozen(obj) - check obj is frozen or not

/*
/// Experiment
let user = {
  name: "vnn",
};
Object.defineProperty(user, "name", {
  value: "Vnnovate", // line - 6
});
let overriteNameDescriptor = Object.getOwnPropertyDescriptor(user, "name");

console.log(JSON.parse(JSON.stringify(overriteNameDescriptor))); // WEC - will be true
*/
