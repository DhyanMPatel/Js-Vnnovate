/// Named Group

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
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

console.log(result)