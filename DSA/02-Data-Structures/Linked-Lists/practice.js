// 🔗 Linked Lists Practice Problems
// Implement these functions to master linked list operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Reverse Linked List
 * Reverse a singly linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} New head of reversed list
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
 */
function reverseList(head) {
  // Your implementation here
}

/**
 * Problem 2: Merge Two Sorted Lists
 * Merge two sorted linked lists into one sorted list.
 *
 * @param {ListNode} list1 - First sorted list
 * @param {ListNode} list2 - Second sorted list
 * @return {ListNode} Merged sorted list
 *
 * Expected Time: O(n + m)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->4, 1->3->4
 * Output: 1->1->2->3->4->4
 */
function mergeTwoLists(list1, list2) {
  // Your implementation here
}

/**
 * Problem 3: Delete Node in a Linked List
 * Delete a node given only that node (not the head).
 *
 * @param {ListNode} node - Node to delete
 * @return {void} Modify list in place
 *
 * Expected Time: O(1)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 4->5->1->9, node = 5
 * Output: 4->1->9
 */
function deleteNode(node) {
  // Your implementation here
}

/**
 * Problem 4: Palindrome Linked List
 * Check if a linked list is a palindrome.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} True if palindrome
 *
 * Expected Time: O(n)
 * Expected Space: O(1) if optimized
 *
 * Example:
 * Input: 1->2->2->1
 * Output: true
 */
function isPalindrome(head) {
  // Your implementation here
}

/**
 * Problem 5: Middle of the Linked List
 * Find the middle node of a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} Middle node
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5
 * Output: 3->4->5
 */
function middleNode(head) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 6: Add Two Numbers
 * Add two numbers represented by linked lists.
 *
 * @param {ListNode} l1 - First number (reversed)
 * @param {ListNode} l2 - Second number (reversed)
 * @return {ListNode} Sum as linked list
 *
 * Expected Time: O(max(n, m))
 * Expected Space: O(max(n, m))
 *
 * Example:
 * Input: 2->4->3, 5->6->4
 * Output: 7->0->8 (342 + 465 = 807)
 */
function addTwoNumbers(l1, l2) {
  // Your implementation here
}

/**
 * Problem 7: Remove Nth Node From End
 * Remove the nth node from the end of the list.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} n - Position from end
 * @return {ListNode} New head
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5, n = 2
 * Output: 1->2->3->5
 */
function removeNthFromEnd(head, n) {
  // Your implementation here
}

/**
 * Problem 8: Swap Nodes in Pairs
 * Swap nodes in pairs in a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} New head
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4
 * Output: 2->1->4->3
 */
function swapPairs(head) {
  // Your implementation here
}

/**
 * Problem 9: Intersection of Two Linked Lists
 * Find the node where two linked lists intersect.
 *
 * @param {ListNode} headA - Head of first list
 * @param {ListNode} headB - Head of second list
 * @return {ListNode} Intersection node
 *
 * Expected Time: O(n + m)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 4->1->8->4->5, 5->6->1->8->4->5
 * Output: 8->4->5
 */
function getIntersectionNode(headA, headB) {
  // Your implementation here
}

/**
 * Problem 10: Linked List Cycle II
 * Find the start node of a cycle in a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} Start of cycle or null
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 3->2->0->-4 (cycle back to 2)
 * Output: 2
 */
function detectCycle(head) {
  // Your implementation here
}

/**
 * Problem 11: Odd Even Linked List
 * Reorder list to group odd nodes first, then even nodes.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} New head
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5
 * Output: 1->3->5->2->4
 */
function oddEvenList(head) {
  // Your implementation here
}

/**
 * Problem 12: Split Linked List in Parts
 * Split linked list into k consecutive parts.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} k - Number of parts
 * @return {ListNode[]} Array of k parts
 *
 * Expected Time: O(n + k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: 1->2->3->4->5->6->7->8->9->10, k = 3
 * Output: [[1->2->3->4], [5->6->7], [8->9->10]]
 */
function splitListToParts(head, k) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 13: Reverse Nodes in k-Group
 * Reverse nodes of the list in groups of size k.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} k - Group size
 * @return {ListNode} New head
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5, k = 2
 * Output: 2->1->4->3->5
 */
function reverseKGroup(head, k) {
  // Your implementation here
}

/**
 * Problem 14: Copy List with Random Pointer
 * Deep copy of a linked list with random pointers.
 *
 * @param {Node} head - Head of the linked list
 * @return {Node} New head of copied list
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: 7->13->11->10->1 (with random pointers)
 * Output: Deep copy with same structure
 */
function copyRandomList(head) {
  // Your implementation here
}

/**
 * Problem 15: LRU Cache
 * Implement LRU cache using doubly linked list.
 *
 * @param {number} capacity - Maximum cache size
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
 * Problem 16: Flatten Multilevel Doubly Linked List
 * Flatten a multilevel doubly linked list.
 *
 * @param {Node} head - Head of the multilevel list
 * @return {Node} Flattened list head
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 1->2->3->4->5->6->NULL (with child pointers)
 * Output: 1->2->3->7->8->11->12->9->10->4->5->6->NULL
 */
function flatten(head) {
  // Your implementation here
}

/**
 * Problem 17: Design Browser History
 * Implement browser history using doubly linked list.
 */
class BrowserHistory {
  constructor(homepage) {
    // Your implementation here
  }

  visit(url) {
    // Your implementation here
  }

  back(steps) {
    // Your implementation here
  }

  forward(steps) {
    // Your implementation here
  }
}

/**
 * Problem 18: Sort Linked List
 * Sort a linked list using O(n log n) time and O(1) space.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} Sorted list head
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 4->2->1->3
 * Output: 1->2->3->4
 */
function sortList(head) {
  // Your implementation here
}

/**
 * Problem 19: Insert into a Sorted Circular Linked List
 * Insert a value into a sorted circular linked list.
 *
 * @param {Node} head - Head of the circular list
 * @param {number} insertVal - Value to insert
 * @return {Node} New head (may be different)
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: 3->4->1, insertVal = 2
 * Output: 3->4->1->2
 */
function insert(head, insertVal) {
  // Your implementation here
}

/**
 * Problem 20: Design Linked List
 * Implement your own linked list with all operations.
 */
class MyLinkedList {
  constructor() {
    // Your implementation here
  }

  get(index) {
    // Your implementation here
  }

  addAtHead(val) {
    // Your implementation here
  }

  addAtTail(val) {
    // Your implementation here
  }

  addAtIndex(index, val) {
    // Your implementation here
  }

  deleteAtIndex(index) {
    // Your implementation here
  }
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Convert Binary Number in a Linked List to Integer
 * Convert binary number represented by linked list to decimal.
 *
 * @param {ListNode} head - Head of the binary list
 * @return {number} Decimal value
 */
function getDecimalValue(head) {
  // Your implementation here
}

/**
 * Bonus 2: Remove Linked List Elements
 * Remove all elements with given value.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} val - Value to remove
 * @return {ListNode} New head
 */
function removeElements(head, val) {
  // Your implementation here
}

/**
 * Bonus 3: Convert Sorted List to Binary Search Tree
 * Convert sorted linked list to height-balanced BST.
 *
 * @param {ListNode} head - Head of sorted list
 * @return {TreeNode} Root of BST
 */
function sortedListToBST(head) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

// Helper function to create linked list from array
function createLinkedList(arr) {
  if (arr.length === 0) return null;

  const head = { val: arr[0], next: null };
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i], next: null };
    current = current.next;
  }

  return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// Helper function to create linked list with random pointers
function createListWithRandom(arr) {
  const nodes = arr.map((val) => ({ val, next: null, random: null }));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Set random pointers
  for (let i = 0; i < nodes.length; i++) {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    nodes[i].random = nodes[randomIndex];
  }

  return nodes[0];
}

function runTests() {
  console.log("🧪 Running Linked List Practice Tests...\n");

  // Test data
  const list1 = createLinkedList([1, 2, 3, 4, 5]);
  const list2 = createLinkedList([1, 3, 4]);
  const list3 = createLinkedList([2, 6, 4]);

  console.log("📝 Test your implementations:");
  console.log("List 1:", linkedListToArray(list1));
  console.log("List 2:", linkedListToArray(list2));
  console.log("List 3:", linkedListToArray(list3));

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test reverse
  console.log("Example - Reverse List:");
  console.log("Input:", linkedListToArray(list1));
  console.log("Expected: [5,4,3,2,1]");
  console.log(
    "Your result:",
    linkedListToArray(reverseList(createLinkedList([1, 2, 3, 4, 5])))
  );

  // Test merge
  console.log("\nExample - Merge Two Lists:");
  console.log("Input:", linkedListToArray(list2), linkedListToArray(list3));
  console.log("Expected: [1,2,3,4,6]");
  console.log("Your result:", linkedListToArray(mergeTwoLists(list2, list3)));

  // Test palindrome
  console.log("\nExample - Palindrome Check:");
  const palindromeList = createLinkedList([1, 2, 2, 1]);
  console.log("Input:", linkedListToArray(palindromeList));
  console.log("Expected: true");
  console.log("Your result:", isPalindrome(palindromeList));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Start with easy problems, then move to medium and hard");

  console.log("\n✅ Testing framework ready!");
}

// Helper function to test your solutions
function testFunction(funcName, testCases) {
  console.log(`\n🧮 Testing ${funcName}:`);

  for (let i = 0; i < testCases.length; i++) {
    const { input, expected } = testCases[i];
    const result = eval(
      `${funcName}(${input
        .map((arg) =>
          Array.isArray(arg)
            ? `createLinkedList(${JSON.stringify(arg)})`
            : JSON.stringify(arg)
        )
        .join(", ")})`
    );

    const actual = Array.isArray(result)
      ? result.map(linkedListToArray)
      : result && result.val
      ? linkedListToArray(result)
      : result;

    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`Test ${i + 1}: ${passed ? "✅" : "❌"}`);
    if (!passed) {
      console.log(`  Input: ${JSON.stringify(input)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got: ${JSON.stringify(actual)}`);
    }
  }
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  reverseList,
  mergeTwoLists,
  deleteNode,
  isPalindrome,
  middleNode,
  addTwoNumbers,
  removeNthFromEnd,
  swapPairs,
  getIntersectionNode,
  detectCycle,
  oddEvenList,
  splitListToParts,
  reverseKGroup,
  copyRandomList,
  LRUCache,
  flatten,
  BrowserHistory,
  sortList,
  insert,
  MyLinkedList,
  getDecimalValue,
  removeElements,
  sortedListToBST,
  createLinkedList,
  linkedListToArray,
  createListWithRandom,
  testFunction,
};
