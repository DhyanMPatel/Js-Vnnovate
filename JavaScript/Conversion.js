/// STRING

let age = 13
let str = String(age)
// console.log(typeof value)


/// NUMBER
// console.log(typeof("10"/"5"))

let num = Number(str)
// console.log(typeof num)


// Experiment
// console.log(Number(undefined))   // Return - NaN
// console.log(Number(null));  // Return - 0
// console.log(Number(true));
// console.log(Number(false));
// console.log(Number(String));    // Return - NaN
// console.log(Number("")); // Return - 0
// console.log(Number("\t")); // Return - 0
// console.log(Number("\n")); // Return - 0



/// BOOLEAN

// falsy value return only false
// console.log(Boolean(null));
// console.log(Boolean(undefined));
// console.log(Boolean(NaN));
// console.log(Boolean(""));
// console.log(Boolean(0));
// console.log(Boolean(-0));
// console.log(Boolean(false));
// console.log(Boolean(0n));
// console.log(Boolean(-0n));

// truthy value return true
// console.log(Boolean("\n"));


/// Experiment
let a = 0 // Falsy
let b = "0" // Truthy
console.log(Boolean(a)); // Return - false
console.log(Boolean(b)); // Return - true
console.log(a == b); // Return - true
