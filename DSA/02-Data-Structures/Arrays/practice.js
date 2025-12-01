// 📊 Arrays & Strings Practice Problems
// Implement these functions to master array operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Two Sum
 * Given an array of integers and a target, return indices of two numbers that add up to target.
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} Indices of the two numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * twoSum([2, 7, 11, 15], 9) -> [0, 1]
 */
function twoSum(nums, target) {
  // Your implementation here
}

/**
 * Problem 2: Contains Duplicate
 * Check if the array contains any duplicates.
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} True if duplicates exist
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * containsDuplicate([1, 2, 3, 1]) -> true
 */
function containsDuplicate(nums) {
  // Your implementation here
}

/**
 * Problem 3: Maximum Subarray
 * Find the contiguous subarray with the largest sum.
 *
 * @param {number[]} nums - Array of integers
 * @return {number} Maximum subarray sum
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) -> 6
 */
function maxSubArray(nums) {
  // Your implementation here
}

/**
 * Problem 4: Valid Anagram
 * Check if two strings are anagrams of each other.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} True if anagrams
 *
 * Expected Time: O(n)
 * Expected Space: O(1) if using fixed alphabet
 *
 * Example:
 * isAnagram("anagram", "nagaram") -> true
 */
function isAnagram(s, t) {
  // Your implementation here
}

/**
 * Problem 5: Reverse String
 * Reverse a string in place.
 *
 * @param {character[]} s - Array of characters
 * @return {void} Modify in place
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * reverseString(['h','e','l','l','o']) -> ['o','l','l','e','h']
 */
function reverseString(s) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 6: 3Sum
 * Find all unique triplets that sum to zero.
 *
 * @param {number[]} nums - Array of integers
 * @return {number[][]} Array of triplets
 *
 * Expected Time: O(n²)
 * Expected Space: O(n) for result
 *
 * Example:
 * threeSum([-1,0,1,2,-1,-4]) -> [[-1,-1,2],[-1,0,1]]
 */
function threeSum(nums) {
  // Your implementation here
}

/**
 * Problem 7: Container With Most Water
 * Find max area formed by two vertical lines.
 *
 * @param {number[]} height - Array of heights
 * @return {number} Maximum area
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * maxArea([1,8,6,2,5,4,8,3,7]) -> 49
 */
function maxArea(height) {
  // Your implementation here
}

/**
 * Problem 8: Longest Substring Without Repeating Characters
 * Find length of longest substring without repeating characters.
 *
 * @param {string} s - Input string
 * @return {number} Length of longest unique substring
 *
 * Expected Time: O(n)
 * Expected Space: O(min(n, alphabet size))
 *
 * Example:
 * lengthOfLongestSubstring("abcabcbb") -> 3
 */
function lengthOfLongestSubstring(s) {
  // Your implementation here
}

/**
 * Problem 9: Group Anagrams
 * Group anagrams together from array of strings.
 *
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Grouped anagrams
 *
 * Expected Time: O(n * k log k) where k = avg string length
 * Expected Space: O(n * k)
 *
 * Example:
 * groupAnagrams(["eat","tea","tan","ate","nat","bat"]) -> [["eat","tea","ate"],["tan","nat"],["bat"]]
 */
function groupAnagrams(strs) {
  // Your implementation here
}

/**
 * Problem 10: Product of Array Except Self
 * Return array where each element is product of all other elements.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Result array
 *
 * Expected Time: O(n)
 * Expected Space: O(1) excluding result
 *
 * Example:
 * productExceptSelf([1,2,3,4]) -> [24,12,8,6]
 */
function productExceptSelf(nums) {
  // Your implementation here
}

/**
 * Problem 11: Find All Numbers Disappeared in an Array
 * Find numbers in [1,n] that are not present in the array.
 *
 * @param {number[]} nums - Array of numbers
 * @return {number[]} Missing numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(1) excluding result
 *
 * Example:
 * findDisappearedNumbers([4,3,2,7,8,2,3,1]) -> [5,6]
 */
function findDisappearedNumbers(nums) {
  // Your implementation here
}

/**
 * Problem 12: Spiral Matrix
 * Return spiral order traversal of matrix.
 *
 * @param {number[][]} matrix - 2D array
 * @return {number[]} Spiral order elements
 *
 * Expected Time: O(m * n)
 * Expected Space: O(1) excluding result
 *
 * Example:
 * spiralMatrix([[1,2,3],[4,5,6],[7,8,9]]) -> [1,2,3,6,9,8,7,4,5]
 */
function spiralMatrix(matrix) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 13: First Missing Positive
 * Find smallest missing positive integer.
 *
 * @param {number[]} nums - Array of integers
 * @return {number} Smallest missing positive
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * firstMissingPositive([3,4,-1,1]) -> 2
 */
function firstMissingPositive(nums) {
  // Your implementation here
}

/**
 * Problem 14: Trapping Rain Water
 * Calculate how much water can be trapped.
 *
 * @param {number[]} height - Array of heights
 * @return {number} Amount of trapped water
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * trap([0,1,0,2,1,0,1,3,2,1,2,1]) -> 6
 */
function trap(height) {
  // Your implementation here
}

/**
 * Problem 15: Median of Two Sorted Arrays
 * Find median of two sorted arrays.
 *
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} Median value
 *
 * Expected Time: O(log(min(m,n)))
 * Expected Space: O(1)
 *
 * Example:
 * findMedianSortedArrays([1,3], [2]) -> 2
 */
function findMedianSortedArrays(nums1, nums2) {
  // Your implementation here
}

/**
 * Problem 16: Longest Consecutive Sequence
 * Find longest sequence of consecutive numbers.
 *
 * @param {number[]} nums - Array of integers
 * @return {number} Length of longest sequence
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * longestConsecutive([100,4,200,1,3,2]) -> 4
 */
function longestConsecutive(nums) {
  // Your implementation here
}

/**
 * Problem 17: Minimum Window Substring
 * Find minimum window substring containing all characters.
 *
 * @param {string} s - Source string
 * @param {string} t - Target string
 * @return {string} Minimum window substring
 *
 * Expected Time: O(m + n) where m = len(s), n = len(t)
 * Expected Space: O(1) for fixed alphabet
 *
 * Example:
 * minWindow("ADOBECODEBANC", "ABC") -> "BANC"
 */
function minWindow(s, t) {
  // Your implementation here
}

/**
 * Problem 18: Merge Intervals
 * Merge overlapping intervals.
 *
 * @param {number[][]} intervals - Array of intervals
 * @return {number[][]} Merged intervals
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * merge([[1,3],[2,6],[8,10],[15,18]]) -> [[1,6],[8,10],[15,18]]
 */
function merge(intervals) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement your own Array class
 * Create a custom array implementation with push, pop, get, set methods
 */
class CustomArray {
  constructor() {
    // Your implementation here
  }

  push(value) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  get(index) {
    // Your implementation here
  }

  set(index, value) {
    // Your implementation here
  }

  toArray() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Sudoku Solver
 * Solve a Sudoku puzzle using backtracking
 *
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {void} Modify board in place
 */
function solveSudoku(board) {
  // Your implementation here
}

/**
 * Bonus 3: Jump Game II
 * Minimum number of jumps to reach last index.
 *
 * @param {number[]} nums - Array where nums[i] is max jump length
 * @return {number} Minimum number of jumps
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 */
function jump(nums) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Array Practice Tests...\n");

  // Test data
  const testCases = {
    twoSum: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
    containsDuplicate: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
    maxSubArray: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
  };

  // Test your implementations here
  console.log("📝 Test your implementations:");
  console.log("Example - Two Sum:");
  console.log("Input: [2, 7, 11, 15], target: 9");
  console.log("Expected: [0, 1]");
  console.log("Your result:", twoSum([2, 7, 11, 15], 9));

  console.log("\nExample - Max Subarray:");
  console.log("Input: [-2,1,-3,4,-1,2,1,-5,4]");
  console.log("Expected: 6");
  console.log("Your result:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Start with easy problems, then move to medium and hard");

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
  twoSum,
  containsDuplicate,
  maxSubArray,
  isAnagram,
  reverseString,
  threeSum,
  maxArea,
  lengthOfLongestSubstring,
  groupAnagrams,
  productExceptSelf,
  findDisappearedNumbers,
  spiralMatrix,
  firstMissingPositive,
  trap,
  findMedianSortedArrays,
  longestConsecutive,
  minWindow,
  merge,
  CustomArray,
  solveSudoku,
  jump,
  testFunction,
};
