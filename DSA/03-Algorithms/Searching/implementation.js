// 🔍 Searching Algorithms Implementation
// Complete implementations of all search algorithms with analysis

// ==========================================
// LINEAR SEARCH ALGORITHMS
// ==========================================

/**
 * Basic Linear Search
 * Search through array sequentially
 * Time: O(n)
 * Space: O(1)
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}

/**
 * Optimized Linear Search
 * Check first and last elements first
 */
function optimizedLinearSearch(arr, target) {
  if (arr.length === 0) return -1;

  // Check first element
  if (arr[0] === target) return 0;

  // Check last element
  if (arr[arr.length - 1] === target) return arr.length - 1;

  // Search remaining elements
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

/**
 * Find All Occurrences
 * Return all indices where target appears
 */
function findAllOccurrences(arr, target) {
  const occurrences = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      occurrences.push(i);
    }
  }
  return occurrences;
}

/**
 * Count Occurrences
 * Count how many times target appears
 */
function countOccurrences(arr, target) {
  let count = 0;
  for (const element of arr) {
    if (element === target) count++;
  }
  return count;
}

/**
 * Search in 2D Array
 * Find target in 2D matrix
 */
function search2DArray(matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        return [i, j]; // Return coordinates
      }
    }
  }
  return null; // Not found
}

/**
 * Search with Sentinel
 * Add sentinel value to avoid bounds checking
 */
function sentinelSearch(arr, target) {
  const n = arr.length;
  const last = arr[n - 1];

  // Place target at the end as sentinel
  arr[n - 1] = target;
  let i = 0;

  while (arr[i] !== target) {
    i++;
  }

  // Restore original value
  arr[n - 1] = last;

  // Check if we found the target or the sentinel
  return i < n - 1 || arr[n - 1] === target ? i : -1;
}

// ==========================================
// BINARY SEARCH ALGORITHMS
// ==========================================

/**
 * Basic Binary Search
 * Iterative implementation
 * Time: O(log n)
 * Space: O(1)
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Prevent overflow: mid = left + (right - left) / 2
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}

/**
 * Recursive Binary Search
 * Time: O(log n)
 * Space: O(log n) due to recursion stack
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

/**
 * Find First Occurrence
 * Find leftmost occurrence of target
 */
function findFirstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching left
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Find Last Occurrence
 * Find rightmost occurrence of target
 */
function findLastOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching right
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Count Occurrences in Sorted Array
 * Use first and last occurrence to count
 */
function countOccurrencesSorted(arr, target) {
  const first = findFirstOccurrence(arr, target);
  if (first === -1) return 0;

  const last = findLastOccurrence(arr, target);
  return last - first + 1;
}

/**
 * Search Insert Position
 * Find where to insert target to maintain sorted order
 */
function searchInsertPosition(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Floor and Ceiling
 * Find greatest element <= target and smallest element >= target
 */
function floorAndCeiling(arr, target) {
  const floor = findFloor(arr, target);
  const ceiling = findCeiling(arr, target);

  return { floor, ceiling };
}

function findFloor(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let floor = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return arr[mid];
    } else if (arr[mid] < target) {
      floor = arr[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return floor;
}

function findCeiling(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ceiling = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return arr[mid];
    } else if (arr[mid] > target) {
      ceiling = arr[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ceiling;
}

// ==========================================
// ADVANCED SEARCH TECHNIQUES
// ==========================================

/**
 * Jump Search
 * Block-based search for sorted arrays
 * Time: O(√n)
 * Space: O(1)
 */
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;

  // Find the block where element could be
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }

  // Linear search within the block
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }

  return arr[prev] === target ? prev : -1;
}

/**
 * Interpolation Search
 * Estimate position based on value distribution
 * Time: O(log log n) average, O(n) worst
 * Space: O(1)
 */
function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right && target >= arr[left] && target <= arr[right]) {
    // Estimate position using interpolation formula
    const pos =
      left +
      Math.floor(
        ((target - arr[left]) * (right - left)) / (arr[right] - arr[left])
      );

    if (arr[pos] === target) {
      return pos;
    } else if (arr[pos] < target) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }

  return -1;
}

/**
 * Exponential Search
 * Find range then binary search within it
 * Time: O(log n)
 * Space: O(1)
 */
function exponentialSearch(arr, target) {
  const n = arr.length;

  // Handle first element
  if (arr[0] === target) return 0;

  // Find range for binary search
  let i = 1;
  while (i < n && arr[i] <= target) {
    i = i * 2;
  }

  // Binary search in found range
  return binarySearch(arr.slice(i / 2, Math.min(i, n)), target) + i / 2;
}

/**
 * Ternary Search
 * Divide array into three parts
 * Time: O(log₃ n)
 * Space: O(1)
 */
function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;

    if (target < arr[mid1]) {
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }

  return -1;
}

/**
 * Fibonacci Search
 * Use Fibonacci numbers to divide array
 * Time: O(log n)
 * Space: O(1)
 */
function fibonacciSearch(arr, target) {
  const n = arr.length;

  // Initialize fibonacci numbers
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM2 + fibM1; // m'th Fibonacci number

  // Find the smallest Fibonacci number greater than or equal to n
  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }

  // Marks the eliminated range from front
  let offset = -1;

  while (fibM > 1) {
    // Check if fibM2 is a valid location
    const i = Math.min(offset + fibM2, n - 1);

    if (arr[i] < target) {
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
    } else if (arr[i] > target) {
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
    } else {
      return i;
    }
  }

  // Check for the last element
  if (fibM1 && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1;
}

// ==========================================
// SEARCH IN SPECIAL STRUCTURES
// ==========================================

/**
 * Search in Rotated Sorted Array
 * Array is sorted but rotated at some pivot
 */
function searchRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

/**
 * Search in Rotated Array with Duplicates
 */
function searchRotatedArrayWithDuplicates(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // When left, mid, and right are equal, we can't decide which side is sorted
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
      continue;
    }

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

/**
 * Find Minimum in Rotated Sorted Array
 */
function findMinInRotatedArray(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}

/**
 * Find Peak Element
 * Element greater than its neighbors
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

/**
 * Search in 2D Matrix (Row-wise and Column-wise sorted)
 */
function searchMatrix(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}

/**
 * Search in 2D Matrix (Flattened sorted)
 */
function searchMatrix2(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = matrix[Math.floor(mid / n)][mid % n];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

// ==========================================
// SEARCH IN DATA STRUCTURES
// ==========================================

/**
 * Search in Linked List
 */
function searchLinkedList(head, target) {
  let current = head;
  let index = 0;

  while (current !== null) {
    if (current.value === target) {
      return index;
    }
    current = current.next;
    index++;
  }

  return -1;
}

/**
 * Search in Binary Search Tree
 */
function searchBST(root, target) {
  if (root === null) return null;

  if (root.value === target) {
    return root;
  } else if (target < root.value) {
    return searchBST(root.left, target);
  } else {
    return searchBST(root.right, target);
  }
}

/**
 * Search in Hash Table
 */
function searchHashTable(hashTable, key) {
  const index = hashFunction(key) % hashTable.size;

  // Handle collisions (chaining)
  let current = hashTable.buckets[index];
  while (current !== null) {
    if (current.key === key) {
      return current.value;
    }
    current = current.next;
  }

  return null;
}

function hashFunction(key) {
  // Simple hash function for demonstration
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Search in Trie
 */
function searchTrie(root, word) {
  let current = root;

  for (const char of word) {
    if (!current.children[char]) {
      return false;
    }
    current = current.children[char];
  }

  return current.isEndOfWord;
}

// ==========================================
// ADVANCED SEARCH APPLICATIONS
// ==========================================

/**
 * Auto-complete System
 */
class AutoComplete {
  constructor() {
    this.trie = new TrieNode();
  }

  insert(word) {
    let current = this.trie;
    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
    current.suggestions = [];
  }

  search(prefix) {
    let current = this.trie;
    for (const char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    return this.getAllWords(current, prefix);
  }

  getAllWords(node, prefix) {
    const words = [];

    function dfs(currentNode, currentPrefix) {
      if (currentNode.isEndOfWord) {
        words.push(currentPrefix);
      }

      for (const char in currentNode.children) {
        dfs(currentNode.children[char], currentPrefix + char);
      }
    }

    dfs(node, prefix);
    return words;
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.suggestions = [];
  }
}

/**
 * File System Search
 */
class FileSystemSearch {
  constructor() {
    this.files = new Map(); // filename -> path
    this.index = new Map(); // word -> Set of filenames
  }

  addFile(path, content) {
    const filename = path.split("/").pop();
    this.files.set(filename, path);

    // Index words in content
    const words = content.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (!this.index.has(word)) {
        this.index.set(word, new Set());
      }
      this.index.get(word).add(filename);
    }
  }

  searchByFilename(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const [filename, path] of this.files) {
      if (filename.toLowerCase().includes(lowerQuery)) {
        results.push({ filename, path, type: "filename" });
      }
    }

    return results;
  }

  searchByContent(query) {
    const results = [];
    const words = query.toLowerCase().split(/\s+/);

    // Find files containing all query words
    let candidateFiles = null;

    for (const word of words) {
      const wordFiles = this.index.get(word) || new Set();

      if (candidateFiles === null) {
        candidateFiles = new Set(wordFiles);
      } else {
        // Intersection
        candidateFiles = new Set(
          [...candidateFiles].filter((file) => wordFiles.has(file))
        );
      }
    }

    if (candidateFiles) {
      for (const filename of candidateFiles) {
        results.push({
          filename,
          path: this.files.get(filename),
          type: "content",
        });
      }
    }

    return results;
  }
}

/**
 * Database Index Search
 */
class DatabaseIndex {
  constructor() {
    this.primaryIndex = new Map(); // id -> record
    this.secondaryIndexes = new Map(); // field -> Map(value -> Set(ids))
  }

  addRecord(id, record) {
    this.primaryIndex.set(id, record);

    // Update secondary indexes
    for (const [field, value] of Object.entries(record)) {
      if (!this.secondaryIndexes.has(field)) {
        this.secondaryIndexes.set(field, new Map());
      }

      const fieldIndex = this.secondaryIndexes.get(field);
      if (!fieldIndex.has(value)) {
        fieldIndex.set(value, new Set());
      }
      fieldIndex.get(value).add(id);
    }
  }

  searchById(id) {
    return this.primaryIndex.get(id);
  }

  searchByField(field, value) {
    const fieldIndex = this.secondaryIndexes.get(field);
    if (!fieldIndex) return [];

    const ids = fieldIndex.get(value) || new Set();
    return Array.from(ids).map((id) => this.primaryIndex.get(id));
  }

  searchByRange(field, minValue, maxValue) {
    const fieldIndex = this.secondaryIndexes.get(field);
    if (!fieldIndex) return [];

    const results = [];
    for (const [value, ids] of fieldIndex) {
      if (value >= minValue && value <= maxValue) {
        for (const id of ids) {
          results.push(this.primaryIndex.get(id));
        }
      }
    }

    return results;
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Compare search algorithms
 */
function compareSearchAlgorithms(arr, target) {
  const algorithms = {
    "Linear Search": linearSearch,
    "Binary Search": binarySearch,
    "Jump Search": jumpSearch,
    "Interpolation Search": interpolationSearch,
    "Exponential Search": exponentialSearch,
  };

  const results = {};

  for (const [name, algorithm] of Object.entries(algorithms)) {
    const startTime = performance.now();
    const index = algorithm(arr, target);
    const endTime = performance.now();

    results[name] = {
      index,
      time: endTime - startTime,
      found: index !== -1,
    };
  }

  return results;
}

/**
 * Generate test arrays
 */
function generateTestArrays() {
  return {
    empty: [],
    single: [42],
    sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    reverse: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    random: Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 1000)
    ),
    withDuplicates: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4],
    large: Array.from({ length: 10000 }, (_, i) => i),
  };
}

/**
 * Validate search result
 */
function validateSearchResult(arr, target, index) {
  if (index === -1) {
    return !arr.includes(target);
  }
  return arr[index] === target;
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runSearchTests() {
  console.log("🧪 Running Search Algorithm Tests...\n");

  // Test arrays
  const testArrays = generateTestArrays();

  // Test cases
  const testCases = [
    { array: testArrays.empty, target: 5, expected: -1 },
    { array: testArrays.single, target: 42, expected: 0 },
    { array: testArrays.sorted, target: 5, expected: 4 },
    { array: testArrays.sorted, target: 11, expected: -1 },
    { array: testArrays.withDuplicates, target: 3, expected: 3 }, // First occurrence
    { array: testArrays.random, target: 500, expected: "any" }, // May or may not exist
  ];

  // Test linear search
  console.log("🔍 Testing Linear Search:");
  for (const testCase of testCases) {
    const result = linearSearch(testCase.array, testCase.target);
    const isValid =
      testCase.expected === "any" ||
      validateSearchResult(testCase.array, testCase.target, result);

    console.log(
      `  Target ${testCase.target}: ${isValid ? "✅" : "❌"} (index: ${result})`
    );
  }

  // Test binary search (only on sorted arrays)
  console.log("\n🔍 Testing Binary Search:");
  const sortedTestCases = testCases.filter(
    (tc) =>
      tc.array === testArrays.sorted || tc.array === testArrays.withDuplicates
  );

  for (const testCase of sortedTestCases) {
    const result = binarySearch(testCase.array, testCase.target);
    const isValid = validateSearchResult(
      testCase.array,
      testCase.target,
      result
    );

    console.log(
      `  Target ${testCase.target}: ${isValid ? "✅" : "❌"} (index: ${result})`
    );
  }

  // Test first and last occurrence
  console.log("\n🔍 Testing First/Last Occurrence:");
  const dupArray = testArrays.withDuplicates;
  console.log(`  First occurrence of 3: ${findFirstOccurrence(dupArray, 3)}`);
  console.log(`  Last occurrence of 3: ${findLastOccurrence(dupArray, 3)}`);
  console.log(`  Count of 3s: ${countOccurrencesSorted(dupArray, 3)}`);

  // Test search insert position
  console.log("\n🔍 Testing Search Insert Position:");
  const insertTests = [
    { array: [1, 3, 5, 6], target: 5, expected: 2 },
    { array: [1, 3, 5, 6], target: 2, expected: 1 },
    { array: [1, 3, 5, 6], target: 7, expected: 4 },
  ];

  for (const test of insertTests) {
    const result = searchInsertPosition(test.array, test.target);
    console.log(
      `  Insert ${test.target} in [${test.array.join(",")}]: ${result} ${
        result === test.expected ? "✅" : "❌"
      }`
    );
  }

  // Test rotated array search
  console.log("\n🔍 Testing Rotated Array Search:");
  const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
  const rotatedTests = [0, 3, 5, 7];

  for (const target of rotatedTests) {
    const result = searchRotatedArray(rotatedArray, target);
    console.log(`  Search ${target}: ${result} ${result !== -1 ? "✅" : "❌"}`);
  }

  // Test matrix search
  console.log("\n🔍 Testing Matrix Search:");
  const matrix = [
    [1, 4, 7, 11],
    [2, 5, 8, 12],
    [3, 6, 9, 16],
    [10, 13, 14, 17],
  ];

  const matrixTests = [5, 15, 14];
  for (const target of matrixTests) {
    const result = searchMatrix(matrix, target);
    console.log(`  Search ${target} in matrix: ${result ? "✅" : "❌"}`);
  }

  // Performance comparison
  console.log("\n⚡ Performance Comparison:");
  const largeArray = testArrays.large;
  const target = 5000;

  const performanceResults = compareSearchAlgorithms(largeArray, target);
  for (const [name, result] of Object.entries(performanceResults)) {
    console.log(
      `${name}: ${result.time.toFixed(4)}ms ${result.found ? "✅" : "❌"}`
    );
  }

  console.log("\n✅ All tests completed!");
}

// Export all search functions and utilities
module.exports = {
  // Linear search
  linearSearch,
  optimizedLinearSearch,
  findAllOccurrences,
  countOccurrences,
  search2DArray,
  sentinelSearch,

  // Binary search
  binarySearch,
  binarySearchRecursive,
  findFirstOccurrence,
  findLastOccurrence,
  countOccurrencesSorted,
  searchInsertPosition,
  floorAndCeiling,
  findFloor,
  findCeiling,

  // Advanced search
  jumpSearch,
  interpolationSearch,
  exponentialSearch,
  ternarySearch,
  fibonacciSearch,

  // Special structures
  searchRotatedArray,
  searchRotatedArrayWithDuplicates,
  findMinInRotatedArray,
  findPeakElement,
  searchMatrix,
  searchMatrix2,

  // Data structures
  searchLinkedList,
  searchBST,
  searchHashTable,
  searchTrie,

  // Advanced applications
  AutoComplete,
  FileSystemSearch,
  DatabaseIndex,

  // Utilities
  compareSearchAlgorithms,
  generateTestArrays,
  validateSearchResult,
  runSearchTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runSearchTests();
}
