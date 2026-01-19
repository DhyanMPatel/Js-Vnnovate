/**
 * 🎯 PURPOSE: Modular Arithmetic Techniques
 *
 * Learning Objectives:
 * - Master modular arithmetic operations (addition, subtraction, multiplication)
 * - Understand modular inverse and Fermat's Little Theorem
 * - Implement binary exponentiation for efficient modular calculations
 * - Learn to handle large numbers and avoid overflow
 *
 * Real-world Applications:
 * - Cryptography (RSA, Diffie-Hellman key exchange)
 * - Hash functions and checksums
 * - Computer graphics (circular buffers, circular arrays)
 * - Game development (circular game worlds)
 * - Financial calculations (cyclical patterns)
 * - Competitive programming problems
 *
 * Key Concepts:
 * - Modulo: a % m = remainder when a is divided by m
 * - Modular addition: (a+b)%m = [(a%m) + (b%m)]%m
 * - Modular subtraction: (a-b)%m = [(a%m) - (b%m) + m]%m
 * - Modular multiplication: (a×b)%m = [(a%m) × (b%m)]%m
 * - Modular division: (a/b)%m = (a × b⁻¹)%m
 * - Fermat's Little Theorem: b⁻¹ ≡ b^(m-2) % m (when m is prime)
 * - Binary exponentiation: Calculate a^b % m in O(log b) time
 *
 * Time Complexity:
 * - Basic operations: O(1)
 * - Binary exponentiation: O(log b)
 * - Modular inverse (Fermat): O(log m)
 * Space Complexity: O(1)
 */

// Basic modular operations
function modAdd(a, b, m) {
  return ((a % m) + (b % m)) % m;
}

function modSub(a, b, m) {
  return ((a % m) - (b % m) + m) % m;
}

function modMul(a, b, m) {
  return ((a % m) * (b % m)) % m;
}

// Binary Exponentiation: Calculate (a^b) % m efficiently
function modPow(a, b, m) {
  let result = 1;
  a = a % m; // Reduce a first

  while (b > 0) {
    // If b is odd, multiply result with a
    if (b % 2 === 1) {
      result = (result * a) % m;
    }

    // Square a and halve b
    a = (a * a) % m;
    b = Math.floor(b / 2);
  }

  return result;
}

// Calculate modular inverse using Fermat's Little Theorem
// Works only when m is prime and gcd(a, m) = 1
function modInverseFermat(a, m) {
  // Check if m is prime (simple check for demonstration)
  if (!isPrime(m)) {
    throw new Error("Modulus must be prime for Fermat's Little Theorem");
  }

  // Check if a and m are coprime
  if (gcd(a, m) !== 1) {
    throw new Error("a and m must be coprime");
  }

  // a^(-1) ≡ a^(m-2) % m
  return modPow(a, m - 2, m);
}

// Extended Euclidean Algorithm for modular inverse (works for any coprime numbers)
function modInverseExtended(a, m) {
  let result = extendedGCD(a, m);

  if (result.gcd !== 1) {
    throw new Error("Modular inverse doesn't exist (numbers are not coprime)");
  }

  // Make sure result is positive
  return ((result.x % m) + m) % m;
}

// Extended Euclidean Algorithm
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

// Modular division using modular inverse
function modDiv(a, b, m) {
  let invB = modInverseExtended(b, m);
  return modMul(a, invB, m);
}

// Helper functions
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Driver code
console.log("=== Modular Arithmetic Operations ===\n");

// Basic operations demonstration
let a = 17,
  b = 23,
  m = 7;
console.log(`Basic operations with a=${a}, b=${b}, m=${m}`);
console.log(`Addition: (${a} + ${b}) % ${m} = ${modAdd(a, b, m)}`);
console.log(`Subtraction: (${a} - ${b}) % ${m} = ${modSub(a, b, m)}`);
console.log(`Multiplication: (${a} × ${b}) % ${m} = ${modMul(a, b, m)}`);

// Binary exponentiation examples
console.log("\n=== Binary Exponentiation ===");
let expTests = [
  [2, 10, 1000], // 2^10 % 1000 = 1024 % 1000 = 24
  [3, 13, 100], // 3^13 % 100
  [5, 7, 13], // 5^7 % 13
  [10, 6, 1000000007], // Large modulus
];

expTests.forEach(([base, exp, mod]) => {
  let result = modPow(base, exp, mod);
  console.log(`${base}^${exp} % ${mod} = ${result}`);
});

// Modular inverse examples
console.log("\n=== Modular Inverse ===");
console.log("Using Fermat's Little Theorem (modulus must be prime):");
let fermatTests = [
  [3, 7], // 3^(-1) % 7 = 5 (since 3×5=15≡1 mod 7)
  [2, 5], // 2^(-1) % 5 = 3 (since 2×3=6≡1 mod 5)
  [10, 17], // 10^(-1) % 17 = 12 (since 10×12=120≡1 mod 17)
];

fermatTests.forEach(([num, mod]) => {
  try {
    let inverse = modInverseFermat(num, mod);
    console.log(`${num}^(-1) % ${mod} = ${inverse}`);
    console.log(
      `Verification: ${num} × ${inverse} % ${mod} = ${modMul(num, inverse, mod)}`,
    );
  } catch (error) {
    console.log(`Error for ${num}, ${mod}: ${error.message}`);
  }
});

console.log("\nUsing Extended Euclidean Algorithm:");
let extendedTests = [
  [3, 7],
  [2, 5],
  [10, 17],
  [8, 15], // Non-prime modulus
];

extendedTests.forEach(([num, mod]) => {
  try {
    let inverse = modInverseExtended(num, mod);
    console.log(`${num}^(-1) % ${mod} = ${inverse}`);
    console.log(
      `Verification: ${num} × ${inverse} % ${mod} = ${modMul(num, inverse, mod)}`,
    );
  } catch (error) {
    console.log(`Error for ${num}, ${mod}: ${error.message}`);
  }
});

// Modular division examples
console.log("\n=== Modular Division ===");
let divTests = [
  [10, 3, 7], // (10/3) % 7 = 10 × 3^(-1) % 7 = 10 × 5 % 7 = 50 % 7 = 1
  [8, 2, 5], // (8/2) % 5 = 8 × 2^(-1) % 5 = 8 × 3 % 5 = 24 % 5 = 4
  [15, 4, 13], // (15/4) % 13
];

divTests.forEach(([num, den, mod]) => {
  try {
    let result = modDiv(num, den, mod);
    console.log(`(${num}/${den}) % ${mod} = ${result}`);
    console.log(
      `Verification: ${result} × ${den} % ${mod} = ${modMul(result, den, mod)}`,
    );
  } catch (error) {
    console.log(`Error for (${num}/${den}) % ${mod}: ${error.message}`);
  }
});

// Performance comparison
console.log("\n=== Performance Analysis ===");

function performanceTest() {
  let largeBase = 123456789;
  let largeExp = 123456;
  let largeMod = 1000000007;

  console.time("Binary Exponentiation");
  let result = modPow(largeBase, largeExp, largeMod);
  console.timeEnd("Binary Exponentiation");
  console.log(`Result: ${largeBase}^${largeExp} % ${largeMod} = ${result}`);
}

performanceTest();

// Real-world applications
console.log("\n=== Real-world Applications ===");

// Circular buffer index calculation
function circularBufferIndex(index, size, offset) {
  return modAdd(index, offset, size);
}

console.log("Circular Buffer Example:");
let bufferSize = 10;
let currentIndex = 7;
let offsets = [1, 2, 3, 4, 5];
offsets.forEach((offset) => {
  let newIndex = circularBufferIndex(currentIndex, bufferSize, offset);
  console.log(
    `Index ${currentIndex} + offset ${offset} → ${newIndex} (buffer size: ${bufferSize})`,
  );
});

// Hash function example
function simpleHash(str, tableSize) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = modAdd(hash * 31, str.charCodeAt(i), tableSize);
  }
  return hash;
}

console.log("\nHash Function Example:");
let words = ["hello", "world", "javascript", "modular", "arithmetic"];
let hashTableSize = 101;
words.forEach((word) => {
  let hash = simpleHash(word, hashTableSize);
  console.log(`"${word}" → hash: ${hash} (table size: ${hashTableSize})`);
});

// Cryptography example (simplified RSA-like calculation)
function simplifiedRSA(message, publicKey, modulus) {
  return modPow(message, publicKey, modulus);
}

console.log("\nSimplified Cryptography Example:");
let message = 42;
let publicKey = 65537; // Common RSA public exponent
let rsaModulus = 1000000007; // Large prime modulus
let encrypted = simplifiedRSA(message, publicKey, rsaModulus);
console.log(`Message: ${message}`);
console.log(`Encrypted: ${encrypted}`);

// Mathematical properties demonstration
console.log("\n=== Mathematical Properties ===");

// Demonstrate that (a × b) % m = [(a % m) × (b % m)] % m
function demonstrateModularProperties() {
  let testCases = [
    [12345, 67890, 97],
    [999999, 888888, 1000],
    [123456789, 987654321, 12345],
  ];

  testCases.forEach(([a, b, m]) => {
    let direct = (a * b) % m;
    let modular = modMul(a, b, m);
    console.log(`(${a} × ${b}) % ${m}:`);
    console.log(`  Direct calculation: ${direct}`);
    console.log(`  Modular method: ${modular}`);
    console.log(`  Equal: ${direct === modular}`);
  });
}

demonstrateModularProperties();

// Advanced: Calculate large combinations modulo m
function modCombinations(n, k, m) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  // C(n,k) = n! / (k! × (n-k)!)
  // We'll use multiplicative formula to avoid large factorials

  k = Math.min(k, n - k); // Take advantage of symmetry

  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = modMul(result, n - k + i, m);
    result = modDiv(result, i, m);
  }

  return result;
}

console.log("\nCombinations Modulo:");
let combTests = [
  [10, 3, 1000],
  [20, 10, 1000000007],
  [100, 50, 1000000007],
];

combTests.forEach(([n, k, m]) => {
  try {
    let result = modCombinations(n, k, m);
    console.log(`C(${n},${k}) % ${m} = ${result}`);
  } catch (error) {
    console.log(`Error for C(${n},${k}) % ${m}: ${error.message}`);
  }
});
