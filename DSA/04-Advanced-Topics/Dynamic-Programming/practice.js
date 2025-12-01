// 🧩 Dynamic Programming Practice Problems
// Implement these functions to master dynamic programming

// ==========================================
// EASY PROBLEMS (O(n) or O(n²))
// ==========================================

/**
 * Problem 1: Climbing Stairs
 * You can climb either 1 or 2 steps. How many distinct ways to reach n?
 *
 * @param {number} n - Number of stairs
 * @return {number} Number of distinct ways
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 3
 * Output: 3
 * Explanation: (1+1+1), (1+2), (2+1)
 */
function climbStairs(n) {
  // Your implementation here
}

/**
 * Problem 2: House Robber
 * Can't rob adjacent houses. Maximum amount you can rob?
 *
 * @param {number[]} nums - Money in each house
 * @return {number} Maximum money that can be robbed
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob houses with money 2, 9, 1
 */
function rob(nums) {
  // Your implementation here
}

/**
 * Problem 3: Maximum Subarray
 * Find contiguous subarray with largest sum.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum subarray sum
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: Subarray [4,-1,2,1] has sum 6
 */
function maxSubArray(nums) {
  // Your implementation here
}

/**
 * Problem 4: Fibonacci Number
 * Calculate nth Fibonacci number.
 *
 * @param {number} n - Input number
 * @return {number} nth Fibonacci number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 10
 * Output: 55
 */
function fib(n) {
  // Your implementation here
}

/**
 * Problem 5: Tribonacci Number
 * Each term is sum of previous three terms.
 *
 * @param {number} n - Input number
 * @return {number} nth Tribonacci number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 4
 * Output: 4
 * Explanation: T0=0, T1=1, T2=1, T3=2, T4=4
 */
function tribonacci(n) {
  // Your implementation here
}

/**
 * Problem 6: N-th Tribonacci Number
 * Same as Tribonacci, different naming convention.
 *
 * @param {number} n - Input number
 * @return {number} nth Tribonacci number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 25
 * Output: 1389537
 */
function tribonacci2(n) {
  // Your implementation here
}

/**
 * Problem 7: Min Cost Climbing Stairs
 * Cost to climb each step. Minimum cost to reach top.
 *
 * @param {number[]} cost - Cost array
 * @return {number} Minimum cost
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: cost = [10,15,20]
 * Output: 15
 * Explanation: Start from step 1, pay 15, reach top
 */
function minCostClimbingStairs(cost) {
  // Your implementation here
}

/**
 * Problem 8: Delete and Earn
 * Delete numbers and earn points, similar to house robber.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum points
 *
 * Expected Time: O(n + max(nums))
 * Expected Space: O(max(nums))
 *
 * Example:
 * Input: nums = [3,4,2]
 * Output: 6
 * Explanation: Delete 4, earn 4, delete 2, earn 2
 */
function deleteAndEarn(nums) {
  // Your implementation here
}

/**
 * Problem 9: Get Maximum in Generated Array
 * Generate array based on specific rules and find maximum.
 *
 * @param {number} n - Input number
 * @return {number} Maximum in generated array
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 7
 * Output: 3
 * Explanation: Generated array: [0,1,1,2,1,3,2,3]
 */
function getMaximumGenerated(n) {
  // Your implementation here
}

/**
 * Problem 10: Domino and Tromino Tiling
 * Tile 2xn board with dominoes and trominoes.
 *
 * @param {number} n - Board width
 * @return {number} Number of ways to tile
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3
 * Output: 5
 */
function numTilings(n) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Unique Paths
 * Grid with obstacles. Number of paths from top-left to bottom-right.
 *
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @return {number} Number of unique paths
 *
 * Expected Time: O(m*n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: m = 3, n = 7
 * Output: 28
 */
function uniquePaths(m, n) {
  // Your implementation here
}

/**
 * Problem 12: Unique Paths II
 * Grid with obstacles. Number of paths avoiding obstacles.
 *
 * @param {number[][]} obstacleGrid - Grid with obstacles (1 = obstacle)
 * @return {number} Number of unique paths
 *
 * Expected Time: O(m*n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * Output: 2
 */
function uniquePathsWithObstacles(obstacleGrid) {
  // Your implementation here
}

/**
 * Problem 13: Minimum Path Sum
 * Minimum sum path from top-left to bottom-right.
 *
 * @param {number[][]} grid - Input grid
 * @return {number} Minimum path sum
 *
 * Expected Time: O(m*n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
 * Output: 7
 */
function minPathSum(grid) {
  // Your implementation here
}

/**
 * Problem 14: Coin Change
 * Minimum number of coins to make amount.
 *
 * @param {number[]} coins - Coin denominations
 * @param {number} amount - Target amount
 * @return {number} Minimum number of coins, -1 if impossible
 *
 * Expected Time: O(n*amount)
 * Expected Space: O(amount)
 *
 * Example:
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * Explanation: 5+5+1
 */
function coinChange(coins, amount) {
  // Your implementation here
}

/**
 * Problem 15: Longest Increasing Subsequence
 * Length of longest strictly increasing subsequence.
 *
 * @param {number[]} nums - Input array
 * @return {number} Length of LIS
 *
 * Expected Time: O(n²) or O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: [2,3,7,101]
 */
function lengthOfLIS(nums) {
  // Your implementation here
}

/**
 * Problem 16: Perfect Squares
 * Least number of perfect square numbers that sum to n.
 *
 * @param {number} n - Target number
 * @return {number} Minimum number of perfect squares
 *
 * Expected Time: O(n*√n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 12
 * Output: 3
 * Explanation: 4 + 4 + 4
 */
function numSquares(n) {
  // Your implementation here
}

/**
 * Problem 17: Triangle Minimum Path Sum
 * Minimum path sum from top to bottom of triangle.
 *
 * @param {number[][]} triangle - Triangle array
 * @return {number} Minimum path sum
 *
 * Expected Time: O(n²)
 * Expected Space: O(n)
 *
 * Example:
 * Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
 * Output: 11
 */
function minimumTotal(triangle) {
  // Your implementation here
}

/**
 * Problem 18: Decode Ways
 * Number of ways to decode a message (A=1, B=2, ..., Z=26).
 *
 * @param {string} s - Encoded string
 * @return {number} Number of ways to decode
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: s = "12"
 * Output: 2
 * Explanation: "AB" (1,2) or "L" (12)
 */
function numDecodings(s) {
  // Your implementation here
}

/**
 * Problem 19: House Robber II
 * Houses arranged in a circle. Can't rob adjacent houses.
 *
 * @param {number[]} nums - Money in each house
 * @return {number} Maximum money that can be robbed
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,3,2]
 * Output: 3
 */
function rob2(nums) {
  // Your implementation here
}

/**
 * Problem 20: Counting Bits
 * Number of 1's in binary representation for all numbers 0 to n.
 *
 * @param {number} n - Input number
 * @return {number[]} Array of bit counts
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 2
 * Output: [0,1,1]
 * Explanation: 0->0, 1->1, 2->10
 */
function countBits(n) {
  // Your implementation here
}

/**
 * Problem 21: Partition Equal Subset Sum
 * Can array be partitioned into two subsets with equal sum?
 *
 * @param {number[]} nums - Input array
 * @return {boolean} True if partition possible
 *
 * Expected Time: O(n*sum)
 * Expected Space: O(sum)
 *
 * Example:
 * Input: nums = [1,5,11,5]
 * Output: true
 * Explanation: [1,5,5] and [11]
 */
function canPartition(nums) {
  // Your implementation here
}

/**
 * Problem 22: Combination Sum IV
 * Number of possible combinations that add up to target.
 *
 * @param {number[]} nums - Candidate numbers
 * @param {number} target - Target sum
 * @return {number} Number of combinations
 *
 * Expected Time: O(n*target)
 * Expected Space: O(target)
 *
 * Example:
 * Input: nums = [1,2,3], target = 4
 * Output: 7
 * Explanation: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2), (1,3), (3,1)
 */
function combinationSum4(nums, target) {
  // Your implementation here
}

/**
 * Problem 23: Integer Break
 * Break integer into sum of at least two positive integers.
 * Maximize product of those integers.
 *
 * @param {number} n - Input integer
 * @return {number} Maximum product
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 2
 * Output: 1
 * Explanation: 2 = 1 + 1, 1 × 1 = 1
 */
function integerBreak(n) {
  // Your implementation here
}

/**
 * Problem 24: Number of Longest Increasing Subsequence
 * Number of LIS in the array.
 *
 * @param {number[]} nums - Input array
 * @return {number} Number of LIS
 *
 * Expected Time: O(n²)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,3,5,4,7]
 * Output: 2
 * Explanation: [1,3,4,7] and [1,3,5,7]
 */
function findNumberOfLIS(nums) {
  // Your implementation here
}

/**
 * Problem 25: Best Time to Buy and Sell Stock with Cooldown
 * Can't buy on day after selling. Must cooldown.
 *
 * @param {number[]} prices - Stock prices
 * @return {number} Maximum profit
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: prices = [1,2,3,0,2]
 * Output: 3
 * Explanation: Buy on day 0, sell on day 1, cooldown, buy on day 3, sell on day 4
 */
function maxProfit(prices) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Longest Common Subsequence
 * Length of longest common subsequence between two strings.
 *
 * @param {string} text1 - First string
 * @param {string} text2 - Second string
 * @return {number} Length of LCS
 *
 * Expected Time: O(m*n)
 * Expected Space: O(min(m,n))
 *
 * Example:
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Explanation: "ace"
 */
function longestCommonSubsequence(text1, text2) {
  // Your implementation here
}

/**
 * Problem 27: Edit Distance
 * Minimum operations to convert word1 to word2.
 *
 * @param {string} word1 - Source word
 * @param {string} word2 - Target word
 * @return {number} Minimum operations
 *
 * Expected Time: O(m*n)
 * Expected Space: O(min(m,n))
 *
 * Example:
 * Input: word1 = "horse", word2 = "ros"
 * Output: 3
 * Explanation: Replace 'h' with 'r', delete 'e', insert 's'
 */
function minDistance(word1, word2) {
  // Your implementation here
}

/**
 * Problem 28: 0/1 Knapsack
 * Maximum value with given weight capacity.
 *
 * @param {number[]} weights - Item weights
 * @param {number[]} values - Item values
 * @param {number} capacity - Knapsack capacity
 * @return {number} Maximum value
 *
 * Expected Time: O(n*capacity)
 * Expected Space: O(capacity)
 *
 * Example:
 * Input: weights = [1,2,3], values = [6,10,12], capacity = 5
 * Output: 22
 * Explanation: Take items 1 and 2
 */
function knapsack(weights, values, capacity) {
  // Your implementation here
}

/**
 * Problem 29: Burst Balloons
 * Maximum coins by bursting balloons strategically.
 *
 * @param {number[]} nums - Balloon values
 * @return {number} Maximum coins
 *
 * Expected Time: O(n³)
 * Expected Space: O(n²)
 *
 * Example:
 * Input: nums = [3,1,5,8]
 * Output: 167
 */
function maxCoins(nums) {
  // Your implementation here
}

/**
 * Problem 30: Word Break II
 * All possible sentences from word break.
 *
 * @param {string} s - Input string
 * @param {string[]} wordDict - Word dictionary
 * @return {string[]} All possible sentences
 *
 * Expected Time: O(n³ + n*m) where m is average word length
 * Expected Space: O(n³)
 *
 * Example:
 * Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 * Output: ["cat sand dog","cats and dog"]
 */
function wordBreak(s, wordDict) {
  // Your implementation here
}

/**
 * Problem 31: Palindrome Partitioning II
 * Minimum cuts to partition string into palindromes.
 *
 * @param {string} s - Input string
 * @return {number} Minimum cuts
 *
 * Expected Time: O(n²)
 * Expected Space: O(n²)
 *
 * Example:
 * Input: s = "aab"
 * Output: 1
 * Explanation: "aa|b"
 */
function minCut(s) {
  // Your implementation here
}

/**
 * Problem 32: Cherry Pickup
 * Maximum cherries collected going down and back up.
 *
 * @param {number[][]} grid - Cherry grid
 * @return {number} Maximum cherries
 *
 * Expected Time: O(n³)
 * Expected Space: O(n²)
 *
 * Example:
 * Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
 * Output: 5
 */
function cherryPickup(grid) {
  // Your implementation here
}

/**
 * Problem 33: Super Egg Drop
 * Minimum number of moves to find critical floor.
 *
 * @param {number} k - Number of eggs
 * @param {number} n - Number of floors
 * @return {number} Minimum moves
 *
 * Expected Time: O(k*n*log n)
 * Expected Space: O(k*n)
 *
 * Example:
 * Input: k = 1, n = 2
 * Output: 2
 */
function superEggDrop(k, n) {
  // Your implementation here
}

/**
 * Problem 34: Dungeon Game
 * Minimum initial health to reach princess.
 *
 * @param {number[][]} dungeon - Dungeon grid
 * @return {number} Minimum initial health
 *
 * Expected Time: O(m*n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
 * Output: 7
 */
function calculateMinimumHP(dungeon) {
  // Your implementation here
}

/**
 * Problem 35: Regular Expression Matching
 * Pattern matching with '.' and '*'.
 *
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches
 *
 * Expected Time: O(m*n)
 * Expected Space: O(m*n)
 *
 * Example:
 * Input: s = "aa", p = "a*"
 * Output: true
 */
function isMatch(s, p) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Traveling Salesman Problem
 * Find shortest route visiting all cities exactly once.
 */
function tsp(graph) {
  // Your implementation here
}

/**
 * Bonus 2: Assignment Problem
 * Assign jobs to workers with minimum total cost.
 */
function assignmentProblem(costMatrix) {
  // Your implementation here
}

/**
 * Bonus 3: Bitmask DP for Subset Problems
 * Generic bitmask DP solver.
 */
function bitmaskDP(items, constraints) {
  // Your implementation here
}

/**
 * Bonus 4: DP on Trees
 * Maximum independent set in a tree.
 */
function maximumIndependentSet(root) {
  // Your implementation here
}

/**
 * Bonus 5: Matrix Chain Multiplication
 * Optimal parenthesization for matrix multiplication.
 */
function matrixChainMultiplication(dimensions) {
  // Your implementation here
}

/**
 * Bonus 6: Longest Palindromic Subsequence
 * Find longest palindromic subsequence.
 */
function longestPalindromeSubseq(s) {
  // Your implementation here
}

/**
 * Bonus 7: Bitmask State Compression
 * Compress DP states using bitmasks.
 */
function compressStateDP(states, transitions) {
  // Your implementation here
}

/**
 * Bonus 8: Rolling Array Optimization
 * Optimize 2D DP to 1D using rolling arrays.
 */
function rollingArrayOptimization(dp2d) {
  // Your implementation here
}

/**
 * Bonus 9: DP with Priority Queue
 * Use priority queue for DP optimization.
 */
function priorityQueueDP(graph, start, end) {
  // Your implementation here
}

/**
 * Bonus 10: Divide and Conquer DP
 * Apply divide and conquer to DP problems.
 */
function divideConquerDP(arr) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Dynamic Programming Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test climb stairs
  console.log("Example - Climb Stairs:");
  console.log("Input: n = 3");
  console.log("Expected: 3");
  console.log("Your result:", climbStairs(3));

  // Test house robber
  console.log("\nExample - House Robber:");
  console.log("Input: nums = [2,7,9,3,1]");
  console.log("Expected: 12");
  console.log("Your result:", rob([2, 7, 9, 3, 1]));

  // Test max subarray
  console.log("\nExample - Max Subarray:");
  console.log("Input: nums = [-2,1,-3,4,-1,2,1,-5,4]");
  console.log("Expected: 6");
  console.log("Your result:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

  // Test fibonacci
  console.log("\nExample - Fibonacci:");
  console.log("Input: n = 10");
  console.log("Expected: 55");
  console.log("Your result:", fib(10));

  // Test unique paths
  console.log("\nExample - Unique Paths:");
  console.log("Input: m = 3, n = 7");
  console.log("Expected: 28");
  console.log("Your result:", uniquePaths(3, 7));

  // Test unique paths with obstacles
  console.log("\nExample - Unique Paths II:");
  console.log("Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    uniquePathsWithObstacles([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ])
  );

  // Test min path sum
  console.log("\nExample - Min Path Sum:");
  console.log("Input: grid = [[1,3,1],[1,5,1],[4,2,1]]");
  console.log("Expected: 7");
  console.log(
    "Your result:",
    minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])
  );

  // Test coin change
  console.log("\nExample - Coin Change:");
  console.log("Input: coins = [1,2,5], amount = 11");
  console.log("Expected: 3");
  console.log("Your result:", coinChange([1, 2, 5], 11));

  // Test LIS
  console.log("\nExample - LIS:");
  console.log("Input: nums = [10,9,2,5,3,7,101,18]");
  console.log("Expected: 4");
  console.log("Your result:", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));

  // Test triangle
  console.log("\nExample - Triangle:");
  console.log("Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]");
  console.log("Expected: 11");
  console.log(
    "Your result:",
    minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])
  );

  // Test decode ways
  console.log("\nExample - Decode Ways:");
  console.log('Input: s = "12"');
  console.log("Expected: 2");
  console.log("Your result:", numDecodings("12"));

  // Test house robber II
  console.log("\nExample - House Robber II:");
  console.log("Input: nums = [2,3,2]");
  console.log("Expected: 3");
  console.log("Your result:", rob2([2, 3, 2]));

  // Test counting bits
  console.log("\nExample - Counting Bits:");
  console.log("Input: n = 2");
  console.log("Expected: [0,1,1]");
  console.log("Your result:", countBits(2));

  // Test partition
  console.log("\nExample - Partition:");
  console.log("Input: nums = [1,5,11,5]");
  console.log("Expected: true");
  console.log("Your result:", canPartition([1, 5, 11, 5]));

  // Test combination sum
  console.log("\nExample - Combination Sum IV:");
  console.log("Input: nums = [1,2,3], target = 4");
  console.log("Expected: 7");
  console.log("Your result:", combinationSum4([1, 2, 3], 4));

  // Test integer break
  console.log("\nExample - Integer Break:");
  console.log("Input: n = 2");
  console.log("Expected: 1");
  console.log("Your result:", integerBreak(2));

  // Test stock with cooldown
  console.log("\nExample - Stock with Cooldown:");
  console.log("Input: prices = [1,2,3,0,2]");
  console.log("Expected: 3");
  console.log("Your result:", maxProfit([1, 2, 3, 0, 2]));

  // Test LCS
  console.log("\nExample - LCS:");
  console.log('Input: text1 = "abcde", text2 = "ace"');
  console.log("Expected: 3");
  console.log("Your result:", longestCommonSubsequence("abcde", "ace"));

  // Test edit distance
  console.log("\nExample - Edit Distance:");
  console.log('Input: word1 = "horse", word2 = "ros"');
  console.log("Expected: 3");
  console.log("Your result:", minDistance("horse", "ros"));

  // Test knapsack
  console.log("\nExample - Knapsack:");
  console.log("Input: weights = [1,2,3], values = [6,10,12], capacity = 5");
  console.log("Expected: 22");
  console.log("Your result:", knapsack([1, 2, 3], [6, 10, 12], 5));

  // Test burst balloons
  console.log("\nExample - Burst Balloons:");
  console.log("Input: nums = [3,1,5,8]");
  console.log("Expected: 167");
  console.log("Your result:", maxCoins([3, 1, 5, 8]));

  // Test word break
  console.log("\nExample - Word Break:");
  console.log('Input: s = "leetcode", wordDict = ["leet","code"]');
  console.log("Expected: true");
  console.log("Your result:", wordBreak("leetcode", ["leet", "code"]));

  // Test min cut
  console.log("\nExample - Min Cut:");
  console.log('Input: s = "aab"');
  console.log("Expected: 1");
  console.log("Your result:", minCut("aab"));

  // Test cherry pickup
  console.log("\nExample - Cherry Pickup:");
  console.log("Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]");
  console.log("Expected: 5");
  console.log(
    "Your result:",
    cherryPickup([
      [0, 1, -1],
      [1, 0, -1],
      [1, 1, 1],
    ])
  );

  // Test super egg drop
  console.log("\nExample - Super Egg Drop:");
  console.log("Input: k = 1, n = 2");
  console.log("Expected: 2");
  console.log("Your result:", superEggDrop(1, 2));

  // Test dungeon game
  console.log("\nExample - Dungeon Game:");
  console.log("Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]");
  console.log("Expected: 7");
  console.log(
    "Your result:",
    calculateMinimumHP([
      [-2, -3, 3],
      [-5, -10, 1],
      [10, 30, -5],
    ])
  );

  // Test regex matching
  console.log("\nExample - Regex Matching:");
  console.log('Input: s = "aa", p = "a*"');
  console.log("Expected: true");
  console.log("Your result:", isMatch("aa", "a*"));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding DP patterns and state transitions");
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

// DP pattern detector
function detectPattern(problem) {
  const patterns = {
    fibonacci: ["fib", "climb", "house robber", "ways to reach"],
    knapsack: ["knapsack", "coin change", "partition", "subset"],
    lcs: ["longest common", "edit distance", "palindrome"],
    grid: ["grid", "matrix", "path", "unique paths"],
    partition: ["partition", "split", "divide"],
    string: ["string", "word", "text", "pattern"],
  };

  const problemStr = problem.toLowerCase();

  for (const [pattern, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (problemStr.includes(keyword)) {
        return pattern;
      }
    }
  }

  return "unknown";
}

// Complexity analyzer
function analyzeComplexity(func, args) {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();

  return {
    result,
    time: end - start,
    memory: process.memoryUsage().heapUsed,
  };
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  climbStairs,
  rob,
  maxSubArray,
  fib,
  tribonacci,
  tribonacci2,
  minCostClimbingStairs,
  deleteAndEarn,
  getMaximumGenerated,
  numTilings,

  // Medium problems
  uniquePaths,
  uniquePathsWithObstacles,
  minPathSum,
  coinChange,
  lengthOfLIS,
  numSquares,
  minimumTotal,
  numDecodings,
  rob2,
  countBits,
  canPartition,
  combinationSum4,
  integerBreak,
  findNumberOfLIS,
  maxProfit,

  // Hard problems
  longestCommonSubsequence,
  minDistance,
  knapsack,
  maxCoins,
  wordBreak,
  minCut,
  cherryPickup,
  superEggDrop,
  calculateMinimumHP,
  isMatch,

  // Bonus challenges
  tsp,
  assignmentProblem,
  bitmaskDP,
  maximumIndependentSet,
  matrixChainMultiplication,
  longestPalindromeSubseq,
  compressStateDP,
  rollingArrayOptimization,
  priorityQueueDP,
  divideConquerDP,

  // Utilities
  testFunction,
  detectPattern,
  analyzeComplexity,
};
