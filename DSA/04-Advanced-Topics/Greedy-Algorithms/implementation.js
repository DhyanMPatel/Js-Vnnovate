// 🎯 Greedy Algorithms Implementation
// Complete implementations of greedy algorithms with analysis

// ==========================================
// PRIORITY QUEUE IMPLEMENTATION
// ==========================================

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0] || null;
  }
}

// ==========================================
// ACTIVITY SELECTION PROBLEMS
// ==========================================

/**
 * Activity Selection Problem
 * Select maximum number of non-overlapping activities
 * Time: O(n log n) for sorting
 * Space: O(n) for activities
 */
function activitySelection(start, end) {
  const activities = start.map((s, i) => ({
    start: s,
    end: end[i],
    index: i,
  }));

  // Greedy choice: sort by end time
  activities.sort((a, b) => a.end - b.end);

  const selected = [];
  let lastEnd = -Infinity;

  for (const activity of activities) {
    if (activity.start >= lastEnd) {
      selected.push(activity);
      lastEnd = activity.end;
    }
  }

  return selected;
}

/**
 * Maximum Number of Non-Overlapping Intervals
 * Minimum intervals to remove to make non-overlapping
 * Time: O(n log n)
 * Space: O(1)
 */
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  // Greedy: sort by end time
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= prevEnd) {
      count++;
      prevEnd = intervals[i][1];
    }
  }

  return intervals.length - count; // Minimum intervals to remove
}

/**
 * Minimum Number of Platforms for Railway Station
 * Time: O(n log n)
 * Space: O(n)
 */
function findPlatforms(arrivals, departures) {
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);

  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0,
    j = 0;

  while (i < arrivals.length && j < departures.length) {
    if (arrivals[i] <= departures[j]) {
      platforms++;
      maxPlatforms = Math.max(maxPlatforms, platforms);
      i++;
    } else {
      platforms--;
      j++;
    }
  }

  return maxPlatforms;
}

/**
 * Minimum Meeting Rooms Required
 * Time: O(n log n)
 * Space: O(n)
 */
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let maxRooms = 0;
  let i = 0,
    j = 0;

  while (i < intervals.length) {
    if (starts[i] < ends[j]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      i++;
    } else {
      rooms--;
      j++;
    }
  }

  return maxRooms;
}

// ==========================================
// KNAPSACK PROBLEMS
// ==========================================

/**
 * Fractional Knapsack Problem
 * Maximum value with fractional items allowed
 * Time: O(n log n) for sorting
 * Space: O(n) for items
 */
function fractionalKnapsack(weights, values, capacity) {
  const items = weights.map((w, i) => ({
    weight: w,
    value: values[i],
    ratio: values[i] / w,
    index: i,
  }));

  // Greedy choice: sort by value/weight ratio
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;
  const selected = [];

  for (const item of items) {
    if (remainingCapacity >= item.weight) {
      // Take whole item
      selected.push({ ...item, fraction: 1 });
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      // Take fraction of item
      const fraction = remainingCapacity / item.weight;
      selected.push({ ...item, fraction });
      totalValue += item.value * fraction;
      break;
    }
  }

  return { totalValue, selected };
}

/**
 * Job Sequencing Problem
 * Schedule jobs to maximize profit with deadlines
 * Time: O(n log n) for sorting + O(n²) for scheduling
 * Space: O(n) for slots
 */
function jobSequencing(jobs) {
  // Sort jobs by profit in descending order
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...jobs.map((job) => job.deadline));
  const slots = new Array(maxDeadline + 1).fill(false);
  const result = [];
  let totalProfit = 0;

  for (const job of jobs) {
    // Find the latest available slot before deadline
    for (let j = job.deadline; j >= 1; j--) {
      if (!slots[j]) {
        slots[j] = true;
        result.push({ ...job, slot: j });
        totalProfit += job.profit;
        break;
      }
    }
  }

  return { totalProfit, scheduledJobs: result };
}

// ==========================================
// HUFFMAN CODING
// ==========================================

/**
 * Huffman Tree Node
 */
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

/**
 * Build Huffman Tree for Optimal Prefix Codes
 * Time: O(n log n)
 * Space: O(n)
 */
function huffmanCoding(charFreqs) {
  const heap = new MinHeap();

  // Create leaf nodes for each character
  for (const [char, freq] of Object.entries(charFreqs)) {
    heap.insert(new HuffmanNode(char, freq));
  }

  // Build Huffman tree
  while (heap.size() > 1) {
    const left = heap.extractMin();
    const right = heap.extractMin();

    const merged = new HuffmanNode(null, left.freq + right.freq, left, right);

    heap.insert(merged);
  }

  return heap.extractMin(); // Root of Huffman tree
}

/**
 * Generate Huffman Codes from Tree
 * Time: O(n)
 * Space: O(n)
 */
function generateCodes(root, code = "", codes = {}) {
  if (root === null) return codes;

  if (root.char !== null) {
    codes[root.char] = code;
  }

  generateCodes(root.left, code + "0", codes);
  generateCodes(root.right, code + "1", codes);

  return codes;
}

/**
 * Decode Huffman Encoded String
 * Time: O(n)
 * Space: O(1)
 */
function huffmanDecode(encoded, root) {
  let current = root;
  let decoded = "";

  for (const bit of encoded) {
    current = bit === "0" ? current.left : current.right;

    if (current.char !== null) {
      decoded += current.char;
      current = root;
    }
  }

  return decoded;
}

// ==========================================
// GRAPH GREEDY ALGORITHMS
// ==========================================

/**
 * Dijkstra's Algorithm - Shortest Path from Single Source
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 */
function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const minHeap = new MinHeap();

  // Initialize distances
  for (const vertex of graph.keys()) {
    distances.set(vertex, vertex === start ? 0 : Infinity);
  }

  minHeap.insert({ vertex: start, distance: 0 });

  while (!minHeap.isEmpty()) {
    const { vertex, distance } = minHeap.extractMin();

    if (visited.has(vertex)) continue;
    visited.add(vertex);

    // Greedy: always pick vertex with minimum distance
    for (const [neighbor, weight] of graph.get(vertex)) {
      const newDistance = distance + weight;

      if (newDistance < distances.get(neighbor)) {
        distances.set(neighbor, newDistance);
        minHeap.insert({ vertex: neighbor, distance: newDistance });
      }
    }
  }

  return distances;
}

/**
 * Prim's Algorithm - Minimum Spanning Tree
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 */
function primMST(graph) {
  const mst = new Set();
  const minHeap = new MinHeap();
  const visited = new Set();
  const start = graph.keys().next().value;

  // Add all edges from start vertex
  for (const [vertex, weight] of graph.get(start)) {
    minHeap.insert({ from: start, to: vertex, weight });
  }

  visited.add(start);

  while (!minHeap.isEmpty() && mst.size < graph.size - 1) {
    const edge = minHeap.extractMin();

    if (!visited.has(edge.to)) {
      mst.add(edge);
      visited.add(edge.to);

      // Add edges from new vertex
      for (const [vertex, weight] of graph.get(edge.to)) {
        if (!visited.has(vertex)) {
          minHeap.insert({ from: edge.to, to: vertex, weight });
        }
      }
    }
  }

  return mst;
}

/**
 * Disjoint Set Union for Kruskal's Algorithm
 */
class DisjointSetUnion {
  constructor(vertices) {
    this.parent = new Map();
    this.rank = new Map();

    for (const vertex of vertices) {
      this.parent.set(vertex, vertex);
      this.rank.set(vertex, 0);
    }
  }

  find(vertex) {
    if (this.parent.get(vertex) !== vertex) {
      this.parent.set(vertex, this.find(this.parent.get(vertex)));
    }
    return this.parent.get(vertex);
  }

  union(vertex1, vertex2) {
    const root1 = this.find(vertex1);
    const root2 = this.find(vertex2);

    if (root1 === root2) return;

    if (this.rank.get(root1) < this.rank.get(root2)) {
      this.parent.set(root1, root2);
    } else if (this.rank.get(root1) > this.rank.get(root2)) {
      this.parent.set(root2, root1);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, this.rank.get(root1) + 1);
    }
  }
}

/**
 * Kruskal's Algorithm - Minimum Spanning Tree
 * Time: O(E log E) for sorting
 * Space: O(V + E)
 */
function kruskalMST(edges, vertices) {
  const mst = [];
  const dsu = new DisjointSetUnion(vertices);

  // Greedy: sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  for (const edge of edges) {
    if (dsu.find(edge.from) !== dsu.find(edge.to)) {
      mst.push(edge);
      dsu.union(edge.from, edge.to);

      if (mst.length === vertices - 1) break;
    }
  }

  return mst;
}

// ==========================================
// STRING AND ARRAY GREEDY
// ==========================================

/**
 * Assign Cookies
 * Assign cookies to children to maximize satisfied children
 * Time: O(n log n)
 * Space: O(1)
 */
function findContentChildren(greedFactors, cookieSizes) {
  greedFactors.sort((a, b) => a - b);
  cookieSizes.sort((a, b) => a - b);

  let child = 0,
    cookie = 0;
  let satisfied = 0;

  while (child < greedFactors.length && cookie < cookieSizes.length) {
    if (cookieSizes[cookie] >= greedFactors[child]) {
      satisfied++;
      child++;
      cookie++;
    } else {
      cookie++;
    }
  }

  return satisfied;
}

/**
 * Candy Distribution
 * Minimum candies to distribute with ratings constraints
 * Time: O(n)
 * Space: O(n)
 */
function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // Left to right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to left pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((sum, count) => sum + count, 0);
}

/**
 * Jump Game II
 * Minimum number of jumps to reach end
 * Time: O(n)
 * Space: O(1)
 */
function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}

/**
 * Gas Station Problem
 * Find starting gas station to complete circuit
 * Time: O(n)
 * Space: O(1)
 */
function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currTank = 0;
  let startingStation = 0;

  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];

    if (currTank < 0) {
      startingStation = i + 1;
      currTank = 0;
    }
  }

  return totalTank >= 0 ? startingStation : -1;
}

/**
 * Reorganize String
 * Rearrange string so no adjacent characters are same
 * Time: O(n log k) where k is unique characters
 * Space: O(k)
 */
function reorganizeString(s) {
  const charCount = new Map();
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  const maxHeap = new MinHeap();
  for (const [char, count] of charCount) {
    maxHeap.insert({ char, count: -count }); // Use negative for max heap
  }

  let result = "";
  let prevChar = null;
  let prevCount = 0;

  while (!maxHeap.isEmpty()) {
    const { char, count } = maxHeap.extractMin();
    const actualCount = -count;

    result += char;
    actualCount--;

    if (prevChar && prevCount > 0) {
      maxHeap.insert({ char: prevChar, count: -prevCount });
    }

    prevChar = char;
    prevCount = actualCount;
  }

  return result.length === s.length ? result : "";
}

// ==========================================
// MATHEMATICAL GREEDY
// ==========================================

/**
 * Container With Most Water
 * Maximum area between two lines
 * Time: O(n)
 * Space: O(1)
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * currentHeight);

    // Greedy: move the shorter line
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

/**
 * Boats to Save People
 * Minimum number of boats to carry people
 * Time: O(n log n)
 * Space: O(1)
 */
function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);

  let boats = 0;
  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++;
    }
    right--;
    boats++;
  }

  return boats;
}

/**
 * Partition Labels
 * Partition string so each letter appears in at most one part
 * Time: O(n)
 * Space: O(1)
 */
function partitionLabels(s) {
  const lastOccurrence = new Map();
  for (let i = 0; i < s.length; i++) {
    lastOccurrence.set(s[i], i);
  }

  const partitions = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastOccurrence.get(s[i]));

    if (i === end) {
      partitions.push(end - start + 1);
      start = i + 1;
    }
  }

  return partitions;
}

// ==========================================
// ADVANCED GREEDY TECHNIQUES
// ==========================================

/**
 * Task Scheduler
 * Minimum intervals to complete tasks with cooling period
 * Time: O(n)
 * Space: O(1) - only 26 possible tasks
 */
function leastInterval(tasks, n) {
  const taskCount = new Array(26).fill(0);
  for (const task of tasks) {
    taskCount[task.charCodeAt(0) - "A".charCodeAt(0)]++;
  }

  taskCount.sort((a, b) => b - a);
  const maxCount = taskCount[0];
  const maxCountTasks = taskCount.filter((count) => count === maxCount).length;

  const partCount = maxCount - 1;
  const partLength = n - (maxCountTasks - 1);
  const emptySlots = partCount * partLength;
  const availableTasks = tasks.length - maxCount * maxCountTasks;
  const idles = Math.max(0, emptySlots - availableTasks);

  return tasks.length + idles;
}

/**
 * Reconstruct Queue
 * Reconstruct queue from height and k-values
 * Time: O(n²)
 * Space: O(n)
 */
function reconstructQueue(people) {
  // Sort by height descending, k ascending
  people.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    return a[1] - b[1];
  });

  const queue = [];
  for (const person of people) {
    queue.splice(person[1], 0, person);
  }

  return queue;
}

/**
 * Course Schedule III
 * Maximum courses that can be taken
 * Time: O(n log n)
 * Space: O(n)
 */
function scheduleCourse(courses) {
  courses.sort((a, b) => a[1] - b[1]); // Sort by deadline

  const maxHeap = new MinHeap();
  let totalTime = 0;

  for (const course of courses) {
    if (totalTime + course[0] <= course[1]) {
      totalTime += course[0];
      maxHeap.insert({ duration: -course[0] }); // Use negative for max heap
    } else if (!maxHeap.isEmpty() && -maxHeap.peek().duration > course[0]) {
      const longest = maxHeap.extractMin();
      totalTime += longest.duration + course[0]; // Remove longest, add current
      maxHeap.insert({ duration: -course[0] });
    }
  }

  return maxHeap.size();
}

// ==========================================
// GREEDY PROOF UTILITIES
// ==========================================

/**
 * Exchange Argument Proof Template
 */
function exchangeArgumentProof(greedySolution, optimalSolution) {
  /*
  Proof structure:
  1. Let G be greedy solution, O be optimal solution
  2. Find first position where G and O differ
  3. Show that we can exchange O's choice with G's choice
  4. Prove that exchange doesn't worsen the solution
  5. By repeated exchanges, transform O into G
  6. Therefore, G is optimal
  */

  return {
    greedySolution,
    optimalSolution,
    proof: "Exchange argument shows greedy is optimal",
  };
}

/**
 * Greedy Stays Ahead Proof Template
 */
function greedyStaysAheadProof(greedySolution, otherSolution) {
  /*
  Proof structure:
  1. Show that after each step i, greedy solution is at least as good as any other
  2. Base case: trivial
  3. Inductive step: assume greedy is ahead after i-1 steps
  4. Show greedy choice maintains or improves this advantage
  5. Therefore, greedy solution is optimal
  */

  return {
    greedySolution,
    otherSolution,
    proof: "Greedy stays ahead at each step",
  };
}

/**
 * Matroid Greedy Proof Template
 */
function matroidGreedyProof(independentSet, greedyAlgorithm) {
  /*
  Proof structure:
  1. Show problem can be modeled as a matroid
  2. Verify hereditary property
  3. Verify exchange property
  4. Apply matroid greedy theorem
  5. Conclude greedy algorithm is optimal
  */

  return {
    independentSet,
    greedyAlgorithm,
    proof: "Matroid structure guarantees greedy optimality",
  };
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Check if greedy approach is applicable
 */
function isGreedyApplicable(problem) {
  // Check for greedy choice property
  const hasGreedyChoice = checkGreedyChoiceProperty(problem);

  // Check for optimal substructure
  const hasOptimalSubstructure = checkOptimalSubstructure(problem);

  // Try to find counterexample
  const counterexample = findGreedyCounterexample(problem);

  return {
    applicable: hasGreedyChoice && hasOptimalSubstructure && !counterexample,
    hasGreedyChoice,
    hasOptimalSubstructure,
    counterexample,
  };
}

function checkGreedyChoiceProperty(problem) {
  // Simplified check - in practice, this requires mathematical proof
  return problem.greedyChoiceProperty === true;
}

function checkOptimalSubstructure(problem) {
  // Simplified check - in practice, this requires mathematical proof
  return problem.optimalSubstructure === true;
}

function findGreedyCounterexample(problem) {
  // Try to find a case where greedy fails
  // This is problem-specific and requires careful analysis
  return null; // Assume no counterexample by default
}

/**
 * Compare greedy vs DP solution
 */
function compareGreedyVsDP(greedyFunc, dpFunc, testCases) {
  const results = [];

  for (const testCase of testCases) {
    const greedyResult = greedyFunc(testCase);
    const dpResult = dpFunc(testCase);

    results.push({
      input: testCase,
      greedy: greedyResult,
      dp: dpResult,
      optimal: JSON.stringify(greedyResult) === JSON.stringify(dpResult),
    });
  }

  return results;
}

/**
 * Performance monitor for greedy algorithms
 */
function measureGreedyPerformance(func, ...args) {
  const startTime = performance.now();
  const result = func(...args);
  const endTime = performance.now();

  return {
    result,
    time: endTime - startTime,
    complexity: analyzeGreedyComplexity(func, args),
  };
}

function analyzeGreedyComplexity(func, args) {
  const sizes = args.map((arg) =>
    Array.isArray(arg)
      ? arg.length
      : typeof arg === "object"
      ? Object.keys(arg).length
      : 1
  );

  return {
    inputSizes: sizes,
    estimatedComplexity: estimateGreedyComplexity(sizes),
  };
}

function estimateGreedyComplexity(sizes) {
  // Most greedy algorithms are O(n log n) due to sorting
  const max = Math.max(...sizes);
  if (sizes.length === 1) return `O(${max} log ${max})`;
  return `O(${max} log ${max})`; // Simplified estimation
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runGreedyTests() {
  console.log("🧪 Running Greedy Algorithm Tests...\n");

  // Test activity selection
  console.log("📅 Testing Activity Selection:");
  const start = [1, 3, 0, 5, 8, 5];
  const end = [2, 4, 6, 7, 9, 9];
  const activities = activitySelection(start, end);
  console.log(`Selected ${activities.length} activities (expected: 3)`);

  // Test fractional knapsack
  console.log("\n🎒 Testing Fractional Knapsack:");
  const weights = [10, 20, 30];
  const values = [60, 100, 120];
  const capacity = 50;
  const knapsackResult = fractionalKnapsack(weights, values, capacity);
  console.log(`Max value: ${knapsackResult.totalValue} (expected: 240)`);

  // Test Huffman coding
  console.log("\n📡 Testing Huffman Coding:");
  const charFreqs = { a: 45, b: 13, c: 12, d: 16, e: 9, f: 5 };
  const huffmanTree = huffmanCoding(charFreqs);
  const codes = generateCodes(huffmanTree);
  console.log(`Generated ${Object.keys(codes).length} codes (expected: 6)`);

  // Test Dijkstra
  console.log("\n🗺️ Testing Dijkstra:");
  const graph = new Map([
    [
      "A",
      [
        ["B", 4],
        ["C", 2],
      ],
    ],
    [
      "B",
      [
        ["C", 1],
        ["D", 5],
      ],
    ],
    [
      "C",
      [
        ["D", 8],
        ["B", 3],
      ],
    ],
    ["D", [["E", 6]]],
    ["E", [["A", 10]]],
  ]);
  const distances = dijkstra(graph, "A");
  console.log(`Distances from A: ${distances.size} vertices (expected: 5)`);

  // Test meeting rooms
  console.log("\n🏢 Testing Meeting Rooms:");
  const intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
  ];
  const rooms = minMeetingRooms(intervals);
  console.log(`Minimum rooms: ${rooms} (expected: 2)`);

  // Test jump game
  console.log("\n🦘 Testing Jump Game II:");
  const nums = [2, 3, 1, 1, 4];
  const jumps = jump(nums);
  console.log(`Minimum jumps: ${jumps} (expected: 2)`);

  // Test gas station
  console.log("\n⛽ Testing Gas Station:");
  const gas = [1, 2, 3, 4, 5];
  const cost = [3, 4, 5, 1, 2];
  const station = canCompleteCircuit(gas, cost);
  console.log(`Starting station: ${station} (expected: 3)`);

  // Test container with water
  console.log("\n💧 Testing Container With Water:");
  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const maxWater = maxArea(height);
  console.log(`Maximum area: ${maxWater} (expected: 49)`);

  // Test task scheduler
  console.log("\n📋 Testing Task Scheduler:");
  const tasks = ["A", "A", "A", "B", "B", "B"];
  const taskIntervals = leastInterval(tasks, 2);
  console.log(`Minimum intervals: ${taskIntervals} (expected: 8)`);

  // Test performance
  console.log("\n⚡ Testing Performance:");
  const perf = measureGreedyPerformance(activitySelection, start, end);
  console.log(`Activity Selection time: ${perf.time.toFixed(2)}ms`);
  console.log(`Complexity estimate: ${perf.complexity.estimatedComplexity}`);

  console.log("\n✅ All greedy tests completed!");
}

// Export all functions
module.exports = {
  // Priority queue
  MinHeap,

  // Activity selection
  activitySelection,
  eraseOverlapIntervals,
  findPlatforms,
  minMeetingRooms,

  // Knapsack
  fractionalKnapsack,
  jobSequencing,

  // Huffman coding
  HuffmanNode,
  huffmanCoding,
  generateCodes,
  huffmanDecode,

  // Graph greedy
  dijkstra,
  primMST,
  DisjointSetUnion,
  kruskalMST,

  // String and array greedy
  findContentChildren,
  candy,
  jump,
  canCompleteCircuit,
  reorganizeString,

  // Mathematical greedy
  maxArea,
  numRescueBoats,
  partitionLabels,

  // Advanced greedy
  leastInterval,
  reconstructQueue,
  scheduleCourse,

  // Proof utilities
  exchangeArgumentProof,
  greedyStaysAheadProof,
  matroidGreedyProof,

  // Utilities
  isGreedyApplicable,
  compareGreedyVsDP,
  measureGreedyPerformance,
  runGreedyTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runGreedyTests();
}
