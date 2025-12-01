# 🕸️ Graphs & Graph Algorithms

> **Connected Data Structures for Network Problems**

## 📋 Table of Contents

- [What are Graphs?](#what-are-graphs)
- [Graph Types](#graph-types)
- [Graph Representations](#graph-representations)
- [Core Operations](#core-operations)
- [Traversal Algorithms](#traversal-algorithms)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Graphs?

### Definition

A graph is a data structure consisting of vertices (nodes) connected by edges. Graphs are used to model relationships between objects, making them perfect for representing networks, hierarchies, and connections.

### Real-World Analogy

```javascript
// Think of a social network:
// - People are vertices (nodes)
// - Friendships are edges
// - You can find shortest paths between people
// - You can find groups of mutual friends

const socialNetwork = {
  vertices: ["Alice", "Bob", "Charlie", "Diana"],
  edges: [
    ["Alice", "Bob"],
    ["Bob", "Charlie"],
    ["Charlie", "Diana"],
    ["Alice", "Diana"],
  ],
};
```

### Why Graphs Matter

- **Network Analysis**: Social networks, computer networks
- **Path Finding**: Shortest paths, navigation systems
- **Dependency Management**: Build systems, task scheduling
- **Recommendation Systems**: Product recommendations, content suggestions
- **Resource Allocation**: Flow networks, matching problems

## 🔍 Graph Types

### 1. Undirected Graphs

```javascript
// Edges have no direction
const undirectedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["B", "C"],
    ["A", "C"],
  ],
};
```

### 2. Directed Graphs (Digraphs)

```javascript
// Edges have direction
const directedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B"],
    ["B", "C"],
    ["C", "A"],
  ],
};
```

### 3. Weighted Graphs

```javascript
// Edges have weights
const weightedGraph = {
  vertices: ["A", "B", "C"],
  edges: [
    ["A", "B", 5],
    ["B", "C", 3],
    ["A", "C", 10],
  ],
};
```

### 4. Special Graph Types

```javascript
const graphTypes = {
  tree: "Connected acyclic graph",
  complete: "Every vertex connected to every other",
  bipartite: "Vertices can be divided into two disjoint sets",
  cyclic: "Contains cycles",
  acyclic: "No cycles (DAG)",
  dense: "Many edges (≈ n²)",
  sparse: "Few edges (≈ n)",
};
```

## 🏗️ Graph Representations

### 1. Adjacency List

```javascript
// Most common representation - O(V + E) space
class AdjacencyListGraph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, new Set());
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.vertices.get(vertex1).add({ neighbor: vertex2, weight });
  }
}
```

### 2. Adjacency Matrix

```javascript
// Dense graphs - O(V²) space
class AdjacencyMatrixGraph {
  constructor(size) {
    this.size = size;
    this.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(0));
    this.vertexMap = new Map();
  }

  addVertex(vertex) {
    if (!this.vertexMap.has(vertex)) {
      const index = this.vertexMap.size;
      this.vertexMap.set(vertex, index);
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    const idx1 = this.vertexMap.get(vertex1);
    const idx2 = this.vertexMap.get(vertex2);
    this.matrix[idx1][idx2] = weight;
  }
}
```

### 3. Edge List

```javascript
// Simple representation for certain algorithms
class EdgeListGraph {
  constructor() {
    this.vertices = new Set();
    this.edges = [];
  }

  addVertex(vertex) {
    this.vertices.add(vertex);
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.vertices.add(vertex1);
    this.vertices.add(vertex2);
    this.edges.push({ from: vertex1, to: vertex2, weight });
  }
}
```

## ⚡ Core Operations

### Graph Implementation with Adjacency List

```javascript
class Graph {
  constructor(directed = false) {
    this.vertices = new Map();
    this.directed = directed;
    this.edgeCount = 0;
  }

  // Add vertex - O(1)
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, new Map());
    }
    return this;
  }

  // Add edge - O(1)
  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.vertices.get(vertex1).set(vertex2, weight);
    this.edgeCount++;

    if (!this.directed) {
      this.vertices.get(vertex2).set(vertex1, weight);
    }

    return this;
  }

  // Remove edge - O(deg(v))
  removeEdge(vertex1, vertex2) {
    if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
      this.vertices.get(vertex1).delete(vertex2);
      this.edgeCount--;

      if (!this.directed) {
        this.vertices.get(vertex2).delete(vertex1);
      }
    }
    return this;
  }

  // Remove vertex - O(V + E)
  removeVertex(vertex) {
    if (!this.vertices.has(vertex)) return this;

    // Remove all edges connected to this vertex
    for (const [v, neighbors] of this.vertices) {
      if (neighbors.has(vertex)) {
        neighbors.delete(vertex);
        this.edgeCount--;
      }
    }

    // Remove the vertex
    this.vertices.delete(vertex);
    return this;
  }

  // Get neighbors - O(deg(v))
  getNeighbors(vertex) {
    if (!this.vertices.has(vertex)) return [];

    const neighbors = this.vertices.get(vertex);
    return Array.from(neighbors.entries()).map(([neighbor, weight]) => ({
      vertex: neighbor,
      weight: weight,
    }));
  }

  // Check if vertex exists - O(1)
  hasVertex(vertex) {
    return this.vertices.has(vertex);
  }

  // Check if edge exists - O(1)
  hasEdge(vertex1, vertex2) {
    return (
      this.vertices.has(vertex1) && this.vertices.get(vertex1).has(vertex2)
    );
  }

  // Get edge weight - O(1)
  getEdgeWeight(vertex1, vertex2) {
    if (this.hasEdge(vertex1, vertex2)) {
      return this.vertices.get(vertex1).get(vertex2);
    }
    return undefined;
  }

  // Get all vertices - O(V)
  getVertices() {
    return Array.from(this.vertices.keys());
  }

  // Get all edges - O(E)
  getEdges() {
    const edges = [];
    const visited = new Set();

    for (const [vertex1, neighbors] of this.vertices) {
      for (const [vertex2, weight] of neighbors) {
        const edgeKey = this.directed
          ? `${vertex1}->${vertex2}`
          : `${Math.min(vertex1, vertex2)}-${Math.max(vertex1, vertex2)}`;

        if (!visited.has(edgeKey)) {
          edges.push({ from: vertex1, to: vertex2, weight });
          visited.add(edgeKey);
        }
      }
    }

    return edges;
  }

  // Get vertex count - O(1)
  getVertexCount() {
    return this.vertices.size;
  }

  // Get edge count - O(1)
  getEdgeCount() {
    return this.edgeCount;
  }

  // Get degree of vertex - O(1)
  getDegree(vertex) {
    return this.vertices.has(vertex) ? this.vertices.get(vertex).size : 0;
  }

  // Check if graph is empty - O(1)
  isEmpty() {
    return this.vertices.size === 0;
  }

  // Clear graph - O(1)
  clear() {
    this.vertices.clear();
    this.edgeCount = 0;
    return this;
  }

  // Clone graph - O(V + E)
  clone() {
    const newGraph = new Graph(this.directed);

    for (const vertex of this.vertices.keys()) {
      newGraph.addVertex(vertex);
    }

    for (const [vertex1, neighbors] of this.vertices) {
      for (const [vertex2, weight] of neighbors) {
        newGraph.addEdge(vertex1, vertex2, weight);
      }
    }

    return newGraph;
  }
}
```

## 🔄 Traversal Algorithms

### 1. Breadth-First Search (BFS)

```javascript
class GraphTraversal {
  // BFS - O(V + E)
  static bfs(graph, start) {
    if (!graph.hasVertex(start)) return [];

    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push(neighbor.vertex);
        }
      }
    }

    return result;
  }

  // BFS with distances - O(V + E)
  static bfsWithDistances(graph, start) {
    if (!graph.hasVertex(start)) return {};

    const visited = new Set();
    const queue = [{ vertex: start, distance: 0 }];
    const distances = { [start]: 0 };

    visited.add(start);

    while (queue.length > 0) {
      const { vertex, distance } = queue.shift();

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          const newDistance = distance + 1;
          distances[neighbor.vertex] = newDistance;
          queue.push({ vertex: neighbor.vertex, distance: newDistance });
        }
      }
    }

    return distances;
  }

  // BFS shortest path - O(V + E)
  static shortestPath(graph, start, end) {
    if (!graph.hasVertex(start) || !graph.hasVertex(end)) return [];

    const visited = new Set();
    const queue = [{ vertex: start, path: [start] }];
    visited.add(start);

    while (queue.length > 0) {
      const { vertex, path } = queue.shift();

      if (vertex === end) {
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

    return []; // No path found
  }
}
```

### 2. Depth-First Search (DFS)

```javascript
class DFS {
  // Recursive DFS - O(V + E)
  static dfsRecursive(graph, start, visited = new Set(), result = []) {
    if (!graph.hasVertex(start)) return result;

    visited.add(start);
    result.push(start);

    for (const neighbor of graph.getNeighbors(start)) {
      if (!visited.has(neighbor.vertex)) {
        this.dfsRecursive(graph, neighbor.vertex, visited, result);
      }
    }

    return result;
  }

  // Iterative DFS - O(V + E)
  static dfsIterative(graph, start) {
    if (!graph.hasVertex(start)) return [];

    const visited = new Set();
    const stack = [start];
    const result = [];

    visited.add(start);

    while (stack.length > 0) {
      const vertex = stack.pop();
      result.push(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          stack.push(neighbor.vertex);
        }
      }
    }

    return result;
  }

  // DFS with timestamps - O(V + E)
  static dfsWithTimestamps(graph) {
    const visited = new Set();
    const timestamps = {};
    let time = 0;

    function dfsVisit(vertex) {
      visited.add(vertex);
      timestamps[vertex] = {
        discovery: ++time,
        finish: null,
      };

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfsVisit(neighbor.vertex);
        }
      }

      timestamps[vertex].finish = ++time;
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfsVisit(vertex);
      }
    }

    return timestamps;
  }
}
```

### 3. Connected Components

```javascript
class ConnectedComponents {
  // Find connected components - O(V + E)
  static findComponents(graph) {
    const visited = new Set();
    const components = [];

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        const component = [];
        const stack = [vertex];

        while (stack.length > 0) {
          const current = stack.pop();

          if (!visited.has(current)) {
            visited.add(current);
            component.push(current);

            for (const neighbor of graph.getNeighbors(current)) {
              if (!visited.has(neighbor.vertex)) {
                stack.push(neighbor.vertex);
              }
            }
          }
        }

        components.push(component);
      }
    }

    return components;
  }

  // Check if graph is connected - O(V + E)
  static isConnected(graph) {
    if (graph.getVertexCount() === 0) return true;

    const start = graph.getVertices()[0];
    const visited = new Set();
    const stack = [start];

    while (stack.length > 0) {
      const vertex = stack.pop();

      if (!visited.has(vertex)) {
        visited.add(vertex);

        for (const neighbor of graph.getNeighbors(vertex)) {
          if (!visited.has(neighbor.vertex)) {
            stack.push(neighbor.vertex);
          }
        }
      }
    }

    return visited.size === graph.getVertexCount();
  }
}
```

## 🎯 Common Patterns

### 1. Cycle Detection

```javascript
class CycleDetection {
  // Detect cycle in undirected graph - O(V + E)
  static hasCycleUndirected(graph) {
    const visited = new Set();

    function dfs(vertex, parent) {
      visited.add(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          if (dfs(neighbor.vertex, vertex)) {
            return true;
          }
        } else if (neighbor.vertex !== parent) {
          return true; // Found back edge
        }
      }

      return false;
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        if (dfs(vertex, null)) {
          return true;
        }
      }
    }

    return false;
  }

  // Detect cycle in directed graph - O(V + E)
  static hasCycleDirected(graph) {
    const visited = new Set();
    const recursionStack = new Set();

    function dfs(vertex) {
      visited.add(vertex);
      recursionStack.add(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          if (dfs(neighbor.vertex)) {
            return true;
          }
        } else if (recursionStack.has(neighbor.vertex)) {
          return true; // Found back edge
        }
      }

      recursionStack.delete(vertex);
      return false;
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        if (dfs(vertex)) {
          return true;
        }
      }
    }

    return false;
  }
}
```

### 2. Topological Sort

```javascript
class TopologicalSort {
  // Kahn's algorithm - O(V + E)
  static kahnTopologicalSort(graph) {
    const inDegree = {};
    const queue = [];
    const result = [];

    // Calculate in-degree for each vertex
    for (const vertex of graph.getVertices()) {
      inDegree[vertex] = 0;
    }

    for (const [vertex, neighbors] of graph.vertices) {
      for (const neighbor of neighbors.keys()) {
        inDegree[neighbor]++;
      }
    }

    // Find vertices with in-degree 0
    for (const [vertex, degree] of Object.entries(inDegree)) {
      if (degree === 0) {
        queue.push(vertex);
      }
    }

    // Process vertices
    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        inDegree[neighbor.vertex]--;

        if (inDegree[neighbor.vertex] === 0) {
          queue.push(neighbor.vertex);
        }
      }
    }

    // Check if topological sort exists (no cycles)
    return result.length === graph.getVertexCount() ? result : [];
  }

  // DFS-based topological sort - O(V + E)
  static dfsTopologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    const result = [];

    function dfs(vertex) {
      visited.add(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfs(neighbor.vertex);
        }
      }

      stack.push(vertex);
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    // Reverse stack to get topological order
    while (stack.length > 0) {
      result.push(stack.pop());
    }

    return result;
  }
}
```

### 3. Shortest Path Algorithms

```javascript
class ShortestPath {
  // Dijkstra's algorithm - O((V + E) log V)
  static dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = [];

    // Initialize distances
    for (const vertex of graph.getVertices()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
    }

    priorityQueue.push({ vertex: start, distance: 0 });

    while (priorityQueue.length > 0) {
      // Get vertex with minimum distance
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { vertex, distance } = priorityQueue.shift();

      if (visited.has(vertex)) continue;
      visited.add(vertex);

      // Update distances to neighbors
      for (const neighbor of graph.getNeighbors(vertex)) {
        const newDistance = distance + neighbor.weight;

        if (newDistance < distances[neighbor.vertex]) {
          distances[neighbor.vertex] = newDistance;
          priorityQueue.push({
            vertex: neighbor.vertex,
            distance: newDistance,
          });
        }
      }
    }

    return distances;
  }

  // Bellman-Ford algorithm - O(V * E)
  static bellmanFord(graph, start) {
    const distances = {};
    const vertices = graph.getVertices();

    // Initialize distances
    for (const vertex of vertices) {
      distances[vertex] = vertex === start ? 0 : Infinity;
    }

    // Relax edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
      for (const edge of graph.getEdges()) {
        const { from, to, weight } = edge;

        if (distances[from] + weight < distances[to]) {
          distances[to] = distances[from] + weight;
        }
      }
    }

    // Check for negative cycles
    for (const edge of graph.getEdges()) {
      const { from, to, weight } = edge;

      if (distances[from] + weight < distances[to]) {
        throw new Error("Graph contains negative cycle");
      }
    }

    return distances;
  }

  // Floyd-Warshall algorithm - O(V³)
  static floydWarshall(graph) {
    const vertices = graph.getVertices();
    const distances = {};

    // Initialize distance matrix
    for (const vertex1 of vertices) {
      distances[vertex1] = {};
      for (const vertex2 of vertices) {
        if (vertex1 === vertex2) {
          distances[vertex1][vertex2] = 0;
        } else if (graph.hasEdge(vertex1, vertex2)) {
          distances[vertex1][vertex2] = graph.getEdgeWeight(vertex1, vertex2);
        } else {
          distances[vertex1][vertex2] = Infinity;
        }
      }
    }

    // Update distances
    for (const k of vertices) {
      for (const i of vertices) {
        for (const j of vertices) {
          if (distances[i][k] + distances[k][j] < distances[i][j]) {
            distances[i][j] = distances[i][k] + distances[k][j];
          }
        }
      }
    }

    return distances;
  }
}
```

### 4. Minimum Spanning Tree

```javascript
class MinimumSpanningTree {
  // Prim's algorithm - O(E log V)
  static prim(graph) {
    const mst = new Graph();
    const visited = new Set();
    const priorityQueue = [];

    // Start with first vertex
    const startVertex = graph.getVertices()[0];
    visited.add(startVertex);
    mst.addVertex(startVertex);

    // Add all edges from start vertex
    for (const neighbor of graph.getNeighbors(startVertex)) {
      priorityQueue.push({
        from: startVertex,
        to: neighbor.vertex,
        weight: neighbor.weight,
      });
    }

    while (
      priorityQueue.length > 0 &&
      mst.getVertexCount() < graph.getVertexCount()
    ) {
      // Get edge with minimum weight
      priorityQueue.sort((a, b) => a.weight - b.weight);
      const edge = priorityQueue.shift();

      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        mst.addVertex(edge.to);
        mst.addEdge(edge.from, edge.to, edge.weight);

        // Add new edges
        for (const neighbor of graph.getNeighbors(edge.to)) {
          if (!visited.has(neighbor.vertex)) {
            priorityQueue.push({
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

  // Kruskal's algorithm - O(E log E)
  static kruskal(graph) {
    const mst = new Graph();
    const edges = graph.getEdges();
    const parent = {};
    const rank = {};

    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);

    // Initialize Union-Find
    for (const vertex of graph.getVertices()) {
      parent[vertex] = vertex;
      rank[vertex] = 0;
    }

    // Find function
    function find(vertex) {
      if (parent[vertex] !== vertex) {
        parent[vertex] = find(parent[vertex]);
      }
      return parent[vertex];
    }

    // Union function
    function union(vertex1, vertex2) {
      const root1 = find(vertex1);
      const root2 = find(vertex2);

      if (root1 === root2) return false;

      if (rank[root1] < rank[root2]) {
        parent[root1] = root2;
      } else if (rank[root1] > rank[root2]) {
        parent[root2] = root1;
      } else {
        parent[root2] = root1;
        rank[root1]++;
      }

      return true;
    }

    // Process edges
    for (const edge of edges) {
      if (union(edge.from, edge.to)) {
        mst.addVertex(edge.from);
        mst.addVertex(edge.to);
        mst.addEdge(edge.from, edge.to, edge.weight);

        if (mst.getEdgeCount() === graph.getVertexCount() - 1) {
          break;
        }
      }
    }

    return mst;
  }
}
```

## 🚀 Advanced Graph Algorithms

### 1. Strongly Connected Components

```javascript
class StronglyConnectedComponents {
  // Kosaraju's algorithm - O(V + E)
  static kosaraju(graph) {
    const visited = new Set();
    const order = [];

    // First DFS to get finishing order
    function dfs1(vertex) {
      visited.add(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfs1(neighbor.vertex);
        }
      }

      order.push(vertex);
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs1(vertex);
      }
    }

    // Create transpose graph
    const transpose = new Graph(true);
    for (const vertex of graph.getVertices()) {
      transpose.addVertex(vertex);
    }

    for (const edge of graph.getEdges()) {
      transpose.addEdge(edge.to, edge.from, edge.weight);
    }

    // Second DFS on transpose graph
    visited.clear();
    const sccs = [];

    function dfs2(vertex, component) {
      visited.add(vertex);
      component.push(vertex);

      for (const neighbor of transpose.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfs2(neighbor.vertex, component);
        }
      }
    }

    // Process vertices in reverse finishing order
    for (let i = order.length - 1; i >= 0; i--) {
      const vertex = order[i];

      if (!visited.has(vertex)) {
        const component = [];
        dfs2(vertex, component);
        sccs.push(component);
      }
    }

    return sccs;
  }
}
```

### 2. Bipartite Graph Check

```javascript
class BipartiteGraph {
  // Check if graph is bipartite - O(V + E)
  static isBipartite(graph) {
    const colors = new Map();

    for (const vertex of graph.getVertices()) {
      if (!colors.has(vertex)) {
        const queue = [vertex];
        colors.set(vertex, 0);

        while (queue.length > 0) {
          const current = queue.shift();
          const currentColor = colors.get(current);

          for (const neighbor of graph.getNeighbors(current)) {
            if (!colors.has(neighbor.vertex)) {
              colors.set(neighbor.vertex, 1 - currentColor);
              queue.push(neighbor.vertex);
            } else if (colors.get(neighbor.vertex) === currentColor) {
              return false; // Found same color on adjacent vertices
            }
          }
        }
      }
    }

    return true;
  }
}
```

## 💡 Real-World Applications

### 1. Social Network Analysis

```javascript
class SocialNetwork {
  constructor() {
    this.graph = new Graph(true); // Directed graph
    this.userProfiles = new Map();
  }

  // Add user - O(1)
  addUser(userId, profile) {
    this.graph.addVertex(userId);
    this.userProfiles.set(userId, profile);
  }

  // Add friendship - O(1)
  addFriend(user1, user2) {
    this.graph.addEdge(user1, user2);
    this.graph.addEdge(user2, user1); // Mutual friendship
  }

  // Find friends of friends - O(V + E)
  findFriendsOfFriends(userId, depth = 2) {
    const visited = new Set();
    const queue = [{ user: userId, currentDepth: 0 }];
    const friendsOfFriends = new Set();

    visited.add(userId);

    while (queue.length > 0) {
      const { user, currentDepth } = queue.shift();

      if (currentDepth >= depth) continue;

      for (const neighbor of this.graph.getNeighbors(user)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);

          if (currentDepth === depth - 1) {
            friendsOfFriends.add(neighbor.vertex);
          } else {
            queue.push({
              user: neighbor.vertex,
              currentDepth: currentDepth + 1,
            });
          }
        }
      }
    }

    return Array.from(friendsOfFriends);
  }

  // Find shortest connection path - O(V + E)
  findConnectionPath(user1, user2) {
    const visited = new Set();
    const queue = [{ user: user1, path: [user1] }];
    visited.add(user1);

    while (queue.length > 0) {
      const { user, path } = queue.shift();

      if (user === user2) {
        return path;
      }

      for (const neighbor of this.graph.getNeighbors(user)) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push({
            user: neighbor.vertex,
            path: [...path, neighbor.vertex],
          });
        }
      }
    }

    return []; // No connection found
  }

  // Get network statistics
  getNetworkStats() {
    const stats = {
      totalUsers: this.graph.getVertexCount(),
      totalConnections: this.graph.getEdgeCount() / 2, // Divide by 2 for undirected
      averageConnections: 0,
      mostConnected: null,
      isolatedUsers: [],
    };

    let totalConnections = 0;
    let maxConnections = 0;

    for (const user of this.graph.getVertices()) {
      const connections = this.graph.getDegree(user);
      totalConnections += connections;

      if (connections > maxConnections) {
        maxConnections = connections;
        stats.mostConnected = user;
      }

      if (connections === 0) {
        stats.isolatedUsers.push(user);
      }
    }

    stats.averageConnections = totalConnections / stats.totalUsers;
    return stats;
  }
}
```

### 2. Route Planning System

```javascript
class RoutePlanner {
  constructor() {
    this.graph = new Graph(true); // Directed weighted graph
    this.locations = new Map();
  }

  // Add location - O(1)
  addLocation(locationId, coordinates) {
    this.graph.addVertex(locationId);
    this.locations.set(locationId, coordinates);
  }

  // Add route - O(1)
  addRoute(from, to, distance, time = distance) {
    this.graph.addEdge(from, to, distance);
    // Store additional route information
    this.graph.getEdge(from, to).time = time;
  }

  // Find shortest route by distance - O((V + E) log V)
  findShortestRoute(from, to) {
    const distances = ShortestPath.dijkstra(this.graph, from);
    const distance = distances[to];

    if (distance === Infinity) {
      return { path: [], distance: Infinity, time: Infinity };
    }

    // Reconstruct path
    const path = this.reconstructPath(from, to, distances);

    return {
      path,
      distance,
      time: this.calculateTime(path),
    };
  }

  // Find fastest route - O((V + E) log V)
  findFastestRoute(from, to) {
    // Create time-weighted graph
    const timeGraph = new Graph(true);

    for (const vertex of this.graph.getVertices()) {
      timeGraph.addVertex(vertex);
    }

    for (const edge of this.graph.getEdges()) {
      const timeWeight = edge.time || edge.weight;
      timeGraph.addEdge(edge.from, edge.to, timeWeight);
    }

    const distances = ShortestPath.dijkstra(timeGraph, from);
    const time = distances[to];

    if (time === Infinity) {
      return { path: [], distance: Infinity, time: Infinity };
    }

    // Reconstruct path from original graph
    const path = this.reconstructPath(from, to, distances);

    return {
      path,
      distance: this.calculateDistance(path),
      time,
    };
  }

  // Find all routes within distance limit - O(V + E)
  findRoutesWithinDistance(from, maxDistance) {
    const distances = ShortestPath.dijkstra(this.graph, from);
    const routes = [];

    for (const [destination, distance] of Object.entries(distances)) {
      if (distance <= maxDistance && destination !== from) {
        const path = this.reconstructPath(from, destination, distances);
        routes.push({
          destination,
          distance,
          path,
          time: this.calculateTime(path),
        });
      }
    }

    return routes.sort((a, b) => a.distance - b.distance);
  }

  // Helper method to reconstruct path
  reconstructPath(from, to, distances) {
    // Simplified path reconstruction
    // In practice, you'd store parent pointers during Dijkstra
    return [from, to]; // Placeholder
  }

  // Calculate total distance of path
  calculateDistance(path) {
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += this.graph.getEdgeWeight(path[i], path[i + 1]) || 0;
    }

    return totalDistance;
  }

  // Calculate total time of path
  calculateTime(path) {
    let totalTime = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const edge = this.graph.getEdge(path[i], path[i + 1]);
      totalTime += edge?.time || edge?.weight || 0;
    }

    return totalTime;
  }
}
```

### 3. Dependency Management System

```javascript
class DependencyManager {
  constructor() {
    this.graph = new Graph(true); // Directed acyclic graph
    this.tasks = new Map();
  }

  // Add task - O(1)
  addTask(taskId, taskInfo) {
    this.graph.addVertex(taskId);
    this.tasks.set(taskId, taskInfo);
  }

  // Add dependency - O(1)
  addDependency(task, dependsOn) {
    this.graph.addEdge(dependsOn, task); // Edge from dependency to task
  }

  // Get execution order - O(V + E)
  getExecutionOrder() {
    const order = TopologicalSort.kahnTopologicalSort(this.graph);

    if (order.length === 0) {
      throw new Error("Circular dependency detected");
    }

    return order;
  }

  // Check if task can be executed - O(V + E)
  canExecute(taskId, completedTasks = new Set()) {
    // Check if all dependencies are completed
    for (const dependency of this.graph.getNeighbors(taskId)) {
      if (!completedTasks.has(dependency.vertex)) {
        return false;
      }
    }

    return true;
  }

  // Get tasks that can be executed now - O(V + E)
  getExecutableTasks(completedTasks = new Set()) {
    const executable = [];

    for (const task of this.graph.getVertices()) {
      if (!completedTasks.has(task) && this.canExecute(task, completedTasks)) {
        executable.push(task);
      }
    }

    return executable;
  }

  // Find circular dependencies - O(V + E)
  findCircularDependencies() {
    const cycles = [];
    const visited = new Set();
    const recursionStack = new Set();
    const path = [];

    function dfs(vertex) {
      visited.add(vertex);
      recursionStack.add(vertex);
      path.push(vertex);

      for (const neighbor of this.graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          if (dfs(neighbor.vertex)) {
            return true;
          }
        } else if (recursionStack.has(neighbor.vertex)) {
          // Found cycle
          const cycleStart = path.indexOf(neighbor.vertex);
          cycles.push(path.slice(cycleStart));
          return true;
        }
      }

      recursionStack.delete(vertex);
      path.pop();
      return false;
    }

    for (const vertex of this.graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    return cycles;
  }

  // Get dependency tree for task - O(V + E)
  getDependencyTree(taskId) {
    const tree = { task: taskId, dependencies: [] };

    function buildTree(currentTask, node) {
      for (const dependency of this.graph.getNeighbors(currentTask)) {
        const childNode = { task: dependency.vertex, dependencies: [] };
        node.dependencies.push(childNode);
        buildTree(dependency.vertex, childNode);
      }
    }

    buildTree(taskId, tree);
    return tree;
  }
}
```

## 💪 Practice Problems

### Easy

1. **Course Schedule** - Check if course schedule is possible
2. **Find the Town Judge** - Find person trusted by everyone
3. **Find Center of Star Graph** - Find center node in star graph
4. **Number of Provinces** - Count connected components
5. **Keys and Rooms** - Check if all rooms can be visited

### Medium

1. **Clone Graph** - Deep copy of graph structure
2. **Pacific Atlantic Water Flow** - Find cells reachable to both oceans
3. **Surrounded Regions** - Capture surrounded regions
4. **Network Delay Time** - Calculate network delay time
5. **Course Schedule III** - Find maximum courses that can be taken
6. **Minimum Number of Vertices to Reach All Nodes** - Find minimum starting points

### Hard

1. **Reconstruct Itinerary** - Reconstruct travel itinerary
2. **Critical Connections in a Network** - Find critical bridges
3. **Largest Color Value in a Directed Graph** - Find largest path color value
4. **Find Eventual Safe States** - Find safe nodes in directed graph
5. **Longest Path in a Directed Acyclic Graph** - Find longest path

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveGraphProblem(problem) {
  // 1. Identify graph type
  const graphTypes = {
    directed: "Edges have direction",
    undirected: "Edges are bidirectional",
    weighted: "Edges have weights",
    cyclic: "Contains cycles",
    acyclic: "No cycles (DAG)",
  };

  // 2. Choose representation
  const representations = {
    adjacencyList: "Good for sparse graphs",
    adjacencyMatrix: "Good for dense graphs",
    edgeList: "Simple for certain algorithms",
  };

  // 3. Select algorithm
  const algorithms = {
    bfs: "Shortest path, connectivity",
    dfs: "Cycle detection, topological sort",
    dijkstra: "Shortest path with positive weights",
    bellmanFord: "Handles negative weights",
  };

  // 4. Implement solution
  // 5. Handle edge cases
}
```

### Common Mistakes to Avoid

- ❌ Not handling disconnected graphs properly
- ❌ Forgetting to mark vertices as visited
- ❌ Using wrong graph representation for the problem
- ❌ Not considering edge cases (empty graph, single vertex)
- ❌ Infinite loops in graphs with cycles

### Communication Tips

- **Explain graph type** and why you chose it
- **Discuss representation** and its trade-offs
- **Walk through algorithm** step-by-step
- **Handle edge cases** explicitly

## 📊 Graph Representations Comparison

| Representation   | Space    | Add Edge | Remove Edge | Check Edge | Best For          |
| ---------------- | -------- | -------- | ----------- | ---------- | ----------------- |
| Adjacency List   | O(V + E) | O(1)     | O(V)        | O(V)       | Sparse graphs     |
| Adjacency Matrix | O(V²)    | O(1)     | O(1)        | O(1)       | Dense graphs      |
| Edge List        | O(E)     | O(1)     | O(E)        | O(E)       | Simple algorithms |

## 📖 Additional Resources

### Videos

- **Graph Theory - MIT 6.006**: Academic introduction
- **BFS and DFS - Computerphile**: Traversal algorithms
- **Dijkstra's Algorithm - YouTube**: Shortest path explanation

### Websites

- **Graph Visualizer**: Interactive graph operations
- **GeeksforGeeks Graphs**: Comprehensive tutorials
- **LeetCode Graph Problems**: Practice problems by difficulty

### Books

- **"Introduction to Algorithms"**: Graph algorithms chapters
- **"Algorithms" by Robert Sedgewick**: Practical graph algorithms

## 🎓 What You Need from Other Resources

### System Design

- **Distributed Graphs**: Graph partitioning
- **Graph Databases**: Neo4j, GraphQL
- **Network Protocols**: Routing algorithms

### Algorithm Design

- **Dynamic Programming**: Graph DP problems
- **Greedy Algorithms**: Minimum spanning tree
- **Network Flow**: Max flow algorithms

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Algorithms** → `../03-Algorithms/README.md`

> 💡 **Key Insight**: Graphs teach you relationship thinking - crucial for network problems, dependency management, and complex system analysis!

---

## 📊 Quick Reference

### Must-Know Graph Operations

```javascript
const essentialOperations = {
  bfs: "Breadth-first search - O(V + E)",
  dfs: "Depth-first search - O(V + E)",
  dijkstra: "Shortest path - O((V + E) log V)",
  topologicalSort: "DAG ordering - O(V + E)",
  connectedComponents: "Find components - O(V + E)",
  cycleDetection: "Check for cycles - O(V + E)",
};
```

### Common Graph Patterns

- **Shortest Path**: Dijkstra, Bellman-Ford, Floyd-Warshall
- **Connectivity**: BFS/DFS, Union-Find
- **Topological Order**: DAG processing, dependency resolution
- **Cycle Detection**: DFS with recursion stack
- **Minimum Spanning Tree**: Prim's, Kruskal's algorithms

---

_Last Updated: December 2025_  
_Difficulty: Intermediate to Advanced_  
_Prerequisites: Arrays, Hash Tables, Trees, Big O Complexity_  
_Time Commitment: 2-3 weeks_
