/// Construtor Function
//      - This should generally capitalized function-name
//      - Constructor functions should only be called using `new`.
//      - constructor Functionuse to cover all data in this keyword

function User(name, age) {
  (this.name = name), age;
}

let user1 = new User("Vnnovate", 19);
let user2 = new User("Dhyan", 12);

/// Experiment
let obj = {};

function A() {
  return obj;
}
function B() {
  return obj;
}
