/// [+,-,*,**,/,%,++,--]

/// + (Sum)
let sum = 1 + 2 + true; // return - 4
// console.log(sum);

let justJoint = 1 + 2 + " String"; // Add then Concatination(with String)
// console.log(justJoint);

// let bigIntiger = 1n + 3; // Solution - use Explicit conversions
// console.log(bigIntiger); // Error - Cannot mix BigInt and other types
// console.log(NaN + 1);
// console.log(undefined + 1);
// console.log(null + 1);  // Return - 1


/// - (Minus)
// let min = 1 - 2;
// console.log(min);
// console.log(1 - "Str"); // Return - NaN
// console.log(5 - true);
// // console.log(2n - 1); // Error - cannot mix bigInt and other types
// console.log(1-NaN);
// console.log(1-undefined);
// console.log(1-null); // Return - 1


/// * (Multiply)
// console.log(2*3);
// console.log(-2 * 3);
// console.log(2 * "Multiply"); // Return - NaN
// console.log("3" * 2);
// console.log(Infinity * 2); // Return - NaN
// console.log(2n * 3n);
// // console.log(2n * 3); // Error - Cannot mix BigInt and other Types
// // console.log(2n * "num"); // Error - Cannot mix BigInt and other Types
// console.log(null * 2);  // Return 0
// console.log(undefined * 2);
// console.log(NaN * 2);


/// / (Devide)
// console.log(10 / 2);
// console.log(3 / 2);
// console.log("3" / 2);
// console.log(3 / -2);
// console.log(2 / 0);
// console.log(2 / Infinity);
// console.log(10n / 2n);
// console.log(-10n / 2n);
// console.log(10n / -2n);
// console.log(-3n / 2n); // Return - -1n
// console.log(3n / 2n); // Return - 1n
// console.log(3n / 4n);   // Return - 0n
// console.log(-3n / 4n); // Return - 0n
// console.log(3n / -4n);  // Return - 0n
// console.log(2n / 0n); // Error - Not Division by Zero

/// % (Remainder)
// console.log(13.5 % 5);
// console.log(-15 % 5); // Return - -0
// console.log(18 % -5); // Return - 3
// console.log("16" % 5);
// console.log(14 % 0); // Return - NaN
// console.log(14 % Infinity); // Return - 14
// console.log(Infinity % 5);  // Return - NaN
// console.log(0 % 5); // Return - 0
// console.log(3n % 2n); // Return - 1n
// console.log(3n % 0n);   // Error - not Division by Zero
// console.log(3n % 4n); // Return - 3n
// console.log(-3n % 2n); // Return - -1n
// console.log(-3n % 3n); // Return - 0n


/// ** (Exponentiation)
// console.log(2 ** 3);
// // console.log(-2 ** 3); // Error - Unary Operator at left Operand
// console.log(20 ** -3); // Return - 0.000125
// console.log(2.5 ** 3); // Return - 15.625
// console.log(2 ** 3.5); // Return - 11.3137
// console.log(2 ** (3 ** 2)); // Return - 512
// console.log((2 ** 2) ** 3); // Return - 64
// console.log(2 ** Infinity);
// console.log(Infinity ** 2);
// console.log(2n ** 3n);
// console.log(2n ** -3n); // Error - not possible


/// ++ (Increment)
let a = 2;
let b = 2;
// console.log(2++);   // Error - Invalid left-hand side Expression in postfix
// console.log(a++);
// console.log(++b);
// console.log(++2); // Error - Invalid left-hand side Expression in postfix

/// -- (Decrement)
let c = 3;
let d = 3;
// console.log(b--);
// console.log(2--);   // Error - Invalid left-hand side Expression in postfix
// console.log(--2);   // Error - Invalid left-hand side Expression in postfix



/// Experiment
// console.log(d*"Hello!"); // Return - NaN