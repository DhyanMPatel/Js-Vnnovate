/// Construtor Function
//      - same a regular function but 2 things are different:
//          1. function name should be Capitalize
//          2. execute with "new" operator only
//      - this function always execute with "new" keyword
//      - Generally constructor do not have return statement.
//      - Their task is to write all necessary stuf into this.
//      - use to make multiple similer Objects.
//      - There are other functions like Date, Set, 

//      - New.Target will give the constructor function name which is used to create the object.

function User(name, age) {
  // this = {};   (Implicitly)

  this.name = name;
  this.age = age;
  this.isAdmin = false;
  this.method = function(){
    console.log("This is Function");
  }

  // return this;   (Implicitly) 
}

let user1 = new User("Vnnovate", 19); // Here we use "new" keyword.
let user2 = new User("Dhyan", 12);

// console.log(user1.name, user2.age); // Return - Vnnovate 12
// user1.method();


function UserNew(name){

  if(!new.target) {
    return new UserNew(name);
  }

  this.name = name;
  this.methodName = function () {
    console.log("This is Function with ", this.name); // Return - This is Function with Vnnovate
  }
}

let tryNew = UserNew("Vnnovate"); // Here we not use "new" keyword.
console.log(tryNew.name); // Return - Vnnovate
tryNew.methodName(); // Return - This is Function with Vnnovate


/// Experiment
let obj = {};

function A() {
  return obj;
}
function B() {
  return obj;
}
