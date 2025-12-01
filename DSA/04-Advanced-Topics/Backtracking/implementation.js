// 🔍 Backtracking Implementation
// Complete implementations of backtracking algorithms with analysis

// ==========================================
// CORE BACKTRACKING TEMPLATES
// ==========================================

/**
 * General Backtracking Template
 * Time: O(b^d) where b is branching factor, d is depth
 * Space: O(d) for recursion stack
 */
function backtrackTemplate(items, constraints = {}) {
  const results = [];

  function backtrack(index, current) {
    // Base case: complete solution found
    if (index === items.length) {
      if (isValidSolution(current, constraints)) {
        results.push([...current]);
      }
      return;
    }

    // Generate choices for current position
    const choices = generateChoices(items[index], current, constraints);

    for (const choice of choices) {
      // Make choice
      current.push(choice);

      // Pruning: check if current path is promising
      if (isValidPartial(current, constraints)) {
        backtrack(index + 1, current);
      }

      // Undo choice (backtrack)
      current.pop();
    }
  }

  backtrack(0, []);
  return results;
}

/**
 * Backtracking for Optimization Problems
 * Find optimal solution (minimum/maximum)
 */
function backtrackOptimization(items, objective = "minimize") {
  let bestSolution = null;
  let bestValue = objective === "minimize" ? Infinity : -Infinity;

  function backtrack(index, current, currentValue) {
    // Base case: complete solution
    if (index === items.length) {
      if (
        (objective === "minimize" && currentValue < bestValue) ||
        (objective === "maximize" && currentValue > bestValue)
      ) {
        bestSolution = [...current];
        bestValue = currentValue;
      }
      return;
    }

    // Pruning with bounds
    const bound = calculateBound(current, items.slice(index), objective);
    if (
      (objective === "minimize" && bound >= bestValue) ||
      (objective === "maximize" && bound <= bestValue)
    ) {
      return; // Prune - cannot improve best solution
    }

    // Generate choices
    const choices = generateChoices(items[index], current);

    for (const choice of choices) {
      current.push(choice);
      const newValue = evaluateChoice(currentValue, choice);

      backtrack(index + 1, current, newValue);

      current.pop(); // Backtrack
    }
  }

  backtrack(0, [], 0);
  return { solution: bestSolution, value: bestValue };
}

// Helper functions
function isValidSolution(solution, constraints) {
  // Check if solution satisfies all constraints
  if (constraints.maxSize && solution.length > constraints.maxSize)
    return false;
  if (constraints.minSize && solution.length < constraints.minSize)
    return false;

  return true;
}

function isValidPartial(partial, constraints) {
  // Check if partial solution can still lead to valid solution
  if (constraints.maxSize && partial.length > constraints.maxSize) return false;

  return true;
}

function generateChoices(item, current, constraints) {
  // Generate valid choices for current item
  const choices = Array.isArray(item) ? item : [item];

  return choices.filter((choice) => {
    // Apply any choice-specific constraints
    if (constraints.unique && current.includes(choice)) return false;
    return true;
  });
}

function calculateBound(current, remaining, objective) {
  // Calculate optimistic bound for pruning
  if (objective === "minimize") {
    return current.reduce((sum, val) => sum + val, 0); // Simplified
  } else {
    return (
      current.reduce((sum, val) => sum + val, 0) +
      remaining.reduce((sum, item) => sum + Math.max(...item), 0)
    );
  }
}

function evaluateChoice(currentValue, choice) {
  return currentValue + (typeof choice === "number" ? choice : 1);
}

// ==========================================
// PERMUTATION PROBLEMS
// ==========================================

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

/**
 * Beautiful Arrangement
 * nums[i] % i == 0 or i % nums[i] == 0
 * Time: O(n!) worst case
 * Space: O(n) for recursion stack
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
  return results;
}

/**
 * Letter Case Permutation
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

// ==========================================
// COMBINATION PROBLEMS
// ==========================================

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

/**
 * Combination Sum
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

/**
 * Combination Sum II
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

/**
 * Combination Sum III
 * Find combinations of k numbers that sum to n
 * Numbers 1-9, each used at most once
 */
function combinationSum3(k, n) {
  const results = [];

  function backtrack(start, remaining, path) {
    if (path.length === k && remaining === 0) {
      results.push([...path]);
      return;
    }

    if (path.length >= k || remaining < 0) return;

    for (let i = start; i <= 9; i++) {
      if (i > remaining) break; // Pruning

      path.push(i);
      backtrack(i + 1, remaining - i, path);
      path.pop();
    }
  }

  backtrack(1, n, []);
  return results;
}

// ==========================================
// SUBSET PROBLEMS
// ==========================================

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

/**
 * Find all subsets that sum to target
 * Time: O(2^n) in worst case
 * Space: O(n) for recursion stack
 */
function subsetSum(nums, target) {
  const results = [];

  function backtrack(index, current, currentSum) {
    if (currentSum === target) {
      results.push([...current]);
      return;
    }

    if (index === nums.length || currentSum > target) return;

    // Include current element
    current.push(nums[index]);
    backtrack(index + 1, current, currentSum + nums[index]);
    current.pop();

    // Exclude current element
    backtrack(index + 1, current, currentSum);
  }

  backtrack(0, [], 0);
  return results;
}

// ==========================================
// STRING BACKTRACKING
// ==========================================

/**
 * Palindrome Partitioning
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

/**
 * Generate Parentheses
 * Generate all combinations of well-formed parentheses
 * Time: O(C_n) where C_n is nth Catalan number
 * Space: O(n) for recursion stack
 */
function generateParentheses(n) {
  const results = [];

  function backtrack(open, close, path) {
    if (path.length === 2 * n) {
      results.push(path);
      return;
    }

    // Add opening parenthesis
    if (open < n) {
      backtrack(open + 1, close, path + "(");
    }

    // Add closing parenthesis
    if (close < open) {
      backtrack(open, close + 1, path + ")");
    }
  }

  backtrack(0, 0, "");
  return results;
}

/**
 * Restore IP Addresses
 * Restore possible IP addresses from string
 * Time: O(n^3) where n is string length
 * Space: O(n) for recursion stack
 */
function restoreIpAddresses(s) {
  const results = [];

  function backtrack(start, dots, path) {
    if (dots === 4 && start === s.length) {
      results.push(path.slice(0, -1)); // Remove last dot
      return;
    }

    if (dots === 4 || start === s.length) return;

    // Try segments of length 1, 2, 3
    for (let len = 1; len <= 3; len++) {
      if (start + len > s.length) break;

      const segment = s.substring(start, start + len);

      // Check if valid IP segment
      if (isValidIPSegment(segment)) {
        backtrack(start + len, dots + 1, path + segment + ".");
      }
    }
  }

  function isValidIPSegment(segment) {
    if (segment.length > 1 && segment[0] === "0") return false;
    const num = parseInt(segment);
    return num >= 0 && num <= 255;
  }

  backtrack(0, 0, "");
  return results;
}

/**
 * Word Break II
 * Return all possible sentences from word break
 * Time: O(n^3 + number of sentences * average length)
 * Space: O(n^2) for memoization
 */
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();

  function backtrack(start) {
    if (memo.has(start)) return memo.get(start);

    if (start === s.length) return [""];

    const sentences = [];

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);

      if (wordSet.has(word)) {
        const restSentences = backtrack(end);

        for (const sentence of restSentences) {
          const combined = word + (sentence ? " " + sentence : "");
          sentences.push(combined);
        }
      }
    }

    memo.set(start, sentences);
    return sentences;
  }

  return backtrack(0);
}

// ==========================================
// GRID BACKTRACKING
// ==========================================

/**
 * N-Queens Problem
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

/**
 * Sudoku Solver
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
  return board;
}

/**
 * Word Search
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

/**
 * Word Search II
 * Find all words in grid using Trie for optimization
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

// ==========================================
// OPTIMIZATION BACKTRACKING
// ==========================================

/**
 * Partition to K Equal Sum Subsets
 * Partition array into k subsets with equal sum
 * Time: O(k * 2^n) worst case
 * Space: O(n) for recursion stack
 */
function canPartitionKSubsets(nums, k) {
  const total = nums.reduce((sum, num) => sum + num, 0);

  if (total % k !== 0) return false;

  const target = total / k;
  nums.sort((a, b) => b - a); // Sort descending for better pruning

  if (nums[0] > target) return false;

  const used = new Array(nums.length).fill(false);

  function backtrack(start, kRemaining, currentSum) {
    if (kRemaining === 1) return true; // Last subset will automatically be valid
    if (currentSum === target) {
      return backtrack(0, kRemaining - 1, 0);
    }

    for (let i = start; i < nums.length; i++) {
      if (used[i] || currentSum + nums[i] > target) continue;

      used[i] = true;
      if (backtrack(i + 1, kRemaining, currentSum + nums[i])) {
        return true;
      }
      used[i] = false;

      // Pruning: skip duplicates
      if (currentSum === 0) break;
    }

    return false;
  }

  return backtrack(0, k, 0);
}

/**
 * Matchsticks to Square
 * Can matchsticks form a square
 * Time: O(4^n) worst case
 * Space: O(n) for recursion stack
 */
function makesquare(matchsticks) {
  const total = matchsticks.reduce((sum, stick) => sum + stick, 0);

  if (total % 4 !== 0) return false;

  const side = total / 4;
  matchsticks.sort((a, b) => b - a); // Sort descending

  if (matchsticks[0] > side) return false;

  const sides = [0, 0, 0, 0];

  function backtrack(index) {
    if (index === matchsticks.length) {
      return sides.every((s) => s === side);
    }

    const stick = matchsticks[index];

    for (let i = 0; i < 4; i++) {
      if (sides[i] + stick <= side) {
        sides[i] += stick;

        if (backtrack(index + 1)) {
          return true;
        }

        sides[i] -= stick;

        // Pruning: if side is 0, no need to try other empty sides
        if (sides[i] === 0) break;
      }
    }

    return false;
  }

  return backtrack(0);
}

// ==========================================
// ADVANCED BACKTRACKING TECHNIQUES
// ==========================================

/**
 * Backtracking with Memoization
 * Cache subproblem results to avoid redundant work
 */
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

function serializeState(state) {
  return JSON.stringify(state);
}

function isComplete(state) {
  return state.current.length === state.target.length;
}

function evaluate(state) {
  return state.current.reduce((sum, val) => sum + val, 0);
}

function getChoices(state) {
  return state.remaining;
}

function makeChoice(state, choice) {
  state.current.push(choice);
  state.remaining = state.remaining.filter((r) => r !== choice);
}

function undoChoice(state, choice) {
  state.current.pop();
  state.remaining.push(choice);
}

function isValid(state) {
  return true; // Simplified
}

function updateBest(best, result) {
  return best === null ? result : Math.max(best, result);
}

/**
 * Iterative Deepening Backtracking
 * Limit search depth and increase gradually
 */
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

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Performance monitor for backtracking algorithms
 */
function measureBacktrackingPerformance(func, ...args) {
  const startTime = performance.now();
  const result = func(...args);
  const endTime = performance.now();

  return {
    result,
    time: endTime - startTime,
    complexity: analyzeBacktrackingComplexity(func, args),
  };
}

function analyzeBacktrackingComplexity(func, args) {
  const sizes = args.map((arg) =>
    Array.isArray(arg)
      ? arg.length
      : typeof arg === "object"
      ? Object.keys(arg).length
      : 1
  );

  return {
    inputSizes: sizes,
    estimatedComplexity: estimateBacktrackingComplexity(sizes),
  };
}

function estimateBacktrackingComplexity(sizes) {
  // Most backtracking algorithms are exponential
  const max = Math.max(...sizes);
  if (sizes.length === 1) return `O(${max}!)`;
  return `O(${max}^${max})`; // Simplified estimation
}

/**
 * Backtracking state visualizer
 */
function visualizeBacktracking(func, ...args) {
  const states = [];

  const originalFunc = func;
  const wrappedFunc = function (...innerArgs) {
    // Capture state at each recursive call
    states.push({
      timestamp: performance.now(),
      state: JSON.parse(JSON.stringify(innerArgs)),
      depth: states.length,
    });

    return originalFunc(...innerArgs);
  };

  const result = wrappedFunc(...args);

  return {
    result,
    states,
    totalStates: states.length,
    maxDepth: Math.max(...states.map((s) => s.depth)),
  };
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runBacktrackingTests() {
  console.log("🧪 Running Backtracking Tests...\n");

  // Test permutations
  console.log("🔄 Testing Permutations:");
  const perms = permute([1, 2, 3]);
  console.log(`Permutations of [1,2,3]: ${perms.length} (expected: 6)`);

  // Test unique permutations
  console.log("\n🔄 Testing Unique Permutations:");
  const uniquePerms = permuteUnique([1, 1, 2]);
  console.log(
    `Unique permutations of [1,1,2]: ${uniquePerms.length} (expected: 3)`
  );

  // Test combinations
  console.log("\n🎯 Testing Combinations:");
  const combs = combine(4, 2);
  console.log(`C(4,2): ${combs.length} combinations (expected: 6)`);

  // Test combination sum
  console.log("\n🎯 Testing Combination Sum:");
  const combSum = combinationSum([2, 3, 6, 7], 7);
  console.log(
    `Combination sum for 7: ${combSum.length} solutions (expected: 2)`
  );

  // Test subsets
  console.log("\n📦 Testing Subsets:");
  const subs = subsets([1, 2, 3]);
  console.log(`Subsets of [1,2,3]: ${subs.length} (expected: 8)`);

  // Test letter case permutation
  console.log("\n🔤 Testing Letter Case Permutation:");
  const letterPerms = letterCasePermutation("a1b");
  console.log(
    `Letter case permutations of 'a1b': ${letterPerms.length} (expected: 4)`
  );

  // Test palindrome partitioning
  console.log("\n📝 Testing Palindrome Partitioning:");
  const partitions = partition("aab");
  console.log(
    `Palindrome partitions of 'aab': ${partitions.length} (expected: 2)`
  );

  // Test generate parentheses
  console.log("\n⚪ Testing Generate Parentheses:");
  const parens = generateParentheses(3);
  console.log(`Generate parentheses for n=3: ${parens.length} (expected: 5)`);

  // Test N-Queens
  console.log("\n👑 Testing N-Queens:");
  const nQueens = solveNQueens(4);
  console.log(`N-Queens solutions for n=4: ${nQueens.length} (expected: 2)`);

  // Test word search
  console.log("\n🔍 Testing Word Search:");
  const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  const wordExists = exist(board, "ABCCED");
  console.log(`Word 'ABCCED' exists in board: ${wordExists} (expected: true)`);

  // Test performance
  console.log("\n⚡ Testing Performance:");
  const perf = measureBacktrackingPerformance(permute, [1, 2, 3, 4]);
  console.log(`Permute [1,2,3,4] time: ${perf.time.toFixed(2)}ms`);
  console.log(`Complexity estimate: ${perf.complexity.estimatedComplexity}`);

  console.log("\n✅ All backtracking tests completed!");
}

// Export all functions
module.exports = {
  // Core templates
  backtrackTemplate,
  backtrackOptimization,

  // Permutations
  permute,
  permuteUnique,
  beautifulArrangement,
  letterCasePermutation,

  // Combinations
  combine,
  combinationSum,
  combinationSum2,
  combinationSum3,

  // Subsets
  subsets,
  subsetsWithDup,
  subsetSum,

  // String backtracking
  partition,
  generateParentheses,
  restoreIpAddresses,
  wordBreak,

  // Grid backtracking
  solveNQueens,
  solveSudoku,
  exist,
  findWords,

  // Optimization
  canPartitionKSubsets,
  makesquare,

  // Advanced techniques
  backtrackWithMemo,
  iterativeDeepening,

  // Utilities
  measureBacktrackingPerformance,
  visualizeBacktracking,
  runBacktrackingTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runBacktrackingTests();
}
