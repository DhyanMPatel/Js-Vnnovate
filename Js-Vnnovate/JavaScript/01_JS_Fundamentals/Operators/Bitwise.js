// [&, |, ^, ~, <<, >>, >>>]

//  - Used at Cryptography
//  - Worked on Binnary Values


/// & 
//      - use to check whether a number is even or odd
//      - Return 0 if there is any 0 bit
let numEven = 12; // (1100)
let numOdd = 13; // (1101)
// console.log(numEven & 1 == 1); // Return - 0, because num is even
// console.log(numOdd & 1 == 1); // Return - 1, because num is odd


/// | 
//      - Return 1 if there is any 1 bit
// console.log(numEven | numOdd); // Return - 13, (1101)


/// ^
//      - Use to find Missing number in array of natural number
//      - Return 1 if Both Bits are Different with Each other
// console.log(numEven ^ numOdd); // Return - 1, (0001)

function getMissingNo(a, n)
{
    let x1 = a[0];
    let x2 = 1;
    for (let i = 1; i < n; i++) {
        x1 = x1 ^ a[i];
    };
    for (let i = 2; i <= n + 1; i++) x2 = x2 ^ i;
    return x1 ^ x2;
}
let arr = [1, 2, 4, 5];
let N = arr.length;
let missingNo = getMissingNo(arr, N);
// console.log(missingNo);


/// ~
//      - use to invert the bits of number

// console.log(~10); // Return - -11
// console.log(~11); // Return - -12
// console.log(~-10); // Return - 9

/// use the Bitwise NOT operator to find Two’s Complement of a number.
function twoComplement(n) { 
	let j = ~(n.toString(2)) + 1; 
	return j; 
} 
// console.log(twoComplement(2)); // Return - -10
// console.log(twoComplement(-2)); // Return - 10



/// <<
//      - Mainly the left shift operator is used to multiply the number by any power of 2.

function multiplyPower(a, b) { 
    return a<<b; 
}
// console.log(multiplyPower(3,1)); // Return - 6
// console.log(multiplyPower(3,4)); // Return - 48
// console.log(multiplyPower(3,2)); // Return - 12


/// >>
//      - If we right-shift a positive number by 1 it will be divided by 2

function divByTwo(n) { 
    return n>>1; 
} 
// console.log(divByTwo(5)); // Return - 2
// console.log(divByTwo(-45)); // Return - -23
// console.log(divByTwo(88)); // Return - 44
// console.log(divByTwo(-23)); // Return - -12



/// >>>
//      - The first operand is the number and the right operand specifies the bits to shift towards the right modulo 32. In this way, the excess bits which are shifted towards the right are discarded and zero bits are added towards the left, as a result, the sign bit is now zero and the number becomes positive always.
//      - right shift operator on Data Types that are not Number will return 0 allways

let a = 4; 
let b = -1 
console.log(a>>>1); // Return - 2
console.log(b>>>4); // Return - 268435455
