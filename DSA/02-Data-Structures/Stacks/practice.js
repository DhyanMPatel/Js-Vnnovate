// 📚 Stacks Practice Problems
// Implement these functions to master stack operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Valid Parentheses
 * Check if a string containing just '(', ')', '{', '}', '[' and ']' is valid.
 *
 * @param {string} s - Input string
 * @return {boolean} True if valid
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "()[]{}"
 * Output: true
 * Input: "([)]"
 * Output: false
 */
function isValid(s) {
  // Your implementation here
}

/**
 * Problem 2: Remove All Adjacent Duplicates in String
 * Remove all adjacent duplicates from a string repeatedly.
 *
 * @param {string} s - Input string
 * @return {string} String after removing duplicates
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "abbaca"
 * Output: "ca"
 */
function removeDuplicates(s) {
  // Your implementation here
}

/**
 * Problem 3: Backspace String Compare
 * Compare two strings after applying backspace operations.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} True if strings are equal after backspace
 *
 * Expected Time: O(n)
 * Expected Space: O(n) or O(1) if optimized
 *
 * Example:
 * Input: "ab#c", "ad#c"
 * Output: true
 */
function backspaceCompare(s, t) {
  // Your implementation here
}

/**
 * Problem 4: Make The String Great
 * Remove adjacent characters that make the string not great.
 *
 * @param {string} s - Input string
 * @return {string} Great string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "leEeetcode"
 * Output: "leetcode"
 */
function makeGood(s) {
  // Your implementation here
}

/**
 * Problem 5: Reverse String
 * Reverse a string using a stack.
 *
 * @param {string} s - Input string
 * @return {string} Reversed string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "hello"
 * Output: "olleh"
 */
function reverseString(s) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 6: Min Stack
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 */
class MinStack {
  constructor() {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  top() {
    // Your implementation here
  }

  getMin() {
    // Your implementation here
  }
}

/**
 * Problem 7: Evaluate Reverse Polish Notation
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation.
 *
 * @param {string[]} tokens - RPN tokens
 * @return {number} Result
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: ["2","1","+","3","*"]
 * Output: 9
 */
function evalRPN(tokens) {
  // Your implementation here
}

/**
 * Problem 8: Generate Parentheses
 * Generate all combinations of well-formed parentheses.
 *
 * @param {number} n - Number of pairs
 * @return {string[]} All valid combinations
 *
 * Expected Time: O(4^n / sqrt(n))
 * Expected Space: O(n)
 *
 * Example:
 * Input: 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 */
function generateParenthesis(n) {
  // Your implementation here
}

/**
 * Problem 9: Asteroid Collision
 * Simulate asteroid collisions.
 *
 * @param {number[]} asteroids - Asteroid sizes and directions
 * @return {number[]} Remaining asteroids after collisions
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [5,10,-5]
 * Output: [5,10]
 */
function asteroidCollision(asteroids) {
  // Your implementation here
}

/**
 * Problem 10: Remove All Adjacent Duplicates in String II
 * Remove k adjacent duplicates from a string.
 *
 * @param {string} s - Input string
 * @param {number} k - Number of duplicates to remove
 * @return {string} Result string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "deeedbbcccbdaa", k = 3
 * Output: "aa"
 */
function removeDuplicates(s, k) {
  // Your implementation here
}

/**
 * Problem 11: Simplify Path
 * Simplify a Unix-style file path.
 *
 * @param {string} path - Unix path
 * @return {string} Simplified path
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "/home/"
 * Output: "/home"
 */
function simplifyPath(path) {
  // Your implementation here
}

/**
 * Problem 12: Decode String
 * Decode an encoded string.
 *
 * @param {string} s - Encoded string
 * @return {string} Decoded string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "3[a]2[bc]"
 * Output: "aaabcbc"
 */
function decodeString(s) {
  // Your implementation here
}

/**
 * Problem 13: Validate Stack Sequences
 * Check if push and pop sequences are valid.
 *
 * @param {number[]} pushed - Push sequence
 * @param {number[]} popped - Pop sequence
 * @return {boolean} True if valid
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
 * Output: true
 */
function validateStackSequences(pushed, popped) {
  // Your implementation here
}

/**
 * Problem 14: Remove Duplicate Letters
 * Remove duplicate letters while maintaining smallest lexicographical order.
 *
 * @param {string} s - Input string
 * @return {string} Result string
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "bcabc"
 * Output: "abc"
 */
function removeDuplicateLetters(s) {
  // Your implementation here
}

/**
 * Problem 15: Next Greater Element I
 * Find next greater element for each element in nums1 from nums2.
 *
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array (contains nums1 elements)
 * @return {number[]} Next greater elements
 *
 * Expected Time: O(n + m)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 */
function nextGreaterElement(nums1, nums2) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 16: Largest Rectangle in Histogram
 * Find the largest rectangle area in a histogram.
 *
 * @param {number[]} heights - Histogram heights
 * @return {number} Largest rectangle area
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [2,1,5,6,2,3]
 * Output: 10
 */
function largestRectangleArea(heights) {
  // Your implementation here
}

/**
 * Problem 17: Trapping Rain Water
 * Calculate how much water can be trapped after raining.
 *
 * @param {number[]} height - Heights of bars
 * @return {number} Amount of trapped water
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 */
function trap(height) {
  // Your implementation here
}

/**
 * Problem 18: Basic Calculator
 * Evaluate a simple expression string.
 *
 * @param {string} s - Expression string
 * @return {number} Result
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "1 + 1"
 * Output: 2
 */
function calculate(s) {
  // Your implementation here
}

/**
 * Problem 19: Basic Calculator II
 * Evaluate expression with +, -, *, /.
 *
 * @param {string} s - Expression string
 * @return {number} Result
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "3+2*2"
 * Output: 7
 */
function calculateII(s) {
  // Your implementation here
}

/**
 * Problem 20: Basic Calculator III
 * Evaluate expression with parentheses and operators.
 *
 * @param {string} s - Expression string
 * @return {number} Result
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: "2*(5+5*2)/3+(6/2+8)"
 * Output: 21
 */
function calculateIII(s) {
  // Your implementation here
}

/**
 * Problem 21: Maximal Rectangle
 * Find the largest rectangle containing only 1's in a binary matrix.
 *
 * @param {character[][]} matrix - Binary matrix
 * @return {number} Area of largest rectangle
 *
 * Expected Time: O(m * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * Output: 6
 */
function maximalRectangle(matrix) {
  // Your implementation here
}

/**
 * Problem 22: Remove K Digits
 * Remove k digits to make the smallest possible number.
 *
 * @param {string} num - Input number as string
 * @param {number} k - Number of digits to remove
 * @return {string} Smallest possible number
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: num = "1432219", k = 3
 * Output: "1219"
 */
function removeKdigits(num, k) {
  // Your implementation here
}

/**
 * Problem 23: Find the Most Competitive Subsequence
 * Find the most competitive subsequence of size k.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Size of subsequence
 * @return {number[]} Most competitive subsequence
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [3,5,2,6], k = 2
 * Output: [2,6]
 */
function mostCompetitive(nums, k) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Queue using Stacks
 * Implement a queue using two stacks.
 */
class MyQueue {
  constructor() {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  peek() {
    // Your implementation here
  }

  empty() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Implement Stack using Queues
 * Implement a stack using a single queue.
 */
class MyStack {
  constructor() {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  top() {
    // Your implementation here
  }

  empty() {
    // Your implementation here
  }
}

/**
 * Bonus 3: Design a Stack With Increment Operation
 * Design a stack that supports push, pop, top, and increment.
 */
class CustomStack {
  constructor(maxSize) {
    // Your implementation here
  }

  push(x) {
    // Your implementation here
  }

  pop() {
    // Your implementation here
  }

  increment(k, val) {
    // Your implementation here
  }
}

/**
 * Bonus 4: Online Stock Span
 * Calculate the stock span for each day's price.
 */
class StockSpanner {
  constructor() {
    // Your implementation here
  }

  next(price) {
    // Your implementation here
  }
}

/**
 * Bonus 5: Score of Parentheses
 * Calculate the score of a balanced parentheses string.
 *
 * @param {string} s - Balanced parentheses string
 * @return {number} Score
 *
 * Example:
 * Input: "(()(()))"
 * Output: 6
 */
function scoreOfParentheses(s) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Stack Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test valid parentheses
  console.log("Example - Valid Parentheses:");
  console.log('Input: "()[]{}"');
  console.log("Expected: true");
  console.log("Your result:", isValid("()[]{}"));

  // Test remove duplicates
  console.log("\nExample - Remove Duplicates:");
  console.log('Input: "abbaca"');
  console.log('Expected: "ca"');
  console.log("Your result:", removeDuplicates("abbaca"));

  // Test backspace compare
  console.log("\nExample - Backspace Compare:");
  console.log('Input: "ab#c", "ad#c"');
  console.log("Expected: true");
  console.log("Your result:", backspaceCompare("ab#c", "ad#c"));

  // Test RPN evaluation
  console.log("\nExample - RPN Evaluation:");
  console.log('Input: ["2","1","+","3","*"]');
  console.log("Expected: 9");
  console.log("Your result:", evalRPN(["2", "1", "+", "3", "*"]));

  // Test generate parentheses
  console.log("\nExample - Generate Parentheses:");
  console.log("Input: 3");
  console.log('Expected: ["((()))","(()())","(())()","()(())","()()()"]');
  console.log("Your result:", generateParenthesis(3));

  // Test asteroid collision
  console.log("\nExample - Asteroid Collision:");
  console.log("Input: [5,10,-5]");
  console.log("Expected: [5,10]");
  console.log("Your result:", asteroidCollision([5, 10, -5]));

  // Test decode string
  console.log("\nExample - Decode String:");
  console.log('Input: "3[a]2[bc]"');
  console.log('Expected: "aaabcbc"');
  console.log("Your result:", decodeString("3[a]2[bc]"));

  // Test next greater element
  console.log("\nExample - Next Greater Element:");
  console.log("Input: nums1 = [4,1,2], nums2 = [1,3,4,2]");
  console.log("Expected: [-1,3,-1]");
  console.log("Your result:", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding stack operations and patterns");
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
  isValid,
  removeDuplicates,
  backspaceCompare,
  makeGood,
  reverseString,
  MinStack,
  evalRPN,
  generateParenthesis,
  asteroidCollision,
  removeDuplicates: removeDuplicates,
  simplifyPath,
  decodeString,
  validateStackSequences,
  removeDuplicateLetters,
  nextGreaterElement,
  largestRectangleArea,
  trap,
  calculate,
  calculateII,
  calculateIII,
  maximalRectangle,
  removeKdigits,
  mostCompetitive,
  MyQueue,
  MyStack,
  CustomStack,
  StockSpanner,
  scoreOfParentheses,
  testFunction,
};
