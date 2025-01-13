/// Optional Chaining
//      - use for safe way to access nested Object properties.
//      - if Object will not define then it will give error.

let obj = {
  name: "Vnnovate",
  age: 15,
  address: {
    city: "Ahmedabad",
    area: "Escon",
  },
  admin() {
    console.log("This is Admin call");
  },
};
let object = {};

/*
console.log(obj?.address?.area); // Return - Escon
console.log(obj?.addr?.area); // Return - undefined
*/

/*
console.log(obj?.admin?.());
console.log(object?.admin?.());
*/

console.log(delete obj?.age); // Return - true
console.log(delete object?.age); // Return - true
