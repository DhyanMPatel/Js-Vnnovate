/// Relational Operator [in, instanceof]

//  - use to compare their operand and determine the relationship between them


/// in
//  - return boolean value
//  - use to check value is inside an array, or any other object

arr = [10,11,12,13,14,15]
obj = {
    name: "Vnnovate",
    age: 9,
    city: "Ahmedabad"
}

// console.log(3 in arr);  // check index in arr
// console.log(10 in arr);

// console.log("name" in obj);
// console.log("Name" in obj); // Return - false



/// Instanceof
//  - Test is Object is instance of perticular class or constructor
//  - always return Boolean value

console.log(arr instanceof Array);
console.log(arr instanceof Object); // Return - true
console.log(arr instanceof String); // Return - false


