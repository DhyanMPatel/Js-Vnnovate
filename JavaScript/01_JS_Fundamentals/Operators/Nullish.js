// ??
//  - Nullish will not check falsy and Truthy
//  - If there are one has a value then return one otherwise return two accept (null/undefined)
//  - Return first "not null/undefined" value wether it is falsy or truthy otherwise it return last value.

let one;
let two;

// console.log(one ?? two); // Return - undefined

// two = 2
// console.log(one ?? two); // Return - 2

// one = 1
// console.log(one ?? two); // Return - 1

// one = undefined
// console.log(one ?? two ?? undefined); // Return - undefined

// with *
let height = null;
let width = null;
// // important: use parentheses
// let area = (height ?? 100) * (width ?? 50); // precedence of * is higher then ?? so () required
// console.log(area); // Return - 5000


// without parentheses
// let area = height ?? 100 * width ?? 50;
// console.log(area);  // Return - 0



// with &&
//      - && and ?? both hase same precedence
// console.log(1 && 2 ?? 3);   // Error - Required ((1 && 2) ?? 3)

// With ||
//      -
// console.log(1 || 2 ?? 3);   // Error - Required ((1 || 2) ?? 3)

/// Experiment
// one = 0
// console.log(one ?? two); // Return - 0
// console.log(1 || (2 ?? 3)); // Return -1
// console.log(1 && (2 ?? 3)); // Return - 2



