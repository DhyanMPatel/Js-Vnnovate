/// +
let one = "1"
let two = "2"
// console.log(+one + +two) // Return - 3, not "12"
// console.log(+"1" + +"2") // Return - 3
// console.log(+"-2" + +"-1"); // Return - -3

//  - no Effect on Numbers
let x= 1
// console.log(+x)

let y = -2
// console.log(+y) // Return - -2


//  - Same as Number() Coversion
// console.log(+true); 
// console.log(+false);
// console.log(+undefined); // Return - NaN
// console.log(+null); // Return - 0 
// console.log(+NaN); // Return - NaN
// console.log(+String); // Return - NaN
// console.log(+""); // Return - 0
// console.log(+"\n"); // Return - 0


/// -
let min = -2
// console.log(-"2"); // Return - -2
// console.log(-"-2"); // Return - 2
// console.log(-min);  // Return - 2