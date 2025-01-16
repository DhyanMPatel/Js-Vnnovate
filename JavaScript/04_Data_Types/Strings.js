/// String
//  - Strings are immutale

let single = "single-quoted";
let double = "double-quoted";
let backticks = `backticks ${single}`;

single[3] = "G";
console.log(single); // not changed

/// Method
//  - str.length,
//  - str[digit], str.at(dig) nagative possible to .at()
//  - using for..of loop
//  - str.toUpperCase(), str.toLowerCase()
//  - str.indexOf(substr, pos), str.lastIndexOf(substr, pos)
//  - str.includes(substr, pos), str.startsWith(substr), str.endsWith(substr)
//  - str.slice(s, e) nagative possible
//  - str.substring(s, e) nagative not possible
//  - char.codePointAt()
//  - String.fromCodePoint(digit)
