// [==,===,!=,!==,<,<=,>,>=]
//  - Return Boolean value
//  - NaN not equal to any one
//  - null is loos-equal to itself and undefined & always equal to itself
//  - <,<=,>,>= convert operand to Number if possible otherwise to NaN
//  - ==,===,!=,!== without convert operate 
//  - Symbol always create unique identity whether value is same



//  - String Number convert into Number
// console.log("2">1); // Return - true
// console.log("2">"12"); // Return - true

//  - Boolean value convert into Number
// console.log(true > 1); // Return - false



// == - compare without conversion of null & undefined
// console.log(null == undefined);
// console.log(null == 0); // Return - false
// console.log(NaN == NaN); // Return - false

// ===
// console.log(null === undefined); // Return - false
// console.log(null === null); // Return - true

// !=
// console.log(null != 0); // Return - true
// console.log(null !== 0); // Return - true

// !==
//  -Returns true if the values are not equal or not of the same type; otherwise, it returns false
// console.log(null);





/// Experiment
// console.log("Z" > "A"); // Return - true
// console.log("Glow" > "Glee"); // Return - true
// console.log("Glee" > "Gle"); // Return - true
// console.log("a" > "A"); // Return - true
// console.log("A" > "A"); // Return - false

// console.log(Symbol("foo") == Symbol("foo")); // Return - false
// console.log(Symbol("foo") === Symbol("foo")); // Return - false

// console.log( 0 == false ); // true
// console.log( 0 == '' ); // true

console.log([] == ""); // Return - true
console.log([] == []); // Return - false, because internally "==" use "===" also [] will not convert to ""(no need to convert).

