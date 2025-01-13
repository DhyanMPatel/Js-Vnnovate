// Map
//      - Map is a keyed data item, just like Object. But main Difference is Map allows keys of any type.
//      - keys can be Object, in Object it will override
//      - each map.set() return the map itself, so we can chain the calls.

/*
// Methods and Properties
new Map() - create map
map.set(key, value) - store the value by the key
map.get(key) - return value by the key, "undefined" if key is not exist
map.has(key) - return true if exist, false if not
map.delete(key) - delete value by the key
map.clear() - clear everything from map
map.size - return current element count
*/

/*
let map = new Map();

map.set("1", "str1"); // a string key
map.set(1, 123); // a numeric key
map.set(true, "bool1"); // a boolean key

console.log(map.get("1")); // Return - str1
console.log(map.get(1)); // Return - num1
console.log(map.get(true)); // Return - bool1
*/

/*
// Object as a key
let john = { name: "John" };
let vnn = { name: "Vnnovate" };
let map = new Map();

map.set(john, 123);
map.set(vnn, 789);
console.log(map.get(john));
console.log(map.get(vnn));
*/

/*
/// Experiment - Object not support to make obj as a key
let john = { name: "John" };
let ben = { name: "Ben", age: 20 };

let visitsCountObj = {}; // try to use an object

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// That's what got written!
console.log(visitsCountObj["[object Object]"]); // 123
*/

/*
/// Iteration over Map
//      - map.keys() -> return iterable for keys
//      - map.values() -> return iterable for values
//      - map.entries() -> return iterable for entries(key, value), used by default in for..of.

let map = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);
for (let vagetables of map.keys()) {
  console.log(vagetables); // return - cucumber, tomatoes, onion
}
for (let amount of map.values()) {
  console.log(amount); // Return - 500, 350, 50
}
for (let entry of map.entries()) {
  console.log(entry); // Return - ['cucumber', 500], ['tomatoes', 350], ['onion',    50]
}
*/

/*
/// Object.entries() - Map from Object
//      - Object.entries() return arr of key-value pair thats map needed
let obj = {
  name: "vnn",
  age: 13,
};
let map = new Map(Object.entries(obj));
console.log(map.get("name"));
*/

/*
/// Object.fromEntries() - Object from Map
//      - Object.fromEntries() return map as an Object
let map = new Map([
  ["name", "vnn"],
  ["age", 13],
]);

let obj = Object.fromEntries(map);
console.log(obj);
*/
