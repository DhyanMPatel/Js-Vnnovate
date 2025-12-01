// 🔗 Linked Lists Implementation
// Complete implementations of all linked list types and operations

// ==========================================
// BASIC NODE DEFINITIONS
// ==========================================

// Singly Linked List Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Doubly Linked List Node
class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// ==========================================
// SINGLY LINKED LIST IMPLEMENTATION
// ==========================================

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add to end - O(1)
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // Add to start - O(1)
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // Insert at index - O(n)
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.prepend(value);
    if (index === this.length) return this.append(value);

    const newNode = new Node(value);
    const prev = this.get(index - 1);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
    return true;
  }

  // Remove at index - O(n)
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.removeHead();
    if (index === this.length - 1) return this.removeTail();

    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;

    this.length--;
    return removed.value;
  }

  // Remove head - O(1)
  removeHead() {
    if (!this.head) return undefined;

    const removed = this.head;
    this.head = this.head.next;

    if (this.length === 1) {
      this.tail = null;
    }

    this.length--;
    return removed.value;
  }

  // Remove tail - O(n)
  removeTail() {
    if (!this.head) return undefined;

    const current = this.head;
    const newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return current.value;
  }

  // Get node at index - O(n)
  get(index) {
    if (index < 0 || index >= this.length) return undefined;

    let current = this.head;
    let count = 0;

    while (count < index) {
      current = current.next;
      count++;
    }

    return current;
  }

  // Search for value - O(n)
  search(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }

    return null;
  }

  // Update value at index - O(n)
  update(index, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }

  // Reverse list - O(n)
  reverse() {
    if (!this.head) return this;

    let current = this.head;
    let prev = null;
    let next = null;

    // Swap head and tail
    this.tail = this.head;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
    return this;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Clear list - O(1)
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return this;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.length === 0;
  }

  // Get size - O(1)
  size() {
    return this.length;
  }
}

// ==========================================
// DOUBLY LINKED LIST IMPLEMENTATION
// ==========================================

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add to end - O(1)
  append(value) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // Add to start - O(1)
  prepend(value) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // Insert at index - O(n)
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.prepend(value);
    if (index === this.length) return this.append(value);

    const newNode = new DoublyNode(value);
    const after = this.get(index);
    const before = after.prev;

    before.next = newNode;
    newNode.prev = before;
    newNode.next = after;
    after.prev = newNode;

    this.length++;
    return true;
  }

  // Remove at index - O(n)
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.removeHead();
    if (index === this.length - 1) return this.removeTail();

    const removed = this.get(index);
    const before = removed.prev;
    const after = removed.next;

    before.next = after;
    after.prev = before;

    this.length--;
    return removed.value;
  }

  // Remove head - O(1)
  removeHead() {
    if (!this.head) return undefined;

    const removed = this.head;
    this.head = this.head.next;

    if (this.length === 1) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }

    this.length--;
    return removed.value;
  }

  // Remove tail - O(1)
  removeTail() {
    if (!this.head) return undefined;

    const removed = this.tail;
    this.tail = this.tail.prev;

    if (this.length === 1) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    this.length--;
    return removed.value;
  }

  // Get node at index - O(n) but optimized
  get(index) {
    if (index < 0 || index >= this.length) return undefined;

    let current;

    // Start from closer end
    if (index < this.length / 2) {
      current = this.head;
      let count = 0;
      while (count < index) {
        current = current.next;
        count++;
      }
    } else {
      current = this.tail;
      let count = this.length - 1;
      while (count > index) {
        current = current.prev;
        count--;
      }
    }

    return current;
  }

  // Search for value - O(n)
  search(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }

    return null;
  }

  // Reverse list - O(n)
  reverse() {
    if (!this.head) return this;

    let current = this.head;
    let temp = null;

    // Swap head and tail
    this.head = this.tail;
    this.tail = current;

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }

    return this;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Clear list - O(1)
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return this;
  }
}

// ==========================================
// CIRCULAR LINKED LIST
// ==========================================

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add to end - O(1)
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Points to itself
    } else {
      this.tail.next = newNode;
      newNode.next = this.head;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // Add to start - O(1)
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // Remove head - O(n)
  removeHead() {
    if (!this.head) return undefined;

    const removed = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail.next = this.head;
    }

    this.length--;
    return removed.value;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.head;

    if (!current) return result;

    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.head);

    return result;
  }

  // Check if circular - O(n)
  isCircular() {
    if (!this.head) return false;

    let current = this.head;

    while (current.next) {
      if (current.next === this.head) return true;
      current = current.next;
    }

    return false;
  }
}

// ==========================================
// LINKED LIST UTILITIES
// ==========================================

class LinkedListUtils {
  // Find middle node - O(n)
  static findMiddle(head) {
    if (!head) return null;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  // Check if cycle exists - O(n)
  static hasCycle(head) {
    if (!head) return false;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) return true;
    }

    return false;
  }

  // Find start of cycle - O(n)
  static findCycleStart(head) {
    if (!head) return null;

    let slow = head;
    let fast = head;
    let hasCycle = false;

    // Detect cycle
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        hasCycle = true;
        break;
      }
    }

    if (!hasCycle) return null;

    // Find start
    slow = head;
    while (slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return slow;
  }

  // Merge two sorted lists - O(n + m)
  static mergeSorted(list1, list2) {
    const dummy = new Node(0);
    let current = dummy;

    while (list1 && list2) {
      if (list1.value <= list2.value) {
        current.next = list1;
        list1 = list1.next;
      } else {
        current.next = list2;
        list2 = list2.next;
      }
      current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
  }

  // Reverse list recursively - O(n)
  static reverseRecursive(head) {
    if (!head || !head.next) return head;

    const reversed = this.reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return reversed;
  }

  // Check if palindrome - O(n)
  static isPalindrome(head) {
    if (!head || !head.next) return true;

    // Find middle
    const middle = this.findMiddle(head);

    // Reverse second half
    const secondHalf = this.reverseRecursive(middle.next);

    // Compare
    let p1 = head;
    let p2 = secondHalf;
    let result = true;

    while (p2) {
      if (p1.value !== p2.value) {
        result = false;
        break;
      }
      p1 = p1.next;
      p2 = p2.next;
    }

    // Restore (optional)
    middle.next = this.reverseRecursive(secondHalf);

    return result;
  }

  // Remove nth node from end - O(n)
  static removeNthFromEnd(head, n) {
    const dummy = new Node(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Move fast n steps ahead
    for (let i = 0; i < n; i++) {
      fast = fast.next;
    }

    // Move both until fast reaches end
    while (fast.next) {
      slow = slow.next;
      fast = fast.next;
    }

    // Remove node
    slow.next = slow.next.next;

    return dummy.next;
  }

  // Rotate list by k positions - O(n)
  static rotate(head, k) {
    if (!head || !head.next) return head;

    // Find length and tail
    let length = 1;
    let tail = head;

    while (tail.next) {
      tail = tail.next;
      length++;
    }

    // Adjust k
    k = k % length;
    if (k === 0) return head;

    // Find new tail (length - k - 1 steps from head)
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
      newTail = newTail.next;
    }

    // Reconnect
    const newHead = newTail.next;
    tail.next = head;
    newTail.next = null;

    return newHead;
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Linked List Implementation Tests...\n");

  // Test Singly Linked List
  console.log("🔗 Testing Singly Linked List:");
  const sll = new SinglyLinkedList();

  sll.append(1);
  sll.append(2);
  sll.append(3);
  sll.prepend(0);

  console.log("After operations:", sll.toArray());
  console.log("Get index 2:", sll.get(2)?.value);
  console.log("Search for 2:", sll.search(2)?.value);
  console.log("Size:", sll.size());

  sll.remove(2);
  console.log("After removing index 2:", sll.toArray());

  sll.reverse();
  console.log("After reverse:", sll.toArray());

  // Test Doubly Linked List
  console.log("\n🔗 Testing Doubly Linked List:");
  const dll = new DoublyLinkedList();

  dll.append(1);
  dll.append(2);
  dll.append(3);
  dll.prepend(0);

  console.log("After operations:", dll.toArray());
  console.log("Get index 2:", dll.get(2)?.value);

  dll.remove(1);
  console.log("After removing index 1:", dll.toArray());

  dll.reverse();
  console.log("After reverse:", dll.toArray());

  // Test Circular Linked List
  console.log("\n🔗 Testing Circular Linked List:");
  const cll = new CircularLinkedList();

  cll.append(1);
  cll.append(2);
  cll.append(3);

  console.log("After operations:", cll.toArray());
  console.log("Is circular:", cll.isCircular());

  cll.removeHead();
  console.log("After removing head:", cll.toArray());

  // Test Utilities
  console.log("\n🔧 Testing LinkedListUtils:");
  const utilList = new SinglyLinkedList();
  utilList.append(1);
  utilList.append(2);
  utilList.append(3);
  utilList.append(4);
  utilList.append(5);

  console.log("Original list:", utilList.toArray());
  console.log("Middle node:", LinkedListUtils.findMiddle(utilList.head)?.value);
  console.log("Has cycle:", LinkedListUtils.hasCycle(utilList.head));
  console.log("Is palindrome:", LinkedListUtils.isPalindrome(utilList.head));

  // Test rotation
  const rotated = LinkedListUtils.rotate(utilList.head, 2);
  console.log("Rotated by 2:", LinkedListUtils.toArray(rotated));

  console.log("\n✅ All tests completed!");
}

// Helper to convert linked list to array
LinkedListUtils.toArray = function (head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.value);
    current = current.next;
  }

  return result;
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  Node,
  DoublyNode,
  SinglyLinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  LinkedListUtils,
};
