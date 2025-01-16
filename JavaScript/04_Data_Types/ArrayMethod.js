// Array Methods
//  - push(...items), pop(), unshift(...items), shift()

let arr = [1, 2, 5, 6, 7, 8, 9, 10];

/*
/// Array.isArray()
console.log(Array.isArray(arr)); // Return - true
console.log(Array.isArray([])); // Return - true
console.log(Array.isArray({})); // Return - false
*/

/*
/// Splice - can remove, modify & replace
//      - arr.splice(start, elements, ...added_value)
        - Nagative indexing is allow
let splices = arr.splice(
  1,
  1,
  3,
  4,
  "Add 3rd, 4th & this value after elements argument"
);
console.log(splices);
console.log(arr);


// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,5,6,7,8,9,3,4,10
*/

/*
// Slice - make a copy from Real arr
//      - Syntax - arr.slice(start, end)  - end not including
let slices = arr.slice(1, 4);
console.log(slices); // Return - [2,5,6]

console.log(arr.slice(5)); // Return - [8,9,10]
console.log(arr.slice()); // Return - [1,2,5,6,7,8,9,10]
console.log(arr.slice(-3)); // Return - [8,9,10]

// Experiment
let sample = arr.slice();
console.log(sample == arr); // Return - false ,  sample is new array
*/

/*
// concate
//      - Syntax - arr.concat(arg1, arg2...)
//      - Object has one Property name "[Symbol.isConcatSpreadable]: true" (default: false) which stored like arr
let concatProcess = [1, 2, 3];
let obj = { 0: "Vnnovate", [Symbol.isConcatSpreadable]: true };

// console.log(concatProcess.concat([4, 5])); // Return - [1,2,3,4,5]
// console.log(concatProcess.concat([4, 5], [6, [7]])); // Return - [1,2,3,4,5,6,[7]]

console.log(concatProcess.concat(obj)); // Return - [1,2,3,{name:"Vnnovate"}]

// console.log(arr.concat(concatProcess)); // Return - [1,2,5,6,7,8,9,10,1,2,3]
*/

/*
/// .forEach()
//      - arr.forEach((item,index, array) => {})

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  console.log(`${item} is at index ${index} in ${array}`);
});
*/

/*
/// Searching - indexOf, lastIndexOf,includes
//      - arr.indexOf(item, from)
//      - arr.includes(item, from)

//      - arr.lastIndexOf is the same as indexOf, but looks for from right to left.
//      - includes method handle NaN correctly
//      - null & undefined easily identify but NaN identify by only includes method

let searching = [1, 2, 5, 6, NaN, null, undefined, 7, 8, 9, 10];

console.log(searching.indexOf(4)); // -1
console.log(searching.includes(4)); // false
console.log(searching.lastIndexOf(8)); // 8

console.log(searching.includes(NaN)); // Return - true
*/

/*
/// Find, findIndex() & findeLastIndex()
//      - find() method is use to find something related to condition
//      - findIndex() return index where we found
//      - fineLastIndex() same as fineIndex() but find from right to left
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];
let user = users.find((item) => item.id == 1);
console.log(user.name);

console.log(users.findIndex((item) => item.id == 2));
console.log(users.findLastIndex((item) => item.id == 3));
*/

/*
/// Filter
//      - filter is use to get multiple values
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

let someuser = users.filter((item) => item.id <= 2); // pass id=1 & id=2 values to someuser
console.log(someuser.length);
*/

/// Tranform & rearenge - map, sort(fn), reverse, split and join, reduce/reduceRight

/*
// Map
let resultMap = arr.map(function (item, index, arr) {});

let length = ["Bilbo", "Gandalf", "Nazgul"].map((item) => item.length >= 6);
console.log(length);
*/

/*
// Sort(fn)
//  - Sorted as String by default
//  - Arrow function is best in sort(fn)
let sorting = [1, 2, 15];
sorting.sort();
console.log(sorting); // Return - [1,15,2]

function compareNum(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
*/

/*
/// Reverse
let realArr = [1, 2, 3, 4];
console.log(realArr.reverse());
*/

/*
/// Split and Join
//      - Syntax -> str.split(matching, create long Arr)
//      - Syntax ->
let names = "Bilbo, Gandalf, Nazgul";
let splitedArr = names.split(", "); // Convert String to Arr

let glueStr = splitedArr.join(", "); // Convert Arr to String
*/

/// Reduce/ReduceRight
//    - when we need to iterate and return the data for each element - we use `Map`
//    - Same as Map but with some difference is that they are used to calculate a single value based on array
//    - Syntax -> arr.reduce(function(accumulator, item, index, arr){/* some code */},[initial])
//      - accu initially is initial value then return value is stored in accumulator.
//    - ReduceRight also do same but goes from right to left

let sum = arr.reduce(function (sum, ele) {
  return sum + ele;
}, 0);
console.log(sum);

let RR = [
  [0, 1],
  [2, 3],
  [4, 5],
];
const result = RR.reduceRight((addition, ele) => {
  return addition.concat(ele);
});
console.log(result);
