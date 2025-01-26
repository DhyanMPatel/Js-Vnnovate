/// Numbers
//      - limit -2^53 - 1 to 2^53 - 1 of Number
//      - num.toFixed() return String value

let billion = 1000000000;
let bill_ion = 1_000_000_000;
let bill = 1e9;

/*
// true
console.log(bill === bill_ion);
console.log(bill === billion);
console.log(bill_ion === billion);
*/

let mcs = 1e-6; // Return - 0.000001, five zeroes to the left from 1

/*
/// Hexadecimal
console.log(0xff); // Return - 255
console.log(0xFF); // Return - 255
/// Octal
console.log(0o377); // Return - 255
/// Binary
console.log(0b11_111_111); // Return - 255
*/


/// .toString()
console.log(bill.toString(10)); // Default
console.log(bill.toString(16)); // Return - 3b9aca00

console.log((123).toString()); // Return - 123, also 123..toString() possible


/*
/// Rounding
//      - floor(give lower value), 
//      - ceil(give higher value), 
//      - round(make round off), 
//      - trunc(remove averything after decimal point only) (not supported by internet Exporar)
//      - num.toFixed() internally use Math.round() means return will round() logic.

let num = 1.23456;
console.log(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23
console.log( +num.toFixed(2) ); // 1.23, in Number 
console.log(0.1.toFixed(20)); // Return - 0.10000000000000000555
*/

/*
/// Imprecise Calculations
console.log(0.1 + 0.2 === 0.3); /// false, can fixed using num.toFixed() Method
console.log((0.1 + 0.2).toFixed(2) === (0.3).toFixed(2)); // true

// Hello! I'm a self-increasing number!
alert(9_999_999_999_999_999); // shows 10000000000000000
*/

/*
/// isFinite & isNaN
//  - give answer in Boolean
//  - isFinite & isNaN methods convert their argument into number.
//  - Number.isFinite() and Number.inNaN() both are more Strict compare to normal isFinite() and isNaN(). they will not autoconvert into numbers.

console.log(isNaN(NaN));
console.log(isNaN(123));
console.log(isNaN("123.4"));
console.log(isNaN("str")); // Return - true
console.log(isNaN(Infinity)); // Return - false

console.log(isFinite(NaN)); // Return - false
console.log(isFinite(123));
console.log(isFinite("123.4"));
console.log(isFinite("str")); // Return - false, because special value - NaN
console.log(isFinite(Infinity)); // Return - false, because special value - Infinity

alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
*/

/*
/// parseInt & parseFloat
//      - use for soft conversion
//      - convert string to int, if string is not int, it will return NaN

console.log(parseInt("100px")); // 100
console.log(parseFloat("12.5em")); // 12.5

console.log(parseInt("12.3")); // 12, only the integer part is returned
console.log(parseFloat("12.3.4")); // 12.3, the second point stops the reading

console.log(parseInt("0xff", 16)); // 255
console.log(parseInt("ff", 16)); // 255, without 0x also works

alert(parseInt("2n9c", 36)); // 123456
*/

/// Other Math Function
//  - Math.random()
//  - Math.Max(a,b,c,...)
//  - Math.min(a,b,c,...)
//  - Math.pow(n, power)

// console.log(Math.random()); // [0,1)
/*
console.log(Math.max(3, 10, -10, -3, 20)); // Return - 20
console.log(Math.min(3, 10, -10, -3, 20)); // Return - -10
*/

// console.log(Math.pow(2,3)); // Return - 8

/// Experiment
max = 0;
min = -10;
// console.log(Math.floor(Math.random() * (max - min + 1) + min));

// console.log(0.1 + 0.2 == 0.3); // false

// console.log(6.35.toFixed(1)); // Return - 6.3 , there is Precision loss can cause both increase and decrease
// console.log(Math.round(6.35 * 10) / 10); // Return - 6.4