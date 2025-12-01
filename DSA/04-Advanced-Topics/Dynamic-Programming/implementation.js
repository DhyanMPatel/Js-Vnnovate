// 🧩 Dynamic Programming Implementation
// Complete implementations of DP algorithms with analysis

// ==========================================
// FUNDAMENTAL DP PATTERNS
// ==========================================

/**
 * Fibonacci - Classic DP Example
 * Time: O(n)
 * Space: O(1) optimized
 */
function fibonacci(n) {
  if (n <= 1) return n;

  let prev2 = 0,
    prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * Fibonacci with Memoization (Top-Down)
 * Time: O(n)
 * Space: O(n) for memo + recursion stack
 */
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

/**
 * Fibonacci with Tabulation (Bottom-Up)
 * Time: O(n)
 * Space: O(n)
 */
function fibonacciTab(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

/**
 * Climbing Stairs (Fibonacci Variant)
 * Time: O(n)
 * Space: O(1)
 */
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1,
    prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * House Robber
 * Time: O(n)
 * Space: O(1)
 */
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0,
    prev1 = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * House Robber II (Circular houses)
 * Time: O(n)
 * Space: O(1)
 */
function rob2(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  function robLinear(houses) {
    let prev2 = 0,
      prev1 = 0;

    for (const money of houses) {
      const current = Math.max(prev1, prev2 + money);
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }

  // Either rob from first to n-2, or from 1 to n-1
  return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
}

/**
 * Maximum Subarray (Kadane's Algorithm)
 * Time: O(n)
 * Space: O(1)
 */
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

/**
 * Maximum Product Subarray
 * Time: O(n)
 * Space: O(1)
 */
function maxProduct(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  let minEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // When multiplied by negative, max becomes min and vice versa
    if (num < 0) {
      [maxEndingHere, minEndingHere] = [minEndingHere, maxEndingHere];
    }

    maxEndingHere = Math.max(num, maxEndingHere * num);
    minEndingHere = Math.min(num, minEndingHere * num);

    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// ==========================================
// GRID DP PATTERNS
// ==========================================

/**
 * Unique Paths
 * Time: O(m*n)
 * Space: O(n) optimized
 */
function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}

/**
 * Unique Paths II (with obstacles)
 * Time: O(m*n)
 * Space: O(n)
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0;
      } else if (j > 0) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[n - 1];
}

/**
 * Minimum Path Sum
 * Time: O(m*n)
 * Space: O(n)
 */
function minPathSum(grid) {
  const m = grid.length,
    n = grid[0].length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = grid[0][0];

  // Initialize first row
  for (let j = 1; j < n; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0]; // Update first column

    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
    }
  }

  return dp[n - 1];
}

/**
 * Triangle Minimum Path Sum
 * Time: O(n²)
 * Space: O(n)
 */
function minimumTotal(triangle) {
  const n = triangle.length;
  const dp = new Array(n).fill(0);

  // Start from bottom
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (i === n - 1) {
        dp[j] = triangle[i][j];
      } else {
        dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
      }
    }
  }

  return dp[0];
}

/**
 * Dungeon Game (Minimum Health)
 * Time: O(m*n)
 * Space: O(n)
 */
function calculateMinimumHP(dungeon) {
  const m = dungeon.length,
    n = dungeon[0].length;
  const dp = new Array(n + 1).fill(Infinity);
  dp[n - 1] = 1; // Princess needs at least 1 health

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const needed = Math.min(dp[j], dp[j + 1]) - dungeon[i][j];
      dp[j] = Math.max(1, needed);
    }
    dp[n] = Infinity; // Reset boundary
  }

  return dp[0];
}

// ==========================================
// KNAPSACK PATTERNS
// ==========================================

/**
 * 0/1 Knapsack
 * Time: O(n*capacity)
 * Space: O(capacity)
 */
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }

  return dp[capacity];
}

/**
 * Unbounded Knapsack
 * Time: O(n*capacity)
 * Space: O(capacity)
 */
function unboundedKnapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  for (let w = 1; w <= capacity; w++) {
    for (let i = 0; i < n; i++) {
      if (weights[i] <= w) {
        dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
      }
    }
  }

  return dp[capacity];
}

/**
 * Bounded Knapsack (with quantity limits)
 * Time: O(n*capacity*maxQuantity)
 * Space: O(capacity)
 */
function boundedKnapsack(weights, values, quantities, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // Use binary representation to handle quantities efficiently
    let remaining = quantities[i];
    let k = 1;

    while (remaining > 0) {
      const count = Math.min(k, remaining);
      const weight = weights[i] * count;
      const value = values[i] * count;

      for (let w = capacity; w >= weight; w--) {
        dp[w] = Math.max(dp[w], value + dp[w - weight]);
      }

      remaining -= count;
      k *= 2;
    }
  }

  return dp[capacity];
}

/**
 * Coin Change (Minimum coins)
 * Time: O(n*amount)
 * Space: O(amount)
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Coin Change II (Number of ways)
 * Time: O(n*amount)
 * Space: O(amount)
 */
function coinChange2(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}

/**
 * Combination Sum IV (Order matters)
 * Time: O(n*amount)
 * Space: O(amount)
 */
function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (num <= i) {
        dp[i] += dp[i - num];
      }
    }
  }

  return dp[target];
}

// ==========================================
// STRING DP PATTERNS
// ==========================================

/**
 * Longest Common Subsequence (LCS)
 * Time: O(m*n)
 * Space: O(min(m,n))
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length,
    n = text2.length;

  // Use smaller dimension for space optimization
  if (n > m) {
    [text1, text2] = [text2, text1];
    [m, n] = [n, m];
  }

  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    let prev = 0;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = prev + 1;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
      prev = temp;
    }
  }

  return dp[n];
}

/**
 * Edit Distance (Levenshtein Distance)
 * Time: O(m*n)
 * Space: O(min(m,n))
 */
function editDistance(word1, word2) {
  const m = word1.length,
    n = word2.length;

  if (n > m) {
    [word1, word2] = [word2, word1];
    [m, n] = [n, m];
  }

  const dp = new Array(n + 1).fill(0);

  // Initialize base case
  for (let j = 0; j <= n; j++) dp[j] = j;

  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;

    for (let j = 1; j <= n; j++) {
      const temp = dp[j];

      if (word1[i - 1] === word2[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(dp[j], dp[j - 1], prev);
      }

      prev = temp;
    }
  }

  return dp[n];
}

/**
 * Longest Palindromic Subsequence
 * Time: O(n²)
 * Space: O(n²)
 */
function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = new Array(n).fill(null).map(() => new Array(n).fill(0));

  // Single characters are palindromes
  for (let i = 0; i < n; i++) dp[i][i] = 1;

  // Check substrings of length 2 to n
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}

/**
 * Longest Common Substring
 * Time: O(m*n)
 * Space: O(min(m,n))
 */
function longestCommonSubstring(text1, text2) {
  const m = text1.length,
    n = text2.length;
  let maxLen = 0;

  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    let prev = 0;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];

      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = prev + 1;
        maxLen = Math.max(maxLen, dp[j]);
      } else {
        dp[j] = 0;
      }

      prev = temp;
    }
  }

  return maxLen;
}

/**
 * Word Break Problem
 * Time: O(n² + n*m) where m is word dictionary size
 * Space: O(n)
 */
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; // Empty string

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}

/**
 * Palindrome Partitioning II (Minimum cuts)
 * Time: O(n²)
 * Space: O(n²)
 */
function minCut(s) {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  const isPalindrome = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(false));

  // Precompute palindrome substrings
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      isPalindrome[i][j] =
        s[i] === s[j] && (j - i <= 1 || isPalindrome[i + 1][j - 1]);
    }
  }

  // dp[i] = minimum cuts for s[i:]
  for (let i = n - 1; i >= 0; i--) {
    let minCuts = n - 1; // Maximum possible cuts

    for (let j = i; j < n; j++) {
      if (isPalindrome[i][j]) {
        minCuts = Math.min(minCuts, j === n - 1 ? 0 : dp[j + 1] + 1);
      }
    }

    dp[i] = minCuts;
  }

  return dp[0];
}

// ==========================================
// PARTITION DP PATTERNS
// ==========================================

/**
 * Partition Equal Subset Sum
 * Time: O(n*sum)
 * Space: O(sum)
 */
function canPartition(nums) {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }

  return dp[target];
}

/**
 * Matrix Chain Multiplication
 * Time: O(n³)
 * Space: O(n²)
 */
function matrixChainMultiplication(dimensions) {
  const n = dimensions.length - 1; // Number of matrices
  const dp = new Array(n).fill(null).map(() => new Array(n).fill(0));

  // Chain length from 2 to n
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;

      for (let k = i; k < j; k++) {
        const cost =
          dp[i][k] +
          dp[k + 1][j] +
          dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  return dp[0][n - 1];
}

/**
 * Burst Balloons
 * Time: O(n³)
 * Space: O(n²)
 */
function maxCoins(nums) {
  const n = nums.length;
  const extendedNums = [1, ...nums, 1];
  const N = n + 2;
  const dp = new Array(N).fill(null).map(() => new Array(N).fill(0));

  // Process balloons from right to left
  for (let left = N - 2; left >= 1; left--) {
    for (let right = left; right <= N - 2; right++) {
      for (let k = left; k <= right; k++) {
        const coins =
          extendedNums[left - 1] * extendedNums[k] * extendedNums[right + 1] +
          dp[left][k - 1] +
          dp[k + 1][right];
        dp[left][right] = Math.max(dp[left][right], coins);
      }
    }
  }

  return dp[1][N - 2];
}

// ==========================================
// ADVANCED DP TECHNIQUES
// ==========================================

/**
 * Bitmask DP - Traveling Salesman Problem
 * Time: O(n² * 2^n)
 * Space: O(n * 2^n)
 */
function tsp(graph) {
  const n = graph.length;
  const dp = new Array(1 << n)
    .fill(null)
    .map(() => new Array(n).fill(Infinity));

  // Base case: starting at city 0
  dp[1][0] = 0;

  // Iterate over all subsets
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u))) continue;

      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue;

        const newMask = mask | (1 << v);
        dp[newMask][v] = Math.min(dp[newMask][v], dp[mask][u] + graph[u][v]);
      }
    }
  }

  // Return to starting city
  let minCost = Infinity;
  for (let i = 1; i < n; i++) {
    minCost = Math.min(minCost, dp[(1 << n) - 1][i] + graph[i][0]);
  }

  return minCost;
}

/**
 * Bitmask DP - Assignment Problem
 * Time: O(n² * 2^n)
 * Space: O(2^n)
 */
function assignmentProblem(costMatrix) {
  const n = costMatrix.length;
  const dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;

  for (let mask = 0; mask < 1 << n; mask++) {
    const worker = countSetBits(mask);

    for (let job = 0; job < n; job++) {
      if (!(mask & (1 << job))) {
        const newMask = mask | (1 << job);
        dp[newMask] = Math.min(dp[newMask], dp[mask] + costMatrix[worker][job]);
      }
    }
  }

  return dp[(1 << n) - 1];
}

function countSetBits(num) {
  let count = 0;
  while (num) {
    count += num & 1;
    num >>= 1;
  }
  return count;
}

/**
 * Tree DP - Maximum Independent Set
 * Time: O(n)
 * Space: O(h) where h is tree height
 */
function maximumIndependentSet(root) {
  function dfs(node) {
    if (node === null) return [0, 0]; // [notIncluded, included]

    const left = dfs(node.left);
    const right = dfs(node.right);

    // Include current node
    const include = node.val + left[0] + right[0];

    // Exclude current node
    const exclude = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return [exclude, include];
  }

  const result = dfs(root);
  return Math.max(result[0], result[1]);
}

/**
 * Tree DP - Binary Tree Maximum Path Sum
 * Time: O(n)
 * Space: O(h)
 */
function maxPathSumTree(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (node === null) return 0;

    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    const currentPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPath);

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}

/**
 * DP on DAG - Longest Path
 * Time: O(V + E)
 * Space: O(V)
 */
function longestPathInDAG(n, edges) {
  // Build adjacency list
  const adj = new Array(n).fill(null).map(() => []);
  const inDegree = new Array(n).fill(0);

  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }

  // Topological sort
  const queue = [];
  const dp = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  while (queue.length > 0) {
    const u = queue.shift();

    for (const v of adj[u]) {
      dp[v] = Math.max(dp[v], dp[u] + 1);
      inDegree[v]--;

      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return Math.max(...dp);
}

// ==========================================
// SPACE OPTIMIZATION TECHNIQUES
// ==========================================

/**
 * Rolling Array Optimization
 * Generic template for 2D DP optimization
 */
function rollingArrayDP(n, m, transition) {
  let prev = new Array(m + 1).fill(0);
  let curr = new Array(m + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      curr[j] = transition(prev, curr, i, j);
    }
    [prev, curr] = [curr, prev]; // Swap arrays
  }

  return prev[m];
}

/**
 * Bitmask Optimization for Boolean DP
 */
function subsetSumBitmask(nums, target) {
  let dp = 1; // Only sum 0 is possible initially

  for (const num of nums) {
    dp |= dp << num; // Add num to all existing sums
  }

  // Check if target sum is possible
  return (dp >> target) & 1;
}

/**
 * State Compression DP
 */
function compressStateDP(states, transition) {
  const dp = new Map();
  dp.set(0, 0); // Base state

  for (const state of states) {
    const newDp = new Map(dp);

    for (const [currentState, value] of dp) {
      const newState = transition(currentState, state);
      const newValue = value + getStateValue(state);

      if (!newDp.has(newState) || newDp.get(newState) < newValue) {
        newDp.set(newState, newValue);
      }
    }

    dp = newDp;
  }

  return Math.max(...dp.values());
}

function getStateValue(state) {
  // Helper function to extract value from state
  return state.value || 0;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Helper to create DP table with initialization
 */
function createDPTable(rows, cols, initValue = 0) {
  return new Array(rows).fill(null).map(() => new Array(cols).fill(initValue));
}

/**
 * Helper to reconstruct solution from DP table
 */
function reconstructPath(dp, start, end, reconstruction) {
  const path = [];
  let current = end;

  while (current >= start) {
    path.unshift(reconstruction(current));
    current = getPreviousState(dp, current);
  }

  return path;
}

function getPreviousState(dp, current) {
  // Helper to find previous state in DP reconstruction
  // Implementation depends on specific DP problem
  return current - 1; // Simplified example
}

/**
 * Performance monitor for DP solutions
 */
function measureDPPerformance(func, ...args) {
  const startTime = performance.now();
  const result = func(...args);
  const endTime = performance.now();

  return {
    result,
    time: endTime - startTime,
    complexity: analyzeComplexity(func, args),
  };
}

function analyzeComplexity(func, args) {
  // Simple complexity analysis based on input sizes
  const sizes = args.map((arg) =>
    Array.isArray(arg)
      ? arg.length
      : typeof arg === "object"
      ? Object.keys(arg).length
      : 1
  );

  return {
    inputSizes: sizes,
    estimatedComplexity: estimateComplexity(sizes),
  };
}

function estimateComplexity(sizes) {
  // Simplified complexity estimation
  const max = Math.max(...sizes);
  if (sizes.length === 1) return `O(${max})`;
  if (sizes.length === 2) return `O(${max}²)`;
  return `O(${max}^${sizes.length})`;
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runDPTests() {
  console.log("🧪 Running Dynamic Programming Tests...\n");

  // Test fundamental patterns
  console.log("🔢 Testing Fundamental DP:");
  console.log(`Fibonacci(10): ${fibonacci(10)} (expected: 55)`);
  console.log(`Fibonacci Memo(10): ${fibonacciMemo(10)} (expected: 55)`);
  console.log(`Climb Stairs(5): ${climbStairs(5)} (expected: 8)`);
  console.log(
    `House Robber([2,7,9,3,1]): ${rob([2, 7, 9, 3, 1])} (expected: 12)`
  );
  console.log(
    `Max Subarray([-2,1,-3,4,-1,2,1,-5,4]): ${maxSubArray([
      -2, 1, -3, 4, -1, 2, 1, -5, 4,
    ])} (expected: 6)`
  );

  // Test grid DP
  console.log("\n📊 Testing Grid DP:");
  console.log(`Unique Paths(3,7): ${uniquePaths(3, 7)} (expected: 28)`);
  console.log(
    `Min Path Sum([[1,3,1],[1,5,1],[4,2,1]]): ${minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])} (expected: 7)`
  );
  console.log(
    `Triangle Minimum([[2],[3,4],[6,5,7],[4,1,8,3]]): ${minimumTotal([
      [2],
      [3, 4],
      [6, 5, 7],
      [4, 1, 8, 3],
    ])} (expected: 11)`
  );

  // Test knapsack
  console.log("\n🎒 Testing Knapsack:");
  console.log(
    `0/1 Knapsack([1,2,3], [6,10,12], 5): ${knapsack(
      [1, 2, 3],
      [6, 10, 12],
      5
    )} (expected: 22)`
  );
  console.log(
    `Coin Change([1,2,5], 11): ${coinChange([1, 2, 5], 11)} (expected: 3)`
  );
  console.log(
    `Coin Change II([1,2,5], 5): ${coinChange2([1, 2, 5], 5)} (expected: 4)`
  );

  // Test string DP
  console.log("\n📝 Testing String DP:");
  console.log(
    `LCS("abcde", "ace"): ${longestCommonSubsequence(
      "abcde",
      "ace"
    )} (expected: 3)`
  );
  console.log(
    `Edit Distance("horse", "ros"): ${editDistance(
      "horse",
      "ros"
    )} (expected: 3)`
  );
  console.log(
    `Longest Palindromic Subseq("bbbab"): ${longestPalindromeSubseq(
      "bbbab"
    )} (expected: 4)`
  );
  console.log(
    `Word Break("leetcode", ["leet","code"]): ${wordBreak("leetcode", [
      "leet",
      "code",
    ])} (expected: true)`
  );

  // Test partition DP
  console.log("\n✂️ Testing Partition DP:");
  console.log(
    `Can Partition([1,5,11,5]): ${canPartition([1, 5, 11, 5])} (expected: true)`
  );
  console.log(
    `Matrix Chain Mult([10,30,5,60]): ${matrixChainMultiplication([
      10, 30, 5, 60,
    ])} (expected: 4500)`
  );

  // Test advanced DP
  console.log("\n🚀 Testing Advanced DP:");
  const graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
  ];
  console.log(`TSP (4 cities): ${tsp(graph)} (expected: 80)`);

  // Test performance
  console.log("\n⚡ Testing Performance:");
  const perf = measureDPPerformance(fibonacci, 1000);
  console.log(`Fibonacci(1000) time: ${perf.time.toFixed(2)}ms`);
  console.log(`Complexity estimate: ${perf.complexity.estimatedComplexity}`);

  console.log("\n✅ All DP tests completed!");
}

// Export all functions
module.exports = {
  // Fundamental patterns
  fibonacci,
  fibonacciMemo,
  fibonacciTab,
  climbStairs,
  rob,
  rob2,
  maxSubArray,
  maxProduct,

  // Grid DP
  uniquePaths,
  uniquePathsWithObstacles,
  minPathSum,
  minimumTotal,
  calculateMinimumHP,

  // Knapsack
  knapsack,
  unboundedKnapsack,
  boundedKnapsack,
  coinChange,
  coinChange2,
  combinationSum4,

  // String DP
  longestCommonSubsequence,
  editDistance,
  longestPalindromeSubseq,
  longestCommonSubstring,
  wordBreak,
  minCut,

  // Partition DP
  canPartition,
  matrixChainMultiplication,
  maxCoins,

  // Advanced DP
  tsp,
  assignmentProblem,
  maximumIndependentSet,
  maxPathSumTree,
  longestPathInDAG,

  // Optimization techniques
  rollingArrayDP,
  subsetSumBitmask,
  compressStateDP,

  // Utilities
  createDPTable,
  reconstructPath,
  measureDPPerformance,
  runDPTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runDPTests();
}
