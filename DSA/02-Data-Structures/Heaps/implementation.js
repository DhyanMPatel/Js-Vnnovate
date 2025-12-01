// ⛰️ Heaps & Priority Queues Implementation
// Complete implementations of all heap types and operations

// ==========================================
// MAX HEAP IMPLEMENTATION
// ==========================================

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

  // Clone heap - O(n)
  clone() {
    const newHeap = new MaxHeap();
    newHeap.heap = [...this.heap];
    return newHeap;
  }
}

// ==========================================
// MIN HEAP IMPLEMENTATION
// ==========================================

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

  // Convert to array - O(1)
  toArray() {
    return [...this.heap];
  }

  // Clear heap - O(1)
  clear() {
    this.heap = [];
    return this;
  }

  // Clone heap - O(n)
  clone() {
    const newHeap = new MinHeap();
    newHeap.heap = [...this.heap];
    return newHeap;
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

  // Clear queue - O(1)
  clear() {
    this.heap = [];
    return this;
  }

  // Convert to array - O(n)
  toArray() {
    return this.heap.map((item) => item.element);
  }
}

// ==========================================
// ADVANCED HEAP IMPLEMENTATIONS
// ==========================================

// Heap with delete operation
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

  // Update value at index - O(log n)
  updateValue(index, newValue) {
    if (index >= this.heap.length) return false;

    const oldValue = this.heap[index];
    this.heap[index] = newValue;

    if (newValue > oldValue) {
      this.bubbleUp(index);
    } else {
      this.bubbleDown(index);
    }

    return true;
  }
}

// Mutable heap with key operations
class MutableHeap extends MaxHeap {
  constructor() {
    super();
    this.valueToIndex = new Map();
  }

  // Insert element with index tracking - O(log n)
  insert(value) {
    const index = this.heap.length;
    this.heap.push(value);
    this.valueToIndex.set(value, index);
    this.bubbleUp(index);
    return this;
  }

  // Delete value efficiently - O(log n)
  deleteValue(value) {
    const index = this.valueToIndex.get(value);
    if (index === undefined) return false;

    this.valueToIndex.delete(value);

    if (index === this.heap.length - 1) {
      this.heap.pop();
    } else {
      const lastValue = this.heap.pop();
      this.heap[index] = lastValue;
      this.valueToIndex.set(lastValue, index);
      this.bubbleDown(index);
    }

    return true;
  }

  // Update value - O(log n)
  updateValue(oldValue, newValue) {
    const index = this.valueToIndex.get(oldValue);
    if (index === undefined) return false;

    this.valueToIndex.delete(oldValue);
    this.heap[index] = newValue;
    this.valueToIndex.set(newValue, index);

    if (newValue > oldValue) {
      this.bubbleUp(index);
    } else {
      this.bubbleDown(index);
    }

    return true;
  }

  // Override bubble operations to update map
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParent(index);

      if (this.heap[parentIndex] >= this.heap[index]) break;

      // Update map entries
      this.valueToIndex.set(this.heap[index], parentIndex);
      this.valueToIndex.set(this.heap[parentIndex], index);

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

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

      // Update map entries
      this.valueToIndex.set(this.heap[index], swapIndex);
      this.valueToIndex.set(this.heap[swapIndex], index);

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }
}

// ==========================================
// SPECIALIZED HEAP APPLICATIONS
// ==========================================

// Median finder using two heaps
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

  // Get statistics
  getStats() {
    return {
      lowerHalf: this.maxHeap.toArray().sort((a, b) => b - a),
      upperHalf: this.minHeap.toArray().sort((a, b) => a - b),
      median: this.findMedian(),
      totalSize: this.maxHeap.size() + this.minHeap.size(),
    };
  }

  // Clear all data - O(1)
  clear() {
    this.maxHeap.clear();
    this.minHeap.clear();
  }
}

// Kth largest elements finder
class KthLargest {
  constructor(k) {
    this.k = k;
    this.minHeap = new MinHeap();
  }

  // Add number and maintain k largest - O(log k)
  add(num) {
    this.minHeap.insert(num);

    if (this.minHeap.size() > this.k) {
      this.minHeap.extractMin();
    }

    return this;
  }

  // Get kth largest - O(1)
  getKthLargest() {
    return this.minHeap.size() < this.k ? null : this.minHeap.peek();
  }

  // Get all k largest elements - O(k log k)
  getKLargest() {
    return this.minHeap.toArray().sort((a, b) => b - a);
  }

  // Update k value - O(n)
  updateK(newK) {
    this.k = newK;

    // Remove excess elements if k decreased
    while (this.minHeap.size() > this.k) {
      this.minHeap.extractMin();
    }

    return this;
  }
}

// Sliding window maximum
class SlidingWindowMaximum {
  constructor() {
    this.maxHeap = new PriorityQueue(
      (a, b) => a.value > b.value || (a.value === b.value && a.index > b.index)
    );
    this.windowSize = 0;
  }

  // Process sliding window - O(n log k)
  maxSlidingWindow(nums, k) {
    if (k === 0) return [];

    this.windowSize = k;
    const result = [];

    for (let i = 0; i < nums.length; i++) {
      // Add current element
      this.maxHeap.enqueue({ value: nums[i], index: i }, nums[i]);

      // Remove elements outside the window
      while (this.maxHeap.peek() && this.maxHeap.peek().index <= i - k) {
        this.maxHeap.dequeue();
      }

      // Add maximum to result when window is full
      if (i >= k - 1) {
        result.push(this.maxHeap.peek().value);
      }
    }

    return result;
  }

  // Clear heap - O(1)
  clear() {
    this.maxHeap.clear();
  }
}

// ==========================================
// HEAP UTILITIES
// ==========================================

class HeapUtils {
  // Heap sort - O(n log n)
  static heapSort(array, ascending = true) {
    const heap = ascending ? new MinHeap() : new MaxHeap();
    heap.heapify(array);

    const result = [];
    while (!heap.isEmpty()) {
      result.push(ascending ? heap.extractMin() : heap.extractMax());
    }

    return result;
  }

  // Find k largest elements - O(n log k)
  static findKLargest(nums, k) {
    const minHeap = new MinHeap();

    for (const num of nums) {
      minHeap.insert(num);

      if (minHeap.size() > k) {
        minHeap.extractMin();
      }
    }

    return minHeap.toArray().sort((a, b) => b - a);
  }

  // Find k smallest elements - O(n log k)
  static findKSmallest(nums, k) {
    const maxHeap = new MaxHeap();

    for (const num of nums) {
      maxHeap.insert(num);

      if (maxHeap.size() > k) {
        maxHeap.extractMax();
      }
    }

    return maxHeap.toArray().sort((a, b) => a - b);
  }

  // Merge k sorted arrays - O(n log k)
  static mergeKSortedArrays(arrays) {
    const minHeap = new PriorityQueue(
      (a, b) =>
        a.value < b.value ||
        (a.value === b.value && a.arrayIndex < b.arrayIndex)
    );
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

  // Check if array is a valid heap - O(n)
  static isMaxHeap(array) {
    for (let i = 0; i < array.length; i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < array.length && array[i] < array[leftChild]) {
        return false;
      }

      if (rightChild < array.length && array[i] < array[rightChild]) {
        return false;
      }
    }

    return true;
  }

  static isMinHeap(array) {
    for (let i = 0; i < array.length; i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < array.length && array[i] > array[leftChild]) {
        return false;
      }

      if (rightChild < array.length && array[i] > array[rightChild]) {
        return false;
      }
    }

    return true;
  }

  // Convert array to heap in-place - O(1) extra space
  static heapifyInPlace(array, isMaxHeap = true) {
    const n = array.length;

    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.siftDown(array, i, n, isMaxHeap);
    }

    return array;
  }

  static siftDown(array, i, n, isMaxHeap) {
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let swapIndex = i;

      if (left < n) {
        if (isMaxHeap) {
          if (array[left] > array[swapIndex]) swapIndex = left;
        } else {
          if (array[left] < array[swapIndex]) swapIndex = left;
        }
      }

      if (right < n) {
        if (isMaxHeap) {
          if (array[right] > array[swapIndex]) swapIndex = right;
        } else {
          if (array[right] < array[swapIndex]) swapIndex = right;
        }
      }

      if (swapIndex === i) break;

      [array[i], array[swapIndex]] = [array[swapIndex], array[i]];
      i = swapIndex;
    }
  }
}

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

// Task scheduler with priority queue
class TaskScheduler {
  constructor() {
    this.priorityQueue = new PriorityQueue();
    this.taskCounter = 0;
    this.completedTasks = [];
  }

  // Add task with priority - O(log n)
  addTask(taskName, priority, executionTime = 0) {
    const task = {
      id: ++this.taskCounter,
      name: taskName,
      priority: priority,
      executionTime: executionTime,
      createdAt: Date.now(),
    };

    this.priorityQueue.enqueue(task, task.priority);
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
      this.completedTasks.push({
        ...task,
        completedAt: Date.now(),
      });
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
      completedTasks: this.completedTasks.length,
      totalTasks: this.taskCounter,
    };
  }

  // Clear all tasks - O(1)
  clear() {
    this.priorityQueue.clear();
    this.completedTasks = [];
    console.log("All tasks cleared");
  }
}

// Real-time analytics dashboard
class AnalyticsDashboard {
  constructor(k = 10) {
    this.topKEvents = new MinHeap();
    this.k = k;
    this.totalEvents = 0;
    this.eventStats = new Map();
  }

  // Add event - O(log k)
  addEvent(eventType, value) {
    this.totalEvents++;

    // Update event statistics
    this.eventStats.set(
      eventType,
      (this.eventStats.get(eventType) || 0) + value
    );

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
      eventTypes: Array.from(this.eventStats.entries()).sort(
        (a, b) => b[1] - a[1]
      ),
    };
  }

  // Update k value - O(k)
  updateK(newK) {
    this.k = newK;

    // Remove excess elements if k decreased
    while (this.topKEvents.size() > this.k) {
      this.topKEvents.extractMin();
    }

    return this;
  }

  // Clear all data - O(1)
  clear() {
    this.topKEvents.clear();
    this.eventStats.clear();
    this.totalEvents = 0;
  }
}

// Network traffic manager
class NetworkTrafficManager {
  constructor() {
    this.packetQueue = new PriorityQueue(
      (a, b) =>
        a.priority > b.priority ||
        (a.priority === b.priority && a.timestamp < b.timestamp)
    );
    this.processedPackets = [];
    this.totalPackets = 0;
  }

  // Add packet - O(log n)
  addPacket(data, priority, size = 1) {
    const packet = {
      id: Math.random().toString(36).substr(2, 9),
      data: data,
      priority: priority,
      size: size,
      timestamp: Date.now(),
    };

    this.packetQueue.enqueue(packet, packet.priority);
    this.totalPackets++;
    return packet.id;
  }

  // Process next packet - O(log n)
  processNextPacket() {
    if (this.packetQueue.isEmpty()) return null;

    const packet = this.packetQueue.dequeue();
    this.processedPackets.push({
      ...packet,
      processedAt: Date.now(),
    });

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
      totalPackets: this.totalPackets,
      processedPackets: this.processedPackets.length,
      priorityDistribution: this.getPriorityDistribution(),
      averageWaitTime: this.getAverageWaitTime(),
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

  getAverageWaitTime() {
    if (this.processedPackets.length === 0) return 0;

    const totalWaitTime = this.processedPackets.reduce((sum, packet) => {
      return sum + (packet.processedAt - packet.timestamp);
    }, 0);

    return totalWaitTime / this.processedPackets.length;
  }

  // Clear queue - O(1)
  clear() {
    this.packetQueue.clear();
    this.processedPackets = [];
    this.totalPackets = 0;
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Heap Implementation Tests...\n");

  // Test Max Heap
  console.log("⛰️ Testing Max Heap:");
  const maxHeap = new MaxHeap();
  maxHeap.insert(3).insert(1).insert(5).insert(2).insert(4);
  console.log("Heap:", maxHeap.toArray());
  console.log("Peek:", maxHeap.peek());
  console.log("Extract max:", maxHeap.extractMax());
  console.log("After extraction:", maxHeap.toArray());
  console.log("Size:", maxHeap.size());

  // Test Min Heap
  console.log("\n📉 Testing Min Heap:");
  const minHeap = new MinHeap();
  minHeap.insert(3).insert(1).insert(5).insert(2).insert(4);
  console.log("Heap:", minHeap.toArray());
  console.log("Peek:", minHeap.peek());
  console.log("Extract min:", minHeap.extractMin());
  console.log("After extraction:", minHeap.toArray());

  // Test Priority Queue
  console.log("\n🎯 Testing Priority Queue:");
  const pq = new PriorityQueue();
  pq.enqueue("Task A", 3);
  pq.enqueue("Task B", 1);
  pq.enqueue("Task C", 2);
  console.log("Queue size:", pq.size());
  console.log("Next task:", pq.peek());
  console.log("Dequeue:", pq.dequeue());
  console.log("Next after dequeue:", pq.peek());

  // Test Heapify
  console.log("\n🔧 Testing Heapify:");
  const array = [3, 1, 5, 2, 4];
  const heap = new MaxHeap();
  heap.heapify(array);
  console.log("Original array:", array);
  console.log("Heapified:", heap.toArray());
  console.log("Is max heap:", HeapUtils.isMaxHeap(heap.toArray()));

  // Test Heap Sort
  console.log("\n📊 Testing Heap Sort:");
  const unsorted = [3, 1, 5, 2, 4, 6, 8, 7];
  console.log("Unsorted:", unsorted);
  console.log("Sorted ascending:", HeapUtils.heapSort(unsorted, true));
  console.log("Sorted descending:", HeapUtils.heapSort(unsorted, false));

  // Test K Largest Elements
  console.log("\n🏆 Testing K Largest Elements:");
  const numbers = [3, 1, 5, 2, 4, 6, 8, 7, 9, 0];
  console.log("Array:", numbers);
  console.log("3 largest:", HeapUtils.findKLargest(numbers, 3));
  console.log("3 smallest:", HeapUtils.findKSmallest(numbers, 3));

  // Test Median Finder
  console.log("\n📈 Testing Median Finder:");
  const medianFinder = new MedianFinder();
  medianFinder.addNum(1);
  medianFinder.addNum(2);
  console.log("Median after [1,2]:", medianFinder.findMedian());
  medianFinder.addNum(3);
  console.log("Median after [1,2,3]:", medianFinder.findMedian());
  medianFinder.addNum(4);
  console.log("Median after [1,2,3,4]:", medianFinder.findMedian());
  console.log("Stats:", medianFinder.getStats());

  // Test Kth Largest
  console.log("\n🎖️ Testing Kth Largest:");
  const kthLargest = new KthLargest(3);
  for (const num of [4, 5, 8, 2]) {
    kthLargest.add(num);
  }
  console.log("3rd largest after [4,5,8,2]:", kthLargest.getKthLargest());
  kthLargest.add(3);
  console.log("3rd largest after adding 3:", kthLargest.getKthLargest());
  console.log("All 3 largest:", kthLargest.getKLargest());

  // Test Sliding Window Maximum
  console.log("\n🪟 Testing Sliding Window Maximum:");
  const slidingMax = new SlidingWindowMaximum();
  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  console.log("Array:", nums);
  console.log("Sliding max (k=3):", slidingMax.maxSlidingWindow(nums, 3));

  // Test Merge K Sorted Arrays
  console.log("\n🔀 Testing Merge K Sorted Arrays:");
  const arrays = [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6],
  ];
  console.log("Arrays:", arrays);
  console.log("Merged:", HeapUtils.mergeKSortedArrays(arrays));

  // Test Task Scheduler
  console.log("\n📋 Testing Task Scheduler:");
  const scheduler = new TaskScheduler();
  scheduler.addTask("High Priority Task", 10, 100);
  scheduler.addTask("Low Priority Task", 1, 50);
  scheduler.addTask("Medium Priority Task", 5, 75);
  console.log("Status:", scheduler.getStatus());
  scheduler.executeNextTask();
  console.log("Status after execution:", scheduler.getStatus());

  // Test Analytics Dashboard
  console.log("\n📊 Testing Analytics Dashboard:");
  const dashboard = new AnalyticsDashboard(3);
  dashboard.addEvent("click", 100);
  dashboard.addEvent("view", 50);
  dashboard.addEvent("purchase", 200);
  dashboard.addEvent("click", 75);
  dashboard.addEvent("view", 25);
  console.log("Stats:", dashboard.getStats());

  // Test Network Traffic Manager
  console.log("\n🌐 Testing Network Traffic Manager:");
  const trafficManager = new NetworkTrafficManager();
  trafficManager.addPacket("Data1", 5, 100);
  trafficManager.addPacket("Data2", 3, 50);
  trafficManager.addPacket("Data3", 8, 200);
  console.log("Queue stats:", trafficManager.getQueueStats());
  trafficManager.processNextPacket();
  console.log("Stats after processing:", trafficManager.getQueueStats());

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  MaxHeap,
  MinHeap,
  PriorityQueue,
  AdvancedHeap,
  MutableHeap,
  MedianFinder,
  KthLargest,
  SlidingWindowMaximum,
  HeapUtils,
  TaskScheduler,
  AnalyticsDashboard,
  NetworkTrafficManager,
};
