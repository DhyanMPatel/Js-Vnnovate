# 🎯 Greedy Algorithms

> **Making Locally Optimal Choices for Global Solutions**

## 📋 Table of Contents

- [What are Greedy Algorithms?](#what-are-greedy-algorithms)
- [Greedy Algorithm Principles](#greedy-algorithm-principles)
- [When to Use Greedy](#when-to-use-greedy)
- [Greedy Proof Techniques](#greedy-proof-techniques)
- [Classic Greedy Problems](#classic-greedy-problems)
- [Interval Scheduling](#interval-scheduling)
- [Huffman Coding](#huffman-coding)
- [Graph Greedy Algorithms](#graph-greedy-algorithms)
- [Greedy vs Other Paradigms](#greedy-vs-other-paradigms)
- [Common Greedy Patterns](#common-greedy-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Greedy Algorithms?

### Definition

Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum. Unlike dynamic programming, greedy algorithms don't reconsider choices once made.

### Real-World Analogy

```javascript
// Think of greedy like making change with coins:
// Always take the largest coin that doesn't exceed the remaining amount

function makeChange(amount) {
  const coins = [25, 10, 5, 1]; // Quarters, dimes, nickels, pennies
  let remaining = amount;
  const result = [];

  for (const coin of coins) {
    while (remaining >= coin) {
      result.push(coin);
      remaining -= coin;
    }
  }

  return result; // Greedy choice: always take largest possible coin
}

// This works for US currency but fails for coin systems like [1,3,4]
// where greedy would give 4+1 for amount 6, but optimal is 3+3
```

### Why Greedy Matters

- **Efficiency**: Often O(n log n) or O(n) time complexity
- **Simplicity**: Easy to understand and implement
- **Optimality**: Guaranteed optimal for specific problem types
- **Foundation**: Basis for many advanced algorithms

## 🔍 Greedy Algorithm Principles

### Greedy Choice Property

```javascript
// Greedy choice property: Making locally optimal choices
// leads to a globally optimal solution

function greedyProperty(problem) {
  // At each step, make the choice that looks best at the moment
  // Never reconsider that choice
  // Hope that this leads to optimal solution
}
```

### Optimal Substructure

```javascript
// Optimal substructure: Optimal solution contains
// optimal solutions to subproblems

function optimalSubstructure(problem) {
  // The solution to the problem can be constructed from
  // optimal solutions to its subproblems
  // Similar to DP, but without overlapping subproblems
}
```

### Key Characteristics

| Characteristic      | Description                               | Example                                           |
| ------------------- | ----------------------------------------- | ------------------------------------------------- |
| **Local Optimal**   | Choose best option at current step        | Activity selection: pick earliest finishing       |
| **No Backtracking** | Never reconsider choices made             | Huffman coding: always merge smallest frequencies |
| **Irrevocable**     | Once choice made, it's final              | Dijkstra: once vertex visited, distance is final  |
| **Greedy Proof**    | Must prove local optimal → global optimal | Exchange arguments, induction                     |

## 🛠️ When to Use Greedy

### Greedy-Applicable Problems

#### 1. Matroid Structure

```javascript
// If problem can be modeled as a matroid, greedy works
// Matroid: (E, I) where E is ground set, I is independent sets

function matroidGreedy(elements, independentCheck) {
  const solution = [];

  // Sort elements by some criteria
  elements.sort(greedyCriteria);

  for (const element of elements) {
    if (independentCheck(solution, element)) {
      solution.push(element);
    }
  }

  return solution;
}
```

#### 2. Exchange Argument

```javascript
// Can transform any optimal solution into greedy solution
// through a series of exchanges without worsening the solution

function exchangeArgument(greedySolution, optimalSolution) {
  // Show that for any optimal solution,
  // we can exchange elements to match greedy solution
  // without decreasing the objective value
}
```

#### 3. Greedy Stays Ahead

```javascript
// Show that greedy solution is always at least as good
// as any other solution at each step

function greedyStaysAhead(greedySolution, otherSolution) {
  // Prove by induction that after each step,
  // greedy solution is no worse than any other solution
}
```

### When Greedy Fails

```javascript
// Counterexample: Coin change with [1,3,4] for amount 6
function greedyCoinChange(coins, amount) {
  coins.sort((a, b) => b - a); // Sort descending

  let remaining = amount;
  const result = [];

  for (const coin of coins) {
    while (remaining >= coin) {
      result.push(coin);
      remaining -= coin;
    }
  }

  return result; // [4,1,1] = 3 coins (suboptimal)
}

// Optimal solution: [3,3] = 2 coins
```

## 🎯 Greedy Proof Techniques

### 1. Exchange Argument

```javascript
// Activity Selection Problem Proof
function activitySelectionProof() {
  /*
  Greedy: Always select activity with earliest finish time
  
  Proof by exchange argument:
  1. Let G be greedy solution, O be optimal solution
  2. G[1] finishes earliest (by greedy choice)
  3. If O[1] != G[1], exchange O[1] with G[1]
  4. New solution is still optimal (doesn't reduce number of activities)
  5. Continue exchange for all activities
  6. Therefore, greedy solution is optimal
  */
}
```

### 2. Induction

```javascript
// Huffman Coding Proof
function huffmanCodingProof() {
  /*
  Greedy: Always merge two smallest frequency nodes
  
  Proof by induction:
  Base case: For 2 symbols, greedy is optimal
  Inductive step: Assume optimal for k symbols
  For k+1 symbols:
  - Merge two smallest (greedy choice)
  - Recursively solve for remaining k symbols
  - By induction, this is optimal for remaining symbols
  - Therefore, overall solution is optimal
  */
}
```

### 3. Greedy Stays Ahead

```javascript
// Dijkstra's Algorithm Proof
function dijkstraProof() {
  /*
  Greedy: Always visit unvisited vertex with minimum distance
  
  Proof by greedy stays ahead:
  - At each step, greedy algorithm has found shortest paths
    to all visited vertices
  - Any other algorithm cannot have shorter paths to these vertices
  - Therefore, greedy algorithm "stays ahead" and is optimal
  */
}
```

## 🎯 Classic Greedy Problems

### 1. Activity Selection Problem

```javascript
/**
 * Select maximum number of non-overlapping activities
 * Time: O(n log n) for sorting
 * Space: O(n) for activities
 */
function activitySelection(start, end) {
  const activities = start.map((s, i) => ({
    start: s,
    end: end[i],
    index: i,
  }));

  // Greedy choice: sort by end time
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

// Example
const start = [1, 3, 0, 5, 8, 5];
const end = [2, 4, 6, 7, 9, 9];
// Result: [1-2, 5-7, 8-9] = 3 activities
```

### 2. Fractional Knapsack

```javascript
/**
 * Maximum value with fractional items allowed
 * Time: O(n log n) for sorting
 * Space: O(n) for items
 */
function fractionalKnapsack(weights, values, capacity) {
  const items = weights.map((w, i) => ({
    weight: w,
    value: values[i],
    ratio: values[i] / w,
    index: i,
  }));

  // Greedy choice: sort by value/weight ratio
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;
  const selected = [];

  for (const item of items) {
    if (remainingCapacity >= item.weight) {
      // Take whole item
      selected.push({ ...item, fraction: 1 });
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      // Take fraction of item
      const fraction = remainingCapacity / item.weight;
      selected.push({ ...item, fraction });
      totalValue += item.value * fraction;
      break;
    }
  }

  return { totalValue, selected };
}

// Example
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;
// Result: Take all of item 1 (60) and all of item 2 (100) = 160
```

### 3. Job Sequencing Problem

```javascript
/**
 * Schedule jobs to maximize profit with deadlines
 * Time: O(n log n) for sorting + O(n²) for scheduling
 * Space: O(n) for slots
 */
function jobSequencing(jobs) {
  // Sort jobs by profit in descending order
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...jobs.map((job) => job.deadline));
  const slots = new Array(maxDeadline + 1).fill(false);
  const result = [];
  let totalProfit = 0;

  for (const job of jobs) {
    // Find the latest available slot before deadline
    for (let j = job.deadline; j >= 1; j--) {
      if (!slots[j]) {
        slots[j] = true;
        result.push({ ...job, slot: j });
        totalProfit += job.profit;
        break;
      }
    }
  }

  return { totalProfit, scheduledJobs: result };
}

// Example
const jobs = [
  { id: 1, deadline: 2, profit: 100 },
  { id: 2, deadline: 1, profit: 19 },
  { id: 3, deadline: 2, profit: 27 },
  { id: 4, deadline: 1, profit: 25 },
  { id: 5, deadline: 3, profit: 15 },
];
// Result: Schedule jobs 1, 3, 5 = total profit 142
```

## 📅 Interval Scheduling

### 1. Maximum Non-Overlapping Intervals

```javascript
/**
 * Find maximum number of non-overlapping intervals
 * Time: O(n log n)
 * Space: O(n)
 */
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  // Greedy: sort by end time
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= prevEnd) {
      count++;
      prevEnd = intervals[i][1];
    }
  }

  return intervals.length - count; // Minimum intervals to remove
}
```

### 2. Minimum Number of Platforms

```javascript
/**
 * Minimum platforms needed for railway station
 * Time: O(n log n)
 * Space: O(n)
 */
function findPlatforms(arrivals, departures) {
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);

  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0,
    j = 0;

  while (i < arrivals.length && j < departures.length) {
    if (arrivals[i] <= departures[j]) {
      platforms++;
      maxPlatforms = Math.max(maxPlatforms, platforms);
      i++;
    } else {
      platforms--;
      j++;
    }
  }

  return maxPlatforms;
}

// Example
const arrivals = [900, 940, 950, 1100, 1500, 1800];
const departures = [910, 1200, 1120, 1130, 1900, 2000];
// Result: 3 platforms needed
```

### 3. Meeting Rooms

```javascript
/**
 * Minimum meeting rooms required
 * Time: O(n log n)
 * Space: O(n)
 */
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let maxRooms = 0;
  let i = 0,
    j = 0;

  while (i < intervals.length) {
    if (starts[i] < ends[j]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      i++;
    } else {
      rooms--;
      j++;
    }
  }

  return maxRooms;
}
```

## 📡 Huffman Coding

### 1. Huffman Tree Construction

```javascript
/**
 * Build Huffman tree for optimal prefix codes
 * Time: O(n log n)
 * Space: O(n)
 */
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

  // Create leaf nodes for each character
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

function generateCodes(root, code = "", codes = {}) {
  if (root === null) return codes;

  if (root.char !== null) {
    codes[root.char] = code;
  }

  generateCodes(root.left, code + "0", codes);
  generateCodes(root.right, code + "1", codes);

  return codes;
}

// Example
const charFreqs = {
  a: 45,
  b: 13,
  c: 12,
  d: 16,
  e: 9,
  f: 5,
};
const huffmanTree = huffmanCoding(charFreqs);
const codes = generateCodes(huffmanTree);
// Result: a=0, b=101, c=100, d=111, e=1101, f=1100
```

### 2. Huffman Decoding

```javascript
/**
 * Decode Huffman encoded string
 * Time: O(n)
 * Space: O(1)
 */
function huffmanDecode(encoded, root) {
  let current = root;
  let decoded = "";

  for (const bit of encoded) {
    current = bit === "0" ? current.left : current.right;

    if (current.char !== null) {
      decoded += current.char;
      current = root;
    }
  }

  return decoded;
}
```

## 🕸️ Graph Greedy Algorithms

### 1. Dijkstra's Algorithm

```javascript
/**
 * Shortest path from single source
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 */
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

    // Greedy: always pick vertex with minimum distance
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

// Example
const graph = new Map([
  [
    "A",
    [
      ["B", 4],
      ["C", 2],
    ],
  ],
  [
    "B",
    [
      ["C", 1],
      ["D", 5],
    ],
  ],
  [
    "C",
    [
      ["D", 8],
      ["B", 3],
    ],
  ],
  ["D", [["E", 6]]],
  ["E", [["A", 10]]],
]);
// Result: Shortest distances from A
```

### 2. Prim's Algorithm (MST)

```javascript
/**
 * Minimum Spanning Tree using Prim's algorithm
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 */
function primMST(graph) {
  const mst = new Set();
  const minHeap = new MinHeap();
  const visited = new Set();
  const start = graph.keys().next().value;

  // Add all edges from start vertex
  for (const [vertex, weight] of graph.get(start)) {
    minHeap.insert({ from: start, to: vertex, weight });
  }

  visited.add(start);

  while (!minHeap.isEmpty() && mst.size < graph.size - 1) {
    const edge = minHeap.extractMin();

    if (!visited.has(edge.to)) {
      mst.add(edge);
      visited.add(edge.to);

      // Add edges from new vertex
      for (const [vertex, weight] of graph.get(edge.to)) {
        if (!visited.has(vertex)) {
          minHeap.insert({ from: edge.to, to: vertex, weight });
        }
      }
    }
  }

  return mst;
}
```

### 3. Kruskal's Algorithm (MST)

```javascript
/**
 * Minimum Spanning Tree using Kruskal's algorithm
 * Time: O(E log E) for sorting
 * Space: O(V + E)
 */
function kruskalMST(edges, vertices) {
  const mst = [];
  const dsu = new DisjointSetUnion(vertices);

  // Greedy: sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  for (const edge of edges) {
    if (dsu.find(edge.from) !== dsu.find(edge.to)) {
      mst.push(edge);
      dsu.union(edge.from, edge.to);

      if (mst.length === vertices - 1) break;
    }
  }

  return mst;
}

class DisjointSetUnion {
  constructor(vertices) {
    this.parent = new Map();
    this.rank = new Map();

    for (const vertex of vertices) {
      this.parent.set(vertex, vertex);
      this.rank.set(vertex, 0);
    }
  }

  find(vertex) {
    if (this.parent.get(vertex) !== vertex) {
      this.parent.set(vertex, this.find(this.parent.get(vertex)));
    }
    return this.parent.get(vertex);
  }

  union(vertex1, vertex2) {
    const root1 = this.find(vertex1);
    const root2 = this.find(vertex2);

    if (root1 === root2) return;

    if (this.rank.get(root1) < this.rank.get(root2)) {
      this.parent.set(root1, root2);
    } else if (this.rank.get(root1) > this.rank.get(root2)) {
      this.parent.set(root2, root1);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, this.rank.get(root1) + 1);
    }
  }
}
```

## ⚖️ Greedy vs Other Paradigms

### Greedy vs Dynamic Programming

| Aspect                      | Greedy                     | Dynamic Programming               |
| --------------------------- | -------------------------- | --------------------------------- |
| **Optimal Substructure**    | Yes                        | Yes                               |
| **Overlapping Subproblems** | No                         | Yes                               |
| **Choice Reconsideration**  | No                         | Yes                               |
| **Time Complexity**         | Usually better             | Often higher                      |
| **Space Complexity**        | Usually lower              | Often higher                      |
| **Guaranteed Optimal**      | Only for specific problems | Always optimal (if DP applicable) |

```javascript
// Example: Coin Change
// Greedy fails for [1,3,4], amount = 6
function greedyCoinChange(coins, amount) {
  coins.sort((a, b) => b - a);
  let remaining = amount;
  let count = 0;

  for (const coin of coins) {
    while (remaining >= coin) {
      remaining -= coin;
      count++;
    }
  }

  return remaining === 0 ? count : -1; // Returns 3 (4+1+1), but optimal is 2 (3+3)
}

// DP always gives optimal solution
function dpCoinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]; // Returns 2 (3+3)
}
```

### Greedy vs Backtracking

```javascript
// Example: N-Queens (Greedy fails, backtracking works)
function greedyNQueens(n) {
  const board = new Array(n).fill(-1);

  // Greedy: place queen in first available column each row
  for (let row = 0; row < n; row++) {
    let placed = false;
    for (let col = 0; col < n; col++) {
      if (isValid(board, row, col)) {
        board[row] = col;
        placed = true;
        break;
      }
    }
    if (!placed) return null; // Greedy gets stuck
  }

  return board;
}

// Backtracking explores all possibilities
function backtrackNQueens(n) {
  const board = new Array(n).fill(-1);
  const solutions = [];

  function backtrack(row) {
    if (row === n) {
      solutions.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(board, row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1; // Backtrack
      }
    }
  }

  backtrack(0);
  return solutions;
}
```

## 🎯 Common Greedy Patterns

### 1. Sort and Pick

```javascript
/**
 * Pattern: Sort by some criteria, then pick greedily
 * Examples: Activity selection, fractional knapsack
 */
function sortAndPick(items, criteria, constraint) {
  items.sort(criteria);
  const result = [];

  for (const item of items) {
    if (constraint(item, result)) {
      result.push(item);
    }
  }

  return result;
}
```

### 2. Two Pointers

```javascript
/**
 * Pattern: Use two pointers to make greedy choices
 * Examples: Container with most water, meeting rooms
 */
function twoPointers(arr) {
  let left = 0,
    right = arr.length - 1;
  let result = 0;

  while (left < right) {
    // Greedy choice based on current pointers
    result = Math.max(result, calculate(arr, left, right));

    // Move pointers based on greedy criteria
    if (arr[left] < arr[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}
```

### 3. Priority Queue

```javascript
/**
 * Pattern: Use priority queue for greedy selection
 * Examples: Dijkstra, Prim's, Huffman coding
 */
function priorityQueueGreedy(items) {
  const pq = new MinHeap();
  const result = [];

  // Initialize priority queue
  for (const item of items) {
    pq.insert(item);
  }

  while (!pq.isEmpty()) {
    const current = pq.extractMin();

    // Make greedy choice
    if (shouldSelect(current)) {
      result.push(current);
    }

    // Add new candidates to queue
    for (const neighbor of getNeighbors(current)) {
      pq.insert(neighbor);
    }
  }

  return result;
}
```

### 4. Greedy with Exchange Argument

```javascript
/**
 * Pattern: Prove optimality using exchange arguments
 * Examples: Job sequencing, task scheduling
 */
function greedyWithExchange(items) {
  // Sort by greedy criteria
  items.sort(greedyCriteria);

  const solution = [];

  for (const item of items) {
    if (canAdd(solution, item)) {
      solution.push(item);
    }
  }

  return solution;

  // Proof: Show any optimal solution can be transformed
  // into greedy solution without worsening it
}
```

## 🚀 Real-World Applications

### 1. Resource Allocation

```javascript
// CPU Job Scheduling
function scheduleJobs(jobs, processors) {
  // Greedy: assign job to processor with minimum load
  const processorLoads = new Array(processors).fill(0);
  const assignments = new Array(processors).fill(null).map(() => []);

  // Sort jobs by processing time (Longest First)
  jobs.sort((a, b) => b.processingTime - a.processingTime);

  for (const job of jobs) {
    // Find processor with minimum load
    const minProcessor = processorLoads.indexOf(Math.min(...processorLoads));
    assignments[minProcessor].push(job);
    processorLoads[minProcessor] += job.processingTime;
  }

  return { assignments, maxLoad: Math.max(...processorLoads) };
}
```

### 2. Network Routing

```javascript
// Load Balancing
function loadBalance(servers, requests) {
  const serverLoads = new Map();

  // Initialize server loads
  for (const server of servers) {
    serverLoads.set(server, 0);
  }

  // Greedy: assign request to server with minimum load
  for (const request of requests) {
    let minServer = servers[0];
    let minLoad = serverLoads.get(minServer);

    for (const server of servers) {
      const load = serverLoads.get(server);
      if (load < minLoad) {
        minServer = server;
        minLoad = load;
      }
    }

    serverLoads.set(minServer, minLoad + request.weight);
    request.assignedServer = minServer;
  }

  return serverLoads;
}
```

### 3. Data Compression

```javascript
// File Compression using Huffman Coding
function compressFile(data) {
  // Count character frequencies
  const frequencies = {};
  for (const char of data) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  // Build Huffman tree
  const huffmanTree = huffmanCoding(frequencies);
  const codes = generateCodes(huffmanTree);

  // Compress data
  let compressed = "";
  for (const char of data) {
    compressed += codes[char];
  }

  return { compressed, codes, tree: huffmanTree };
}
```

### 4. Financial Optimization

```javascript
// Investment Portfolio Selection
function selectPortfolio(stocks, budget, riskLimit) {
  // Sort by risk-adjusted return (Sharpe ratio)
  stocks.sort((a, b) => b.return / b.risk - a.return / a.risk);

  const portfolio = [];
  let totalCost = 0;
  let totalRisk = 0;

  for (const stock of stocks) {
    if (
      totalCost + stock.price <= budget &&
      totalRisk + stock.risk <= riskLimit
    ) {
      portfolio.push(stock);
      totalCost += stock.price;
      totalRisk += stock.risk;
    }
  }

  return portfolio;
}
```

## 💡 Greedy Problem-Solving Framework

### Step 1: Identify Greedy Nature

```javascript
function isGreedyProblem(problem) {
  // Check for greedy choice property
  if (!hasGreedyChoiceProperty(problem)) return false;

  // Check for optimal substructure
  if (!hasOptimalSubstructure(problem)) return false;

  // Try to find counterexample
  if (findCounterexample(problem)) return false;

  return true;
}
```

### Step 2: Define Greedy Choice

```javascript
function defineGreedyChoice(problem) {
  // What is the locally optimal choice?
  // Examples:
  // - Activity selection: earliest finishing activity
  // - Knapsack: highest value/weight ratio
  // - Huffman: smallest frequency nodes

  return greedyCriteria;
}
```

### Step 3: Prove Optimality

```javascript
function proveOptimality(greedyChoice) {
  // Use one of these proof techniques:

  // 1. Exchange argument
  if (canUseExchangeArgument(greedyChoice)) {
    return proveByExchange(greedyChoice);
  }

  // 2. Induction
  if (canUseInduction(greedyChoice)) {
    return proveByInduction(greedyChoice);
  }

  // 3. Greedy stays ahead
  if (canUseGreedyStaysAhead(greedyChoice)) {
    return proveByGreedyStaysAhead(greedyChoice);
  }

  return false; // Greedy not optimal
}
```

### Step 4: Implement and Test

```javascript
function implementGreedy(greedyChoice, proof) {
  if (!proof) {
    console.log("Warning: Greedy optimality not proven");
  }

  return function solve(input) {
    // Sort by greedy criteria
    const sorted = sortInput(input, greedyChoice);

    // Make greedy choices
    const solution = [];
    for (const item of sorted) {
      if (isValidChoice(solution, item)) {
        solution.push(item);
      }
    }

    return solution;
  };
}
```

## 🚨 Common Greedy Mistakes to Avoid

### Mistake 1: Assuming Greedy Always Works

```javascript
// ❌ Wrong: Greedy always gives optimal solution
function wrongGreedy() {
  // Counterexample: Coin change with [1,3,4], amount 6
  // Greedy gives 4+1+1 (3 coins), optimal is 3+3 (2 coins)
}

// ✅ Correct: Verify greedy choice property
function correctGreedy() {
  // Prove that greedy choice leads to optimal solution
  // Use exchange argument, induction, or greedy stays ahead
}
```

### Mistake 2: Wrong Greedy Criteria

```javascript
// ❌ Wrong: Sort by wrong criteria
function wrongActivitySelection(activities) {
  activities.sort((a, b) => a.start - b.start); // Wrong!
  // Should sort by end time
}

// ✅ Correct: Use right greedy criteria
function correctActivitySelection(activities) {
  activities.sort((a, b) => a.end - b.end); // Correct!
}
```

### Mistake 3: Not Handling Edge Cases

```javascript
// ❌ Wrong: No edge case handling
function wrongGreedy(arr) {
  return arr[0]; // Fails for empty array
}

// ✅ Correct: Handle edge cases
function correctGreedy(arr) {
  if (arr.length === 0) return null;
  return arr[0];
}
```

## 📖 Additional Resources

### Videos

- **Greedy Algorithms Explained**: Comprehensive overview
- **Activity Selection Problem**: Step-by-step solution
- **Huffman Coding**: Visual explanation
- **Dijkstra's Algorithm**: Interactive demonstration

### Websites

- **Greedy Algorithm Patterns**: Common templates
- **Greedy Proof Techniques**: Exchange arguments guide
- **Greedy vs DP Comparison**: When to use which

### Books

- **"Introduction to Algorithms"**: Greedy algorithms chapter
- **"Algorithm Design"**: Greedy strategy analysis
- **"Greedy Algorithms"**: Specialized treatment

---

## 🚀 Getting Started

**Ready to master greedy algorithms?**

1. **Start with Basic Patterns** → `implementation.js`
2. **Practice Classic Problems** → `practice.js`
3. **Learn Proof Techniques** → Exchange arguments, induction
4. **Apply to Real Problems** → Scheduling, routing, compression

> 💡 **Key Insight**: Greedy algorithms are about making the right local choice. Prove that your greedy choice leads to global optimality!

---

## 📊 Progress Checklist

### Basic Greedy Patterns

- [ ] Sort and pick pattern
- [ ] Two pointers greedy
- [ ] Priority queue greedy
- [ ] Exchange argument proofs

### Classic Problems

- [ ] Activity selection
- [ ] Fractional knapsack
- [ ] Job sequencing
- [ ] Huffman coding

### Graph Greedy

- [ ] Dijkstra's algorithm
- [ ] Prim's algorithm (MST)
- [ ] Kruskal's algorithm (MST)
- [ ] Minimum spanning trees

### Advanced Topics

- [ ] Greedy proof techniques
- [ ] Matroid theory
- [ ] Greedy vs DP comparison
- [ ] Real-world applications

---

## 🎯 Interview Focus

### Most Common Greedy Questions

1. **Activity Selection** - 30% of greedy interviews
2. **Interval Problems** - 25% of greedy interviews
3. **Knapsack Variants** - 20% of greedy interviews
4. **Graph Algorithms** - 15% of greedy interviews
5. **Huffman Coding** - 10% of greedy interviews

### Must-Know Greedy Patterns for FAANG

- **Activity Selection**: Earliest finish time greedy
- **Interval Scheduling**: Meeting rooms, platforms
- **Fractional Knapsack**: Value/weight ratio greedy
- **Job Sequencing**: Maximum profit with deadlines
- **Huffman Coding**: Minimum frequency merge greedy
- **Graph Greedy**: Dijkstra, Prim's, Kruskal

---

_Last Updated: December 2025_  
_Difficulty: Advanced_  
_Prerequisites: Sorting, Priority Queues, Basic Algorithms_  
_Time Commitment: 1-2 weeks_
