/*
/// Lookahead and Lookbehind
//      - Some times we need to find only those matches for a pattern that are followed or preceded by another pattern.

/// Lookahead
//      - The Syntax is: `X(?=Y)`, means "look for X, but match only if followed by Y".

console.log("1 turkey costs 30€".match(/\d+(?=€)/)); // Return - 30, ignore 1 at starting.
console.log("1 turkey costs 30€".match(/\d+(?=\s)(?=.*30)/)); // Return - 1, means shoud come space and come 30 after it.

//  - More complex tests are possible, e.g. X(?=Y)(?=Z) means:
//      - Find X.
//      - Check if Y is immediately after X (skip if isn’t).
//      - Check if Z is also immediately after X (skip if isn’t).
//      - If both tests passed, then the X is a match, otherwise continue searching.

/// Nagative Lookahead
//      - The syntax is: `X(?!Y)`, means "look for X, only if not followed by Y".

console.log("1 turkey costs 30€".match(/\d+(?!€)/)); // Return - 1

/// Lookbehind
//      - Lookbehind not work with non-V8 Browser.
//      -The syntax is:
//          - Positive lookbehind: `(?<=Y)X`, matches X, but only if there’s Y before it.
//          - Negative lookbehind: `(?<!Y)X`, matches X, but only if there’s no Y before it.

console.log("1 turkey costs $50".match(/(?<=\$)\d+/)); // Return - 50, there are $ before 50.
console.log("1 turkey costs $50".match(/(?<!\$)\d+/)); // Return - 1, there is no any $ before 1.

/// captuing group
//      - what if we want $ with 50 then?

console.log("1 turkey costs 50$".match(/\d+(?=(\$))/)); // Return - [ '50', '$' ]
console.log("1 turkey costs $50".match(/(?<=(\$))\d+/)); // Return - [ '50', '$' ]
*/

///     Experiment
/*
//      1) find non Negative Number
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

console.log(str.match(regexp)); // Return - 0, 12, 123
*/

/*
//      2) Insert After Head
let regexp = /<body.*?>/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `$&<h1>Hello</h1>`);
console.log(str);
*/
