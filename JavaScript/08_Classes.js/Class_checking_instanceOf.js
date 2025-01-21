/// Behind the seen in InstanceOf

/*
///         1)
// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };
let obj2 = {};

console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
console.log(obj2 instanceof Animal); // false
*/

/*
///         2)
//      - somethis object do not have Symbol.hasInstance. in this case, use Standard logic
//          obj.__proto__ === Class.prototype?
//          obj.__proto__.__proto__ === Class.prototype?
//          obj.__proto__.__proto__.__proto__ === Class.prototype?
//          // if any answer is true, return true
//          // otherwise, if we reached the end of the chain, return false

class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
alert(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)
*/

/*
/// Bonus: Pbject.prototype.toString - budefault it converted to string as [object Object]

// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

// what type is this?
let arr = [];

console.log(objectToString.call(arr)); // Return - [object Array]
console.log(objectToString.call(123)); // Return - [object Number]
console.log(objectToString.call(null)); // Return - [object Null]
*/

/// Symbol.toStringTag
//      - can be customized using a special Object property

let user = {
  [Symbol.toStringTag]: "User",
};
console.log({}.toString.call(user)); // Return - [object User]
/*
// Experiment
function Rabbit() {}
let rabbit = new Rabbit();

// changed the prototype
Rabbit.prototype = {};

// ...not a rabbit any more!
alert( rabbit instanceof Rabbit ); // false
*/
