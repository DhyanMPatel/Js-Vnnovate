// This with Object
//      - this in obj refer to current object data but not store them
//      - Function has not own "this" including Arrow function
//      - if we store function inside object then that will be method of that object
//      - That method has "this" reference to current object
//      - if we want to get that "this" refer to which Object then we just return this using method inside Object
//      - Using "this" in Object we can make chainable.

let user = {
  name: "Vnn",
  age: 25,
  ref: this, // instead of making properties make method and return this
  ref(){
    return this; // refer to current object data
  },
  sayHii() {
    console.log(`Hii, ${this.name}!`);
    /// If there are "user" instead "this", and user is now null then it will not refer anyone. and give error
  },
};
let admin = user;
user = null;
console.log(admin.sayHii());


let user1 = {name:"User1"}
let user2 = {name:"User2"}

function sayHi(){
  console.log(`Hii ${this.name}!`);
  
}
user1.sayHi = sayHi; // required to make method of that obj
user2.sayHi = sayHi;
console.log(user1.sayHi()); // return - Hii User1!

/// Experiment
let chaining = {
  step:0,

  up(){
    this.step++;
    return this;
  },
  down(){
    this.step--;
    return this;
  },
  showStep(){
    console.log(`Step: ${this.step}`);
    return this;
  }
}

/// Chaining - cool method
chaining
  .up()
  .up()
  .showStep()
  .down()
  .up()
  .showStep()

