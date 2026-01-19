/**
 * 🎯 PURPOSE: Modular Exponentiation (Binary Exponentiation)
 *
 * Learning Objectives:
 * - Master binary exponentiation algorithm for efficient modular calculations
 * - Understand how to compute (x^n) % M in O(log n) time
 * - Practice bit manipulation and loop optimization
 * - Learn to handle large exponents efficiently
 *
 * Real-world Applications:
 * - Cryptography (RSA encryption, Diffie-Hellman key exchange)
 * - Large number computations in competitive programming
 * - Hash function implementations
 * - Mathematical simulations
 * - Computer graphics (fast power calculations)
 *
 * Key Concepts:
 * - Binary representation of exponents
 * - Divide and conquer approach
 * - Modular arithmetic properties
 * - Time complexity: O(log n) vs O(n) naive approach
 *
 * Algorithm Principle:
 * - Break exponent n into binary form
 * - Square base when exponent bit is 0
 * - Multiply result when exponent bit is 1
 * - Apply modulo at each step to prevent overflow
 */

function powMod(x, n, M) {
  let res = 1;

  // Loop until exponent becomes 0
  while (n >= 1) {
    // If n is odd, multiply result by current x and take modulo
    if (n % 2 === 1) {
      res = (res * x) % M;
      n -= 1;
    } else {
      // If n is even, square the base and halve the exponent
      x = (x * x) % M;
      n /= 2;
    }
  }

  return res;
}

// Alternative implementation using bitwise operations (more efficient)
function powModBitwise(x, n, M) {
  let res = 1;
  x = x % M; // Reduce x first

  while (n > 0) {
    // If last bit of n is 1, multiply result
    if (n & 1) {
      res = (res * x) % M;
    }

    // Square the base
    x = (x * x) % M;

    // Right shift n (divide by 2)
    n = n >> 1;
  }

  return res;
}

// Recursive implementation for understanding
function powModRecursive(x, n, M) {
  if (n === 0) return 1 % M;
  if (n === 1) return x % M;

  // Compute half power
  let half = powModRecursive(x, Math.floor(n / 2), M);

  // Square the half result
  let result = (half * half) % M;

  // If n is odd, multiply by x
  if (n % 2 === 1) {
    result = (result * x) % M;
  }

  return result;
}

// Naive approach for comparison
function powModNaive(x, n, M) {
  let res = 1;
  for (let i = 0; i < n; i++) {
    res = (res * x) % M;
  }
  return res;
}

// Driver code
console.log("=== Modular Exponentiation Examples ===\n");

// Basic examples
let testCases = [
  [3, 2, 4], // 3^2 % 4 = 9 % 4 = 1
  [2, 10, 1000], // 2^10 % 1000 = 1024 % 1000 = 24
  [5, 3, 13], // 5^3 % 13 = 125 % 13 = 8
  [10, 6, 100], // 10^6 % 100 = 1000000 % 100 = 0
  [7, 0, 5], // 7^0 % 5 = 1 % 5 = 1
];

console.log("Basic Test Cases:");
testCases.forEach(([x, n, M]) => {
  let result = powMod(x, n, M);
  let bitwiseResult = powModBitwise(x, n, M);
  let recursiveResult = powModRecursive(x, n, M);
  let naiveResult = powModNaive(x, n, M);

  console.log(`${x}^${n} % ${M} = ${result}`);
  console.log(
    `  Bitwise: ${bitwiseResult}, Recursive: ${recursiveResult}, Naive: ${naiveResult}`,
  );
  console.log(
    `  All methods match: ${result === bitwiseResult && result === recursiveResult && result === naiveResult}`,
  );
  console.log("---");
});

// Performance comparison
console.log("\n=== Performance Analysis ===");

function performanceTest() {
  let largeBase = 123456789;
  let largeExp = 123456;
  let largeMod = 1000000007;

  console.log(`Testing ${largeBase}^${largeExp} % ${largeMod}`);

  console.time("Binary Exponentiation");
  let fastResult = powModBitwise(largeBase, largeExp, largeMod);
  console.timeEnd("Binary Exponentiation");

  console.time("Naive Approach (limited to 10000 iterations)");
  let naiveResult = powModNaive(largeBase, Math.min(10000, largeExp), largeMod);
  console.timeEnd("Naive Approach (limited to 10000 iterations)");

  console.log(`Fast result: ${fastResult}`);
  console.log(`Naive result (first 10000): ${naiveResult}`);
  console.log("Note: Naive approach would take much longer for full exponent!");
}

performanceTest();

// Real-world applications
console.log("\n=== Real-world Applications ===");

// Cryptography: Simplified RSA-like calculation
function simplifiedRSA(message, publicKey, modulus) {
  return powModBitwise(message, publicKey, modulus);
}

console.log("Simplified Cryptography Example:");
let message = 42;
let publicKey = 65537; // Common RSA public exponent
let modulus = 1000000007; // Large prime modulus
let encrypted = simplifiedRSA(message, publicKey, modulus);
console.log(`Message: ${message}`);
console.log(`Encrypted: ${encrypted}`);

// Hash function example
function modularHash(str, tableSize, base = 31) {
  let hash = 0;
  let power = 1;

  for (let i = 0; i < str.length; i++) {
    hash = (hash + ((str.charCodeAt(i) * power) % tableSize)) % tableSize;
    power = (power * base) % tableSize; // Use powMod for efficiency
  }

  return hash;
}

console.log("\nHash Function Example:");
let words = ["hello", "world", "javascript", "modular", "exponentiation"];
let hashTableSize = 101;
words.forEach((word) => {
  let hash = modularHash(word, hashTableSize);
  console.log(`"${word}" → hash: ${hash} (table size: ${hashTableSize})`);
});

// Mathematical properties demonstration
console.log("\n=== Mathematical Properties ===");

// Demonstrate that (a^b) % m = [(a % m)^b] % m
function demonstrateModularProperties() {
  let testCases = [
    [12345, 678, 97],
    [999999, 888, 1000],
    [123456789, 987654321, 12345],
  ];

  testCases.forEach(([a, b, m]) => {
    let direct = powModBitwise(a, b, m);
    let reduced = powModBitwise(a % m, b, m);
    console.log(`(${a}^${b}) % ${m}:`);
    console.log(`  Direct: ${direct}`);
    console.log(`  Reduced base: ${reduced}`);
    console.log(`  Equal: ${direct === reduced}`);
  });
}

demonstrateModularProperties();

// Advanced: Calculate large Fibonacci numbers modulo m
function fibonacciMod(n, m) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Using matrix exponentiation for O(log n) Fibonacci
  // F(n) = [[1,1],[1,0]]^(n-1) * [1,0]

  function matrixMultiply(a, b, mod) {
    return [
      [
        (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % mod,
        (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % mod,
      ],
      [
        (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % mod,
        (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % mod,
      ],
    ];
  }

  function matrixPower(mat, power, mod) {
    let result = [
      [1, 0],
      [0, 1],
    ]; // Identity matrix

    while (power > 0) {
      if (power & 1) {
        result = matrixMultiply(result, mat, mod);
      }
      mat = matrixMultiply(mat, mat, mod);
      power = power >> 1;
    }

    return result;
  }

  let baseMatrix = [
    [1, 1],
    [1, 0],
  ];
  let resultMatrix = matrixPower(baseMatrix, n - 1, m);
  return resultMatrix[0][0];
}

console.log("\nAdvanced: Fibonacci Numbers Modulo:");
let fibTests = [10, 50, 100, 1000, 10000];
fibTests.forEach((n) => {
  let fib = fibonacciMod(n, 1000000007);
  console.log(`F(${n}) % 1000000007 = ${fib}`);
});

// Edge cases and error handling
console.log("\n=== Edge Cases ===");

function testEdgeCases() {
  console.log("Testing edge cases:");

  // Zero exponent
  console.log(`5^0 % 7 = ${powMod(5, 0, 7)} (should be 1)`);

  // Zero base
  console.log(`0^5 % 7 = ${powMod(0, 5, 7)} (should be 0)`);

  // Modulus 1
  console.log(`5^3 % 1 = ${powMod(5, 3, 1)} (should be 0)`);

  // Large numbers
  console.log(`2^1000 % 1000000007 = ${powMod(2, 1000, 1000000007)}`);
}

testEdgeCases();

console.log("\n=== Summary ===");
console.log("Binary exponentiation is essential for:");
console.log("1. Cryptography and security algorithms");
console.log("2. Large number computations");
console.log("3. Competitive programming");
console.log("4. Mathematical simulations");
console.log("5. Hash function implementations");
