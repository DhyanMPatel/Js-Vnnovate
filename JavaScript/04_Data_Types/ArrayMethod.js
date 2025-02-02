// Array Methods
//  - push(...items), pop(), unshift(...items), shift()

// let arr = [1, 2, 5, 6, 7, 8, 9, 10];

/*
/// Array.isArray()
console.log(Array.isArray(arr)); // Return - true
console.log(Array.isArray([])); // Return - true
console.log(Array.isArray({})); // Return - false
*/

/*
/// Splice - can remove, modify & replace
//      - arr.splice(start, elements, ...added_value)
//      - Nagative indexing is allow
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

/*

/// Reduce/ReduceRight
//    - when we need to iterate and return the data for each element - we use `Map`
//    - Same as Map but with some difference is that they are used to calculate a single value based on array
//    - Syntax -> arr.reduce(function(accumulator, item, index, arr){ some code },[initial])
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

*/

/// Experiment


//    1) Convert into camelCase formate
// console.log(camelize("background-color")) // Return - backgroundColor

function camelize(word) {
  /*
  /// Burst Solution
  let result = word.split('-')
  for(let i=1;i<result.length;i++){
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1)
  }
  return result.join('')
  */

  /*
  /// Better Solution
  return word
    .split('-')
    .map((word, index) => {
      return (index == 0)? word: word[0].toUpperCase() + word.slice(1)
    })
    .join('');
  */
}

/*
//    2) Filter Range
arr = [5, 3, 8, 1]
console.log(filterRange(arr, 1, 4)); // Return - [3,1]

function filterRange(arr, min, max) {
  let result = arr.filter(item => (item >= min && item <= max))
  return result
}
*/

/*
//    3) Remove numbers acept min to max
arr = [5,3,8,1]
filterRangeInPlace(arr, 1, 4)
console.log(arr); 

function filterRangeInPlace(arr, min, max){
  for(let i=0; i<arr.length; i++){
    val = arr[i]
    if(val<min || val>max){
      arr.splice(i,1)
      i--;
    }
  }
}
*/

/*
//    4) Sort in Reverse Order
arr = [5, 2, 1, -10, 15, 8];

arr.sort((a, b) => b - a) // if b>a means b before a , b<a means a before b , b==a means unchanged order 

console.log(arr)
*/

/*
//    5) Copy and sort Array
arr = ["HTML","html", "JavaScript", "CSS","css"];

function copySorted(arr){
  return arr.slice().sort((a,b) => a.localeCompare(b))
  //   or 
  // return [...arr].sort((a,b) => a.localeCompare(b))
}
let sortedArr = copySorted(arr)
console.log(sortedArr)
*/

/*
//    6) Create Extendable Calculator
function Calculator() {

  this.methods = {
    "-": (a, b) => a - b
  }

  this.calculate = function(str) {
    let spliter = str.split(" ")
    let a = spliter[0]
    let op = spliter[1]
    let b = spliter[2]

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return "Invalide Input"
    }

    return this.methods[op](a,b)
  }


  this.addMethod = (op, func) =>{
    this.methods[op] = func
  }
}

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8
*/

/*
///   7) Map to Names (Array)
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = users.map(item => item.name)

console.log( names ); // John, Pete, Mary
*/

/*
///   8) Map to Object 
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

let usersMapped = users.map(user =>({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}))

console.log(usersMapped)
*/

/*
///   9) sort users by age

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr1 = [pete, john, mary];

sortByAge(arr1);

function sortByAge() {
  return arr1.sort((a, b) => a.age - b.age);
}

// now: [john, mary, pete]
console.log(arr1[0].name); // John
console.log(arr1[1].name); // Mary
console.log(arr1[2].name); // Pete
*/

/*
//  10) Shuffle an Array 
shuffle(arr); // arr = [3, 2, 1]
console.log(arr)

shuffle(arr); // arr = [2, 1, 3]
console.log(arr)

shuffle(arr); // arr = [3, 1, 2]
console.log(arr)

function shuffle(arr) {
  /// not much solution
  arr.sort(() => Math.random() - 0.5);

  /// Better and same probebility of each case. (Fisher-Yates Shuffle Algorithm)
  for (let i = arr.length - 1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[j], arr[i]] = [arr[i], arr[j]]
  } 
}
*/

/*
// 11) Get Average Age
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

console.log( getAverageAge(arr) );

function getAverageAge(arr){

  /// Burst Solution
  let n = arr.length
  let avg = 0;

  arr.map((item) => {
    avg += item.age;
  })

  return avg/n;

  /// Better Solution
  // return arr.reduce((acc, item)=> acc+item.age ,0) / arr.length
}
*/

/*
///   12) Create Unique Array
function unique(arr) {
  let result = [];
  for(let item of arr){
    if(!result.includes(item)){
      result.push(item)
    }
  }
  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(strings) ); // Hare, Krishna, :-O
*/

/*
///   13) Create keyed object from array
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);
console.log(usersById);

function groupById(arr){
  return arr.reduce((obj,val)=>{
    obj[val.id] = val;
    return obj
  },{})
}
*/
