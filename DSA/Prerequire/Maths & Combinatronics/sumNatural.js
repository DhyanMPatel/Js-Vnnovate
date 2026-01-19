/**
 * 🎯 PURPOSE: Sum of Natural Numbers Formula
 *
 * Learning Objectives:
 * - Master the mathematical formula: n(n+1)/2
 * - Understand O(1) vs O(n) time complexity difference
 * - Practice mathematical operations and integer division
 * - Learn formula-based problem solving
 *
 * Real-world Applications:
 * - Calculating series sums efficiently
 * - Statistical computations
 * - Financial calculations (compound interest patterns)
 * - Game scoring systems
 * - Load balancing and resource distribution
 *
 * Key Concepts:
 * - Formula: Sum = n(n+1)/2
 * - Works for any positive integer n
 * - O(1) time vs O(n) naive approach
 * - Handles large numbers efficiently
 * - Mathematical proof by induction
 *
 * Time Complexity: O(1) - Constant time using formula
 * Space Complexity: O(1) - No extra space needed
 */

// Naive approach - O(n) time
function sumNaive(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Optimized approach - O(1) time using formula
function sumFormula(n) {
  return (n * (n + 1)) / 2;
}

// Calculate sum of range [a, b] using formula
function sumRange(a, b) {
  if (a > b) return 0;
  return sumFormula(b) - sumFormula(a - 1);
}

// Performance comparison
function comparePerformance() {
  console.log("=== Performance Comparison ===");

  let testNumbers = [10, 100, 1000, 10000];

  testNumbers.forEach((n) => {
    console.log(`\nTesting with n = ${n}:`);

    // Time naive approach
    let start1 = performance.now();
    let result1 = sumNaive(n);
    let end1 = performance.now();

    // Time formula approach
    let start2 = performance.now();
    let result2 = sumFormula(n);
    let end2 = performance.now();

    console.log(
      `  Naive result: ${result1}, Time: ${(end1 - start1).toFixed(4)}ms`,
    );
    console.log(
      `  Formula result: ${result2}, Time: ${(end2 - start2).toFixed(4)}ms`,
    );
    console.log(`  Results match: ${result1 === result2}`);
  });
}

// Driver code
console.log("=== Sum of Natural Numbers ===\n");

// Basic examples
console.log("Basic Examples:");
console.log(`Sum 1 to 5: ${sumFormula(5)}`); // 15
console.log(`Sum 1 to 10: ${sumFormula(10)}`); // 55
console.log(`Sum 1 to 100: ${sumFormula(100)}`); // 5050

// Range examples
console.log("\nRange Examples:");
console.log(`Sum 3 to 7: ${sumRange(3, 7)}`); // 3+4+5+6+7 = 25
console.log(`Sum 50 to 60: ${sumRange(50, 60)}`);

// Performance comparison
comparePerformance();

// Real-world application: Calculate total handshakes
function totalHandshakes(people) {
  // Each person shakes hands with everyone else
  // Total combinations = n(n-1)/2
  return (people * (people - 1)) / 2;
}

console.log(`\n=== Real-world Application ===`);
console.log(`Total handshakes in room of 10 people: ${totalHandshakes(10)}`);
console.log(`Total handshakes in room of 100 people: ${totalHandshakes(100)}`);
