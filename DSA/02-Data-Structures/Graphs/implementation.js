// 🕸️ Graphs & Graph Algorithms Implementation
// Complete implementations of all graph types and algorithms

// ==========================================
// BASIC GRAPH IMPLEMENTATION
// ==========================================

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

  // Get graph statistics - O(V + E)
  getStats() {
    const stats = {
      vertexCount: this.getVertexCount(),
      edgeCount: this.getEdgeCount(),
      directed: this.directed,
      degrees: {},
      maxDegree: 0,
      minDegree: Infinity,
      avgDegree: 0,
    };

    let totalDegree = 0;
    for (const vertex of this.getVertices()) {
      const degree = this.getDegree(vertex);
      stats.degrees[vertex] = degree;
      stats.maxDegree = Math.max(stats.maxDegree, degree);
      stats.minDegree = Math.min(stats.minDegree, degree);
      totalDegree += degree;
    }

    stats.avgDegree =
      stats.vertexCount > 0 ? totalDegree / stats.vertexCount : 0;
    return stats;
  }
}

// ==========================================
// GRAPH TRAVERSAL ALGORITHMS
// ==========================================

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

  // BFS all shortest paths - O(V + E)
  static allShortestPaths(graph, start) {
    if (!graph.hasVertex(start)) return {};

    const distances = {};
    const paths = {};
    const queue = [start];

    // Initialize
    for (const vertex of graph.getVertices()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      paths[vertex] = vertex === start ? [[start]] : [];
    }

    while (queue.length > 0) {
      const vertex = queue.shift();

      for (const neighbor of graph.getNeighbors(vertex)) {
        const newDistance = distances[vertex] + neighbor.weight;

        if (newDistance < distances[neighbor.vertex]) {
          distances[neighbor.vertex] = newDistance;
          paths[neighbor.vertex] = paths[vertex].map((path) => [
            ...path,
            neighbor.vertex,
          ]);
          queue.push(neighbor.vertex);
        } else if (newDistance === distances[neighbor.vertex]) {
          // Add additional paths
          for (const path of paths[vertex]) {
            paths[neighbor.vertex].push([...path, neighbor.vertex]);
          }
        }
      }
    }

    return { distances, paths };
  }
}

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

  // DFS to find all paths - O(V + E)
  static findAllPaths(
    graph,
    start,
    end,
    visited = new Set(),
    path = [],
    allPaths = []
  ) {
    if (!graph.hasVertex(start) || !graph.hasVertex(end)) return allPaths;

    visited.add(start);
    path.push(start);

    if (start === end) {
      allPaths.push([...path]);
    } else {
      for (const neighbor of graph.getNeighbors(start)) {
        if (!visited.has(neighbor.vertex)) {
          this.findAllPaths(
            graph,
            neighbor.vertex,
            end,
            visited,
            path,
            allPaths
          );
        }
      }
    }

    path.pop();
    visited.delete(start);

    return allPaths;
  }
}

// ==========================================
// CONNECTED COMPONENTS
// ==========================================

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

  // Find bridges (cut edges) - O(V + E)
  static findBridges(graph) {
    const visited = new Set();
    const discovery = {};
    const low = {};
    const bridges = [];
    let time = 0;

    function dfs(vertex, parent = null) {
      visited.add(vertex);
      discovery[vertex] = low[vertex] = ++time;

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (neighbor.vertex === parent) continue;

        if (!visited.has(neighbor.vertex)) {
          dfs(neighbor.vertex, vertex);
          low[vertex] = Math.min(low[vertex], low[neighbor.vertex]);

          if (low[neighbor.vertex] > discovery[vertex]) {
            bridges.push([vertex, neighbor.vertex]);
          }
        } else {
          low[vertex] = Math.min(low[vertex], discovery[neighbor.vertex]);
        }
      }
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    return bridges;
  }

  // Find articulation points (cut vertices) - O(V + E)
  static findArticulationPoints(graph) {
    const visited = new Set();
    const discovery = {};
    const low = {};
    const parent = {};
    const articulationPoints = new Set();
    let time = 0;

    function dfs(vertex) {
      visited.add(vertex);
      discovery[vertex] = low[vertex] = ++time;
      let children = 0;

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          parent[neighbor.vertex] = vertex;
          children++;
          dfs(neighbor.vertex);

          low[vertex] = Math.min(low[vertex], low[neighbor.vertex]);

          // Check for articulation point
          if (parent[vertex] === undefined && children > 1) {
            articulationPoints.add(vertex);
          }

          if (
            parent[vertex] !== undefined &&
            low[neighbor.vertex] >= discovery[vertex]
          ) {
            articulationPoints.add(vertex);
          }
        } else if (neighbor.vertex !== parent[vertex]) {
          low[vertex] = Math.min(low[vertex], discovery[neighbor.vertex]);
        }
      }
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    return Array.from(articulationPoints);
  }
}

// ==========================================
// CYCLE DETECTION
// ==========================================

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

  // Find all cycles in directed graph - O(V + E)
  static findCycles(graph) {
    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];
    const path = [];

    function dfs(vertex) {
      visited.add(vertex);
      recursionStack.add(vertex);
      path.push(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        if (!visited.has(neighbor.vertex)) {
          dfs(neighbor.vertex);
        } else if (recursionStack.has(neighbor.vertex)) {
          // Found cycle
          const cycleStart = path.indexOf(neighbor.vertex);
          cycles.push(path.slice(cycleStart));
        }
      }

      recursionStack.delete(vertex);
      path.pop();
    }

    for (const vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    return cycles;
  }
}

// ==========================================
// TOPOLOGICAL SORT
// ==========================================

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

// ==========================================
// SHORTEST PATH ALGORITHMS
// ==========================================

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

  // Dijkstra's algorithm with path reconstruction - O((V + E) log V)
  static dijkstraWithPath(graph, start) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const priorityQueue = [];

    // Initialize distances
    for (const vertex of graph.getVertices()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
    }

    priorityQueue.push({ vertex: start, distance: 0 });

    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { vertex, distance } = priorityQueue.shift();

      if (visited.has(vertex)) continue;
      visited.add(vertex);

      for (const neighbor of graph.getNeighbors(vertex)) {
        const newDistance = distance + neighbor.weight;

        if (newDistance < distances[neighbor.vertex]) {
          distances[neighbor.vertex] = newDistance;
          previous[neighbor.vertex] = vertex;
          priorityQueue.push({
            vertex: neighbor.vertex,
            distance: newDistance,
          });
        }
      }
    }

    return { distances, previous };
  }

  // Reconstruct path from previous array
  static reconstructPath(previous, start, end) {
    const path = [];
    let current = end;

    while (current !== null && current !== undefined) {
      path.unshift(current);
      current = previous[current];
    }

    return path[0] === start ? path : [];
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

// ==========================================
// MINIMUM SPANNING TREE
// ==========================================

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

// ==========================================
// ADVANCED GRAPH ALGORITHMS
// ==========================================

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

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

// Social Network Analysis
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

// Route Planning System
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
    const { distances, previous } = ShortestPath.dijkstraWithPath(
      this.graph,
      from
    );
    const distance = distances[to];

    if (distance === Infinity) {
      return { path: [], distance: Infinity, time: Infinity };
    }

    const path = ShortestPath.reconstructPath(previous, from, to);

    return {
      path,
      distance,
      time: this.calculateTime(path),
    };
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

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Graph Implementation Tests...\n");

  // Test Basic Graph
  console.log("🕸️ Testing Basic Graph:");
  const graph = new Graph();
  graph.addEdge("A", "B", 5);
  graph.addEdge("B", "C", 3);
  graph.addEdge("A", "C", 10);

  console.log("Vertices:", graph.getVertices());
  console.log("Edges:", graph.getEdges());
  console.log("Vertex count:", graph.getVertexCount());
  console.log("Edge count:", graph.getEdgeCount());
  console.log("Neighbors of A:", graph.getNeighbors("A"));
  console.log("Has edge A-B:", graph.hasEdge("A", "B"));
  console.log("Weight A-B:", graph.getEdgeWeight("A", "B"));
  console.log("Graph stats:", graph.getStats());

  // Test BFS
  console.log("\n🔍 Testing BFS:");
  console.log("BFS from A:", GraphTraversal.bfs(graph, "A"));
  console.log(
    "BFS with distances from A:",
    GraphTraversal.bfsWithDistances(graph, "A")
  );
  console.log(
    "Shortest path A to C:",
    GraphTraversal.shortestPath(graph, "A", "C")
  );

  // Test DFS
  console.log("\n🔽 Testing DFS:");
  console.log("DFS recursive from A:", DFS.dfsRecursive(graph, "A"));
  console.log("DFS iterative from A:", DFS.dfsIterative(graph, "A"));
  console.log("DFS timestamps:", DFS.dfsWithTimestamps(graph));
  console.log("All paths A to C:", DFS.findAllPaths(graph, "A", "C"));

  // Test Connected Components
  console.log("\n🔗 Testing Connected Components:");
  const disconnectedGraph = new Graph();
  disconnectedGraph.addEdge("A", "B");
  disconnectedGraph.addEdge("C", "D");

  console.log(
    "Components:",
    ConnectedComponents.findComponents(disconnectedGraph)
  );
  console.log(
    "Is connected:",
    ConnectedComponents.isConnected(disconnectedGraph)
  );

  // Test Cycle Detection
  console.log("\n🔄 Testing Cycle Detection:");
  const cyclicGraph = new Graph(true);
  cyclicGraph.addEdge("A", "B");
  cyclicGraph.addEdge("B", "C");
  cyclicGraph.addEdge("C", "A");

  console.log(
    "Has cycle (directed):",
    CycleDetection.hasCycleDirected(cyclicGraph)
  );
  console.log("All cycles:", CycleDetection.findCycles(cyclicGraph));

  // Test Topological Sort
  console.log("\n📊 Testing Topological Sort:");
  const dag = new Graph(true);
  dag.addEdge("A", "B");
  dag.addEdge("B", "C");
  dag.addEdge("A", "C");

  console.log(
    "Kahn topological sort:",
    TopologicalSort.kahnTopologicalSort(dag)
  );
  console.log("DFS topological sort:", TopologicalSort.dfsTopologicalSort(dag));

  // Test Shortest Path
  console.log("\n🛤️ Testing Shortest Path:");
  const weightedGraph = new Graph(true);
  weightedGraph.addEdge("A", "B", 4);
  weightedGraph.addEdge("A", "C", 2);
  weightedGraph.addEdge("B", "C", 1);
  weightedGraph.addEdge("B", "D", 5);
  weightedGraph.addEdge("C", "D", 10);

  console.log("Dijkstra from A:", ShortestPath.dijkstra(weightedGraph, "A"));
  console.log(
    "Dijkstra with path:",
    ShortestPath.dijkstraWithPath(weightedGraph, "A")
  );

  // Test MST
  console.log("\n🌳 Testing Minimum Spanning Tree:");
  const undirectedGraph = new Graph();
  undirectedGraph.addEdge("A", "B", 4);
  undirectedGraph.addEdge("A", "C", 2);
  undirectedGraph.addEdge("B", "C", 1);
  undirectedGraph.addEdge("B", "D", 5);

  const primMST = MinimumSpanningTree.prim(undirectedGraph);
  console.log("Prim MST edges:", primMST.getEdges());

  const kruskalMST = MinimumSpanningTree.kruskal(undirectedGraph);
  console.log("Kruskal MST edges:", kruskalMST.getEdges());

  // Test Social Network
  console.log("\n👥 Testing Social Network:");
  const socialNetwork = new SocialNetwork();
  socialNetwork.addUser("1", { name: "Alice" });
  socialNetwork.addUser("2", { name: "Bob" });
  socialNetwork.addUser("3", { name: "Charlie" });
  socialNetwork.addFriend("1", "2");
  socialNetwork.addFriend("2", "3");

  console.log(
    "Friends of friends of 1:",
    socialNetwork.findFriendsOfFriends("1")
  );
  console.log(
    "Connection path 1 to 3:",
    socialNetwork.findConnectionPath("1", "3")
  );
  console.log("Network stats:", socialNetwork.getNetworkStats());

  // Test Route Planner
  console.log("\n🗺️ Testing Route Planner:");
  const routePlanner = new RoutePlanner();
  routePlanner.addLocation("NYC", { lat: 40.7128, lng: -74.006 });
  routePlanner.addLocation("BOS", { lat: 42.3601, lng: -71.0589 });
  routePlanner.addLocation("DC", { lat: 38.9072, lng: -77.0369 });

  routePlanner.addRoute("NYC", "BOS", 200, 4);
  routePlanner.addRoute("NYC", "DC", 225, 4);
  routePlanner.addRoute("BOS", "DC", 400, 7);

  console.log(
    "Shortest route NYC to DC:",
    routePlanner.findShortestRoute("NYC", "DC")
  );

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  Graph,
  GraphTraversal,
  DFS,
  ConnectedComponents,
  CycleDetection,
  TopologicalSort,
  ShortestPath,
  MinimumSpanningTree,
  StronglyConnectedComponents,
  BipartiteGraph,
  SocialNetwork,
  RoutePlanner,
};
