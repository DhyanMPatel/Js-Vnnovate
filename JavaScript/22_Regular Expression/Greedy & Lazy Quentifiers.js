/*
/// generate wrong answer
let regexp = /".+"/g;
let str = 'a "witch" and her "broom" is one';
console.log(str.match(regexp)); // Return - "witch" and her "broom"
*/

/*
/// Solution use `Lazy Mode "?"`
let regexp = /".+?"/g;
let str = 'a "witch" and her "broom" "" is one';
console.log(str.match(regexp)); // "witch", "broom"

console.log("123 456".match(/\d+ \d+?/)); // Return - 123 4
*/

/*
let regexp = /<!--.*?-->/gs;
let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

console.log(str.match(regexp));
*/