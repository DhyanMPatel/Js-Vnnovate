// Getter & Setter
//      - there are 2 kind of properties in Object
//          1. Data Property
//          2. Accessor Property

/*
/// Getter & Setter
//      - useing `get` & `set` we create Property but look like function but we call as property
//      - property can be either an accessor or data property, not both.

let obj = {
  name: "Vnnovate",
  location: "Ahm",
  age: 19,
  get sayHii() {
    return `Hii, ${this.name}`;
  },
  set sayHii(value) {
    this.name = value;
  },
};
obj.name = "Vnn";
console.log(obj.sayHii);

Object.defineProperty(obj, "fullName", {
  get() {
    return `${this.name} at ${this.location}`;
  },
  set(value) {
    [this.name, this.location] = value.split(" ");
  },
});
obj.fullName = "Vnn Ahm";
console.log(obj.fullName);
*/

/*
/// Smatter Getter & Setter
//      - can be used as Wapper over "real" property value to gain full control over operations
let obj = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short");
      return;
    }
    this._name = value;
  },
};
obj.name = "Vnntt";
console.log(obj.name);
console.log(obj._name); // Vnntt, accessible
console.log(obj); // Return - { name: [Getter/Setter], _name: 'Vnntt' }
*/

/// for compatibility
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}
let user1 = new User("Vnn", new Date(2004, 3, 10));
console.log(user1.birthday); // Return - 2004-04-09T18:30:00.000Z
console.log(user1.age); // Return - 21
