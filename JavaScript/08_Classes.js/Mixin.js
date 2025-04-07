/// Mixin
//      - make an object with useful methods, so that we can easily merge them into a prototype of any class.
//      - Using mixin can create multiple inheritance in JavaScript.
//      - Here Object is called mixin and class.prototype is called target.

let sayMixin = {
  say(anyThing){
    console.log(anyThing)
  }
}

// mixin
let sayHiMixin = {
  __proto__: sayMixin, // for inheritance
  sayHi() {
    console.log(`Hello ${this.name}`);
    super.say("Hii from Parent");
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
    super.say("Bye from Parent");
  },
};
// Object.setPrototypeOf(sayHiMixin, sayMixin); // for inheritance also

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
