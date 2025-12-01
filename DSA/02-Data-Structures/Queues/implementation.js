// 🚶 Queues Implementation
// Complete implementations of all queue types and operations

// ==========================================
// BASIC QUEUE IMPLEMENTATION
// ==========================================

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

  // Clone queue - O(n)
  clone() {
    const newQueue = new Queue();
    newQueue.items = [...this.items];
    newQueue.front = this.front;
    newQueue.rear = this.rear;
    return newQueue;
  }
}

// ==========================================
// LINKED LIST QUEUE IMPLEMENTATION
// ==========================================

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

  // Clear queue - O(1)
  clear() {
    this.front = null;
    this.rear = null;
    this.size = 0;
    return this;
  }
}

// ==========================================
// CIRCULAR QUEUE IMPLEMENTATION
// ==========================================

class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity);
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }

  // Add element - O(1)
  enqueue(value) {
    if (this.isFull()) {
      console.log("Queue is full");
      return false;
    }

    if (this.front === -1) {
      this.front = 0;
    }

    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = value;
    this.size++;
    return true;
  }

  // Remove element - O(1)
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

  // Look at front element - O(1)
  peek() {
    return this.isEmpty() ? undefined : this.queue[this.front];
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Check if full - O(1)
  isFull() {
    return this.size === this.capacity;
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let index = this.front;

    for (let i = 0; i < this.size; i++) {
      result.push(this.queue[index]);
      index = (index + 1) % this.capacity;
    }

    return result;
  }
}

// ==========================================
// DEQUE (DOUBLE-ENDED QUEUE) IMPLEMENTATION
// ==========================================

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

  // Convert to array - O(1)
  toArray() {
    return [...this.items];
  }

  // Clear deque - O(1)
  clear() {
    this.items = [];
    return this;
  }
}

// ==========================================
// PRIORITY QUEUE IMPLEMENTATION
// ==========================================

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

  // Check if empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // Get size - O(1)
  size() {
    return this.heap.length;
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
      let swapIndex = null;

      if (
        leftChildIndex < length &&
        this.comparator(this.heap[leftChildIndex], this.heap[index])
      ) {
        swapIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.comparator(
          this.heap[rightChildIndex],
          this.heap[swapIndex || index]
        )
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

  // Convert to array - O(n)
  toArray() {
    return this.heap.map((item) => item.element);
  }
}

// ==========================================
// QUEUE UTILITIES
// ==========================================

class QueueUtils {
  // Implement Queue using Stacks
  static createQueueFromStacks() {
    return new QueueFromStacks();
  }

  // Generate binary numbers using queue
  static generateBinaryNumbers(n) {
    const result = [];
    const queue = new Queue();

    queue.enqueue("1");

    for (let i = 0; i < n; i++) {
      const current = queue.dequeue();
      result.push(current);

      queue.enqueue(current + "0");
      queue.enqueue(current + "1");
    }

    return result;
  }

  // Find first non-repeating character in stream
  static firstNonRepeating(stream) {
    const queue = new Queue();
    const frequency = new Map();
    const result = [];

    for (const char of stream) {
      frequency.set(char, (frequency.get(char) || 0) + 1);

      if (frequency.get(char) === 1) {
        queue.enqueue(char);
      }

      while (!queue.isEmpty() && frequency.get(queue.front()) > 1) {
        queue.dequeue();
      }

      result.push(queue.isEmpty() ? "#" : queue.front());
    }

    return result;
  }

  // Reverse first k elements of queue
  static reverseFirstK(queue, k) {
    if (k > queue.size() || k <= 0) return queue;

    const stack = [];

    // Remove first k elements and push to stack
    for (let i = 0; i < k; i++) {
      stack.push(queue.dequeue());
    }

    // Put back elements from stack (reversed)
    while (stack.length > 0) {
      queue.enqueue(stack.pop());
    }

    // Move remaining elements to rear
    for (let i = 0; i < queue.size() - k; i++) {
      queue.enqueue(queue.dequeue());
    }

    return queue;
  }

  // Interleave first and second half of queue
  static interleaveQueue(queue) {
    const size = queue.size();
    const stack = [];

    // Push first half to stack
    for (let i = 0; i < Math.floor(size / 2); i++) {
      stack.push(queue.dequeue());
    }

    // Enqueue back from stack
    while (stack.length > 0) {
      queue.enqueue(stack.pop());
    }

    // Dequeue first half and enqueue back
    for (let i = 0; i < Math.floor(size / 2); i++) {
      queue.enqueue(queue.dequeue());
    }

    // Push first half to stack again
    for (let i = 0; i < Math.floor(size / 2); i++) {
      stack.push(queue.dequeue());
    }

    // Interleave
    while (stack.length > 0) {
      queue.enqueue(stack.pop());
      queue.enqueue(queue.dequeue());
    }

    return queue;
  }

  // Find maximum in sliding window
  static maxSlidingWindow(nums, k) {
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

  // BFS traversal for binary tree
  static bfsTraversal(root) {
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

  // Level order traversal with levels
  static levelOrder(root) {
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
}

// ==========================================
// QUEUE FROM STACKS IMPLEMENTATION
// ==========================================

class QueueFromStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  // Enqueue - O(1) amortized
  enqueue(x) {
    this.stack1.push(x);
    return this;
  }

  // Dequeue - O(1) amortized
  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2.length === 0 ? undefined : this.stack2.pop();
  }

  // Peek - O(1) amortized
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2.length === 0
      ? undefined
      : this.stack2[this.stack2.length - 1];
  }

  // Check if empty - O(1)
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }

  // Get size - O(1)
  size() {
    return this.stack1.length + this.stack2.length;
  }
}

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

// Printer Queue System
class PrinterQueue {
  constructor() {
    this.queue = new PriorityQueue((a, b) => a.priority > b.priority);
    this.currentJob = null;
    this.jobCounter = 0;
  }

  addJob(jobName, priority = 1) {
    const job = {
      id: ++this.jobCounter,
      name: jobName,
      priority: priority,
      timestamp: Date.now(),
    };

    this.queue.enqueue(job, priority);
    console.log(`Added job: ${jobName} (ID: ${job.id}, priority: ${priority})`);
    return job.id;
  }

  processNextJob() {
    if (this.currentJob) {
      console.log(
        `Completed job: ${this.currentJob.name} (ID: ${this.currentJob.id})`
      );
      this.currentJob = null;
    }

    if (!this.queue.isEmpty()) {
      this.currentJob = this.queue.dequeue();
      console.log(
        `Processing job: ${this.currentJob.name} (ID: ${this.currentJob.id})`
      );
      return this.currentJob;
    } else {
      console.log("No jobs in queue");
      return null;
    }
  }

  getQueueStatus() {
    return {
      currentJob: this.currentJob,
      pendingJobs: this.queue.size(),
      queue: this.queue.heap.map((item) => item.element),
    };
  }

  cancelJob(jobId) {
    // Implementation would need to support removal from priority queue
    console.log(`Cancel job ${jobId} (not implemented in this demo)`);
  }
}

// Customer Service System
class CustomerService {
  constructor() {
    this.regularQueue = new Queue();
    this.vipQueue = new Queue();
    this.currentCustomer = null;
    this.customerCounter = 0;
  }

  addCustomer(customerName, isVIP = false) {
    const customer = {
      id: ++this.customerCounter,
      name: customerName,
      isVIP: isVIP,
      arrivalTime: Date.now(),
    };

    if (isVIP) {
      this.vipQueue.enqueue(customer);
      console.log(
        `VIP customer ${customerName} (ID: ${customer.id}) added to queue`
      );
    } else {
      this.regularQueue.enqueue(customer);
      console.log(
        `Customer ${customerName} (ID: ${customer.id}) added to queue`
      );
    }

    return customer.id;
  }

  serveNextCustomer() {
    if (this.currentCustomer) {
      const waitTime = Date.now() - this.currentCustomer.arrivalTime;
      console.log(
        `Finished serving ${this.currentCustomer.name} (wait time: ${waitTime}ms)`
      );
      this.currentCustomer = null;
    }

    // Serve VIP customers first
    if (!this.vipQueue.isEmpty()) {
      this.currentCustomer = this.vipQueue.dequeue();
    } else if (!this.regularQueue.isEmpty()) {
      this.currentCustomer = this.regularQueue.dequeue();
    } else {
      console.log("No customers in queue");
      return null;
    }

    const waitTime = Date.now() - this.currentCustomer.arrivalTime;
    console.log(
      `Now serving ${this.currentCustomer.name} (wait time: ${waitTime}ms)`
    );
    return this.currentCustomer;
  }

  getQueueStatus() {
    return {
      currentCustomer: this.currentCustomer,
      vipWaiting: this.vipQueue.size(),
      regularWaiting: this.regularQueue.size(),
      totalWaiting: this.vipQueue.size() + this.regularQueue.size(),
    };
  }
}

// Message Queue System
class MessageQueue {
  constructor() {
    this.queues = new Map();
    this.subscribers = new Map();
    this.messageCounter = 0;
  }

  createQueue(queueName) {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, new Queue());
      this.subscribers.set(queueName, []);
      console.log(`Created queue: ${queueName}`);
    }
  }

  publish(queueName, message) {
    const queue = this.queues.get(queueName);
    if (!queue) {
      console.log(`Queue ${queueName} does not exist`);
      return false;
    }

    const messageObj = {
      id: ++this.messageCounter,
      content: message,
      timestamp: Date.now(),
      queue: queueName,
    };

    queue.enqueue(messageObj);
    this.notifySubscribers(queueName, messageObj);

    console.log(`Published to ${queueName}: ${JSON.stringify(message)}`);
    return messageObj.id;
  }

  subscribe(queueName, callback) {
    const subscribers = this.subscribers.get(queueName);
    if (subscribers) {
      subscribers.push(callback);
      console.log(`Subscribed to queue: ${queueName}`);
    }
  }

  consume(queueName) {
    const queue = this.queues.get(queueName);
    if (!queue || queue.isEmpty()) {
      return undefined;
    }

    const message = queue.dequeue();
    console.log(
      `Consumed from ${queueName}: ${JSON.stringify(message.content)}`
    );
    return message;
  }

  notifySubscribers(queueName, message) {
    const subscribers = this.subscribers.get(queueName) || [];
    subscribers.forEach((callback) => {
      try {
        callback(message);
      } catch (error) {
        console.error(`Subscriber error: ${error.message}`);
      }
    });
  }

  getQueueStats() {
    const stats = {};
    for (const [name, queue] of this.queues) {
      stats[name] = {
        size: queue.size(),
        subscribers: this.subscribers.get(name).length,
      };
    }
    return stats;
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Queue Implementation Tests...\n");

  // Test Basic Queue
  console.log("🚶 Testing Basic Queue:");
  const queue = new Queue();

  queue.enqueue(1).enqueue(2).enqueue(3);
  console.log("After enqueues:", queue.toArray());
  console.log("Front:", queue.front());
  console.log("Rear:", queue.rear());
  console.log("Dequeue:", queue.dequeue());
  console.log("After dequeue:", queue.toArray());
  console.log("Size:", queue.size());
  console.log("Is empty:", queue.isEmpty());

  // Test Circular Queue
  console.log("\n🔄 Testing Circular Queue:");
  const circularQueue = new CircularQueue(3);
  circularQueue.enqueue(1).enqueue(2).enqueue(3);
  console.log("After enqueues:", circularQueue.toArray());
  console.log("Is full:", circularQueue.isFull());
  console.log("Dequeue:", circularQueue.dequeue());
  circularQueue.enqueue(4);
  console.log("After enqueue 4:", circularQueue.toArray());

  // Test Priority Queue
  console.log("\n📊 Testing Priority Queue:");
  const pq = new PriorityQueue();
  pq.enqueue("Low", 1).enqueue("High", 3).enqueue("Medium", 2);
  console.log("Priority queue elements:");
  while (!pq.isEmpty()) {
    console.log("Dequeue:", pq.dequeue());
  }

  // Test Deque
  console.log("\n🔄 Testing Deque:");
  const deque = new Deque();
  deque.addFront(2).addFront(1).addRear(3).addRear(4);
  console.log("Deque:", deque.toArray());
  console.log("Remove front:", deque.removeFront());
  console.log("Remove rear:", deque.removeRear());
  console.log("After removals:", deque.toArray());

  // Test Queue Utilities
  console.log("\n🔧 Testing Queue Utilities:");
  console.log("Binary numbers:", QueueUtils.generateBinaryNumbers(5));
  console.log("First non-repeating:", QueueUtils.firstNonRepeating("aabc"));

  const testQueue = new Queue();
  testQueue.enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5);
  console.log("Original queue:", testQueue.toArray());
  QueueUtils.reverseFirstK(testQueue, 3);
  console.log("After reversing first 3:", testQueue.toArray());

  // Test Printer Queue
  console.log("\n🖨️ Testing Printer Queue:");
  const printer = new PrinterQueue();
  printer.addJob("Document1", 2);
  printer.addJob("Document2", 1);
  printer.addJob("Document3", 3);
  printer.processNextJob();
  printer.processNextJob();
  console.log("Printer status:", printer.getQueueStatus());

  // Test Customer Service
  console.log("\n🏢 Testing Customer Service:");
  const service = new CustomerService();
  service.addCustomer("Alice", false);
  service.addCustomer("Bob", true);
  service.addCustomer("Charlie", false);
  service.serveNextCustomer();
  service.serveNextCustomer();
  console.log("Service status:", service.getQueueStatus());

  // Test Message Queue
  console.log("\n📨 Testing Message Queue:");
  const messageQueue = new MessageQueue();
  messageQueue.createQueue("notifications");
  messageQueue.subscribe("notifications", (msg) => {
    console.log(`Notification received: ${msg.content}`);
  });
  messageQueue.publish("notifications", "Welcome!");
  messageQueue.publish("notifications", "Update available");
  messageQueue.consume("notifications");
  console.log("Message queue stats:", messageQueue.getQueueStats());

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  Queue,
  LinkedListQueue,
  CircularQueue,
  Deque,
  PriorityQueue,
  QueueUtils,
  QueueFromStacks,
  PrinterQueue,
  CustomerService,
  MessageQueue,
};
