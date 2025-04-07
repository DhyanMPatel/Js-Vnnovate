/// str.match(regexp)

/*
//      - match provide some features like `result.length`, `result.index`, `result.input`.
let str = "I love JavaScript";

let result = str.match(/Java(Script)/);

console.log(result[0]); // JavaScript (full match)
console.log(result[1]); // Script (first capturing group)
console.log(result.length); // 2

// Additional information:
console.log(result.index); // 7 (match position)
console.log(result.input); // I love JavaScript (source string)
*/

/*
//      - If the regexp has flag `g`, then it returns an array of all matches as strings, without capturing groups and other details.
let str = "I love JavaScript";

let result = str.match(/Java(Script)/g);

console.log( result[0] ); // JavaScript
console.log( result.length ); // 1
*/

//      - If there are no matches, no matter if there’s flag g or not, null is returned.

/*
/// str.matchAll(regexp)
//      - used mainly to search for all matches with all groups.

//      - There are 3 differences from match:
//          - It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
//          - Every match is returned as an array with capturing groups (the same format as str.match without flag g).
//          - If there are no results, it returns an empty iterable object instead of null.

let str = "<h1>Hello, world!</h1>";
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

console.log(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now

let firstMatch = matchAll[0];
console.log(firstMatch[0]); // <h1>
console.log(firstMatch[1]); // h1
console.log(firstMatch.index); // 0
console.log(firstMatch.input); // <h1>Hello, world!</h1>
*/

/*
/// str.split(regexp)
//      - Splits the string using the regexp (or a substring) as a delimiter.

console.log("20-1-2025".split("-")); // Return - [ '20', '1', '2025' ]

let regexp = /,\s+/;    // - Here can use '*' insteed '+' 
console.log("20, 1, 2025".split(regexp)); // Return - [ '20', '1', '2025' ]
*/

/*
/// str.search(regexp)
//      - Return first match position or "-1" if none found.

let str = "A drop of ink may make a million think";
console.log(str.search(/ink/gi)); // 10 (first match position)
*/

/*
/// str.replace(str|regexp, str|func)

//      - Replace a dash by a colon
console.log("12-34-56".replace("-", ":")); // Return - 12:34-56
console.log("12-34-56".replace(/-/g, ":")); // Return - 12:34:56

//      - Splecial Characters
console.log("John Doe".replace(/(\w+) (\w+)/, "$2 $1")); // Return - Doe John
console.log("This is Number 123".replace(/\d+/, "[$&]")); // Return - This is Number [123]
console.log("Hello World!".replace(/World/, "Universe, $`")); // Return - Hello Universe, Hello!
console.log("Hello World!".replace(/Hello/, "Hii $',")); // Return - Hii World!, world!
console.log("Price: 50".replace(/50/, "$&$$")); // Return - Price: 50$

//      - The function is called with arguments func(match, p1, p2, ..., pn, offset, input, groups):
//          - `match` – the match,
//          - `p1, p2, ..., pn` – contents of capturing groups (if there are any),
//          - `offset` – position of the match,
//          - `input` – the source string,
//          - `groups` – an object with named groups.

//      - Second parameter sometimes can be Function
console.log("html and css".replace(/html|css/i), (str) => str.toUpperCase()); // Return - "HTML and CSS"

//      - Replace each match by its position in the string:
console.log("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // Return - 0-3-6

//      - Here name and surname take from as matched
console.log(
  "John Smith".replace(
    /(\w+) (\w+)/,
    (match, name, surname) => `${surname}, ${name}`
  )
); // Return - Smith, John

//      - can possible to use spreed operator `...`.
console.log(
  "John Smith".replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`)
); // Return - Smith, John

//      - spreed operator use with named group,
console.log(
  "John Smith".replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
    let words = match.pop();
    return `${words.surname}, ${words.name}`;
  })
); // Return - Smith, John
*/

/*
/// str.replaceAll(str|regexp, str|func)
//      - This is same as .replace() except 2 difference
//          - If first arg is `String` then it replace all match with second arg.
//          - If first arg is `regexp` then without `g` flag it not work. give error

//      - replace all dashes by a colon
alert("12-34-56".replaceAll("-", ":")); // 12:34:56
*/

/*
/// regexp.exec(str)
//      - this behave like 2 type depending on `g` flag:
//          - If there are not `g` flag then work same as `str.match(regexp)`.
//          - If there is `g` flag then it returns the first match and saves the position immediately after it in the property `regexp.lastIndex`. lastIndex can be modified and `regexp.exec(str)` start matching from that position. If there are no match then exec return `null` and reset lastIndex to 0.

let str = "More about JavaScript at https://javascript.info";
let regexp = /javascript/gi;

let result;

while ((result = regexp.exec(str))) {
  alert(`Found ${result[0]} at position ${result.index}`);
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}

//      - if there are 'Y' flag then it will become Strict means if there are no match from lastIndex position then return `null`
let strY = "Hello, world!";

let regexpY = /\w+/y;
regexpY.lastIndex = 5; // search exactly at position 5

alert(regexpY.exec(strY)); // null
*/

/// regexp.test(test)
//      - Match and returns `true/false` whether it exists.
//      - Search same as exec(). means follow lastIndex.
let str = "I love JavaScript";

//      - these two tests do the same
alert(/love/i.test(str)); // true
alert(str.search(/love/i) != -1); // true
