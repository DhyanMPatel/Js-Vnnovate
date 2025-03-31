// Array
//      - use to Store multiple data in one variable
//      - arr[0] comes from Object syntax
//      - Array is an Object.
//      - special in Array is The Engine tries to store its element in contiguous memory area
//      - If we make ele like "arr.age = 12" this will stored after number key eles
//      - push() & pop() are faster then unshift() & shift().
//      - .length is property of Array not method
//      - Array has own implimentation of toString()

let arr1 = new Array(3); // ["undefined", "undefined", "undefined"]
let fruits = ["Orange", "Apple", "Banana"];
/*
console.log(fruits);
console.log(fruits[2]);
console.log(fruits.length);
*/

/*
let arr = [
  "Apple",
  { name: "John" },
  true,
  function () {
    console.log("Hello");
  },
];
console.log(arr[3]()); // return - Hello, Function call
*/

/// Methods

/*
console.log(fruits.length - 1); // Return - banana
console.log(fruits.at(-1)); // Return - banana
*/

/*
console.log(fruits.push("Pear")); // Return - 4, index number
console.log(fruits.unshift("plum")); // Return - 5, index number
console.log(fruits.pop()); // Return - "pear", value that removed from last
console.log(fruits.shift()); // Return - "plum", value that removed from first
*/

/*
// age will stored after number key
let user = [];
user.age = 12;
user[10] = "This is Possible";

console.log(user);
*/

/*
// loops
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

for (let fruit of fruits) { // Modern Syntax
  console.log(fruit);
}

for (let key in fruits) { // never use
  console.log(fruits[key]);
}
*/

/*
/// toString()
console.log([] + 1); // Return - 1 ,  "" + 1  ->  0 + 1 ->  1
console.log([1] + 1); // Return - 11 ,   "1" + 1  ->  "11"
console.log([1, 2] + 1); // Return - 1,21 ,  "1,2" + 1  ->  "1,21"
*/

/*
/// Array.from()
//    - use to create arr from different object
let arr = ["Hari", "Ram", "Ram", "ram", "Hari", "Hari"];
let uniqueArr = Array.from(new Set(arr));
console.log(uniqueArr);
*/

/*
/// Experiment
console.log(0 == []); // Return true,  0==[] -> 0=="" -> 0==0

//  1) sum input numbers
//      - Asks the user for values using prompt and stores the values in the array.
//      - Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
//      - Calculates and returns the sum of array items.

function sumInput() {
  let number = [];
  while (true) {
    let value = prompt("Enter Number", 0);
    if (value == "" || value == null || !isFinite(value)) break;

    number.push(value);
  }
  let sum = 0;
  for (let num of number) {
    sum += num;
  }
  return sum;
}

console.log(sumInput());
*/

//  2) get Max subSum()
let arr = [2,-3,1,2]
let max = 0

/// Burst Solution O(n^2)
for (let i = 0; i<arr.length;i++){
  let sum = 0
  for(let j=i;j<arr.length;j++){
    sum += arr[j];
    max = Math.max(sum,max)
  }
}

/// Better Solution O(n)
let sum = 0
for(let elem of arr){
  sum +=elem
  max = Math.max(sum,max)
  if(sum<0) sum=0
}

console.log(max)