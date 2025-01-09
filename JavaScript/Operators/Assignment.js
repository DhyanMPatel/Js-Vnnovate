/// [=, +=, -=, *=, **=, /=, %=, <<=, >>=, &=, |=, ^=, &&=, ||=, ??=]
//      - Number and String will not joint with each other return NaN
//      - left-hand side should be variable

/// =
let a = 10;
let b = a;
let c = 10;
let str = "Hello"
let bool = true
let bigint = 5n
// console.log(b);

/// +=
// console.log((a += 3));
// console.log(str += 5); // Return - Hello5
// console.log(bool += 5); // Return - 6
// console.log(bigint += 5); // Error

/// -=
// console.log(b-=5)
// console.log(str -= 5); // Return - NaN
// console.log(bool -= 5); // Return - -4
// console.log(bigint -= 5); // Error

/// *=
// console.log(c*=5); // Return - 50
// console.log(str *= 5); // Return - NaN
// console.log(bool *= 5); // Return - 5
// console.log(bigint *= 5); // Error

/// **=
// console.log(c**=2); // Return - 100
// console.log(str **= 5); // Return - Nan
// console.log(bool **= 5); // Return - 1
// console.log(bigint **= 5); // Error

/// /=
// console.log(c/=2); // Return - 5
console.log(str /= 5); // Return - NaN
console.log(bool /= 5); // Return - o.2
// console.log(bigint *= 5); // Error

/// %=
// console.log(c%=4); // Return - 2

/// <<=
// console.log(c<<=1); // Return - 20(10100) and 10(1010)


/// >>=
// console.log(c>>=1); // Return - 5

/// &= 
//      - Always return 0 if left-hand side is String
// console.log(3 &= 7); // Error - Invalid Left-hand side in assignment
// console.log(str &= 6); // return - 0

/// |=


/// ^=


/// &&=


/// ||=


/// ??=
