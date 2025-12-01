# ⛰️ Heaps & Priority Queues

> **Efficient Priority-Based Data Structure**

## 📋 Table of Contents

- [What are Heaps?](#what-are-heaps)
- [Heap Properties](#heap-properties)
- [Heap Types](#heap-types)
- [Core Operations](#core-operations)
- [Heap Applications](#heap-applications)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Heaps?

### Definition

A heap is a specialized tree-based data structure that satisfies the **heap property**: each parent node is always greater than (or less than) its children. Heaps are commonly implemented as binary trees stored in arrays.

### Real-World Analogy

```javascript
// Think of a priority queue at a hospital:
// - Emergency patients (highest priority) go first
// - Regular patients wait their turn
// - VIP patients get priority over regular patients

const hospitalQueue = {
  emergency: "Immediate attention (max heap)",
  vip: "High priority (medium heap)",
  regular: "Standard priority (min heap)",
};
```

### Why Heaps Matter

- **Priority Queues**: Efficient priority-based processing
- **Heap Sort**: O(n log n) sorting algorithm
- **Graph Algorithms**: Dijkstra's, Prim's algorithms
- **Streaming**: Finding top-k elements
- **Resource Management**: CPU scheduling, memory allocation

## 🔍 Heap Properties

### Heap Property

```javascript
const heapProperties = {
  maxHeap: "Parent ≥ Children (largest element at root)",
  minHeap: "Parent ≤ Children (smallest element at root)",
  complete: "All levels filled except possibly last",
  leftToRight: "Last level filled left to right",
  arrayBased: "Efficient array implementation",
};
```

### Time Complexity Analysis

```javascript
const heapOperations = {
  insert: "O(log n) - Add element and bubble up",
  extractMax: "O(log n) - Remove root and bubble down",
  peek: "O(1) - Look at root element",
  delete: "O(log n) - Remove arbitrary element",
  heapify: "O(n) - Build heap from array",
  search: "O(n) - Linear search required",
};
```

### Space Complexity

- **O(n)** - Space grows linearly with number of elements
- **O(1)** extra space for array-based implementation
- **O(log n)** recursion depth for heap operations

## 🌲 Heap Types

### 1. Max Heap

```javascript
// Parent ≥ Children
const maxHeapExample = {
  root: 100,
  children: [80, 90],
  grandchildren: [70, 60, 85, 88],
};
```

### 2. Min Heap

```javascript
// Parent ≤ Children
const minHeapExample = {
  root: 10,
  children: [20, 30],
  grandchildren: [40, 50, 35, 60],
};
```

### 3. Binary Heap

```javascript
// Complete binary tree with heap property
class BinaryHeap {
  constructor(comparator = (a, b) => a > b) {
    this.heap = [];
    this.comparator = comparator;
  }
}
```

### 4. Fibonacci Heap

```javascript
// Collection of trees with better amortized complexity
class FibonacciHeap {
  constructor() {
    this.min = null;
    this.size = 0;
  }
}
```

## ⚡ Core Operations

### Max Heap Implementation

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Get parent index - O(1)
  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Get left child index - O(1)
  getLeftChild(index) {
    return 2 * index + 1;
  }

  // Get right child index - O(1)
  getRightChild(index) {
    return 2 * index + 2;
  }

  // Swap elements - O(1)
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert element - O(log n)
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
    return this;
  }

  // Bubble up element - O(log n)
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParent(index);

      if (this.heap[parentIndex] >= this.heap[index]) break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Extract maximum - O(log n)
  extractMax() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return max;
  }

  // Bubble down element - O(log n)
  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let leftChildIndex = this.getLeftChild(index);
      let rightChildIndex = this.getRightChild(index);
      let swapIndex = index;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] > this.heap[swapIndex]
      ) {
        swapIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] > this.heap[swapIndex]
      ) {
        swapIndex = rightChildIndex;
      }

      if (swapIndex === index) break;

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  // Peek at maximum - O(1)
  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }

  // Get size - O(1)
  size() {
    return this.heap.length;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // Build heap from array - O(n)
  heapify(array) {
    this.heap = [...array];

    // Start from last non-leaf node and bubble down
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }

    return this;
  }

  // Convert to array - O(1)
  toArray() {
    return [...this.heap];
  }

  // Clear heap - O(1)
  clear() {
    this.heap = [];
    return this;
  }
}
```

### Min Heap Implementation

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Get parent index - O(1)
  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Get left child index - O(1)
  getLeftChild(index) {
    return 2 * index + 1;
  }

  // Get right child index - O(1)
  getRightChild(index) {
    return 2 * index + 2;
  }

  // Swap elements - O(1)
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert element - O(log n)
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
    return this;
  }

  // Bubble up element - O(log n)
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParent(index);

      if (this.heap[parentIndex] <= this.heap[index]) break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Extract minimum - O(log n)
  extractMin() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return min;
  }

  // Bubble down element - O(log n)
  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let leftChildIndex = this.getLeftChild(index);
      let rightChildIndex = this.getRightChild(index);
      let swapIndex = index;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[swapIndex]
      ) {
        swapIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[swapIndex]
      ) {
        swapIndex = rightChildIndex;
      }

      if (swapIndex === index) break;

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  // Peek at minimum - O(1)
  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }

  // Get size - O(1)
  size() {
    return this.heap.length;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // Build heap from array - O(n)
  heapify(array) {
    this.heap = [...array];

    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }

    return this;
  }
}
```

### Generic Priority Queue

```javascript
class PriorityQueue {
  constructor(comparator = (a, b) => a.priority > b.priority) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Add element with priority - O(log n)
  enqueue(element, priority) {
    const item = { element, priority };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
    return this;
  }

  // Remove highest priority element - O(log n)
  dequeue() {
    if (this.heap.length === 0) return undefined;

    const max = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }

    return max.element;
  }

  // Look at highest priority element - O(1)
  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0].element;
  }

  // Change priority of element - O(n)
  changePriority(element, newPriority) {
    const index = this.heap.findIndex((item) => item.element === element);
    if (index === -1) return false;

    const oldPriority = this.heap[index].priority;
    this.heap[index].priority = newPriority;

    if (newPriority > oldPriority) {
      this.bubbleUp(index);
    } else {
      this.bubbleDown(index);
    }

    return true;
  }

  // Bubble up element - O(log n)
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (!this.comparator(this.heap[index], this.heap[parentIndex])) break;

      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  // Bubble down element - O(log n)
  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = index;

      if (
        leftChildIndex < length &&
        this.comparator(this.heap[leftChildIndex], this.heap[index])
      ) {
        swapIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.comparator(this.heap[rightChildIndex], this.heap[swapIndex])
      ) {
        swapIndex = rightChildIndex;
      }

      if (swapIndex === index) break;

      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }

  // Get size - O(1)
  size() {
    return this.heap.length;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

## 🎯 Common Patterns

### 1. Top-K Elements

```javascript
// Find k largest elements using min-heap
function findKLargest(nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.insert(num);

    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }

  return minHeap.toArray().sort((a, b) => b - a);
}

// Find k smallest elements using max-heap
function findKSmallest(nums, k) {
  const maxHeap = new MaxHeap();

  for (const num of nums) {
    maxHeap.insert(num);

    if (maxHeap.size() > k) {
      maxHeap.extractMax();
    }
  }

  return maxHeap.toArray().sort((a, b) => a - b);
}
```

### 2. Heap Sort

```javascript
function heapSort(array) {
  const maxHeap = new MaxHeap();
  maxHeap.heapify(array);

  const result = [];
  while (!maxHeap.isEmpty()) {
    result.push(maxHeap.extractMax());
  }

  return result.reverse(); // For ascending order
}
```

### 3. Merge K Sorted Arrays

```javascript
function mergeKSortedArrays(arrays) {
  const minHeap = new MinHeap();
  const result = [];

  // Insert first element from each array
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      minHeap.enqueue(
        {
          value: arrays[i][0],
          arrayIndex: i,
          elementIndex: 0,
        },
        arrays[i][0]
      );
    }
  }

  while (!minHeap.isEmpty()) {
    const { value, arrayIndex, elementIndex } = minHeap.dequeue();
    result.push(value);

    // Insert next element from the same array
    const nextIndex = elementIndex + 1;
    if (nextIndex < arrays[arrayIndex].length) {
      const nextValue = arrays[arrayIndex][nextIndex];
      minHeap.enqueue(
        {
          value: nextValue,
          arrayIndex: arrayIndex,
          elementIndex: nextIndex,
        },
        nextValue
      );
    }
  }

  return result;
}
```

### 4. Sliding Window Maximum

```javascript
function maxSlidingWindow(nums, k) {
  if (k === 0) return [];

  const result = [];
  const maxHeap = new MaxHeap();

  for (let i = 0; i < nums.length; i++) {
    // Add current element with its index
    maxHeap.enqueue({ value: nums[i], index: i }, nums[i]);

    // Remove elements outside the window
    while (maxHeap.peek() && maxHeap.peek().index <= i - k) {
      maxHeap.dequeue();
    }

    // Add maximum to result when window is full
    if (i >= k - 1) {
      result.push(maxHeap.peek().value);
    }
  }

  return result;
}
```

## 🚀 Advanced Heap Operations

### 1. Delete Arbitrary Element

```javascript
class AdvancedHeap extends MaxHeap {
  // Delete element at specific index - O(log n)
  delete(index) {
    if (index >= this.heap.length) return false;

    // Replace with last element and bubble down
    this.heap[index] = this.heap.pop();
    this.bubbleDown(index);
    return true;
  }

  // Delete specific value - O(n + log n)
  deleteValue(value) {
    const index = this.heap.indexOf(value);
    if (index === -1) return false;

    return this.delete(index);
  }
}
```

### 2. Increase/Decrease Key

```javascript
class MutableHeap extends MaxHeap {
  // Increase value at index - O(log n)
  increaseKey(index, newValue) {
    if (index >= this.heap.length || newValue <= this.heap[index]) {
      return false;
    }

    this.heap[index] = newValue;
    this.bubbleUp(index);
    return true;
  }

  // Decrease value at index - O(log n)
  decreaseKey(index, newValue) {
    if (index >= this.heap.length || newValue >= this.heap[index]) {
      return false;
    }

    this.heap[index] = newValue;
    this.bubbleDown(index);
    return true;
  }
}
```

### 3. Find Median in Stream

```javascript
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // Lower half
    this.minHeap = new MinHeap(); // Upper half
  }

  // Add number - O(log n)
  addNum(num) {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }

    // Balance heaps
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.insert(this.maxHeap.extractMax());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.insert(this.minHeap.extractMin());
    }
  }

  // Find median - O(1)
  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    } else {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
  }
}
```

## 💡 Real-World Applications

### 1. Task Scheduler with Priority

```javascript
class TaskScheduler {
  constructor() {
    this.priorityQueue = new PriorityQueue();
    this.taskCounter = 0;
  }

  // Add task with priority - O(log n)
  addTask(taskName, priority, executionTime) {
    const task = {
      id: ++this.taskCounter,
      name: taskName,
      priority: priority,
      executionTime: executionTime,
      createdAt: Date.now(),
    };

    this.priorityQueue.enqueue(task, priority);
    console.log(`Added task: ${taskName} (priority: ${priority})`);
    return task.id;
  }

  // Execute highest priority task - O(log n)
  executeNextTask() {
    if (this.priorityQueue.isEmpty()) {
      console.log("No tasks to execute");
      return null;
    }

    const task = this.priorityQueue.dequeue();
    console.log(`Executing: ${task.name} (priority: ${task.priority})`);

    // Simulate task execution
    setTimeout(() => {
      console.log(`Completed: ${task.name}`);
    }, task.executionTime);

    return task;
  }

  // Get next task without executing - O(1)
  peekNextTask() {
    return this.priorityQueue.peek();
  }

  // Get scheduler status
  getStatus() {
    return {
      pendingTasks: this.priorityQueue.size(),
      nextTask: this.peekNextTask(),
    };
  }
}
```

### 2. Real-time Analytics Dashboard

```javascript
class AnalyticsDashboard {
  constructor(k = 10) {
    this.topKEvents = new MinHeap();
    this.k = k;
    this.totalEvents = 0;
  }

  // Add event - O(log k)
  addEvent(eventType, value) {
    this.totalEvents++;

    this.topKEvents.enqueue(
      {
        type: eventType,
        value: value,
        timestamp: Date.now(),
      },
      value
    );

    // Keep only top k events
    if (this.topKEvents.size() > this.k) {
      this.topKEvents.extractMin();
    }
  }

  // Get top k events - O(k log k)
  getTopEvents() {
    return this.topKEvents
      .toArray()
      .sort((a, b) => b.value - a.value)
      .map((event) => ({ type: event.type, value: event.value }));
  }

  // Get statistics
  getStats() {
    return {
      totalEvents: this.totalEvents,
      topKCount: this.topKEvents.size(),
      topEvents: this.getTopEvents(),
    };
  }
}
```

### 3. Network Traffic Management

```javascript
class NetworkTrafficManager {
  constructor() {
    this.packetQueue = new PriorityQueue(
      (a, b) =>
        a.priority > b.priority ||
        (a.priority === b.priority && a.timestamp < b.timestamp)
    );
  }

  // Add packet - O(log n)
  addPacket(data, priority, size) {
    const packet = {
      id: Math.random().toString(36).substr(2, 9),
      data: data,
      priority: priority,
      size: size,
      timestamp: Date.now(),
    };

    this.packetQueue.enqueue(packet, packet.priority);
    return packet.id;
  }

  // Process next packet - O(log n)
  processNextPacket() {
    if (this.packetQueue.isEmpty()) return null;

    const packet = this.packetQueue.dequeue();
    console.log(
      `Processing packet: ${packet.id} (priority: ${packet.priority})`
    );
    return packet;
  }

  // Get queue statistics
  getQueueStats() {
    const packets = this.packetQueue.heap;
    const totalSize = packets.reduce((sum, p) => sum + p.size, 0);

    return {
      queueSize: this.packetQueue.size(),
      totalSize: totalSize,
      priorityDistribution: this.getPriorityDistribution(),
    };
  }

  getPriorityDistribution() {
    const distribution = {};
    const packets = this.packetQueue.heap;

    for (const packet of packets) {
      distribution[packet.priority] = (distribution[packet.priority] || 0) + 1;
    }

    return distribution;
  }
}
```

## 💪 Practice Problems

### Easy

1. **Kth Largest Element in an Array** - Find kth largest using heap
2. **Find Median from Data Stream** - Median finder with two heaps
3. **Last Stone Weight** - Stone smashing simulation
4. **Relative Sort Array** - Sort based on another array
5. **Maximum Product of Two Numbers** - Find two largest numbers

### Medium

1. **Top K Frequent Elements** - Find most frequent elements
2. **K Closest Points to Origin** - Find k closest points
3. **Kth Largest Element in a Stream** - Dynamic kth largest
4. **Find K Pairs with Largest Sums** - Find k largest sum pairs
5. **Reorganize String** - Rearrange to avoid adjacent duplicates
6. **Sort Characters By Frequency** - Sort by character frequency

### Hard

1. **Find Median from Data Stream** - Efficient median finding
2. **Sliding Window Maximum** - Maximum in sliding windows
3. **Data Stream as Disjoint Intervals** - Interval management
4. **Consecutive Elements in an Array** - Find consecutive sequences
5. **The Skyline Problem** - Building skyline calculation

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveHeapProblem(problem) {
  // 1. Identify if heap is appropriate
  const heapIndicators = [
    "Need top-k elements",
    "Priority-based processing",
    "Frequent min/max operations",
    "Streaming data analysis",
    "Scheduling problems",
  ];

  // 2. Choose heap type
  const heapTypes = {
    maxHeap: "Need largest elements first",
    minHeap: "Need smallest elements first",
    priorityQueue: "Custom priority required",
    twoHeaps: "Median or balance problems",
  };

  // 3. Implement solution
  // 4. Optimize if needed
}
```

### Common Mistakes to Avoid

- ❌ Using wrong heap type (max vs min)
- ❌ Not handling empty heap case
- ❌ Forgetting to maintain heap property after modifications
- ❌ Using O(n log n) when O(n) heapify is possible
- ❌ Not considering space complexity for large datasets

### Communication Tips

- **Explain heap choice** and why it's optimal
- **Discuss time complexity** of heap operations
- **Handle edge cases** (empty heap, single element)
- **Show heap operations** step-by-step

## 📊 Heap vs Other Data Structures

| Operation        | Heap     | BST        | Array | Linked List |
| ---------------- | -------- | ---------- | ----- | ----------- |
| Find Min/Max     | O(1)     | O(log n)   | O(n)  | O(n)        |
| Insert           | O(log n) | O(log n)   | O(1)  | O(1)        |
| Delete Min/Max   | O(log n) | O(log n)   | O(n)  | O(n)        |
| Search           | O(n)     | O(log n)   | O(n)  | O(n)        |
| Build from Array | O(n)     | O(n log n) | O(1)  | O(n)        |

## 📖 Additional Resources

### Videos

- **Heap Data Structure - MIT 6.006**: Academic introduction
- **Priority Queue Implementation - TechLead**: Practical guide
- **Heap Sort - Khan Academy**: Sorting algorithm explanation

### Websites

- **Heap Visualizer**: Interactive heap operations
- **GeeksforGeeks Heaps**: Comprehensive tutorials
- **LeetCode Heap Problems**: Practice problems by difficulty

### Books

- **"Introduction to Algorithms"**: Heap chapters
- **"Data Structures and Algorithms in JavaScript"**: JS implementations

## 🎓 What You Need from Other Resources

### System Design

- **Message Queues**: Priority-based message processing
- **Load Balancers**: Weighted round-robin with heaps
- **Caching Systems**: LRU cache with heap optimization

### Algorithm Design

- **Graph Algorithms**: Dijkstra's, Prim's with priority queues
- **Greedy Algorithms**: Huffman coding, activity selection
- **Streaming Algorithms**: Real-time data processing

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Hash Tables** → `../Hash-Tables/README.md`

> 💡 **Key Insight**: Heaps teach you priority-based thinking - crucial for optimization, scheduling, and efficient data processing!

---

## 📊 Quick Reference

### Must-Know Heap Operations

```javascript
const essentialOperations = {
  insert: "Add element - O(log n)",
  extract: "Remove root - O(log n)",
  peek: "Look at root - O(1)",
  heapify: "Build from array - O(n)",
  size: "Get size - O(1)",
  isEmpty: "Check empty - O(1)",
};
```

### Common Heap Patterns

- **Top-K Elements**: Keep k best/worst elements
- **Priority Queue**: Custom priority processing
- **Two Heaps**: Balance problems (median, ranges)
- **Heap Sort**: Efficient sorting algorithm
- **Streaming**: Real-time top-k analysis

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Arrays, Trees, Big O Complexity_  
_Time Commitment: 1-2 weeks_
