// 📊 Arrays & Strings Implementation
// Complete implementations of array operations and utilities

// ==========================================
// BASIC ARRAY OPERATIONS
// ==========================================

class MyArray {
  constructor() {
    this.data = {};
    this.length = 0;
  }

  // Get element at index
  get(index) {
    return this.data[index];
  }

  // Push element to end
  push(value) {
    this.data[this.length] = value;
    this.length++;
    return this.length;
  }

  // Pop element from end
  pop() {
    if (this.length === 0) return undefined;

    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  // Insert at index
  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    // Shift elements to the right
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }

    this.data[index] = value;
    this.length++;
    return true;
  }

  // Delete at index
  delete(index) {
    if (index < 0 || index >= this.length) return undefined;

    const item = this.data[index];

    // Shift elements to the left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.length - 1];
    this.length--;
    return item;
  }

  // Convert to JavaScript array
  toArray() {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.data[i]);
    }
    return result;
  }
}

// ==========================================
// ADVANCED ARRAY OPERATIONS
// ==========================================

class ArrayUtils {
  // Reverse array in place
  static reverse(arr) {
    let left = 0,
      right = arr.length - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }

    return arr;
  }

  // Rotate array by k positions (in place)
  static rotate(arr, k) {
    k = k % arr.length;
    if (k === 0) return arr;

    // Helper function to reverse portion
    const reverse = (start, end) => {
      while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
      }
    };

    // Reverse entire array
    reverse(0, arr.length - 1);
    // Reverse first k elements
    reverse(0, k - 1);
    // Reverse remaining elements
    reverse(k, arr.length - 1);

    return arr;
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

    // Add remaining elements
    return result.concat(arr1.slice(i)).concat(arr2.slice(j));
  }

  // Remove duplicates (unsorted array)
  static removeDuplicates(arr) {
    const seen = new Set();
    const result = [];

    for (const item of arr) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }

    return result;
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
    return writeIndex;
  }

  // Move zeros to end
  static moveZeros(arr) {
    let writeIndex = 0;

    // Move non-zero elements forward
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        arr[writeIndex] = arr[i];
        writeIndex++;
      }
    }

    // Fill remaining positions with zeros
    while (writeIndex < arr.length) {
      arr[writeIndex] = 0;
      writeIndex++;
    }

    return arr;
  }
}

// ==========================================
// STRING OPERATIONS
// ==========================================

class StringUtils {
  // Reverse string
  static reverse(str) {
    return str.split("").reverse().join("");
  }

  // Check if string is palindrome
  static isPalindrome(str) {
    let left = 0,
      right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }

    return true;
  }

  // Count character frequencies
  static countChars(str) {
    const count = {};

    for (const char of str) {
      count[char] = (count[char] || 0) + 1;
    }

    return count;
  }

  // Find all substrings
  static allSubstrings(str) {
    const substrings = [];

    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        substrings.push(str.slice(i, j));
      }
    }

    return substrings;
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

    return prefix;
  }

  // Check if two strings are anagrams
  static isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;

    const count = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
      count[s1.charCodeAt(i) - "a".charCodeAt(0)]++;
      count[s2.charCodeAt(i) - "a".charCodeAt(0)]--;
    }

    return count.every((c) => c === 0);
  }
}

// ==========================================
// ALGORITHM PATTERN IMPLEMENTATIONS
// ==========================================

class ArrayPatterns {
  // Two Pointers - Two Sum (sorted array)
  static twoSum(arr, target) {
    let left = 0,
      right = arr.length - 1;

    while (left < right) {
      const sum = arr[left] + arr[right];

      if (sum === target) {
        return [left, right];
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return [];
  }

  // Sliding Window - Maximum sum subarray of size k
  static maxSumSubarray(arr, k) {
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

    return maxSum;
  }

  // Sliding Window - Longest substring without repeating characters
  static longestUniqueSubstring(s) {
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

    return maxLength;
  }

  // Frequency Counting - Find all anagrams in string
  static findAnagrams(s, p) {
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
        if (this.arraysEqual(pCount, sCount)) {
          result.push(left);
        }

        // Remove left character from window
        sCount[s[left].charCodeAt(0) - "a".charCodeAt(0)]--;
        left++;
      }

      right++;
    }

    return result;
  }

  // Helper method to compare arrays
  static arraysEqual(arr1, arr2) {
    return arr1.every((val, index) => val === arr2[index]);
  }

  // Prefix Sum - Range sum queries
  static createPrefixSum(arr) {
    const prefixSum = [0];

    for (let i = 0; i < arr.length; i++) {
      prefixSum[i + 1] = prefixSum[i] + arr[i];
    }

    return prefixSum;
  }

  // Range sum using prefix sum
  static rangeSum(prefixSum, left, right) {
    return prefixSum[right + 1] - prefixSum[left];
  }
}

// ==========================================
// MATRIX OPERATIONS
// ==========================================

class MatrixUtils {
  // Rotate matrix 90 degrees clockwise
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

    return matrix;
  }

  // Spiral order traversal
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

    return result;
  }

  // Search in 2D matrix (sorted row-wise and column-wise)
  static searchMatrix(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) return false;

    let row = 0,
      col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
      const current = matrix[row][col];

      if (current === target) {
        return true;
      } else if (current > target) {
        col--;
      } else {
        row++;
      }
    }

    return false;
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Array Implementation Tests...\n");

  // Test MyArray
  console.log("📊 Testing MyArray:");
  const myArray = new MyArray();
  myArray.push(1);
  myArray.push(2);
  myArray.push(3);
  console.log("After pushes:", myArray.toArray());
  myArray.insert(1, 5);
  console.log("After insert 5 at index 1:", myArray.toArray());
  myArray.delete(2);
  console.log("After delete at index 2:", myArray.toArray());
  console.log("Popped:", myArray.pop());
  console.log("Final array:", myArray.toArray());

  // Test ArrayUtils
  console.log("\n🔧 Testing ArrayUtils:");
  const testArr = [1, 2, 3, 4, 5];
  console.log("Original:", testArr);
  console.log("Reversed:", ArrayUtils.reverse([...testArr]));
  console.log("Rotated by 2:", ArrayUtils.rotate([...testArr], 2));

  const arr1 = [1, 3, 5],
    arr2 = [2, 4, 6];
  console.log("Merged sorted:", ArrayUtils.mergeSorted(arr1, arr2));

  const dupArr = [1, 2, 2, 3, 4, 4, 5];
  console.log("Remove duplicates:", ArrayUtils.removeDuplicates(dupArr));

  // Test StringUtils
  console.log("\n🧵 Testing StringUtils:");
  const testStr = "hello";
  console.log("Original:", testStr);
  console.log("Reversed:", StringUtils.reverse(testStr));
  console.log("Is palindrome:", StringUtils.isPalindrome("racecar"));
  console.log("Character count:", StringUtils.countChars(testStr));
  console.log("Is anagram:", StringUtils.isAnagram("listen", "silent"));

  // Test ArrayPatterns
  console.log("\n🎯 Testing ArrayPatterns:");
  const twoSumArr = [1, 2, 3, 4, 5, 6];
  console.log("Two sum (target 7):", ArrayPatterns.twoSum(twoSumArr, 7));

  const windowArr = [1, 4, 2, 10, 23, 3, 1, 0, 20];
  console.log(
    "Max sum subarray (k=4):",
    ArrayPatterns.maxSumSubarray(windowArr, 4)
  );

  const uniqueStr = "abcabcbb";
  console.log(
    "Longest unique substring:",
    ArrayPatterns.longestUniqueSubstring(uniqueStr)
  );

  // Test MatrixUtils
  console.log("\n🏗️ Testing MatrixUtils:");
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  console.log("Original matrix:");
  console.table(matrix);
  console.log("Spiral order:", MatrixUtils.spiralOrder(matrix));

  const rotated = MatrixUtils.rotate(JSON.parse(JSON.stringify(matrix)));
  console.log("Rotated matrix:");
  console.table(rotated);

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  MyArray,
  ArrayUtils,
  StringUtils,
  ArrayPatterns,
  MatrixUtils,
};
