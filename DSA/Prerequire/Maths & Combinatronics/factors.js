/**
 * 🎯 PURPOSE: Efficient Factor Finding
 *
 * Learning Objectives:
 * - Master the √n optimization for factor finding
 * - Understand factor pairs and mathematical properties
 * - Practice array manipulation and sorting
 * - Learn efficient algorithm design principles
 *
 * Real-world Applications:
 * - Prime factorization for cryptography
 * - Mathematical computations and simulations
 * - Number theory research
 * - Divisor-based problems in competitive programming
 * - Statistical analysis and data processing
 *
 * Key Concepts:
 * - Factors come in pairs: if i divides n, then n/i also divides n
 * - Only need to check up to √n
 * - Handle perfect squares specially (avoid duplicate factors)
 * - Sort factors for better presentation
 *
 * Time Complexity: O(√n) - Much better than O(n)
 * Space Complexity: O(k) where k is number of factors
 */

// Get all factors of a number efficiently
function getFactors(n) {
  if (n <= 0) return [];

  let factors = new Set();

  // Check from 1 to √n
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.add(i);
      factors.add(n / i);
    }
  }

  return Array.from(factors).sort((a, b) => a - b);
}

// Get prime factors of a number
function getPrimeFactors(n) {
  if (n <= 1) return [];

  let factors = [];
  let temp = n;

  // Handle 2 separately
  while (temp % 2 === 0) {
    factors.push(2);
    temp /= 2;
  }

  // Check odd numbers up to √temp
  for (let i = 3; i <= Math.sqrt(temp); i += 2) {
    while (temp % i === 0) {
      factors.push(i);
      temp /= i;
    }
  }

  // If remaining temp is a prime > 2
  if (temp > 2) {
    factors.push(temp);
  }

  return factors;
}

// Count number of factors
function countFactors(n) {
  return getFactors(n).length;
}

// Check if a number is a perfect square
function isPerfectSquare(n) {
  if (n < 0) return false;
  let sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

// Get factor pairs
function getFactorPairs(n) {
  let factors = getFactors(n);
  let pairs = [];

  for (let i = 0; i < factors.length; i++) {
    let factor1 = factors[i];
    let factor2 = n / factor1;

    if (factor1 <= factor2) {
      pairs.push([factor1, factor2]);
    }
  }

  return pairs;
}

// Driver code
console.log("=== Factor Finding Algorithms ===\n");

// Test numbers
let testNumbers = [1, 6, 12, 16, 25, 36, 48, 100];

console.log("Factor Analysis:");
testNumbers.forEach((num) => {
  let factors = getFactors(num);
  let primeFactors = getPrimeFactors(num);
  let pairs = getFactorPairs(num);

  console.log(`\nNumber: ${num}`);
  console.log(`  All factors: [${factors.join(", ")}]`);
  console.log(`  Prime factors: [${primeFactors.join(", ")}]`);
  console.log(
    `  Factor pairs: ${pairs.map((pair) => `(${pair[0]}, ${pair[1]})`).join(", ")}`,
  );
  console.log(`  Total factors: ${factors.length}`);
  console.log(`  Perfect square: ${isPerfectSquare(num)}`);
});

// Performance comparison
console.log("\n=== Performance Analysis ===");

function naiveFactorCount(n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) count++;
  }
  return count;
}

function optimizedFactorCount(n) {
  return countFactors(n);
}

let performanceTest = 10000;
console.log(`Counting factors of ${performanceTest}:`);
console.log(`  Naive method result: ${naiveFactorCount(performanceTest)}`);
console.log(
  `  Optimized method result: ${optimizedFactorCount(performanceTest)}`,
);

// Real-world applications
console.log("\n=== Real-world Applications ===");

// Check if a number has exactly 3 factors (must be square of a prime)
function hasExactlyThreeFactors(n) {
  if (!isPerfectSquare(n)) return false;

  let sqrt = Math.sqrt(n);
  return isPrime(sqrt);
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log("Numbers with exactly 3 factors:");
let threeFactorTest = [4, 9, 25, 49, 121, 16, 36];
threeFactorTest.forEach((num) => {
  console.log(`  ${num}: ${hasExactlyThreeFactors(num) ? "Yes" : "No"}`);
});

// Find numbers with specific factor counts
function findNumbersWithFactorCount(limit, targetCount) {
  let results = [];
  for (let i = 1; i <= limit; i++) {
    if (countFactors(i) === targetCount) {
      results.push(i);
    }
  }
  return results;
}

console.log("\nNumbers with exactly 6 factors (up to 100):");
let sixFactorNumbers = findNumbersWithFactorCount(100, 6);
console.log(`  [${sixFactorNumbers.join(", ")}]`);

// Factor-based problem solving
console.log("\n=== Problem Solving Examples ===");

// Find the smallest number with exactly n factors
function smallestNumberWithNFactors(n) {
  // Simple approach - not optimal for large n
  for (let i = 1; i <= 10000; i++) {
    if (countFactors(i) === n) {
      return i;
    }
  }
  return -1;
}

console.log("Smallest numbers with specific factor counts:");
for (let i = 1; i <= 10; i++) {
  let smallest = smallestNumberWithNFactors(i);
  console.log(`  ${i} factors: ${smallest}`);
}
