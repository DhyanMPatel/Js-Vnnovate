// 📊 Sorting Algorithms Practice Problems
// Implement these functions to master sorting techniques

// ==========================================
// EASY PROBLEMS (O(n²) or less)
// ==========================================

/**
 * Problem 1: Sort an Array
 * Basic sorting implementation.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1) or O(n)
 *
 * Example:
 * Input: nums = [5,2,3,1]
 * Output: [1,2,3,5]
 */
function sortArray(nums) {
  // Your implementation here
}

/**
 * Problem 2: Sort Colors (Dutch National Flag)
 * Sort array with 0s, 1s, and 2s in one pass.
 *
 * @param {number[]} nums - Array containing only 0, 1, 2
 * @return {void} Modify array in-place
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 */
function sortColors(nums) {
  // Your implementation here
}

/**
 * Problem 3: Valid Anagram
 * Check if two strings are anagrams using sorting.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} True if anagrams
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1) or O(n)
 *
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 */
function isAnagram(s, t) {
  // Your implementation here
}

/**
 * Problem 4: Kth Largest Element
 * Find kth largest element in array.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Kth position
 * @return {number} Kth largest element
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 */
function findKthLargest(nums, k) {
  // Your implementation here
}

/**
 * Problem 5: Sort Array by Parity
 * Sort array with even numbers first, then odd.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,1,2,4]
 * Output: [2,4,3,1] or [4,2,3,1]
 */
function sortArrayByParity(nums) {
  // Your implementation here
}

/**
 * Problem 6: Sort Array by Increasing Frequency
 * Sort by frequency, then by value.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,2,2,2,3]
 * Output: [3,1,1,2,2,2]
 */
function frequencySort(nums) {
  // Your implementation here
}

/**
 * Problem 7: Sort the People
 * Sort people by height in descending order.
 *
 * @param {string[]} names - Names array
 * @param {number[]} heights - Heights array
 * @return {string[]} Sorted names
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: names = ["Mary","John","Emma"], heights = [180,165,170]
 * Output: ["Mary","Emma","John"]
 */
function sortPeople(names, heights) {
  // Your implementation here
}

/**
 * Problem 8: Sort the Array by Increasing Digit Sum
 * Sort numbers by their digit sum, then by value.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [13,20,17,0]
 * Output: [0,13,17,20]
 */
function digitSumSort(nums) {
  // Your implementation here
}

/**
 * Problem 9: Sort Integers by The Number of 1 Bits
 * Sort by number of 1 bits, then by value.
 *
 * @param {number[]} arr - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr = [0,1,2,3,4,5,6,7,8]
 * Output: [0,1,2,4,8,3,5,6,7]
 */
function sortByBits(arr) {
  // Your implementation here
}

/**
 * Problem 10: Sort the Students by Their Kth Score
 * Sort students by kth score in descending order.
 *
 * @param {number[][]} score - Student scores
 * @param {number} k - Kth score index
 * @return {number[][]} Sorted scores
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
 * Output: [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
 */
function sortTheStudents(score, k) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Relative Sort Array
 * Sort based on another array's order.
 *
 * @param {number[]} arr1 - Array to sort
 * @param {number[]} arr2 - Reference order
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
 * Output: [2,2,2,1,4,3,3,9,6,7,19]
 */
function relativeSortArray(arr1, arr2) {
  // Your implementation here
}

/**
 * Problem 12: Top K Frequent Elements
 * Find k most frequent elements using sorting.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Number of elements
 * @return {number[]} Top k frequent elements
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 */
function topKFrequent(nums, k) {
  // Your implementation here
}

/**
 * Problem 13: Sort Characters By Frequency
 * Sort string characters by frequency.
 *
 * @param {string} s - Input string
 * @return {string} Sorted string
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "tree"
 * Output: "eert" or "eetr"
 */
function frequencySort(s) {
  // Your implementation here
}

/**
 * Problem 14: Sort Array by Two Keys
 * Sort array by primary key, then by secondary key.
 *
 * @param {number[][]} arr - 2D array to sort
 * @param {number} key1 - Primary key index
 * @param {number} key2 - Secondary key index
 * @return {number[][]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: arr = [[3,1],[2,2],[1,3],[2,1]], key1 = 0, key2 = 1
 * Output: [[1,3],[2,1],[2,2],[3,1]]
 */
function sortByTwoKeys(arr, key1, key2) {
  // Your implementation here
}

/**
 * Problem 15: Sort the Matrix Diagonally
 * Sort each diagonal of matrix.
 *
 * @param {number[][]} mat - Input matrix
 * @return {number[][]} Sorted matrix
 *
 * Expected Time: O(mn log(min(m,n)))
 * Expected Space: O(mn)
 *
 * Example:
 * Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
 * Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
 */
function diagonalSort(mat) {
  // Your implementation here
}

/**
 * Problem 16: Sort the Array to Minimize the Lexicographic Order
 * Find lexicographically smallest permutation.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Lexicographically smallest array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [5,4,3,2,1]
 * Output: [1,2,3,4,5]
 */
function lexicographicallySmallestArray(nums) {
  // Your implementation here
}

/**
 * Problem 17: Sort the Array to Maximize the Number of Good Pairs
 * Sort to maximize pairs where nums[i] == nums[j].
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Sorted array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [2,0,1,3]
 * Output: [0,1,2,3]
 */
function maximizeGoodPairs(nums) {
  // Your implementation here
}

/**
 * Problem 18: Sort the Array to Minimize the Number of Inversions
 * Find array with minimum inversions.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Array with minimum inversions
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [3,1,2]
 * Output: [1,2,3]
 */
function minimizeInversions(nums) {
  // Your implementation here
}

/**
 * Problem 19: Sort the Array to Maximize the Sum of Adjacent Differences
 * Find arrangement maximizing sum of |nums[i] - nums[i+1]|.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [2,1,3] or [2,3,1]
 */
function maximizeAdjacentDifferenceSum(nums) {
  // Your implementation here
}

/**
 * Problem 20: Sort the Array to Minimize the Sum of Absolute Differences
 * Find arrangement minimizing sum of |nums[i] - nums[i+1]|.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [4,2,1,3]
 * Output: [1,2,3,4]
 */
function minimizeAdjacentDifferenceSum(nums) {
  // Your implementation here
}

/**
 * Problem 21: Sort the Array to Create the Largest Number
 * Arrange numbers to form largest possible number.
 *
 * @param {number[]} nums - Input array
 * @return {string} Largest number as string
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [10,2]
 * Output: "210"
 */
function largestNumber(nums) {
  // Your implementation here
}

/**
 * Problem 22: Sort the Array to Create the Smallest Number
 * Arrange numbers to form smallest possible number.
 *
 * @param {number[]} nums - Input array
 * @return {string} Smallest number as string
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [3,30,34,5,9]
 * Output: "3033459"
 */
function smallestNumber(nums) {
  // Your implementation here
}

/**
 * Problem 23: Sort the Array to Maximize the Hamming Distance
 * Find arrangement maximizing Hamming distance.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [3,1,2] or similar
 */
function maximizeHammingDistance(nums) {
  // Your implementation here
}

/**
 * Problem 24: Sort the Array to Minimize the Hamming Distance
 * Find arrangement minimizing Hamming distance.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [1,2,3]
 */
function minimizeHammingDistance(nums) {
  // Your implementation here
}

/**
 * Problem 25: Sort the Array to Maximize the Number of Local Maxima
 * Find arrangement maximizing local maxima count.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [2,4,1,3] or similar
 */
function maximizeLocalMaxima(nums) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Sort the Array to Minimize the Maximum Difference
 * Find arrangement minimizing maximum adjacent difference.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,4,7,10]
 * Output: [1,4,7,10] or [1,7,4,10]
 */
function minimizeMaximumDifference(nums) {
  // Your implementation here
}

/**
 * Problem 27: Sort the Array to Maximize the Minimum Difference
 * Find arrangement maximizing minimum adjacent difference.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [2,4,1,3] or similar
 */
function maximizeMinimumDifference(nums) {
  // Your implementation here
}

/**
 * Problem 28: Sort the Array to Minimize the Sum of Squared Differences
 * Find arrangement minimizing sum of (nums[i] - nums[i+1])².
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,3,5,7]
 * Output: [1,3,5,7]
 */
function minimizeSquaredDifferenceSum(nums) {
  // Your implementation here
}

/**
 * Problem 29: Sort the Array to Maximize the Sum of Cubed Differences
 * Find arrangement maximizing sum of |nums[i] - nums[i+1]|³.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [2,4,1,3] or similar
 */
function maximizeCubedDifferenceSum(nums) {
  // Your implementation here
}

/**
 * Problem 30: Sort the Array to Minimize the Number of Swaps
 * Find arrangement requiring minimum swaps to sort.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [4,3,2,1]
 * Output: [1,2,3,4]
 */
function minimizeSwaps(nums) {
  // Your implementation here
}

/**
 * Problem 31: Sort the Array to Maximize the Number of Inversions
 * Find arrangement with maximum inversions.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Array with maximum inversions
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [3,2,1]
 */
function maximizeInversions(nums) {
  // Your implementation here
}

/**
 * Problem 32: Sort the Array to Minimize the Number of Comparisons
 * Find optimal sorting order for comparison-based sorting.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [3,1,4,2]
 * Output: [1,2,3,4]
 */
function minimizeComparisons(nums) {
  // Your implementation here
}

/**
 * Problem 33: Sort the Array to Maximize the Number of Comparisons
 * Find worst-case arrangement for comparison-based sorting.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Worst-case arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [4,3,2,1]
 */
function maximizeComparisons(nums) {
  // Your implementation here
}

/**
 * Problem 34: Sort the Array to Minimize the Number of Cache Misses
 * Find arrangement minimizing cache misses.
 *
 * @param {number[]} nums - Input array
 * @param {number} cacheSize - Cache size
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4,5], cacheSize = 2
 * Output: [1,2,3,4,5]
 */
function minimizeCacheMisses(nums, cacheSize) {
  // Your implementation here
}

/**
 * Problem 35: Sort the Array to Maximize the Number of Cache Hits
 * Find arrangement maximizing cache hits.
 *
 * @param {number[]} nums - Input array
 * @param {number} cacheSize - Cache size
 * @return {number[]} Optimally arranged array
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,1,2,1,2], cacheSize = 2
 * Output: [1,1,1,2,2,2]
 */
function maximizeCacheHits(nums, cacheSize) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Custom Quick Sort
 * Quick sort with custom comparator.
 */
function customQuickSort(arr, comparator = (a, b) => a - b) {
  // Your implementation here
}

/**
 * Bonus 2: Implement Merge Sort for Linked List
 * Sort linked list using merge sort.
 */
function mergeSortLinkedList(head) {
  // Your implementation here
}

/**
 * Bonus 3: Implement External Sort
 * Sort large dataset that doesn't fit in memory.
 */
function externalSort(data, chunkSize) {
  // Your implementation here
}

/**
 * Bonus 4: Implement Stable Quick Sort
 * Quick sort that maintains stability.
 */
function stableQuickSort(arr) {
  // Your implementation here
}

/**
 * Bonus 5: Implement Adaptive Sort
 * Sort that adapts to input characteristics.
 */
function adaptiveSort(arr) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Sorting Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test sort array
  console.log("Example - Sort Array:");
  console.log("Input: nums = [5,2,3,1]");
  console.log("Expected: [1,2,3,5]");
  console.log("Your result:", sortArray([5, 2, 3, 1]));

  // Test sort colors
  console.log("\nExample - Sort Colors:");
  const colors = [2, 0, 2, 1, 1, 0];
  console.log("Input: [2,0,2,1,1,0]");
  console.log("Expected: [0,0,1,1,2,2]");
  sortColors(colors);
  console.log("Your result:", colors);

  // Test anagram
  console.log("\nExample - Valid Anagram:");
  console.log('Input: s = "anagram", t = "nagaram"');
  console.log("Expected: true");
  console.log("Your result:", isAnagram("anagram", "nagaram"));

  // Test kth largest
  console.log("\nExample - Kth Largest:");
  console.log("Input: nums = [3,2,1,5,6,4], k = 2");
  console.log("Expected: 5");
  console.log("Your result:", findKthLargest([3, 2, 1, 5, 6, 4], 2));

  // Test sort by parity
  console.log("\nExample - Sort by Parity:");
  console.log("Input: nums = [3,1,2,4]");
  console.log("Expected: [2,4,3,1] or [4,2,3,1]");
  console.log("Your result:", sortArrayByParity([3, 1, 2, 4]));

  // Test frequency sort
  console.log("\nExample - Frequency Sort:");
  console.log("Input: nums = [1,1,2,2,2,3]");
  console.log("Expected: [3,1,1,2,2,2]");
  console.log("Your result:", frequencySort([1, 1, 2, 2, 2, 3]));

  // Test sort people
  console.log("\nExample - Sort People:");
  console.log('Input: names = ["Mary","John","Emma"], heights = [180,165,170]');
  console.log('Expected: ["Mary","Emma","John"]');
  console.log(
    "Your result:",
    sortPeople(["Mary", "John", "Emma"], [180, 165, 170])
  );

  // Test digit sum sort
  console.log("\nExample - Digit Sum Sort:");
  console.log("Input: nums = [13,20,17,0]");
  console.log("Expected: [0,13,17,20]");
  console.log("Your result:", digitSumSort([13, 20, 17, 0]));

  // Test sort by bits
  console.log("\nExample - Sort by Bits:");
  console.log("Input: arr = [0,1,2,3,4,5,6,7,8]");
  console.log("Expected: [0,1,2,4,8,3,5,6,7]");
  console.log("Your result:", sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8]));

  // Test sort students
  console.log("\nExample - Sort Students:");
  const scores = [
    [10, 6, 9, 1],
    [7, 5, 11, 2],
    [4, 8, 3, 15],
  ];
  console.log("Input: [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2");
  console.log("Expected: [[7,5,11,2],[10,6,9,1],[4,8,3,15]]");
  console.log("Your result:", sortTheStudents(scores, 2));

  // Test relative sort
  console.log("\nExample - Relative Sort:");
  const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
  const arr2 = [2, 1, 4, 3, 9, 6];
  console.log("Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]");
  console.log("Expected: [2,2,2,1,4,3,3,9,6,7,19]");
  console.log("Your result:", relativeSortArray(arr1, arr2));

  // Test top k frequent
  console.log("\nExample - Top K Frequent:");
  console.log("Input: nums = [1,1,1,2,2,3], k = 2");
  console.log("Expected: [1,2]");
  console.log("Your result:", topKFrequent([1, 1, 1, 2, 2, 3], 2));

  // Test frequency sort string
  console.log("\nExample - Frequency Sort String:");
  console.log('Input: s = "tree"');
  console.log('Expected: "eert" or "eetr"');
  console.log("Your result:", frequencySort("tree"));

  // Test largest number
  console.log("\nExample - Largest Number:");
  console.log("Input: nums = [10,2]");
  console.log('Expected: "210"');
  console.log("Your result:", largestNumber([10, 2]));

  console.log("\n🎯 Implement all functions and test them!");
  console.log(
    "💡 Focus on understanding sorting algorithms and their applications"
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

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  sortArray,
  sortColors,
  isAnagram,
  findKthLargest,
  sortArrayByParity,
  frequencySort,
  sortPeople,
  digitSumSort,
  sortByBits,
  sortTheStudents,

  // Medium problems
  relativeSortArray,
  topKFrequent,
  frequencySort,
  sortByTwoKeys,
  diagonalSort,
  lexicographicallySmallestArray,
  maximizeGoodPairs,
  minimizeInversions,
  maximizeAdjacentDifferenceSum,
  minimizeAdjacentDifferenceSum,
  largestNumber,
  smallestNumber,
  maximizeHammingDistance,
  minimizeHammingDistance,
  maximizeLocalMaxima,

  // Hard problems
  minimizeMaximumDifference,
  maximizeMinimumDifference,
  minimizeSquaredDifferenceSum,
  maximizeCubedDifferenceSum,
  minimizeSwaps,
  maximizeInversions,
  minimizeComparisons,
  maximizeComparisons,
  minimizeCacheMisses,
  maximizeCacheHits,

  // Bonus challenges
  customQuickSort,
  mergeSortLinkedList,
  externalSort,
  stableQuickSort,
  adaptiveSort,

  testFunction,
};
