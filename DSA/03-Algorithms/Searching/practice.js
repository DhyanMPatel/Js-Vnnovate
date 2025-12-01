// 🔍 Searching Algorithms Practice Problems
// Implement these functions to master search techniques

// ==========================================
// EASY PROBLEMS (O(n) or O(log n))
// ==========================================

/**
 * Problem 1: Linear Search
 * Basic linear search implementation.
 *
 * @param {number[]} nums - Input array
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [4,5,1,9], target = 9
 * Output: 3
 */
function linearSearch(nums, target) {
  // Your implementation here
}

/**
 * Problem 2: Binary Search
 * Classic binary search on sorted array.
 *
 * @param {number[]} nums - Sorted input array
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 */
function binarySearch(nums, target) {
  // Your implementation here
}

/**
 * Problem 3: Search Insert Position
 * Find position to insert target in sorted array.
 *
 * @param {number[]} nums - Sorted input array
 * @param {number} target - Target value
 * @return {number} Insert position
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,3,5,6], target = 5
 * Output: 2
 */
function searchInsert(nums, target) {
  // Your implementation here
}

/**
 * Problem 4: First Bad Version
 * Find first bad version using binary search.
 *
 * @param {number} n - Number of versions
 * @return {number} First bad version
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 5, bad = 4
 * Output: 4
 */
function firstBadVersion(n) {
  // Your implementation here
  // Helper function isBadVersion(version) is provided
}

/**
 * Problem 5: Search in a Sorted Array
 * Search in sorted array of unknown size.
 *
 * @param {ArrayReader} reader - Array reader interface
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: secret = [-1,0,3,5,9,12], target = 9
 * Output: 4
 */
function searchInSortedArray(reader, target) {
  // Your implementation here
}

/**
 * Problem 6: Find First and Last Position
 * Find first and last occurrence of target.
 *
 * @param {number[]} nums - Sorted array with duplicates
 * @param {number} target - Target value
 * @return {number[]} [first, last] positions
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [5,7,7,8,8,10], target = 8
 * Output: [3,4]
 */
function searchRange(nums, target) {
  // Your implementation here
}

/**
 * Problem 7: Find Peak Element
 * Find peak element in unsorted array.
 *
 * @param {number[]} nums - Input array
 * @return {number} Index of peak element
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,2,3,1]
 * Output: 2
 */
function findPeakElement(nums) {
  // Your implementation here
}

/**
 * Problem 8: Count Negative Numbers
 * Count negative numbers in sorted matrix.
 *
 * @param {number[][]} grid - Sorted matrix
 * @return {number} Count of negative numbers
 *
 * Expected Time: O(m + n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
 * Output: 8
 */
function countNegatives(grid) {
  // Your implementation here
}

/**
 * Problem 9: Fixed Point
 * Find index where nums[i] == i.
 *
 * @param {number[]} arr - Sorted array
 * @return {number} Fixed point index, -1 if none
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: arr = [-10,-5,0,3,7]
 * Output: 3
 */
function fixedPoint(arr) {
  // Your implementation here
}

/**
 * Problem 10: Find Smallest Letter
 * Find smallest letter greater than target.
 *
 * @param {character[]} letters - Sorted circular array
 * @param {character} target - Target letter
 * @return {character} Smallest letter > target
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: letters = ["c","f","j"], target = "a"
 * Output: "c"
 */
function nextGreatestLetter(letters, target) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Search in Rotated Sorted Array
 * Search in array rotated at unknown pivot.
 *
 * @param {number[]} nums - Rotated sorted array
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 */
function searchRotated(nums, target) {
  // Your implementation here
}

/**
 * Problem 12: Search in Rotated Array with Duplicates
 * Search in rotated array with possible duplicates.
 *
 * @param {number[]} nums - Rotated array with duplicates
 * @param {number} target - Target value
 * @return {boolean} True if target exists
 *
 * Expected Time: O(log n) average, O(n) worst
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,5,6,0,0,1,2], target = 0
 * Output: true
 */
function searchRotatedWithDuplicates(nums, target) {
  // Your implementation here
}

/**
 * Problem 13: Find Minimum in Rotated Sorted Array
 * Find minimum element in rotated sorted array.
 *
 * @param {number[]} nums - Rotated sorted array
 * @return {number} Minimum element
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,4,5,1,2]
 * Output: 1
 */
function findMin(nums) {
  // Your implementation here
}

/**
 * Problem 14: Find Minimum in Rotated Array with Duplicates
 * Find minimum in rotated array with duplicates.
 *
 * @param {number[]} nums - Rotated array with duplicates
 * @return {number} Minimum element
 *
 * Expected Time: O(log n) average, O(n) worst
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,2,2,0,1]
 * Output: 0
 */
function findMinWithDuplicates(nums) {
  // Your implementation here
}

/**
 * Problem 15: Search a 2D Matrix
 * Search in row-wise and column-wise sorted matrix.
 *
 * @param {number[][]} matrix - 2D matrix
 * @param {number} target - Target value
 * @return {boolean} True if target exists
 *
 * Expected Time: O(m + n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
 * Output: true
 */
function searchMatrix(matrix, target) {
  // Your implementation here
}

/**
 * Problem 16: Search a 2D Matrix II
 * Search in flattened sorted matrix.
 *
 * @param {number[][]} matrix - 2D matrix
 * @param {number} target - Target value
 * @return {boolean} True if target exists
 *
 * Expected Time: O(log(m*n))
 * Expected Space: O(1)
 *
 * Example:
 * Input: matrix = [[1,3,5,7,9],[2,4,6,8,10],[11,13,15,17,19],[12,14,16,18,20],[21,22,23,24,25]], target = 13
 * Output: true
 */
function searchMatrix2(matrix, target) {
  // Your implementation here
}

/**
 * Problem 17: Find K Closest Elements
 * Find k closest elements to target.
 *
 * @param {number[]} arr - Sorted array
 * @param {number} k - Number of elements
 * @param {number} x - Target value
 * @return {number[]} K closest elements
 *
 * Expected Time: O(log n + k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: arr = [1,2,3,4,5], k = 4, x = 3
 * Output: [1,2,3,4]
 */
function findClosestElements(arr, k, x) {
  // Your implementation here
}

/**
 * Problem 18: Find Right Interval
 * Find right interval for each interval.
 *
 * @param {number[][]} intervals - Array of intervals
 * @return {number[]} Right interval indices
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: intervals = [[1,2]]
 * Output: [-1]
 */
function findRightInterval(intervals) {
  // Your implementation here
}

/**
 * Problem 19: Find K-th Smallest Pair Distance
 * Find k-th smallest distance among pairs.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - K-th position
 * @return {number} K-th smallest distance
 *
 * Expected Time: O(n log n + n log W) where W is max distance
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,3,1], k = 1
 * Output: 0
 */
function smallestDistancePair(nums, k) {
  // Your implementation here
}

/**
 * Problem 20: Find K-th Smallest Element in Sorted Matrix
 * Find k-th smallest element in sorted matrix.
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - K-th position
 * @return {number} K-th smallest element
 *
 * Expected Time: O(k log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 */
function kthSmallest(matrix, k) {
  // Your implementation here
}

/**
 * Problem 21: Find K-th Largest Element in Array
 * Find k-th largest element using search.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - K-th position
 * @return {number} K-th largest element
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 */
function findKthLargest(nums, k) {
  // Your implementation here
}

/**
 * Problem 22: Find Median of Two Sorted Arrays
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
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.0
 */
function findMedianSortedArrays(nums1, nums2) {
  // Your implementation here
}

/**
 * Problem 23: Find K-th Smallest Prime Fraction
 * Find k-th smallest fraction a/b.
 *
 * @param {number[]} arr - Sorted array of primes
 * @param {number} k - K-th position
 * @return {number[]} Fraction [a, b]
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr = [1,2,3,5], k = 3
 * Output: [2,5]
 */
function kthSmallestPrimeFraction(arr, k) {
  // Your implementation here
}

/**
 * Problem 24: Find Minimum Number of Operations to Make Array Sorted
 * Find minimum operations to sort array.
 *
 * @param {number[]} nums - Input array
 * @return {number} Minimum operations
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [5,1,3,2]
 * Output: 2
 */
function minimumOperations(nums) {
  // Your implementation here
}

/**
 * Problem 25: Find Maximum Number of K-Sum Pairs
 * Find maximum number of k-sum pairs.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Target sum
 * @return {number} Maximum number of pairs
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4], k = 5
 * Output: 2
 */
function maxOperations(nums, k) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Find Minimum in Rotated Sorted Array with Duplicates (Optimized)
 * Optimized version with better handling of duplicates.
 *
 * @param {number[]} nums - Rotated array with duplicates
 * @return {number} Minimum element
 *
 * Expected Time: O(log n) average
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,1,1,0,1]
 * Output: 0
 */
function findMinOptimized(nums) {
  // Your implementation here
}

/**
 * Problem 27: Search in Nearly Sorted Array
 * Search in array where adjacent elements might be swapped.
 *
 * @param {number[]} arr - Nearly sorted array
 * @param {number} target - Target value
 * @return {number} Index of target, -1 if not found
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: arr = [10, 3, 40, 20, 50, 80, 70], target = 40
 * Output: 2
 */
function searchNearlySorted(arr, target) {
  // Your implementation here
}

/**
 * Problem 28: Find Floor and Ceiling in Sorted Array
 * Find floor and ceiling of target in sorted array.
 *
 * @param {number[]} nums - Sorted array
 * @param {number} target - Target value
 * @return {number[]} [floor, ceiling] values
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,2,8,10,10,12,19], target = 5
 * Output: [2,8]
 */
function findFloorCeiling(nums, target) {
  // Your implementation here
}

/**
 * Problem 29: Find K-th Missing Positive Number
 * Find k-th missing positive number in sorted array.
 *
 * @param {number[]} arr - Sorted array of positive numbers
 * @param {number} k - K-th missing position
 * @return {number} K-th missing positive number
 *
 * Expected Time: O(log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: arr = [2,3,4,7,11], k = 5
 * Output: 9
 */
function findKthMissing(arr, k) {
  // Your implementation here
}

/**
 * Problem 30: Find K-th Smallest Element in Multiplication Table
 * Find k-th smallest element in multiplication table.
 *
 * @param {number} m - Rows
 * @param {number} n - Columns
 * @param {number} k - K-th position
 * @return {number} K-th smallest element
 *
 * Expected Time: O(m log(mn))
 * Expected Space: O(1)
 *
 * Example:
 * Input: m = 3, n = 3, k = 5
 * Output: 3
 */
function findKthNumber(m, n, k) {
  // Your implementation here
}

/**
 * Problem 31: Find Split Array Largest Sum
 * Split array into m subarrays with minimized largest sum.
 *
 * @param {number[]} nums - Input array
 * @param {number} m - Number of subarrays
 * @return {number} Minimum possible largest sum
 *
 * Expected Time: O(n log S) where S is sum of nums
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
 * Problem 32: Find K-th Smallest Element in N x N Matrix
 * Find k-th smallest element in sorted matrix.
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - K-th position
 * @return {number} K-th smallest element
 *
 * Expected Time: O(k log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 */
function kthSmallestOptimized(matrix, k) {
  // Your implementation here
}

/**
 * Problem 33: Find Minimum Number of Days to Make M Bouquets
 * Find minimum days to make m bouquets with k flowers each.
 *
 * @param {number[]} bloomDay - Days when flowers bloom
 * @param {number} m - Number of bouquets
 * @param {number} k - Flowers per bouquet
 * @return {number} Minimum days, -1 if impossible
 *
 * Expected Time: O(n log max(bloomDay))
 * Expected Space: O(1)
 *
 * Example:
 * Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
 * Output: 3
 */
function minDays(bloomDay, m, k) {
  // Your implementation here
}

/**
 * Problem 34: Find Maximum Number of People That Can Be Fed
 * Find maximum people that can be fed with given food quantities.
 *
 * @param {number[]} foodQuantities - Available food quantities
 * @param {number[]} queries - People queries
 * @return {number[]} Answers for each query
 *
 * Expected Time: O((n + q) log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: foodQuantities = [5,3,1,2], queries = [3,4,2]
 * Output: [2,1,3]
 */
function maxPeopleFed(foodQuantities, queries) {
  // Your implementation here
}

/**
 * Problem 35: Find Minimum Number of Operations to Make Array Strictly Increasing
 * Find minimum operations to make array strictly increasing.
 *
 * @param {number[]} nums - Input array
 * @return {number} Minimum operations, -1 if impossible
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,5,2,3,4]
 * Output: 1
 */
function minOperationsToMakeIncreasing(nums) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Exponential Search
 * Search in infinite or unbounded sorted array.
 */
function exponentialSearch(arr, target) {
  // Your implementation here
}

/**
 * Bonus 2: Implement Interpolation Search
 * Search in uniformly distributed sorted array.
 */
function interpolationSearch(arr, target) {
  // Your implementation here
}

/**
 * Bonus 3: Implement Jump Search
 * Block-based search for sorted arrays.
 */
function jumpSearch(arr, target) {
  // Your implementation here
}

/**
 * Bonus 4: Implement Ternary Search
 * Divide array into three parts.
 */
function ternarySearch(arr, target) {
  // Your implementation here
}

/**
 * Bonus 5: Implement Fibonacci Search
 * Use Fibonacci numbers for searching.
 */
function fibonacciSearch(arr, target) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Search Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test linear search
  console.log("Example - Linear Search:");
  console.log("Input: nums = [4,5,1,9], target = 9");
  console.log("Expected: 3");
  console.log("Your result:", linearSearch([4, 5, 1, 9], 9));

  // Test binary search
  console.log("\nExample - Binary Search:");
  console.log("Input: nums = [-1,0,3,5,9,12], target = 9");
  console.log("Expected: 4");
  console.log("Your result:", binarySearch([-1, 0, 3, 5, 9, 12], 9));

  // Test search insert
  console.log("\nExample - Search Insert:");
  console.log("Input: nums = [1,3,5,6], target = 5");
  console.log("Expected: 2");
  console.log("Your result:", searchInsert([1, 3, 5, 6], 5));

  // Test search range
  console.log("\nExample - Search Range:");
  console.log("Input: nums = [5,7,7,8,8,10], target = 8");
  console.log("Expected: [3,4]");
  console.log("Your result:", searchRange([5, 7, 7, 8, 8, 10], 8));

  // Test find peak
  console.log("\nExample - Find Peak:");
  console.log("Input: nums = [1,2,3,1]");
  console.log("Expected: 2");
  console.log("Your result:", findPeakElement([1, 2, 3, 1]));

  // Test count negatives
  console.log("\nExample - Count Negatives:");
  const grid = [
    [4, 3, 2, -1],
    [3, 2, 1, -1],
    [1, 1, -1, -2],
    [-1, -1, -2, -3],
  ];
  console.log("Input: 4x4 grid with mixed numbers");
  console.log("Expected: 8");
  console.log("Your result:", countNegatives(grid));

  // Test fixed point
  console.log("\nExample - Fixed Point:");
  console.log("Input: arr = [-10,-5,0,3,7]");
  console.log("Expected: 3");
  console.log("Your result:", fixedPoint([-10, -5, 0, 3, 7]));

  // Test next greatest letter
  console.log("\nExample - Next Greatest Letter:");
  console.log('Input: letters = ["c","f","j"], target = "a"');
  console.log('Expected: "c"');
  console.log("Your result:", nextGreatestLetter(["c", "f", "j"], "a"));

  // Test search rotated
  console.log("\nExample - Search Rotated:");
  console.log("Input: nums = [4,5,6,7,0,1,2], target = 0");
  console.log("Expected: 4");
  console.log("Your result:", searchRotated([4, 5, 6, 7, 0, 1, 2], 0));

  // Test find min
  console.log("\nExample - Find Min:");
  console.log("Input: nums = [3,4,5,1,2]");
  console.log("Expected: 1");
  console.log("Your result:", findMin([3, 4, 5, 1, 2]));

  // Test search matrix
  console.log("\nExample - Search Matrix:");
  const matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ];
  console.log("Input: 5x5 matrix, target = 5");
  console.log("Expected: true");
  console.log("Your result:", searchMatrix(matrix, 5));

  // Test find closest elements
  console.log("\nExample - Find Closest Elements:");
  console.log("Input: arr = [1,2,3,4,5], k = 4, x = 3");
  console.log("Expected: [1,2,3,4]");
  console.log("Your result:", findClosestElements([1, 2, 3, 4, 5], 4, 3));

  // Test find kth largest
  console.log("\nExample - Find Kth Largest:");
  console.log("Input: nums = [3,2,1,5,6,4], k = 2");
  console.log("Expected: 5");
  console.log("Your result:", findKthLargest([3, 2, 1, 5, 6, 4], 2));

  // Test find median
  console.log("\nExample - Find Median:");
  console.log("Input: nums1 = [1,3], nums2 = [2]");
  console.log("Expected: 2.0");
  console.log("Your result:", findMedianSortedArrays([1, 3], [2]));

  // Test max operations
  console.log("\nExample - Max Operations:");
  console.log("Input: nums = [1,2,3,4], k = 5");
  console.log("Expected: 2");
  console.log("Your result:", maxOperations([1, 2, 3, 4], 5));

  console.log("\n🎯 Implement all functions and test them!");
  console.log(
    "💡 Focus on understanding search algorithms and their applications"
  );
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

// Mock helper functions for testing
function isBadVersion(version) {
  // Mock implementation - in real problems, this is provided
  return version >= 4;
}

function ArrayReader(arr) {
  this.get = function (index) {
    return index < arr.length ? arr[index] : Infinity;
  };
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  linearSearch,
  binarySearch,
  searchInsert,
  firstBadVersion,
  searchInSortedArray,
  searchRange,
  findPeakElement,
  countNegatives,
  fixedPoint,
  nextGreatestLetter,

  // Medium problems
  searchRotated,
  searchRotatedWithDuplicates,
  findMin,
  findMinWithDuplicates,
  searchMatrix,
  searchMatrix2,
  findClosestElements,
  findRightInterval,
  smallestDistancePair,
  kthSmallest,
  findKthLargest,
  findMedianSortedArrays,
  kthSmallestPrimeFraction,
  minimumOperations,
  maxOperations,

  // Hard problems
  findMinOptimized,
  searchNearlySorted,
  findFloorCeiling,
  findKthMissing,
  findKthNumber,
  splitArray,
  kthSmallestOptimized,
  minDays,
  maxPeopleFed,
  minOperationsToMakeIncreasing,

  // Bonus challenges
  exponentialSearch,
  interpolationSearch,
  jumpSearch,
  ternarySearch,
  fibonacciSearch,

  testFunction,
};
