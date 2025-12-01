# 🚶 Queues

> **FIFO Data Structure for Ordered Processing**

## 📋 Table of Contents

- [What are Queues?](#what-are-queues)
- [Queue Properties](#queue-properties)
- [Core Operations](#core-operations)
- [Implementation](#implementation)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Queues?

### Definition

A queue is a linear data structure that follows the **First-In-First-Out (FIFO)** principle. Elements are added at one end (rear) and removed from the other end (front).

### Real-World Analogy

```javascript
// Think of a queue of people:
// - People join at the back (enqueue)
// - People leave from the front (dequeue)
// - First person to join is first to leave

const peopleQueue = {
  enqueue: "Person joins the line",
  dequeue: "Person leaves from front",
  front: "Person at the front",
  rear: "Person at the back",
  isEmpty: "Check if line is empty",
};
```

### Why Queues Matter

- **Task Scheduling**: Managing tasks in order
- **Breadth-First Search**: Level-order traversal
- **Resource Management**: Printer queues, CPU scheduling
- **Message Processing**: Message queues in systems
- **Buffer Management**: Data flow control

## 🔍 Queue Properties

### Time Complexity Analysis

```javascript
const queueOperations = {
  enqueue: "O(1) - Add element to rear",
  dequeue: "O(1) - Remove element from front",
  front: "O(1) - Look at front element",
  rear: "O(1) - Look at rear element",
  isEmpty: "O(1) - Check if empty",
  size: "O(1) - Get current size",
  search: "O(n) - Search for element",
};
```

### Space Complexity

- **O(n)** - Space grows linearly with number of elements
- **Contiguous Memory**: Can be implemented with arrays or linked lists

### FIFO Principle

```javascript
// First In, First Out
const example = [];
example.push(1); // [1] - enqueue
example.push(2); // [1, 2] - enqueue
example.push(3); // [1, 2, 3] - enqueue
example.shift(); // Returns 1, queue is [2, 3] - dequeue
example.shift(); // Returns 2, queue is [3] - dequeue
```

## ⚡ Core Operations

### Basic Queue Implementation

```javascript
class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }

  // Add element to rear - O(1)
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
    return this;
  }

  // Remove element from front - O(1)
  dequeue() {
    if (this.isEmpty()) return undefined;

    const element = this.items[this.front];
    delete this.items[this.front];
    this.front++;

    // Reset if queue becomes empty
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return element;
  }

  // Look at front element - O(1)
  front() {
    return this.isEmpty() ? undefined : this.items[this.front];
  }

  // Look at rear element - O(1)
  rear() {
    return this.isEmpty() ? undefined : this.items[this.rear - 1];
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.front === this.rear;
  }

  // Get size - O(1)
  size() {
    return this.rear - this.front;
  }

  // Clear queue - O(1)
  clear() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
    return this;
  }

  // Convert to array - O(n)
  toArray() {
    return this.items.slice(this.front, this.rear);
  }

  // Print queue - O(n)
  print() {
    console.log(this.toArray().join(" <- "));
  }
}
```

### Linked List Queue Implementation

```javascript
class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // Add to rear - O(1)
  enqueue(value) {
    const newNode = new QueueNode(value);

    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
    return this;
  }

  // Remove from front - O(1)
  dequeue() {
    if (this.isEmpty()) return undefined;

    const removed = this.front;
    this.front = this.front.next;

    if (!this.front) {
      this.rear = null;
    }

    this.size--;
    return removed.value;
  }

  // Look at front - O(1)
  peek() {
    return this.isEmpty() ? undefined : this.front.value;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.front;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }
}
```

## 🎯 Common Patterns

### 1. Circular Queue

```javascript
class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity);
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }

  enqueue(value) {
    if (this.isFull()) return false;

    if (this.front === -1) {
      this.front = 0;
    }

    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = value;
    this.size++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const value = this.queue[this.front];

    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }

    this.size--;
    return value;
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

### 2. Deque (Double-Ended Queue)

```javascript
class Deque {
  constructor() {
    this.items = [];
  }

  // Add to front - O(1)
  addFront(element) {
    this.items.unshift(element);
    return this;
  }

  // Add to rear - O(1)
  addRear(element) {
    this.items.push(element);
    return this;
  }

  // Remove from front - O(1)
  removeFront() {
    return this.items.shift();
  }

  // Remove from rear - O(1)
  removeRear() {
    return this.items.pop();
  }

  // Look at front - O(1)
  peekFront() {
    return this.items[0];
  }

  // Look at rear - O(1)
  peekRear() {
    return this.items[this.items.length - 1];
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size - O(1)
  size() {
    return this.items.length;
  }
}
```

### 3. Priority Queue

```javascript
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Add element with priority - O(log n)
  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this.bubbleUp(this.heap.length - 1);
    return this;
  }

  // Remove highest priority element - O(log n)
  dequeue() {
    if (this.isEmpty()) return undefined;

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
    return this.isEmpty() ? undefined : this.heap[0].element;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex].priority >= this.heap[index].priority) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = null;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].priority > this.heap[index].priority
      ) {
        swapIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].priority >
          (swapIndex
            ? this.heap[swapIndex].priority
            : this.heap[index].priority)
      ) {
        swapIndex = rightChildIndex;
      }

      if (!swapIndex) break;

      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}
```

### 4. BFS Traversal using Queue

```javascript
function bfsTraversal(root) {
  if (!root) return [];

  const result = [];
  const queue = new Queue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    result.push(node.value);

    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }

  return result;
}
```

## 🚀 Advanced Applications

### 1. Level Order Tree Traversal

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = new Queue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const levelSize = queue.size();
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.dequeue();
      currentLevel.push(node.value);

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

### 2. Implement Stack using Queues

```javascript
class MyStack {
  constructor() {
    this.queue1 = new Queue();
    this.queue2 = new Queue();
  }

  push(x) {
    this.queue1.enqueue(x);
  }

  pop() {
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue());
    }

    const popped = this.queue1.dequeue();

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return popped;
  }

  top() {
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue());
    }

    const top = this.queue1.peek();
    this.queue2.enqueue(this.queue1.dequeue());

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return top;
  }

  empty() {
    return this.queue1.isEmpty();
  }
}
```

### 3. Sliding Window Maximum

```javascript
function maxSlidingWindow(nums, k) {
  if (k === 0) return [];

  const result = [];
  const deque = new Deque();

  for (let i = 0; i < nums.length; i++) {
    // Remove elements out of current window
    while (!deque.isEmpty() && deque.peekFront() <= i - k) {
      deque.removeFront();
    }

    // Remove elements smaller than current element
    while (!deque.isEmpty() && nums[deque.peekRear()] < nums[i]) {
      deque.removeRear();
    }

    deque.addRear(i);

    // Add maximum to result when window is full
    if (i >= k - 1) {
      result.push(nums[deque.peekFront()]);
    }
  }

  return result;
}
```

### 4. Task Scheduler

```javascript
function leastInterval(tasks, n) {
  const frequency = new Map();

  for (const task of tasks) {
    frequency.set(task, (frequency.get(task) || 0) + 1);
  }

  const maxHeap = new PriorityQueue();
  for (const [task, freq] of frequency) {
    maxHeap.enqueue(task, freq);
  }

  let time = 0;
  const waitQueue = new Queue();

  while (!maxHeap.isEmpty() || !waitQueue.isEmpty()) {
    time++;

    if (!maxHeap.isEmpty()) {
      const { element: task, priority: freq } = maxHeap.heap[0];
      maxHeap.dequeue();

      if (freq > 1) {
        waitQueue.enqueue({ task, freq: freq - 1, availableAt: time + n });
      }
    }

    // Check if any task is ready to be processed
    if (!waitQueue.isEmpty() && waitQueue.peek().availableAt === time) {
      const { task, freq } = waitQueue.dequeue();
      maxHeap.enqueue(task, freq);
    }
  }

  return time;
}
```

## 💡 Real-World Applications

### 1. Printer Queue Simulation

```javascript
class PrinterQueue {
  constructor() {
    this.queue = new PriorityQueue();
    this.currentJob = null;
  }

  addJob(jobName, priority) {
    this.queue.enqueue(jobName, priority);
    console.log(`Added job: ${jobName} (priority: ${priority})`);
  }

  processNextJob() {
    if (this.currentJob) {
      console.log(`Completed job: ${this.currentJob}`);
      this.currentJob = null;
    }

    if (!this.queue.isEmpty()) {
      this.currentJob = this.queue.dequeue();
      console.log(`Processing job: ${this.currentJob}`);
    } else {
      console.log("No jobs in queue");
    }
  }

  getQueueStatus() {
    return {
      currentJob: this.currentJob,
      pendingJobs: this.queue.size(),
      queue: this.queue.heap.map((item) => item.element),
    };
  }
}
```

### 2. Customer Service System

```javascript
class CustomerService {
  constructor() {
    this.regularQueue = new Queue();
    this.vipQueue = new Queue();
    this.currentCustomer = null;
  }

  addCustomer(customer, isVIP = false) {
    if (isVIP) {
      this.vipQueue.enqueue(customer);
      console.log(`VIP customer ${customer} added to queue`);
    } else {
      this.regularQueue.enqueue(customer);
      console.log(`Customer ${customer} added to queue`);
    }
  }

  serveNextCustomer() {
    if (this.currentCustomer) {
      console.log(`Finished serving ${this.currentCustomer}`);
      this.currentCustomer = null;
    }

    // Serve VIP customers first
    if (!this.vipQueue.isEmpty()) {
      this.currentCustomer = this.vipQueue.dequeue();
    } else if (!this.regularQueue.isEmpty()) {
      this.currentCustomer = this.regularQueue.dequeue();
    } else {
      console.log("No customers in queue");
      return;
    }

    console.log(`Now serving ${this.currentCustomer}`);
  }

  getQueueStatus() {
    return {
      currentCustomer: this.currentCustomer,
      vipWaiting: this.vipQueue.size(),
      regularWaiting: this.regularQueue.size(),
    };
  }
}
```

### 3. Message Queue System

```javascript
class MessageQueue {
  constructor() {
    this.queues = new Map();
    this.subscribers = new Map();
  }

  createQueue(queueName) {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, new Queue());
      this.subscribers.set(queueName, []);
    }
  }

  publish(queueName, message) {
    const queue = this.queues.get(queueName);
    if (queue) {
      queue.enqueue(message);
      this.notifySubscribers(queueName, message);
    }
  }

  subscribe(queueName, callback) {
    const subscribers = this.subscribers.get(queueName);
    if (subscribers) {
      subscribers.push(callback);
    }
  }

  consume(queueName) {
    const queue = this.queues.get(queueName);
    return queue ? queue.dequeue() : undefined;
  }

  notifySubscribers(queueName, message) {
    const subscribers = this.subscribers.get(queueName) || [];
    subscribers.forEach((callback) => callback(message));
  }

  getQueueSize(queueName) {
    const queue = this.queues.get(queueName);
    return queue ? queue.size() : 0;
  }
}
```

## 💪 Practice Problems

### Easy

1. **Implement Queue using Stacks** - Queue with stack operations
2. **Number of Recent Calls** - Count recent requests
3. **Time Needed to Buy Tickets** - Calculate time for tickets
4. **Implement Circular Queue** - Fixed-size circular queue

### Medium

1. **Binary Tree Level Order Traversal** - BFS traversal
2. **Find Bottom Left Tree Value** - Bottom-left node value
3. **Open the Lock** - Deadend problem with BFS
4. **Maximum Depth of Binary Tree** - Tree depth using queue
5. **Average of Levels in Binary Tree** - Level averages
6. **Minimum Depth of Binary Tree** - Minimum tree depth

### Hard

1. **Task Scheduler** - CPU task scheduling
2. **Design Bounded Blocking Queue** - Thread-safe queue
3. **Design Hit Counter** - Hit counter with sliding window
4. **Design Snake Game** - Snake game with queue
5. **Design File System** - File system with queue

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveQueueProblem(problem) {
  // 1. Identify if queue is appropriate
  const queueIndicators = [
    "FIFO behavior needed",
    "Level-order traversal",
    "Breadth-first search",
    "Task scheduling",
    "Resource management",
  ];

  // 2. Choose queue type
  const queueTypes = {
    basic: "Simple queue operations",
    circular: "Fixed-size circular buffer",
    priority: "Priority-based processing",
    deque: "Double-ended operations",
  };

  // 3. Implement solution
  // 4. Handle edge cases
  // 5. Optimize if needed
}
```

### Common Mistakes to Avoid

- ❌ Not handling empty queue case
- ❌ Forgetting to check queue bounds
- ❌ Using wrong data structure for the problem
- ❌ Not considering time complexity of operations
- ❌ Not handling circular queue wrap-around

### Communication Tips

- **Explain why queue is appropriate** for the problem
- **Discuss queue operations** and their complexity
- **Handle edge cases** explicitly
- **Show step-by-step** queue manipulation

## 📊 Queue vs Other Data Structures

| Operation     | Queue | Stack | Array | Linked List |
| ------------- | ----- | ----- | ----- | ----------- |
| Add End       | O(1)  | O(1)  | O(1)  | O(1)        |
| Remove End    | O(n)  | O(1)  | O(1)  | O(1)        |
| Add Start     | O(1)  | O(1)  | O(n)  | O(1)        |
| Remove Start  | O(1)  | O(1)  | O(n)  | O(1)        |
| Access Middle | O(n)  | O(n)  | O(1)  | O(n)        |
| Search        | O(n)  | O(n)  | O(n)  | O(n)        |

## 📖 Additional Resources

### Videos

- **Queue Data Structure - CS50**: Harvard introduction
- **BFS with Queue - NeetCode**: Graph traversal explanation
- **Priority Queue - TechLead**: Real-world applications

### Websites

- **Queue Visualizer**: Interactive queue operations
- **GeeksforGeeks Queues**: Comprehensive tutorials
- **LeetCode Queue Problems**: Practice problems by difficulty

### Books

- **"Data Structures and Algorithms"**: Queue chapter
- **"Cracking the Coding Interview"**: Queue interview questions

## 🎓 What You Need from Other Resources

### System Design

- **Message Queues**: RabbitMQ, Apache Kafka
- **Task Queues**: Celery, Redis Queue
- **Load Balancers**: Round-robin queuing

### Algorithm Design

- **BFS Algorithms**: Graph and tree traversal
- **Level-based Processing**: Multi-level algorithms
- **Resource Allocation**: CPU and memory management

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Trees** → `../Trees/README.md`

> 💡 **Key Insight**: Queues teach you FIFO thinking - crucial for BFS, task scheduling, and resource management!

---

## 📊 Quick Reference

### Must-Know Queue Operations

```javascript
const essentialOperations = {
  enqueue: "Add element to rear - O(1)",
  dequeue: "Remove from front - O(1)",
  front: "Look at front element - O(1)",
  isEmpty: "Check if empty - O(1)",
  size: "Get current size - O(1)",
};
```

### Common Queue Patterns

- **BFS Traversal**: Level-order tree/graph traversal
- **Sliding Window**: Window-based processing
- **Task Scheduling**: Ordered task execution
- **Resource Management**: Fair resource allocation
- **Message Processing**: Ordered message handling

---

_Last Updated: December 2025_  
_Difficulty: Beginner to Intermediate_  
_Prerequisites: Arrays, Big O Complexity_  
_Time Commitment: 1 week_
