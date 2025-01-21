"use strict";
/// F.prototype
//      - F.prototype property is only use when `new F` is called
//      - By default all functions have F.prototype = { constructor: F }, so we can get the constructor of an object by accessing its "constructor" property.

/*
let animal = {
  eats: true,
};
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); // means rabbit.__proto__ = animal
console.log(rabbit.eats); // Return - true
*/

/*
// Default F.prototype
function Rabbit(name) {
  this.name = name;
  console.log(`Name: ${name}`);
}
//      By-Default
//      Rabbit.prototype = { constrtuctor: Rabbit }
console.log(Rabbit.prototype.constructor == Rabbit); // Return - true

let rabbit = new Rabbit(); // inherite from { constructor: Rabbit }
console.log(rabbit.constructor == Rabbit); // Return - true

// both put value in Rabbit constructor.
let rabbit1 = new Rabbit("White Rabbit");
let rabbitSmall = new rabbit1.constructor("Small white Rabbit");
console.log(rabbit1.name); // Return - White Rabbit

// If we replace the `default prototype` as a whole, then there will be no any `constructor` in it.
function Animal() {}
Animal.prototype = {
  jump: true,
  // constructor: Animal, // can create manualy, so it Return - true at line 39
};
let animal = new Animal();
console.log(animal.constructor == Animal); // Return - false
console.log(animal.jump); // return - true
*/

// Experiments
//      1)
function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit = new Rabbit();

// //      1.1)
// Rabbit.prototype = {};
// console.log(rabbit.eats); // Return - true

// //      1.2)
// Rabbit.prototype.eats = false;
// console.log(rabbit.eats); // Return - false

// //      1.3)
// delete rabbit.eats;
// console.log(rabbit.eats); // Return - true

//      1.4)
delete Rabbit.prototype.eats;
console.log(rabbit.eats); // Return - undefined
