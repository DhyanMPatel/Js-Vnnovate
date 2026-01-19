/**
 * 🎯 PURPOSE: Perfect Number Identification
 *
 * Learning Objectives:
 * - Understand perfect number definition and properties
 * - Master divisor finding algorithms
 * - Practice mathematical number theory
 * - Learn optimization techniques for factorization
 *
 * Real-world Applications:
 * - Number theory research
 * - Cryptographic systems
 * - Mathematical puzzles and games
 * - Algorithm optimization studies
 * - Educational tools for mathematics
 *
 * Key Concepts:
 * - Perfect number: Sum of proper divisors equals the number
 * - Proper divisors: All divisors except the number itself
 * - Even perfect numbers follow Euclid-Euler theorem
 * - No odd perfect numbers are known
 *
 * Time Complexity: O(√n) for checking each number
 * Space Complexity: O(1) - Constant extra space
 */

// Function to get proper divisors of a number
function getProperDivisors(n) {
  if (n <= 1) return [];

  let divisors = [1]; // 1 is always a proper divisor for n > 1

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      let complement = n / i;
      if (complement !== i && complement !== n) {
        divisors.push(complement);
      }
    }
  }

  return divisors.sort((a, b) => a - b);
}

// Check if a number is perfect
function isPerfect(n) {
  if (n <= 1) return false;

  let divisors = getProperDivisors(n);
  let sum = divisors.reduce((acc, val) => acc + val, 0);

  return sum === n;
}

// Generate perfect numbers up to a limit
function findPerfectNumbers(limit) {
  let perfectNumbers = [];

  for (let i = 2; i <= limit; i++) {
    if (isPerfect(i)) {
      perfectNumbers.push(i);
    }
  }

  return perfectNumbers;
}

// Detailed analysis of a number
function analyzeNumber(n) {
  let divisors = getProperDivisors(n);
  let sum = divisors.reduce((acc, val) => acc + val, 0);

  let type;
  if (sum === n) {
    type = "Perfect";
  } else if (sum < n) {
    type = "Deficient";
  } else {
    type = "Abundant";
  }

  return {
    number: n,
    divisors: divisors,
    sum: sum,
    type: type,
  };
}

// Driver code
console.log("=== Perfect Numbers Analysis ===\n");

// Test known perfect numbers
let knownPerfectNumbers = [6, 28, 496, 8128];
console.log("Known Perfect Numbers:");
knownPerfectNumbers.forEach((num) => {
  let analysis = analyzeNumber(num);
  console.log(`${analysis.number}: ${analysis.type}`);
  console.log(`  Divisors: [${analysis.divisors.join(", ")}]`);
  console.log(`  Sum: ${analysis.sum}`);
  console.log("---");
});

// Find perfect numbers up to a limit
console.log("\nFinding Perfect Numbers up to 10000:");
let perfectNumbers = findPerfectNumbers(10000);
console.log(`Perfect numbers found: [${perfectNumbers.join(", ")}]`);

// Analyze different types of numbers
console.log("\n=== Number Classification ===");
let testNumbers = [12, 15, 20, 28, 30, 496];
testNumbers.forEach((num) => {
  let analysis = analyzeNumber(num);
  console.log(
    `${analysis.number}: ${analysis.type} (sum of divisors: ${analysis.sum})`,
  );
});

// Real-world application: Perfect number properties
console.log("\n=== Perfect Number Properties ===");

// Check if perfect numbers follow the pattern 2^(p-1) * (2^p - 1)
// where (2^p - 1) is a Mersenne prime
function isMersennePrime(p) {
  let mersenne = Math.pow(2, p) - 1;
  return isPrime(mersenne);
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log("Checking Euclid-Euler pattern:");
let primes = [2, 3, 5, 7, 13, 17, 19, 31];
primes.forEach((p) => {
  if (isMersennePrime(p)) {
    let perfectNumber = Math.pow(2, p - 1) * (Math.pow(2, p) - 1);
    console.log(`p = ${p}: Perfect number = ${perfectNumber}`);
  }
});

// Fun facts about perfect numbers
console.log("\n=== Fun Facts ===");
console.log("1. All known perfect numbers are even");
console.log("2. Perfect numbers are very rare");
console.log(
  "3. The sum of reciprocals of divisors of a perfect number equals 2",
);
console.log("4. Perfect numbers are triangular numbers");
console.log(
  "5. No odd perfect numbers have been discovered (if they exist, they must be > 10^1500)",
);
