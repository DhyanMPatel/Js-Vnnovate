# 🔍 Backtracking

> **Exploring All Possibilities Through Systematic Search**

## 📋 Table of Contents

- [What is Backtracking?](#what-is-backtracking)
- [Backtracking Fundamentals](#backtracking-fundamentals)
- [Backtracking vs Other Paradigms](#backtracking-vs-other-paradigms)
- [Core Backtracking Pattern](#core-backtracking-pattern)
- [Permutation Problems](#permutation-problems)
- [Combination Problems](#combination-problems)
- [Subset Problems](#subset-problems)
- [String Backtracking](#string-backtracking)
- [Grid Backtracking](#grid-backtracking)
- [Optimization Techniques](#optimization-techniques)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What is Backtracking?

### Definition

Backtracking is a systematic algorithmic technique for finding all (or some) solutions to computational problems, particularly constraint satisfaction problems. It builds candidates incrementally and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot be extended to a valid solution.

### Real-World Analogy

```javascript
// Think of backtracking like solving a maze:
// 1. Choose a path and move forward
// 2. If you hit a dead end, go back to the last intersection
// 3. Try a different path from that intersection
// 4. Repeat until you find the exit or explore all possibilities

function solveMaze(maze, position, visited) {
  if (isExit(position)) return [position]; // Found solution

  if (visited.has(position) || isWall(position)) return null; // Dead end

  visited.add(position);

  // Try all possible directions
  for (const direction of directions) {
    const newPosition = move(position, direction);
    const solution = solveMaze(maze, newPosition, visited);

    if (solution) {
      return [position, ...solution]; // Found path
    }
  }

  visited.delete(position); // Backtrack
  return null; // No solution from this position
}
```

### Why Backtracking Matters

- **Exhaustive Search**: Guarantees finding all solutions
- **Constraint Satisfaction**: Perfect for problems with constraints
- **Optimization**: Can find optimal solutions through enumeration
- **Foundation**: Basis for many advanced algorithms
- **Interview Essential**: Frequently tested for combinatorial problems

## 🔍 Backtracking Fundamentals

### Core Components

#### 1. State Space

```javascript
// State represents current position in search
const state = {
  current: [], // Current partial solution
  used: new Set(), // Used elements/resources
  constraints: {}, // Current constraint violations
  cost: 0, // Current solution cost (for optimization)
};
```

#### 2. Decision Tree

```javascript
// Each level represents a decision
// Each branch represents a choice
// Each leaf represents a complete solution or dead end

function decisionTree(depth, maxDepth) {
  if (depth === maxDepth) {
    // Leaf node - check if valid solution
    return isValidSolution() ? solution : null;
  }

  // Branch - try all possible choices
  for (const choice of availableChoices) {
    makeChoice(choice);
    const result = decisionTree(depth + 1, maxDepth);
    if (result) return result;
    undoChoice(choice); // Backtrack
  }

  return null; // No solution found
}
```

#### 3. Pruning

```javascript
// Prune branches that cannot lead to valid solutions
function canPrune(state) {
  // Check if current state violates constraints
  if (violatesConstraints(state)) return true;

  // Check if remaining resources insufficient
  if (insufficientResources(state)) return true;

  // Check if best possible is worse than current best
  if (cannotBeatBest(state, bestSolution)) return true;

  return false;
}
```

### Backtracking Characteristics

| Characteristic  | Description                              | Example                                   |
| --------------- | ---------------------------------------- | ----------------------------------------- |
| **Systematic**  | Explores search space methodically       | N-Queens: try each row systematically     |
| **Incremental** | Builds solution step by step             | Sudoku: fill one cell at a time           |
| **Reversible**  | Can undo choices easily                  | Permutations: remove last element         |
| **Prunable**    | Can eliminate invalid paths early        | Subset sum: stop if sum exceeds target    |
| **Complete**    | Finds all solutions or proves none exist | Graph coloring: try all color assignments |

## ⚖️ Backtracking vs Other Paradigms

### Backtracking vs Greedy

```javascript
// Backtracking explores all possibilities
function backtrackingApproach(items) {
  const solutions = [];

  function backtrack(index, current) {
    if (index === items.length) {
      if (isValid(current)) solutions.push([...current]);
      return;
    }

    // Try including item
    current.push(items[index]);
    backtrack(index + 1, current);
    current.pop(); // Backtrack

    // Try excluding item
    backtrack(index + 1, current);
  }

  backtrack(0, []);
  return solutions;
}

// Greedy makes locally optimal choices
function greedyApproach(items) {
  const solution = [];

  for (const item of items) {
    if (canAdd(solution, item)) {
      solution.push(item); // Irrevocable choice
    }
  }

  return solution;
}
```

### Backtracking vs Dynamic Programming

```javascript
// Backtracking with memoization (Top-down DP)
function backtrackingWithMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] =
    backtrackingWithMemo(n - 1, memo) + backtrackingWithMemo(n - 2, memo);
  return memo[n];
}

// Pure backtracking (no memoization)
function backtrackingOnly(n) {
  if (n <= 1) return n;

  return backtrackingOnly(n - 1) + backtrackingOnly(n - 1); // Inefficient!
}
```

### Backtracking vs Branch and Bound

```javascript
// Backtracking: stop at first solution or explore all
function backtracking(state) {
  if (isComplete(state)) return state;

  for (const choice of choices) {
    if (isValid(choice)) {
      makeChoice(choice);
      const result = backtracking(state);
      if (result) return result;
      undoChoice(choice);
    }
  }

  return null;
}

// Branch and bound: use bounds to prune
function branchAndBound(state, bestSoFar) {
  if (isComplete(state)) return state;

  // Prune if cannot beat best so far
  if (upperBound(state) <= bestSoFar) return null;

  for (const choice of choices) {
    if (isValid(choice)) {
      makeChoice(choice);
      const result = branchAndBound(state, bestSoFar);
      if (result) return result;
      undoChoice(choice);
    }
  }

  return null;
}
```

## 🎯 Core Backtracking Pattern

### Template Structure

```javascript
/**
 * General Backtracking Template
 * Time: O(b^d) where b is branching factor, d is depth
 * Space: O(d) for recursion stack
 */
function backtrackTemplate(parameters) {
  const results = [];

  function backtrack(state, parameters) {
    // Base case: complete solution found
    if (isComplete(state)) {
      results.push(clone(state));
      return;
    }

    // Generate possible choices
    const choices = generateChoices(state, parameters);

    for (const choice of choices) {
      // Make choice
      makeChoice(state, choice);

      // Pruning: check if this path is promising
      if (isValid(state)) {
        backtrack(state, parameters);
      }

      // Undo choice (backtrack)
      undoChoice(state, choice);
    }
  }

  // Initialize state
  const initialState = initializeState(parameters);
  backtrack(initialState, parameters);

  return results;
}

// Helper functions
function isComplete(state) {
  // Check if current state represents a complete solution
}

function generateChoices(state, parameters) {
  // Generate all possible next choices
}

function makeChoice(state, choice) {
  // Apply choice to current state
}

function undoChoice(state, choice) {
  // Remove choice from current state
}

function isValid(state) {
  // Check if current state is valid (doesn't violate constraints)
}
```

### Optimization Backtracking

```javascript
/**
 * Backtracking for Optimization Problems
 * Find optimal solution (minimum/maximum)
 */
function backtrackOptimization(parameters) {
  let bestSolution = null;
  let bestValue = parameters.isMinimization ? Infinity : -Infinity;

  function backtrack(state, parameters) {
    // Base case: complete solution
    if (isComplete(state)) {
      const value = evaluate(state);

      if (
        (parameters.isMinimization && value < bestValue) ||
        (!parameters.isMinimization && value > bestValue)
      ) {
        bestSolution = clone(state);
        bestValue = value;
      }
      return;
    }

    // Pruning with bounds
    const bound = calculateBound(state, parameters);
    if (
      (parameters.isMinimization && bound >= bestValue) ||
      (!parameters.isMinimization && bound <= bestValue)
    ) {
      return; // Prune - cannot improve best solution
    }

    const choices = generateChoices(state, parameters);

    for (const choice of choices) {
      makeChoice(state, choice);

      if (isValid(state)) {
        backtrack(state, parameters);
      }

      undoChoice(state, choice);
    }
  }

  const initialState = initializeState(parameters);
  backtrack(initialState, parameters);

  return { solution: bestSolution, value: bestValue };
}
```

## 🔄 Permutation Problems

### Basic Permutations

```javascript
/**
 * Generate all permutations of array elements
 * Time: O(n! * n) for generating all permutations
 * Space: O(n) for recursion stack + O(n) for current permutation
 */
function permute(nums) {
  const results = [];

  function backtrack(first = 0) {
    // Base case: all elements are fixed
    if (first === nums.length) {
      results.push([...nums]);
      return;
    }

    // Generate permutations for position 'first'
    for (let i = first; i < nums.length; i++) {
      // Place i-th element at 'first' position
      [nums[first], nums[i]] = [nums[i], nums[first]];

      // Recurse for next position
      backtrack(first + 1);

      // Backtrack: restore original order
      [nums[first], nums[i]] = [nums[i], nums[first]];
    }
  }

  backtrack();
  return results;
}

// Example: permute([1,2,3]) → [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### Permutations with Duplicates

```javascript
/**
 * Generate unique permutations with duplicate elements
 * Time: O(n! * n) in worst case, but prunes many branches
 * Space: O(n) for recursion stack + O(n) for current permutation
 */
function permuteUnique(nums) {
  const results = [];
  nums.sort((a, b) => a - b); // Sort to handle duplicates

  function backtrack(first = 0) {
    if (first === nums.length) {
      results.push([...nums]);
      return;
    }

    const used = new Set();

    for (let i = first; i < nums.length; i++) {
      // Skip duplicates
      if (used.has(nums[i])) continue;
      used.add(nums[i]);

      [nums[first], nums[i]] = [nums[i], nums[first]];
      backtrack(first + 1);
      [nums[first], nums[i]] = [nums[i], nums[first]];
    }
  }

  backtrack();
  return results;
}
```

### Permutation with Constraints

```javascript
/**
 * Generate permutations with constraints
 * Example: Beautiful arrangement where nums[i] % i == 0 or i % nums[i] == 0
 */
function beautifulArrangement(n) {
  const results = [];
  const used = new Array(n + 1).fill(false);

  function backtrack(position) {
    if (position > n) {
      results.push([...current]);
      return;
    }

    for (let num = 1; num <= n; num++) {
      if (!used[num] && (num % position === 0 || position % num === 0)) {
        used[num] = true;
        current.push(num);

        backtrack(position + 1);

        current.pop();
        used[num] = false;
      }
    }
  }

  const current = [];
  backtrack(1);
  return results.length; // Return count
}
```

## 🎯 Combination Problems

### Basic Combinations

```javascript
/**
 * Generate all combinations of k elements from n elements
 * Time: O(C(n,k) * k) where C(n,k) is binomial coefficient
 * Space: O(k) for recursion stack + O(k) for current combination
 */
function combine(n, k) {
  const results = [];

  function backtrack(start, path) {
    // Base case: found k elements
    if (path.length === k) {
      results.push([...path]);
      return;
    }

    // Pruning: not enough elements remaining
    for (let i = start; i <= n; i++) {
      // Early termination: if remaining elements insufficient
      if (n - i + 1 < k - path.length) break;

      path.push(i);
      backtrack(i + 1, path);
      path.pop(); // Backtrack
    }
  }

  backtrack(1, []);
  return results;
}

// Example: combine(4, 2) → [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
```

### Combination Sum

```javascript
/**
 * Find all combinations that sum to target
 * Elements can be used unlimited times
 * Time: O(n^(target/min)) in worst case
 * Space: O(target/min) for recursion stack
 */
function combinationSum(candidates, target) {
  const results = [];
  candidates.sort((a, b) => a - b); // Sort for pruning

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      results.push([...path]);
      return;
    }

    if (remaining < 0) return; // Prune: sum exceeded target

    for (let i = start; i < candidates.length; i++) {
      const num = candidates[i];

      // Pruning: if number is too large, break (array is sorted)
      if (num > remaining) break;

      path.push(num);
      backtrack(i, remaining - num, path); // Can reuse same element
      path.pop(); // Backtrack
    }
  }

  backtrack(0, target, []);
  return results;
}

// Example: combinationSum([2,3,6,7], 7) → [[2,2,3], [7]]
```

### Combination Sum II

```javascript
/**
 * Find combinations that sum to target
 * Each element can be used only once
 * Handle duplicates in candidates
 */
function combinationSum2(candidates, target) {
  const results = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // Skip duplicates
      if (i > start && candidates[i] === candidates[i - 1]) continue;

      const num = candidates[i];
      if (num > remaining) break; // Pruning

      path.push(num);
      backtrack(i + 1, remaining - num, path); // Move to next element
      path.pop();
    }
  }

  backtrack(0, target, []);
  return results;
}
```

## 📦 Subset Problems

### All Subsets

```javascript
/**
 * Generate all subsets (power set)
 * Time: O(2^n * n) for generating all subsets
 * Space: O(n) for recursion stack
 */
function subsets(nums) {
  const results = [];

  function backtrack(index, path) {
    // Add current subset
    results.push([...path]);

    // Generate subsets that include remaining elements
    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop(); // Backtrack
    }
  }

  backtrack(0, []);
  return results;
}

// Example: subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### Subsets with Duplicates

```javascript
/**
 * Generate all subsets with duplicate elements
 * Time: O(2^n * n) in worst case
 * Space: O(n) for recursion stack
 */
function subsetsWithDup(nums) {
  const results = [];
  nums.sort((a, b) => a - b); // Sort to handle duplicates

  function backtrack(index, path) {
    results.push([...path]);

    for (let i = index; i < nums.length; i++) {
      // Skip duplicates
      if (i > index && nums[i] === nums[i - 1]) continue;

      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return results;
}
```

### Letter Case Permutation

```javascript
/**
 * Generate all letter case permutations
 * Time: O(2^k * n) where k is number of letters
 * Space: O(n) for recursion stack
 */
function letterCasePermutation(s) {
  const results = [];

  function backtrack(index, path) {
    if (index === s.length) {
      results.push(path);
      return;
    }

    const char = s[index];

    if (/[a-zA-Z]/.test(char)) {
      // Try lowercase
      backtrack(index + 1, path + char.toLowerCase());

      // Try uppercase
      backtrack(index + 1, path + char.toUpperCase());
    } else {
      // Digit, only one choice
      backtrack(index + 1, path + char);
    }
  }

  backtrack(0, "");
  return results;
}

// Example: letterCasePermutation("a1b2") → ["a1b2", "a1B2", "A1b2", "A1B2"]
```

## 🔤 String Backtracking

### Palindrome Partitioning

```javascript
/**
 * Partition string into substrings that are palindromes
 * Time: O(n * 2^n) in worst case
 * Space: O(n) for recursion stack
 */
function partition(s) {
  const results = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, path) {
    if (start === s.length) {
      results.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.substring(start, end + 1));
        backtrack(end + 1, path);
        path.pop(); // Backtrack
      }
    }
  }

  backtrack(0, []);
  return results;
}

// Example: partition("aab") → [["a","a","b"], ["aa","b"]]
```

### Word Search

```javascript
/**
 * Find if word exists in grid
 * Time: O(m * n * 4^L) where L is word length
 * Space: O(L) for recursion stack
 */
function exist(board, word) {
  const m = board.length,
    n = board[0].length;

  function dfs(row, col, index) {
    // Base cases
    if (index === word.length) return true;
    if (
      row < 0 ||
      row >= m ||
      col < 0 ||
      col >= n ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    // Mark as visited
    const temp = board[row][col];
    board[row][col] = "#";

    // Explore all directions
    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    // Restore
    board[row][col] = temp;

    return found;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}
```

### Word Search II

```javascript
/**
 * Find all words in grid using Trie for optimization
 * Time: O(m * n * 4^L) but heavily pruned
 * Space: O(total word length) for Trie
 */
function findWords(board, words) {
  const results = new Set();
  const m = board.length,
    n = board[0].length;

  // Build Trie
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  function dfs(row, col, node, path) {
    if (
      row < 0 ||
      row >= m ||
      col < 0 ||
      col >= n ||
      !node.children.has(board[row][col])
    ) {
      return;
    }

    const char = board[row][col];
    const nextNode = node.children.get(char);
    path += char;

    if (nextNode.isWord) {
      results.add(path);
    }

    // Mark as visited
    board[row][col] = "#";

    // Explore all directions
    dfs(row + 1, col, nextNode, path);
    dfs(row - 1, col, nextNode, path);
    dfs(row, col + 1, nextNode, path);
    dfs(row, col - 1, nextNode, path);

    // Restore
    board[row][col] = char;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, trie.root, "");
    }
  }

  return Array.from(results);
}

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }
}
```

## 🎮 Grid Backtracking

### N-Queens Problem

```javascript
/**
 * Place N queens on N×N chessboard
 * Time: O(N!) for generating all solutions
 * Space: O(N) for recursion stack + O(N) for tracking
 */
function solveNQueens(n) {
  const results = [];
  const board = new Array(n).fill(null).map(() => new Array(n).fill("."));
  const cols = new Set();
  const posDiag = new Set(); // r + c
  const negDiag = new Set(); // r - c

  function backtrack(row) {
    if (row === n) {
      // Found solution
      const solution = board.map((row) => row.join(""));
      results.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      // Check if position is safe
      if (cols.has(col) || posDiag.has(row + col) || negDiag.has(row - col)) {
        continue;
      }

      // Place queen
      board[row][col] = "Q";
      cols.add(col);
      posDiag.add(row + col);
      negDiag.add(row - col);

      backtrack(row + 1);

      // Backtrack
      board[row][col] = ".";
      cols.delete(col);
      posDiag.delete(row + col);
      negDiag.delete(row - col);
    }
  }

  backtrack(0);
  return results;
}

// Example: solveNQueens(4) → 2 solutions
```

### Sudoku Solver

```javascript
/**
 * Solve Sudoku puzzle
 * Time: O(9^(81)) worst case, but much faster in practice
 * Space: O(81) for recursion stack
 */
function solveSudoku(board) {
  function isValid(row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3×3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();

            if (isValid(row, col, numStr)) {
              board[row][col] = numStr;

              if (solve()) {
                return true;
              }

              board[row][col] = "."; // Backtrack
            }
          }

          return false; // No valid number found
        }
      }
    }

    return true; // Puzzle solved
  }

  solve();
}
```

### Knights Tour

```javascript
/**
 * Find Knight's tour on chessboard
 * Time: O(8^(n*m)) worst case
 * Space: O(n*m) for recursion stack
 */
function knightsTour(n, m) {
  const board = new Array(n).fill(null).map(() => new Array(m).fill(false));
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  function isValidMove(row, col) {
    return row >= 0 && row < n && col >= 0 && col < m && !board[row][col];
  }

  function solve(row, col, moveCount) {
    board[row][col] = moveCount;

    if (moveCount === n * m) {
      return true; // Tour complete
    }

    // Try all 8 possible moves
    for (const [dr, dc] of moves) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (isValidMove(newRow, newCol)) {
        if (solve(newRow, newCol, moveCount + 1)) {
          return true;
        }
      }
    }

    board[row][col] = false; // Backtrack
    return false;
  }

  // Start from position (0, 0)
  if (solve(0, 0, 1)) {
    return board;
  }

  return null; // No solution found
}
```

## ⚡ Optimization Techniques

### 1. Pruning Strategies

```javascript
// Early termination based on constraints
function pruneWithConstraints(state, target) {
  // Prune if current sum exceeds target
  if (state.sum > target) return true;

  // Prune if not enough elements remaining
  if (state.remaining < target - state.sum) return true;

  // Prune if current path violates constraints
  if (violatesConstraints(state)) return true;

  return false;
}

// Pruning with heuristics
function pruneWithHeuristics(state, best) {
  // Prune if optimistic bound is worse than best solution
  const optimisticBound = calculateOptimisticBound(state);
  if (optimisticBound <= best) return true;

  // Prune using ordering heuristics
  if (shouldPruneBasedOnOrdering(state)) return true;

  return false;
}
```

### 2. Memoization in Backtracking

```javascript
// Cache subproblem results
function backtrackWithMemo(state, memo = new Map()) {
  const key = serializeState(state);

  if (memo.has(key)) {
    return memo.get(key);
  }

  if (isComplete(state)) {
    return evaluate(state);
  }

  let best = null;

  for (const choice of getChoices(state)) {
    makeChoice(state, choice);

    if (isValid(state)) {
      const result = backtrackWithMemo(state, memo);
      best = updateBest(best, result);
    }

    undoChoice(state, choice);
  }

  memo.set(key, best);
  return best;
}
```

### 3. Iterative Deepening

```javascript
// Limit search depth and increase gradually
function iterativeDeepening(problem) {
  let maxDepth = 1;

  while (true) {
    const solution = depthLimitedSearch(problem, maxDepth);

    if (solution) return solution;

    maxDepth++;

    // Safety check
    if (maxDepth > problem.maxPossibleDepth) {
      return null;
    }
  }
}

function depthLimitedSearch(problem, maxDepth) {
  function backtrack(state, depth) {
    if (depth > maxDepth) return null;
    if (isComplete(state)) return state;

    for (const choice of getChoices(state)) {
      makeChoice(state, choice);

      if (isValid(state)) {
        const result = backtrack(state, depth + 1);
        if (result) return result;
      }

      undoChoice(state, choice);
    }

    return null;
  }

  return backtrack(problem.initialState, 0);
}
```

### 4. Branch and Bound

```javascript
// Use bounds to prune search space
function branchAndBound(state, bestSoFar) {
  if (isComplete(state)) {
    return evaluate(state);
  }

  // Calculate optimistic bound
  const bound = calculateBound(state);

  // Prune if cannot improve best solution
  if (bound <= bestSoFar) {
    return bestSoFar;
  }

  // Order choices by heuristic
  const choices = orderChoicesByHeuristic(getChoices(state));

  for (const choice of choices) {
    makeChoice(state, choice);

    if (isValid(state)) {
      const result = branchAndBound(state, bestSoFar);
      bestSoFar = updateBest(bestSoFar, result);
    }

    undoChoice(state, choice);
  }

  return bestSoFar;
}
```

## 🚀 Real-World Applications

### 1. Constraint Satisfaction

```javascript
// Course scheduling with constraints
function scheduleCourses(courses, constraints) {
  const schedule = new Array(courses.length).fill(null);
  const timeSlots = generateTimeSlots();

  function backtrack(courseIndex) {
    if (courseIndex === courses.length) {
      return isValidSchedule(schedule, constraints);
    }

    for (const timeSlot of timeSlots) {
      if (canSchedule(courses[courseIndex], timeSlot, schedule)) {
        schedule[courseIndex] = timeSlot;

        if (backtrack(courseIndex + 1)) {
          return true;
        }

        schedule[courseIndex] = null; // Backtrack
      }
    }

    return false;
  }

  return backtrack(0) ? schedule : null;
}
```

### 2. Resource Allocation

```javascript
// Allocate resources to projects optimally
function allocateResources(resources, projects) {
  const allocation = new Map();

  function backtrack(projectIndex, availableResources) {
    if (projectIndex === projects.length) {
      return evaluateAllocation(allocation);
    }

    let bestAllocation = null;
    let bestValue = -Infinity;

    for (const resource of availableResources) {
      if (canAllocate(resource, projects[projectIndex])) {
        // Allocate resource
        allocation.set(projects[projectIndex], resource);
        const newAvailable = availableResources.filter((r) => r !== resource);

        const value = backtrack(projectIndex + 1, newAvailable);

        if (value > bestValue) {
          bestValue = value;
          bestAllocation = new Map(allocation);
        }

        // Backtrack
        allocation.delete(projects[projectIndex]);
      }
    }

    return bestValue;
  }

  return backtrack(0, resources);
}
```

### 3. Path Finding

```javascript
// Find all paths in graph from source to target
function findAllPaths(graph, source, target) {
  const paths = [];
  const visited = new Set();

  function backtrack(current, path) {
    if (current === target) {
      paths.push([...path]);
      return;
    }

    visited.add(current);

    for (const neighbor of graph.get(current) || []) {
      if (!visited.has(neighbor)) {
        path.push(neighbor);
        backtrack(neighbor, path);
        path.pop(); // Backtrack
      }
    }

    visited.delete(current);
  }

  backtrack(source, [source]);
  return paths;
}
```

### 4. Configuration Generation

```javascript
// Generate all valid configurations
function generateConfigurations(components, constraints) {
  const configurations = [];

  function backtrack(componentIndex, currentConfig) {
    if (componentIndex === components.length) {
      if (isValidConfiguration(currentConfig, constraints)) {
        configurations.push([...currentConfig]);
      }
      return;
    }

    const component = components[componentIndex];

    for (const option of component.options) {
      currentConfig.push(option);

      // Prune if current partial configuration violates constraints
      if (isValidPartialConfiguration(currentConfig, constraints)) {
        backtrack(componentIndex + 1, currentConfig);
      }

      currentConfig.pop(); // Backtrack
    }
  }

  backtrack(0, []);
  return configurations;
}
```

## 💡 Backtracking Problem-Solving Framework

### Step 1: Identify Backtracking Nature

```javascript
function isBacktrackingProblem(problem) {
  // Check for combinatorial nature
  if (!isCombinatorial(problem)) return false;

  // Check for constraints
  if (!hasConstraints(problem)) return false;

  // Check if solution can be built incrementally
  if (!canBuildIncrementally(problem)) return false;

  return true;
}
```

### Step 2: Define State

```javascript
function defineState(problem) {
  return {
    // Current partial solution
    current: [],

    // Used elements/resources
    used: new Set(),

    // Current position in search
    position: 0,

    // Additional problem-specific state
    custom: {},
  };
}
```

### Step 3: Generate Choices

```javascript
function generateChoices(state, problem) {
  const choices = [];

  // Generate all possible next moves
  for (const option of problem.options) {
    if (isValidChoice(option, state)) {
      choices.push(option);
    }
  }

  // Order choices for better pruning
  return orderChoices(choices, problem.heuristics);
}
```

### Step 4: Implement Pruning

```javascript
function shouldPrune(state, problem) {
  // Constraint violations
  if (violatesConstraints(state, problem.constraints)) return true;

  // Insufficient resources
  if (insufficientResources(state, problem.resources)) return true;

  // Bound-based pruning for optimization
  if (problem.isOptimization && calculateBound(state) <= problem.bestSoFar) {
    return true;
  }

  return false;
}
```

### Step 5: Optimize

```javascript
function optimizeBacktracking(problem) {
  // Add memoization
  if (hasOverlappingSubproblems(problem)) {
    problem.memo = new Map();
  }

  // Add ordering heuristics
  if (canOrderChoices(problem)) {
    problem.orderingHeuristic = developHeuristic(problem);
  }

  // Add pruning strategies
  if (canCalculateBounds(problem)) {
    problem.calculateBound = developBoundFunction(problem);
  }

  return problem;
}
```

## 🚨 Common Backtracking Mistakes to Avoid

### Mistake 1: Incomplete Backtracking

```javascript
// ❌ Wrong: Not undoing all changes
function wrongBacktrack(state, choice) {
  state.current.push(choice);
  state.used.add(choice);

  // Recursive call
  backtrack(state);

  // Missing: state.used.delete(choice);
  state.current.pop();
}

// ✅ Correct: Undo all changes
function correctBacktrack(state, choice) {
  state.current.push(choice);
  state.used.add(choice);

  backtrack(state);

  state.current.pop();
  state.used.delete(choice); // Undo all changes
}
```

### Mistake 2: Insufficient Pruning

```javascript
// ❌ Wrong: No pruning, explores entire search space
function inefficientBacktrack(state) {
  for (const choice of allChoices) {
    makeChoice(state, choice);
    backtrack(state); // No validity check
    undoChoice(state, choice);
  }
}

// ✅ Correct: Prune invalid paths early
function efficientBacktrack(state) {
  for (const choice of getValidChoices(state)) {
    makeChoice(state, choice);

    if (isValid(state)) {
      // Pruning
      backtrack(state);
    }

    undoChoice(state, choice);
  }
}
```

### Mistake 3: Wrong Base Case

```javascript
// ❌ Wrong: Incorrect base case condition
function wrongBacktrack(state) {
  if (state.current.length === state.target.length) {
    // Wrong condition
    results.push([...state.current]);
    return;
  }
}

// ✅ Correct: Proper base case
function correctBacktrack(state) {
  if (isComplete(state)) {
    // Proper condition checking
    results.push([...state.current]);
    return;
  }
}
```

## 📖 Additional Resources

### Videos

- **Backtracking Explained**: Comprehensive overview
- **N-Queens Problem**: Step-by-step solution
- **Sudoku Solver**: Visual walkthrough
- **Permutation Generation**: Algorithm visualization

### Websites

- **Backtracking Patterns**: Common templates
- **Constraint Satisfaction**: Problem types
- **Pruning Techniques**: Optimization strategies

### Books

- **"Introduction to Algorithms"**: Backtracking chapter
- **"Algorithm Design Manual"**: Practical backtracking
- **"Artificial Intelligence"**: Constraint satisfaction

---

## 🚀 Getting Started

**Ready to master backtracking?**

1. **Start with Basic Patterns** → `implementation.js`
2. **Practice Classic Problems** → `practice.js`
3. **Learn Optimization Techniques** → Pruning, memoization
4. **Apply to Real Problems** → Scheduling, configuration

> 💡 **Key Insight**: Backtracking is about systematic exploration with smart pruning. Master the pattern of choose, explore, unchoose!

---

## 📊 Progress Checklist

### Basic Backtracking Patterns

- [ ] Permutation generation
- [ ] Combination generation
- [ ] Subset generation
- [ ] Basic template structure

### Intermediate Problems

- [ ] N-Queens problem
- [ ] Sudoku solver
- [ ] Word search
- [ ] Palindrome partitioning

### Advanced Techniques

- [ ] Constraint satisfaction
- [ ] Pruning strategies
- [ ] Memoization in backtracking
- [ ] Branch and bound

### Optimization

- [ ] Ordering heuristics
- [ ] Bound calculations
- [ ] Iterative deepening
- [ ] Performance analysis

---

## 🎯 Interview Focus

### Most Common Backtracking Questions

1. **Permutations/Combinations** - 40% of backtracking interviews
2. **N-Queens** - 25% of backtracking interviews
3. **Sudoku/Word Search** - 20% of backtracking interviews
4. **Constraint Satisfaction** - 15% of backtracking interviews

### Must-Know Backtracking Patterns for FAANG

- **Permutation**: Generate all arrangements
- **Combination**: Generate all subsets of size k
- **N-Queens**: Place queens with constraints
- **Word Search**: Find words in grid
- **Sudoku**: Fill grid with constraints
- **Subset Sum**: Find subsets with target sum

---

_Last Updated: December 2025_  
_Difficulty: Advanced_  
_Prerequisites: Recursion, Basic Algorithms_  
_Time Commitment: 2-3 weeks_
