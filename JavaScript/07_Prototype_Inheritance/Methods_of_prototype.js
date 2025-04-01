// Methods to get/set prototype
//      1. Object.getPrototypeOf(obj) - returns the [[Prototype]] of obj
//      2. Object.setPrototypeOf(obj, proto) - sets the [[Prototype]] of obj to proto.
//      3. Object.create(proto[, descriptors]) - create an empty Object with given proto as [prototype] and optional property descriptors.
//      4. __proto__ - use same as above (old method)

/*
let animal = {
  eats: true,
};
let dog = Object.create(animal, {
  jumps: {
    value: false,
  },
});
console.log(Object.getPrototypeOf(dog)); // Return - { eats: true }
console.log(dog.jumps); // Return - false
console.log(dog.eats); // Return - true
console.log(animal.jumps); // Return - undefined
*/

/*
/// Interesting Glitch with Object
//      - all keys work fine except "__proto__".
//      - Ex

let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "Some Value";

console.log(obj[key]); // [object Object], not "Some Value" why?
*/

/*
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
*/

// Experiment
/*
//      1) - create toString() method for
let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    },
  },
});

dictionary.apple = "Apple";
dictionary.__proto__ = "Test";

for (let key in dictionary) console.log(key);

console.log(dictionary);
*/

/*
//      2) - Difference between calls
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  console.log(this.name);
};

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi(); // Return - Rabbit
Rabbit.prototype.sayHi(); // Return - undefined
Object.getPrototypeOf(rabbit).sayHi(); // Return - undefined
rabbit.__proto__.sayHi(); // Return - undefined
*/

/*
/// Home work
/// Create proper clone including descriptors of all properties and same as obj
let clone = Object.create(
  Object.getPrototypeOf(dog),
  Object.getOwnPropertyDescriptors(dog)
);
console.log(Object.getPrototypeOf(clone)); // Return - { eats: true }
console.log(Object.jumps); // Return - undefined
*/
