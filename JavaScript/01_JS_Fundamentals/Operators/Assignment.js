/// [=, +=, -=, *=, **=, /=, %=, <<=, >>=, &=, |=, ^=, &&=, ||=, ??=]
//      - Number and String will not joint with each other return NaN
//      - left-hand side should be variable

/// =
let a = 10;
let b = a;
let c = 10;
let str = "Hello"
let bool = true
let bigint = 5n
// console.log(b);

/// +=
// console.log((a += 3));
// console.log(str += 5); // Return - Hello5
// console.log(bool += 5); // Return - 6
// console.log(bigint += 5); // Error

/// -=
// console.log(b-=5)
// console.log(str -= 5); // Return - NaN
// console.log(bool -= 5); // Return - -4
// console.log(bigint -= 5); // Error

/// *=
// console.log(c*=5); // Return - 50
// console.log(str *= 5); // Return - NaN
// console.log(bool *= 5); // Return - 5
// console.log(bigint *= 5); // Error

/// **=
// console.log(c**=2); // Return - 100
// console.log(str **= 5); // Return - Nan
// console.log(bool **= 5); // Return - 1
// console.log(bigint **= 5); // Error

/// /=
// console.log(c/=2); // Return - 5
// console.log(str /= 5); // Return - NaN
// console.log(bool /= 5); // Return - o.2
// console.log(bigint *= 5); // Error

/// %=
// console.log(c%=4); // Return - 2

/// <<=
// console.log(c<<=1); // Return - 20(10100) and 10(1010)


/// >>=
// console.log(c>>=1); // Return - 5

/// &= 
//      - Always return 0 if left-hand side is String
// console.log(3 &= 7); // Error - Invalid Left-hand side in assignment
// console.log(str &= 6); // return - 0

/// |=


/// ^=


/// &&=  // Means: x && (x = y)
//      - if first operand will be truthy then second operand value will assigned to first operand

let name = { 
    firstName: "Ram", 
    lastName: "", 
  }; 
    
  console.log(name.firstName); // Return - Ram
    
  // Changing the value using logical 
  // AND assignment operator 
  name.firstName &&= "Shyam"; 
    
  // Here the value changed because 
  // name.firstName is truthy 
  console.log(name.firstName); // Return - Shyam
    
  console.log(name.lastName); 
    
  // Changing the value using logical  
  // AND assignment operator 
  name.lastName &&= "Kumar"; // Return - ""
    
  // Here the value remains unchanged  
  // because name.lastName is falsy 
  console.log(name.lastName); // Return - ""




/// ||=  // Means: x || (x=y)
//      - if first operand will be falsy then second operand value will assigned to first operand

  console.log(name.firstName); // Return - Ram
  
  // Changing the value using logical 
  // OR assignment operator 
  name.firstName ||= "Shyam"; 
  
  // But value does not change because 
  // name.firstName is truthy 
  console.log(name.firstName); // Return - Ram
  
  console.log(name.lastName); // Return - ""
  
  // Changing the value using logical 
  // OR assignment operator 
  name.lastName ||= "Kumar"; 

  // The value changes because name.lastName is falsy 
  console.log(name.lastName); // Return - Kumar



/// ??=  // Means: x ?? (x = y)
//      - In Object there is a properties is not defined which is indicate as a undefined so ??= will create that undefined property and assigned right side value
let one = 1
let empty1 = null
let empty2 = undefined
let three = 3
// console.log(one ??= empty1); // Return - 1
// console.log(empty2 ??= empty1); // Return - null    last value
// console.log(empty1 ??= three); // Return - 3
// console.log(empty2); // Return - null

