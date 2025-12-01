// 🕸️ Graph Algorithms Implementation
// Complete implementations of graph algorithms with analysis

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
      if (this.heap[parentIndex].distance <= this.heap[index].distance) break;

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
        this.heap[leftChild].distance < this.heap[smallest].distance
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].distance < this.heap[smallest].distance
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

  contains(vertex) {
    return this.heap.some((item) => item.vertex === vertex);
  }
}

// ==========================================
// GRAPH REPRESENTATIONS
// ==========================================

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

  addEdge(vertex1, vertex2, weight = 1, directed = false) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjList.get(vertex1).push({ vertex: vertex2, weight });

    if (!directed) {
      this.adjList.get(vertex2).push({ vertex: vertex1, weight });
    }
  }

  getNeighbors(vertex) {
    return this.adjList.get(vertex) || [];
  }

  getVertices() {
    return Array.from(this.adjList.keys());
  }

  hasVertex(vertex) {
    return this.adjList.has(vertex);
  }

  removeVertex(vertex) {
    this.adjList.delete(vertex);

    // Remove all edges to this vertex
    for (const [v, neighbors] of this.adjList) {
      this.adjList.set(
        v,
        neighbors.filter((n) => n.vertex !== vertex)
      );
    }
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjList.has(vertex1)) {
      this.adjList.set(
        vertex1,
        this.adjList.get(vertex1).filter((n) => n.vertex !== vertex2)
      );
    }

    if (this.adjList.has(vertex2)) {
      this.adjList.set(
        vertex2,
        this.adjList.get(vertex2).filter((n) => n.vertex !== vertex1)
      );
    }
  }

  getEdgeWeight(vertex1, vertex2) {
    const neighbors = this.adjList.get(vertex1) || [];
    const edge = neighbors.find((n) => n.vertex === vertex2);
    return edge ? edge.weight : Infinity;
  }

  hasEdge(vertex1, vertex2) {
    return this.getEdgeWeight(vertex1, vertex2) !== Infinity;
  }

  getVertexCount() {
    return this.adjList.size;
  }

  getEdgeCount() {
    let count = 0;
    for (const neighbors of this.adjList.values()) {
      count += neighbors.length;
    }
    return count / 2; // Divide by 2 for undirected graphs
  }

  clear() {
    this.adjList.clear();
  }

  clone() {
    const newGraph = new AdjacencyList();
    for (const vertex of this.getVertices()) {
      newGraph.addVertex(vertex);
    }
    for (const vertex of this.getVertices()) {
      for (const neighbor of this.getNeighbors(vertex)) {
        newGraph.addEdge(vertex, neighbor.vertex, neighbor.weight);
      }
    }
    return newGraph;
  }
}

/**
 * Adjacency Matrix Representation
 * Space: O(V²)
 * Good for dense graphs
 */
class AdjacencyMatrix {
  constructor(size) {
    this.size = size;
    this.matrix = new Array(size).fill(null).map(() => new Array(size).fill(0));
    this.vertices = new Array(size).fill(null);
  }

  addVertex(vertex, index) {
    if (index >= 0 && index < this.size) {
      this.vertices[index] = vertex;
    }
  }

  addEdge(vertex1, vertex2, weight = 1, directed = false) {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 !== -1 && index2 !== -1) {
      this.matrix[index1][index2] = weight;
      if (!directed) {
        this.matrix[index2][index1] = weight;
      }
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

  getNeighbors(vertex) {
    const index = this.vertices.indexOf(vertex);
    if (index === -1) return [];

    const neighbors = [];
    for (let i = 0; i < this.size; i++) {
      if (this.matrix[index][i] > 0) {
        neighbors.push({
          vertex: this.vertices[i],
          weight: this.matrix[index][i],
        });
      }
    }
    return neighbors;
  }

  getVertices() {
    return this.vertices.filter((v) => v !== null);
  }
}

// ==========================================
// GRAPH TRAVERSAL ALGORITHMS
// ==========================================

/**
 * Breadth-First Search (BFS)
 * Time: O(V + E)
 * Space: O(V) for queue + visited set
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

/**
 * Depth-First Search (DFS) - Recursive
 * Time: O(V + E)
 * Space: O(V) for recursion stack + visited set
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
 * DFS for Cycle Detection (Undirected)
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

/**
 * Topological Sort (DFS-based)
 * Time: O(V + E)
 * Space: O(V)
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

// ==========================================
// SHORTEST PATH ALGORITHMS
// ==========================================

/**
 * Dijkstra's Algorithm
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
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

/**
 * Bellman-Ford Algorithm
 * Time: O(V * E)
 * Space: O(V)
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

/**
 * Floyd-Warshall Algorithm
 * Time: O(V³)
 * Space: O(V²)
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

/**
 * A* Search Algorithm
 * Time: O(b^d) where b is branching factor, d is depth
 * Space: O(b^d)
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
  openSet.insert({ vertex: start, distance: fScore.get(start) });

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
            distance: fScore.get(neighbor.vertex),
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

// ==========================================
// MINIMUM SPANNING TREE ALGORITHMS
// ==========================================

/**
 * Prim's Algorithm
 * Time: O((V + E) log V) with priority queue
 * Space: O(V)
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

/**
 * Kruskal's Algorithm
 * Time: O(E log E) for sorting
 * Space: O(V + E)
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

// ==========================================
// ADVANCED GRAPH ALGORITHMS
// ==========================================

/**
 * Kosaraju's Algorithm for Strongly Connected Components
 * Time: O(V + E)
 * Space: O(V)
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
      transposed.addEdge(neighbor.vertex, vertex, neighbor.weight, true);
    }
  }

  return transposed;
}

/**
 * Bipartite Graph Check using BFS
 * Time: O(V + E)
 * Space: O(V)
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

/**
 * Ford-Fulkerson Algorithm for Maximum Flow
 * Time: O(E * max_flow) with DFS augmenting paths
 * Space: O(V + E)
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
  const residual = new AdjacencyList();

  for (const vertex of graph.getVertices()) {
    residual.addVertex(vertex);
  }

  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      // Forward edge with capacity
      residual.addEdge(vertex, neighbor.vertex, neighbor.weight, true);
      // Backward edge with 0 capacity (if not exists)
      if (!residual.hasEdge(neighbor.vertex, vertex)) {
        residual.addEdge(neighbor.vertex, vertex, 0, true);
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

function getEdgeCapacity(graph, from, to) {
  return graph.getEdgeWeight(from, to);
}

function updateResidualCapacity(graph, from, to, flow) {
  const currentCapacity = graph.getEdgeWeight(from, to);
  const backwardCapacity = graph.getEdgeWeight(to, from);

  // Update forward edge
  graph.removeEdge(from, to);
  graph.addEdge(from, to, currentCapacity - flow, true);

  // Update backward edge
  graph.removeEdge(to, from);
  graph.addEdge(to, from, backwardCapacity + flow, true);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Performance monitor for graph algorithms
 */
function measureGraphPerformance(func, ...args) {
  const startTime = performance.now();
  const result = func(...args);
  const endTime = performance.now();

  return {
    result,
    time: endTime - startTime,
    complexity: analyzeGraphComplexity(func, args),
  };
}

function analyzeGraphComplexity(func, args) {
  const graph = args[0];
  if (graph && graph.getVertexCount) {
    const v = graph.getVertexCount();
    const e = graph.getEdgeCount ? graph.getEdgeCount() : v * v;

    return {
      vertices: v,
      edges: e,
      estimatedComplexity: estimateComplexity(func.name, v, e),
    };
  }

  return { estimatedComplexity: "Unknown" };
}

function estimateComplexity(algorithm, v, e) {
  const complexities = {
    bfs: `O(${v} + ${e})`,
    dfs: `O(${v} + ${e})`,
    dijkstra: `O((${v} + ${e}) log ${v})`,
    bellmanFord: `O(${v} * ${e})`,
    floydWarshall: `O(${v}³)`,
    primMST: `O((${v} + ${e}) log ${v})`,
    kruskalMST: `O(${e} log ${e})`,
    kosarajuSCC: `O(${v} + ${e})`,
    topologicalSort: `O(${v} + ${e})`,
  };

  return complexities[algorithm] || "Unknown";
}

/**
 * Graph visualizer
 */
function visualizeGraph(graph) {
  const vertices = graph.getVertices();
  const edges = [];

  for (const vertex of vertices) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      edges.push({
        from: vertex,
        to: neighbor.vertex,
        weight: neighbor.weight,
      });
    }
  }

  return {
    vertices,
    edges,
    vertexCount: vertices.length,
    edgeCount: edges.length,
  };
}

/**
 * Graph validator
 */
function validateGraph(graph) {
  const issues = [];

  // Check for isolated vertices
  for (const vertex of graph.getVertices()) {
    if (graph.getNeighbors(vertex).length === 0) {
      issues.push(`Isolated vertex: ${vertex}`);
    }
  }

  // Check for self-loops
  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (neighbor.vertex === vertex) {
        issues.push(`Self-loop on vertex: ${vertex}`);
      }
    }
  }

  // Check for duplicate edges
  const edgeSet = new Set();
  for (const vertex of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(vertex)) {
      const edge = [vertex, neighbor.vertex].sort().join("-");
      if (edgeSet.has(edge)) {
        issues.push(`Duplicate edge: ${edge}`);
      }
      edgeSet.add(edge);
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runGraphTests() {
  console.log("🧪 Running Graph Algorithm Tests...\n");

  // Create test graph
  const graph = new AdjacencyList();
  graph.addEdge("A", "B", 5);
  graph.addEdge("B", "C", 3);
  graph.addEdge("A", "C", 2);
  graph.addEdge("C", "D", 1);
  graph.addEdge("B", "D", 4);

  // Test BFS
  console.log("🔍 Testing BFS:");
  const bfsResult = bfs(graph, "A");
  console.log(
    `BFS from A: ${bfsResult.join(" -> ")} (expected: A -> B -> C -> D)`
  );

  // Test DFS
  console.log("\n🔍 Testing DFS:");
  const dfsResult = dfs(graph, "A");
  console.log(
    `DFS from A: ${dfsResult.join(" -> ")} (expected: A -> B -> C -> D)`
  );

  // Test shortest path
  console.log("\n🛣️ Testing Shortest Path:");
  const shortestPath = bfsShortestPath(graph, "A", "D");
  console.log(
    `Shortest path A to D: ${
      shortestPath ? shortestPath.join(" -> ") : "None"
    } (expected: A -> C -> D)`
  );

  // Test Dijkstra
  console.log("\n⚡ Testing Dijkstra:");
  const dijkstraResult = dijkstra(graph, "A");
  console.log(
    `Distances from A:`,
    Object.fromEntries(dijkstraResult.distances)
  );
  console.log(
    `Distance to D: ${dijkstraResult.distances.get("D")} (expected: 3)`
  );

  // Test connected components
  console.log("\n🔗 Testing Connected Components:");
  const components = findConnectedComponents(graph);
  console.log(`Connected components: ${components.length} (expected: 1)`);

  // Test cycle detection
  console.log("\n🔄 Testing Cycle Detection:");
  const hasCycleResult = hasCycle(graph);
  console.log(`Graph has cycle: ${hasCycleResult} (expected: false)`);

  // Test topological sort (add a cycle first)
  const dag = new AdjacencyList();
  dag.addEdge("A", "B");
  dag.addEdge("B", "C");
  dag.addEdge("A", "C");

  console.log("\n📊 Testing Topological Sort:");
  const topoSort = topologicalSort(dag);
  console.log(
    `Topological sort: ${
      topoSort ? topoSort.join(" -> ") : "None"
    } (expected: A -> B -> C)`
  );

  // Test MST
  console.log("\n🌳 Testing Prim's MST:");
  const mst = primMST(graph);
  console.log(`MST edges: ${mst.size} (expected: 3)`);

  // Test bipartite
  console.log("\n🎨 Testing Bipartite Check:");
  const bipartiteResult = isBipartite(graph);
  console.log(`Graph is bipartite: ${bipartiteResult} (expected: true)`);

  // Test performance
  console.log("\n⚡ Testing Performance:");
  const perf = measureGraphPerformance(dijkstra, graph, "A");
  console.log(`Dijkstra time: ${perf.time.toFixed(2)}ms`);
  console.log(`Complexity estimate: ${perf.complexity.estimatedComplexity}`);

  // Test graph validation
  console.log("\n✅ Testing Graph Validation:");
  const validation = validateGraph(graph);
  console.log(`Graph is valid: ${validation.isValid}`);
  if (!validation.isValid) {
    console.log("Issues:", validation.issues);
  }

  // Test graph visualization
  console.log("\n👁️ Testing Graph Visualization:");
  const visualization = visualizeGraph(graph);
  console.log(
    `Vertices: ${visualization.vertexCount}, Edges: ${visualization.edgeCount}`
  );

  console.log("\n✅ All graph tests completed!");
}

// Export all functions
module.exports = {
  // Graph representations
  AdjacencyList,
  AdjacencyMatrix,
  MinHeap,

  // Traversal algorithms
  bfs,
  bfsShortestPath,
  findConnectedComponents,
  dfs,
  dfsIterative,
  dfsPath,
  hasCycle,
  topologicalSort,
  topologicalSortKahn,

  // Shortest path algorithms
  dijkstra,
  reconstructPath,
  dijkstraWithPath,
  bellmanFord,
  floydWarshall,
  floydWarshallPath,
  aStar,
  manhattanDistance,

  // MST algorithms
  primMST,
  kruskalMST,
  DisjointSetUnion,

  // Advanced algorithms
  kosarajuSCC,
  isBipartite,
  fordFulkerson,

  // Utilities
  measureGraphPerformance,
  analyzeGraphComplexity,
  visualizeGraph,
  validateGraph,
  runGraphTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runGraphTests();
}
