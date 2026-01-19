/**
 * 🎯 PURPOSE: Number System Conversions
 *
 * Learning Objectives:
 * - Master decimal to binary conversion algorithms
 * - Understand different number bases and their properties
 * - Practice division and remainder operations
 * - Learn bit manipulation and binary arithmetic
 *
 * Real-world Applications:
 * - Computer memory addressing
 * - Network programming (IP addresses)
 * - Graphics programming (color codes)
 * - Embedded systems programming
 * - Cryptography and data encoding
 *
 * Key Concepts:
 * - Binary: Base-2 number system (0, 1)
 * - Decimal to Binary: Divide by 2, collect remainders
 * - Binary to Decimal: Sum of (bit × 2^position)
 * - Bitwise operations for efficiency
 *
 * Time Complexity: O(log n) for conversions
 * Space Complexity: O(log n) for result storage
 */

// Decimal to Binary conversion
function decimalToBinary(n) {
  if (n === 0) return "0";
  if (n < 0) return "-" + decimalToBinary(-n);

  let binary = "";
  let num = n;

  while (num > 0) {
    let remainder = num % 2;
    binary = remainder + binary;
    num = Math.floor(num / 2);
  }

  return binary;
}

// Binary to Decimal conversion
function binaryToDecimal(binaryStr) {
  let decimal = 0;
  let power = 0;

  // Process from right to left
  for (let i = binaryStr.length - 1; i >= 0; i--) {
    if (binaryStr[i] === "1") {
      decimal += Math.pow(2, power);
    }
    power++;
  }

  return decimal;
}

// Binary to Decimal using parseInt (built-in method)
function binaryToDecimalBuiltIn(binaryStr) {
  return parseInt(binaryStr, 2);
}

// Decimal to Binary using built-in method
function decimalToBinaryBuiltIn(n) {
  return n.toString(2);
}

// Count set bits (1s) in binary representation
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1; // Check last bit
    n = n >> 1; // Right shift
  }
  return count;
}

// Check if a number is a power of 2
function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

// Toggle nth bit (0-indexed from right)
function toggleBit(n, position) {
  return n ^ (1 << position);
}

// Get nth bit (0-indexed from right)
function getBit(n, position) {
  return (n >> position) & 1;
}

// Set nth bit to 1
function setBit(n, position) {
  return n | (1 << position);
}

// Clear nth bit to 0
function clearBit(n, position) {
  return n & ~(1 << position);
}

// Driver code
console.log("=== Number System Conversions ===\n");

// Basic conversions
console.log("Decimal to Binary Conversions:");
let decimalNumbers = [0, 1, 2, 5, 10, 13, 16, 31, 64, 100];
decimalNumbers.forEach((num) => {
  let binary = decimalToBinary(num);
  let binaryBuiltIn = decimalToBinaryBuiltIn(num);
  console.log(`${num} → ${binary} (built-in: ${binaryBuiltIn})`);
});

console.log("\nBinary to Decimal Conversions:");
let binaryNumbers = [
  "0",
  "1",
  "10",
  "101",
  "1010",
  "1101",
  "10000",
  "11111",
  "1000000",
  "1100100",
];
binaryNumbers.forEach((binary) => {
  let decimal = binaryToDecimal(binary);
  let decimalBuiltIn = binaryToDecimalBuiltIn(binary);
  console.log(`${binary} → ${decimal} (built-in: ${decimalBuiltIn})`);
});

// Bit manipulation examples
console.log("\n=== Bit Manipulation Examples ===");
let testNum = 13; // Binary: 1101
console.log(`Number: ${testNum} (Binary: ${decimalToBinary(testNum)})`);
console.log(`Set bits count: ${countSetBits(testNum)}`);
console.log(`Is power of 2: ${isPowerOfTwo(testNum)}`);

console.log("\nBit Operations:");
console.log(`Original: ${testNum} (${decimalToBinary(testNum)})`);
console.log(
  `Toggle bit 1: ${toggleBit(testNum, 1)} (${decimalToBinary(toggleBit(testNum, 1))})`,
);
console.log(`Get bit 2: ${getBit(testNum, 2)}`);
console.log(
  `Set bit 0: ${setBit(testNum, 0)} (${decimalToBinary(setBit(testNum, 0))})`,
);
console.log(
  `Clear bit 3: ${clearBit(testNum, 3)} (${decimalToBinary(clearBit(testNum, 3))})`,
);

// Real-world applications
console.log("\n=== Real-world Applications ===");

// IP address conversion
function ipToBinary(ip) {
  let parts = ip.split(".");
  return parts
    .map((part) => {
      let num = parseInt(part);
      return decimalToBinary(num).padStart(8, "0");
    })
    .join(".");
}

console.log("IP Address to Binary:");
let ipAddress = "192.168.1.1";
console.log(`${ipAddress} → ${ipToBinary(ipAddress)}`);

// Color code conversion (RGB to Hex to Binary)
function rgbToBinary(r, g, b) {
  return {
    red: decimalToBinary(r).padStart(8, "0"),
    green: decimalToBinary(g).padStart(8, "0"),
    blue: decimalToBinary(b).padStart(8, "0"),
  };
}

console.log("\nRGB to Binary:");
let rgb = rgbToBinary(255, 128, 64);
console.log(`RGB(255, 128, 64) → R:${rgb.red} G:${rgb.green} B:${rgb.blue}`);

// Binary arithmetic operations
function binaryAddition(a, b) {
  let decimalA = binaryToDecimal(a);
  let decimalB = binaryToDecimal(b);
  let sum = decimalA + decimalB;
  return decimalToBinary(sum);
}

function binarySubtraction(a, b) {
  let decimalA = binaryToDecimal(a);
  let decimalB = binaryToDecimal(b);
  let diff = decimalA - decimalB;
  return decimalToBinary(diff);
}

console.log("\nBinary Arithmetic:");
let bin1 = "1010"; // 10
let bin2 = "0111"; // 7
console.log(`${bin1} + ${bin2} = ${binaryAddition(bin1, bin2)}`); // 17 → 10001
console.log(`${bin1} - ${bin2} = ${binarySubtraction(bin1, bin2)}`); // 3 → 11

// Performance comparison
console.log("\n=== Performance Analysis ===");
let largeNumber = 1000000;

console.time("Custom decimalToBinary");
for (let i = 0; i < 10000; i++) {
  decimalToBinary(largeNumber);
}
console.timeEnd("Custom decimalToBinary");

console.time("Built-in toString(2)");
for (let i = 0; i < 10000; i++) {
  decimalToBinaryBuiltIn(largeNumber);
}
console.timeEnd("Built-in toString(2)");

// Binary patterns and tricks
console.log("\n=== Binary Patterns ===");

// Generate numbers with specific bit patterns
function generateNumbersWithOnes(positions, maxBits = 8) {
  let result = [];
  for (let i = 0; i < Math.pow(2, maxBits); i++) {
    let hasAllOnes = positions.every((pos) => getBit(i, pos) === 1);
    if (hasAllOnes) {
      result.push(i);
    }
  }
  return result;
}

console.log("Numbers with bits 0, 2, 4 set (up to 31):");
let patternNumbers = generateNumbersWithOnes([0, 2, 4], 5);
console.log(
  patternNumbers
    .map((n) => `${n}(${decimalToBinary(n).padStart(5, "0")})`)
    .join(", "),
);
