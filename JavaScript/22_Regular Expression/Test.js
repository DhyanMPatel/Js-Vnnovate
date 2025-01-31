//
/// Charactor Classes - [\d,\w,\s,\D,\W,\S]
console.log("Z".match(/./)); // Return - Z

let regexp = /CS.4/;
alert("CSS4".match(regexp)); // Return - CSS4
alert("CS-4".match(regexp)); // Return - CS-4
alert("CS 4".match(regexp)); // Return - CS 4 (space is also a character)
alert("cs4".match(regexp)); // Return - null
alert("A\nB".match(/A.B/)); // null (no match)
alert("A\nB".match(/A.B/s)); // A\nB (s make pattern dotable)

alert("1 - 5".match(/\d-\d/)); // null, no match!
alert("1 - 5".match(/\d - \d/)); // 1 - 5, now it works
//    or we can use \s class:
alert("1 - 5".match(/\d\s-\s\d/)); // 1 - 5, also works
//

//
/// Anchors - [^,$]
let str1 = "Mary had a little lamb";
console.log(/^Mary/.test(str1)); // true

console.log(/mb$/.test(str1)); // true

console.log(/^Mary\shad\s\w\slittle\s\w\wmb$/.test(str1)); // Return - true

console.log(/^$/.test("")); // Return - true, only Empty string match
//

//
/// Multiline Mode with Anchors - [m]

let MultilineStr = `1st place: Winnie_
  2nd place: Piglete_
3rd place: Eeyore`;

///     without `g` flag give all detail of first match like itself, index, input, etc.
console.log(MultilineStr.match(/^\d/gm)); // Return - ['1', '3'], without flag "m" Return - ["1"]
console.log(MultilineStr.match(/\w$/gm)); // Return - ['_', '_', 'e'], same as above behave
console.log(MultilineStr.match(/\w\n/g)); // Return - ['_\n', '_\n']
//

//
/// Word Boundary - [\b]
console.log("Hello, Java!".match(/\bHe\wlo\b/)); // Return - Hello
console.log("Hello, Java!".match(/\bJava\b/)); // Return - Java
console.log("Hello, Java!".match(/\bHell\b/)); // Return - null ("o" is remaining)
console.log("Hello, Java!".match(/\bJava!\b/)); // Return -null ("!" should not include)
console.log("1 23 456,2".match(/\b\d\b/g)); // Return - ['1', '2']

//    Experiment - Find the time
console.log("Breakfast at 09:00 in the room 123:456.".match(/\b\d\d:\d\d\b/g)); // Return - ['09:00']
//
