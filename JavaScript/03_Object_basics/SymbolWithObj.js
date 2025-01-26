// Symbol in Object

//      - Represent unique identifier.
//      - Symbol is use to make properties in Object
//      - Symbols don’t auto-convert to a string
//      - Symbol properties are skipped by for...in & Object.keys() loop in Object
//      - Symbol Properties are work as "Hidden" properties, but Object.assign({},source) copy both String and Symbol properties.
//      - Also there is Built-in method `Object.getOwnPropertySymbols(obj)` to get Symbolic values. 

/// MEthods
//    - Symbol() for create Symbol
//    - SymbolName.description for get value inside Symbol
//    - Symbol.for() to create Global Symbol
//    - Symbol.keyFor() to get value inside Global Symbol

let id = Symbol("_id");
let id2 = Symbol("_id");

// console.log(id); // Error
// console.log(id.description); // Return - _id

// console.log(id == id2); // Return - false

// console.log(id.toString()); // Return - Symbol(_id), in String format

let obj = {
  name: "Vnnovate",
  [id]: "1233",
};
obj[id2] = "Vnn1234";
// console.log(obj);

/*
for (pro in obj) {
  console.log(pro);
}
console.log(Object.keys(obj));
console.log(Object.assign({}, obj));
*/

// Global Symbols
//    - sometimes we wants same-named symbol for different part of application to access
let user1 = Symbol.for("user");
let user2 = Symbol.for("user");

console.log(user1 === user2); // Return - true
console.log(Symbol.keyFor(user1)); // Return - user, value of user1 Symbol
