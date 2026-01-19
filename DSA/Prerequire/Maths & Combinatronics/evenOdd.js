/**
 * 🎯 PURPOSE: Even & Odd Number Detection
 *
 * Learning Objectives:
 * - Master the modulo operator (%) for number properties
 * - Understand basic number theory fundamentals
 * - Practice conditional logic and boolean operations
 * - Learn pattern recognition in number systems
 *
 * Real-world Applications:
 * - Array indexing (even/odd positions)
 * - Alternating patterns in UI design
 * - Game development (turn-based systems)
 * - Data validation and formatting
 * - Load balancing algorithms
 *
 * Key Concepts:
 * - Even numbers: n % 2 === 0
 * - Odd numbers: n % 2 === 1 (or !== 0)
 * - Zero is considered even
 * - Negative numbers follow same rules
 *
 * Time Complexity: O(1) - Constant time operation
 * Space Complexity: O(1) - No extra space needed
 */

function isEven(n) {
  return n % 2 === 0;
}

function isOdd(n) {
  return n % 2 !== 0;
}

function classifyNumber(n) {
  if (n % 2 === 0) {
    return `${n} is Even`;
  } else {
    return `${n} is Odd`;
  }
}

// Driver code
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2];
console.log("Number Classification:");
numbers.forEach((num) => {
  console.log(classifyNumber(num));
});

// Test cases
console.log("\nTest Cases:");
console.log(`4 is even: ${isEven(4)}`); // true
console.log(`7 is odd: ${isOdd(7)}`); // true
console.log(`0 is even: ${isEven(0)}`); // true
console.log(`-3 is odd: ${isOdd(-3)}`); // true
