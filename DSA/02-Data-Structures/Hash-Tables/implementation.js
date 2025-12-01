// 🗂️ Hash Tables & Hash Maps Implementation
// Complete implementations of all hash table types and operations

// ==========================================
// BASIC HASH TABLE WITH SEPARATE CHAINING
// ==========================================

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
      hash = hash & hash; // Convert to 32-bit integer
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
    const maxSize = Math.max(...bucketSizes, 0);
    const minSize = Math.min(...bucketSizes, 0);
    const avgSize =
      bucketSizes.reduce((sum, size) => sum + size, 0) / this.size;
    const usedBuckets = bucketSizes.filter((size) => size > 0).length;

    return {
      totalBuckets: this.size,
      usedBuckets,
      emptyBuckets: bucketSizes.filter((size) => size === 0).length,
      maxSize,
      minSize,
      avgSize,
      loadFactor: this.getLoadFactor(),
      collisions: this.count - usedBuckets,
    };
  }

  // Clone hash table - O(n)
  clone() {
    const newTable = new HashTable(this.size);
    newTable.buckets = this.buckets.map((bucket) => [...bucket]);
    newTable.count = this.count;
    return newTable;
  }
}

// ==========================================
// OPEN ADDRESSING HASH TABLE
// ==========================================

class OpenAddressingHashTable {
  constructor(size = 16) {
    this.size = size;
    this.table = new Array(size).fill(null);
    this.count = 0;
    this.loadFactor = 0.7;
    this.DELETED = Symbol("DELETED");
  }

  // Primary hash function - O(k)
  _hash1(key) {
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    return Math.abs(hash) % this.size;
  }

  // Secondary hash function for double hashing - O(k)
  _hash2(key) {
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 3) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    return (Math.abs(hash) % (this.size - 1)) + 1;
  }

  // Find slot for key - O(n) worst case, O(1) average
  _findSlot(key, forInsert = false) {
    const hash1 = this._hash1(key);
    const hash2 = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const index = (hash1 + i * hash2) % this.size;
      const slot = this.table[index];

      if (
        slot === null ||
        (forInsert && slot === this.DELETED) ||
        (!forInsert && slot && slot.key === key)
      ) {
        return index;
      }
    }

    return -1; // Table is full or key not found
  }

  // Insert or update key-value pair - O(1) average
  set(key, value) {
    if (this.count / this.size > this.loadFactor) {
      this._resize();
    }

    const index = this._findSlot(key, true);

    if (index === -1) {
      throw new Error("Hash table is full");
    }

    const slot = this.table[index];

    if (slot === null || slot === this.DELETED) {
      this.table[index] = { key, value };
      this.count++;
    } else {
      this.table[index].value = value;
    }

    return this;
  }

  // Get value by key - O(1) average
  get(key) {
    const index = this._findSlot(key, false);

    if (index === -1) {
      return undefined;
    }

    const slot = this.table[index];
    return slot ? slot.value : undefined;
  }

  // Check if key exists - O(1) average
  has(key) {
    return this.get(key) !== undefined;
  }

  // Delete key-value pair - O(1) average
  delete(key) {
    const index = this._findSlot(key, false);

    if (index === -1) {
      return false;
    }

    this.table[index] = this.DELETED;
    this.count--;
    return true;
  }

  // Resize table - O(n)
  _resize() {
    const oldTable = this.table;
    this.size *= 2;
    this.table = new Array(this.size).fill(null);
    this.count = 0;

    // Rehash all entries
    for (const slot of oldTable) {
      if (slot !== null && slot !== this.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  // Get all keys - O(n)
  keys() {
    const keys = [];
    for (const slot of this.table) {
      if (slot !== null && slot !== this.DELETED) {
        keys.push(slot.key);
      }
    }
    return keys;
  }

  // Get all values - O(n)
  values() {
    const values = [];
    for (const slot of this.table) {
      if (slot !== null && slot !== this.DELETED) {
        values.push(slot.value);
      }
    }
    return values;
  }

  // Clear hash table - O(1)
  clear() {
    this.table = new Array(this.size).fill(null);
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
}

// ==========================================
// DOUBLE HASHING HASH TABLE
// ==========================================

class DoubleHashingHashTable extends OpenAddressingHashTable {
  constructor(size = 16) {
    super(size);
  }

  // Override hash functions for better distribution
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
    // Use a different prime for second hash
    let hash = 0;
    const str = String(key);

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 7) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    // Ensure it's relatively prime to table size
    return 7 - (Math.abs(hash) % 7);
  }

  // Find slot with improved probing
  _findSlot(key, forInsert = false) {
    const hash1 = this._hash1(key);
    const hash2 = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const index = (hash1 + i * hash2) % this.size;
      const slot = this.table[index];

      if (
        slot === null ||
        (forInsert && slot === this.DELETED) ||
        (!forInsert && slot && slot.key === key)
      ) {
        return index;
      }
    }

    return -1;
  }
}

// ==========================================
// SPECIALIZED HASH TABLES
// ==========================================

// Counting hash table for frequency counting
class CountingHashTable extends HashTable {
  constructor(size = 16) {
    super(size);
  }

  // Increment count - O(1) average
  increment(key, amount = 1) {
    const current = this.get(key) || 0;
    this.set(key, current + amount);
    return this.get(key);
  }

  // Decrement count - O(1) average
  decrement(key, amount = 1) {
    const current = this.get(key) || 0;
    const newValue = Math.max(0, current - amount);

    if (newValue === 0) {
      this.delete(key);
    } else {
      this.set(key, newValue);
    }

    return newValue;
  }

  // Get most frequent items - O(n log k)
  getMostFrequent(k = 10) {
    const entries = this.entries();
    entries.sort((a, b) => b[1] - a[1]); // Sort by frequency descending

    return entries.slice(0, k).map(([key, count]) => ({ key, count }));
  }

  // Get items with count >= minCount - O(n)
  getItemsWithMinCount(minCount) {
    const result = [];

    for (const [key, count] of this.entries()) {
      if (count >= minCount) {
        result.push({ key, count });
      }
    }

    return result;
  }
}

// Set hash table (unique values only)
class SetHashTable extends HashTable {
  constructor(size = 16) {
    super(size);
  }

  // Add item to set - O(1) average
  add(item) {
    this.set(item, true);
    return this;
  }

  // Check if item exists - O(1) average
  has(item) {
    return super.has(item);
  }

  // Remove item from set - O(1) average
  remove(item) {
    return this.delete(item);
  }

  // Set union - O(n + m)
  union(otherSet) {
    const result = new SetHashTable(this.size);

    // Add all items from this set
    for (const item of this.keys()) {
      result.add(item);
    }

    // Add all items from other set
    for (const item of otherSet.keys()) {
      result.add(item);
    }

    return result;
  }

  // Set intersection - O(n + m)
  intersection(otherSet) {
    const result = new SetHashTable(Math.min(this.size, otherSet.size));

    for (const item of this.keys()) {
      if (otherSet.has(item)) {
        result.add(item);
      }
    }

    return result;
  }

  // Set difference - O(n + m)
  difference(otherSet) {
    const result = new SetHashTable(this.size);

    for (const item of this.keys()) {
      if (!otherSet.has(item)) {
        result.add(item);
      }
    }

    return result;
  }

  // Convert to array - O(n)
  toArray() {
    return this.keys();
  }
}

// ==========================================
// HASH TABLE UTILITIES
// ==========================================

class HashTableUtils {
  // Frequency counter - O(n)
  static frequencyCounter(arr) {
    const freq = new CountingHashTable();

    for (const item of arr) {
      freq.increment(item);
    }

    return freq;
  }

  // Group items by key - O(n)
  static groupBy(arr, keyFn) {
    const groups = new HashTable();

    for (const item of arr) {
      const key = keyFn(item);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key).push(item);
    }

    return groups;
  }

  // Find duplicates - O(n)
  static findDuplicates(arr) {
    const seen = new SetHashTable();
    const duplicates = new SetHashTable();

    for (const item of arr) {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    }

    return duplicates.toArray();
  }

  // Check if two arrays are permutations - O(n)
  static arePermutations(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const freq = new CountingHashTable();

    // Count first array
    for (const item of arr1) {
      freq.increment(item);
    }

    // Subtract second array
    for (const item of arr2) {
      if (!freq.has(item)) return false;
      freq.decrement(item);
    }

    // Check if all counts are zero
    for (const count of freq.values()) {
      if (count !== 0) return false;
    }

    return true;
  }

  // Find first non-repeating character - O(n)
  static firstNonRepeatingChar(s) {
    const freq = new CountingHashTable();

    // Count frequencies
    for (const char of s) {
      freq.increment(char);
    }

    // Find first non-repeating
    for (const char of s) {
      if (freq.get(char) === 1) {
        return char;
      }
    }

    return "";
  }

  // Check if string is an anagram - O(n)
  static isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;

    const freq = new CountingHashTable();

    // Count first string
    for (const char of s1) {
      freq.increment(char);
    }

    // Subtract second string
    for (const char of s2) {
      if (!freq.has(char)) return false;
      freq.decrement(char);
    }

    // Check if all counts are zero
    for (const count of freq.values()) {
      if (count !== 0) return false;
    }

    return true;
  }

  // Group anagrams - O(n * k log k) where k is average string length
  static groupAnagrams(strs) {
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

  // Two sum problem - O(n)
  static twoSum(nums, target) {
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

  // Find longest substring without repeating characters - O(n)
  static longestSubstringWithoutRepeating(s) {
    const seen = new HashTable();
    let maxLen = 0;
    let start = 0;

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      if (seen.has(char) && seen.get(char) >= start) {
        start = seen.get(char) + 1;
      }

      seen.set(char, i);
      maxLen = Math.max(maxLen, i - start + 1);
    }

    return maxLen;
  }
}

// ==========================================
// ADVANCED HASH TABLE APPLICATIONS
// ==========================================

// LRU Cache implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new HashTable();
    this.order = [];
  }

  // Get value and update LRU order - O(1)
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

  // Put value and manage capacity - O(1)
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

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.getSize(),
      capacity: this.capacity,
      order: [...this.order],
      hitRate: this.hitRate,
    };
  }
}

// Trie (Prefix Tree) using hash tables
class TrieNode {
  constructor() {
    this.children = new HashTable();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.wordCount = 0;
  }

  // Insert word - O(k) where k is word length
  insert(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.wordCount++;
    }
  }

  // Search word - O(k)
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

  // Check if prefix exists - O(k)
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

  // Get all words with prefix - O(n) in worst case
  getWordsWithPrefix(prefix) {
    let current = this.root;

    // Navigate to prefix
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }

    // Collect all words from this node
    const words = [];

    function collectWords(node, currentPrefix) {
      if (node.isEndOfWord) {
        words.push(currentPrefix);
      }

      for (const [char, child] of node.children.entries()) {
        collectWords(child, currentPrefix + char);
      }
    }

    collectWords(current, prefix);
    return words;
  }

  // Get word count - O(1)
  getWordCount() {
    return this.wordCount;
  }

  // Delete word - O(k)
  delete(word) {
    function deleteHelper(node, word, index) {
      if (index === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.getSize() === 0;
      }

      const char = word[index];
      if (!node.children.has(char)) return false;

      const shouldDelete = deleteHelper(
        node.children.get(char),
        word,
        index + 1
      );

      if (shouldDelete) {
        node.children.delete(char);
        return node.children.getSize() === 0 && !node.isEndOfWord;
      }

      return false;
    }

    if (this.search(word)) {
      deleteHelper(this.root, word, 0);
      this.wordCount--;
    }

    return this;
  }
}

// Graph representation using hash tables
class Graph {
  constructor() {
    this.vertices = new HashTable();
    this.edgeCount = 0;
  }

  // Add vertex - O(1)
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, new SetHashTable());
    }
    return this;
  }

  // Add edge - O(1)
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.vertices.get(vertex1).add(vertex2);
    this.vertices.get(vertex2).add(vertex1);
    this.edgeCount++;
    return this;
  }

  // Remove edge - O(1)
  removeEdge(vertex1, vertex2) {
    if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
      this.vertices.get(vertex1).remove(vertex2);
      this.vertices.get(vertex2).remove(vertex1);
      this.edgeCount--;
    }
    return this;
  }

  // Remove vertex - O(degree)
  removeVertex(vertex) {
    if (!this.vertices.has(vertex)) return this;

    // Remove all edges connected to this vertex
    const neighbors = this.vertices.get(vertex);
    for (const neighbor of neighbors.toArray()) {
      this.removeEdge(vertex, neighbor);
    }

    this.vertices.delete(vertex);
    return this;
  }

  // Get neighbors - O(1)
  getNeighbors(vertex) {
    return this.vertices.get(vertex)?.toArray() || [];
  }

  // Check if vertex exists - O(1)
  hasVertex(vertex) {
    return this.vertices.has(vertex);
  }

  // Check if edge exists - O(1)
  hasEdge(vertex1, vertex2) {
    return (
      this.vertices.has(vertex1) && this.vertices.get(vertex1).has(vertex2)
    );
  }

  // BFS traversal - O(V + E)
  bfs(start) {
    if (!this.hasVertex(start)) return [];

    const visited = new SetHashTable();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // DFS traversal - O(V + E)
  dfs(start) {
    if (!this.hasVertex(start)) return [];

    const visited = new SetHashTable();
    const result = [];

    function dfsHelper(vertex) {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    }

    dfsHelper(start);
    return result;
  }

  // Get graph statistics
  getStats() {
    return {
      vertexCount: this.vertices.getSize(),
      edgeCount: this.edgeCount,
      vertices: this.vertices.keys(),
    };
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Hash Table Implementation Tests...\n");

  // Test Basic Hash Table
  console.log("🗂️ Testing Basic Hash Table:");
  const ht = new HashTable();
  ht.set("name", "John");
  ht.set("age", 25);
  ht.set("city", "New York");

  console.log("Get name:", ht.get("name"));
  console.log("Has age:", ht.has("age"));
  console.log("Keys:", ht.keys());
  console.log("Values:", ht.values());
  console.log("Size:", ht.getSize());
  console.log("Stats:", ht.getStats());

  ht.delete("age");
  console.log("After deleting age:", ht.keys());

  // Test Open Addressing
  console.log("\n🔍 Testing Open Addressing:");
  const oa = new OpenAddressingHashTable();
  oa.set("a", 1);
  oa.set("b", 2);
  oa.set("c", 3);

  console.log("Get a:", oa.get("a"));
  console.log("Get b:", oa.get("b"));
  console.log("Keys:", oa.keys());
  console.log("Size:", oa.getSize());

  // Test Counting Hash Table
  console.log("\n📊 Testing Counting Hash Table:");
  const freq = new CountingHashTable();
  freq.increment("apple");
  freq.increment("banana", 2);
  freq.increment("apple");
  freq.increment("orange", 3);

  console.log("Apple count:", freq.get("apple"));
  console.log("Most frequent:", freq.getMostFrequent(2));
  console.log("Items with min count 2:", freq.getItemsWithMinCount(2));

  // Test Set Hash Table
  console.log("\n🔗 Testing Set Hash Table:");
  const set1 = new SetHashTable();
  set1.add(1).add(2).add(3);

  const set2 = new SetHashTable();
  set2.add(3).add(4).add(5);

  console.log("Set1:", set1.toArray());
  console.log("Set2:", set2.toArray());
  console.log("Union:", set1.union(set2).toArray());
  console.log("Intersection:", set1.intersection(set2).toArray());
  console.log("Difference:", set1.difference(set2).toArray());

  // Test Hash Table Utils
  console.log("\n🔧 Testing Hash Table Utils:");
  const arr = [1, 2, 3, 2, 1, 4, 5, 1];
  console.log("Array:", arr);
  console.log(
    "Frequency counter:",
    HashTableUtils.frequencyCounter(arr).entries()
  );
  console.log("Duplicates:", HashTableUtils.findDuplicates(arr));
  console.log(
    'First non-repeating in "swiss":',
    HashTableUtils.firstNonRepeatingChar("swiss")
  );
  console.log(
    'Is "listen" and "silent" anagram:',
    HashTableUtils.isAnagram("listen", "silent")
  );
  console.log(
    "Two sum [2,7,11,15], target=9:",
    HashTableUtils.twoSum([2, 7, 11, 15], 9)
  );
  console.log(
    'Longest substring without repeating in "abcabcbb":',
    HashTableUtils.longestSubstringWithoutRepeating("abcabcbb")
  );

  // Test LRU Cache
  console.log("\n💾 Testing LRU Cache:");
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  console.log("Get 1:", cache.get(1));
  cache.put(3, 3);
  console.log("Get 2:", cache.get(2));
  cache.put(4, 4);
  console.log("Get 1:", cache.get(1));
  console.log("Get 3:", cache.get(3));
  console.log("Get 4:", cache.get(4));

  // Test Trie
  console.log("\n🌳 Testing Trie:");
  const trie = new Trie();
  trie.insert("apple");
  trie.insert("app");
  trie.insert("application");
  trie.insert("apply");

  console.log('Search "app":', trie.search("app"));
  console.log('Search "apple":', trie.search("apple"));
  console.log('Search "appl":', trie.search("appl"));
  console.log('Starts with "app":', trie.startsWith("app"));
  console.log('Words with prefix "app":', trie.getWordsWithPrefix("app"));
  console.log("Word count:", trie.getWordCount());

  // Test Graph
  console.log("\n🕸️ Testing Graph:");
  const graph = new Graph();
  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("B", "D");
  graph.addEdge("C", "D");
  graph.addEdge("D", "E");

  console.log("Neighbors of A:", graph.getNeighbors("A"));
  console.log("Has edge A-B:", graph.hasEdge("A", "B"));
  console.log("BFS from A:", graph.bfs("A"));
  console.log("DFS from A:", graph.dfs("A"));
  console.log("Graph stats:", graph.getStats());

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  HashTable,
  OpenAddressingHashTable,
  DoubleHashingHashTable,
  CountingHashTable,
  SetHashTable,
  HashTableUtils,
  LRUCache,
  TrieNode,
  Trie,
  Graph,
};
