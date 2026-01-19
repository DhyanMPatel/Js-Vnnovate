/**
 * 🎯 PURPOSE: Prime Factorization Techniques
 *
 * Learning Objectives:
 * - Master optimized trial division for prime factorization
 * - Understand Sieve + SPF (Smallest Prime Factor) method
 * - Learn to count total number of factors using prime factorization
 * - Practice efficient algorithms for number theory problems
 *
 * Real-world Applications:
 * - Cryptography (RSA key generation, factorization attacks)
 * - Mathematical computations and simulations
 * - Competitive programming problems
 * - Number theory research
 * - Algorithm optimization studies
 *
 * Key Concepts:
 * - Prime factorization: Express n as product of prime factors
 * - Optimized trial division: Check up to √n, skip evens after 2
 * - SPF method: Precompute smallest prime factors using sieve
 * - Divisor count formula: (e₁+1) × (e₂+1) × ... × (eₖ+1)
 *
 * Time Complexity:
 * - Trial Division: O(√n) per factorization
 * - SPF Method: O(n log log n) preprocessing + O(log n) per query
 * Space Complexity: O(n) for SPF array
 */

// Method 1: Optimized Trial Division
function primeFactorizationTrialDivision(n) {
  if (n <= 1) return [];

  let factors = [];

  // Handle factor 2 separately
  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }

  // Check odd numbers only
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }

  // If n is still > 1, it's a prime factor
  if (n > 1) {
    factors.push(n);
  }

  return factors;
}

// Get prime factors with exponents
function getPrimeFactorsWithExponents(n) {
  let factors = primeFactorizationTrialDivision(n);
  let factorMap = new Map();

  factors.forEach((factor) => {
    factorMap.set(factor, (factorMap.get(factor) || 0) + 1);
  });

  return Array.from(factorMap.entries()).sort((a, b) => a[0] - b[0]);
}

// Method 2: Sieve + SPF (Smallest Prime Factor)
function computeSPF(maxN) {
  let spf = new Array(maxN + 1);

  // Initialize SPF array
  for (let i = 0; i <= maxN; i++) {
    spf[i] = i;
  }

  // Mark even numbers
  for (let i = 2; i <= maxN; i += 2) {
    spf[i] = 2;
  }

  // Apply sieve to find smallest prime factors
  for (let i = 3; i * i <= maxN; i += 2) {
    if (spf[i] === i) {
      // i is prime
      for (let j = i * i; j <= maxN; j += i) {
        if (spf[j] === j) {
          spf[j] = i;
        }
      }
    }
  }

  return spf;
}

// Factorize using SPF array
function primeFactorizationSPF(n, spf) {
  if (n <= 1) return [];

  let factors = [];

  while (n > 1) {
    factors.push(spf[n]);
    n /= spf[n];
  }

  return factors;
}

// Count total number of factors using prime factorization
function countTotalFactors(n) {
  let primeFactors = getPrimeFactorsWithExponents(n);

  if (primeFactors.length === 0) return 0;

  let totalFactors = 1;
  primeFactors.forEach(([prime, exponent]) => {
    totalFactors *= exponent + 1;
  });

  return totalFactors;
}

// Get all factors using prime factorization
function getAllFactorsUsingPrimeFactorization(n) {
  let primeFactors = getPrimeFactorsWithExponents(n);

  if (primeFactors.length === 0) return [];

  let factors = [1];

  primeFactors.forEach(([prime, exponent]) => {
    let currentFactors = [...factors];

    for (let exp = 1; exp <= exponent; exp++) {
      let power = Math.pow(prime, exp);
      currentFactors.forEach((factor) => {
        factors.push(factor * power);
      });
    }
  });

  return [...new Set(factors)].sort((a, b) => a - b);
}

// Driver code
console.log("=== Prime Factorization Techniques ===\n");

// Test numbers for factorization
let testNumbers = [12, 18, 24, 36, 48, 60, 72, 84, 96, 100, 121, 144];

console.log("Method 1: Optimized Trial Division");
testNumbers.forEach((num) => {
  let factors = primeFactorizationTrialDivision(num);
  let factorsWithExponents = getPrimeFactorsWithExponents(num);
  let factorString = factorsWithExponents
    .map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`))
    .join(" × ");

  console.log(`${num} = ${factorString}`);
  console.log(`  Factors: [${factors.join(", ")}]`);
  console.log(`  Total factors: ${countTotalFactors(num)}`);
  console.log("---");
});

// Method 2: SPF demonstration
console.log("\nMethod 2: Sieve + SPF Approach");
let maxN = 100;
let spf = computeSPF(maxN);

console.log(`SPF array computed for numbers up to ${maxN}`);
console.log("Sample SPF values:");
for (let i = 2; i <= 20; i++) {
  console.log(`SPF[${i}] = ${spf[i]}`);
}

console.log("\nFactorization using SPF:");
let spfTestNumbers = [12, 18, 24, 36, 48, 60];
spfTestNumbers.forEach((num) => {
  let factors = primeFactorizationSPF(num, spf);
  console.log(`${num} = [${factors.join(" × ")}]`);
});

// Performance comparison
console.log("\n=== Performance Comparison ===");

function performanceTest() {
  let largeNumbers = [99991, 99989, 99971, 99961, 99929]; // Large primes

  console.log("Testing with large prime numbers:");

  largeNumbers.forEach((num) => {
    console.time(`Trial Division for ${num}`);
    let factors1 = primeFactorizationTrialDivision(num);
    console.timeEnd(`Trial Division for ${num}`);

    console.time(`SPF Method for ${num}`);
    let factors2 = primeFactorizationSPF(num, spf);
    console.timeEnd(`SPF Method for ${num}`);

    console.log(`  Result: ${num} is prime (${factors1.length === 1})`);
    console.log("---");
  });
}

performanceTest();

// Advanced applications
console.log("\n=== Advanced Applications ===");

// Check if a number is a perfect square using prime factorization
function isPerfectSquareUsingPrimeFactorization(n) {
  let primeFactors = getPrimeFactorsWithExponents(n);

  return primeFactors.every(([prime, exponent]) => exponent % 2 === 0);
}

// Find numbers with exactly n factors
function findNumbersWithExactFactorCount(limit, targetCount) {
  let results = [];

  for (let i = 1; i <= limit; i++) {
    if (countTotalFactors(i) === targetCount) {
      results.push(i);
    }
  }

  return results;
}

console.log("Perfect Square Detection:");
let squareTestNumbers = [16, 25, 36, 48, 64, 72, 81, 100];
squareTestNumbers.forEach((num) => {
  console.log(
    `${num}: ${isPerfectSquareUsingPrimeFactorization(num) ? "Perfect Square" : "Not Perfect Square"}`,
  );
});

console.log("\nNumbers with exactly 12 factors (up to 200):");
let twelveFactorNumbers = findNumbersWithExactFactorCount(200, 12);
console.log(`[${twelveFactorNumbers.join(", ")}]`);

// Mathematical properties
console.log("\n=== Mathematical Properties ===");

// Euler's Totient Function using prime factorization
function eulerTotient(n) {
  let primeFactors = getPrimeFactorsWithExponents(n);
  let result = n;

  primeFactors.forEach(([prime, exponent]) => {
    result *= 1 - 1 / prime;
  });

  return Math.round(result);
}

console.log("Euler's Totient Function:");
let totientTestNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 24];
totientTestNumbers.forEach((num) => {
  console.log(`φ(${num}) = ${eulerTotient(num)}`);
});

// Factorization challenges
console.log("\n=== Factorization Challenges ===");

// Challenge 1: Find the smallest number with exactly n factors
function smallestNumberWithExactFactors(targetFactorCount) {
  // Simple brute force approach
  for (let i = 1; i <= 10000; i++) {
    if (countTotalFactors(i) === targetFactorCount) {
      return i;
    }
  }
  return -1;
}

console.log("Smallest numbers with specific factor counts:");
for (let i = 1; i <= 16; i++) {
  let smallest = smallestNumberWithExactFactors(i);
  console.log(`${i} factors: ${smallest}`);
}

// Challenge 2: Highly composite numbers
function isHighlyComposite(n) {
  let factorCount = countTotalFactors(n);

  // Check if any smaller number has more factors
  for (let i = 1; i < n; i++) {
    if (countTotalFactors(i) >= factorCount) {
      return false;
    }
  }

  return true;
}

console.log("\nHighly Composite Numbers (up to 100):");
for (let i = 1; i <= 100; i++) {
  if (isHighlyComposite(i)) {
    console.log(`${i} (${countTotalFactors(i)} factors)`);
  }
}
