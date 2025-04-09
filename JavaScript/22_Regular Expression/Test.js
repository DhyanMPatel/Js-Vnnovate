//

/*
/// Set & Range
console.log("Top Nop".match(/[tn]op/gi)); // Return - [ 'Top', 'Nop' ]
console.log("Top Nop".match(/[A-Z]op/gi)); // Return - [ 'Top', 'Nop' ]

console.log("Top Nop".match(/[^0-9\s]op/gi)); // Return - [ 'Top', 'Nop' ]
console.log("Top and Nop".match(/[Tt]op\s[a-z][a-z]d\s[^\W]o[^\d\s]/)); // Return - 'Top and Nop'

console.log("Hiii".match(/[^h]i{3}/g)); // Return - ['Hii']
console.log("Dhyan".match(/\w[^\W][a-z][\w\s]p{0,2}\w/)); // Return - 'Dhyan', p can occure 0 to 2(0,1,2). times.
*/

//
/*
/// Experiments

//      1. Java[^script] is equal to "Java" or "JavaScript" ?
console.log("Java".match(/Java[^script]/)); // Return - null
console.log("JavaScript".match(/Java[^script]/)); // Return - "JavaS"

//      2. Find the time as hh:mm or hh-mm
console.log("Breakfast at 09:00. Dinner at 21-30".match(/\b\d\d[:-]\d\d\b/g)); // Return - [ '09:00', '21-30' ]
*/

//
/*
/// Quentifiers

console.log("Hiii".match(/[^h]i{3}/g)); // Return - ['Hii']
console.log("I'm 12345 years old".match(/\d{5}/)); //  "12345"
console.log("Dhyan".match(/\w[^\W][a-z][\w\s]p{0,2}\w/)); // Return - 'Dhyan', p can occure 0 to 2(0,1,2). times.
console.log("+7(903)-123-45-67".match(/\d{2,}/g)); // Return - 903, 123, 45, 67

console.log("0 1 12.345 7890".match(/\d+\.\d+/g)); // 12.345
console.log("<body> ... </body>".match(/<\/?[a-z]+>/gi)); // <body>, </body>
console.log("<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi)); // <h1>
*/

/*
/// Required inquiry
let str2 =
  "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";
console.log(str2.match(/\#[a-f0-9]{6}/gi));
console.log(str2.match(/\#[\p{Hex_Digit}]{6}/iu));
*/

//
/*
/// Unicode: flag "u" and Class \p{...}

let regex = /x\p{Hex_Digit}\p{Hex_Digit}/u;
console.log("Number: xcF".match(regex));

let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs
let str = `Hello Привет 你好 123_456`;
console.log(str.match(regexp)); // 你,好
*/

//
/*
/// Escaping: "\ " and [...]
console.log("Height: 5.8".match(/\d\.\d/)); // Return - 5.8
console.log("Height: 5.8".match(new RegExp("\\d\\.\\d"))); // Return - 5.8
console.log("function g()".match(/g\(\)/i)); // Return - g()
console.log("function f()".match(new RegExp("f\\(\\)", "i"))); // Return - f()

let regexSet = /[-.+*?^${}:()|[\]\\]/g;
let testStr = "Find these: . + * ? ^ $ { } - ( ) | [ ] \\";
console.log(testStr.match(regexSet));
// Output: [ '-', '.', '+', '*', '?', '^', '$', '{', '}', ':', '(', ')', '|', '[', ']', '\\'];
*/

/*
// BackReference
let str = `He said: "She's the one!".`;
let regex = /(["'])(.*?)\1/g;
let regexName = /(?<quate>["'])(.*)\k<quate>/g;
console.log(str.match(regex)); // Return - [ `"She\'s the one!"` ]
console.log(str.match(regexName)); // Return - [ `"She\'s the one!"` ]
*/