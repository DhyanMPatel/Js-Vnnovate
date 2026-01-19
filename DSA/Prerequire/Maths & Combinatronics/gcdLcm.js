/**
 * 🎯 PURPOSE: GCD & LCM Calculations
 *
 * Learning Objectives:
 * - Master Euclidean Algorithm for GCD calculation
 * - Understand the relationship between GCD and LCM
 * - Practice recursive and iterative algorithms
 * - Learn number theory fundamentals
 *
 * Real-world Applications:
 * - Fraction simplification
 * - Scheduling and time synchronization
 * - Cryptography (RSA algorithm)
 * - Gear ratio calculations
 * - Music theory (harmonic intervals)
 *
 * Key Concepts:
 * - GCD: Largest number dividing both numbers
 * - LCM: Smallest number divisible by both numbers
 * - Relationship: LCM(a,b) = (a × b) / GCD(a,b)
 * - Euclidean Algorithm: gcd(a,b) = gcd(b, a%b)
 *
 * Time Complexity: O(log(min(a,b))) for GCD
 * Space Complexity: O(1) - Constant extra space
 */

// Euclidean Algorithm - Recursive approach
function gcdRecursive(a, b) {
  if (b === 0) return a;
  return gcdRecursive(b, a % b);
}

// Euclidean Algorithm - Iterative approach
function gcdIterative(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Calculate LCM using GCD
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcdRecursive(a, b);
}

// Extended Euclidean Algorithm (for advanced applications)
function extendedGCD(a, b) {
  if (b === 0) {
    return { gcd: a, x: 1, y: 0 };
  }

  let result = extendedGCD(b, a % b);
  let gcd = result.gcd;
  let x = result.y;
  let y = result.x - Math.floor(a / b) * result.y;

  return { gcd, x, y };
}

// Driver code
console.log("=== GCD & LCM Calculations ===\n");

// Test cases
let testPairs = [
  [12, 8],
  [17, 13],
  [30, 45],
  [48, 18],
  [100, 25],
  [7, 9],
];

console.log("GCD & LCM Examples:");
testPairs.forEach(([a, b]) => {
  let gcd = gcdRecursive(a, b);
  let lcmValue = lcm(a, b);
  console.log(`Numbers: ${a}, ${b}`);
  console.log(`  GCD: ${gcd}`);
  console.log(`  LCM: ${lcmValue}`);
  console.log(
    `  Verification: GCD × LCM = ${gcd * lcmValue}, a × b = ${a * b}`,
  );
  console.log("---");
});

// Real-world applications
console.log("\n=== Real-world Applications ===");

// Fraction simplification
function simplifyFraction(numerator, denominator) {
  let gcd = gcdRecursive(Math.abs(numerator), Math.abs(denominator));
  return {
    simplified: `${numerator / gcd}/${denominator / gcd}`,
    gcd: gcd,
  };
}

console.log("Fraction Simplification:");
let fractions = [
  [8, 12], // 2/3
  [15, 25], // 3/5
  [24, 36], // 2/3
];

fractions.forEach(([num, den]) => {
  let result = simplifyFraction(num, den);
  console.log(`${num}/${den} → ${result.simplified} (GCD: ${result.gcd})`);
});

// Event scheduling
function findNextMeetingTime(period1, period2) {
  // Find when two events with different periods coincide
  return lcm(period1, period2);
}

console.log("\nEvent Scheduling:");
console.log(
  `Daily (1) and Weekly (7) events coincide every: ${findNextMeetingTime(1, 7)} days`,
);
console.log(
  `Every 3 days and Every 4 days events coincide every: ${findNextMeetingTime(3, 4)} days`,
);

// Extended GCD demonstration
console.log("\n=== Extended Euclidean Algorithm ===");
let extResult = extendedGCD(48, 18);
console.log(`For 48 and 18:`);
console.log(`GCD: ${extResult.gcd}`);
console.log(`Bézout coefficients: x = ${extResult.x}, y = ${extResult.y}`);
console.log(
  `Verification: 48×${extResult.x} + 18×${extResult.y} = ${48 * extResult.x + 18 * extResult.y}`,
);
