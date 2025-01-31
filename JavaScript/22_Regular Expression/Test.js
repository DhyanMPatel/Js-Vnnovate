let str = "We will, we will rock you";

/*
/// Searching
console.log(str.match(/we/gi));

let result = str.match(/we/i)
console.log(result.input); // Return - We will, we will rock you
console.log(result.index); // Return - 0, where is found
console.log(result.length); // Return - 1
console.log(result[0]); // Return - "We"

let nothing = str.match(/eW/)
console.log(nothing); // Return - null
*/

/*
/// Replacing
console.log(str.replace(/we/i, "I")); // Return - I will, we will rock you

console.log(str.replace(/rock/i, "$& Odd")); // Return - We will, we will rock Odd you
console.log(str.replace(/rock/i, "$` Odd")); // Return - We will, we will We will, we will  Odd you
console.log(str.replace(/rock/i, "$' Odd")); // Return - We will, we will  you Odd you
*/

/// Testing
let regexp = /Rock/i;

alert(regexp.test(str)); // true



