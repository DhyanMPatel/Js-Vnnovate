// ⛰️ Heaps & Priority Queues Practice Problems
// Implement these functions to master heap operations

// ==========================================
// EASY PROBLEMS (O(n log n) or less)
// ==========================================

/**
 * Problem 1: Kth Largest Element in an Array
 * Find the kth largest element in an unsorted array.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Kth position
 * @return {number} Kth largest element
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
 * Problem 2: Find Median from Data Stream
 * Design a data structure to find median of data stream.
 */
class MedianFinder {
  constructor() {
    // Your implementation here
  }

  addNum(num) {
    // Your implementation here
  }

  findMedian() {
    // Your implementation here
  }
}

/**
 * Problem 3: Last Stone Weight
 * Simulate smashing stones until at most one remains.
 *
 * @param {number[]} stones - Stone weights
 * @return {number} Final stone weight
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [2,7,4,1,8,1]
 * Output: 1
 */
function lastStoneWeight(stones) {
  // Your implementation here
}

/**
 * Problem 4: Relative Sort Array
 * Sort array based on another array's order.
 *
 * @param {number[]} arr1 - Array to sort
 * @param {number[]} arr2 - Reference order array
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
 * Problem 5: Maximum Product of Two Numbers
 * Find maximum product of two numbers in array.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum product
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: [1,5,4,5]
 * Output: 25
 */
function maxProduct(nums) {
  // Your implementation here
}

/**
 * Problem 6: Check if Array Is K-Sorted
 * Check if array is sorted within k distance.
 *
 * @param {number[]} arr - Input array
 * @param {number} k - Distance parameter
 * @return {boolean} True if k-sorted
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: arr = [3,1,2,4], k = 2
 * Output: true
 */
function isKSortedArray(arr, k) {
  // Your implementation here
}

/**
 * Problem 7: Find the Kth Largest Integer in the Array
 * Find kth largest integer in array (large numbers).
 *
 * @param {string[]} nums - String numbers
 * @param {number} k - Kth position
 * @return {string} Kth largest number
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = ["3","6","2","1"], k = 2
 * Output: "3"
 */
function kthLargestNumber(nums, k) {
  // Your implementation here
}

/**
 * Problem 8: Minimum Operations to Halve Array Sum
 * Reduce array sum by half using minimum operations.
 *
 * @param {number[]} nums - Input array
 * @return {number} Minimum operations
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [5,19,8,1]
 * Output: 3
 */
function halveArray(nums) {
  // Your implementation here
}

/**
 * Problem 9: Maximum Sum of a Subsequence With No Adjacent Elements
 * Find maximum sum of non-adjacent elements.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum sum
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,2,5,10,7]
 * Output: 15
 */
function maxSumNonAdjacent(nums) {
  // Your implementation here
}

/**
 * Problem 10: Find the Kth Smallest Sum of a Matrix
 * Find kth smallest sum from sorted rows.
 *
 * @param {number[][]} mat - Sorted matrix rows
 * @param {number} k - Kth position
 * @return {number} Kth smallest sum
 *
 * Expected Time: O(k * log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: mat = [[1,3,11],[2,4,6]], k = 5
 * Output: 7
 */
function kthSmallest(mat, k) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Top K Frequent Elements
 * Find k most frequent elements in array.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Number of elements
 * @return {number[]} Top k frequent elements
 *
 * Expected Time: O(n log k)
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
 * Problem 12: K Closest Points to Origin
 * Find k points closest to origin.
 *
 * @param {number[][]} points - Point coordinates
 * @param {number} k - Number of points
 * @return {number[][]} K closest points
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: points = [[1,3],[-2,2]], k = 1
 * Output: [[-2,2]]
 */
function kClosest(points, k) {
  // Your implementation here
}

/**
 * Problem 13: Kth Largest Element in a Stream
 * Find kth largest element in a stream.
 */
class KthLargest {
  constructor(k, nums) {
    // Your implementation here
  }

  add(val) {
    // Your implementation here
  }
}

/**
 * Problem 14: Find K Pairs with Largest Sums
 * Find k pairs with largest sums from two arrays.
 *
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @param {number} k - Number of pairs
 * @return {number[][]} K pairs with largest sums
 *
 * Expected Time: O(k log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * Output: [[1,2],[1,4],[1,6]]
 */
function kSmallestPairs(nums1, nums2, k) {
  // Your implementation here
}

/**
 * Problem 15: Reorganize String
 * Rearrange string to avoid adjacent duplicates.
 *
 * @param {string} s - Input string
 * @return {string} Reorganized string
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "aab"
 * Output: "aba"
 */
function reorganizeString(s) {
  // Your implementation here
}

/**
 * Problem 16: Sort Characters By Frequency
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
 * Output: "eert"
 */
function frequencySort(s) {
  // Your implementation here
}

/**
 * Problem 17: Find the Median of the Data Stream
 * Find median from data stream (optimized).
 */
class MedianFinderOptimized {
  constructor() {
    // Your implementation here
  }

  addNum(num) {
    // Your implementation here
  }

  findMedian() {
    // Your implementation here
  }
}

/**
 * Problem 18: Sliding Window Maximum
 * Find maximum in each sliding window.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @return {number[]} Maximum values
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 */
function maxSlidingWindow(nums, k) {
  // Your implementation here
}

/**
 * Problem 19: Find the Kth Smallest Element in a Matrix
 * Find kth smallest element in sorted matrix.
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - Kth position
 * @return {number} Kth smallest element
 *
 * Expected Time: O(k log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 */
function kthSmallestMatrix(matrix, k) {
  // Your implementation here
}

/**
 * Problem 20: Find the Kth Largest Integer Coordinate
 * Find kth largest integer coordinates.
 *
 * @param {number} n - Grid size
 * @param {number} k - Kth position
 * @return {number[]} Kth largest coordinate
 *
 * Expected Time: O(k log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: n = 1, k = 1
 * Output: [1,1]
 */
function kthLargestCoordinate(n, k) {
  // Your implementation here
}

/**
 * Problem 21: Minimum Number of Refueling Stops
 * Find minimum refueling stops to reach target.
 *
 * @param {number} target - Target distance
 * @param {number} startFuel - Starting fuel
 * @param {number[][]} stations - Station positions and fuel
 * @return {number} Minimum stops
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: target = 1, startFuel = 1, stations = []
 * Output: 0
 */
function minRefuelStops(target, startFuel, stations) {
  // Your implementation here
}

/**
 * Problem 22: Consecutive Elements in an Array
 * Find longest consecutive elements sequence.
 *
 * @param {number[]} nums - Input array
 * @return {number} Length of longest sequence
 *
 * Expected Time: O(n log n) with heap, O(n) with hash set
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [100,4,200,1,3,2]
 * Output: 4
 */
function longestConsecutive(nums) {
  // Your implementation here
}

/**
 * Problem 23: Find the Kth Smallest Prime Fraction
 * Find kth smallest fraction in sorted array.
 *
 * @param {number[]} arr - Sorted array of primes
 * @param {number} k - Kth position
 * @return {number[]} Fraction as [numerator, denominator]
 *
 * Expected Time: O(k log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: arr = [1,2,3,5], k = 3
 * Output: [2,5]
 */
function kthSmallestPrimeFraction(arr, k) {
  // Your implementation here
}

/**
 * Problem 24: Find the Kth Largest Integer in the Array (Large)
 * Find kth largest integer with large numbers.
 *
 * @param {string[]} nums - String numbers
 * @param {number} k - Kth position
 * @return {string} Kth largest number
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = ["0","0"], k = 2
 * Output: "0"
 */
function kthLargestStringNumber(nums, k) {
  // Your implementation here
}

/**
 * Problem 25: Maximum Number of Coins You Can Get
 * Get maximum coins from piles.
 *
 * @param {number[]} piles - Coin piles
 * @return {number} Maximum coins
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: piles = [2,4,1,2,7,8]
 * Output: 9
 */
function maxCoins(piles) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Find Median from Data Stream (Optimized)
 * Optimized median finder with better performance.
 */
class MedianFinderAdvanced {
  constructor() {
    // Your implementation here
  }

  addNum(num) {
    // Your implementation here
  }

  findMedian() {
    // Your implementation here
  }
}

/**
 * Problem 27: Sliding Window Maximum (Optimized)
 * Optimized sliding window maximum using deque.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @return {number[]} Maximum values
 *
 * Expected Time: O(n)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 */
function maxSlidingWindowOptimized(nums, k) {
  // Your implementation here
}

/**
 * Problem 28: Data Stream as Disjoint Intervals
 * Manage intervals in data stream.
 */
class IntervalManager {
  constructor() {
    // Your implementation here
  }

  addNum(val) {
    // Your implementation here
  }

  getIntervals() {
    // Your implementation here
  }
}

/**
 * Problem 29: The Skyline Problem
 * Calculate building skyline.
 *
 * @param {number[][]} buildings - Building coordinates
 * @return {number[][]} Skyline points
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
 * Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
 */
function getSkyline(buildings) {
  // Your implementation here
}

/**
 * Problem 30: Find the Kth Smallest Sum of a Matrix (Optimized)
 * Optimized kth smallest sum in matrix.
 *
 * @param {number[][]} mat - Sorted matrix rows
 * @param {number} k - Kth position
 * @return {number} Kth smallest sum
 *
 * Expected Time: O(k log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: mat = [[1,3,11],[2,4,6]], k = 9
 * Output: 17
 */
function kthSmallestMatrixOptimized(mat, k) {
  // Your implementation here
}

/**
 * Problem 31: Find the Maximum Number of K-Sum Pairs
 * Find maximum number of k-sum pairs.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Target sum
 * @return {number} Maximum pairs
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

/**
 * Problem 32: Find the Maximum Number of Elements Divisible by K
 * Find maximum elements divisible by k.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Divisor
 * @return {number} Maximum divisible elements
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4], k = 2
 * Output: 2
 */
function maxDivisibleElements(nums, k) {
  // Your implementation here
}

/**
 * Problem 33: Find the Kth Largest Integer in the Array (Very Large)
 * Handle very large integer strings.
 *
 * @param {string[]} nums - Very large numbers as strings
 * @param {number} k - Kth position
 * @return {string} Kth largest number
 *
 * Expected Time: O(n log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = ["623986800","3","887298","79500730","7679727","698859138"], k = 11
 * Output: "3"
 */
function kthLargestVeryLarge(nums, k) {
  // Your implementation here
}

/**
 * Problem 34: Find the Kth Smallest Prime Fraction (Optimized)
 * Optimized kth smallest prime fraction.
 *
 * @param {number[]} arr - Sorted prime array
 * @param {number} k - Kth position
 * @return {number[]} Fraction as [numerator, denominator]
 *
 * Expected Time: O(k log k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: arr = [1,7], k = 1
 * Output: [1,7]
 */
function kthSmallestPrimeFractionOptimized(arr, k) {
  // Your implementation here
}

/**
 * Problem 35: Find the Kth Smallest Element in a Matrix (Binary Search)
 * Binary search approach for kth smallest in matrix.
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - Kth position
 * @return {number} Kth smallest element
 *
 * Expected Time: O(n log(max-min))
 * Expected Space: O(1)
 *
 * Example:
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 */
function kthSmallestMatrixBinarySearch(matrix, k) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Custom Heap
 * Implement heap from scratch with all operations.
 */
class CustomHeap {
  constructor(comparator) {
    // Your implementation here
  }

  insert(value) {
    // Your implementation here
  }

  extract() {
    // Your implementation here
  }

  peek() {
    // Your implementation here
  }

  size() {
    // Your implementation here
  }

  isEmpty() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Design a Max Stack
 * Design stack with O(1) max operation.
 */
class MaxStack {
  constructor() {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  top() {
    // Your implementation here
  }

  peekMax() {
    // Your implementation here
  }

  popMax() {
    // Your implementation here
  }
}

/**
 * Bonus 3: Design a Max Heap with Delete Operation
 * Max heap with efficient delete operation.
 */
class MaxHeapWithDelete {
  constructor() {
    // Your implementation here
  }

  insert(value) {
    // Your implementation here
  }

  extractMax() {
    // Your implementation here
  }

  delete(value) {
    // Your implementation here
  }

  peek() {
    // Your implementation here
  }

  size() {
    // Your implementation here
  }
}

/**
 * Bonus 4: Find the Kth Largest Element in a Stream (Optimized)
 * Optimized kth largest in stream.
 */
class KthLargestOptimized {
  constructor(k, nums) {
    // Your implementation here
  }

  add(val) {
    // Your implementation here
  }
}

/**
 * Bonus 5: Design a Min Stack with Frequency
 * Min stack that tracks frequency.
 */
class MinStackWithFrequency {
  constructor() {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  top() {
    // Your implementation here
  }

  getMin() {
    // Your implementation here
  }

  getFrequency(x) {
    // Your implementation here
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Heap Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test kth largest
  console.log("Example - Kth Largest Element:");
  console.log("Input: nums = [3,2,1,5,6,4], k = 2");
  console.log("Expected: 5");
  console.log("Your result:", findKthLargest([3, 2, 1, 5, 6, 4], 2));

  // Test last stone weight
  console.log("\nExample - Last Stone Weight:");
  console.log("Input: [2,7,4,1,8,1]");
  console.log("Expected: 1");
  console.log("Your result:", lastStoneWeight([2, 7, 4, 1, 8, 1]));

  // Test top k frequent
  console.log("\nExample - Top K Frequent:");
  console.log("Input: nums = [1,1,1,2,2,3], k = 2");
  console.log("Expected: [1,2]");
  console.log("Your result:", topKFrequent([1, 1, 1, 2, 2, 3], 2));

  // Test k closest points
  console.log("\nExample - K Closest Points:");
  console.log("Input: points = [[1,3],[-2,2]], k = 1");
  console.log("Expected: [[-2,2]]");
  console.log(
    "Your result:",
    kClosest(
      [
        [1, 3],
        [-2, 2],
      ],
      1
    )
  );

  // Test reorganize string
  console.log("\nExample - Reorganize String:");
  console.log('Input: s = "aab"');
  console.log('Expected: "aba"');
  console.log("Your result:", reorganizeString("aab"));

  // Test frequency sort
  console.log("\nExample - Frequency Sort:");
  console.log('Input: s = "tree"');
  console.log('Expected: "eert"');
  console.log("Your result:", frequencySort("tree"));

  // Test sliding window maximum
  console.log("\nExample - Sliding Window Maximum:");
  console.log("Input: nums = [1,3,-1,-3,5,3,6,7], k = 3");
  console.log("Expected: [3,3,5,5,6,7]");
  console.log("Your result:", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

  // Test kth smallest matrix
  console.log("\nExample - Kth Smallest Matrix:");
  console.log("Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8");
  console.log("Expected: 13");
  console.log(
    "Your result:",
    kthSmallestMatrix(
      [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15],
      ],
      8
    )
  );

  // Test median finder
  console.log("\nExample - Median Finder:");
  const medianFinder = new MedianFinder();
  medianFinder.addNum(1);
  medianFinder.addNum(2);
  console.log("Median after [1,2]:", medianFinder.findMedian());
  medianFinder.addNum(3);
  console.log("Median after [1,2,3]:", medianFinder.findMedian());

  // Test kth largest stream
  console.log("\nExample - Kth Largest Stream:");
  const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
  console.log("3rd largest after [4,5,8,2]:", kthLargest.add(3));
  console.log("3rd largest after adding 3:", kthLargest.add(5));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding heap operations and priority queues");
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
  findKthLargest,
  MedianFinder,
  lastStoneWeight,
  relativeSortArray,
  maxProduct,
  isKSortedArray,
  kthLargestNumber,
  halveArray,
  maxSumNonAdjacent,
  kthSmallest,
  topKFrequent,
  kClosest,
  KthLargest,
  kSmallestPairs,
  reorganizeString,
  frequencySort,
  MedianFinderOptimized,
  maxSlidingWindow,
  kthSmallestMatrix,
  kthLargestCoordinate,
  minRefuelStops,
  longestConsecutive,
  kthSmallestPrimeFraction,
  kthLargestStringNumber,
  maxCoins,
  MedianFinderAdvanced,
  maxSlidingWindowOptimized,
  IntervalManager,
  getSkyline,
  kthSmallestMatrixOptimized,
  maxOperations,
  maxDivisibleElements,
  kthLargestVeryLarge,
  kthSmallestPrimeFractionOptimized,
  kthSmallestMatrixBinarySearch,
  CustomHeap,
  MaxStack,
  MaxHeapWithDelete,
  KthLargestOptimized,
  MinStackWithFrequency,
  testFunction,
};
