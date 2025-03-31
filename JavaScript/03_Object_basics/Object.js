/// Object creation methods

let user1 = {
  // Using Object Literals
  name: "Vnnovate",
  location: "Ahmedabad",
  age: 10,
};

let user2 = new Object({
  // Using Object constructor
  name: "Vnnovate",
  location: "Pune",
  age: 13,
});

// console.log(user1.location);
// console.log(user2.age);

user1.age = 11; // Modify
// user2.age = 14;
// console.log(user1);
// console.log(user2);

// user1.isMainBranch = true; // Add
// user2.isMainBranch = false;
// console.log(user1);
// console.log(user2);

// delete user1.age;
// delete user2.age;
// console.log(user1);
// console.log(user2);

user1["is Know"] = true;
user2["is Know"] = false;

// more complex
let fruit = "apple";
let bag = {
  [fruit + "Computers"]: 5, // bag.appleComputers = 5
};

// Property value shorthand
function makeUser1(name, age) {
  return {
    name: name,
    age: age,
  };
}
function makeUser2(name, age) {
  // shorthand of above
  return {
    name,
    age,
  };
}
let user3 = makeUser1("Vnnovate", 15);
let user4 = makeUser2("Hello", 18);
// console.log(user3);
// console.log(user4);

/*
// test any Properties is exists or not.
console.log(user3.location === undefined);
console.log("location" in user4); 
*/

// Test case
let test = {
  test: undefined,
};
// console.log("test" in test); // true - work correct

/*
// iterate over all properties use for...in loop
for (let key in user3) {
  console.log(`${key}: ${user3[key]}`);
}
*/

// Experiment
let obj1 = {
  sym: Symbol("Symbol chhe"),
  sym: Symbol("Symbol chhe!"),
  10: "ten",
  ten: 10,
  15: "fifteen",
  5: "five",
};
// console.log(obj1);

let obj2 = {
  // but not it perform like above
  "+10": "ten",
  "+15": "fifteen",
  "+5": "five",
};
// console.log(obj2);
