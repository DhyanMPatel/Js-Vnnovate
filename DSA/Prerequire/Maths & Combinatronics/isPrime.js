/**
 * 🎯 PURPOSE: Optimized Prime Number Checking
 *
 * Learning Objectives:
 * - Master primality testing with O(√n) time complexity
 * - Understand mathematical optimizations for prime checking
 * - Learn the 6k ± 1 optimization pattern
 * - Practice efficient loop design and early termination
 *
 * Real-world Applications:
 * - Cryptography (RSA key generation)
 * - Security algorithms
 * - Mathematical computations
 * - Competitive programming problems
 *
 * Key Optimizations:
 * - Check divisibility only up to √n
 * - Skip even numbers after checking 2
 * - Use 6k ± 1 pattern (all primes > 3 follow this)
 * - Early return for obvious cases
 *
 * Time Complexity: O(√n) - Much better than naive O(n) approach
 * Space Complexity: O(1) - Constant extra space
 */

function isPrime(n) {
  // Check if n is 1 or 0
  if (n <= 1) return false;

  // Check if n is 2 or 3
  if (n === 2 || n === 3) return true;

  // Check whether n is divisible by 2 or 3
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Check from 5 to square root of n
  // Iterate i by (i+6)
  for (let i = 5; i <= Math.sqrt(n); i += 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;

  return true;
}

// Driver Code
let n = 7;
if (isPrime(n)) console.log("true");
else console.log("false");
