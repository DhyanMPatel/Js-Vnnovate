# 🔧 Algorithms

> **Systematic Approaches to Problem Solving**

## 📋 Overview

Algorithms are step-by-step procedures for solving problems. Understanding algorithms helps you choose the most efficient approach for any given problem.

## 🗂️ Structure

```
03-Algorithms/
├── README.md                    # This file - Overview
├── Sorting/                     # 📊 Sorting Algorithms
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # Sort implementations
│   └── practice.js             # Practice problems
├── Searching/                  # 🔍 Searching Algorithms
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # Search implementations
│   └── practice.js             # Practice problems
├── Recursion/                  # 🔄 Recursion & Backtracking
│   ├── README.md               # Theory & concepts
│   ├── implementation.js       # Recursive patterns
│   └── practice.js             # Practice problems
└── Tree-Algorithms/            # 🌳 Tree Traversals & Operations
    ├── README.md               # Theory & concepts
    ├── implementation.js       # Tree algorithms
    └── practice.js             # Practice problems
```

## 🎯 Learning Path

### Phase 1: Fundamental Algorithms (Week 1-2)

1. **Sorting Algorithms** - Essential data organization
2. **Searching Algorithms** - Finding data efficiently
3. **Basic Recursion** - Problem decomposition

### Phase 2: Advanced Techniques (Week 3-4)

1. **Advanced Recursion** - Backtracking, divide & conquer
2. **Tree Algorithms** - Traversal, manipulation
3. **Algorithm Design Patterns** - Common approaches

## 📊 Algorithm Categories

### 1. Sorting Algorithms

```
Bubble Sort      - O(n²)   - Simple but inefficient
Selection Sort   - O(n²)   - Consistent comparisons
Insertion Sort   - O(n²)   - Efficient for small/nearly sorted
Merge Sort       - O(n log n) - Stable, divide & conquer
Quick Sort       - O(n log n) avg, O(n²) worst - In-place
Heap Sort        - O(n log n) - In-place, no worst-case
Counting Sort    - O(n + k) - Linear for integers
Radix Sort       - O(d·(n + k)) - Linear for fixed digits
```

### 2. Searching Algorithms

```
Linear Search    - O(n)    - Sequential scan
Binary Search    - O(log n) - Requires sorted data
Jump Search      - O(√n)   - Block-based search
Interpolation    - O(log log n) - Uniform distribution
Exponential Search - O(log n) - Unbounded/infinite arrays
```

### 3. Recursive Patterns

```
Simple Recursion - O(n)    - Linear problems
Divide & Conquer - O(n log n) - Merge sort, quick sort
Backtracking     - O(n!)   - Permutations, combinations
Dynamic Programming - O(n²) - Overlapping subproblems
Memoization      - O(n)    - Top-down DP
Tabulation       - O(n)    - Bottom-up DP
```

### 4. Tree Algorithms

```
DFS Traversal    - O(n)    - Pre-order, in-order, post-order
BFS Traversal    - O(n)    - Level-order
Binary Search    - O(log n) - BST operations
Tree Balancing   - O(log n) - AVL, Red-Black
Trie Operations  - O(k)    - k = string length
```

## 🔑 Key Concepts to Master

### For Each Algorithm:

1. **Understanding the Approach**

   - What problem does it solve?
   - How does it work conceptually?
   - What are the key insights?

2. **Implementation Details**

   - Code the algorithm from scratch
   - Handle edge cases properly
   - Optimize for time and space

3. **Complexity Analysis**

   - Time complexity (best, average, worst)
   - Space complexity
   - Trade-offs and limitations

4. **Use Cases**

   - When to use this algorithm
   - Real-world applications
   - Interview scenarios

5. **Comparison with Alternatives**
   - Pros vs cons
   - When to choose alternatives
   - Performance characteristics

## 💡 Algorithm Design Strategies

### 1. Brute Force

```javascript
// Try all possibilities
function bruteForce(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
// Time: O(n²), Space: O(1)
```

### 2. Greedy Approach

```javascript
// Make locally optimal choices
function greedyCoins(amount) {
  const coins = [25, 10, 5, 1];
  const result = [];

  for (const coin of coins) {
    while (amount >= coin) {
      result.push(coin);
      amount -= coin;
    }
  }

  return result;
}
// Time: O(n), Space: O(k) where k = coins used
```

### 3. Divide and Conquer

```javascript
// Break problem into subproblems
function divideAndConquer(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = divideAndConquer(arr.slice(0, mid));
  const right = divideAndConquer(arr.slice(mid));

  return combine(left, right);
}
// Time: O(n log n), Space: O(log n) for recursion
```

### 4. Dynamic Programming

```javascript
// Build solution from subproblems
function dpFibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
// Time: O(n), Space: O(n) or O(1) optimized
```

## 🎯 Common Algorithm Patterns

### 1. Two Pointers

```javascript
// Efficient for sorted arrays
function twoPointers(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return [];
}
```

### 2. Sliding Window

```javascript
// Fixed or variable size window
function slidingWindow(arr, k) {
  let max = 0,
    windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  max = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    max = Math.max(max, windowSum);
  }

  return max;
}
```

### 3. Frequency Counting

```javascript
// Hash map for counting
function frequencyCount(arr) {
  const count = new Map();

  for (const item of arr) {
    count.set(item, (count.get(item) || 0) + 1);
  }

  return count;
}
```

### 4. BFS/DFS Traversal

```javascript
// Graph/tree traversal patterns
function bfs(root) {
  const queue = [root];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    visited.add(current);

    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
}

function dfs(node) {
  if (!node) return;

  // Process node
  console.log(node.value);

  // Recurse on children
  for (const child of node.children) {
    dfs(child);
  }
}
```

## 📈 Algorithm Selection Guide

### When to Use Which Algorithm

#### Sorting:

- **Small arrays (< 100)**: Insertion sort
- **Nearly sorted**: Insertion sort
- **Must be stable**: Merge sort
- **Average case performance**: Quick sort
- **Worst case guaranteed**: Heap sort
- **Integer range limited**: Counting sort

#### Searching:

- **Unsorted data**: Linear search
- **Sorted data**: Binary search
- **Frequent insertions**: Binary search tree
- **Range queries**: Segment tree
- **String patterns**: KMP algorithm

#### Problem Types:

- **Optimization**: Dynamic programming
- **All possibilities**: Backtracking
- **Divisible problems**: Divide and conquer
- **Best immediate choice**: Greedy

## 🚨 Common Mistakes to Avoid

### Algorithm Mistakes

- ❌ Not considering edge cases
- ❌ Wrong complexity analysis
- ❌ Not handling overflow/underflow
- ❌ Infinite recursion
- ❌ Off-by-one errors

### Implementation Mistakes

- ❌ Not testing with small inputs
- ❌ Not handling empty/null inputs
- ❌ Memory leaks in recursive solutions
- ❌ Not optimizing obvious bottlenecks

### Interview Mistakes

- ❌ Jumping to code without planning
- ❌ Not discussing alternative approaches
- ❌ Not explaining time/space complexity
- ❌ Not testing with examples

## 📖 Additional Resources

### Videos

- **Algorithm Visualizations**: Visual explanations
- **MIT 6.006**: Complete algorithms course
- **Stanford Algorithms**: Advanced topics

### Websites

- **VisuAlgo**: Interactive algorithm visualizations
- **Algorithm-Designer**: Practice algorithm design
- **GeeksforGeeks**: Comprehensive algorithm library

### Books

- **"Introduction to Algorithms" (CLRS)**: The algorithms bible
- **"Algorithm Design Manual"**: Practical approach
- **"Programming Interviews Exposed"**: Interview focused

## 🎓 What You Need from Other Resources

### Mathematical Foundations

- **Discrete Mathematics**: Set theory, logic
- **Probability**: Randomized algorithms
- **Linear Algebra**: Matrix algorithms
- **Number Theory**: Cryptographic algorithms

### Advanced Topics

- **Approximation Algorithms**: NP-hard problems
- **Parallel Algorithms**: Multi-threading
- **Online Algorithms**: Real-time processing
- **Streaming Algorithms**: Big data processing

---

## 🚀 Getting Started

**Ready to dive in?**

1. **Start with Sorting** → `./Sorting/README.md`
2. **Follow the numbered folders in order**
3. **Implement every algorithm yourself**
4. **Solve all practice problems**

> 💡 **Key Insight**: Algorithms teach you _how to think_ about problems systematically. Master the patterns, not just the implementations!

---

## 📊 Progress Checklist

### Sorting Algorithms

- [ ] Bubble Sort & Selection Sort
- [ ] Insertion Sort
- [ ] Merge Sort & Quick Sort
- [ ] Heap Sort
- [ ] Linear Sorting (Counting, Radix)
- [ ] Comparison and analysis

### Searching Algorithms

- [ ] Linear Search & Binary Search
- [ ] Jump Search & Interpolation Search
- [ ] Exponential Search
- [ ] Tree-based searching
- [ ] Hash-based searching

### Recursion & Backtracking

- [ ] Basic recursion patterns
- [ ] Divide and conquer
- [ ] Backtracking techniques
- [ ] Memoization
- [ ] Dynamic programming basics

### Tree Algorithms

- [ ] DFS traversals (pre, in, post)
- [ ] BFS traversal
- [ ] Binary search tree operations
- [ ] Tree balancing concepts
- [ ] Trie operations

---

## 🎯 Interview Focus

### Most Common Algorithm Questions

1. **Sorting** - 60% of interviews
2. **Searching** - 50% of interviews
3. **Recursion/DP** - 40% of interviews
4. **Tree Traversal** - 35% of interviews
5. **Graph Algorithms** - 25% of interviews

### Must-Know Algorithms for FAANG

- **Sorting**: Quick sort, Merge sort
- **Searching**: Binary search, BFS/DFS
- **Dynamic Programming**: Classic DP problems
- **Greedy**: Interval scheduling, Huffman coding
- **Graph**: Dijkstra, Topological sort

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Data Structures_  
_Time Commitment: 3-4 weeks_
