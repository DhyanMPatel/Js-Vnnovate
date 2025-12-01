// 🔄 Recursion & Backtracking Implementation
// Complete implementations of recursive algorithms with analysis

// ==========================================
// BASIC RECURSION
// ==========================================

/**
 * Factorial - Classic Recursion Example
 * Time: O(n)
 * Space: O(n) due to call stack
 */
function factorial(n) {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

/**
 * Tail Recursive Factorial
 * Time: O(n)
 * Space: O(1) with tail call optimization
 */
function tailFactorial(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return tailFactorial(n - 1, n * accumulator);
}

/**
 * Fibonacci - Naive Recursion
 * Time: O(2^n) - exponential!
 * Space: O(n)
 */
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Fibonacci with Memoization
 * Time: O(n)
 * Space: O(n)
 */
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

/**
 * Power Function
 * Calculate a^b using recursion
 * Time: O(log b)
 * Space: O(log b)
 */
function power(a, b) {
  if (b === 0) return 1;
  if (b === 1) return a;

  if (b % 2 === 0) {
    const half = power(a, b / 2);
    return half * half;
  } else {
    return a * power(a, b - 1);
  }
}

/**
 * GCD using Euclidean Algorithm
 * Time: O(log min(a, b))
 * Space: O(log min(a, b))
 */
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

/**
 * Sum of Array Elements
 * Time: O(n)
 * Space: O(n)
 */
function sumArray(arr, index = 0) {
  if (index >= arr.length) return 0;
  return arr[index] + sumArray(arr, index + 1);
}

/**
 * Find Maximum in Array
 * Time: O(n)
 * Space: O(n)
 */
function findMax(arr, index = 0) {
  if (index === arr.length - 1) return arr[index];

  const maxOfRest = findMax(arr, index + 1);
  return Math.max(arr[index], maxOfRest);
}

/**
 * Reverse Array Recursively
 * Time: O(n)
 * Space: O(n)
 */
function reverseArray(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;

  [arr[left], arr[right]] = [arr[right], arr[left]];
  return reverseArray(arr, left + 1, right - 1);
}

/**
 * Check if String is Palindrome
 * Time: O(n)
 * Space: O(n)
 */
function isPalindrome(str, left = 0, right = str.length - 1) {
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;
  return isPalindrome(str, left + 1, right - 1);
}

// ==========================================
// STRING RECURSION
// ==========================================

/**
 * Reverse String
 * Time: O(n)
 * Space: O(n)
 */
function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.substring(1)) + str[0];
}

/**
 * Count Characters in String
 * Time: O(n)
 * Space: O(n)
 */
function countCharacters(str, char, index = 0) {
  if (index >= str.length) return 0;
  return (str[index] === char ? 1 : 0) + countCharacters(str, char, index + 1);
}

/**
 * Remove Character from String
 * Time: O(n)
 * Space: O(n)
 */
function removeChar(str, char, index = 0) {
  if (index >= str.length) return "";

  const current = str[index] === char ? "" : str[index];
  return current + removeChar(str, char, index + 1);
}

/**
 * Capitalize Words
 * Time: O(n)
 * Space: O(n)
 */
function capitalizeWords(str, index = 0) {
  if (index >= str.length) return "";

  const current = str[index];
  const prevChar = index === 0 ? " " : str[index - 1];

  if (prevChar === " " && current !== " ") {
    return current.toUpperCase() + capitalizeWords(str, index + 1);
  } else {
    return current + capitalizeWords(str, index + 1);
  }
}

/**
 * String Subsequence Check
 * Time: O(m + n) where m, n are string lengths
 * Space: O(m + n)
 */
function isSubsequence(s, t, sIndex = 0, tIndex = 0) {
  if (sIndex === s.length) return true;
  if (tIndex === t.length) return false;

  if (s[sIndex] === t[tIndex]) {
    return isSubsequence(s, t, sIndex + 1, tIndex + 1);
  } else {
    return isSubsequence(s, t, sIndex, tIndex + 1);
  }
}

/**
 * Generate All Substrings
 * Time: O(n²)
 * Space: O(n²)
 */
function allSubstrings(str, start = 0, end = str.length, result = []) {
  if (start > end) return result;

  if (start <= end) {
    result.push(str.substring(start, end + 1));
  }

  if (end > 0) {
    allSubstrings(str, start, end - 1, result);
  } else if (start < str.length - 1) {
    allSubstrings(str, start + 1, str.length - 1, result);
  }

  return result;
}

// ==========================================
// BACKTRACKING ALGORITHMS
// ==========================================

/**
 * Generate All Permutations
 * Time: O(n! * n)
 * Space: O(n! * n)
 */
function permutations(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // Swap
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]]; // Backtrack
    }
  }

  backtrack(0);
  return result;
}

/**
 * Generate All Combinations
 * Time: O(C(n, k) * k)
 * Space: O(C(n, k) * k)
 */
function combinations(n, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }

  backtrack(1, []);
  return result;
}

/**
 * Generate All Subsets (Power Set)
 * Time: O(2^n * n)
 * Space: O(2^n * n)
 */
function subsets(nums) {
  const result = [];

  function backtrack(index, current) {
    result.push([...current]);

    for (let i = index; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }

  backtrack(0, []);
  return result;
}

/**
 * Generate All Subsets of Size K
 * Time: O(C(n, k) * k)
 * Space: O(C(n, k) * k)
 */
function subsetsOfSizeK(nums, k) {
  const result = [];

  function backtrack(index, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }

  backtrack(0, []);
  return result;
}

/**
 * N-Queens Problem
 * Time: O(n!)
 * Space: O(n)
 */
function solveNQueens(n) {
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));
  const solutions = [];

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

  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map((row) => row.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q"; // Make choice
        backtrack(row + 1); // Recurse
        board[row][col] = "."; // Backtrack
      }
    }
  }

  backtrack(0);
  return solutions;
}

/**
 * Sudoku Solver
 * Time: O(9^(n*n)) worst case
 * Space: O(n*n)
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

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  function findEmpty() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          return [row, col];
        }
      }
    }
    return null;
  }

  function solve() {
    const empty = findEmpty();
    if (!empty) return true; // Solved

    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
      if (isValid(row, col, num.toString())) {
        board[row][col] = num.toString(); // Make choice

        if (solve()) return true;

        board[row][col] = "."; // Backtrack
      }
    }

    return false; // No valid number found
  }

  return solve();
}

/**
 * Word Search - Find if word exists in grid
 * Time: O(m * n * 4^L) where L is word length
 * Space: O(L)
 */
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row, col, index) {
    if (index === word.length) return true;

    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) return true;
    }
  }

  return false;
}

/**
 * Generate Parentheses
 * Time: O(Catalan(n))
 * Space: O(Catalan(n))
 */
function generateParentheses(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
}

/**
 * Letter Case Permutation
 * Time: O(2^n)
 * Space: O(2^n)
 */
function letterCasePermutation(s) {
  const result = [];

  function backtrack(index, current) {
    if (index === s.length) {
      result.push(current);
      return;
    }

    const char = s[index];

    if (/[a-zA-Z]/.test(char)) {
      // Add lowercase
      backtrack(index + 1, current + char.toLowerCase());
      // Add uppercase
      backtrack(index + 1, current + char.toUpperCase());
    } else {
      // Add digit as is
      backtrack(index + 1, current + char);
    }
  }

  backtrack(0, "");
  return result;
}

// ==========================================
// DIVIDE AND CONQUER
// ==========================================

/**
 * Binary Search (Recursive)
 * Time: O(log n)
 * Space: O(log n)
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (target < arr[mid])
    return binarySearchRecursive(arr, target, left, mid - 1);
  else return binarySearchRecursive(arr, target, mid + 1, right);
}

/**
 * Merge Sort (Recursive)
 * Time: O(n log n)
 * Space: O(n)
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const merged = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex++]);
    } else {
      merged.push(right[rightIndex++]);
    }
  }

  return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * Quick Sort (Recursive)
 * Time: O(n log n) average, O(n²) worst
 * Space: O(log n)
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Find Maximum Subarray (Kadane's Algorithm - Recursive)
 * Time: O(n)
 * Space: O(n)
 */
function maxSubArray(
  nums,
  index = 0,
  currentMax = -Infinity,
  globalMax = -Infinity
) {
  if (index >= nums.length) return globalMax;

  currentMax = Math.max(nums[index], currentMax + nums[index]);
  globalMax = Math.max(globalMax, currentMax);

  return maxSubArray(nums, index + 1, currentMax, globalMax);
}

/**
 * Tower of Hanoi
 * Time: O(2^n)
 * Space: O(n)
 */
function towerOfHanoi(n, source, destination, auxiliary, moves = []) {
  if (n === 1) {
    moves.push(`Move disk 1 from ${source} to ${destination}`);
    return moves;
  }

  towerOfHanoi(n - 1, source, auxiliary, destination, moves);
  moves.push(`Move disk ${n} from ${source} to ${destination}`);
  towerOfHanoi(n - 1, auxiliary, destination, source, moves);

  return moves;
}

// ==========================================
// TREE RECURSION
// ==========================================

/**
 * Binary Tree Node
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * In-order Traversal (Recursive)
 * Time: O(n)
 * Space: O(h) where h is tree height
 */
function inorderTraversal(root, result = []) {
  if (root === null) return result;

  inorderTraversal(root.left, result);
  result.push(root.val);
  inorderTraversal(root.right, result);

  return result;
}

/**
 * Pre-order Traversal (Recursive)
 * Time: O(n)
 * Space: O(h)
 */
function preorderTraversal(root, result = []) {
  if (root === null) return result;

  result.push(root.val);
  preorderTraversal(root.left, result);
  preorderTraversal(root.right, result);

  return result;
}

/**
 * Post-order Traversal (Recursive)
 * Time: O(n)
 * Space: O(h)
 */
function postorderTraversal(root, result = []) {
  if (root === null) return result;

  postorderTraversal(root.left, result);
  postorderTraversal(root.right, result);
  result.push(root.val);

  return result;
}

/**
 * Tree Height
 * Time: O(n)
 * Space: O(h)
 */
function treeHeight(root) {
  if (root === null) return -1;

  const leftHeight = treeHeight(root.left);
  const rightHeight = treeHeight(root.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

/**
 * Tree Size
 * Time: O(n)
 * Space: O(h)
 */
function treeSize(root) {
  if (root === null) return 0;

  return 1 + treeSize(root.left) + treeSize(root.right);
}

/**
 * Is Balanced Binary Tree
 * Time: O(n)
 * Space: O(h)
 */
function isBalanced(root) {
  function checkHeight(node) {
    if (node === null) return 0;

    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

/**
 * Same Tree
 * Time: O(n)
 * Space: O(h)
 */
function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/**
 * Invert Binary Tree
 * Time: O(n)
 * Space: O(h)
 */
function invertTree(root) {
  if (root === null) return null;

  // Swap children
  [root.left, root.right] = [root.right, root.left];

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// ==========================================
// GRAPH RECURSION
// ==========================================

/**
 * Graph Node
 */
class GraphNode {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * DFS on Graph (Recursive)
 * Time: O(V + E)
 * Space: O(V)
 */
function dfsGraph(node, visited = new Set()) {
  if (node === null) return [];

  visited.add(node);
  const result = [node.val];

  for (const neighbor of node.neighbors) {
    if (!visited.has(neighbor)) {
      result.push(...dfsGraph(neighbor, visited));
    }
  }

  return result;
}

/**
 * Flood Fill
 * Time: O(m * n)
 * Space: O(m * n)
 */
function floodFill(image, sr, sc, newColor) {
  const originalColor = image[sr][sc];

  if (originalColor === newColor) return image;

  function fill(row, col) {
    if (row < 0 || row >= image.length || col < 0 || col >= image[0].length) {
      return;
    }

    if (image[row][col] !== originalColor) return;

    image[row][col] = newColor;

    fill(row + 1, col);
    fill(row - 1, col);
    fill(row, col + 1);
    fill(row, col - 1);
  }

  fill(sr, sc);
  return image;
}

/**
 * Number of Islands
 * Time: O(m * n)
 * Space: O(m * n)
 */
function numIslands(grid) {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] !== "1"
    ) {
      return;
    }

    grid[row][col] = "0"; // Mark as visited

    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        count++;
        dfs(row, col);
      }
    }
  }

  return count;
}

// ==========================================
// ADVANCED RECURSION
// ==========================================

/**
 * Ackermann Function
 * Time: O(Ackermann(m, n)) - grows extremely fast
 * Space: O(m + n)
 */
function ackermann(m, n) {
  if (m === 0) return n + 1;
  if (n === 0) return ackermann(m - 1, 1);
  return ackermann(m - 1, ackermann(m, n - 1));
}

/**
 * Josephus Problem
 * Time: O(n)
 * Space: O(n)
 */
function josephus(n, k) {
  if (n === 1) return 0;
  return (josephus(n - 1, k) + k) % n;
}

/**
 * Generate Gray Code
 * Time: O(2^n)
 * Space: O(2^n)
 */
function grayCode(n) {
  if (n === 0) return [0];

  const previousGray = grayCode(n - 1);
  const result = [];

  for (const code of previousGray) {
    result.push(code);
  }

  for (let i = previousGray.length - 1; i >= 0; i--) {
    result.push(previousGray[i] + (1 << (n - 1)));
  }

  return result;
}

/**
 * Generate All Possible Full Binary Trees
 * Time: O(Catalan(n))
 * Space: O(Catalan(n))
 */
function allPossibleFBT(n) {
  if (n % 2 === 0) return []; // Even number of nodes can't form full binary tree

  const memo = new Map();

  function solve(numNodes) {
    if (memo.has(numNodes)) return memo.get(numNodes);
    if (numNodes === 1) return [new TreeNode(0)];

    const trees = [];

    for (let leftNodes = 1; leftNodes < numNodes; leftNodes += 2) {
      const rightNodes = numNodes - 1 - leftNodes;

      const leftTrees = solve(leftNodes);
      const rightTrees = solve(rightNodes);

      for (const left of leftTrees) {
        for (const right of rightTrees) {
          trees.push(new TreeNode(0, left, right));
        }
      }
    }

    memo.set(numNodes, trees);
    return trees;
  }

  return solve(n);
}

/**
 * Strobogrammatic Numbers
 * Generate all strobogrammatic numbers of length n
 * Time: O(5^(n/2))
 * Space: O(5^(n/2))
 */
function strobogrammatic(n) {
  const pairs = [
    ["0", "0"],
    ["1", "1"],
    ["6", "9"],
    ["8", "8"],
    ["9", "6"],
  ];

  function build(m, finalLength) {
    if (m === 0) return finalLength === 0 ? [""] : [];
    if (m === 1) return ["0", "1", "8"];

    const result = [];
    const subResults = build(m - 2, finalLength);

    for (const sub of subResults) {
      for (const [left, right] of pairs) {
        // Don't allow leading zero
        if (m === finalLength && left === "0") continue;
        result.push(left + sub + right);
      }
    }

    return result;
  }

  return build(n, n);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Measure recursion depth
 */
function measureRecursionDepth(func, ...args) {
  let depth = 0;
  const originalStack = Error.stackTraceLimit;
  Error.stackTraceLimit = 1000;

  function wrapper(...innerArgs) {
    depth++;
    const result = func(...innerArgs);
    depth--;
    return result;
  }

  try {
    wrapper(...args);
    return depth;
  } finally {
    Error.stackTraceLimit = originalStack;
  }
}

/**
 * Convert recursive to iterative using stack
 */
function recursiveToIterative(recursiveFunc) {
  return function (...args) {
    const stack = [{ args, index: 0 }];
    const results = [];

    while (stack.length > 0) {
      const frame = stack[stack.length - 1];

      if (frame.index === 0) {
        // First time entering this frame
        frame.index = 1;

        // Check base case
        if (recursiveFunc.baseCase(...frame.args)) {
          results.push(recursiveFunc.baseResult(...frame.args));
          stack.pop();
          continue;
        }

        // Get recursive arguments
        const nextArgs = recursiveFunc.getNextArgs(...frame.args);
        stack.push({ args: nextArgs, index: 0 });
      } else {
        // Returning from recursive call
        const recursiveResult = results.pop();
        const finalResult = recursiveFunc.combineResults(
          frame.args,
          recursiveResult
        );
        results.push(finalResult);
        stack.pop();
      }
    }

    return results[0];
  };
}

/**
 * Memoization decorator
 */
function memoize(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runRecursionTests() {
  console.log("🧪 Running Recursion & Backtracking Tests...\n");

  // Test basic recursion
  console.log("🔄 Testing Basic Recursion:");
  console.log(`Factorial(5): ${factorial(5)} (expected: 120)`);
  console.log(`Tail Factorial(5): ${tailFactorial(5)} (expected: 120)`);
  console.log(`Fibonacci(10): ${fibonacciMemo(10)} (expected: 55)`);
  console.log(`Power(2, 8): ${power(2, 8)} (expected: 256)`);
  console.log(`GCD(48, 18): ${gcd(48, 18)} (expected: 6)`);

  // Test array recursion
  console.log("\n📊 Testing Array Recursion:");
  const testArray = [1, 2, 3, 4, 5];
  console.log(`Sum Array: ${sumArray(testArray)} (expected: 15)`);
  console.log(`Find Max: ${findMax(testArray)} (expected: 5)`);
  console.log(
    `Is Palindrome("racecar"): ${isPalindrome("racecar")} (expected: true)`
  );

  // Test string recursion
  console.log("\n📝 Testing String Recursion:");
  console.log(
    `Reverse String("hello"): "${reverseString("hello")}" (expected: "olleh")`
  );
  console.log(
    `Count Char("hello", "l"): ${countCharacters("hello", "l")} (expected: 2)`
  );
  console.log(
    `Is Subsequence("abc", "ahbgdc"): ${isSubsequence(
      "abc",
      "ahbgdc"
    )} (expected: true)`
  );

  // Test backtracking
  console.log("\n🎯 Testing Backtracking:");
  const perms = permutations([1, 2, 3]);
  console.log(`Permutations of [1,2,3]: ${perms.length} permutations`);

  const combos = combinations(4, 2);
  console.log(`Combinations of 4 choose 2: ${combos.length} combinations`);

  const subset = subsets([1, 2, 3]);
  console.log(`Subsets of [1,2,3]: ${subset.length} subsets`);

  // Test N-Queens
  console.log("\n👑 Testing N-Queens:");
  const nQueensSolutions = solveNQueens(4);
  console.log(`N-Queens(4): ${nQueensSolutions.length} solutions`);

  // Test tree recursion
  console.log("\n🌳 Testing Tree Recursion:");
  const tree = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
  );

  console.log(`In-order: [${inorderTraversal(tree)}] (expected: [4,2,5,1,3])`);
  console.log(
    `Pre-order: [${preorderTraversal(tree)}] (expected: [1,2,4,5,3])`
  );
  console.log(
    `Post-order: [${postorderTraversal(tree)}] (expected: [4,5,2,3,1])`
  );
  console.log(`Tree Height: ${treeHeight(tree)} (expected: 2)`);
  console.log(`Tree Size: ${treeSize(tree)} (expected: 5)`);

  // Test divide and conquer
  console.log("\n⚔️ Testing Divide and Conquer:");
  const unsorted = [3, 6, 8, 10, 1, 2, 1];
  console.log(`Merge Sort: [${mergeSort([...unsorted])}]`);
  console.log(`Quick Sort: [${quickSort([...unsorted])}]`);

  // Test advanced recursion
  console.log("\n🚀 Testing Advanced Recursion:");
  console.log(`Josephus(7, 3): ${josephus(7, 3)} (expected: 3)`);
  console.log(`Gray Code(3): [${grayCode(3)}]`);

  // Test flood fill
  console.log("\n🎨 Testing Flood Fill:");
  const image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ];
  const filledImage = floodFill(JSON.parse(JSON.stringify(image)), 1, 1, 2);
  console.log(`Original: [[${image.join("],[")}]]`);
  console.log(`Filled: [[${filledImage.join("],[")}]]`);

  // Test number of islands
  console.log("\n🏝️ Testing Number of Islands:");
  const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  const islands = numIslands(JSON.parse(JSON.stringify(grid)));
  console.log(`Islands count: ${islands} (expected: 3)`);

  console.log("\n✅ All tests completed!");
}

// Export all functions
module.exports = {
  // Basic recursion
  factorial,
  tailFactorial,
  fibonacci,
  fibonacciMemo,
  power,
  gcd,
  sumArray,
  findMax,
  reverseArray,
  isPalindrome,

  // String recursion
  reverseString,
  countCharacters,
  removeChar,
  capitalizeWords,
  isSubsequence,
  allSubstrings,

  // Backtracking
  permutations,
  combinations,
  subsets,
  subsetsOfSizeK,
  solveNQueens,
  solveSudoku,
  exist,
  generateParentheses,
  letterCasePermutation,

  // Divide and conquer
  binarySearchRecursive,
  mergeSort,
  quickSort,
  maxSubArray,
  towerOfHanoi,

  // Tree recursion
  TreeNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  treeHeight,
  treeSize,
  isBalanced,
  isSameTree,
  invertTree,

  // Graph recursion
  GraphNode,
  dfsGraph,
  floodFill,
  numIslands,

  // Advanced recursion
  ackermann,
  josephus,
  grayCode,
  allPossibleFBT,
  strobogrammatic,

  // Utilities
  measureRecursionDepth,
  recursiveToIterative,
  memoize,
  runRecursionTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runRecursionTests();
}
