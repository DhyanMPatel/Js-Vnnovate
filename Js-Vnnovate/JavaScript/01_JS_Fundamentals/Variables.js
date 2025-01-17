
/// LET - no Hoisting, Block Scope
{
  // Block Scope
  let one = 1;
  //   console.log(one);
}
// console.log(one);   // Error - one is not Defined

function funcScope() {
  // Function Scope
  let two = 2;
  console.log(two);
  {
    console.log(two);
  }
}
// funcScope();
// console.log(two); // Error - two is not Defined

let three = 3.5;
function globalScope() {
  // Glocal Scope
  let three = 4.5; // Possible - Redeclaring "Three"
  console.log(three);
}
// let three = 5.5    // Impossible - same Scope
// globalScope();
// console.log(three);




/// CONST - no Hoisting, Block Scope, No Reassigned, work with Primitives
if (true) {
  // Block Scope
  const four = "4";
  // console.log(four);
}

// With Arr
const arr1 = [1, 2, 3, 4];
arr1[2] = 3.3; // Can Possible (Modification)
// console.log(arr1);

// With Object
const obj1 = {
  name: "Dhyan",
  Address: "Ahmedabad",
};
// console.log(obj1);
obj1.name = "Vnnovate"; // Can Possible (Modification)
// console.log(obj1);




/// VAR - Function Scope
var five = true,
  six = false;
function varFuncScope() {
  var five = "5"; // can be diffetent
  console.log(five, six);
  {
    var five = 5.5;
    console.log(five);
  }
  console.log(five, six);
}
// varFuncScope();
// console.log(five, six);


// let str = "Vnnovate";
// str[2] = "o"; 
// console.log(str);


/// Exception in Number Datatype
// console.log(NaN ** 0);  // Return - 1
// console.log(null ** 0); // Return - 1
// console.log(undefined ** 0);  // Return -1


// Experement 
// console.log(typeof null); 
// console.log(typeof NaN);
// console.log(typeof undefined);
// console.log(typeof (typeof Number));
// console.log(typeof Number)
console.log(typeof confirm);


