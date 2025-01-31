//

/// Set & Range
console.log("Top Nop".match(/[tn]op/gi)); // Return - [ 'Top', 'Nop' ]
console.log("Top Nop".match(/[A-Z]op/gi)); // Return - [ 'Top', 'Nop' ]

console.log("Top Nop".match(/[^0-9\s]op/gi)); // Return - [ 'Top', 'Nop' ]
console.log("Top and Nop".match(/[Tt]op\s[a-z][a-z]d\s[^\W]o[^\d\s]/)); // Return - 'Top and Nop'

//
/// Experiments

//      1. Java[^script] is equal to "Java" or "JavaScript" ?
console.log("Java".match(/Java[^script]/)); // Return - null
console.log("JavaScript".match(/Java[^script]/)); // Return - "JavaS"

//      2. Find the time as hh:mm or hh-mm
console.log("Breakfast at 09:00. Dinner at 21-30".match(/\b\d\d[:-]\d\d\b/g)); // Return - [ '09:00', '21-30' ]

//

/// Quentifiers

console.log("Hiii".match(/[^h]i{3}/g)); // Return - ['Hii']
console.log("I'm 12345 years old".match(/\d{5}/)); //  "12345"
console.log("Dhyan".match(/\w[^\W][a-z][\w\s]p{0,2}\w/)); // Return - 'Dhyan', p can occure 0 to 2(0,1,2). times.
