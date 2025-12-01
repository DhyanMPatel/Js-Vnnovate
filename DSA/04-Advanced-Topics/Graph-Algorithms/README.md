# 🕸️ Graph Algorithms

> **Mastering Network Structures and Traversal Techniques**

## 📋 Table of Contents

- [What are Graph Algorithms?](#what-are-graph-algorithms)
- [Graph Fundamentals](#graph-fundamentals)
- [Graph Representations](#graph-representations)
- [Graph Traversal](#graph-traversal)
- [Shortest Path Algorithms](#shortest-path-algorithms)
- [Minimum Spanning Tree](#minimum-spanning-tree)
- [Advanced Graph Algorithms](#advanced-graph-algorithms)
- [Graph Applications](#graph-applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Graph Algorithms?

### Definition

Graph algorithms are techniques for solving problems on graph data structures, which consist of vertices (nodes) connected by edges. These algorithms are fundamental for solving network-related problems, optimization tasks, and relationship analysis.

### Real-World Analogy

```javascript
// Think of graphs like social networks:
// People are vertices, friendships are edges
// Algorithms help find connections, shortest paths, communities

const socialNetwork = {
  vertices: ["Alice", "Bob", "Charlie", "David"],
  edges: [
    ["Alice", "Bob"], // Friends
    ["Bob", "Charlie"], // Friends
    ["Alice", "David"], // Friends
    ["Charlie", "David"], // Friends
  ],
};

// Find shortest friend connection path
function shortestFriendPath(network, start, end) {
  // BFS finds shortest path in unweighted graphs
  return bfs(network, start, end);
}
```

### Why Graph Algorithms Matter

- **Network Analysis**: Social networks, computer networks, transportation
- **Optimization**: Shortest paths, minimum spanning trees, flow problems
- **Relationship Modeling**: Dependencies, hierarchies, connections
- **Real-World Applications**: GPS navigation, recommendation systems, logistics

## 🔍 Graph Fundamentals

### Graph Types

#### 1. Undirected vs Directed

```javascript
// Undirected graph: edges have no direction
const undirectedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["B", "C"],
    ["A", "C"],
  ], // Bidirectional
};

// Directed graph: edges have direction
const directedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["B", "C"],
  ], // A→B→C, not C→B or B→A
};
```

#### 2. Weighted vs Unweighted

```javascript
// Unweighted graph: all edges have equal weight
const unweightedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["B", "C"],
  ],
};

// Weighted graph: edges have different weights
const weightedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B", 5], // Edge A-B with weight 5
    ["B", "C", 3], // Edge B-C with weight 3
  ],
};
```

#### 3. Special Graph Types

```javascript
// Tree: Connected acyclic graph
const tree = {
  vertices: ["A", "B", "C", "D"],
  edges: [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
  ],
};

// Complete graph: Every vertex connected to every other
const completeGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["A", "C"],
    ["B", "C"],
  ],
};

// Bipartite graph: Vertices can be divided into two independent sets
const bipartiteGraph = {
  vertices: ["A", "B", "C", "D"],
  edges: [
    ["A", "C"],
    ["A", "D"],
    ["B", "C"],
    ["B", "D"],
  ],
  partitions: [
    ["A", "B"],
    ["C", "D"],
  ],
};
```

### Graph Properties

| Property        | Description                           | Example                                          |
| --------------- | ------------------------------------- | ------------------------------------------------ |
| **Connected**   | Path exists between any two vertices  | Social network where everyone can reach everyone |
| **Acyclic**     | No cycles in the graph                | Family tree (no incest)                          |
| **Complete**    | Every vertex connected to every other | Small group where everyone knows everyone        |
| **Bipartite**   | Vertices divisible into two sets      | Employer-employee relationships                  |
| **Eulerian**    | Path uses every edge exactly once     | Mail delivery route                              |
| **Hamiltonian** | Path visits every vertex exactly once | Traveling salesman problem                       |

## 📊 Graph Representations

### 1. Adjacency List

```javascript
/**
 * Adjacency List Representation
 * Space: O(V + E)
 * Good for sparse graphs
 */
class AdjacencyList {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjList.get(vertex1).push({ vertex: vertex2, weight });

    // For undirected graphs
    this.adjList.get(vertex2).push({ vertex: vertex1, weight });
  }

  getNeighbors(vertex) {
    return this.adjList.get(vertex) || [];
  }

  getVertices() {
    return Array.from(this.adjList.keys());
  }
}

// Example usage
const graph = new AdjacencyList();
graph.addEdge("A", "B", 5);
graph.addEdge("B", "C", 3);
graph.addEdge("A", "C", 2);

console.log(graph.getNeighbors("A")); // [{vertex: 'B', weight: 5}, {vertex: 'C', weight: 2}]
```

### 2. Adjacency Matrix

```javascript
/**
 * Adjacency Matrix Representation
 * Space: O(V²)
 * Good for dense graphs, constant time edge lookup
 */
class AdjacencyMatrix {
  constructor(size) {
    this.size = size;
    this.matrix = new Array(size).fill(null).map(() => new Array(size).fill(0));
    this.vertices = new Array(size).fill(null);
  }

  addVertex(vertex, index) {
    this.vertices[index] = vertex;
  }

  addEdge(vertex1, vertex2, weight = 1) {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 !== -1 && index2 !== -1) {
      this.matrix[index1][index2] = weight;
      this.matrix[index2][index1] = weight; // For undirected graphs
    }
  }

  getEdgeWeight(vertex1, vertex2) {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    return index1 !== -1 && index2 !== -1 ? this.matrix[index1][index2] : 0;
  }

  areConnected(vertex1, vertex2) {
    return this.getEdgeWeight(vertex1, vertex2) > 0;
  }
}

// Example usage
const matrixGraph = new AdjacencyMatrix(3);
matrixGraph.addVertex("A", 0);
matrixGraph.addVertex("B", 1);
matrixGraph.addVertex("C", 2);
matrixGraph.addEdge("A", "B", 5);
matrixGraph.addEdge("B", "C", 3);
```

### 3. Edge List

```javascript
/**
 * Edge List Representation
 * Space: O(E)
 * Simple but inefficient for most operations
 */
class EdgeList {
  constructor() {
    this.edges = [];
    this.vertices = new Set();
  }

  addVertex(vertex) {
    this.vertices.add(vertex);
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.vertices.add(vertex1);
    this.vertices.add(vertex2);

    this.edges.push({ from: vertex1, to: vertex2, weight });
  }

  getEdges() {
    return this.edges;
  }

  getVertices() {
    return Array.from(this.vertices);
  }
}
```

## 🔍 Graph Traversal

### 1. Breadth-First Search (BFS)

```javascript
/**
 * Breadth-First Search
 * Time: O(V + E)
 * Space: O(V) for queue + visited set
 *
 * Applications:
 * - Shortest path in unweighted graphs
 * - Level-order traversal
 * - Connected components
 */
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const neighbor of graph.getNeighbors(current)) {
      if (!visited.has(neighbor.vertex)) {
        visited.add(neighbor.vertex);
        queue.push(neighbor.vertex);
      }
    }
  }

  return result;
}

/**
 * BFS with Path Reconstruction
 * Find shortest path from start to target
 */
function bfsShortestPath(graph, start, target) {
  const visited = new Set();
  const queue = [{ vertex: start, path: [start] }];
  visited.add(start);

  while (queue.length > 0) {
    const { vertex, path } = queue.shift();

    if (vertex === target) {
      return path;
    }

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor.vertex)) {
        visited.add(neighbor.vertex);
        queue.push({
          vertex: neighbor.vertex,
          path: [...path, neighbor.vertex],
        });
      }
    }
  }

  return null; // No path found
}

/**
 * BFS for Connected Components
 * Find all connected components in undirected graph
 */
function findConnectedComponents(graph) {
  const visited = new Set();
  const components = [];

  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      const component = [];
      const queue = [vertex];
      visited.add(vertex);

      while (queue.length > 0) {
        const current = queue.shift();
        component.push(current);

        for (const neighbor of graph.getNeighbors(current)) {
          if (!visited.has(neighbor.vertex)) {
            visited.add(neighbor.vertex);
            queue.push(neighbor.vertex);
          }
        }
      }

      components.push(component);
    }
  }

  return components;
}
```

### 2. Depth-First Search (DFS)

```javascript
/**
 * Depth-First Search (Recursive)
 * Time: O(V + E)
 * Space: O(V) for recursion stack + visited set
 *
 * Applications:
 * - Topological sorting
 * - Cycle detection
 * - Path finding
 * - Maze solving
 */
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];

  for (const neighbor of graph.getNeighbors(start)) {
    if (!visited.has(neighbor.vertex)) {
      result.push(...dfs(graph, neighbor.vertex, visited));
    }
  }

  return result;
}

/**
 * DFS (Iterative)
 * Uses explicit stack instead of recursion
 */
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);

      // Add neighbors to stack (reverse order for consistent traversal)
      const neighbors = graph.getNeighbors(current);
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i].vertex)) {
          stack.push(neighbors[i].vertex);
        }
      }
    }
  }

  return result;
}

/**
 * DFS with Path Reconstruction
 * Find path from start to target
 */
function dfsPath(graph, start, target, visited = new Set(), path = []) {
  visited.add(start);
  path.push(start);

  if (start === target) {
    return path;
  }

  for (const neighbor of graph.getNeighbors(start)) {
    if (!visited.has(neighbor.vertex)) {
      const result = dfsPath(graph, neighbor.vertex, target, visited, path);
      if (result) return result;
    }
  }

  path.pop(); // Backtrack
  return null;
}

/**
 * DFS for Cycle Detection
 * Detect cycles in undirected graph
 */
function hasCycle(graph) {
  const visited = new Set();

  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      if (dfsCycleUtil(graph, vertex, -1, visited)) {
        return true;
      }
    }
  }

  return false;
}

function dfsCycleUtil(graph, vertex, parent, visited) {
  visited.add(vertex);

  for (const neighbor of graph.getNeighbors(vertex)) {
    if (!visited.has(neighbor.vertex)) {
      if (dfsCycleUtil(graph, neighbor.vertex, vertex, visited)) {
        return true;
      }
    } else if (neighbor.vertex !== parent) {
      // Found a back edge (cycle)
      return true;
    }
  }

  return false;
}
```

### 3. Topological Sort

```javascript
/**
 * Topological Sort (DFS-based)
 * Time: O(V + E)
 * Space: O(V)
 *
 * Applications:
 * - Task scheduling
 * - Build order dependencies
 * - Course prerequisites
 */
function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      topologicalSortUtil(graph, vertex, visited, stack);
    }
  }

  return stack.reverse(); // Reverse to get correct order
}

function topologicalSortUtil(graph, vertex, visited, stack) {
  visited.add(vertex);

  for (const neighbor of graph.getNeighbors(vertex)) {
    if (!visited.has(neighbor.vertex)) {
      topologicalSortUtil(graph, neighbor.vertex, visited, stack);
    }
  }

  stack.push(vertex);
}

/**
 * Topological Sort (Kahn's Algorithm - BFS-based)
 */
function topologicalSortKahn(graph) {
  const inDegree = new Map();
  const queue = [];
  const result = [];

  // Initialize in-degrees
  for (const vertex of graph.getVertices()) {
    inDegree.set(vertex, 0);
  }

  // Calculate in-degrees
  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) + 1);
    }
  }

  // Find vertices with no incoming edges
  for (const [vertex, degree] of inDegree) {
    if (degree === 0) {
      queue.push(vertex);
    }
  }

  // Process vertices
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const neighbor of graph.getNeighbors(current)) {
      inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) - 1);

      if (inDegree.get(neighbor.vertex) === 0) {
        queue.push(neighbor.vertex);
      }
    }
  }

  // Check if topological sort exists (no cycles)
  return result.length === graph.getVertices().length ? result : null;
}
```

## 🛣️ Shortest Path Algorithms

### 1. Dijkstra's Algorithm

```javascript
/**
 * Dijkstra's Algorithm
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 *
 * Requirements:
 * - Non-negative edge weights
 * - Single source shortest paths
 *
 * Applications:
 * - GPS navigation
 * - Network routing
 * - Game pathfinding
 */
function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const previous = new Map();
  const minHeap = new MinHeap();

  // Initialize distances
  for (const vertex of graph.getVertices()) {
    distances.set(vertex, vertex === start ? 0 : Infinity);
    previous.set(vertex, null);
  }

  minHeap.insert({ vertex: start, distance: 0 });

  while (!minHeap.isEmpty()) {
    const { vertex, distance } = minHeap.extractMin();

    if (visited.has(vertex)) continue;
    visited.add(vertex);

    // Update distances to neighbors
    for (const neighbor of graph.getNeighbors(vertex)) {
      const altDistance = distance + neighbor.weight;

      if (altDistance < distances.get(neighbor.vertex)) {
        distances.set(neighbor.vertex, altDistance);
        previous.set(neighbor.vertex, vertex);
        minHeap.insert({ vertex: neighbor.vertex, distance: altDistance });
      }
    }
  }

  return { distances, previous };
}

/**
 * Reconstruct shortest path using previous map
 */
function reconstructPath(previous, start, target) {
  const path = [];
  let current = target;

  while (current !== null) {
    path.unshift(current);
    current = previous.get(current);
  }

  return path[0] === start ? path : null;
}

/**
 * Dijkstra with Path Reconstruction
 */
function dijkstraWithPath(graph, start, target) {
  const { distances, previous } = dijkstra(graph, start);
  const path = reconstructPath(previous, start, target);

  return {
    distance: distances.get(target),
    path,
    exists: path !== null,
  };
}
```

### 2. Bellman-Ford Algorithm

```javascript
/**
 * Bellman-Ford Algorithm
 * Time: O(V * E)
 * Space: O(V)
 *
 * Capabilities:
 * - Handles negative edge weights
 * - Detects negative cycles
 * - Single source shortest paths
 *
 * Applications:
 * - Currency arbitrage
 * - Network routing with negative costs
 * - Constraint satisfaction
 */
function bellmanFord(graph, start) {
  const distances = new Map();
  const previous = new Map();

  // Initialize distances
  for (const vertex of graph.getVertices()) {
    distances.set(vertex, vertex === start ? 0 : Infinity);
    previous.set(vertex, null);
  }

  // Relax edges V-1 times
  for (let i = 0; i < graph.getVertices().length - 1; i++) {
    for (const vertex of graph.getVertices()) {
      for (const neighbor of graph.getNeighbors(vertex)) {
        const currentDistance = distances.get(vertex);
        const newDistance = currentDistance + neighbor.weight;

        if (
          currentDistance !== Infinity &&
          newDistance < distances.get(neighbor.vertex)
        ) {
          distances.set(neighbor.vertex, newDistance);
          previous.set(neighbor.vertex, vertex);
        }
      }
    }
  }

  // Check for negative cycles
  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      const currentDistance = distances.get(vertex);
      const newDistance = currentDistance + neighbor.weight;

      if (
        currentDistance !== Infinity &&
        newDistance < distances.get(neighbor.vertex)
      ) {
        throw new Error("Graph contains negative cycle");
      }
    }
  }

  return { distances, previous };
}
```

### 3. Floyd-Warshall Algorithm

```javascript
/**
 * Floyd-Warshall Algorithm
 * Time: O(V³)
 * Space: O(V²)
 *
 * Capabilities:
 * - All pairs shortest paths
 * - Handles negative weights (no negative cycles)
 * - Path reconstruction
 *
 * Applications:
 * - Network analysis
 * - Routing tables
 * - Transitive closure
 */
function floydWarshall(graph) {
  const vertices = graph.getVertices();
  const n = vertices.length;
  const distance = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(Infinity));
  const next = new Array(n).fill(null).map(() => new Array(n).fill(null));

  // Initialize distance matrix
  for (let i = 0; i < n; i++) {
    distance[i][i] = 0;

    for (const neighbor of graph.getNeighbors(vertices[i])) {
      const j = vertices.indexOf(neighbor.vertex);
      distance[i][j] = neighbor.weight;
      next[i][j] = j;
    }
  }

  // Floyd-Warshall main algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (distance[i][k] + distance[k][j] < distance[i][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  return { distance, next };
}

/**
 * Reconstruct path from Floyd-Warshall result
 */
function floydWarshallPath(vertices, next, from, to) {
  const fromIndex = vertices.indexOf(from);
  const toIndex = vertices.indexOf(to);

  if (next[fromIndex][toIndex] === null) {
    return null; // No path exists
  }

  const path = [from];
  let current = fromIndex;

  while (current !== toIndex) {
    current = next[current][toIndex];
    path.push(vertices[current]);
  }

  return path;
}
```

### 4. A\* Search Algorithm

```javascript
/**
 * A* Search Algorithm
 * Time: O(b^d) where b is branching factor, d is depth
 * Space: O(b^d)
 *
 * Requirements:
 * - Heuristic function h(n)
 * - Admissible heuristic (never overestimates)
 *
 * Applications:
 * - Game pathfinding
 * - Robot navigation
 * - Puzzle solving
 */
function aStar(graph, start, goal, heuristic) {
  const openSet = new MinHeap();
  const closedSet = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const previous = new Map();

  // Initialize scores
  for (const vertex of graph.getVertices()) {
    gScore.set(vertex, Infinity);
    fScore.set(vertex, Infinity);
  }

  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));
  openSet.insert({ vertex: start, fScore: fScore.get(start) });

  while (!openSet.isEmpty()) {
    const current = openSet.extractMin().vertex;

    if (current === goal) {
      return reconstructPath(previous, start, goal);
    }

    closedSet.add(current);

    for (const neighbor of graph.getNeighbors(current)) {
      if (closedSet.has(neighbor.vertex)) continue;

      const tentativeGScore = gScore.get(current) + neighbor.weight;

      if (tentativeGScore < gScore.get(neighbor.vertex)) {
        previous.set(neighbor.vertex, current);
        gScore.set(neighbor.vertex, tentativeGScore);
        fScore.set(
          neighbor.vertex,
          tentativeGScore + heuristic(neighbor.vertex, goal)
        );

        if (!openSet.contains(neighbor.vertex)) {
          openSet.insert({
            vertex: neighbor.vertex,
            fScore: fScore.get(neighbor.vertex),
          });
        }
      }
    }
  }

  return null; // No path found
}

/**
 * Example heuristic for grid-based graphs
 */
function manhattanDistance(node1, node2) {
  const [x1, y1] = node1.split("-").map(Number);
  const [x2, y2] = node2.split("-").map(Number);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
```

## 🌳 Minimum Spanning Tree

### 1. Prim's Algorithm

```javascript
/**
 * Prim's Algorithm
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
 *
 * Applications:
 * - Network design
 * - Circuit design
 * - Clustering algorithms
 */
function primMST(graph) {
  const mst = new Set();
  const visited = new Set();
  const minHeap = new MinHeap();
  const start = graph.getVertices()[0];

  // Add all edges from start vertex
  for (const neighbor of graph.getNeighbors(start)) {
    minHeap.insert({
      from: start,
      to: neighbor.vertex,
      weight: neighbor.weight,
    });
  }

  visited.add(start);

  while (!minHeap.isEmpty() && mst.size < graph.getVertices().length - 1) {
    const edge = minHeap.extractMin();

    if (!visited.has(edge.to)) {
      mst.add(edge);
      visited.add(edge.to);

      // Add edges from new vertex
      for (const neighbor of graph.getNeighbors(edge.to)) {
        if (!visited.has(neighbor.vertex)) {
          minHeap.insert({
            from: edge.to,
            to: neighbor.vertex,
            weight: neighbor.weight,
          });
        }
      }
    }
  }

  return mst;
}
```

### 2. Kruskal's Algorithm

```javascript
/**
 * Kruskal's Algorithm
 * Time: O(E log E) for sorting
 * Space: O(V + E)
 *
 * Applications:
 * - Network design
 * - Image segmentation
 * - Clustering
 */
function kruskalMST(graph) {
  const edges = [];
  const vertices = graph.getVertices();

  // Collect all edges
  for (const vertex of vertices) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (vertices.indexOf(vertex) < vertices.indexOf(neighbor.vertex)) {
        edges.push({
          from: vertex,
          to: neighbor.vertex,
          weight: neighbor.weight,
        });
      }
    }
  }

  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  const mst = [];
  const dsu = new DisjointSetUnion(vertices);

  for (const edge of edges) {
    if (dsu.find(edge.from) !== dsu.find(edge.to)) {
      mst.push(edge);
      dsu.union(edge.from, edge.to);

      if (mst.length === vertices.length - 1) break;
    }
  }

  return mst;
}

/**
 * Disjoint Set Union (Union-Find) for Kruskal's Algorithm
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
```

## 🚀 Advanced Graph Algorithms

### 1. Strongly Connected Components (Kosaraju's Algorithm)

```javascript
/**
 * Kosaraju's Algorithm for Strongly Connected Components
 * Time: O(V + E)
 * Space: O(V)
 *
 * Applications:
 * - Social network analysis
 * - Web crawling
 * - Compiler optimization
 */
function kosarajuSCC(graph) {
  const vertices = graph.getVertices();
  const visited = new Set();
  const stack = [];

  // First DFS to fill stack
  for (const vertex of vertices) {
    if (!visited.has(vertex)) {
      dfsFillStack(graph, vertex, visited, stack);
    }
  }

  // Transpose the graph
  const transposedGraph = transposeGraph(graph);

  // Second DFS on transposed graph
  visited.clear();
  const sccs = [];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      const scc = [];
      dfsOnTransposed(transposedGraph, vertex, visited, scc);
      sccs.push(scc);
    }
  }

  return sccs;
}

function dfsFillStack(graph, vertex, visited, stack) {
  visited.add(vertex);

  for (const neighbor of graph.getNeighbors(vertex)) {
    if (!visited.has(neighbor.vertex)) {
      dfsFillStack(graph, neighbor.vertex, visited, stack);
    }
  }

  stack.push(vertex);
}

function dfsOnTransposed(graph, vertex, visited, scc) {
  visited.add(vertex);
  scc.push(vertex);

  for (const neighbor of graph.getNeighbors(vertex)) {
    if (!visited.has(neighbor.vertex)) {
      dfsOnTransposed(graph, neighbor.vertex, visited, scc);
    }
  }
}

function transposeGraph(graph) {
  const transposed = new AdjacencyList();

  for (const vertex of graph.getVertices()) {
    transposed.addVertex(vertex);
  }

  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      transposed.addEdge(neighbor.vertex, vertex, neighbor.weight);
    }
  }

  return transposed;
}
```

### 2. Bipartite Graph Check

```javascript
/**
 * Check if graph is bipartite using BFS
 * Time: O(V + E)
 * Space: O(V)
 *
 * Applications:
 * - Graph coloring
 * - Matching problems
 * - Conflict detection
 */
function isBipartite(graph) {
  const colors = new Map(); // 0 or 1

  for (const vertex of graph.getVertices()) {
    if (!colors.has(vertex)) {
      if (!bfsColoring(graph, vertex, colors)) {
        return false;
      }
    }
  }

  return true;
}

function bfsColoring(graph, start, colors) {
  const queue = [start];
  colors.set(start, 0);

  while (queue.length > 0) {
    const current = queue.shift();

    for (const neighbor of graph.getNeighbors(current)) {
      if (!colors.has(neighbor.vertex)) {
        colors.set(neighbor.vertex, 1 - colors.get(current));
        queue.push(neighbor.vertex);
      } else if (colors.get(neighbor.vertex) === colors.get(current)) {
        return false; // Found odd cycle
      }
    }
  }

  return true;
}
```

### 3. Maximum Flow (Ford-Fulkerson Algorithm)

```javascript
/**
 * Ford-Fulkerson Algorithm for Maximum Flow
 * Time: O(E * max_flow) with DFS augmenting paths
 * Space: O(V + E)
 *
 * Applications:
 * - Network flow
 * - Bipartite matching
 * - Resource allocation
 */
function fordFulkerson(graph, source, sink) {
  const residualGraph = createResidualGraph(graph);
  let maxFlow = 0;

  while (true) {
    const path = findAugmentingPath(residualGraph, source, sink);

    if (!path) break; // No more augmenting paths

    // Find bottleneck capacity
    let bottleneck = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      const capacity = getEdgeCapacity(residualGraph, from, to);
      bottleneck = Math.min(bottleneck, capacity);
    }

    // Update residual capacities
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      updateResidualCapacity(residualGraph, from, to, bottleneck);
    }

    maxFlow += bottleneck;
  }

  return maxFlow;
}

function createResidualGraph(graph) {
  // Create residual graph with forward and backward edges
  const residual = new AdjacencyList();

  for (const vertex of graph.getVertices()) {
    residual.addVertex(vertex);
  }

  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      // Forward edge with capacity
      residual.addEdge(vertex, neighbor.vertex, neighbor.weight);
      // Backward edge with 0 capacity (if not exists)
      if (!hasEdge(residual, neighbor.vertex, vertex)) {
        residual.addEdge(neighbor.vertex, vertex, 0);
      }
    }
  }

  return residual;
}

function findAugmentingPath(graph, source, sink) {
  // Use DFS to find path from source to sink
  const visited = new Set();
  const path = [];

  function dfs(current) {
    if (current === sink) {
      return true;
    }

    visited.add(current);

    for (const neighbor of graph.getNeighbors(current)) {
      if (!visited.has(neighbor.vertex) && neighbor.weight > 0) {
        path.push(neighbor.vertex);
        if (dfs(neighbor.vertex)) {
          return true;
        }
        path.pop();
      }
    }

    return false;
  }

  path.push(source);
  return dfs(source) ? path : null;
}
```

## 🌐 Graph Applications

### 1. Social Network Analysis

```javascript
/**
 * Find friends of friends (2-degree connections)
 */
function friendsOfFriends(socialGraph, user) {
  const friends = new Set();
  const friendsOfFriends = new Set();

  // Get direct friends
  for (const neighbor of socialGraph.getNeighbors(user)) {
    friends.add(neighbor.vertex);
  }

  // Get friends of friends
  for (const friend of friends) {
    for (const neighbor of socialGraph.getNeighbors(friend)) {
      if (neighbor.vertex !== user && !friends.has(neighbor.vertex)) {
        friendsOfFriends.add(neighbor.vertex);
      }
    }
  }

  return Array.from(friendsOfFriends);
}

/**
 * Find shortest connection path between two users
 */
function findConnectionPath(socialGraph, user1, user2) {
  return bfsShortestPath(socialGraph, user1, user2);
}

/**
 * Detect communities using connected components
 */
function findCommunities(socialGraph) {
  return findConnectedComponents(socialGraph);
}
```

### 2. Network Routing

```javascript
/**
 * Find shortest routing path
 */
function findRoutingPath(networkGraph, source, destination) {
  return dijkstraWithPath(networkGraph, source, destination);
}

/**
 * Find alternative routes (second shortest path)
 */
function findAlternativeRoutes(graph, source, target) {
  const primaryPath = dijkstraWithPath(graph, source, target);

  if (!primaryPath.exists) return [];

  // Remove edges from primary path and find alternatives
  const alternatives = [];

  for (let i = 0; i < primaryPath.path.length - 1; i++) {
    const from = primaryPath.path[i];
    const to = primaryPath.path[i + 1];

    // Temporarily remove edge
    const edgeWeight = getEdgeWeight(graph, from, to);
    removeEdge(graph, from, to);

    const alternative = dijkstraWithPath(graph, source, target);

    if (alternative.exists) {
      alternatives.push({
        path: alternative.path,
        distance: alternative.distance,
      });
    }

    // Restore edge
    addEdge(graph, from, to, edgeWeight);
  }

  return alternatives;
}
```

### 3. Game Development

```javascript
/**
 * Grid-based pathfinding for games
 */
class GameGrid {
  constructor(width, height, obstacles = []) {
    this.width = width;
    this.height = height;
    this.obstacles = new Set(obstacles);
    this.graph = this.buildGraph();
  }

  buildGraph() {
    const graph = new AdjacencyList();

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const node = `${x}-${y}`;

        if (!this.obstacles.has(node)) {
          graph.addVertex(node);

          // Add edges to adjacent cells
          const neighbors = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
              const neighbor = `${nx}-${ny}`;
              if (!this.obstacles.has(neighbor)) {
                graph.addEdge(node, neighbor, 1);
              }
            }
          }
        }
      }
    }

    return graph;
  }

  findPath(start, goal) {
    return aStar(this.graph, start, goal, manhattanDistance);
  }
}
```

## 💡 Graph Algorithm Selection Guide

### Problem Type → Algorithm

| Problem Type                         | Best Algorithm | When to Use                          |
| ------------------------------------ | -------------- | ------------------------------------ |
| **Shortest Path (Unweighted)**       | BFS            | Unweighted graphs, single source     |
| **Shortest Path (Weighted)**         | Dijkstra       | Non-negative weights, single source  |
| **Shortest Path (Negative Weights)** | Bellman-Ford   | Negative weights, cycle detection    |
| **All Pairs Shortest Path**          | Floyd-Warshall | Dense graphs, all pairs needed       |
| **Pathfinding with Heuristic**       | A\*            | Grid-based, good heuristic available |
| **Minimum Spanning Tree**            | Prim/Kruskal   | Connected undirected graph           |
| **Topological Sort**                 | DFS/Kahn       | DAG, dependency ordering             |
| **Strongly Connected Components**    | Kosaraju       | Directed graph, cycles analysis      |
| **Maximum Flow**                     | Ford-Fulkerson | Network flow problems                |
| **Bipartite Check**                  | BFS Coloring   | Two-coloring problems                |

### Graph Size Considerations

| Graph Size               | Recommended Approach                          |
| ------------------------ | --------------------------------------------- |
| **Small (V < 100)**      | Any algorithm works, focus on simplicity      |
| **Medium (V < 10,000)**  | Use efficient data structures, consider space |
| **Large (V > 10,000)**   | Priority queues, sparse representations       |
| **Huge (V > 1,000,000)** | External algorithms, approximation            |

## 🚨 Common Graph Algorithm Mistakes to Avoid

### Mistake 1: Wrong Graph Representation

```javascript
// ❌ Wrong: Using adjacency matrix for sparse graph
const sparseMatrix = new AdjacencyMatrix(10000); // Wastes memory

// ✅ Correct: Use adjacency list for sparse graphs
const sparseList = new AdjacencyList(); // Efficient memory usage
```

### Mistake 2: Not Handling Edge Cases

```javascript
// ❌ Wrong: No null checks
function wrongBFS(graph, start) {
  if (!graph.hasVertex(start)) return []; // Missing check
  // ... BFS implementation
}

// ✅ Correct: Handle edge cases
function correctBFS(graph, start) {
  if (!graph || !graph.hasVertex(start)) return [];
  if (graph.getVertices().length === 0) return [];
  // ... BFS implementation
}
```

### Mistake 3: Infinite Loops in Cyclic Graphs

```javascript
// ❌ Wrong: No visited set in DFS
function wrongDFS(graph, vertex) {
  for (const neighbor of graph.getNeighbors(vertex)) {
    wrongDFS(graph, neighbor.vertex); // Infinite loop in cycles
  }
}

// ✅ Correct: Track visited vertices
function correctDFS(graph, vertex, visited = new Set()) {
  visited.add(vertex);
  for (const neighbor of graph.getNeighbors(vertex)) {
    if (!visited.has(neighbor.vertex)) {
      correctDFS(graph, neighbor.vertex, visited);
    }
  }
}
```

## 📖 Additional Resources

### Videos

- **Graph Algorithms Explained**: Comprehensive overview
- **Dijkstra's Algorithm**: Step-by-step visualization
- **Topological Sort**: Dependency resolution
- **Minimum Spanning Tree**: Network design

### Websites

- **Graph Algorithm Visualizer**: Interactive demonstrations
- **Algorithm Visualizations**: Step-by-step animations
- **Graph Theory Problems**: Practice problems

### Books

- **"Introduction to Algorithms"**: Graph algorithms chapter
- **"Algorithm Design"**: Network flow and matching
- **"Graph Theory"**: Mathematical foundations

---

## 🚀 Getting Started

**Ready to master graph algorithms?**

1. **Start with Basic Traversal** → `implementation.js`
2. **Practice Shortest Path** → `practice.js`
3. **Learn Advanced Algorithms** → MST, flow, SCC
4. **Apply to Real Problems** → Social networks, routing

> 💡 **Key Insight**: Graph algorithms are about choosing the right representation and traversal strategy for your specific problem!

---

## 📊 Progress Checklist

### Basic Graph Operations

- [ ] Graph representations (adjacency list, matrix)
- [ ] BFS traversal
- [ ] DFS traversal
- [ ] Connected components

### Shortest Path Algorithms

- [ ] BFS for unweighted graphs
- [ ] Dijkstra's algorithm
- [ ] Bellman-Ford algorithm
- [ ] Floyd-Warshall algorithm

### Advanced Algorithms

- [ ] Topological sort
- [ ] Minimum spanning tree
- [ ] Strongly connected components
- [ ] Maximum flow

### Applications

- [ ] Social network analysis
- [ ] Network routing
- [ ] Game pathfinding
- [ ] Dependency resolution

---

## 🎯 Interview Focus

### Most Common Graph Questions

1. **Shortest Path** - 35% of graph interviews
2. **Connected Components** - 25% of graph interviews
3. **Topological Sort** - 20% of graph interviews
4. **Cycle Detection** - 15% of graph interviews
5. **MST** - 5% of graph interviews

### Must-Know Graph Algorithms for FAANG

- **BFS/DFS**: Fundamental traversal
- **Dijkstra**: Weighted shortest path
- **Topological Sort**: Dependency resolution
- **Connected Components**: Graph analysis
- **Cycle Detection**: Graph validation
- **Union-Find**: Disjoint set operations

---

_Last Updated: December 2025_  
_Difficulty: Advanced_  
_Prerequisites: Basic Algorithms, Data Structures_  
_Time Commitment: 3-4 weeks_
