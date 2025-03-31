/// STRING

let age = 13
let str = String(age)
// console.log(typeof str)


/// NUMBER
// console.log(typeof("10"/"5")) // Return - number
// console.log(typeof NaN) // Return - number

let num = Number(str)
// console.log(typeof num) // Return - number


// Experiment
// console.log(Number(undefined))   // Return - NaN
// console.log(Number(null));  // Return - 0
// console.log(Number(true));
// console.log(Number(false));
// console.log(Number(String));    // Return - NaN
// console.log(Number("")); // Return - 0
// console.log(Number("\t")); // Return - 0
// console.log(Number("\n")); // Return - 0
// var obj = {}
// var arr = [1, 2, 3]
// console.log(Number(arr)); // Return - NaN, if arr is empty then return `0`
// console.log(Number(obj)); // Return - NaN


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
// console.log(Boolean(" ")); // Return - true
// console.log(Boolean([])); // Return - true
// console.log(Boolean({})); // Return - true
// ...

/// Experiment
let a = 0 // Falsy
let b = "0" // Truthy
// console.log(Boolean(a)); // Return - false
// console.log(Boolean(b)); // Return - true
// console.log(a == b); // Return - true


// SYMBOL
let obj ={name:'Vnnovate'}
// console.log(Symbol(a)); // Return - Symbol (0)
// console.log(Symbol(obj)); // Return - Symbol [object Object]

console.log(Symbol (obj.name)); // Return - Symbol(Vnnovate)
console.log(Symbol (obj.name).description); // Return - Vnnovate

