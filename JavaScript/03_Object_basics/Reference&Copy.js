// Objects are stored and copy "By Reference"
//      whereas primitive values are always copied "by a whole value"

//      - Objects basically store "address in memory" means "take a reference".

/// How its happened
let user = {
  name: "John",
};
let admin = user;
admin.age = 25; // admin and user both refer to same object in memory
/*
1. user Object stored in memory, it has refernce of "name" properties means store address of properties in memory
2. when we call properties using `user.name`. means it has address so go to that address in memory and provide value inside that.
3. Now admin also take reference means admin also store the address of "name" property.
4. if we change value inside "name" property then automatically value changed which obj has it's reference.
*/

let obj1 = {};
let obj2 = obj1; // both are same Object

let obj3 = {};
let obj4 = {}; // both are different Object

// Copy Object properties in right way
let realCopy1 = {};
let realCopy2 = {};
for (ele in user) {
  realCopy1[ele] = user[ele];
}
// Object.assign(realCopy2, user, admin);
// console.log(realCopy1);
// console.log(realCopy2);

let nestedObj = {
  name: "Vnnovate",
  age: 19,
  address: {
    city: "Ahmedabad",
    location: "Escone",
  },
};

let nestedObjCopy = Object.assign({}, nestedObj);
// console.log(nestedObjCopy.address === nestedObj.address); // true, same Object

// Solution
let realnestedObjCopy = structuredClone(nestedObj);
// console.log(realnestedObjCopy.address === nestedObj.address); // false, different

// console.log(realnestedObjCopy.address === nestedObjCopy.address); // false

let nestedObjRef = nestedObj;
// console.log(realnestedObjCopy.address === nestedObjRef.address); // false

/// but in circular Reference ?, `
let cir = {};
cir.me = cir;

let cirCopy = structuredClone(cir);
// console.log(cirCopy.me === cirCopy); /// true
