# 📊 Arrays & Strings

> **The Foundation of Data Structures**

## 📋 Table of Contents

- [What are Arrays?](#what-are-arrays)
- [Array Properties](#array-properties)
- [Core Operations](#core-operations)
- [String Manipulation](#string-manipulation)
- [Common Patterns](#common-patterns)
- [Advanced Techniques](#advanced-techniques)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Arrays?

### Definition

An array is a collection of elements stored at contiguous memory locations, accessed using zero-based indexing.

### JavaScript Arrays

```javascript
// JavaScript arrays are dynamic and can hold mixed types
const arr = [1, "hello", true, { name: "John" }, [1, 2, 3]];
console.log(arr.length); // 5
console.log(arr[0]); // 1
```

### Why Arrays Matter

- **Fast Access**: O(1) time complexity for element access by index
- **Memory Efficient**: Elements stored contiguously
- **Versatile**: Foundation for many other data structures
- **Interview Essential**: 90% of interview problems involve arrays

## 🔍 Array Properties

### Time Complexity Analysis

```javascript
const arrayOperations = {
  access: "O(1) - Direct index access",
  search: "O(n) - Linear search (unsorted)",
  searchSorted: "O(log n) - Binary search",
  insertEnd: "O(1) - Amortized constant time",
  insertStart: "O(n) - Shift all elements",
  insertMiddle: "O(n) - Shift elements",
  deleteEnd: "O(1) - Constant time",
  deleteStart: "O(n) - Shift all elements",
  deleteMiddle: "O(n) - Shift elements",
};
```

### Space Complexity

- **O(n)** - Space grows linearly with number of elements
- **Contiguous Memory**: Elements stored in sequential memory locations

### JavaScript Array Internals

```javascript
// JavaScript arrays are actually objects with numeric keys
const arr = [1, 2, 3];
console.log(typeof arr); // "object"
console.log(arr[0]); // 1
console.log(arr["0"]); // 1 - same as above

// Sparse arrays
const sparse = new Array(1000); // Array with 1000 empty slots
console.log(sparse.length); // 1000
console.log(sparse[0]); // undefined
```

## ⚡ Core Operations

### Basic Operations

```javascript
class ArrayOperations {
  // Access element by index
  static access(arr, index) {
    return arr[index]; // O(1)
  }

  // Update element
  static update(arr, index, value) {
    arr[index] = value; // O(1)
    return arr;
  }

  // Insert at end
  static insertEnd(arr, value) {
    arr.push(value); // O(1) amortized
    return arr;
  }

  // Insert at start
  static insertStart(arr, value) {
    arr.unshift(value); // O(n)
    return arr;
  }

  // Delete from end
  static deleteEnd(arr) {
    return arr.pop(); // O(1)
  }

  // Delete from start
  static deleteStart(arr) {
    return arr.shift(); // O(n)
  }

  // Find element
  static find(arr, target) {
    return arr.indexOf(target); // O(n)
  }

  // Check if contains
  static contains(arr, target) {
    return arr.includes(target); // O(n)
  }
}
```

### Advanced Operations

```javascript
class AdvancedArrayOperations {
  // Reverse array in place
  static reverse(arr) {
    let left = 0,
      right = arr.length - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    return arr; // O(n) time, O(1) space
  }

  // Rotate array by k positions
  static rotate(arr, k) {
    k = k % arr.length;
    return arr.slice(-k).concat(arr.slice(0, -k)); // O(n) time, O(n) space
  }

  // Rotate in place
  static rotateInPlace(arr, k) {
    k = k % arr.length;
    this.reverse(arr);
    this.reverse(arr.slice(0, k));
    this.reverse(arr.slice(k));
    return arr; // O(n) time, O(1) space
  }

  // Merge two sorted arrays
  static mergeSorted(arr1, arr2) {
    const result = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        result.push(arr1[i++]);
      } else {
        result.push(arr2[j++]);
      }
    }

    return result.concat(arr1.slice(i)).concat(arr2.slice(j)); // O(n + m)
  }

  // Remove duplicates
  static removeDuplicates(arr) {
    const seen = new Set();
    return arr.filter((item) => !seen.has(item) && seen.add(item)); // O(n) time, O(n) space
  }

  // Remove duplicates in place (sorted array)
  static removeDuplicatesInPlace(arr) {
    if (arr.length === 0) return 0;

    let writeIndex = 1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
        arr[writeIndex] = arr[i];
        writeIndex++;
      }
    }

    arr.length = writeIndex;
    return writeIndex; // O(n) time, O(1) space
  }
}
```

## 🧵 String Manipulation

### String vs Array

```javascript
// Strings are immutable in JavaScript
const str = "hello";
str[0] = "H"; // Doesn't work!
console.log(str); // "hello"

// Convert to array for manipulation
const strArray = str.split("");
strArray[0] = "H";
const newStr = strArray.join(""); // "Hello"
```

### Common String Operations

```javascript
class StringOperations {
  // Reverse string
  static reverse(str) {
    return str.split("").reverse().join(""); // O(n)
  }

  // Check palindrome
  static isPalindrome(str) {
    let left = 0,
      right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true; // O(n) time, O(1) space
  }

  // Count characters
  static countChars(str) {
    const count = {};
    for (const char of str) {
      count[char] = (count[char] || 0) + 1;
    }
    return count; // O(n) time, O(k) space where k = unique chars
  }

  // Find all substrings
  static allSubstrings(str) {
    const substrings = [];
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        substrings.push(str.slice(i, j));
      }
    }
    return substrings; // O(n²) time, O(n²) space
  }

  // Longest common prefix
  static longestCommonPrefix(strs) {
    if (strs.length === 0) return "";

    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, -1);
        if (prefix === "") return "";
      }
    }
    return prefix; // O(n * m) where n = strings, m = avg length
  }
}
```

## 🎯 Common Patterns

### 1. Two Pointers

```javascript
// Two pointers moving towards each other
function twoSum(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return []; // O(n) time, O(1) space
}

// Two pointers in same direction
function removeElement(arr, val) {
  let writeIndex = 0;
  for (let readIndex = 0; readIndex < arr.length; readIndex++) {
    if (arr[readIndex] !== val) {
      arr[writeIndex] = arr[readIndex];
      writeIndex++;
    }
  }
  arr.length = writeIndex;
  return writeIndex; // O(n) time, O(1) space
}
```

### 2. Sliding Window

```javascript
// Fixed size window
function maxSumSubarray(arr, k) {
  if (k > arr.length) return 0;

  let maxSum = 0,
    windowSum = 0;

  // Initialize first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum; // O(n) time, O(1) space
}

// Variable size window
function longestSubstringWithoutRepeating(s) {
  const charIndex = new Map();
  let left = 0,
    maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }
    charIndex.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength; // O(n) time, O(k) space
}
```

### 3. Frequency Counting

```javascript
// Using hash map for counting
function findAnagrams(s, p) {
  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);

  // Count characters in pattern
  for (const char of p) {
    pCount[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  let left = 0,
    right = 0;
  while (right < s.length) {
    // Add current character to window
    const currentChar = s[right];
    sCount[currentChar.charCodeAt(0) - "a".charCodeAt(0)]++;

    // Check if window size matches pattern
    if (right - left + 1 === p.length) {
      if (arraysEqual(pCount, sCount)) {
        result.push(left);
      }

      // Remove left character from window
      sCount[s[left].charCodeAt(0) - "a".charCodeAt(0)]--;
      left++;
    }

    right++;
  }

  return result; // O(n) time, O(1) space (fixed alphabet size)
}

function arraysEqual(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}
```

## 🚀 Advanced Techniques

### 1. Matrix Operations

```javascript
class MatrixOperations {
  // Rotate matrix 90 degrees
  static rotate(matrix) {
    const n = matrix.length;

    // Transpose
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }

    // Reverse each row
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }

    return matrix; // O(n²) time, O(1) space
  }

  // Spiral traversal
  static spiralOrder(matrix) {
    const result = [];
    if (matrix.length === 0) return result;

    let top = 0,
      bottom = matrix.length - 1;
    let left = 0,
      right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
      // Traverse right
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top++;

      // Traverse down
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--;

      // Traverse left
      if (top <= bottom) {
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom--;
      }

      // Traverse up
      if (left <= right) {
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++;
      }
    }

    return result; // O(m * n) time, O(1) space
  }
}
```

### 2. Multi-dimensional Arrays

```javascript
// Flatten nested array
function flattenArray(arr) {
  const result = [];

  function helper(nestedArr) {
    for (const item of nestedArr) {
      if (Array.isArray(item)) {
        helper(item);
      } else {
        result.push(item);
      }
    }
  }

  helper(arr);
  return result; // O(n) time where n = total elements
}

// Cartesian product
function cartesianProduct(...arrays) {
  return arrays.reduce(
    (acc, curr) => {
      return acc.flatMap((a) => curr.map((b) => [...a, b]));
    },
    [[]]
  ); // O(n₁ * n₂ * ... * nₖ) time
}
```

## 💪 Practice Problems

### Easy

1. **Two Sum** - Find two numbers that add up to target
2. **Contains Duplicate** - Check if array contains duplicates
3. **Maximum Subarray** - Find contiguous subarray with max sum
4. **Valid Anagram** - Check if two strings are anagrams

### Medium

1. **3Sum** - Find triplets that sum to zero
2. **Container With Most Water** - Max area between two lines
3. **Longest Substring Without Repeating** - Find longest unique substring
4. **Group Anagrams** - Group anagrams together

### Hard

1. **First Missing Positive** - Find smallest missing positive integer
2. **Trapping Rain Water** - Calculate trapped water
3. **Median of Two Sorted Arrays** - Find median of merged sorted arrays
4. **Sudoku Solver** - Solve sudoku using backtracking

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
// 1. Clarify requirements
function solveProblem(arr, target) {
  // Ask questions:
  // - Is array sorted?
  // - Can array have duplicates?
  // - What are constraints?
  // - What should be returned?
}

// 2. Consider edge cases
const edgeCases = [
  [], // Empty array
  [1], // Single element
  [1, 1, 1], // All duplicates
  null, // Null input
  undefined, // Undefined input
];

// 3. Choose approach
const approaches = {
  bruteForce: "Try all combinations",
  optimized: "Use specific pattern/algorithm",
  tradeoffs: "Time vs space complexity",
};
```

### Common Mistakes to Avoid

- ❌ Not checking array bounds
- ❌ Off-by-one errors
- ❌ Modifying array while iterating
- ❌ Not considering empty/null inputs
- ❌ Using wrong data structure for the problem

### Communication Tips

- **Explain your approach** before coding
- **Talk about time/space complexity**
- **Mention edge cases** you're handling
- **Explain trade-offs** of different approaches

## 📖 Additional Resources

### Videos

- **Array Methods - Fireship**: Quick overview
- **Two Pointers - NeetCode**: Pattern explanation
- **Sliding Window - TechLead**: Window technique

### Websites

- **MDN Array Methods**: Complete reference
- **LeetCode Array Problems**: Practice problems
- **GeeksforGeeks Arrays**: Detailed explanations

### Books

- **"Cracking the Coding Interview"**: Array chapter
- **"Elements of Programming Interviews"**: Array section

## 🎓 What You Need from Other Resources

### Mathematical Concepts

- **Combinatorics**: Counting subarrays, permutations
- **Probability**: Random array generation
- **Linear Algebra**: Matrix operations

### Advanced Topics

- **Segment Trees**: Range queries
- **Fenwick Trees**: Prefix sums
- **Sparse Tables**: Range minimum queries

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete practice problems** in `practice.js`
2. **Move to Linked Lists** → `../Linked-Lists/README.md`
3. **Review array patterns** regularly

> 💡 **Key Insight**: Arrays are the most fundamental data structure. Master array operations and patterns - they appear in 90% of interview problems!

---

## 📊 Quick Reference

### Essential Array Methods

```javascript
const methods = {
  // Adding/Removing
  push: "Add to end - O(1)",
  pop: "Remove from end - O(1)",
  unshift: "Add to start - O(n)",
  shift: "Remove from start - O(n)",
  splice: "Add/remove anywhere - O(n)",

  // Searching
  indexOf: "Find index - O(n)",
  includes: "Check existence - O(n)",
  find: "Find element - O(n)",

  // Iterating
  forEach: "Iterate - O(n)",
  map: "Transform - O(n)",
  filter: "Filter - O(n)",
  reduce: "Reduce - O(n)",

  // Sorting
  sort: "Sort - O(n log n)",
  reverse: "Reverse - O(n)",
};
```

### Must-Know Patterns

- **Two Pointers**: O(n) with two indices
- **Sliding Window**: O(n) with variable window
- **Frequency Counting**: O(n) with hash map
- **Prefix Sum**: O(n) preprocessing, O(1) queries

---

_Last Updated: December 2025_  
_Difficulty: Beginner to Intermediate_  
_Prerequisites: Big O Complexity_  
_Time Commitment: 1 week_
