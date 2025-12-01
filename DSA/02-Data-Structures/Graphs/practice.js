// 🕸️ Graphs & Graph Algorithms Practice Problems
// Implement these functions to master graph operations

// ==========================================
// EASY PROBLEMS (O(V + E) or less)
// ==========================================

/**
 * Problem 1: Course Schedule
 * Check if course schedule is possible (no cycles).
 *
 * @param {number} numCourses - Number of courses
 * @param {number[][]} prerequisites - Course dependencies
 * @return {boolean} True if schedule is possible
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 */
function canFinishCourses(numCourses, prerequisites) {
  // Your implementation here
}

/**
 * Problem 2: Find the Town Judge
 * Find person trusted by everyone else.
 *
 * @param {number} n - Number of people
 * @param {number[][]} trust - Trust relationships [a, b] means a trusts b
 * @return {number} Judge's label
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3, trust = [[1,3],[2,3]]
 * Output: 3
 */
function findJudge(n, trust) {
  // Your implementation here
}

/**
 * Problem 3: Find Center of Star Graph
 * Find center node in star graph.
 *
 * @param {number[][]} edges - Graph edges
 * @return {number} Center node
 *
 * Expected Time: O(1)
 * Expected Space: O(1)
 *
 * Example:
 * Input: edges = [[1,2],[2,3],[4,2]]
 * Output: 2
 */
function findCenter(edges) {
  // Your implementation here
}

/**
 * Problem 4: Number of Provinces
 * Count connected components in graph.
 *
 * @param {number[][]} isConnected - Adjacency matrix
 * @return {number} Number of provinces
 *
 * Expected Time: O(n²)
 * Expected Space: O(n)
 *
 * Example:
 * Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 */
function findCircleNum(isConnected) {
  // Your implementation here
}

/**
 * Problem 5: Keys and Rooms
 * Check if all rooms can be visited.
 *
 * @param {number[][]} rooms - Room keys
 * @return {boolean} True if all rooms reachable
 *
 * Expected Time: O(n + k) where n is rooms, k is total keys
 * Expected Space: O(n)
 *
 * Example:
 * Input: rooms = [[1],[2],[3],[]]
 * Output: true
 */
function canVisitAllRooms(rooms) {
  // Your implementation here
}

/**
 * Problem 6: Find if Path Exists in Graph
 * Check if path exists between two nodes.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @param {number} source - Starting vertex
 * @param {number} destination - Target vertex
 * @return {boolean} True if path exists
 *
 * Expected Time: O(n + e)
 * Expected Space: O(n + e)
 *
 * Example:
 * Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
 * Output: true
 */
function validPath(n, edges, source, destination) {
  // Your implementation here
}

/**
 * Problem 7: Find the Largest Component Size
 * Find size of largest connected component.
 *
 * @param {number[][]} edges - Graph edges
 * @return {number} Size of largest component
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: edges = [[0,1],[1,2],[3,4]]
 * Output: 3
 */
function largestComponentSize(edges) {
  // Your implementation here
}

/**
 * Problem 8: Find the Number of Islands
 * Count islands in grid (2D graph).
 *
 * @param {character[][]} grid - 2D grid of '1's and '0's
 * @return {number} Number of islands
 *
 * Expected Time: O(m * n)
 * Expected Space: O(m * n)
 *
 * Example:
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 */
function numIslands(grid) {
  // Your implementation here
}

/**
 * Problem 9: Find the Maximum Depth of Binary Tree
 * Find maximum depth using graph traversal.
 *
 * @param {TreeNode} root - Binary tree root
 * @return {number} Maximum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(h) where h is tree height
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 3
 */
function maxDepth(root) {
  // Your implementation here
}

/**
 * Problem 10: Find the Minimum Number of Operations
 * Find minimum operations to connect all computers.
 *
 * @param {number} n - Number of computers
 * @param {number[][]} connections - Network connections
 * @return {number} Minimum operations needed
 *
 * Expected Time: O(n + e)
 * Expected Space: O(n + e)
 *
 * Example:
 * Input: n = 4, connections = [[0,1],[0,2],[1,2]]
 * Output: 1
 */
function makeConnected(n, connections) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Clone Graph
 * Deep copy of graph structure.
 *
 * @param {Node} node - Graph node
 * @return {Node} Cloned graph node
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 */
function cloneGraph(node) {
  // Your implementation here
}

/**
 * Problem 12: Pacific Atlantic Water Flow
 * Find cells reachable to both oceans.
 *
 * @param {number[][]} matrix - Height matrix
 * @return {number[][]} Coordinates of reachable cells
 *
 * Expected Time: O(m * n)
 * Expected Space: O(m * n)
 *
 * Example:
 * Input: matrix = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 */
function pacificAtlantic(matrix) {
  // Your implementation here
}

/**
 * Problem 13: Surrounded Regions
 * Capture surrounded regions.
 *
 * @param {character[][]} board - Game board
 * @return {void} Modify board in-place
 *
 * Expected Time: O(m * n)
 * Expected Space: O(m * n)
 *
 * Example:
 * Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","X","X","X"]]
 * Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","X","X","X"]]
 */
function solve(board) {
  // Your implementation here
}

/**
 * Problem 14: Network Delay Time
 * Calculate network delay time.
 *
 * @param {number[][]} times - Signal travel times
 * @param {number} n - Number of nodes
 * @param {number} k - Starting node
 * @return {number} Time for signal to reach all nodes
 *
 * Expected Time: O((V + E) log V)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
 * Output: 2
 */
function networkDelayTime(times, n, k) {
  // Your implementation here
}

/**
 * Problem 15: Course Schedule III
 * Find maximum courses that can be taken.
 *
 * @param {number[][]} courses - Course duration and deadline
 * @return {number} Maximum courses
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
 * Output: 3
 */
function scheduleCourse(courses) {
  // Your implementation here
}

/**
 * Problem 16: Minimum Number of Vertices to Reach All Nodes
 * Find minimum starting points.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number[]} Minimum starting vertices
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
 * Output: [0,3]
 */
function findSmallestSetOfVertices(n, edges) {
  // Your implementation here
}

/**
 * Problem 17: Find the Largest Color Value in a Directed Graph
 * Find largest path color value.
 *
 * @param {string} colors - Node colors
 * @param {number[][]} edges - Graph edges
 * @return {number} Largest color value
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
 * Output: 3
 */
function largestPathValue(colors, edges) {
  // Your implementation here
}

/**
 * Problem 18: Find Eventual Safe States
 * Find safe nodes in directed graph.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number[]} Safe nodes
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * Output: [2,4,5,6]
 */
function eventualSafeNodes(graph) {
  // Your implementation here
}

/**
 * Problem 19: Find the Number of Connected Components in an Undirected Graph
 * Count connected components.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number} Number of connected components
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 5, edges = [[0,1],[1,2],[3,4]]
 * Output: 2
 */
function countComponents(n, edges) {
  // Your implementation here
}

/**
 * Problem 20: Find the Minimum Number of Operations to Make Graph Connected
 * Make graph connected with minimum operations.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} connections - Graph edges
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, connections = [[0,1],[0,2],[1,2]]
 * Output: 1
 */
function makeGraphConnected(n, connections) {
  // Your implementation here
}

/**
 * Problem 21: Find the Number of Ways to Arrive at Destination
 * Number of shortest paths to destination.
 *
 * @param {number} n - Number of intersections
 * @param {number[][]} roads - Road connections
 * @return {number} Number of ways modulo 10^9 + 7
 *
 * Expected Time: O((V + E) log V)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
 * Output: 4
 */
function countPaths(n, roads) {
  // Your implementation here
}

/**
 * Problem 22: Find the Minimum Number of Operations to Make All Array Elements Equal
 * Make array elements equal using graph operations.
 *
 * @param {number[]} nums - Input array
 * @return {number} Minimum operations
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: 3
 */
function minOperations(nums) {
  // Your implementation here
}

/**
 * Problem 23: Find the Number of Operations to Make Network Connected
 * Connect all computers with minimum operations.
 *
 * @param {number} n - Number of computers
 * @param {number[][]} connections - Network connections
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, connections = [[0,1],[0,2],[1,2]]
 * Output: 1
 */
function operationsToConnectNetwork(n, connections) {
  // Your implementation here
}

/**
 * Problem 24: Find the Number of Ways to Divide a Graph
 * Divide graph into two groups.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number} Number of ways
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, edges = [[1,2],[2,3],[3,4]]
 * Output: 3
 */
function waysToDivideGraph(n, edges) {
  // Your implementation here
}

/**
 * Problem 25: Find the Minimum Number of Operations to Make Graph Bipartite
 * Make graph bipartite with minimum operations.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,2,3],[0,2,3],[0,1,3],[0,1,2]]
 * Output: 2
 */
function minimumOperationsToMakeGraphBipartite(graph) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Reconstruct Itinerary
 * Reconstruct travel itinerary.
 *
 * @param {string[][]} tickets - Flight tickets
 * @return {string[]} Itinerary
 *
 * Expected Time: O(E log E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 */
function findItinerary(tickets) {
  // Your implementation here
}

/**
 * Problem 27: Critical Connections in a Network
 * Find critical bridges in network.
 *
 * @param {number} n - Number of servers
 * @param {number[][]} connections - Network connections
 * @return {number[][]} Critical connections
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
 * Output: [[1,3]]
 */
function criticalConnections(n, connections) {
  // Your implementation here
}

/**
 * Problem 28: Find Eventual Safe States (Optimized)
 * Optimized safe nodes detection.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number[]} Safe nodes
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * Output: [2,4,5,6]
 */
function eventualSafeNodesOptimized(graph) {
  // Your implementation here
}

/**
 * Problem 29: Find the Longest Path in a Directed Acyclic Graph
 * Find longest path in DAG.
 *
 * @param {number[][]} edges - Graph edges
 * @param {number} n - Number of vertices
 * @return {number} Length of longest path
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: edges = [[0,1],[0,2],[1,3],[2,3]], n = 4
 * Output: 3
 */
function longestPathInDAG(edges, n) {
  // Your implementation here
}

/**
 * Problem 30: Find the Number of Paths in a Directed Acyclic Graph
 * Count all paths in DAG.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number} Number of paths
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,2],[3],[3],[4],[]]
 * Output: 4
 */
function countPathsInDAG(graph) {
  // Your implementation here
}

/**
 * Problem 31: Find the Minimum Number of Operations to Make Graph Strongly Connected
 * Make graph strongly connected.
 *
 * @param {number[][]} connections - Graph edges
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: connections = [[0,1],[0,2],[1,2],[2,0]]
 * Output: 0
 */
function makeGraphStronglyConnected(connections) {
  // Your implementation here
}

/**
 * Problem 32: Find the Number of Hamiltonian Paths in a Graph
 * Count Hamiltonian paths.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number} Number of Hamiltonian paths
 *
 * Expected Time: O(n * 2^n)
 * Expected Space: O(n * 2^n)
 *
 * Example:
 * Input: graph = [[1,2,3],[0],[0],[0]]
 * Output: 6
 */
function countHamiltonianPaths(graph) {
  // Your implementation here
}

/**
 * Problem 33: Find the Minimum Number of Operations to Make Graph Eulerian
 * Make graph Eulerian trail.
 *
 * @param {number[][]} edges - Graph edges
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: edges = [[0,1],[0,2]]
 * Output: 1
 */
function makeGraphEulerian(edges) {
  // Your implementation here
}

/**
 * Problem 34: Find the Number of Ways to Color a Graph
 * Count graph colorings.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @param {number} m - Number of colors
 * @return {number} Number of colorings
 *
 * Expected Time: O(m^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3, edges = [[0,1],[0,2]], m = 3
 * Output: 6
 */
function countGraphColorings(n, edges, m) {
  // Your implementation here
}

/**
 * Problem 35: Find the Minimum Number of Operations to Make Graph Planar
 * Make graph planar.
 *
 * @param {number[][]} edges - Graph edges
 * @return {number} Minimum operations
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: edges = [[0,1],[0,2],[1,2],[1,3],[1,4]]
 * Output: 1
 */
function makeGraphPlanar(edges) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Custom Graph Class
 * Graph with custom operations.
 */
class CustomGraph {
  constructor(directed = false) {
    // Your implementation here
  }

  addVertex(vertex) {
    // Your implementation here
  }

  addEdge(vertex1, vertex2, weight = 1) {
    // Your implementation here
  }

  removeVertex(vertex) {
    // Your implementation here
  }

  removeEdge(vertex1, vertex2) {
    // Your implementation here
  }

  bfs(start) {
    // Your implementation here
  }

  dfs(start) {
    // Your implementation here
  }

  shortestPath(start, end) {
    // Your implementation here
  }

  hasCycle() {
    // Your implementation here
  }

  topologicalSort() {
    // Your implementation here
  }
}

/**
 * Bonus 2: Design a Union-Find Data Structure
 * Disjoint set union implementation.
 */
class UnionFind {
  constructor(size) {
    // Your implementation here
  }

  find(x) {
    // Your implementation here
  }

  union(x, y) {
    // Your implementation here
  }

  connected(x, y) {
    // Your implementation here
  }

  getComponents() {
    // Your implementation here
  }
}

/**
 * Bonus 3: Design a Graph Algorithm Visualizer
 * Visualize graph algorithms.
 */
class GraphVisualizer {
  constructor() {
    // Your implementation here
  }

  visualizeBFS(graph, start) {
    // Your implementation here
  }

  visualizeDFS(graph, start) {
    // Your implementation here
  }

  visualizeDijkstra(graph, start) {
    // Your implementation here
  }

  visualizeTopologicalSort(graph) {
    // Your implementation here
  }
}

/**
 * Bonus 4: Implement a Graph Database Interface
 * Simple graph database operations.
 */
class GraphDatabase {
  constructor() {
    // Your implementation here
  }

  addNode(id, properties) {
    // Your implementation here
  }

  addEdge(from, to, properties) {
    // Your implementation here
  }

  query(pattern) {
    // Your implementation here
  }

  findPath(from, to) {
    // Your implementation here
  }

  findShortestPath(from, to) {
    // Your implementation here
  }

  findConnectedComponents() {
    // Your implementation here
  }
}

/**
 * Bonus 5: Design a Distributed Graph Processing System
 * Process large graphs across multiple machines.
 */
class DistributedGraphProcessor {
  constructor(machines) {
    // Your implementation here
  }

  distributeGraph(graph) {
    // Your implementation here
  }

  processBFS(start) {
    // Your implementation here
  }

  processPageRank(iterations = 10) {
    // Your implementation here
  }

  processConnectedComponents() {
    // Your implementation here
  }

  aggregateResults() {
    // Your implementation here
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Graph Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test course schedule
  console.log("Example - Course Schedule:");
  console.log("Input: numCourses = 2, prerequisites = [[1,0]]");
  console.log("Expected: true");
  console.log("Your result:", canFinishCourses(2, [[1, 0]]));

  // Test town judge
  console.log("\nExample - Town Judge:");
  console.log("Input: n = 3, trust = [[1,3],[2,3]]");
  console.log("Expected: 3");
  console.log(
    "Your result:",
    findJudge(3, [
      [1, 3],
      [2, 3],
    ])
  );

  // Test find center
  console.log("\nExample - Find Center:");
  console.log("Input: edges = [[1,2],[2,3],[4,2]]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    findCenter([
      [1, 2],
      [2, 3],
      [4, 2],
    ])
  );

  // Test number of provinces
  console.log("\nExample - Number of Provinces:");
  console.log("Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    findCircleNum([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ])
  );

  // Test keys and rooms
  console.log("\nExample - Keys and Rooms:");
  console.log("Input: rooms = [[1],[2],[3],[]]");
  console.log("Expected: true");
  console.log("Your result:", canVisitAllRooms([[1], [2], [3], []]));

  // Test valid path
  console.log("\nExample - Valid Path:");
  console.log(
    "Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2"
  );
  console.log("Expected: true");
  console.log(
    "Your result:",
    validPath(
      3,
      [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      0,
      2
    )
  );

  // Test number of islands
  console.log("\nExample - Number of Islands:");
  const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  console.log("Input: 2D grid with islands");
  console.log("Expected: 3");
  console.log("Your result:", numIslands(grid));

  // Test network delay time
  console.log("\nExample - Network Delay Time:");
  console.log("Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    networkDelayTime(
      [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1],
      ],
      4,
      2
    )
  );

  // Test make connected
  console.log("\nExample - Make Connected:");
  console.log("Input: n = 4, connections = [[0,1],[0,2],[1,2]]");
  console.log("Expected: 1");
  console.log(
    "Your result:",
    makeConnected(4, [
      [0, 1],
      [0, 2],
      [1, 2],
    ])
  );

  // Test clone graph
  console.log("\nExample - Clone Graph:");
  // Note: This would require building a graph structure first
  console.log("Input: adjList = [[2,4],[1,3],[2,4],[1,3]]");
  console.log("Expected: [[2,4],[1,3],[2,4],[1,3]]");
  console.log("Your result: (Implement cloneGraph function to test)");

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding graph operations and algorithms");
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
  canFinishCourses,
  findJudge,
  findCenter,
  findCircleNum,
  canVisitAllRooms,
  validPath,
  largestComponentSize,
  numIslands,
  maxDepth,
  makeConnected,
  cloneGraph,
  pacificAtlantic,
  solve,
  networkDelayTime,
  scheduleCourse,
  findSmallestSetOfVertices,
  largestPathValue,
  eventualSafeNodes,
  countComponents,
  makeGraphConnected,
  countPaths,
  minOperations,
  operationsToConnectNetwork,
  waysToDivideGraph,
  minimumOperationsToMakeGraphBipartite,
  findItinerary,
  criticalConnections,
  eventualSafeNodesOptimized,
  longestPathInDAG,
  countPathsInDAG,
  makeGraphStronglyConnected,
  countHamiltonianPaths,
  makeGraphEulerian,
  countGraphColorings,
  makeGraphPlanar,
  CustomGraph,
  UnionFind,
  GraphVisualizer,
  GraphDatabase,
  DistributedGraphProcessor,
  testFunction,
};
