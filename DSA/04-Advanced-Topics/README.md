# 🎓 Advanced Topics

> **Mastering Complex Algorithmic Techniques**

## 📋 Overview

Advanced topics build upon fundamental data structures and algorithms to solve complex problems efficiently. These techniques are frequently tested in FAANG interviews.

## 🗂️ Structure

```
04-Advanced-Topics/
├── README.md                    # This file - Overview
├── Dynamic-Programming/         # 🧩 DP Patterns & Techniques
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # DP implementations
│   └── practice.js             # Practice problems
├── Greedy-Algorithms/           # 🎯 Greedy Problem Solving
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # Greedy implementations
│   └── practice.js             # Practice problems
├── Backtracking/                # 🔄 Backtracking & Combinatorics
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # Backtracking patterns
│   └── practice.js             # Practice problems
└── Graph-Algorithms/            # 🕸️ Graph Theory & Algorithms
    ├── README.md               # Theory & concepts
    ├── implementation.js       # Graph algorithms
    └── practice.js             # Practice problems
```

## 🎯 Learning Path

### Phase 1: Dynamic Programming (Week 1-2)

1. **DP Fundamentals** - Overlapping subproblems, optimal substructure
2. **Memoization vs Tabulation** - Top-down vs bottom-up
3. **Common DP Patterns** - Knapsack, LCS, Fibonacci variants
4. **Space Optimization** - Rolling arrays, state compression

### Phase 2: Greedy Algorithms (Week 3)

1. **Greedy Principles** - Local optimal choices
2. **Greedy Proof Techniques** - Exchange arguments
3. **Classic Problems** - Interval scheduling, Huffman coding
4. **When Greedy Fails** - Counterexamples

### Phase 3: Backtracking (Week 4)

1. **Backtracking Framework** - Decision tree exploration
2. **Pruning Techniques** - Early termination
3. **Combinatorial Problems** - Permutations, combinations
4. **Constraint Satisfaction** - Sudoku, N-Queens

### Phase 4: Graph Algorithms (Week 5-6)

1. **Graph Representations** - Adjacency list vs matrix
2. **Traversal Algorithms** - DFS, BFS variations
3. **Shortest Path** - Dijkstra, Bellman-Ford, Floyd-Warshall
4. **Advanced Topics** - MST, Topological sort, Network flow

## 🧩 Dynamic Programming

### Core Concepts

```javascript
// DP has two key properties:
// 1. Optimal Substructure: Solution can be constructed from optimal solutions of subproblems
// 2. Overlapping Subproblems: Same subproblems are solved multiple times

// Example: Fibonacci (Overlapping subproblems)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // fib(3) calculated multiple times
}

// DP Solution: Memoization (Top-down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// DP Solution: Tabulation (Bottom-up)
function fibTab(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

### Common DP Patterns

#### 1. Knapsack Pattern

```javascript
// 0/1 Knapsack: Choose items with max value without exceeding capacity
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

#### 2. Longest Common Subsequence (LCS)

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
```

#### 3. Edit Distance

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

## 🎯 Greedy Algorithms

### Core Principles

```javascript
// Greedy makes locally optimal choices hoping to find global optimum
// Works when: Local optimal leads to global optimal

// Example: Activity Selection Problem
function activitySelection(start, end) {
  const activities = start.map((s, i) => ({ start: s, end: end[i] }));

  // Sort by end time (greedy choice)
  activities.sort((a, b) => a.end - b.end);

  const selected = [];
  let lastEnd = -Infinity;

  for (const activity of activities) {
    if (activity.start >= lastEnd) {
      selected.push(activity);
      lastEnd = activity.end;
    }
  }

  return selected;
}

// Huffman Coding - Greedy for optimal prefix codes
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

function huffmanCoding(charFreqs) {
  const heap = new MinHeap();

  // Create leaf nodes
  for (const [char, freq] of Object.entries(charFreqs)) {
    heap.insert(new HuffmanNode(char, freq));
  }

  // Build Huffman tree
  while (heap.size() > 1) {
    const left = heap.extractMin();
    const right = heap.extractMin();

    const merged = new HuffmanNode(null, left.freq + right.freq, left, right);

    heap.insert(merged);
  }

  return heap.extractMin(); // Root of Huffman tree
}
```

### Classic Greedy Problems

#### 1. Fractional Knapsack

```javascript
function fractionalKnapsack(weights, values, capacity) {
  const items = weights.map((w, i) => ({
    weight: w,
    value: values[i],
    ratio: values[i] / w,
  }));

  // Sort by value/weight ratio (greedy choice)
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;

  for (const item of items) {
    if (remainingCapacity >= item.weight) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      // Take fraction of the item
      totalValue += item.ratio * remainingCapacity;
      break;
    }
  }

  return totalValue;
}
```

#### 2. Dijkstra's Algorithm (Greedy for shortest path)

```javascript
function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const minHeap = new MinHeap();

  // Initialize distances
  for (const vertex of graph.keys()) {
    distances.set(vertex, vertex === start ? 0 : Infinity);
  }

  minHeap.insert({ vertex: start, distance: 0 });

  while (!minHeap.isEmpty()) {
    const { vertex, distance } = minHeap.extractMin();

    if (visited.has(vertex)) continue;
    visited.add(vertex);

    for (const [neighbor, weight] of graph.get(vertex)) {
      const newDistance = distance + weight;

      if (newDistance < distances.get(neighbor)) {
        distances.set(neighbor, newDistance);
        minHeap.insert({ vertex: neighbor, distance: newDistance });
      }
    }
  }

  return distances;
}
```

## 🔄 Backtracking

### Core Framework

```javascript
// Backtracking explores all possibilities by building solutions incrementally
// and abandoning paths that cannot lead to valid solutions

function backtrack(current, options, constraints) {
  // Base case: Found valid solution
  if (isValidSolution(current, constraints)) {
    addSolution(current);
    return;
  }

  // Try each option
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    // Check if this option is valid
    if (isValid(current, option, constraints)) {
      // Make choice
      current.push(option);

      // Recurse
      backtrack(current, options.slice(i + 1), constraints);

      // Undo choice (backtrack)
      current.pop();
    }
  }
}
```

### Classic Backtracking Problems

#### 1. N-Queens Problem

```javascript
function solveNQueens(n) {
  const solutions = [];
  const board = new Array(n).fill(null).map(() => new Array(n).fill("."));

  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }

    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }

    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }

    return true;
  }

  function placeQueens(row) {
    if (row === n) {
      solutions.push(board.map((row) => row.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        placeQueens(row + 1);
        board[row][col] = "."; // Backtrack
      }
    }
  }

  placeQueens(0);
  return solutions;
}
```

#### 2. Subset Generation

```javascript
function generateSubsets(nums) {
  const subsets = [];

  function backtrack(index, current) {
    subsets.push([...current]);

    for (let i = index; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }

  backtrack(0, []);
  return subsets;
}

// Generate permutations
function generatePermutations(nums) {
  const permutations = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      permutations.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(nums[i]);
        backtrack(current);
        current.pop();
        used[i] = false;
      }
    }
  }

  backtrack([]);
  return permutations;
}
```

#### 3. Sudoku Solver

```javascript
function solveSudoku(board) {
  function isValid(row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          for (let num = "1"; num <= "9"; num++) {
            if (isValid(row, col, num)) {
              board[row][col] = num;

              if (solve()) return true;

              board[row][col] = "."; // Backtrack
            }
          }
          return false; // No valid number found
        }
      }
    }
    return true; // Solved
  }

  solve();
  return board;
}
```

## 🕸️ Graph Algorithms

### Graph Representations

```javascript
// Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });
    this.adjacencyList.get(vertex2).push({ vertex: vertex1, weight });
  }

  // DFS Traversal
  dfs(start, visited = new Set()) {
    visited.add(start);
    console.log(start);

    for (const neighbor of this.adjacencyList.get(start)) {
      if (!visited.has(neighbor.vertex)) {
        this.dfs(neighbor.vertex, visited);
      }
    }
  }

  // BFS Traversal
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current);

      for (const neighbor of this.adjacencyList.get(current)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push(neighbor.vertex);
        }
      }
    }
  }
}
```

### Advanced Graph Algorithms

#### 1. Topological Sort

```javascript
function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(vertex) {
    visited.add(vertex);

    for (const neighbor of graph.get(vertex) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    stack.push(vertex);
  }

  for (const vertex of graph.keys()) {
    if (!visited.has(vertex)) {
      dfs(vertex);
    }
  }

  return stack.reverse();
}
```

#### 2. Minimum Spanning Tree (Prim's Algorithm)

```javascript
function primMST(graph) {
  const mst = new Set();
  const minHeap = new MinHeap();
  const start = graph.keys().next().value;

  // Add all edges from start vertex
  for (const { vertex, weight } of graph.get(start)) {
    minHeap.insert({ from: start, to: vertex, weight });
  }

  const visited = new Set([start]);

  while (!minHeap.isEmpty() && mst.size < graph.size - 1) {
    const edge = minHeap.extractMin();

    if (!visited.has(edge.to)) {
      mst.add(edge);
      visited.add(edge.to);

      // Add edges from new vertex
      for (const { vertex, weight } of graph.get(edge.to)) {
        if (!visited.has(vertex)) {
          minHeap.insert({ from: edge.to, to: vertex, weight });
        }
      }
    }
  }

  return mst;
}
```

#### 3. Floyd-Warshall Algorithm (All Pairs Shortest Path)

```javascript
function floydWarshall(graph) {
  const vertices = Array.from(graph.keys());
  const n = vertices.length;

  // Initialize distance matrix
  const dist = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Set initial distances
  for (let i = 0; i < n; i++) {
    const vertex = vertices[i];
    for (const { vertex: neighbor, weight } of graph.get(vertex)) {
      const j = vertices.indexOf(neighbor);
      dist[i][j] = weight;
    }
  }

  // Floyd-Warshall main algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}
```

## 📊 Algorithm Selection Guide

### When to Use Which Technique

#### Dynamic Programming

- **Overlapping subproblems**: Same subproblems solved multiple times
- **Optimal substructure**: Optimal solution contains optimal sub-solutions
- **Examples**: Fibonacci, Knapsack, LCS, Edit Distance

#### Greedy Algorithms

- **Greedy choice property**: Local optimal leads to global optimal
- **No backtracking needed**: Once choice made, never reconsidered
- **Examples**: Activity selection, Huffman coding, Dijkstra

#### Backtracking

- **Combinatorial problems**: Need to explore all possibilities
- **Constraint satisfaction**: Need to satisfy multiple constraints
- **Examples**: N-Queens, Sudoku, Permutations, Subsets

#### Graph Algorithms

- **Network problems**: Routes, connections, flows
- **Relationship problems**: Dependencies, hierarchies
- **Examples**: Shortest path, MST, Topological sort

## 🎯 Problem-Solving Framework

### Step 1: Identify the Pattern

```javascript
function identifyPattern(problem) {
  if (hasOverlappingSubproblems(problem)) return "Dynamic Programming";
  if (hasGreedyChoiceProperty(problem)) return "Greedy Algorithm";
  if (needsCombinatorialSearch(problem)) return "Backtracking";
  if (involvesNetwork(problem)) return "Graph Algorithm";
  return "Basic Algorithm";
}
```

### Step 2: Choose Approach

```javascript
const approaches = {
  "Dynamic Programming": {
    topDown: "Use memoization for natural recursive structure",
    bottomUp: "Use tabulation for iterative solution",
    optimization: "Consider space optimization",
  },
  Greedy: {
    proof: "Prove greedy choice is optimal",
    counterexample: "Look for cases where greedy fails",
  },
  Backtracking: {
    pruning: "Add constraints to reduce search space",
    optimization: "Use heuristics to guide search",
  },
  Graph: {
    representation: "Choose adjacency list vs matrix",
    traversal: "DFS vs BFS based on problem needs",
  },
};
```

### Step 3: Implement and Optimize

```javascript
function optimizeSolution(solution) {
  // Time optimization
  if (solution.time === "exponential") {
    if (hasOverlappingSubproblems) return "Add memoization";
    if (canPruneSearch) return "Add pruning";
  }

  // Space optimization
  if (solution.space === "high") {
    return "Use rolling arrays or state compression";
  }

  return solution;
}
```

## 💪 Practice Problems

### Dynamic Programming

1. **Coin Change** - Minimum coins to make amount
2. **Longest Increasing Subsequence** - LIS length
3. **House Robber** - Max money without adjacent houses
4. **Word Break** - Can word be segmented
5. **Partition Equal Subset Sum** - Equal partition possible

### Greedy Algorithms

1. **Jump Game** - Can reach last index
2. **Candy** - Distribute candies with ratings
3. **Course Schedule** - Course completion order
4. **Task Scheduler** - Minimum intervals for tasks
5. **Reorganize String** - No adjacent same characters

### Backtracking

1. **Combination Sum** - Find combinations that sum to target
2. **Letter Combinations** - Phone keypad combinations
3. **Generate Parentheses** - Valid parentheses
4. **Word Search** - Word in grid
5. **Beautiful Arrangement** - Permutations with constraints

### Graph Algorithms

1. **Course Schedule II** - Find course order
2. **Network Delay Time** - Time for signal to reach all nodes
3. **Cheapest Flights** - Minimum cost within K stops
4. **Redundant Connection** - Find edge to remove
5. **Critical Connections** - Find bridges in graph

## 🎤 Interview Tips

### Advanced Problem Approach

```javascript
function solveAdvancedProblem(problem) {
  // 1. Identify the technique
  const technique = identifyPattern(problem);

  // 2. Start with brute force
  const bruteForce = solveBruteForce(problem);

  // 3. Look for optimizations
  const optimized = optimizeBruteForce(bruteForce, technique);

  // 4. Handle edge cases
  const final = handleEdgeCases(optimized);

  return final;
}
```

### Communication Tips

- **Explain your pattern recognition**: "This looks like a DP problem because..."
- **Show your thought process**: Start with brute force, then optimize
- **Discuss trade-offs**: Time vs space, recursive vs iterative
- **Mention alternative approaches**: Even if you don't implement them

### Common Mistakes to Avoid

- ❌ Not recognizing the pattern
- ❌ Choosing wrong technique
- ❌ Not optimizing properly
- ❌ Forgetting edge cases
- ❌ Not explaining your approach

## 📖 Additional Resources

### Videos

- **MIT 6.006 DP Lectures**: Comprehensive DP coverage
- **Stanford Graph Algorithms**: Advanced graph theory
- **Backtracking Explained**: Problem-solving framework

### Websites

- **Dynamic Programming Patterns**: Common DP templates
- **Graph Algorithm Visualizer**: Interactive graph algorithms
- **LeetCode Discuss**: Community solutions and patterns

### Books

- **"Introduction to Algorithms"**: Advanced algorithm treatment
- **"Algorithm Design"**: Problem-solving strategies
- **"The Algorithm Design Manual"**: Practical approach

---

## 🚀 Getting Started

**Ready to dive in?**

1. **Start with Dynamic Programming** → `./Dynamic-Programming/README.md`
2. **Follow the numbered folders in order**
3. **Master each technique before moving on**
4. **Combine techniques for complex problems**

> 💡 **Key Insight**: Advanced techniques are just systematic ways to approach complex problems. Master the patterns, not just individual problems!

---

## 📊 Progress Checklist

### Dynamic Programming

- [ ] Memoization vs Tabulation
- [ ] Common DP patterns (Knapsack, LCS, etc.)
- [ ] Space optimization techniques
- [ ] State compression
- [ ] DP on trees and graphs

### Greedy Algorithms

- [ ] Greedy proof techniques
- [ ] Activity selection problems
- [ ] Huffman coding
- [ ] Interval scheduling
- [ ] When greedy fails

### Backtracking

- [ ] Backtracking framework
- [ ] Pruning techniques
- [ ] Combinatorial generation
- [ ] Constraint satisfaction
- [ ] Optimization heuristics

### Graph Algorithms

- [ ] Graph representations
- [ ] DFS/BFS variations
- [ ] Shortest path algorithms
- [ ] Minimum spanning trees
- [ ] Advanced graph topics

---

_Last Updated: December 2025_  
_Difficulty: Advanced_  
_Prerequisites: Data Structures, Basic Algorithms_  
_Time Commitment: 4-6 weeks_
