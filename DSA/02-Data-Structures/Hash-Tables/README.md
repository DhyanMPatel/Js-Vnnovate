# 🗂️ Hash Tables & Hash Maps

> **Fast Key-Value Storage with Constant-Time Operations**

## 📋 Table of Contents

- [What are Hash Tables?](#what-are-hash-tables)
- [Hash Functions](#hash-functions)
- [Collision Resolution](#collision-resolution)
- [Core Operations](#core-operations)
- [Implementation Types](#implementation-types)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Hash Tables?

### Definition

A hash table is a data structure that maps keys to values using a hash function to compute an index into an array of buckets or slots. It provides **O(1)** average time complexity for insertions, deletions, and lookups.

### Real-World Analogy

```javascript
// Think of a library's card catalog:
// - Books are stored by their hash (call number)
// - Hash function maps book title to shelf location
// - Collisions happen when different books map to same location

const libraryCatalog = {
  "DSA-101": "Data Structures and Algorithms",
  "CS-201": "Computer Science Fundamentals",
  "ALG-301": "Advanced Algorithms",
};
```

### Why Hash Tables Matter

- **Fast Lookups**: O(1) average case access
- **Flexible Keys**: Strings, numbers, objects as keys
- **Memory Efficiency**: Direct addressing
- **Caching**: LRU cache, memoization
- **Frequency Counting**: Histograms, statistics

## 🔍 Hash Functions

### Properties of Good Hash Functions

```javascript
const hashFunctionProperties = {
  deterministic: "Same key always produces same hash",
  uniform: "Even distribution of keys across buckets",
  efficient: "Fast to compute",
  minimal: "Minimize collisions",
};
```

### Simple Hash Function Examples

```javascript
// Basic string hash - O(n)
function simpleStringHash(str, tableSize) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % tableSize;
  }
  return hash;
}

// Polynomial rolling hash - O(n)
function polynomialHash(str, tableSize) {
  const prime = 31;
  let hash = 0;
  let power = 1;

  for (let i = 0; i < str.length; i++) {
    hash =
      (hash + (str.charCodeAt(i) - "a".charCodeAt(0) + 1) * power) % tableSize;
    power = (power * prime) % tableSize;
  }

  return hash;
}

// Built-in JavaScript hash simulation
function jsHash(key, tableSize) {
  let hash = 0;
  const str = String(key);

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash) % tableSize;
}
```

## 🔄 Collision Resolution

### 1. Separate Chaining

```javascript
// Each bucket contains a linked list of entries
class SeparateChainingHashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
  }

  _hash(key) {
    return jsHash(key, this.size);
  }

  _findEntry(bucket, key) {
    return bucket.find((entry) => entry.key === key);
  }
}
```

### 2. Open Addressing (Linear Probing)

```javascript
// Find next empty slot when collision occurs
class LinearProbingHashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  _hash(key) {
    return jsHash(key, this.size);
  }

  _probe(index) {
    return (index + 1) % this.size;
  }
}
```

### 3. Double Hashing

```javascript
// Use second hash function for probing
class DoubleHashingHashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  _hash1(key) {
    return jsHash(key, this.size);
  }

  _hash2(key) {
    // Second hash function - must be relatively prime to size
    return 7 - jsHash(key, 7);
  }

  _probe(index, key) {
    return (index + this._hash2(key)) % this.size;
  }
}
```

## ⚡ Core Operations

### Hash Table Implementation with Separate Chaining

```javascript
class HashTable {
  constructor(size = 16) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
    this.count = 0;
    this.loadFactor = 0.75;
  }

  // Hash function - O(k) where k is key length
  _hash(key) {
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return Math.abs(hash) % this.size;
  }

  // Resize when load factor exceeded - O(n)
  _resize() {
    const newSize = this.size * 2;
    const newBuckets = new Array(newSize).fill(null).map(() => []);

    // Rehash all entries
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        const newIndex = Math.abs(entry.hash) % newSize;
        newBuckets[newIndex].push(entry);
      }
    }

    this.size = newSize;
    this.buckets = newBuckets;
  }

  // Insert or update key-value pair - O(1) average
  set(key, value) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    // Check if key already exists
    const existingEntry = bucket.find((entry) => entry.key === key);

    if (existingEntry) {
      existingEntry.value = value;
      return this;
    }

    // Add new entry
    bucket.push({ key, value, hash });
    this.count++;

    // Resize if load factor exceeded
    if (this.count / this.size > this.loadFactor) {
      this._resize();
    }

    return this;
  }

  // Get value by key - O(1) average
  get(key) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    const entry = bucket.find((entry) => entry.key === key);
    return entry ? entry.value : undefined;
  }

  // Check if key exists - O(1) average
  has(key) {
    return this.get(key) !== undefined;
  }

  // Delete key-value pair - O(1) average
  delete(key) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    const index = bucket.findIndex((entry) => entry.key === key);

    if (index !== -1) {
      bucket.splice(index, 1);
      this.count--;
      return true;
    }

    return false;
  }

  // Get all keys - O(n)
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    return keys;
  }

  // Get all values - O(n)
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    return values;
  }

  // Get all key-value pairs - O(n)
  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }
    return entries;
  }

  // Clear hash table - O(1)
  clear() {
    this.buckets = new Array(this.size).fill(null).map(() => []);
    this.count = 0;
    return this;
  }

  // Get hash table size - O(1)
  getSize() {
    return this.count;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.count === 0;
  }

  // Get load factor - O(1)
  getLoadFactor() {
    return this.count / this.size;
  }

  // Get bucket statistics - O(n)
  getStats() {
    const bucketSizes = this.buckets.map((bucket) => bucket.length);
    const maxSize = Math.max(...bucketSizes);
    const minSize = Math.min(...bucketSizes);
    const avgSize =
      bucketSizes.reduce((sum, size) => sum + size, 0) / this.size;

    return {
      totalBuckets: this.size,
      usedBuckets: bucketSizes.filter((size) => size > 0).length,
      emptyBuckets: bucketSizes.filter((size) => size === 0).length,
      maxSize,
      minSize,
      avgSize,
      loadFactor: this.getLoadFactor(),
    };
  }
}
```

### Open Addressing Implementation

```javascript
class OpenAddressingHashTable {
  constructor(size = 16) {
    this.size = size;
    this.table = new Array(size).fill(null);
    this.count = 0;
    this.loadFactor = 0.7;
  }

  _hash1(key) {
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    return Math.abs(hash) % this.size;
  }

  _hash2(key) {
    // Second hash for double hashing
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 3) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    return (Math.abs(hash) % (this.size - 1)) + 1;
  }

  _findSlot(key) {
    const hash1 = this._hash1(key);
    const hash2 = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const index = (hash1 + i * hash2) % this.size;
      const slot = this.table[index];

      if (slot === null || slot.key === key) {
        return index;
      }
    }

    return -1; // Table is full
  }

  set(key, value) {
    if (this.count / this.size > this.loadFactor) {
      this._resize();
    }

    const index = this._findSlot(key);

    if (index === -1) {
      throw new Error("Hash table is full");
    }

    const slot = this.table[index];

    if (slot === null) {
      this.table[index] = { key, value };
      this.count++;
    } else {
      this.table[index].value = value;
    }

    return this;
  }

  get(key) {
    const hash1 = this._hash1(key);
    const hash2 = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const index = (hash1 + i * hash2) % this.size;
      const slot = this.table[index];

      if (slot === null) {
        return undefined;
      }

      if (slot.key === key) {
        return slot.value;
      }
    }

    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    const hash1 = this._hash1(key);
    const hash2 = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const index = (hash1 + i * hash2) % this.size;
      const slot = this.table[index];

      if (slot === null) {
        return false;
      }

      if (slot.key === key) {
        this.table[index] = null;
        this.count--;
        return true;
      }
    }

    return false;
  }

  _resize() {
    const oldTable = this.table;
    this.size *= 2;
    this.table = new Array(this.size).fill(null);
    this.count = 0;

    // Rehash all entries
    for (const slot of oldTable) {
      if (slot !== null) {
        this.set(slot.key, slot.value);
      }
    }
  }
}
```

## 🎯 Common Patterns

### 1. Frequency Counting

```javascript
function frequencyCounter(arr) {
  const freq = new HashTable();

  for (const item of arr) {
    const count = freq.get(item) || 0;
    freq.set(item, count + 1);
  }

  return freq;
}

// Usage:
const numbers = [1, 2, 3, 2, 1, 3, 3, 4];
const freq = frequencyCounter(numbers);
console.log(freq.get(3)); // 3
```

### 2. Two Sum Problem

```javascript
function twoSum(nums, target) {
  const seen = new HashTable();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
```

### 3. Group Anagrams

```javascript
function groupAnagrams(strs) {
  const groups = new HashTable();

  for (const str of strs) {
    const key = str.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(str);
  }

  return groups.values();
}
```

### 4. LRU Cache

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new HashTable();
    this.order = [];
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const index = this.order.indexOf(key);
      this.order.splice(index, 1);
      this.order.push(key);

      return this.cache.get(key);
    }

    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.set(key, value);
      const index = this.order.indexOf(key);
      this.order.splice(index, 1);
      this.order.push(key);
    } else {
      // Add new
      if (this.order.length >= this.capacity) {
        // Remove least recently used
        const lru = this.order.shift();
        this.cache.delete(lru);
      }

      this.cache.set(key, value);
      this.order.push(key);
    }
  }
}
```

### 5. First Non-Repeating Character

```javascript
function firstNonRepeatingChar(s) {
  const freq = new HashTable();

  // Count frequencies
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Find first non-repeating
  for (const char of s) {
    if (freq.get(char) === 1) {
      return char;
    }
  }

  return "";
}
```

## 🚀 Advanced Applications

### 1. Trie (Prefix Tree) using Hash Table

```javascript
class TrieNode {
  constructor() {
    this.children = new HashTable();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }

    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return current.isEndOfWord;
  }

  startsWith(prefix) {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return true;
  }
}
```

### 2. Graph Representation

```javascript
class Graph {
  constructor() {
    this.vertices = new HashTable();
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.vertices.get(vertex1).push(vertex2);
    this.vertices.get(vertex2).push(vertex1);
  }

  getNeighbors(vertex) {
    return this.vertices.get(vertex) || [];
  }

  hasVertex(vertex) {
    return this.vertices.has(vertex);
  }

  bfs(start) {
    if (!this.hasVertex(start)) return [];

    const visited = new HashTable();
    const queue = [start];
    const result = [];

    visited.set(start, true);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          visited.set(neighbor, true);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}
```

### 3. Memoization

```javascript
function memoize(fn) {
  const cache = new HashTable();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

// Usage:
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

## 💡 Real-World Applications

### 1. Database Indexing

```javascript
class DatabaseIndex {
  constructor() {
    this.index = new HashTable();
    this.records = [];
  }

  insert(record) {
    const id = this.records.length;
    this.records.push(record);

    // Create index on multiple fields
    for (const [field, value] of Object.entries(record)) {
      const key = `${field}:${value}`;

      if (!this.index.has(key)) {
        this.index.set(key, []);
      }

      this.index.get(key).push(id);
    }
  }

  query(field, value) {
    const key = `${field}:${value}`;
    const recordIds = this.index.get(key) || [];

    return recordIds.map((id) => this.records[id]);
  }

  rangeQuery(field, min, max) {
    const results = [];

    for (let value = min; value <= max; value++) {
      const key = `${field}:${value}`;
      const recordIds = this.index.get(key) || [];
      results.push(...recordIds.map((id) => this.records[id]));
    }

    return results;
  }
}
```

### 2. Caching System

```javascript
class CacheSystem {
  constructor(maxSize = 1000) {
    this.cache = new HashTable();
    this.accessOrder = [];
    this.maxSize = maxSize;
  }

  get(key) {
    if (this.cache.has(key)) {
      // Update access order
      const index = this.accessOrder.indexOf(key);
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(key);

      return this.cache.get(key);
    }

    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }

    // Evict if cache is full
    if (this.accessOrder.length >= this.maxSize) {
      const lru = this.accessOrder.shift();
      this.cache.delete(lru);
    }

    this.cache.set(key, value);
    this.accessOrder.push(key);
  }

  getStats() {
    return {
      size: this.cache.getSize(),
      maxSize: this.maxSize,
      hitRate: this.hitRate,
    };
  }
}
```

### 3. Symbol Table (Compiler)

```javascript
class SymbolTable {
  constructor() {
    this.symbols = new HashTable();
    this.scopes = [new HashTable()];
    this.currentScope = 0;
  }

  enterScope() {
    this.scopes.push(new HashTable());
    this.currentScope++;
  }

  exitScope() {
    this.scopes.pop();
    this.currentScope--;
  }

  declare(name, type) {
    if (this.scopes[this.currentScope].has(name)) {
      throw new Error(`Symbol ${name} already declared in current scope`);
    }

    this.scopes[this.currentScope].set(name, {
      name,
      type,
      scope: this.currentScope,
    });
  }

  lookup(name) {
    // Search from current scope outward
    for (let i = this.currentScope; i >= 0; i--) {
      if (this.scopes[i].has(name)) {
        return this.scopes[i].get(name);
      }
    }

    return null;
  }

  isDeclared(name) {
    return this.lookup(name) !== null;
  }
}
```

## 💪 Practice Problems

### Easy

1. **Two Sum** - Find pair that sums to target
2. **Valid Anagram** - Check if strings are anagrams
3. **First Unique Character** - Find first non-repeating character
4. **Contains Duplicate** - Check for duplicates in array
5. **Missing Number** - Find missing number from 1..n

### Medium

1. **Group Anagrams** - Group anagrams together
2. **Top K Frequent Elements** - Find k most frequent elements
3. **Longest Substring Without Repeating** - Find longest unique substring
4. **Happy Number** - Check if number is happy
5. **Word Pattern** - Check if string follows pattern
6. **Find the Difference** - Find extra character in string

### Hard

1. **LRU Cache** - Implement least recently used cache
2. **All O(1) Data Structure** - Constant time operations
3. **Insert Delete GetRandom O(1)** - Random access structure
4. **Design Twitter** - Twitter-like system design
5. **Design Snake Game** - Snake game implementation

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveHashProblem(problem) {
  // 1. Identify if hash table is appropriate
  const hashIndicators = [
    "Need fast lookups",
    "Frequency counting",
    "Grouping by key",
    "Caching results",
    "Duplicate detection",
  ];

  // 2. Choose hash table type
  const hashTypes = {
    separateChaining: "Good for many collisions",
    openAddressing: "Better memory locality",
    builtIn: "Use JavaScript Map/Set",
  };

  // 3. Implement solution
  // 4. Handle collisions
  // 5. Optimize if needed
}
```

### Common Mistakes to Avoid

- ❌ Not handling hash collisions properly
- ❌ Using wrong data structure (array instead of hash)
- ❌ Forgetting to resize when load factor high
- ❌ Poor hash function leading to clustering
- ❌ Not considering time complexity of hash function

### Communication Tips

- **Explain hash function choice** and collision resolution
- **Discuss time complexity** including hash function cost
- **Handle edge cases** (empty table, full table)
- **Show step-by-step** hash table operations

## 📊 Hash Table vs Other Data Structures

| Operation | Hash Table | Array | BST      | Linked List |
| --------- | ---------- | ----- | -------- | ----------- |
| Search    | O(1) avg   | O(n)  | O(log n) | O(n)        |
| Insert    | O(1) avg   | O(n)  | O(log n) | O(1)        |
| Delete    | O(1) avg   | O(n)  | O(log n) | O(1)        |
| Space     | O(n)       | O(n)  | O(n)     | O(n)        |
| Order     | No         | Yes   | Yes      | Yes         |

## 📖 Additional Resources

### Videos

- **Hash Tables - MIT 6.006**: Academic introduction
- **Hash Functions Explained - Computerphile**: Hash function basics
- **Collision Resolution - YouTube**: Different collision strategies

### Websites

- **Hash Table Visualizer**: Interactive hash table operations
- **GeeksforGeeks Hash Tables**: Comprehensive tutorials
- **LeetCode Hash Table Problems**: Practice problems by difficulty

### Books

- **"Introduction to Algorithms"**: Hash table chapters
- **"Data Structures and Algorithms in JavaScript"**: JS implementations

## 🎓 What You Need from Other Resources

### System Design

- **Distributed Hash Tables**: Consistent hashing
- **Database Indexing**: B-trees vs hash indexes
- **Caching Strategies**: Multi-level caching

### Algorithm Design

- **Memoization**: Dynamic programming optimization
- **Graph Algorithms**: Adjacency lists with hash tables
- **String Algorithms**: Pattern matching with hash tables

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Graphs** → `../Graphs/README.md`

> 💡 **Key Insight**: Hash tables teach you direct access thinking - crucial for optimization, caching, and efficient data organization!

---

## 📊 Quick Reference

### Must-Know Hash Table Operations

```javascript
const essentialOperations = {
  set: "Insert/Update - O(1) average",
  get: "Lookup - O(1) average",
  has: "Check existence - O(1) average",
  delete: "Remove - O(1) average",
  keys: "Get all keys - O(n)",
  values: "Get all values - O(n)",
};
```

### Common Hash Table Patterns

- **Frequency Counting**: Element frequency analysis
- **Grouping**: Group similar items by key
- **Caching**: Store computed results
- **Lookup Tables**: Fast key-based access
- **Duplicate Detection**: Find duplicate elements

---

_Last Updated: December 2025_  
_Difficulty: Beginner to Intermediate_  
_Prerequisites: Arrays, Linked Lists, Big O Complexity_  
_Time Commitment: 1-2 weeks_
