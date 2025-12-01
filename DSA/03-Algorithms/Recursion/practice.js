// 🔄 Recursion & Backtracking Practice Problems
// Implement these functions to master recursive thinking

// ==========================================
// EASY PROBLEMS (O(n) or O(2^n))
// ==========================================

/**
 * Problem 1: Factorial
 * Calculate factorial of a number.
 *
 * @param {number} n - Input number
 * @return {number} Factorial of n
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 5
 * Output: 120
 */
function factorial(n) {
  // Your implementation here
}

/**
 * Problem 2: Fibonacci Number
 * Calculate nth Fibonacci number.
 *
 * @param {number} n - Input number
 * @return {number} nth Fibonacci number
 *
 * Expected Time: O(2^n) naive, O(n) with memoization
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 10
 * Output: 55
 */
function fibonacci(n) {
  // Your implementation here
}

/**
 * Problem 3: Power of Two
 * Check if number is power of two.
 *
 * @param {number} n - Input number
 * @return {boolean} True if power of two
 *
 * Expected Time: O(log n)
 * Expected Space: O(log n)
 *
 * Example:
 * Input: n = 16
 * Output: true
 */
function isPowerOfTwo(n) {
  // Your implementation here
}

/**
 * Problem 4: Sum of Digits
 * Calculate sum of digits of a number.
 *
 * @param {number} n - Input number
 * @return {number} Sum of digits
 *
 * Expected Time: O(log n)
 * Expected Space: O(log n)
 *
 * Example:
 * Input: n = 1234
 * Output: 10
 */
function sumOfDigits(n) {
  // Your implementation here
}

/**
 * Problem 5: Reverse String
 * Reverse a string using recursion.
 *
 * @param {string} s - Input string
 * @return {string} Reversed string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "hello"
 * Output: "olleh"
 */
function reverseString(s) {
  // Your implementation here
}

/**
 * Problem 6: Check Palindrome
 * Check if string is palindrome.
 *
 * @param {string} s - Input string
 * @return {boolean} True if palindrome
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "racecar"
 * Output: true
 */
function isPalindrome(s) {
  // Your implementation here
}

/**
 * Problem 7: GCD of Two Numbers
 * Find greatest common divisor using Euclidean algorithm.
 *
 * @param {number} a - First number
 * @param {number} b - Second number
 * @return {number} GCD of a and b
 *
 * Expected Time: O(log min(a, b))
 * Expected Space: O(log min(a, b))
 *
 * Example:
 * Input: a = 48, b = 18
 * Output: 6
 */
function gcd(a, b) {
  // Your implementation here
}

/**
 * Problem 8: Power Function
 * Calculate a^b using recursion.
 *
 * @param {number} a - Base
 * @param {number} b - Exponent
 * @return {number} a raised to power b
 *
 * Expected Time: O(log b)
 * Expected Space: O(log b)
 *
 * Example:
 * Input: a = 2, b = 8
 * Output: 256
 */
function power(a, b) {
  // Your implementation here
}

/**
 * Problem 9: Sum of Array
 * Calculate sum of array elements recursively.
 *
 * @param {number[]} arr - Input array
 * @return {number} Sum of elements
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr = [1,2,3,4,5]
 * Output: 15
 */
function sumArray(arr) {
  // Your implementation here
}

/**
 * Problem 10: Find Maximum in Array
 * Find maximum element in array recursively.
 *
 * @param {number[]} arr - Input array
 * @return {number} Maximum element
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr = [1,5,3,9,2]
 * Output: 9
 */
function findMax(arr) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Binary Search
 * Implement binary search recursively.
 *
 * @param {number[]} nums - Sorted array
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(log n)
 * Expected Space: O(log n)
 *
 * Example:
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 */
function binarySearch(nums, target) {
  // Your implementation here
}

/**
 * Problem 12: Generate Parentheses
 * Generate all combinations of well-formed parentheses.
 *
 * @param {number} n - Number of pairs
 * @return {string[]} All valid combinations
 *
 * Expected Time: O(Catalan(n))
 * Expected Space: O(Catalan(n))
 *
 * Example:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 */
function generateParentheses(n) {
  // Your implementation here
}

/**
 * Problem 13: Subsets
 * Generate all subsets of a set.
 *
 * @param {number[]} nums - Input array
 * @return {number[][]} All subsets
 *
 * Expected Time: O(2^n * n)
 * Expected Space: O(2^n * n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
function subsets(nums) {
  // Your implementation here
}

/**
 * Problem 14: Permutations
 * Generate all permutations of an array.
 *
 * @param {number[]} nums - Input array
 * @return {number[][]} All permutations
 *
 * Expected Time: O(n! * n)
 * Expected Space: O(n! * n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
function permutations(nums) {
  // Your implementation here
}

/**
 * Problem 15: Letter Case Permutation
 * Generate all possible letter case permutations.
 *
 * @param {string} s - Input string
 * @return {string[]} All permutations
 *
 * Expected Time: O(2^n)
 * Expected Space: O(2^n)
 *
 * Example:
 * Input: s = "a1b2"
 * Output: ["a1b2","a1B2","A1b2","A1B2"]
 */
function letterCasePermutation(s) {
  // Your implementation here
}

/**
 * Problem 16: N-Queens Problem
 * Solve N-Queens puzzle.
 *
 * @param {number} n - Board size
 * @return {string[][]} All distinct solutions
 *
 * Expected Time: O(n!)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 4
 * Output: Solutions for 4-Queens puzzle
 */
function solveNQueens(n) {
  // Your implementation here
}

/**
 * Problem 17: Word Search
 * Check if word exists in grid.
 *
 * @param {character[][]} board - Game board
 * @param {string} word - Target word
 * @return {boolean} True if word exists
 *
 * Expected Time: O(m * n * 4^L)
 * Expected Space: O(L)
 *
 * Example:
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * Output: true
 */
function exist(board, word) {
  // Your implementation here
}

/**
 * Problem 18: Combination Sum
 * Find combinations that sum to target.
 *
 * @param {number[]} candidates - Candidate numbers
 * @param {number} target - Target sum
 * @return {number[][]} All unique combinations
 *
 * Expected Time: O(n^(target/min))
 * Expected Space: O(target/min)
 *
 * Example:
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 */
function combinationSum(candidates, target) {
  // Your implementation here
}

/**
 * Problem 19: Phone Number Letter Combinations
 * Generate all possible letter combinations.
 *
 * @param {string} digits - Input digits
 * @return {string[]} All letter combinations
 *
 * Expected Time: O(4^n)
 * Expected Space: O(4^n)
 *
 * Example:
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 */
function letterCombinations(digits) {
  // Your implementation here
}

/**
 * Problem 20: Palindrome Partitioning
 * Partition string into palindrome substrings.
 *
 * @param {string} s - Input string
 * @return {string[][]} All palindrome partitions
 *
 * Expected Time: O(n * 2^n)
 * Expected Space: O(n^2)
 *
 * Example:
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 */
function partition(s) {
  // Your implementation here
}

/**
 * Problem 21: Restore IP Addresses
 * Restore valid IP addresses from string.
 *
 * @param {string} s - Input string
 * @return {string[]} All valid IP addresses
 *
 * Expected Time: O(3^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "25525511135"
 * Output: ["255.255.11.135","255.255.111.35"]
 */
function restoreIpAddresses(s) {
  // Your implementation here
}

/**
 * Problem 22: Combinations
 * Generate all combinations of k numbers from 1 to n.
 *
 * @param {number} n - Range end
 * @param {number} k - Numbers to choose
 * @return {number[][]} All combinations
 *
 * Expected Time: O(C(n, k) * k)
 * Expected Space: O(C(n, k) * k)
 *
 * Example:
 * Input: n = 4, k = 2
 * Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
 */
function combine(n, k) {
  // Your implementation here
}

/**
 * Problem 23: Subsets II
 * Generate all subsets with possible duplicates.
 *
 * @param {number[]} nums - Input array with duplicates
 * @return {number[][]} All unique subsets
 *
 * Expected Time: O(2^n)
 * Expected Space: O(2^n)
 *
 * Example:
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 */
function subsetsWithDup(nums) {
  // Your implementation here
}

/**
 * Problem 24: Permutations II
 * Generate all unique permutations with duplicates.
 *
 * @param {number[]} nums - Input array with duplicates
 * @return {number[][]} All unique permutations
 *
 * Expected Time: O(n! * n)
 * Expected Space: O(n! * n)
 *
 * Example:
 * Input: nums = [1,1,2]
 * Output: [[1,1,2],[1,2,1],[2,1,1]]
 */
function permuteUnique(nums) {
  // Your implementation here
}

/**
 * Problem 25: Combination Sum II
 * Find combinations that sum to target (each number used once).
 *
 * @param {number[]} candidates - Candidate numbers
 * @param {number} target - Target sum
 * @return {number[][]} All unique combinations
 *
 * Expected Time: O(2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
 */
function combinationSum2(candidates, target) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Sudoku Solver
 * Solve Sudoku puzzle.
 *
 * @param {character[][]} board - Sudoku board
 * @return {void} Modify board in-place
 *
 * Expected Time: O(9^(n*n))
 * Expected Space: O(n*n)
 *
 * Example:
 * Input: Partially filled Sudoku board
 * Output: Solved Sudoku board
 */
function solveSudoku(board) {
  // Your implementation here
}

/**
 * Problem 27: Word Search II
 * Find all words in grid using Trie.
 *
 * @param {character[][]} board - Game board
 * @param {string[]} words - Word list
 * @return {string[]} All found words
 *
 * Expected Time: O(m * n * 4^L)
 * Expected Space: O(k * L) where k is number of words
 *
 * Example:
 * Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * Output: ["oath","eat"]
 */
function findWords(board, words) {
  // Your implementation here
}

/**
 * Problem 28: Regular Expression Matching
 * Implement regular expression matching with '.' and '*'.
 *
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string
 *
 * Expected Time: O(m * n)
 * Expected Space: O(m * n)
 *
 * Example:
 * Input: s = "aa", p = "a*"
 * Output: true
 */
function isMatch(s, p) {
  // Your implementation here
}

/**
 * Problem 29: Remove Invalid Parentheses
 * Remove minimum parentheses to make valid.
 *
 * @param {string} s - Input string
 * @return {string[]} All valid strings
 *
 * Expected Time: O(n * C(n, n/2))
 * Expected Space: O(n * C(n, n/2))
 *
 * Example:
 * Input: s = "()())()"
 * Output: ["()()()", "(())()"]
 */
function removeInvalidParentheses(s) {
  // Your implementation here
}

/**
 * Problem 30: Word Ladder II
 * Find all shortest transformation sequences.
 *
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - Word dictionary
 * @return {string[][]} All shortest sequences
 *
 * Expected Time: O(N * M^2)
 * Expected Space: O(N * M^2)
 *
 * Example:
 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
 */
function findLadders(beginWord, endWord, wordList) {
  // Your implementation here
}

/**
 * Problem 31: Split Array Largest Sum
 * Split array into m subarrays with minimized largest sum.
 *
 * @param {number[]} nums - Input array
 * @param {number} m - Number of subarrays
 * @return {number} Minimum possible largest sum
 *
 * Expected Time: O(n * log S) where S is sum of nums
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [7,2,5,10,8], m = 2
 * Output: 18
 */
function splitArray(nums, m) {
  // Your implementation here
}

/**
 * Problem 32: Matchsticks to Square
 * Determine if matchsticks can form a square.
 *
 * @param {number[]} matchsticks - Matchstick lengths
 * @return {boolean} True if can form square
 *
 * Expected Time: O(4^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: matchsticks = [1,1,2,2,2]
 * Output: true
 */
function makesquare(matchsticks) {
  // Your implementation here
}

/**
 * Problem 33: Tiling a Rectangle with Fewest Squares
 * Tile rectangle with minimum number of squares.
 *
 * @param {number} n - Rectangle height
 * @param {number} m - Rectangle width
 * @return {number} Minimum number of squares
 *
 * Expected Time: O(n * m * 2^(n*m))
 * Expected Space: O(n * m)
 *
 * Example:
 * Input: n = 2, m = 3
 * Output: 3
 */
function tilingRectangle(n, m) {
  // Your implementation here
}

/**
 * Problem 34: Concatenated Words
 * Find all concatenated words in dictionary.
 *
 * @param {string[]} words - Word list
 * @return {string[]} All concatenated words
 *
 * Expected Time: O(n * L^2) where L is average word length
 * Expected Space: O(n * L)
 *
 * Example:
 * Input: words = ["cat","cats","catsdogcats","dog","dogcat","hippo","rat","ratcatdogcat"]
 * Output: ["catsdogcats","dogcat","ratcatdogcat"]
 */
function findAllConcatenatedWordsInADict(words) {
  // Your implementation here
}

/**
 * Problem 35: Stickers to Spell Word
 * Find minimum stickers to spell word.
 *
 * @param {string[]} stickers - Available stickers
 * @param {string} target - Target word
 * @return {number} Minimum number of stickers
 *
 * Expected Time: O(n * 2^m)
 * Expected Space: O(2^m)
 *
 * Example:
 * Input: stickers = ["with","example","science"], target = "thehat"
 * Output: 3
 */
function minStickers(stickers, target) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Tower of Hanoi
 * Classic recursion problem.
 */
function towerOfHanoi(n, source, destination, auxiliary) {
  // Your implementation here
}

/**
 * Bonus 2: Implement Josephus Problem
 * Find survivor in elimination game.
 */
function josephus(n, k) {
  // Your implementation here
}

/**
 * Bonus 3: Implement Ackermann Function
 * Extremely fast-growing recursive function.
 */
function ackermann(m, n) {
  // Your implementation here
}

/**
 * Bonus 4: Generate Gray Code
 * Binary sequence where adjacent numbers differ by one bit.
 */
function grayCode(n) {
  // Your implementation here
}

/**
 * Bonus 5: Implement Memoization Decorator
 * Optimize recursive functions with caching.
 */
function memoize(func) {
  // Your implementation here
}

/**
 * Bonus 6: Convert Recursive to Iterative
 * Transform recursion to iteration using stack.
 */
function recursiveToIterative(recursiveFunc) {
  // Your implementation here
}

/**
 * Bonus 7: Implement Tail Call Optimization
 * Optimize tail recursive functions.
 */
function optimizeTailCall(func) {
  // Your implementation here
}

/**
 * Bonus 8: Generate All Possible Full Binary Trees
 * Generate all structurally unique BSTs.
 */
function allPossibleFBT(n) {
  // Your implementation here
}

/**
 * Bonus 9: Implement Strobogrammatic Numbers
 * Numbers that look the same when rotated 180 degrees.
 */
function strobogrammatic(n) {
  // Your implementation here
}

/**
 * Bonus 10: Implement Expression Parser
 * Parse and evaluate mathematical expressions.
 */
function evaluateExpression(expression) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Recursion & Backtracking Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test factorial
  console.log("Example - Factorial:");
  console.log("Input: n = 5");
  console.log("Expected: 120");
  console.log("Your result:", factorial(5));

  // Test fibonacci
  console.log("\nExample - Fibonacci:");
  console.log("Input: n = 10");
  console.log("Expected: 55");
  console.log("Your result:", fibonacci(10));

  // Test power of two
  console.log("\nExample - Power of Two:");
  console.log("Input: n = 16");
  console.log("Expected: true");
  console.log("Your result:", isPowerOfTwo(16));

  // Test sum of digits
  console.log("\nExample - Sum of Digits:");
  console.log("Input: n = 1234");
  console.log("Expected: 10");
  console.log("Your result:", sumOfDigits(1234));

  // Test reverse string
  console.log("\nExample - Reverse String:");
  console.log('Input: s = "hello"');
  console.log('Expected: "olleh"');
  console.log("Your result:", reverseString("hello"));

  // Test palindrome
  console.log("\nExample - Is Palindrome:");
  console.log('Input: s = "racecar"');
  console.log("Expected: true");
  console.log("Your result:", isPalindrome("racecar"));

  // Test GCD
  console.log("\nExample - GCD:");
  console.log("Input: a = 48, b = 18");
  console.log("Expected: 6");
  console.log("Your result:", gcd(48, 18));

  // Test power
  console.log("\nExample - Power:");
  console.log("Input: a = 2, b = 8");
  console.log("Expected: 256");
  console.log("Your result:", power(2, 8));

  // Test sum array
  console.log("\nExample - Sum Array:");
  console.log("Input: arr = [1,2,3,4,5]");
  console.log("Expected: 15");
  console.log("Your result:", sumArray([1, 2, 3, 4, 5]));

  // Test find max
  console.log("\nExample - Find Max:");
  console.log("Input: arr = [1,5,3,9,2]");
  console.log("Expected: 9");
  console.log("Your result:", findMax([1, 5, 3, 9, 2]));

  // Test binary search
  console.log("\nExample - Binary Search:");
  console.log("Input: nums = [-1,0,3,5,9,12], target = 9");
  console.log("Expected: 4");
  console.log("Your result:", binarySearch([-1, 0, 3, 5, 9, 12], 9));

  // Test generate parentheses
  console.log("\nExample - Generate Parentheses:");
  console.log("Input: n = 3");
  console.log('Expected: ["((()))","(()())","(())()","()(())","()()()"]');
  console.log("Your result:", generateParentheses(3));

  // Test subsets
  console.log("\nExample - Subsets:");
  console.log("Input: nums = [1,2,3]");
  console.log("Expected: 8 subsets");
  const subsetResult = subsets([1, 2, 3]);
  console.log("Your result:", subsetResult.length, "subsets");

  // Test permutations
  console.log("\nExample - Permutations:");
  console.log("Input: nums = [1,2,3]");
  console.log("Expected: 6 permutations");
  const permResult = permutations([1, 2, 3]);
  console.log("Your result:", permResult.length, "permutations");

  // Test letter case permutation
  console.log("\nExample - Letter Case Permutation:");
  console.log('Input: s = "a1b2"');
  console.log('Expected: ["a1b2","a1B2","A1b2","A1B2"]');
  console.log("Your result:", letterCasePermutation("a1b2"));

  // Test word search
  console.log("\nExample - Word Search:");
  const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  console.log('Input: board, word = "ABCCED"');
  console.log("Expected: true");
  console.log("Your result:", exist(board, "ABCCED"));

  // Test combination sum
  console.log("\nExample - Combination Sum:");
  console.log("Input: candidates = [2,3,6,7], target = 7");
  console.log("Expected: [[2,2,3],[7]]");
  console.log("Your result:", combinationSum([2, 3, 6, 7], 7));

  // Test letter combinations
  console.log("\nExample - Letter Combinations:");
  console.log('Input: digits = "23"');
  console.log('Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]');
  console.log("Your result:", letterCombinations("23"));

  // Test palindrome partitioning
  console.log("\nExample - Palindrome Partitioning:");
  console.log('Input: s = "aab"');
  console.log('Expected: [["a","a","b"],["aa","b"]]');
  console.log("Your result:", partition("aab"));

  // Test restore IP addresses
  console.log("\nExample - Restore IP Addresses:");
  console.log('Input: s = "25525511135"');
  console.log('Expected: ["255.255.11.135","255.255.111.35"]');
  console.log("Your result:", restoreIpAddresses("25525511135"));

  // Test combinations
  console.log("\nExample - Combinations:");
  console.log("Input: n = 4, k = 2");
  console.log("Expected: 6 combinations");
  const comboResult = combine(4, 2);
  console.log("Your result:", comboResult.length, "combinations");

  // Test subsets with duplicates
  console.log("\nExample - Subsets II:");
  console.log("Input: nums = [1,2,2]");
  console.log("Expected: 6 unique subsets");
  const dupSubsetResult = subsetsWithDup([1, 2, 2]);
  console.log("Your result:", dupSubsetResult.length, "subsets");

  // Test unique permutations
  console.log("\nExample - Permutations II:");
  console.log("Input: nums = [1,1,2]");
  console.log("Expected: 3 unique permutations");
  const uniquePermResult = permuteUnique([1, 1, 2]);
  console.log("Your result:", uniquePermResult.length, "permutations");

  // Test combination sum II
  console.log("\nExample - Combination Sum II:");
  console.log("Input: candidates = [10,1,2,7,6,1,5], target = 8");
  console.log("Expected: [[1,1,6],[1,2,5],[1,7],[2,6]]");
  console.log("Your result:", combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding recursive patterns and backtracking");
  console.log("🚀 Move to medium problems when comfortable with easy ones");

  console.log("\n✅ Testing framework ready!");
}

// Helper function to test your solutions
function testFunction(funcName, testCases) {
  console.log(`\n🧮 Testing ${funcName}:`);

  for (let i = 0; i < testCases.length; i++) {
    const { input, expected } = testCases[i];
    const result = eval(
      `${funcName}(${input.map((arg) => JSON.stringify(arg)).join(", ")})`
    );

    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test ${i + 1}: ${passed ? "✅" : "❌"}`);
    if (!passed) {
      console.log(`  Input: ${JSON.stringify(input)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got: ${JSON.stringify(result)}`);
    }
  }
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  factorial,
  fibonacci,
  isPowerOfTwo,
  sumOfDigits,
  reverseString,
  isPalindrome,
  gcd,
  power,
  sumArray,
  findMax,

  // Medium problems
  binarySearch,
  generateParentheses,
  subsets,
  permutations,
  letterCasePermutation,
  solveNQueens,
  exist,
  combinationSum,
  letterCombinations,
  partition,
  restoreIpAddresses,
  combine,
  subsetsWithDup,
  permuteUnique,
  combinationSum2,

  // Hard problems
  solveSudoku,
  findWords,
  isMatch,
  removeInvalidParentheses,
  findLadders,
  splitArray,
  makesquare,
  tilingRectangle,
  findAllConcatenatedWordsInADict,
  minStickers,

  // Bonus challenges
  towerOfHanoi,
  josephus,
  ackermann,
  grayCode,
  memoize,
  recursiveToIterative,
  optimizeTailCall,
  allPossibleFBT,
  strobogrammatic,
  evaluateExpression,

  testFunction,
};
