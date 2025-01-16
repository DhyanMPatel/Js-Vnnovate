/// Numbers
//      - limit -2^53 - 1 to 2^53 - 1 of Number
//      -

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
/// .toString()
console.log(bill.toString());
console.log(bill.toString(16)); // Return - 3b9aca00

console.log((123).toString()); // Return - 123, also 123..toString() possible
*/

/*
/// Rounding
//      - Math.floor(), Math.ciel(), Math.round(), Math.tranc()
//      - num.toFixed() internally use Math.round() means return will round() logic.

let num = 1.23456;
alert(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23
*/

/*
/// Imprecise Calculations
console.log(0.1 + 0.2 === 0.3); /// false, can fixed using num.toFixed() Method
console.log((0.1 + 0.2).toFixed(2) === (0.3).toFixed(2)); // true

// Hello! I'm a self-increasing number!
alert(9999999999999999); // shows 10000000000000000
*/

/*
/// isFinite & isNaN
//  - isFinite & isNaN methods convert their argument into number.
//  - Number.isFinite() and Number.inNaN() both are more Strict compare to normal isFinite() and isNaN(). they will not autoconvert into numbers.

alert(isNaN(NaN)); // true
alert(isNaN("str")); // true

alert(isFinite("15")); // true
alert(isFinite("str")); // false, because a special value: NaN
alert(isFinite(Infinity)); // false, because a special value: Infinity

alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
*/

/*
/// parseInt & parseFloat

alert(parseInt("100px")); // 100
alert(parseFloat("12.5em")); // 12.5

alert(parseInt("12.3")); // 12, only the integer part is returned
alert(parseFloat("12.3.4")); // 12.3, the second point stops the reading

alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255, without 0x also works

alert(parseInt("2n9c", 36)); // 123456
*/

/// Other Math Function
//  - Math.random()
//  - Math.Max(a,b,c,...)
//  - Math.min(a,b,c,...)
//  - Math.pow(n, power)

/// Experiment
max = 0;
min = -10;
console.log(Math.floor(Math.random() * (max - min + 1) + min));
