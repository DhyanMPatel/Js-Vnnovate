// 📊 Big O Complexity Practice Problems
// Implement these functions and analyze their time/space complexity

// ==========================================
// BEGINNER PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Find Maximum
 * Find the maximum element in an array
 *
 * @param {number[]} arr - Array of numbers
 * @return {number} Maximum number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function findMaximum(arr) {
  // Your implementation here
}

/**
 * Problem 2: Check Palindrome
 * Check if a string is a palindrome
 *
 * @param {string} str - Input string
 * @return {boolean} True if palindrome
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function isPalindrome(str) {
  // Your implementation here
}

/**
 * Problem 3: Count Occurrences
 * Count occurrences of a target in an array
 *
 * @param {number[]} arr - Array of numbers
 * @param {number} target - Target number
 * @return {number} Count of target
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function countOccurrences(arr, target) {
  // Your implementation here
}

// ==========================================
// INTERMEDIATE PROBLEMS
// ==========================================

/**
 * Problem 4: Two Sum
 * Find two numbers that add up to target
 *
 * @param {number[]} arr - Array of numbers
 * @param {number} target - Target sum
 * @return {number[]} Indices of two numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 */
function twoSum(arr, target) {
  // Your implementation here
}

/**
 * Problem 5: Valid Anagram
 * Check if two strings are anagrams
 *
 * @param {string} s1 - First string
 * @param {string} s2 - Second string
 * @return {boolean} True if anagrams
 *
 * Expected Time: O(n log n) or O(n)
 * Expected Space: O(n)
 */
function isAnagram(s1, s2) {
  // Your implementation here
}

/**
 * Problem 6: Merge Sorted Arrays
 * Merge two sorted arrays into one sorted array
 *
 * @param {number[]} arr1 - First sorted array
 * @param {number[]} arr2 - Second sorted array
 * @return {number[]} Merged sorted array
 *
 * Expected Time: O(n + m)
 * Expected Space: O(n + m)
 */
function mergeSortedArrays(arr1, arr2) {
  // Your implementation here
}

// ==========================================
// ADVANCED PROBLEMS
// ==========================================

/**
 * Problem 7: Container With Most Water
 * Find max area formed by two vertical lines
 *
 * @param {number[]} heights - Array of heights
 * @return {number} Maximum area
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function maxArea(heights) {
  // Your implementation here
}

/**
 * Problem 8: Longest Consecutive Sequence
 * Find longest sequence of consecutive numbers
 *
 * @param {number[]} nums - Array of numbers
 * @return {number} Length of longest sequence
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 */
function longestConsecutive(nums) {
  // Your implementation here
}

/**
 * Problem 9: Trapping Rain Water
 * Calculate how much water can be trapped
 *
 * @param {number[]} heights - Array of heights
 * @return {number} Amount of trapped water
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function trapRainWater(heights) {
  // Your implementation here
}

// ==========================================
// COMPLEXITY ANALYSIS PRACTICE
// ==========================================

/**
 * Analyze the time and space complexity of these functions
 * Write your answers in comments
 */

function mystery1(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
  // Time Complexity: ___
  // Space Complexity: ___
}

function mystery2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
  // Time Complexity: ___
  // Space Complexity: ___
}

function mystery3(n) {
  if (n <= 1) return n;
  return mystery3(n - 1) + mystery3(n - 2);
  // Time Complexity: ___
  // Space Complexity: ___
}

function mystery4(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      result.push(arr[i] * 2);
    }
  }
  return result;
  // Time Complexity: ___
  // Space Complexity: ___
}

// ==========================================
// OPTIMIZATION CHALLENGES
// ==========================================

/**
 * Optimize these functions for better time/space complexity
 */

// Current: O(n²) time, O(1) space
// Optimize to: O(n) time, O(n) space
function findDuplicatesSlow(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

function findDuplicatesOptimized(arr) {
  // Your optimized implementation here
}

// Current: O(n) time, O(n) space
// Optimize to: O(n) time, O(1) space
function reverseWithExtraSpace(arr) {
  return arr.slice().reverse();
}

function reverseInPlace(arr) {
  // Your optimized implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Big O Practice Tests...\n");

  // Test data
  const testArray = [1, 5, 3, 9, 2, 8, 7, 6, 4];
  const testString = "racecar";

  // Test your implementations here
  console.log("Test Array:", testArray);
  console.log("Test String:", testString);

  // Example:
  // console.log('Max:', findMaximum(testArray));
  // console.log('Is Palindrome:', isPalindrome(testString));

  console.log("\n✅ Tests completed!");
}

// Run tests
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

module.exports = {
  findMaximum,
  isPalindrome,
  countOccurrences,
  twoSum,
  isAnagram,
  mergeSortedArrays,
  maxArea,
  longestConsecutive,
  trapRainWater,
  findDuplicatesOptimized,
  reverseInPlace,
};
