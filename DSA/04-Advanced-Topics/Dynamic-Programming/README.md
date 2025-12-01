# 🧩 Dynamic Programming

> **Mastering Optimal Substructure and Overlapping Subproblems**

## 📋 Table of Contents

- [What is Dynamic Programming?](#what-is-dynamic-programming)
- [DP Fundamentals](#dp-fundamentals)
- [DP Approaches](#dp-approaches)
- [Common DP Patterns](#common-dp-patterns)
- [Advanced DP Techniques](#advanced-dp-techniques)
- [DP on Trees and Graphs](#dp-on-trees-and-graphs)
- [Space Optimization](#space-optimization)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What is Dynamic Programming?

### Definition

Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler, overlapping subproblems. It solves each subproblem only once and stores the results for future use.

### Real-World Analogy

```javascript
// Think of DP like a GPS navigation system:
// Instead of recalculating the shortest path every time,
// it caches known routes and builds upon them.

// Without DP (recursion):
// Home → Work → Home → Work → Home
// Each trip recalculates the entire route

// With DP (memoization):
// Home → Work (calculate once, store)
// Work → Home (calculate once, store)
// Future trips use cached routes
```

### Why DP Matters

- **Efficiency**: Turns exponential solutions into polynomial time
- **Optimization**: Guarantees optimal solutions for problems with optimal substructure
- **Foundation**: Basis for many advanced algorithms
- **Interview Essential**: Frequently tested in FAANG interviews

## 🔍 DP Fundamentals

### Two Key Properties

#### 1. Optimal Substructure

```javascript
// The optimal solution to the problem contains
// optimal solutions to its subproblems

// Example: Shortest path
// If A → B → C is shortest path from A to C,
// then A → B is shortest path from A to B
// and B → C is shortest path from B to C
```

#### 2. Overlapping Subproblems

```javascript
// Same subproblems are solved multiple times

// Example: Fibonacci
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)  // fib(3) calculated twice!
fib(3) = fib(2) + fib(1)  // fib(2) calculated multiple times!
```

### DP vs Other Techniques

| Technique            | When to Use                                    | Key Characteristic             |
| -------------------- | ---------------------------------------------- | ------------------------------ |
| **DP**               | Optimal substructure + overlapping subproblems | Stores subproblem results      |
| **Greedy**           | Local optimal → global optimal                 | Makes irrevocable choices      |
| **Divide & Conquer** | Independent subproblems                        | No overlapping subproblems     |
| **Backtracking**     | Need to explore all possibilities              | Exhaustive search with pruning |

## 🛠️ DP Approaches

### 1. Top-Down (Memoization)

```javascript
// Natural recursive structure with caching
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // Cache hit
  if (n <= 1) return n;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n]; // Store result
}

// Advantages:
// - Easy to understand (natural recursion)
// - Only computes needed subproblems
// - Good for sparse DP tables

// Disadvantages:
// - Recursion overhead
// - Stack depth limitations
```

### 2. Bottom-Up (Tabulation)

```javascript
// Iterative approach filling DP table
function fibTab(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // Fill table
  }

  return dp[n];
}

// Advantages:
// - No recursion overhead
// - Better cache locality
// - Easy to optimize space

// Disadvantages:
// - May compute unnecessary subproblems
// - Less intuitive for complex problems
```

### 3. Hybrid Approach

```javascript
// Use recursion for structure, iteration for computation
function fibHybrid(n) {
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
```

## 🎯 Common DP Patterns

### 1. Linear DP (1D)

#### Fibonacci Variants

```javascript
// Standard Fibonacci
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

// Climbing Stairs (Fibonacci variant)
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

// House Robber
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
```

#### Maximum Subarray

```javascript
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}
```

### 2. Grid DP (2D)

#### Unique Paths

```javascript
function uniquePaths(m, n) {
  const dp = new Array(m).fill(null).map(() => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// Space optimized version
function uniquePathsOptimized(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}
```

#### Minimum Path Sum

```javascript
function minPathSum(grid) {
  const m = grid.length,
    n = grid[0].length;
  const dp = new Array(m).fill(null).map(() => new Array(n));

  dp[0][0] = grid[0][0];

  // Initialize first row and column
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

  // Fill the rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}
```

### 3. Knapsack Pattern

#### 0/1 Knapsack

```javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
          dp[i - 1][w] // Exclude item
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Space optimized version
function knapsackOptimized(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(values[i] + dp[w - weights[i]], dp[w]);
    }
  }

  return dp[capacity];
}
```

#### Unbounded Knapsack

```javascript
function unboundedKnapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let w = 1; w <= capacity; w++) {
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] <= w) {
        dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
      }
    }
  }

  return dp[capacity];
}
```

### 4. String DP

#### Longest Common Subsequence (LCS)

```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length,
    n = text2.length;
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Reconstruct LCS
function reconstructLCS(text1, text2) {
  const m = text1.length,
    n = text2.length;
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct sequence
  let i = m,
    j = n;
  const lcs = [];

  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      lcs.unshift(text1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs.join("");
}
```

#### Edit Distance

```javascript
function editDistance(word1, word2) {
  const m = word1.length,
    n = word2.length;
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // Delete
            dp[i][j - 1], // Insert
            dp[i - 1][j - 1] // Replace
          );
      }
    }
  }

  return dp[m][n];
}
```

#### Palindrome Subsequence

```javascript
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
```

### 5. Partition DP

#### Partition Equal Subset Sum

```javascript
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
```

#### Matrix Chain Multiplication

```javascript
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
```

## 🚀 Advanced DP Techniques

### 1. Bitmask DP

#### Traveling Salesman Problem (TSP)

```javascript
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
```

#### Assignment Problem

```javascript
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
```

### 2. DP on Trees

#### Maximum Independent Set

```javascript
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
```

#### Tree Diameter

```javascript
function treeDiameter(root) {
  let maxDiameter = 0;

  function height(node) {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}
```

### 3. State Compression DP

#### Game of Life

```javascript
function gameOfLife(board) {
  const m = board.length,
    n = board[0].length;

  // Use bit manipulation to compress states
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let liveNeighbors = 0;

      // Check all 8 neighbors
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (di === 0 && dj === 0) continue;

          const ni = i + di,
            nj = j + dj;
          if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
            liveNeighbors += board[ni][nj] & 1; // Get original state
          }
        }
      }

      // Encode next state in second bit
      if (board[i][j] === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) {
        board[i][j] |= 2; // 01 -> 11 (live to live)
      } else if (board[i][j] === 0 && liveNeighbors === 3) {
        board[i][j] |= 2; // 00 -> 10 (dead to live)
      }
    }
  }

  // Extract next state
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] >>= 1; // Get second bit
    }
  }
}
```

## 🌳 DP on Trees and Graphs

### 1. Tree DP

#### Binary Tree Maximum Path Sum

```javascript
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
```

#### Longest Path in DAG

```javascript
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
```

### 2. Graph DP

#### Shortest Path with DP (Bellman-Ford)

```javascript
function bellmanFord(n, edges, start) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  // Relax edges n-1 times
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return null; // Negative cycle detected
    }
  }

  return dist;
}
```

## 💾 Space Optimization

### 1. Rolling Arrays

```javascript
// Standard DP: O(n²) space
function standardDP(n) {
  const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
    }
  }

  return dp[n][n];
}

// Optimized DP: O(n) space
function optimizedDP(n) {
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      curr[j] = prev[j] + curr[j - 1] - prev[j - 1];
    }
    [prev, curr] = [curr, prev]; // Swap arrays
  }

  return prev[n];
}
```

### 2. Single Variable Optimization

```javascript
// Fibonacci with O(1) space
function fibonacciOptimized(n) {
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

// Knapsack with O(capacity) space
function knapsack1D(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // Iterate backwards to avoid using current item multiple times
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }

  return dp[capacity];
}
```

### 3. Bitmask Optimization

```javascript
// Use bit operations instead of arrays for boolean DP
function subsetSumBitmask(nums, target) {
  let dp = 1; // Only sum 0 is possible initially

  for (const num of nums) {
    dp |= dp << num; // Add num to all existing sums
  }

  // Check if target sum is possible
  return (dp >> target) & 1;
}
```

## 🚀 Real-World Applications

### 1. Resource Allocation

```javascript
// Budget allocation problem
function budgetAllocation(projects, budgets, totalBudget) {
  const n = projects.length;
  const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(totalBudget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let b = 1; b <= totalBudget; b++) {
      if (budgets[i - 1] <= b) {
        dp[i][b] = Math.max(
          projects[i - 1] + dp[i - 1][b - budgets[i - 1]],
          dp[i - 1][b]
        );
      } else {
        dp[i][b] = dp[i - 1][b];
      }
    }
  }

  return dp[n][totalBudget];
}
```

### 2. Text Processing

```javascript
// Auto-complete suggestions
function autoComplete(dictionary, prefix) {
  const dp = new Map();

  // Precompute all possible prefixes
  for (const word of dictionary) {
    let currentPrefix = "";
    for (const char of word) {
      currentPrefix += char;
      if (!dp.has(currentPrefix)) {
        dp.set(currentPrefix, []);
      }
      dp.get(currentPrefix).push(word);
    }
  }

  return dp.get(prefix) || [];
}
```

### 3. Financial Planning

```javascript
// Investment portfolio optimization
function optimizePortfolio(returns, risks, maxRisk) {
  const n = returns.length;
  const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(maxRisk + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let r = 1; r <= maxRisk; r++) {
      if (risks[i - 1] <= r) {
        dp[i][r] = Math.max(
          returns[i - 1] + dp[i - 1][r - risks[i - 1]],
          dp[i - 1][r]
        );
      } else {
        dp[i][r] = dp[i - 1][r];
      }
    }
  }

  return dp[n][maxRisk];
}
```

## 💡 DP Problem-Solving Framework

### Step 1: Identify DP

```javascript
function isDPProblem(problem) {
  return hasOptimalSubstructure(problem) && hasOverlappingSubproblems(problem);
}

function hasOptimalSubstructure(problem) {
  // Can optimal solution be built from optimal subproblems?
  // Examples: shortest path, knapsack, LCS
}

function hasOverlappingSubproblems(problem) {
  // Are subproblems solved multiple times?
  // Examples: Fibonacci, tree DP, grid DP
}
```

### Step 2: Define State

```javascript
function defineState(problem) {
  // What information do we need to uniquely identify a subproblem?
  // Examples:
  // - Fibonacci: dp[i] = fib(i)
  // - Knapsack: dp[i][w] = max value with first i items and capacity w
  // - LCS: dp[i][j] = LCS length of first i chars of s1 and first j chars of s2
}
```

### Step 3: Find Recurrence

```javascript
function findRecurrence(state) {
  // How do we compute dp[i] from smaller states?
  // Common patterns:
  // - dp[i] = dp[i-1] + dp[i-2] (Fibonacci)
  // - dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) (Knapsack)
  // - dp[i][j] = dp[i-1][j-1] + 1 if chars match else max(dp[i-1][j], dp[i][j-1]) (LCS)
}
```

### Step 4: Set Base Cases

```javascript
function setBaseCases(state) {
  // What are the smallest subproblems we can solve directly?
  // Examples:
  // - Fibonacci: dp[0] = 0, dp[1] = 1
  // - Knapsack: dp[0][w] = 0, dp[i][0] = 0
  // - LCS: dp[0][j] = 0, dp[i][0] = 0
}
```

### Step 5: Optimize

```javascript
function optimizeDP(dp) {
  // Can we reduce space complexity?
  // Can we use bit manipulation?
  // Can we add pruning?

  if (canUseRollingArray(dp)) return useRollingArray(dp);
  if (canUseBitmask(dp)) return useBitmask(dp);
  if (canAddPruning(dp)) return addPruning(dp);

  return dp;
}
```

## 🚨 Common DP Mistakes to Avoid

### State Definition Mistakes

- ❌ State doesn't capture all necessary information
- ❌ State is too large (memory issues)
- ❌ State doesn't lead to optimal substructure

### Recurrence Mistakes

- ❌ Wrong recurrence relation
- ❌ Missing base cases
- ❌ Circular dependencies

### Implementation Mistakes

- ❌ Off-by-one errors in array indices
- ❌ Not handling edge cases
- ❌ Incorrect initialization

### Optimization Mistakes

- ❌ Over-optimizing (losing clarity)
- ❌ Wrong optimization direction
- ❌ Breaking recurrence with optimization

## 📖 Additional Resources

### Videos

- **MIT 6.006 DP Lectures**: Comprehensive DP coverage
- **DP Patterns Explained**: Common DP templates
- **Advanced DP Techniques**: Bitmask, tree DP

### Websites

- **DP Problems Collection**: Curated DP problems by difficulty
- **Visual DP**: Interactive DP visualizations
- **DP State Space**: State definition guide

### Books

- **"Introduction to Algorithms"**: DP chapter
- **"Algorithm Design Manual"**: Practical DP approach
- **"Competitive Programming"**: Advanced DP techniques

---

## 🚀 Getting Started

**Ready to master DP?**

1. **Start with Basic Patterns** → `implementation.js`
2. **Practice Common Problems** → `practice.js`
3. **Learn Advanced Techniques** → Bitmask, tree DP
4. **Optimize Your Solutions** → Space optimization

> 💡 **Key Insight**: DP is about recognizing patterns and defining the right state. Master the patterns, not just individual problems!

---

## 📊 Progress Checklist

### Basic DP Patterns

- [ ] Fibonacci variants
- [ ] Grid DP (unique paths, min path sum)
- [ ] Linear DP (max subarray, house robber)
- [ ] String DP (LCS, edit distance)

### Advanced DP

- [ ] Knapsack problems (0/1, unbounded, bounded)
- [ ] Partition DP
- [ ] Bitmask DP
- [ ] Tree DP

### Optimization Techniques

- [ ] Space optimization (rolling arrays)
- [ ] State compression
- [ ] Memory-efficient DP
- [ ] Time-space tradeoffs

---

## 🎯 Interview Focus

### Most Common DP Questions

1. **Knapsack Variants** - 40% of DP interviews
2. **String DP** - 30% of DP interviews
3. **Grid DP** - 20% of DP interviews
4. **Tree DP** - 10% of DP interviews

### Must-Know DP Patterns for FAANG

- **Knapsack**: 0/1, unbounded, bounded
- **String DP**: LCS, edit distance, palindrome
- **Grid DP**: Unique paths, minimum path sum
- **Linear DP**: Fibonacci variants, house robber
- **Advanced**: Bitmask DP, tree DP

---

_Last Updated: December 2025_  
_Difficulty: Advanced_  
_Prerequisites: Recursion, Basic Algorithms_  
_Time Commitment: 2-3 weeks_
