# 🔍 Searching Algorithms

> **Efficient Data Location and Retrieval**

## 📋 Table of Contents

- [What are Searching Algorithms?](#what-are-searching-algorithms)
- [Search Algorithm Types](#search-algorithm-types)
- [Linear Search](#linear-search)
- [Binary Search](#binary-search)
- [Advanced Search Techniques](#advanced-search-techniques)
- [Search in Data Structures](#search-in-data-structures)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Searching Algorithms?

### Definition

Searching algorithms are methods for finding a specific item or set of items from a collection of data. The efficiency of a search algorithm depends on the data structure and the organization of the data.

### Real-World Analogy

```javascript
// Think of finding a book in a library:
// - Linear Search: Check every book one by one
// - Binary Search: Use card catalog to narrow down sections
// - Hash Search: Use ISBN to directly locate book
// - Tree Search: Navigate through library sections systematically

const librarySearch = {
  linear: "Check every shelf sequentially",
  binary: "Use dewey decimal system to narrow down",
  hash: "Use ISBN for direct lookup",
  tree: "Navigate through sections and subsections",
};
```

### Why Search Algorithms Matter

- **Data Retrieval**: Finding information in databases
- **User Experience**: Quick search functionality in applications
- **System Performance**: Efficient data access patterns
- **Algorithm Design**: Foundation for many complex algorithms

## 🔍 Search Algorithm Types

### 1. Linear Search

```javascript
// Sequential search through all elements
// Time: O(n)
// Space: O(1)
```

### 2. Binary Search

```javascript
// Divide and conquer on sorted data
// Time: O(log n)
// Space: O(1) or O(log n) recursive
```

### 3. Jump Search

```javascript
// Block-based search for sorted arrays
// Time: O(√n)
// Space: O(1)
```

### 4. Interpolation Search

```javascript
// Estimate position based on value distribution
// Time: O(log log n) average, O(n) worst
// Space: O(1)
```

### 5. Exponential Search

```javascript
// Find range then binary search within it
// Time: O(log n)
// Space: O(1)
```

### 6. Hash-Based Search

```javascript
// Direct access using hash function
// Time: O(1) average, O(n) worst
// Space: O(n)
```

## 📊 Linear Search

### Basic Implementation

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}

// Time: O(n)
// Space: O(1)
```

### Optimized Linear Search

```javascript
function optimizedLinearSearch(arr, target) {
  // Check first and last elements first
  if (arr[0] === target) return 0;
  if (arr[arr.length - 1] === target) return arr.length - 1;

  // Search remaining elements
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
```

### Multiple Occurrences

```javascript
function findAllOccurrences(arr, target) {
  const occurrences = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      occurrences.push(i);
    }
  }
  return occurrences;
}
```

### Search in 2D Array

```javascript
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
```

## 🔍 Binary Search

### Basic Implementation

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
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

// Time: O(log n)
// Space: O(1)
```

### Recursive Binary Search

```javascript
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

// Time: O(log n)
// Space: O(log n) due to recursion stack
```

### Find First Occurrence

```javascript
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
```

### Find Last Occurrence

```javascript
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
```

### Count Occurrences in Sorted Array

```javascript
function countOccurrences(arr, target) {
  const first = findFirstOccurrence(arr, target);
  if (first === -1) return 0;

  const last = findLastOccurrence(arr, target);
  return last - first + 1;
}
```

## 🔍 Advanced Search Techniques

### Jump Search

```javascript
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

// Time: O(√n)
// Space: O(1)
```

### Interpolation Search

```javascript
function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right && target >= arr[left] && target <= arr[right]) {
    // Estimate position
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

// Time: O(log log n) average, O(n) worst
// Space: O(1)
```

### Exponential Search

```javascript
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

// Time: O(log n)
// Space: O(1)
```

### Ternary Search

```javascript
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

// Time: O(log₃ n)
// Space: O(1)
```

## 🔍 Search in Data Structures

### Search in Linked List

```javascript
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

// Time: O(n)
// Space: O(1)
```

### Search in Binary Search Tree

```javascript
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

// Time: O(h) where h is height, O(log n) average, O(n) worst
// Space: O(h)
```

### Search in Hash Table

```javascript
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

// Time: O(1) average, O(n) worst
// Space: O(1)
```

### Search in Trie

```javascript
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

// Time: O(m) where m is word length
// Space: O(1)
```

## 🎯 Common Patterns

### 1. Search in Rotated Sorted Array

```javascript
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
```

### 2. Search in Matrix

```javascript
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

// Time: O(m + n)
// Space: O(1)
```

### 3. Find Peak Element

```javascript
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

// Time: O(log n)
// Space: O(1)
```

### 4. Search Insert Position

```javascript
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// Time: O(log n)
// Space: O(1)
```

### 5. Find Minimum in Rotated Sorted Array

```javascript
function findMin(nums) {
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

// Time: O(log n)
// Space: O(1)
```

## 🚀 Advanced Applications

### 1. Auto-complete System

```javascript
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
```

### 2. File System Search

```javascript
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
```

### 3. Database Index Search

```javascript
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
```

## 💡 Search Algorithm Selection Guide

### When to Use Which Search Algorithm

#### Linear Search:

- **Unsorted data**: No assumptions about data order
- **Small datasets**: Overhead of complex algorithms not worth it
- **Linked structures**: No random access available

#### Binary Search:

- **Sorted arrays**: Data is already sorted
- **Large datasets**: Logarithmic complexity beneficial
- **Frequent searches**: One-time sort cost amortized

#### Jump Search:

- **Sorted arrays**: Alternative to binary search
- **Uniform distribution**: Good performance on evenly distributed data
- **Memory constraints**: Less recursion than binary search

#### Interpolation Search:

- **Uniformly distributed data**: Best case O(log log n)
- **Large value ranges**: When values are spread across large range
- **Numeric data**: Works best with numbers

#### Hash Search:

- **Key-value lookups**: Direct access by key
- **Frequent insertions/deletions**: Dynamic data structure
- **Average case performance**: O(1) expected

## 🚨 Common Mistakes to Avoid

### Search Mistakes

- ❌ Not checking if array is sorted before binary search
- ❌ Integer overflow when calculating mid index
- ❌ Not handling duplicate elements properly
- ❌ Wrong loop conditions in binary search
- ❌ Not considering edge cases (empty array, single element)

### Implementation Mistakes

- ❌ Using linear search when binary search is possible
- ❌ Not handling null/undefined inputs
- ❌ Off-by-one errors in index calculations
- ❌ Not returning correct value when not found

### Performance Mistakes

- ❌ Using O(n²) search when O(log n) is available
- ❌ Not considering space complexity of search structure
- ❌ Not optimizing for access patterns

## 📖 Additional Resources

### Videos

- **Binary Search Explained**: Visual walkthrough
- **Search Algorithm Comparison**: Performance analysis
- **Advanced Search Techniques**: Interpolation, exponential search

### Websites

- **Search Algorithm Visualizer**: Interactive demonstrations
- **Algorithm Complexity Calculator**: Compare search methods
- **Search Pattern Library**: Common search problems

### Books

- **"Searching Algorithms"**: Comprehensive guide
- **"Algorithm Design Manual"**: Search in context
- **"Programming Pearls"**: Search optimization

## 🎓 What You Need from Other Resources

### Data Structures

- **Arrays**: Random access for binary search
- **Trees**: Hierarchical searching
- **Hash Tables**: O(1) average search
- **Tries**: Prefix-based searching

### Algorithm Design

- **Divide and Conquer**: Binary search foundation
- **Greedy Methods**: Local optimal choices
- **Dynamic Programming**: Search optimization

---

## 🚀 Getting Started

**Ready to master searching?**

1. **Start with Linear Search** → `implementation.js`
2. **Move to Binary Search** → Master the pattern
3. **Practice Advanced Techniques** → Jump, interpolation, exponential
4. **Solve Practice Problems** → `practice.js`

> 💡 **Key Insight**: Searching algorithms teach you _how to think about data access patterns_. Master when to use which approach!

---

## 📊 Progress Checklist

### Basic Search Algorithms

- [ ] Linear Search & variations
- [ ] Binary Search (iterative & recursive)
- [ ] Search in rotated arrays
- [ ] Search insert position

### Advanced Search Techniques

- [ ] Jump Search
- [ ] Interpolation Search
- [ ] Exponential Search
- [ ] Ternary Search

### Search in Data Structures

- [ ] Linked List search
- [ ] Binary Search Tree search
- [ ] Hash Table search
- [ ] Trie search

### Search Applications

- [ ] Matrix search
- [ ] Peak element finding
- [ ] Range queries
- [ ] Auto-complete systems

---

## 🎯 Interview Focus

### Most Common Search Questions

1. **Binary Search** - 70% of interviews
2. **Search in Rotated Array** - 40% of interviews
3. **Matrix Search** - 35% of interviews
4. **Search Insert Position** - 30% of interviews
5. **Find Peak Element** - 25% of interviews

### Must-Know Search Patterns for FAANG

- **Binary Search**: Standard and variations
- **Two-pointer Search**: Efficient array searching
- **Divide and Conquer**: Search optimization
- **Hash-based Search**: O(1) average case
- **Tree-based Search**: BST operations

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Arrays, Basic Algorithms_  
_Time Commitment: 2-3 weeks_
