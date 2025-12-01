// 🚶 Queues Practice Problems
// Implement these functions to master queue operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Implement Queue using Stacks
 * Implement a queue using two stacks with amortized O(1) operations.
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
 * Problem 2: Number of Recent Calls
 * Count recent calls within a time window.
 *
 * @param {number} t - Current time
 * @return {number} Number of calls within 3000ms
 *
 * Expected Time: O(1) amortized
 * Expected Space: O(k) where k is window size
 *
 * Example:
 * Input: [1, 100, 3001, 3002]
 * Output: [1, 2, 3, 3]
 */
class RecentCounter {
  constructor() {
    // Your implementation here
  }

  ping(t) {
    // Your implementation here
  }
}

/**
 * Problem 3: Time Needed to Buy Tickets
 * Calculate time to buy tickets with queue simulation.
 *
 * @param {number[]} tickets - Number of tickets each person wants
 * @param {number} k - Position of person to track
 * @return {number} Time for person k to finish
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: tickets = [2,3,2], k = 2
 * Output: 6
 */
function timeRequiredToBuy(tickets, k) {
  // Your implementation here
}

/**
 * Problem 4: Implement Circular Queue
 * Implement a fixed-size circular queue.
 */
class MyCircularQueue {
  constructor(k) {
    // Your implementation here
  }

  enQueue(value) {
    // Your implementation here
  }

  deQueue() {
    // Your implementation here
  }

  Front() {
    // Your implementation here
  }

  Rear() {
    // Your implementation here
  }

  isEmpty() {
    // Your implementation here
  }

  isFull() {
    // Your implementation here
  }
}

/**
 * Problem 5: Design Front Middle Back Queue
 * Design a queue with front, middle, and back operations.
 */
class FrontMiddleBackQueue {
  constructor() {
    // Your implementation here
  }

  pushFront(val) {
    // Your implementation here
  }

  pushMiddle(val) {
    // Your implementation here
  }

  pushBack(val) {
    // Your implementation here
  }

  popFront() {
    // Your implementation here
  }

  popMiddle() {
    // Your implementation here
  }

  popBack() {
    // Your implementation here
  }
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 6: Binary Tree Level Order Traversal
 * Perform level-order traversal of a binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Levels of tree
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 */
function levelOrder(root) {
  // Your implementation here
}

/**
 * Problem 7: Find Bottom Left Tree Value
 * Find the leftmost value in the last row of the tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Bottom left value
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [2,1,3]
 * Output: 1
 */
function findBottomLeftValue(root) {
  // Your implementation here
}

/**
 * Problem 8: Open the Lock
 * Find minimum turns to open the lock using BFS.
 *
 * @param {string[]} deadends - Dead end combinations
 * @param {string} target - Target combination
 * @return {number} Minimum turns
 *
 * Expected Time: O(10^4)
 * Expected Space: O(10^4)
 *
 * Example:
 * Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 * Output: 6
 */
function openLock(deadends, target) {
  // Your implementation here
}

/**
 * Problem 9: Maximum Depth of Binary Tree
 * Find maximum depth using BFS.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Maximum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 3
 */
function maxDepth(root) {
  // Your implementation here
}

/**
 * Problem 10: Average of Levels in Binary Tree
 * Calculate average value at each tree level.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Average values
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [3.00000,14.50000,11.00000]
 */
function averageOfLevels(root) {
  // Your implementation here
}

/**
 * Problem 11: Minimum Depth of Binary Tree
 * Find minimum depth using BFS.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Minimum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 2
 */
function minDepth(root) {
  // Your implementation here
}

/**
 * Problem 12: N-ary Tree Level Order Traversal
 * Level-order traversal of N-ary tree.
 *
 * @param {Node} root - Root of N-ary tree
 * @return {number[][]} Levels of tree
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [1,null,3,2,4,null,5,6]
 * Output: [[1],[3,2,4],[5,6]]
 */
function levelOrderNary(root) {
  // Your implementation here
}

/**
 * Problem 13: Find Largest Value in Each Tree Row
 * Find maximum value at each tree level.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Maximum values per level
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [1,3,2,5,3,null,9]
 * Output: [1,3,9]
 */
function largestValues(root) {
  // Your implementation here
}

/**
 * Problem 14: Populating Next Right Pointers in Binary Tree
 * Connect nodes at same level.
 *
 * @param {Node} root - Root of perfect binary tree
 * @return {Node} Connected tree
 *
 * Expected Time: O(n)
 * Expected Space: O(1) if optimized
 *
 * Example:
 * Input: [1,2,3,4,5,6,7]
 * Output: [1,#,2,3,#,4,5,6,7,#]
 */
function connect(root) {
  // Your implementation here
}

/**
 * Problem 15: Binary Tree Right Side View
 * Find right side view of binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Right side view
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 */
function rightSideView(root) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 16: Task Scheduler
 * Schedule tasks with cooling period.
 *
 * @param {character[]} tasks - Array of tasks
 * @param {number} n - Cooling period
 * @return {number} Minimum intervals needed
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: tasks = ["A","A","A","B","B","B"], n = 2
 * Output: 8
 */
function leastInterval(tasks, n) {
  // Your implementation here
}

/**
 * Problem 17: Design Bounded Blocking Queue
 * Implement thread-safe bounded queue.
 */
class BoundedBlockingQueue {
  constructor(capacity) {
    // Your implementation here
  }

  enqueue(element) {
    // Your implementation here
  }

  dequeue() {
    // Your implementation here
  }

  size() {
    // Your implementation here
  }
}

/**
 * Problem 18: Design Hit Counter
 * Design hit counter with sliding window.
 */
class HitCounter {
  constructor() {
    // Your implementation here
  }

  hit(timestamp) {
    // Your implementation here
  }

  getHits(timestamp) {
    // Your implementation here
  }
}

/**
 * Problem 19: Design Snake Game
 * Design snake game with food and movement.
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
 * Problem 20: Design File System
 * Design file system with path operations.
 */
class FileSystem {
  constructor() {
    // Your implementation here
  }

  createPath(path, value) {
    // Your implementation here
  }

  get(path) {
    // Your implementation here
  }
}

/**
 * Problem 21: Design Most Recently Used Queue
 * Design MRU queue with operations.
 */
class MRUQueue {
  constructor(n) {
    // Your implementation here
  }

  fetch(k) {
    // Your implementation here
  }
}

/**
 * Problem 22: Design a Stack With Increment Operation
 * Design stack with O(1) increment operation.
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
 * Problem 23: Design Authentication Manager
 * Design authentication manager with token expiry.
 */
class AuthenticationManager {
  constructor(timeToLive) {
    // Your implementation here
  }

  generate(tokenId, currentTime) {
    // Your implementation here
  }

  renew(tokenId, currentTime) {
    // Your implementation here
  }

  countUnexpiredTokens(currentTime) {
    // Your implementation here
  }
}

/**
 * Problem 24: Design Parking System
 * Design parking system for different car types.
 */
class ParkingSystem {
  constructor(big, medium, small) {
    // Your implementation here
  }

  addCar(carType) {
    // Your implementation here
  }
}

/**
 * Problem 25: Design Underground System
 * Design underground system for travel time tracking.
 */
class UndergroundSystem {
  constructor() {
    // Your implementation here
  }

  checkIn(id, stationName, t) {
    // Your implementation here
  }

  checkOut(id, stationName, t) {
    // Your implementation here
  }

  getAverageTime(startStation, endStation) {
    // Your implementation here
  }
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Deque using Stacks
 * Implement deque using two stacks.
 */
class MyDeque {
  constructor() {
    // Your implementation here
  }

  insertFront(value) {
    // Your implementation here
  }

  insertLast(value) {
    // Your implementation here
  }

  deleteFront() {
    // Your implementation here
  }

  deleteLast() {
    // Your implementation here
  }

  getFront() {
    // Your implementation here
  }

  getRear() {
    // Your implementation here
  }

  isEmpty() {
    // Your implementation here
  }

  size() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Implement Priority Queue using Queue
 * Implement priority queue using multiple queues.
 */
class MyPriorityQueue {
  constructor() {
    // Your implementation here
  }

  enqueue(element, priority) {
    // Your implementation here
  }

  dequeue() {
    // Your implementation here
  }

  peek() {
    // Your implementation here
  }

  size() {
    // Your implementation here
  }

  isEmpty() {
    // Your implementation here
  }
}

/**
 * Bonus 3: Generate Binary Numbers
 * Generate binary numbers from 1 to n using queue.
 *
 * @param {number} n - Upper limit
 * @return {string[]} Binary numbers
 *
 * Example:
 * Input: 5
 * Output: ["1","10","11","100","101"]
 */
function generateBinaryNumbers(n) {
  // Your implementation here
}

/**
 * Bonus 4: First Non-Repeating Character in Stream
 * Find first non-repeating character in stream.
 *
 * @param {string} s - Input stream
 * @return {string} First non-repeating characters
 *
 * Example:
 * Input: "aabc"
 * Output: "a#bb"
 */
function firstNonRepeating(s) {
  // Your implementation here
}

/**
 * Bonus 5: Reverse First K Elements of Queue
 * Reverse first k elements of a queue.
 *
 * @param {Queue} queue - Input queue
 * @param {number} k - Number of elements to reverse
 * @return {Queue} Modified queue
 *
 * Example:
 * Input: [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 */
function reverseFirstK(queue, k) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

// Helper function to create binary tree node
function TreeNode(val, left = null, right = null) {
  return {
    val: val,
    left: left,
    right: right,
  };
}

// Helper function to create N-ary tree node
function Node(val, children = []) {
  return {
    val: val,
    children: children,
  };
}

function runTests() {
  console.log("🧪 Running Queue Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test Queue using Stacks
  console.log("Example - Queue using Stacks:");
  const queue = new MyQueue();
  queue.push(1);
  queue.push(2);
  console.log("Peek:", queue.peek());
  console.log("Pop:", queue.pop());
  console.log("Empty:", queue.empty());

  // Test Recent Counter
  console.log("\nExample - Recent Counter:");
  const counter = new RecentCounter();
  console.log("Ping 1:", counter.ping(1));
  console.log("Ping 100:", counter.ping(100));
  console.log("Ping 3001:", counter.ping(3001));
  console.log("Ping 3002:", counter.ping(3002));

  // Test Time to Buy Tickets
  console.log("\nExample - Time to Buy Tickets:");
  console.log("Input: tickets = [2,3,2], k = 2");
  console.log("Expected: 6");
  console.log("Your result:", timeRequiredToBuy([2, 3, 2], 2));

  // Test Level Order Traversal
  console.log("\nExample - Level Order Traversal:");
  const tree = TreeNode(
    3,
    TreeNode(9),
    TreeNode(20, TreeNode(15), TreeNode(7))
  );
  console.log("Input: [3,9,20,null,null,15,7]");
  console.log("Expected: [[3],[9,20],[15,7]]");
  console.log("Your result:", levelOrder(tree));

  // Test Open Lock
  console.log("\nExample - Open Lock:");
  console.log(
    'Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"'
  );
  console.log("Expected: 6");
  console.log(
    "Your result:",
    openLock(["0201", "0101", "0102", "1212", "2002"], "0202")
  );

  // Test Task Scheduler
  console.log("\nExample - Task Scheduler:");
  console.log('Input: tasks = ["A","A","A","B","B","B"], n = 2');
  console.log("Expected: 8");
  console.log("Your result:", leastInterval(["A", "A", "A", "B", "B", "B"], 2));

  // Test Generate Binary Numbers
  console.log("\nExample - Generate Binary Numbers:");
  console.log("Input: 5");
  console.log('Expected: ["1","10","11","100","101"]');
  console.log("Your result:", generateBinaryNumbers(5));

  // Test First Non-Repeating
  console.log("\nExample - First Non-Repeating:");
  console.log('Input: "aabc"');
  console.log('Expected: "a#bb"');
  console.log("Your result:", firstNonRepeating("aabc"));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding queue operations and BFS");
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
  MyQueue,
  RecentCounter,
  timeRequiredToBuy,
  MyCircularQueue,
  FrontMiddleBackQueue,
  levelOrder,
  findBottomLeftValue,
  openLock,
  maxDepth,
  averageOfLevels,
  minDepth,
  levelOrderNary,
  largestValues,
  connect,
  rightSideView,
  leastInterval,
  BoundedBlockingQueue,
  HitCounter,
  SnakeGame,
  FileSystem,
  MRUQueue,
  CustomStack,
  AuthenticationManager,
  ParkingSystem,
  UndergroundSystem,
  MyDeque,
  MyPriorityQueue,
  generateBinaryNumbers,
  firstNonRepeating,
  reverseFirstK,
  TreeNode,
  Node,
  testFunction,
};
