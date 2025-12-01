// 🗂️ Hash Tables & Hash Maps Practice Problems
// Implement these functions to master hash table operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Two Sum
 * Find two numbers that add up to target.
 *
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number[]} Indices of the two numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 */
function twoSum(nums, target) {
  // Your implementation here
}

/**
 * Problem 2: Valid Anagram
 * Check if two strings are anagrams.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} True if anagrams
 *
 * Expected Time: O(n)
 * Expected Space: O(1) for fixed alphabet
 *
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 */
function isAnagram(s, t) {
  // Your implementation here
}

/**
 * Problem 3: First Unique Character in a String
 * Find first non-repeating character.
 *
 * @param {string} s - Input string
 * @return {number} Index of first unique character
 *
 * Expected Time: O(n)
 * Expected Space: O(1) for fixed alphabet
 *
 * Example:
 * Input: s = "leetcode"
 * Output: 0
 */
function firstUniqChar(s) {
  // Your implementation here
}

/**
 * Problem 4: Contains Duplicate
 * Check if array contains duplicates.
 *
 * @param {number[]} nums - Input array
 * @return {boolean} True if duplicates exist
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,1]
 * Output: true
 */
function containsDuplicate(nums) {
  // Your implementation here
}

/**
 * Problem 5: Missing Number
 * Find missing number from 0..n.
 *
 * @param {number[]} nums - Input array
 * @return {number} Missing number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,0,1]
 * Output: 2
 */
function missingNumber(nums) {
  // Your implementation here
}

/**
 * Problem 6: Find the Difference
 * Find the extra character in string t.
 *
 * @param {string} s - Original string
 * @param {string} t - String with extra character
 * @return {character} Extra character
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: s = "abcd", t = "abcde"
 * Output: "e"
 */
function findTheDifference(s, t) {
  // Your implementation here
}

/**
 * Problem 7: Jewels and Stones
 * Count jewels in stones collection.
 *
 * @param {string} jewels - Types of jewels
 * @param {string} stones - Collection of stones
 * @return {number} Number of jewels
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: jewels = "aA", stones = "aAAbbbb"
 * Output: 3
 */
function numJewelsInStones(jewels, stones) {
  // Your implementation here
}

/**
 * Problem 8: Check if All Characters Have Equal Frequency
 * Check if all characters appear same number of times.
 *
 * @param {string} s - Input string
 * @return {boolean} True if equal frequency
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: s = "abacbc"
 * Output: true
 */
function areOccurrencesEqual(s) {
  // Your implementation here
}

/**
 * Problem 9: Find the Number of Good Pairs
 * Count pairs where nums[i] == nums[j] and i < j.
 *
 * @param {number[]} nums - Input array
 * @return {number} Number of good pairs
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,1,1,3]
 * Output: 4
 */
function numIdenticalPairs(nums) {
  // Your implementation here
}

/**
 * Problem 10: Find the First Palindromic String in the Array
 * Find first palindromic string in array.
 *
 * @param {string[]} words - Array of strings
 * @return {string} First palindrome
 *
 * Expected Time: O(n * k) where k is average string length
 * Expected Space: O(1)
 *
 * Example:
 * Input: words = ["abc","car","ada","racecar","cool"]
 * Output: "ada"
 */
function firstPalindrome(words) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Group Anagrams
 * Group anagrams together.
 *
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Groups of anagrams
 *
 * Expected Time: O(n * k log k) where k is average string length
 * Expected Space: O(n * k)
 *
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
function groupAnagrams(strs) {
  // Your implementation here
}

/**
 * Problem 12: Top K Frequent Elements
 * Find k most frequent elements.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Number of elements
 * @return {number[]} Top k frequent elements
 *
 * Expected Time: O(n log k)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 */
function topKFrequent(nums, k) {
  // Your implementation here
}

/**
 * Problem 13: Longest Substring Without Repeating Characters
 * Find longest substring without duplicates.
 *
 * @param {string} s - Input string
 * @return {number} Length of longest substring
 *
 * Expected Time: O(n)
 * Expected Space: O(min(n, m)) where m is alphabet size
 *
 * Example:
 * Input: s = "abcabcbb"
 * Output: 3
 */
function lengthOfLongestSubstring(s) {
  // Your implementation here
}

/**
 * Problem 14: Happy Number
 * Check if number is happy.
 *
 * @param {number} n - Input number
 * @return {boolean} True if happy number
 *
 * Expected Time: O(log n)
 * Expected Space: O(log n)
 *
 * Example:
 * Input: n = 19
 * Output: true
 */
function isHappy(n) {
  // Your implementation here
}

/**
 * Problem 15: Word Pattern
 * Check if string follows pattern.
 *
 * @param {string} pattern - Pattern string
 * @param {string} s - Input string
 * @return {boolean} True if pattern matches
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: pattern = "abba", s = "dog cat cat dog"
 * Output: true
 */
function wordPattern(pattern, s) {
  // Your implementation here
}

/**
 * Problem 16: Find the Duplicate Number
 * Find duplicate number in array.
 *
 * @param {number[]} nums - Array with n+1 numbers
 * @return {number} Duplicate number
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,3,4,2,2]
 * Output: 2
 */
function findDuplicate(nums) {
  // Your implementation here
}

/**
 * Problem 17: Subarray Sum Equals K
 * Find subarrays that sum to k.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Target sum
 * @return {number} Number of subarrays
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,1], k = 2
 * Output: 2
 */
function subarraySum(nums, k) {
  // Your implementation here
}

/**
 * Problem 18: Find the Town Judge
 * Find the town judge.
 *
 * @param {number} n - Number of people
 * @param {number[][]} trust - Trust relationships
 * @return {number} Judge's label
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3, trust = [[1,3],[2,3]]
 * Output: 3
 */
function findJudge(n, trust) {
  // Your implementation here
}

/**
 * Problem 19: Find the Smallest Lucky Integer
 * Find smallest lucky integer in array.
 *
 * @param {number[]} nums - Input array
 * @return {number} Smallest lucky integer
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [2,2,3,4]
 * Output: 2
 */
function findLucky(nums) {
  // Your implementation here
}

/**
 * Problem 20: Find the Length of the Longest Valid Substring
 * Find longest valid substring with no banned words.
 *
 * @param {string} s - Input string
 * @param {string[]} banned - Banned words
 * @return {number} Length of longest valid substring
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "cbaaaabac", banned = ["cbaa"]
 * Output: 3
 */
function longestValidSubstring(s, banned) {
  // Your implementation here
}

/**
 * Problem 21: Find the Number of Good Pairs in an Array
 * Count pairs with sum equal to target.
 *
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number} Number of pairs
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4,3], target = 6
 * Output: 1
 */
function countPairs(nums, target) {
  // Your implementation here
}

/**
 * Problem 22: Find the Number of Subarrays with Maximum Value
 * Count subarrays where maximum is k.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Maximum value
 * @return {number} Number of subarrays
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,3,2,3,3], k = 3
 * Output: 5
 */
function countSubarrays(nums, k) {
  // Your implementation here
}

/**
 * Problem 23: Find the Number of Good Subarrays
 * Count subarrays with exactly k odd numbers.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Number of odd numbers
 * @return {number} Number of subarrays
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,2,1,1], k = 3
 * Output: 2
 */
function numberOfSubarrays(nums, k) {
  // Your implementation here
}

/**
 * Problem 24: Find the Number of Good Substrings
 * Count substrings with exactly k distinct characters.
 *
 * @param {string} s - Input string
 * @param {number} k - Number of distinct characters
 * @return {number} Number of substrings
 *
 * Expected Time: O(n)
 * Expected Space: O(k)
 *
 * Example:
 * Input: s = "pqpq", k = 2
 * Output: 7
 */
function countKSubstrings(s, k) {
  // Your implementation here
}

/**
 * Problem 25: Find the Number of Good Subarrays with Fixed Sum
 * Count subarrays with sum equal to target.
 *
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number} Number of subarrays
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3], target = 3
 * Output: 2
 */
function countSubarraysWithSum(nums, target) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: LRU Cache
 * Design least recently used cache.
 */
class LRUCache {
  constructor(capacity) {
    // Your implementation here
  }

  get(key) {
    // Your implementation here
  }

  put(key, value) {
    // Your implementation here
  }
}

/**
 * Problem 27: All O(1) Data Structure
 * Design data structure with O(1) operations.
 */
class AllOne {
  constructor() {
    // Your implementation here
  }

  inc(key) {
    // Your implementation here
  }

  dec(key) {
    // Your implementation here
  }

  getMaxKey() {
    // Your implementation here
  }

  getMinKey() {
    // Your implementation here
  }
}

/**
 * Problem 28: Insert Delete GetRandom O(1)
 * Design structure with insert, delete, getRandom in O(1).
 */
class RandomizedSet {
  constructor() {
    // Your implementation here
  }

  insert(val) {
    // Your implementation here
  }

  remove(val) {
    // Your implementation here
  }

  getRandom() {
    // Your implementation here
  }
}

/**
 * Problem 29: Design Twitter
 * Design Twitter-like system.
 */
class Twitter {
  constructor() {
    // Your implementation here
  }

  postTweet(userId, tweetId) {
    // Your implementation here
  }

  getNewsFeed(userId) {
    // Your implementation here
  }

  follow(followerId, followeeId) {
    // Your implementation here
  }

  unfollow(followerId, followeeId) {
    // Your implementation here
  }
}

/**
 * Problem 30: Design Snake Game
 * Design snake game implementation.
 */
class SnakeGame {
  constructor(width, height, food) {
    // Your implementation here
  }

  move(direction) {
    // Your implementation here
  }
}

/**
 * Problem 31: Find the First Missing Positive
 * Find first missing positive integer.
 *
 * @param {number[]} nums - Input array
 * @return {number} First missing positive
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,4,-1,1]
 * Output: 2
 */
function firstMissingPositive(nums) {
  // Your implementation here
}

/**
 * Problem 32: Find the Longest Consecutive Sequence
 * Find longest consecutive elements sequence.
 *
 * @param {number[]} nums - Input array
 * @return {number} Length of longest sequence
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [100,4,200,1,3,2]
 * Output: 4
 */
function longestConsecutive(nums) {
  // Your implementation here
}

/**
 * Problem 33: Find the Subarray with Largest Sum
 * Find subarray with maximum sum.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum subarray sum
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 */
function maxSubArray(nums) {
  // Your implementation here
}

/**
 * Problem 34: Find the Subarray with Largest Sum (Circular)
 * Find subarray with maximum sum in circular array.
 *
 * @param {number[]} nums - Input circular array
 * @return {number} Maximum subarray sum
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [1,-2,3,-2]
 * Output: 3
 */
function maxSubarraySumCircular(nums) {
  // Your implementation here
}

/**
 * Problem 35: Find the Subarray with Largest Product
 * Find subarray with maximum product.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum subarray product
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,3,-2,4]
 * Output: 6
 */
function maxProduct(nums) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Custom Hash Table
 * Implement hash table from scratch.
 */
class CustomHashTable {
  constructor(size = 16) {
    // Your implementation here
  }

  set(key, value) {
    // Your implementation here
  }

  get(key) {
    // Your implementation here
  }

  has(key) {
    // Your implementation here
  }

  delete(key) {
    // Your implementation here
  }

  keys() {
    // Your implementation here
  }

  values() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Design a LFU Cache
 * Implement least frequently used cache.
 */
class LFUCache {
  constructor(capacity) {
    // Your implementation here
  }

  get(key) {
    // Your implementation here
  }

  put(key, value) {
    // Your implementation here
  }
}

/**
 * Bonus 3: Design a HashMap with Custom Hash Function
 * HashMap with custom hash and collision resolution.
 */
class CustomHashMap {
  constructor(size = 16) {
    // Your implementation here
  }

  _hash(key) {
    // Your implementation here
  }

  set(key, value) {
    // Your implementation here
  }

  get(key) {
    // Your implementation here
  }

  has(key) {
    // Your implementation here
  }

  delete(key) {
    // Your implementation here
  }
}

/**
 * Bonus 4: Implement a Bloom Filter
 * Probabilistic data structure for membership testing.
 */
class BloomFilter {
  constructor(size, hashFunctions) {
    // Your implementation here
  }

  add(item) {
    // Your implementation here
  }

  mightContain(item) {
    // Your implementation here
  }
}

/**
 * Bonus 5: Design a Consistent Hash Ring
 * Distributed hash table implementation.
 */
class ConsistentHashRing {
  constructor() {
    // Your implementation here
  }

  addNode(node) {
    // Your implementation here
  }

  removeNode(node) {
    // Your implementation here
  }

  getNode(key) {
    // Your implementation here
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Hash Table Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test two sum
  console.log("Example - Two Sum:");
  console.log("Input: nums = [2,7,11,15], target = 9");
  console.log("Expected: [0,1]");
  console.log("Your result:", twoSum([2, 7, 11, 15], 9));

  // Test valid anagram
  console.log("\nExample - Valid Anagram:");
  console.log('Input: s = "anagram", t = "nagaram"');
  console.log("Expected: true");
  console.log("Your result:", isAnagram("anagram", "nagaram"));

  // Test first unique character
  console.log("\nExample - First Unique Character:");
  console.log('Input: s = "leetcode"');
  console.log("Expected: 0");
  console.log("Your result:", firstUniqChar("leetcode"));

  // Test contains duplicate
  console.log("\nExample - Contains Duplicate:");
  console.log("Input: nums = [1,2,3,1]");
  console.log("Expected: true");
  console.log("Your result:", containsDuplicate([1, 2, 3, 1]));

  // Test missing number
  console.log("\nExample - Missing Number:");
  console.log("Input: nums = [3,0,1]");
  console.log("Expected: 2");
  console.log("Your result:", missingNumber([3, 0, 1]));

  // Test group anagrams
  console.log("\nExample - Group Anagrams:");
  console.log('Input: strs = ["eat","tea","tan","ate","nat","bat"]');
  console.log('Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]');
  console.log(
    "Your result:",
    groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
  );

  // Test top k frequent
  console.log("\nExample - Top K Frequent:");
  console.log("Input: nums = [1,1,1,2,2,3], k = 2");
  console.log("Expected: [1,2]");
  console.log("Your result:", topKFrequent([1, 1, 1, 2, 2, 3], 2));

  // Test longest substring without repeating
  console.log("\nExample - Longest Substring Without Repeating:");
  console.log('Input: s = "abcabcbb"');
  console.log("Expected: 3");
  console.log("Your result:", lengthOfLongestSubstring("abcabcbb"));

  // Test happy number
  console.log("\nExample - Happy Number:");
  console.log("Input: n = 19");
  console.log("Expected: true");
  console.log("Your result:", isHappy(19));

  // Test word pattern
  console.log("\nExample - Word Pattern:");
  console.log('Input: pattern = "abba", s = "dog cat cat dog"');
  console.log("Expected: true");
  console.log("Your result:", wordPattern("abba", "dog cat cat dog"));

  // Test LRU Cache
  console.log("\nExample - LRU Cache:");
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

  // Test Randomized Set
  console.log("\nExample - Randomized Set:");
  const randomSet = new RandomizedSet();
  console.log("Insert 1:", randomSet.insert(1));
  console.log("Remove 2:", randomSet.remove(2));
  console.log("Insert 2:", randomSet.insert(2));
  console.log("Get random:", randomSet.getRandom());
  console.log("Remove 1:", randomSet.remove(1));
  console.log("Insert 2:", randomSet.insert(2));
  console.log("Get random:", randomSet.getRandom());

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding hash table operations and patterns");
  console.log("🚀 Move to medium problems when comfortable with easy ones");

  console.log("\n✅ Testing framework ready!");
}

// Helper function to test your solutions
function testFunction(funcName, testCases) {
  console.log(`\n🧮 Testing ${funcName}:`);

  for (let i = 0; i < testCases.length; i++) {
    const { input, expected } = testCases[i];
    const result = eval(
      `${funcName}(${input.map((arg) => JSON.stringify(arg)).join(", ")})`
    );

    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test ${i + 1}: ${passed ? "✅" : "❌"}`);
    if (!passed) {
      console.log(`  Input: ${JSON.stringify(input)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got: ${JSON.stringify(result)}`);
    }
  }
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  twoSum,
  isAnagram,
  firstUniqChar,
  containsDuplicate,
  missingNumber,
  findTheDifference,
  numJewelsInStones,
  areOccurrencesEqual,
  numIdenticalPairs,
  firstPalindrome,
  groupAnagrams,
  topKFrequent,
  lengthOfLongestSubstring,
  isHappy,
  wordPattern,
  findDuplicate,
  subarraySum,
  findJudge,
  findLucky,
  longestValidSubstring,
  countPairs,
  countSubarrays,
  numberOfSubarrays,
  countKSubstrings,
  countSubarraysWithSum,
  LRUCache,
  AllOne,
  RandomizedSet,
  Twitter,
  SnakeGame,
  firstMissingPositive,
  longestConsecutive,
  maxSubArray,
  maxSubarraySumCircular,
  maxProduct,
  CustomHashTable,
  LFUCache,
  CustomHashMap,
  BloomFilter,
  ConsistentHashRing,
  testFunction,
};
