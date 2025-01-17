/// Methods Of Primitive
//      - null/undefined has no any Methods
//      - Object always truthy in "if"

let zero = new Number(0)
if(zero){
    console.log('This is truthy')
}
console.log(typeof zero); // Return - Object

// Methods
//  - str.toUpperCase()
//  - num.toFixed(digit)


/// String
let str = "Hello"
console.log(str.toUpperCase());

str.test = 5;  // Not Possible because str is not Object

/// Number
let num = 123.4567
console.log(num.toFixed(2)); // 123.46

