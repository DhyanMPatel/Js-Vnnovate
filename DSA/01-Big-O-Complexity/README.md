# 📊 Big O Notation & Complexity Analysis

> **The Foundation of Algorithm Analysis**

## 📋 Table of Contents

- [What is Big O?](#what-is-big-o)
- [Time Complexity](#time-complexity)
- [Space Complexity](#space-complexity)
- [Common Complexities](#common-complexities)
- [Analysis Techniques](#analysis-techniques)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What is Big O?

### Definition

Big O notation describes how the runtime or space requirements of an algorithm grow as the input size grows.

### Why It Matters

```javascript
// Example: Finding an element in an array

// O(n) - Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // n iterations
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(log n) - Binary Search (sorted array)
function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### Key Principles

- **Worst Case**: Big O describes the worst-case scenario
- **Growth Rate**: Focus on how performance scales, not absolute time
- **Drop Constants**: O(2n) becomes O(n), O(n/2) becomes O(n)
- **Drop Lower Terms**: O(n² + n) becomes O(n²)

## ⏱️ Time Complexity

### O(1) - Constant Time

```javascript
// Always takes the same time regardless of input size
function getFirstElement(arr) {
  return arr[0]; // Always one operation
}

function addToObject(obj, key, value) {
  obj[key] = value; // Always one operation
  return obj;
}
```

### O(log n) - Logarithmic Time

```javascript
// Divide and conquer approaches
function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    // Logarithmic reduction
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Tree traversal to a specific depth
function findInBinaryTree(root, target, depth = 0) {
  if (!root) return null;
  if (root.value === target) return root;

  // Each level reduces the search space
  return (
    findInBinaryTree(root.left, target, depth + 1) ||
    findInBinaryTree(root.right, target, depth + 1)
  );
}
```

### O(n) - Linear Time

```javascript
// One pass through the data
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // n iterations
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

function sumArray(arr) {
  let sum = 0;
  for (const num of arr) {
    // n iterations
    sum += num;
  }
  return sum;
}
```

### O(n log n) - Linearithmic Time

```javascript
// Efficient sorting algorithms
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right); // O(n) operation, log n levels
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
```

### O(n²) - Quadratic Time

```javascript
// Nested loops over the same data
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // n iterations
    for (let j = 0; j < arr.length - i - 1; j++) {
      // n iterations
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function findPairs(arr, target) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    // n iterations
    for (let j = i + 1; j < arr.length; j++) {
      // n iterations
      if (arr[i] + arr[j] === target) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }
  return pairs;
}
```

### O(2ⁿ) - Exponential Time

```javascript
// Recursive problems with overlapping subproblems
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // Two recursive calls
}

function allSubsets(arr) {
  const subsets = [];

  function backtrack(index, current) {
    if (index === arr.length) {
      subsets.push([...current]);
      return;
    }

    // Include current element
    current.push(arr[index]);
    backtrack(index + 1, current);
    current.pop();

    // Exclude current element
    backtrack(index + 1, current);
  }

  backtrack(0, []);
  return subsets;
}
```

## 💾 Space Complexity

### O(1) - Constant Space

```javascript
// No additional memory that scales with input
function reverseArrayInPlace(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr; // No extra space used
}

function isPalindrome(str) {
  let left = 0,
    right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### O(n) - Linear Space

```javascript
// Space grows linearly with input
function reverseArray(arr) {
  const reversed = []; // New array of size n
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n]; // Memo object grows with n
}
```

### O(n²) - Quadratic Space

```javascript
// 2D structures or nested data
function createMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    // n rows
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      // n columns
      matrix[i][j] = i * j;
    }
  }
  return matrix; // n x n matrix
}

function allPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs; // n² pairs
}
```

## 📈 Common Complexities (Best to Worst)

```
O(1)      - Excellent: Constant time/space
O(log n)  - Great: Logarithmic growth
O(n)      - Good: Linear growth
O(n log n)- Fair: Linearithmic growth
O(n²)     - Bad: Quadratic growth
O(n³)     - Terrible: Cubic growth
O(2ⁿ)     - Horrible: Exponential growth
O(n!)     - Worst: Factorial growth
```

### Practical Limits

```javascript
// Assuming 1 operation = 1 nanosecond

const complexityLimits = {
  "O(1)": "1 billion operations",
  "O(log n)": "30 operations for n=1 billion",
  "O(n)": "1 second for n=1 billion",
  "O(n log n)": "30 seconds for n=1 billion",
  "O(n²)": "31 years for n=1 million",
  "O(2ⁿ)": "Impossible for n>50",
};
```

## 🔍 Analysis Techniques

### Step-by-Step Analysis

```javascript
function exampleFunction(arr) {
  let max = 0; // O(1)

  for (let i = 0; i < arr.length; i++) {
    // O(n)
    if (arr[i] > max) {
      // O(1)
      max = arr[i]; // O(1)
    }
  }

  return max; // O(1)
}

// Total: O(1) + O(n) + O(1) = O(n)
```

### Recursive Analysis

```javascript
function recursiveSum(arr, n = arr.length) {
  if (n <= 0) return 0; // Base case: O(1)

  return arr[n - 1] + recursiveSum(arr, n - 1); // Recursive call
}

// Each call processes one element: O(n) total
```

### Multiple Parameters

```javascript
function processArrays(arr1, arr2) {
  for (const item1 of arr1) {
    // O(n)
    console.log(item1);
  }

  for (const item2 of arr2) {
    // O(m)
    console.log(item2);
  }
}

// Total: O(n + m)
```

### Nested Different Inputs

```javascript
function compareArrays(arr1, arr2) {
  for (const item1 of arr1) {
    // O(n)
    for (const item2 of arr2) {
      // O(m)
      if (item1 === item2) return true;
    }
  }
  return false;
}

// Total: O(n × m)
```

## 💡 Optimization Strategies

### Time Optimization

```javascript
// Before: O(n²)
function findDuplicatesSlow(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) duplicates.push(arr[i]);
    }
  }
  return duplicates;
}

// After: O(n)
function findDuplicatesFast(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }

  return Array.from(duplicates);
}
```

### Space Optimization

```javascript
// Before: O(n) space
function reverseWithExtraSpace(arr) {
  return arr.reverse(); // Creates new array
}

// After: O(1) space
function reverseInPlace(arr) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
```

## 🎯 Practice Problems

### Beginner

1. **Find Maximum**: O(n) time, O(1) space
2. **Check Palindrome**: O(n) time, O(1) space
3. **Count Occurrences**: O(n) time, O(1) space

### Intermediate

1. **Two Sum**: O(n) time, O(n) space
2. **Valid Anagram**: O(n log n) or O(n) time
3. **Merge Sorted Arrays**: O(n + m) time

### Advanced

1. **Container With Most Water**: O(n) time, O(1) space
2. **Longest Consecutive Sequence**: O(n) time, O(n) space
3. **Trapping Rain Water**: O(n) time, O(1) space

## 🎤 Interview Tips

### How to Analyze in Real-Time

```javascript
// Interview thought process:

// 1. Identify the input size
function interviewProblem(arr) {
  const n = arr.length; // This is our 'n'

  // 2. Count the operations
  for (let i = 0; i < n; i++) {
    // n iterations
    // Some O(1) operation
  }

  // 3. Look for nested loops
  for (let i = 0; i < n; i++) {
    // n iterations
    for (let j = 0; j < n; j++) {
      // n iterations
      // Some O(1) operation
    }
  }
  // Total: O(n²)
}
```

### Common Interview Questions

- "What's the time complexity of this code?"
- "Can you optimize this further?"
- "What's the space complexity?"
- "How would this scale to 1 million users?"

### Red Flags to Avoid

- ❌ "I don't know Big O" (Learn it!)
- ❌ Guessing without reasoning
- ❌ Ignoring space complexity
- ❌ Forgetting edge cases in analysis

## 📚 What You Need from Other Resources

### Mathematical Background

- **Logarithms**: Understanding log base 2
- **Series and Sequences**: Summation notation
- **Limits**: Understanding growth rates

### Advanced Analysis

- **Amortized Analysis**: Average case over operations
- **Best/Worst/Average Case**: Different scenarios
- **Recurrence Relations**: Recursive algorithm analysis

### Practice Platforms

- **LeetCode**: Problem difficulty ratings
- **HackerRank**: Big O specific problems
- **CodeSignal**: Interview-style complexity questions

---

## 🚀 Next Steps

**Ready to move on?**

1. **Practice Big O analysis** on simple problems
2. **Complete the practice problems** above
3. **Move to Data Structures** → `../02-Data-Structures/README.md`

> 💡 **Key Takeaway**: Big O is about _growth rate_, not absolute performance. Master this concept and everything else becomes easier!

---

## 📖 Recommended Resources

### Videos

- **Big O Notation - CS50**: Harvard's introduction
- **Big O Explained - Fireship**: Quick overview
- **Algorithm Analysis - NeetCode**: Interview-focused

### Websites

- **Big-O Cheat Sheet**: complexity reference
- **VisuAlgo**: Algorithm visualizations
- **GeeksforGeeks**: Detailed explanations

### Books

- **"Algorithm Design Manual"**: Practical approach
- **"Introduction to Algorithms"**: Deep theoretical treatment

---

_Last Updated: December 2025_  
_Difficulty: Beginner_  
_Prerequisites: JavaScript basics_  
_Time Commitment: 1-2 weeks_
