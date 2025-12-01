// 🕸️ Graph Algorithms Practice Problems
// Implement these functions to master graph algorithms

// ==========================================
// EASY PROBLEMS (O(V + E))
// ==========================================

/**
 * Problem 1: Number of Islands
 * Count number of islands in 2D grid.
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
 * Problem 2: Clone Graph
 * Clone a connected undirected graph.
 *
 * @param {Node} node - Node of the original graph
 * @return {Node} Deep copy of the graph
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: adjacency list = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 */
function cloneGraph(node) {
  // Your implementation here
}

/**
 * Problem 3: Flood Fill
 * Fill image region with new color.
 *
 * @param {number[][]} image - 2D image
 * @param {number} sr - Starting row
 * @param {number} sc - Starting column
 * @param {number} newColor - New color
 * @return {number[][]} Modified image
 *
 * Expected Time: O(m * n)
 * Expected Space: O(m * n)
 *
 * Example:
 * Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
 * Output: [[2,2,2],[2,2,0],[2,0,1]]
 */
function floodFill(image, sr, sc, newColor) {
  // Your implementation here
}

/**
 * Problem 4: Keys and Rooms
 * Determine if all rooms can be visited.
 *
 * @param {number[][]} rooms - Array of rooms with keys
 * @return {boolean} True if all rooms can be visited
 *
 * Expected Time: O(N + E) where N is number of rooms
 * Expected Space: O(N)
 *
 * Example:
 * Input: rooms = [[1],[2],[3],[]]
 * Output: true
 */
function canVisitAllRooms(rooms) {
  // Your implementation here
}

/**
 * Problem 5: Find the Town Judge
 * Find the town judge in a town.
 *
 * @param {number} n - Number of people
 * @param {number[][]} trust - Trust relationships
 * @return {number} The judge's label, or -1 if no judge
 *
 * Expected Time: O(n + trust.length)
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
 * Problem 6: Find if Path Exists in Graph
 * Check if path exists between source and destination.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @param {number} source - Source vertex
 * @param {number} destination - Destination vertex
 * @return {boolean} True if path exists
 *
 * Expected Time: O(n + edges.length)
 * Expected Space: O(n + edges.length)
 *
 * Example:
 * Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
 * Output: true
 */
function validPath(n, edges, source, destination) {
  // Your implementation here
}

/**
 * Problem 7: All Paths From Source to Target
 * Find all paths from source to target in DAG.
 *
 * @param {number[][]} graph - Adjacency list of DAG
 * @return {number[][]} All paths from source to target
 *
 * Expected Time: O(V + E) for building graph + O(P) for paths
 * Expected Space: O(V + E + P) where P is total path length
 *
 * Example:
 * Input: graph = [[1,2],[3],[3],[4],[]]
 * Output: [[0,1,3,4],[0,2,3,4]]
 */
function allPathsSourceTarget(graph) {
  // Your implementation here
}

/**
 * Problem 8: Minimum Number of Vertices to Reach All Nodes
 * Find minimum vertices to reach all nodes.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number[]} Minimum vertices
 *
 * Expected Time: O(n + edges.length)
 * Expected Space: O(n + edges.length)
 *
 * Example:
 * Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,5]]
 * Output: [0,3]
 */
function findSmallestSetOfVertices(n, edges) {
  // Your implementation here
}

/**
 * Problem 9: Reverse Graph
 * Reverse edges of directed graph.
 *
 * @param {number[][]} graph - Original graph
 * @return {number[][]} Reversed graph
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [[0,1,2],[0,1,2],[0,3],[3]]
 */
function reverseGraph(graph) {
  // Your implementation here
}

/**
 * Problem 10: Find Center of Star Graph
 * Find the center of a star graph.
 *
 * @param {number[][]} edges - Star graph edges
 * @return {number} Center vertex
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

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Course Schedule
 * Determine if course schedule is possible.
 *
 * @param {number} numCourses - Number of courses
 * @param {number[][]} prerequisites - Course prerequisites
 * @return {boolean} True if schedule is possible
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 */
function canFinish(numCourses, prerequisites) {
  // Your implementation here
}

/**
 * Problem 12: Pacific Atlantic Water Flow
 * Find cells where water can flow to both oceans.
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
 * Problem 13: Number of Connected Components in Undirected Graph
 * Count connected components in undirected graph.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number} Number of connected components
 *
 * Expected Time: O(n + edges.length)
 * Expected Space: O(n + edges.length)
 *
 * Example:
 * Input: n = 5, edges = [[0,1],[1,2],[3,4]]
 * Output: 2
 */
function countComponents(n, edges) {
  // Your implementation here
}

/**
 * Problem 14: Surrounded Regions
 * Capture surrounded regions in board.
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
 * Problem 15: Redundant Connection
 * Find redundant connection in graph.
 *
 * @param {number[][]} edges - Graph edges
 * @return {number[]} Redundant edge
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V)
 *
 * Example:
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 */
function findRedundantConnection(edges) {
  // Your implementation here
}

/**
 * Problem 16: Network Delay Time
 * Calculate network delay time.
 *
 * @param {number[][]} times - Signal travel times
 * @param {number} n - Number of nodes
 * @param {number} k - Starting node
 * @return {number} Time for all nodes to receive signal
 *
 * Expected Time: O(V + E log V)
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
 * Problem 17: Cheapest Flights Within K Stops
 * Find cheapest flight within K stops.
 *
 * @param {number} n - Number of cities
 * @param {number[][]} flights - Flight information
 * @param {number} src - Source city
 * @param {number} dst - Destination city
 * @param {number} k - Maximum stops
 * @return {number} Minimum cost
 *
 * Expected Time: O(V + E * K)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
 * Output: 200
 */
function findCheapestPrice(n, flights, src, dst, k) {
  // Your implementation here
}

/**
 * Problem 18: Possible Bipartition
 * Check if graph can be bipartitioned.
 *
 * @param {number} n - Number of people
 * @param {number[][]} dislikes - Dislike pairs
 * @return {boolean} True if bipartition is possible
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
 * Output: true
 */
function possibleBipartition(n, dislikes) {
  // Your implementation here
}

/**
 * Problem 19: Find Eventual Safe States
 * Find eventual safe states in directed graph.
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
 * Problem 20: Closest Node in a Binary Search Tree
 * Find closest node in BST to target value.
 *
 * @param {TreeNode} root - BST root
 * @param {number} target - Target value
 * @return {TreeNode} Closest node
 *
 * Expected Time: O(H) where H is tree height
 * Expected Space: O(H)
 *
 * Example:
 * Input: root = [4,2,5,1,3], target = 3.714286
 * Output: 4
 */
function closestValue(root, target) {
  // Your implementation here
}

/**
 * Problem 21: Longest Path in a Directed Acyclic Graph
 * Find longest path in DAG.
 *
 * @param {number} n - Number of vertices
 * @param {number[][]} edges - Graph edges
 * @return {number} Length of longest path
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, edges = [[2,1],[3,1],[4,2],[4,3]]
 * Output: 3
 */
function longestPath(n, edges) {
  // Your implementation here
}

/**
 * Problem 22: Minimum Score of a Path Between Two Cities
 * Find minimum score of path between two cities.
 *
 * @param {number} n - Number of cities
 * @param {number[][]} roads - Road information
 * @return {number} Minimum score
 *
 * Expected Time: O(V + E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
 * Output: 5
 */
function minScore(n, roads) {
  // Your implementation here
}

/**
 * Problem 23: Find the City With the Smallest Number of Neighbors at a Threshold Distance
 * Find city with fewest reachable cities within threshold.
 *
 * @param {number} n - Number of cities
 * @param {number[][]} edges - Edge information
 * @param {number} distanceThreshold - Distance threshold
 * @return {number} City with fewest reachable cities
 *
 * Expected Time: O(V³) with Floyd-Warshall
 * Expected Space: O(V²)
 *
 * Example:
 * Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
 * Output: 3
 */
function findTheCity(n, edges, distanceThreshold) {
  // Your implementation here
}

/**
 * Problem 24: Minimum Time to Visit All Points
 * Calculate minimum time to visit all points.
 *
 * @param {number[][]} points - Array of points
 * @return {number} Minimum time required
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: points = [[1,1],[3,4],[-1,0]]
 * Output: 7
 */
function minTimeToVisitAllPoints(points) {
  // Your implementation here
}

/**
 * Problem 25: Find the Largest Value in Each Tree Row
 * Find largest value in each tree level.
 *
 * @param {TreeNode} root - Tree root
 * @return {number[]} Largest values per level
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: root = [1,3,2,5,3,null,9]
 * Output: [1,3,9]
 */
function largestValues(root) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Word Ladder II
 * Find all shortest transformation sequences.
 *
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - Word dictionary
 * @return {string[][]} All shortest sequences
 *
 * Expected Time: O(N * 26^L) where N is word list size, L is word length
 * Expected Space: O(N * 26^L)
 *
 * Example:
 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
 */
function findLadders(beginWord, endWord, wordList) {
  // Your implementation here
}

/**
 * Problem 27: Alien Dictionary
 * Determine order of alien alphabet.
 *
 * @param {string[]} words - Dictionary words
 * @return {string} Alphabet order
 *
 * Expected Time: O(V + E) where V is unique characters, E is ordering constraints
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: words = ["wrt","wrf","er","ett","rftt"]
 * Output: "wertf"
 */
function alienOrder(words) {
  // Your implementation here
}

/**
 * Problem 28: Reconstruct Itinerary
 * Reconstruct itinerary from tickets.
 *
 * @param {string[][]} tickets - Flight tickets
 * @return {string[]} Reconstructed itinerary
 *
 * Expected Time: O(E log E) where E is number of tickets
 * Expected Space: O(E)
 *
 * Example:
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 */
function findItinerary(tickets) {
  // Your implementation here
}

/**
 * Problem 29: Critical Connections in a Network
 * Find critical connections in network.
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
 * Problem 30: Find the Shortest Superstring
 * Find shortest superstring containing all words.
 *
 * @param {string[]} words - Input words
 * @return {string} Shortest superstring
 *
 * Expected Time: O(n² * 2^n)
 * Expected Space: O(n * 2^n)
 *
 * Example:
 * Input: words = ["alex","loves","leetcode"]
 * Output: "alexlovesleetcode"
 */
function shortestSuperstring(words) {
  // Your implementation here
}

/**
 * Problem 31: Constrained Subset Sum
 * Find if subset sum is possible with constraints.
 *
 * @param {number[]} nums - Input numbers
 * @param {number} k - Constraint parameter
 * @return {boolean} True if constrained subset sum exists
 *
 * Expected Time: O(n * k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: nums = [2,3,5,7], k = 12
 * Output: true
 */
function constrainedSubsetSum(nums, k) {
  // Your implementation here
}

/**
 * Problem 32: Find the Minimum Number of Colors Required to Color a Graph
 * Find chromatic number of graph.
 *
 * @param {number[][]} graph - Graph adjacency list
 * @return {number} Minimum colors needed
 *
 * Expected Time: O(V * E) for greedy approximation
 * Expected Space: O(V)
 *
 * Example:
 * Input: graph = [[1,2,3],[0,2,3],[0,1,3],[0,1,2]]
 * Output: 4
 */
function minColors(graph) {
  // Your implementation here
}

/**
 * Problem 33: Find the Maximum Flow in a Network
 * Find maximum flow in network.
 *
 * @param {number[][]} capacity - Capacity matrix
 * @param {number} source - Source vertex
 * @param {number} sink - Sink vertex
 * @return {number} Maximum flow
 *
 * Expected Time: O(V * E²) with Edmonds-Karp
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: capacity = [[0,16,13,0,0,0],[0,0,10,12,0,0],[0,4,0,0,14,0],[0,0,9,0,0,20],[0,0,0,7,0,4],[0,0,0,0,0,0]], source = 0, sink = 5
 * Output: 23
 */
function maxFlow(capacity, source, sink) {
  // Your implementation here
}

/**
 * Problem 34: Find the Minimum Cut in a Network
 * Find minimum cut between source and sink.
 *
 * @param {number[][]} capacity - Capacity matrix
 * @param {number} source - Source vertex
 * @param {number} sink - Sink vertex
 * @return {number} Minimum cut capacity
 *
 * Expected Time: O(V * E²) with max flow
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: capacity = [[0,3,0,3,0,0],[0,0,4,0,0,0],[0,0,0,1,2,0],[0,0,0,0,0,2],[0,0,0,0,0,3],[0,0,0,0,0,0]], source = 0, sink = 5
 * Output: 6
 */
function minCut(capacity, source, sink) {
  // Your implementation here
}

/**
 * Problem 35: Find the Maximum Bipartite Matching
 * Find maximum bipartite matching in graph.
 *
 * @param {number[][]} graph - Bipartite graph adjacency
 * @return {number} Maximum matching size
 *
 * Expected Time: O(V * E)
 * Expected Space: O(V + E)
 *
 * Example:
 * Input: graph = [[1,3],[2],[3],[]]
 * Output: 2
 */
function maxBipartiteMatching(graph) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Graph Coloring with Minimum Colors
 * Implement exact graph coloring algorithm.
 */
function graphColoringExact(graph) {
  // Your implementation here
}

/**
 * Bonus 2: Hamiltonian Path Detection
 * Detect if Hamiltonian path exists.
 */
function hasHamiltonianPath(graph) {
  // Your implementation here
}

/**
 * Bonus 3: Eulerian Circuit Detection
 * Detect if Eulerian circuit exists.
 */
function hasEulerianCircuit(graph) {
  // Your implementation here
}

/**
 * Bonus 4: Maximum Clique in Graph
 * Find maximum clique in graph.
 */
function maxClique(graph) {
  // Your implementation here
}

/**
 * Bonus 5: Graph Isomorphism
 * Check if two graphs are isomorphic.
 */
function areIsomorphic(graph1, graph2) {
  // Your implementation here
}

/**
 * Bonus 6: Minimum Steiner Tree
 * Find minimum Steiner tree for terminal vertices.
 */
function minSteinerTree(graph, terminals) {
  // Your implementation here
}

/**
 * Bonus 7: Graph Decomposition
 * Decompose graph into components.
 */
function decomposeGraph(graph) {
  // Your implementation here
}

/**
 * Bonus 8: Dynamic Programming on Trees
 * Solve tree DP problems.
 */
function treeDP(root, values) {
  // Your implementation here
}

/**
 * Bonus 9: Centroid Decomposition
 * Perform centroid decomposition of tree.
 */
function centroidDecomposition(tree) {
  // Your implementation here
}

/**
 * Bonus 10: Heavy-Light Decomposition
 * Perform heavy-light decomposition of tree.
 */
function heavyLightDecomposition(tree) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Graph Algorithms Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test number of islands
  console.log("Example - Number of Islands:");
  const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  console.log("Input: 4x4 grid with 3 islands");
  console.log("Expected: 3");
  console.log("Your result:", numIslands(grid));

  // Test clone graph
  console.log("\nExample - Clone Graph:");
  console.log("Input: adjacency list = [[2,4],[1,3],[2,4],[1,3]]");
  console.log("Expected: [[2,4],[1,3],[2,4],[1,3]]");
  // Note: This requires creating a Node class first
  console.log("Your result: [Manual testing required]");

  // Test flood fill
  console.log("\nExample - Flood Fill:");
  const image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ];
  console.log(
    "Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2"
  );
  console.log("Expected: [[2,2,2],[2,2,0],[2,0,1]]");
  console.log("Your result:", JSON.stringify(floodFill(image, 1, 1, 2)));

  // Test keys and rooms
  console.log("\nExample - Keys and Rooms:");
  console.log("Input: rooms = [[1],[2],[3],[]]");
  console.log("Expected: true");
  console.log("Your result:", canVisitAllRooms([[1], [2], [3], []]));

  // Test find judge
  console.log("\nExample - Find Town Judge:");
  console.log("Input: n = 3, trust = [[1,3],[2,3]]");
  console.log("Expected: 3");
  console.log(
    "Your result:",
    findJudge(3, [
      [1, 3],
      [2, 3],
    ])
  );

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

  // Test all paths source target
  console.log("\nExample - All Paths Source Target:");
  console.log("Input: graph = [[1,2],[3],[3],[4],[]]");
  console.log("Expected: [[0,1,3,4],[0,2,3,4]]");
  console.log(
    "Your result:",
    JSON.stringify(allPathsSourceTarget([[1, 2], [3], [3], [4], []]))
  );

  // Test find smallest set of vertices
  console.log("\nExample - Find Smallest Set of Vertices:");
  console.log("Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,5]]");
  console.log("Expected: [0,3]");
  console.log(
    "Your result:",
    JSON.stringify(
      findSmallestSetOfVertices(6, [
        [0, 1],
        [0, 2],
        [2, 5],
        [3, 4],
        [4, 5],
      ])
    )
  );

  // Test reverse graph
  console.log("\nExample - Reverse Graph:");
  console.log("Input: graph = [[1,0],[2,0],[3,1],[3,2]]");
  console.log("Expected: [[0,1,2],[0,1,2],[0,3],[3]]");
  console.log(
    "Your result:",
    JSON.stringify(
      reverseGraph([
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ])
    )
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

  // Test course schedule
  console.log("\nExample - Course Schedule:");
  console.log("Input: numCourses = 2, prerequisites = [[1,0]]");
  console.log("Expected: true");
  console.log("Your result:", canFinish(2, [[1, 0]]));

  // Test count components
  console.log("\nExample - Count Components:");
  console.log("Input: n = 5, edges = [[0,1],[1,2],[3,4]]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    countComponents(5, [
      [0, 1],
      [1, 2],
      [3, 4],
    ])
  );

  // Test redundant connection
  console.log("\nExample - Redundant Connection:");
  console.log("Input: edges = [[1,2],[1,3],[2,3]]");
  console.log("Expected: [2,3]");
  console.log(
    "Your result:",
    JSON.stringify(
      findRedundantConnection([
        [1, 2],
        [1, 3],
        [2, 3],
      ])
    )
  );

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

  // Test cheapest price
  console.log("\nExample - Cheapest Price:");
  console.log(
    "Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1"
  );
  console.log("Expected: 200");
  console.log(
    "Your result:",
    findCheapestPrice(
      3,
      [
        [0, 1, 100],
        [1, 2, 100],
        [0, 2, 500],
      ],
      0,
      2,
      1
    )
  );

  // Test possible bipartition
  console.log("\nExample - Possible Bipartition:");
  console.log("Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]");
  console.log("Expected: true");
  console.log(
    "Your result:",
    possibleBipartition(4, [
      [1, 2],
      [1, 3],
      [2, 4],
    ])
  );

  // Test eventual safe nodes
  console.log("\nExample - Eventual Safe Nodes:");
  console.log("Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]");
  console.log("Expected: [2,4,5,6]");
  console.log(
    "Your result:",
    JSON.stringify(eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []]))
  );

  // Test longest path
  console.log("\nExample - Longest Path:");
  console.log("Input: n = 4, edges = [[2,1],[3,1],[4,2],[4,3]]");
  console.log("Expected: 3");
  console.log(
    "Your result:",
    longestPath(4, [
      [2, 1],
      [3, 1],
      [4, 2],
      [4, 3],
    ])
  );

  // Test min score
  console.log("\nExample - Min Score:");
  console.log("Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]");
  console.log("Expected: 5");
  console.log(
    "Your result:",
    minScore(4, [
      [1, 2, 9],
      [2, 3, 6],
      [2, 4, 5],
      [1, 4, 7],
    ])
  );

  // Test find the city
  console.log("\nExample - Find the City:");
  console.log(
    "Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4"
  );
  console.log("Expected: 3");
  console.log(
    "Your result:",
    findTheCity(
      4,
      [
        [0, 1, 3],
        [1, 2, 1],
        [1, 3, 4],
        [2, 3, 1],
      ],
      4
    )
  );

  // Test min time to visit all points
  console.log("\nExample - Min Time to Visit All Points:");
  console.log("Input: points = [[1,1],[3,4],[-1,0]]");
  console.log("Expected: 7");
  console.log(
    "Your result:",
    minTimeToVisitAllPoints([
      [1, 1],
      [3, 4],
      [-1, 0],
    ])
  );

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding graph representations and traversals");
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

// Graph pattern detector
function detectGraphPattern(problem) {
  const patterns = {
    traversal: ["traversal", "search", "bfs", "dfs", "visit"],
    shortest_path: ["shortest", "path", "distance", "minimum"],
    connected_components: ["connected", "components", "islands", "regions"],
    topological: ["topological", "order", "schedule", "prerequisite"],
    mst: ["minimum", "spanning", "tree", "mst"],
    flow: ["flow", "network", "capacity", "max flow"],
    bipartite: ["bipartite", "color", "two-color"],
    cycle: ["cycle", "circular", "loop"],
    clique: ["clique", "complete", "subgraph"],
    matching: ["matching", "pair", "assign"],
  };

  const problemStr = problem.toLowerCase();

  for (const [pattern, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (problemStr.includes(keyword)) {
        return pattern;
      }
    }
  }

  return "unknown";
}

// Graph complexity analyzer
function analyzeGraphComplexity(func, args) {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();

  return {
    result,
    time: end - start,
    memory: process.memoryUsage().heapUsed,
    graphComplexity: estimateGraphComplexity(args),
  };
}

function estimateGraphComplexity(args) {
  // Analyze graph size from arguments
  let vertices = 0,
    edges = 0;

  for (const arg of args) {
    if (Array.isArray(arg)) {
      if (arg.length > 0 && Array.isArray(arg[0])) {
        // Edge list format
        edges = arg.length;
        vertices = Math.max(...arg.flat()) + 1;
      } else if (arg.length > 0 && typeof arg[0] === "object") {
        // Graph object
        vertices = arg.getVertexCount ? arg.getVertexCount() : 0;
        edges = arg.getEdgeCount ? arg.getEdgeCount() : 0;
      } else {
        // Simple array
        vertices = Math.max(vertices, arg.length);
      }
    }
  }

  return {
    vertices,
    edges,
    estimatedComplexity: `O(${vertices} + ${edges})`,
  };
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  numIslands,
  cloneGraph,
  floodFill,
  canVisitAllRooms,
  findJudge,
  validPath,
  allPathsSourceTarget,
  findSmallestSetOfVertices,
  reverseGraph,
  findCenter,

  // Medium problems
  canFinish,
  pacificAtlantic,
  countComponents,
  solve,
  findRedundantConnection,
  networkDelayTime,
  findCheapestPrice,
  possibleBipartition,
  eventualSafeNodes,
  closestValue,
  longestPath,
  minScore,
  findTheCity,
  minTimeToVisitAllPoints,
  largestValues,

  // Hard problems
  findLadders,
  alienOrder,
  findItinerary,
  criticalConnections,
  shortestSuperstring,
  constrainedSubsetSum,
  minColors,
  maxFlow,
  minCut,
  maxBipartiteMatching,

  // Bonus challenges
  graphColoringExact,
  hasHamiltonianPath,
  hasEulerianCircuit,
  maxClique,
  areIsomorphic,
  minSteinerTree,
  decomposeGraph,
  treeDP,
  centroidDecomposition,
  heavyLightDecomposition,

  // Utilities
  testFunction,
  detectGraphPattern,
  analyzeGraphComplexity,
};
