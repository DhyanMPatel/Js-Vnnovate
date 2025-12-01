# 🔗 Linked Lists

> **Dynamic Data Structures for Efficient Insertions/Deletions**

## 📋 Table of Contents

- [What are Linked Lists?](#what-are-linked-lists)
- [Types of Linked Lists](#types-of-linked-lists)
- [Core Operations](#core-operations)
- [Implementation](#implementation)
- [Common Patterns](#common-patterns)
- [Advanced Techniques](#advanced-techniques)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Linked Lists?

### Definition

A linked list is a linear data structure where elements are stored in nodes, and each node contains a pointer to the next node in the sequence.

### Basic Structure

```javascript
class Node {
  constructor(value) {
    this.value = value; // Data
    this.next = null; // Pointer to next node
  }
}

class LinkedList {
  constructor() {
    this.head = null; // First node
    this.tail = null; // Last node
    this.length = 0; // Number of nodes
  }
}
```

### Why Linked Lists?

- **Dynamic Size**: Can grow/shrink as needed
- **Efficient Insertions/Deletions**: O(1) at known positions
- **Memory Efficiency**: No wasted space from pre-allocation
- **Foundation**: Base for stacks, queues, graphs

## 🔍 Types of Linked Lists

### 1. Singly Linked List

```javascript
// Each node points to next node only
class SinglyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Structure: Head -> Node1 -> Node2 -> ... -> Tail -> null
```

### 2. Doubly Linked List

```javascript
// Each node points to next and previous nodes
class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// Structure: null <- Head <-> Node1 <-> Node2 <-> Tail -> null
```

### 3. Circular Linked List

```javascript
// Last node points back to head
// Can be singly or doubly circular
// Structure: Head -> Node1 -> Node2 -> ... -> Tail -> Head
```

## ⚡ Core Operations

### Singly Linked List Operations

```javascript
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
}
```

### Doubly Linked List Operations

```javascript
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

  // Get node at index - O(n) but can be optimized
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
}
```

## 🎯 Common Patterns

### 1. Two Pointers

```javascript
// Find middle node
function findMiddle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // Middle node
}

// Check if cycle exists
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}

// Find start of cycle
function findCycleStart(head) {
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
```

### 2. Dummy Head

```javascript
// Merge two sorted lists
function mergeTwoLists(l1, l2) {
  const dummy = new Node(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}

// Remove nodes with specific value
function removeNodes(head, val) {
  const dummy = new Node(0);
  dummy.next = head;
  let current = dummy;

  while (current.next) {
    if (current.next.value === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}
```

### 3. Recursive Patterns

```javascript
// Reverse list recursively
function reverseRecursive(head) {
  if (!head || !head.next) return head;

  const reversed = reverseRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return reversed;
}

// Merge lists recursively
function mergeRecursive(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.value <= l2.value) {
    l1.next = mergeRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeRecursive(l1, l2.next);
    return l2;
  }
}

// Check palindrome
function isPalindrome(head) {
  if (!head || !head.next) return true;

  // Find middle
  const middle = findMiddle(head);

  // Reverse second half
  const secondHalf = reverseRecursive(middle.next);

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
  middle.next = reverseRecursive(secondHalf);

  return result;
}
```

## 🚀 Advanced Techniques

### 1. Skip Lists

```javascript
// Probabilistic data structure for fast search
class SkipNode {
  constructor(value, level) {
    this.value = value;
    this.next = new Array(level).fill(null);
  }
}

class SkipList {
  constructor(maxLevel = 16) {
    this.maxLevel = maxLevel;
    this.level = 1;
    this.head = new SkipNode(-Infinity, maxLevel);
  }

  randomLevel() {
    let level = 1;
    while (Math.random() < 0.5 && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value) {
    const update = new Array(this.maxLevel).fill(null);
    let current = this.head;

    // Find insertion points
    for (let i = this.level - 1; i >= 0; i--) {
      while (current.next[i] && current.next[i].value < value) {
        current = current.next[i];
      }
      update[i] = current;
    }

    const newNodeLevel = this.randomLevel();
    const newNode = new SkipNode(value, newNodeLevel);

    // Update level if needed
    if (newNodeLevel > this.level) {
      for (let i = this.level; i < newNodeLevel; i++) {
        update[i] = this.head;
      }
      this.level = newNodeLevel;
    }

    // Insert node
    for (let i = 0; i < newNodeLevel; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
  }

  search(value) {
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (current.next[i] && current.next[i].value < value) {
        current = current.next[i];
      }
    }

    current = current.next[0];
    return current && current.value === value;
  }
}
```

### 2. XOR Linked List

```javascript
// Memory-efficient doubly linked list
class XORNode {
  constructor(value) {
    this.value = value;
    this.both = null; // XOR of prev and next
  }
}

class XORLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // XOR two pointers
  xor(a, b) {
    return a ^ b;
  }

  add(value) {
    const newNode = new XORNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.both = this.xor(0, this.tail.both);
      this.tail.both = this.xor(newNode, this.xor(this.tail.both, 0));
      this.tail = newNode;
    }
  }

  get(index) {
    let current = this.head;
    let prev = 0;
    let next = 0;

    for (let i = 0; i < index; i++) {
      next = this.xor(prev, current.both);
      prev = current;
      current = next;

      if (!current) return null;
    }

    return current.value;
  }
}
```

## 💪 Practice Problems

### Easy

1. **Reverse Linked List** - Reverse a singly linked list
2. **Merge Two Sorted Lists** - Merge two sorted linked lists
3. **Delete Node** - Delete node given only reference to it
4. **Palindrome Linked List** - Check if list is palindrome

### Medium

1. **Add Two Numbers** - Add numbers represented as linked lists
2. **Swap Nodes in Pairs** - Swap nodes in pairs
3. **Intersection of Two Lists** - Find intersection point
4. **Detect Cycle** - Detect and remove cycle
5. **Remove Duplicates** - Remove duplicates from sorted list

### Hard

1. **Reverse Nodes in k-Group** - Reverse nodes in groups of k
2. **Copy List with Random Pointer** - Deep copy with random pointers
3. **LRU Cache** - Implement using doubly linked list
4. **Flatten Multilevel List** - Flatten multilevel doubly linked list

## 🎤 Interview Tips

### Problem-Solving Approach

```javascript
// 1. Understand the structure
function solveLinkedListProblem(head) {
  // Clarify: singly or doubly? sorted? cycle?
  // Edge cases: empty list, single node, null input
}

// 2. Choose the right technique
const techniques = {
  twoPointers: "For finding middle, cycle detection",
  dummyHead: "For modifications at head",
  recursion: "For reversing, merging",
  stack: "For palindrome, reversal",
};

// 3. Handle edge cases
const edgeCases = [
  "Empty list (null head)",
  "Single node list",
  "Two node list",
  "List with cycle",
  "Large list (performance)",
];
```

### Common Mistakes to Avoid

- ❌ Not handling null/empty list
- ❌ Losing reference to next node during deletion
- ❌ Not updating head/tail pointers
- ❌ Creating cycles accidentally
- ❌ Memory leaks in languages with manual memory management

### Communication Tips

- **Draw the linked list** to visualize the problem
- **Explain your pointer manipulations** step by step
- **Discuss time/space complexity** of your approach
- **Mention edge cases** you're considering

## 📊 Complexity Analysis

| Operation     | Singly LL | Doubly LL | Array |
| ------------- | --------- | --------- | ----- |
| Access Head   | O(1)      | O(1)      | O(1)  |
| Access Tail   | O(n)      | O(1)      | O(1)  |
| Access Middle | O(n)      | O(n)      | O(1)  |
| Insert Head   | O(1)      | O(1)      | O(n)  |
| Insert Tail   | O(1)      | O(1)      | O(1)  |
| Insert Middle | O(n)      | O(n)      | O(n)  |
| Delete Head   | O(1)      | O(1)      | O(n)  |
| Delete Tail   | O(n)      | O(1)      | O(1)  |
| Delete Middle | O(n)      | O(n)      | O(n)  |
| Search        | O(n)      | O(n)      | O(n)  |

## 📖 Additional Resources

### Videos

- **Linked Lists - CS50**: Harvard introduction
- **Linked List Patterns - NeetCode**: Common patterns
- **Two Pointers Technique - TechLead**: Fast/slow pointers

### Websites

- **Visualgo**: Linked list visualizations
- **GeeksforGeeks**: Comprehensive linked list tutorials
- **LeetCode**: Filter by linked list problems

### Books

- **"Cracking the Coding Interview"**: Linked list chapter
- **"Introduction to Algorithms"**: Theoretical treatment

## 🎓 What You Need from Other Resources

### Memory Management

- **Pointers and References**: Understanding memory addresses
- **Memory Allocation**: Stack vs heap memory
- **Garbage Collection**: How languages manage memory

### Advanced Data Structures

- **Trees**: Binary trees use linked list nodes
- **Graphs**: Adjacency lists use linked lists
- **Hash Tables**: Chaining uses linked lists

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Stacks** → `../Stacks/README.md`

> 💡 **Key Insight**: Linked lists teach pointer manipulation - a crucial skill for trees, graphs, and many other data structures!

---

## 📊 Quick Reference

### Must-Know Operations

```javascript
const essentialOperations = {
  traversal: "Visit each node once",
  insertion: "Handle head, middle, tail cases",
  deletion: "Update pointers correctly",
  reversal: "Iterative vs recursive",
  cycleDetection: "Fast and slow pointers",
  merging: "Dummy head technique",
};
```

### Common Interview Problems

- **Reverse**: Iterative and recursive
- **Merge**: Two sorted lists
- **Cycle**: Detection and removal
- **Palindrome**: Two-pointer technique
- **Intersection**: Find common node

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Arrays & Strings_  
_Time Commitment: 1 week_
