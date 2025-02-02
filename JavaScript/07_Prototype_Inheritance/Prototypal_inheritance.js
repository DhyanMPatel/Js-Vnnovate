// Prototypal Inheritance

// 1. obj1.__proto__ = obj2;
//      - there are all methods and properties are inherite from animal to dog using `__proto__` which is called prototypal Inheritance

/*
let animal = {
  eats: true,
  walk() {
    return "Animal Walk";
  },
};
let dog = {
  barks: true,
};
let Human = {
  run: false,
  __proto__: dog,
};
dog.__proto__ = animal;
console.log(dog.eats); // Return - true
console.log(dog.barks); // Return - true
console.log(dog.walk());

console.log(Human.barks);

console.log(dog.run); // Return - undefined

Human.walk = function () {
  return "This is changed!";
};

console.log(dog.walk()); // Return - Animal Walk, Steel same
console.log(Human.walk()); // This is Changed!, only made changes in chaild object

console.log(animal, dog);
*/

/*
let user = {
  fName: "Vnn",
  lName: "ovate",
  age: 20,

  get fullName() {
    return `${this.fName}${this.lName}`;
  },
  set fullName(value) {
    [this.fName, this.lName] = value.split(" ");
  },
};
let Admin = {
  fName: "Dhyan",
  lName: "Patel",
  __proto__: user,
  isAdmin: true,
  get fullName() {
    return `${this.fName} ${this.lName}`;
  },
  set fullName(value) {
    [this.fName, this.lName] = value.split(" ");
  },
};
console.log(Admin.fullName); // Return - "Dhyan Patel"
console.log(user.fullName); // Return - "Vnnovate"

Admin.fullName = "Dh Pa!";
console.log(Admin.fullName); // Return - "DhPa!"
console.log(user.fullName); // Return - "Vnnovate"

/// Loop...in
//      - Return all key
for (let prop in Admin) console.log(prop); // Return - fName, lName, isAdmin, fullName, age

/// Object.keys()
//      - Return only own keys
console.log(Object.keys(Admin)); // Return - [ 'fName', 'lName', 'isAdmin', 'fullName' ]
*/

/*
/// Experiment
let animal = {
  jumps: null,
};
let rabbit = {
  __proto__: animal,
  jumps: true,
};

console.log(rabbit.jumps); // Return - true, taken from rabbit

delete rabbit.jumps;

console.log(rabbit.jumps); // Return - null, taken from animal

delete animal.jumps;

console.log(rabbit.jumps); // Return - undefined, no such property any more

// where does it write
//      - Que -> which Object recive full property? - Rabbit1
let animal1 = {
  eat() {
    this.full = true;
  },
};

let rabbit1 = {
  __proto__: animal1,
};

rabbit1.eat(); // recive rabbit1
console.log(rabbit1.full); // Return - True
console.log(animal1.full); // Return - undefined
*/