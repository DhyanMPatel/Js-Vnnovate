/*
/// Rest parameter
//      - we don't know that how many arguments are arive then we can use rest parameter to handle remaining arguments
//      - Rest parameter must be at the end
//      - In old times, rest parameters did not exist in the language, and using `arguments` was the only way to get all arguments of the function.
//      - `arguments` is both array-like and iterable, but not array. So we can't use Array methods like .map(), .filter(),...
//      - `arguments` is built-in JS Object which provide access to all the args passed to function at runtime that is old method of speed operator

function printall(a, b, ...rest) {
  console.log(a, b, rest[0], rest[1]);
}
printall(1, 2, 3, 4);
*/

/*
/// spread
//      - occures in function call
//      - use for exectly reverse of Rest perameter
//      - can convert to arr from string
//      - use for Array, String,

//      - Spreed operator work with only iterable means

arr1 = [1, 2, 3, 9, 4, 5];
arr2 = [10, -10, 5, -2, 7];
str = "Vnnovate";
console.log(Math.max(...arr1));
console.log(Math.max(...arr1, ...arr2));
console.log(Math.max(1, ...arr1, 25, ...arr2, 20));

console.log(...arr1, ...arr2);
console.log(1, ...arr1, 25, ...arr2, 20);

console.log(...str, 1, 2, ...arr2);

/// convert to Arr
console.log([...str, ...arr1]); // Array formate
console.log(Array.from(str));

console.log({ ...str }); // Object formate

/// Experiments - same in Object also
let copyArr1 = [...arr1];
console.log(copyArr1 === arr1); /// Return - false
console.log(JSON.stringify(copyArr1) === JSON.stringify(arr1)); // Return - true
console.log(Array.isArray(copyArr1)); // Return - true
*/
