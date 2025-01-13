// Symbol in Object

//      - Symbol is use to make properties in Object
//      - Symbols don’t auto-convert to a string
//      - Symbol properties are skipped by for...in & Object.keys() loop in Object
//      - Object.assign({},source) copy both String and Symbol properties.

//      - using Symbol.for() we can create Global Symbol
//      - to access that value use Symbol.keyfor()

let id = Symbol("_id");
let id2 = Symbol("_id");

// console.log(id.description); // Return - _id, value inside Symbole

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
let user1 = Symbol.for("user");
let user2 = Symbol.for("user");

console.log(user1 === user2); // Return - true
console.log(Symbol.keyFor(user1)); // Return - user, value of user1 Symbol
