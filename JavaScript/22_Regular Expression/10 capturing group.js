// console.log("site.com my.site.com".match(/(\w+?\.)+\w+/g)); // Return -  [ 'site.com', 'my.site.com' ]

/// Named Group

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{1,2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";
let groups = str.match(dateRegexp).groups;

console.log(groups.year); // Return - 2019
console.log(groups.month); // Return - 04
console.log(groups.day); // Return - 30

/// Non-capturing with `?:`

let nonCapturing = "Gogogo John!";

// ?: excludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;

let result = nonCapturing.match(regexp);

console.log(result); // ['Gogogo John', 'John', index: 0, input: 'Gogogo John!', groups: undefined]

///     Experiments
/*
//          1) Match Mac Address

let macChecker = /[0-9a-f]{2}(:[0-9a-f]{2}){5}/i;

console.log(macChecker.test("01:32:54:67:89:AB")); // true

console.log(macChecker.test("0132546789AB")); // false (no colons)

console.log(macChecker.test("01:32:54:67:89")); // false (5 numbers, must be 6)

console.log(macChecker.test("01:32:54:67:89:ZZ")); // false (ZZ at the end)
*/

/*
//          2) match only 3 and 6 digit colors
let color36 = /#([0-9a-f]{3}){1,2}\b/gi;
let str = "color: #3f3; background-color: #AA00ef; and: #abcd";
console.log(str.match(color36));
*/

/*
//          3) Find All Number
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

console.log(str.match(regexp)); // -1.5, 0, 2, -123.4
*/

/*
//          4) Parse an Expression
let [a, op, b] = parse("1.2 * 3.4");

console.log(a); // 1.2
console.log(op); // *
console.log(b); // 3.4

function parse(str) {
  let regexp =
    /(?<a>-?\d+(\.\d+))?\s*(?<operator>[-*\/+])\s*(?<b>-?\d+(\.\d+)?)/;
  let results = str.match(regexp);

  return [results.groups.a, results.groups.operator, results.groups.b];
}
*/
