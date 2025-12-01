# 🔄 Recursion & Backtracking

> **Problem Decomposition and Systematic Exploration**

## 📋 Table of Contents

- [What is Recursion?](#what-is-recursion)
- [Recursion Fundamentals](#recursion-fundamentals)
- [Types of Recursion](#types-of-recursion)
- [Backtracking](#backtracking)
- [Common Recursive Patterns](#common-recursive-patterns)
- [Advanced Recursion](#advanced-recursion)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What is Recursion?

### Definition

Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It breaks down complex problems into simpler subproblems until they become trivial to solve.

### Real-World Analogy

```javascript
// Think of Russian nesting dolls:
// - Each doll contains a smaller doll
// - You open them one by one until you reach the smallest
// - Then you close them back in reverse order

const nestingDolls = {
  outer: {
    middle: {
      inner: {
        smallest: "Core problem",
      },
    },
  },
};
```

### Why Recursion Matters

- **Problem Decomposition**: Break complex problems into simpler ones
- **Elegant Solutions**: Often more readable than iterative approaches
- **Natural Fit**: Perfect for hierarchical and tree-like structures
- **Algorithm Foundation**: Basis for divide and conquer algorithms

## 🔍 Recursion Fundamentals

### The Three Laws of Recursion

1. **Base Case**: Must have at least one base case that can be solved without recursion
2. **Progress Toward Base Case**: Each recursive call must progress toward the base case
3. **Proper Stack Usage**: The recursion depth should be reasonable

### Basic Structure

```javascript
function recursiveFunction(input) {
  // 1. Base case
  if (baseCondition) {
    return baseResult;
  }

  // 2. Recursive case - progress toward base case
  const smallerInput = reduceProblem(input);
  const recursiveResult = recursiveFunction(smallerInput);

  // 3. Combine results
  return combineResults(input, recursiveResult);
}
```

### Classic Example: Factorial

```javascript
function factorial(n) {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

// Call stack visualization:
// factorial(4)
//  return 4 * factorial(3)
//    return 3 * factorial(2)
//      return 2 * factorial(1)
//        return 1
```

## 🔄 Types of Recursion

### 1. Direct Recursion

```javascript
function directRecursion(n) {
  if (n <= 0) return;
  console.log(n);
  directRecursion(n - 1); // Function calls itself directly
}
```

### 2. Indirect Recursion

```javascript
function functionA(n) {
  if (n <= 0) return;
  console.log("A:", n);
  functionB(n - 1); // Calls another function
}

function functionB(n) {
  if (n <= 0) return;
  console.log("B:", n);
  functionA(n - 1); // Eventually calls back to A
}
```

### 3. Tail Recursion

```javascript
// Tail recursion - recursive call is the last operation
function tailFactorial(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return tailFactorial(n - 1, n * accumulator); // Last operation
}

// Non-tail recursion - work after recursive call
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Multiplication happens after recursive call
}
```

### 4. Nested Recursion

```javascript
function nestedRecursion(n) {
  if (n > 100) return n - 10;
  return nestedRecursion(nestedRecursion(n + 11)); // Recursive call inside recursive call
}
```

## 🔍 Backtracking

### Definition

Backtracking is a systematic way to iterate through all possible configurations of a search space. It builds candidates incrementally and abandons candidates ("backtracks") as soon as it determines they cannot lead to a valid solution.

### Backtracking Pattern

```javascript
function backtrack(currentState, choices) {
  // 1. Check if current state is a solution
  if (isSolution(currentState)) {
    recordSolution(currentState);
    return;
  }

  // 2. Try each possible choice
  for (const choice of choices) {
    if (isValid(currentState, choice)) {
      // 3. Make the choice
      makeChoice(currentState, choice);

      // 4. Recurse
      backtrack(currentState, remainingChoices);

      // 5. Undo the choice (backtrack)
      undoChoice(currentState, choice);
    }
  }
}
```

### Classic Example: N-Queens

```javascript
function solveNQueens(n) {
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));
  const solutions = [];

  function backtrack(row) {
    // Base case: all queens placed
    if (row === n) {
      solutions.push(board.map((row) => row.join("")));
      return;
    }

    // Try placing queen in each column
    for (let col = 0; col < n; col++) {
      if (isValidPlacement(board, row, col)) {
        board[row][col] = "Q"; // Make choice

        backtrack(row + 1); // Recurse

        board[row][col] = "."; // Backtrack
      }
    }
  }

  backtrack(0);
  return solutions;
}

function isValidPlacement(board, row, col) {
  const n = board.length;

  // Check column
  for (let i = 0; i < row; i++) {
    if (board[i][col] === "Q") return false;
  }

  // Check diagonal
  for (let i = 0; i < row; i++) {
    const colDiff = Math.abs(col - Array.from(board[i]).indexOf("Q"));
    if (colDiff === row - i) return false;
  }

  return true;
}
```

## 🎯 Common Recursive Patterns

### 1. Linear Recursion

```javascript
// Process elements one by one
function sumArray(arr, index = 0) {
  if (index >= arr.length) return 0;
  return arr[index] + sumArray(arr, index + 1);
}

// Time: O(n)
// Space: O(n) due to call stack
```

### 2. Binary Recursion (Divide and Conquer)

```javascript
// Split problem into two halves
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (target < arr[mid])
    return binarySearchRecursive(arr, target, left, mid - 1);
  else return binarySearchRecursive(arr, target, mid + 1, right);
}

// Time: O(log n)
// Space: O(log n)
```

### 3. Multiple Recursion

```javascript
// Fibonacci - multiple recursive calls
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Time: O(2^n) - exponential!
// Space: O(n)
```

### 4. Tree Recursion

```javascript
// Traverse tree structures
function traverseTree(node) {
  if (node === null) return;

  // Process current node
  console.log(node.value);

  // Recurse on children
  traverseTree(node.left);
  traverseTree(node.right);
}

// Time: O(n) where n is number of nodes
// Space: O(h) where h is tree height
```

### 5. Nested Recursion

```javascript
// Recursive call inside recursive call
function ackermann(m, n) {
  if (m === 0) return n + 1;
  if (n === 0) return ackermann(m - 1, 1);
  return ackermann(m - 1, ackermann(m, n - 1));
}
```

## 🚀 Advanced Recursion

### 1. Memoization

```javascript
// Cache results to avoid redundant calculations
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Time: O(n) - much better than O(2^n)!
// Space: O(n)
```

### 2. Dynamic Programming (Bottom-Up)

```javascript
// Convert recursion to iteration
function fibonacciDP(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Time: O(n)
// Space: O(n) or O(1) optimized
```

### 3. Tail Call Optimization

```javascript
// Convert to tail recursion when possible
function sumTailRecursive(arr, index = 0, accumulator = 0) {
  if (index >= arr.length) return accumulator;
  return sumTailRecursive(arr, index + 1, accumulator + arr[index]);
}
```

### 4. Iterative Conversion

```javascript
// Convert recursive to iterative to avoid stack overflow
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Time: O(n)
// Space: O(1)
```

## 🎯 Common Backtracking Problems

### 1. Permutations

```javascript
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
```

### 2. Combinations

```javascript
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
```

### 3. Subsets

```javascript
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
```

### 4. Sudoku Solver

```javascript
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

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
              board[row][col] = num.toString();

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
}
```

## 🚀 Real-World Applications

### 1. File System Traversal

```javascript
class FileSystemTraversal {
  static traverseDirectory(dir, callback) {
    const files = this.readDirectory(dir);

    for (const file of files) {
      const fullPath = `${dir}/${file}`;

      if (this.isDirectory(fullPath)) {
        // Recursive call for subdirectory
        this.traverseDirectory(fullPath, callback);
      } else {
        callback(fullPath);
      }
    }
  }

  static findFiles(dir, extension) {
    const found = [];

    this.traverseDirectory(dir, (file) => {
      if (file.endsWith(extension)) {
        found.push(file);
      }
    });

    return found;
  }
}
```

### 2. JSON Parser

```javascript
class JSONParser {
  static parse(jsonString) {
    return this.parseValue(jsonString.trim());
  }

  static parseValue(str) {
    if (str.startsWith("{")) {
      return this.parseObject(str);
    } else if (str.startsWith("[")) {
      return this.parseArray(str);
    } else if (str.startsWith('"')) {
      return this.parseString(str);
    } else if (str === "true" || str === "false") {
      return str === "true";
    } else if (str === "null") {
      return null;
    } else {
      return this.parseNumber(str);
    }
  }

  static parseObject(str) {
    const result = {};
    const content = str.slice(1, -1).trim();

    if (content === "") return result;

    const pairs = this.splitTopLevel(content, ",");

    for (const pair of pairs) {
      const [key, value] = this.splitTopLevel(pair, ":");
      result[this.parseString(key.trim())] = this.parseValue(value.trim());
    }

    return result;
  }

  static parseArray(str) {
    const result = [];
    const content = str.slice(1, -1).trim();

    if (content === "") return result;

    const elements = this.splitTopLevel(content, ",");

    for (const element of elements) {
      result.push(this.parseValue(element.trim()));
    }

    return result;
  }
}
```

### 3. Expression Evaluator

```javascript
class ExpressionEvaluator {
  static evaluate(expression) {
    return this.parseExpression(expression);
  }

  static parseExpression(expr) {
    // Handle addition and subtraction
    const terms = this.splitByOperator(expr, ["+", "-"]);
    let result = this.parseTerm(terms[0]);

    for (let i = 1; i < terms.length; i += 2) {
      const operator = terms[i];
      const term = this.parseTerm(terms[i + 1]);

      if (operator === "+") {
        result += term;
      } else {
        result -= term;
      }
    }

    return result;
  }

  static parseTerm(term) {
    // Handle multiplication and division
    const factors = this.splitByOperator(term, ["*", "/"]);
    let result = this.parseFactor(factors[0]);

    for (let i = 1; i < factors.length; i += 2) {
      const operator = factors[i];
      const factor = this.parseFactor(factors[i + 1]);

      if (operator === "*") {
        result *= factor;
      } else {
        result /= factor;
      }
    }

    return result;
  }

  static parseFactor(factor) {
    factor = factor.trim();

    if (factor.startsWith("(")) {
      return this.parseExpression(factor.slice(1, -1));
    } else {
      return parseFloat(factor);
    }
  }
}
```

### 4. Game AI (Minimax)

```javascript
class TicTacToeAI {
  static findBestMove(board) {
    let bestMove = null;
    let bestScore = -Infinity;

    for (const move of this.getAvailableMoves(board)) {
      const newBoard = this.makeMove(board, move, "O");
      const score = this.minimax(newBoard, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  static minimax(board, isMaximizing) {
    const winner = this.checkWinner(board);

    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (this.isDraw(board)) return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;

      for (const move of this.getAvailableMoves(board)) {
        const newBoard = this.makeMove(board, move, "O");
        const score = this.minimax(newBoard, false);
        maxScore = Math.max(maxScore, score);
      }

      return maxScore;
    } else {
      let minScore = Infinity;

      for (const move of this.getAvailableMoves(board)) {
        const newBoard = this.makeMove(board, move, "X");
        const score = this.minimax(newBoard, true);
        minScore = Math.min(minScore, score);
      }

      return minScore;
    }
  }
}
```

## 💡 Recursion vs Iteration

### When to Use Recursion

- **Tree-like structures**: File systems, DOM trees, organizational charts
- **Divide and conquer**: Quick sort, merge sort, binary search
- **Backtracking**: N-Queens, Sudoku, maze solving
- **Mathematical sequences**: Fibonacci, factorial, Ackermann

### When to Use Iteration

- **Simple linear processing**: Sum, product, maximum
- **Performance critical**: Avoid stack overhead
- **Large datasets**: Prevent stack overflow
- **Tail recursion**: Can be easily converted to iteration

### Conversion Techniques

```javascript
// Recursive to iterative using stack
function dfsIterative(root) {
  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);

    // Push children in reverse order for correct processing
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return result;
}

// Recursive to iterative using queue (BFS)
function bfsIterative(root) {
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);

    for (const child of node.children) {
      queue.push(child);
    }
  }

  return result;
}
```

## 🚨 Common Mistakes to Avoid

### Recursion Mistakes

- ❌ Missing or incorrect base case
- ❌ Not progressing toward base case
- ❌ Stack overflow on large inputs
- ❌ Exponential time complexity without memoization
- ❌ Not handling edge cases

### Backtracking Mistakes

- ❌ Not properly undoing choices
- ❌ Inefficient validity checking
- ❌ Not pruning the search space
- ❌ Duplicate solutions due to symmetry
- ❌ Memory leaks from accumulated state

### Performance Mistakes

- ❌ Using recursion when iteration is better
- ❌ Not memoizing expensive recursive calls
- ❌ Creating unnecessary objects in recursive calls
- ❌ Deep recursion without tail optimization

## 📖 Additional Resources

### Videos

- **Recursion Explained**: Visual walkthrough of recursive concepts
- **Backtracking Algorithms**: Systematic exploration techniques
- **Dynamic Programming**: Recursion with memoization

### Websites

- **Recursion Visualizer**: See call stack in action
- **Backtracking Problems**: Practice with interactive examples
- **Algorithm Designer**: Design recursive solutions

### Books

- **"Thinking Recursively"**: Deep dive into recursive thinking
- **"Introduction to Algorithms"**: Recursion in algorithm design
- **"Algorithm Design Manual"**: Practical recursive solutions

## 🎓 What You Need from Other Resources

### Mathematics

- **Induction**: Proving recursive correctness
- **Combinatorics**: Counting recursive possibilities
- **Graph Theory**: Recursive graph algorithms

### Data Structures

- **Stacks**: Understanding call stack behavior
- **Trees**: Natural recursive structures
- **Graphs**: Recursive traversal algorithms

---

## 🚀 Getting Started

**Ready to master recursion?**

1. **Start with Basic Recursion** → `implementation.js`
2. **Practice Backtracking** → Systematic exploration
3. **Learn Memoization** → Optimize recursive solutions
4. **Solve Practice Problems** → `practice.js`

> 💡 **Key Insight**: Recursion teaches you _how to think hierarchically_. Master the art of breaking down complex problems into simpler ones!

---

## 📊 Progress Checklist

### Basic Recursion

- [ ] Factorial and Fibonacci
- [ ] Array processing recursively
- [ ] String manipulation
- [ ] Mathematical sequences

### Advanced Recursion

- [ ] Divide and conquer algorithms
- [ ] Tree and graph traversal
- [ ] Memoization techniques
- [ ] Tail recursion optimization

### Backtracking

- [ ] Permutations and combinations
- [ ] N-Queens problem
- [ ] Sudoku solver
- [ ] Maze solving

### Applications

- [ ] File system traversal
- [ ] Expression evaluation
- [ ] Game AI algorithms
- [ ] Parser implementation

---

## 🎯 Interview Focus

### Most Common Recursion Questions

1. **Factorial/Fibonacci** - 60% of interviews
2. **Tree Traversal** - 50% of interviews
3. **Backtracking** - 40% of interviews
4. **Divide and Conquer** - 35% of interviews
5. **Memoization** - 30% of interviews

### Must-Know Recursion Patterns for FAANG

- **Linear Recursion**: Simple sequential processing
- **Binary Recursion**: Divide and conquer
- **Multiple Recursion**: Tree-like exploration
- **Backtracking**: Systematic search
- **Memoization**: Optimization technique

---

_Last Updated: December 2025_  
_Difficulty: Intermediate to Advanced_  
_Prerequisites: Arrays, Functions, Basic Algorithms_  
_Time Commitment: 3-4 weeks_
