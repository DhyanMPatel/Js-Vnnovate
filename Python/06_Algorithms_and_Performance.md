# 06 – Data Structures, Algorithms & Performance Engineering

> Objective: Solve FAANG-level problems efficiently using Python, understanding both algorithmic theory and practical optimization techniques.

## 1. Core Data Structures

### 1.1 Built-in Containers

- `list` (dynamic arrays), `deque` (double-ended queue), `heapq` (binary heap on lists), `bisect` (binary search helpers), `set`/`dict` (hash tables, ordered since 3.7).

### 1.2 Specialized Containers

| Module        | Structure                                                    | Use Case                                 |
| ------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `collections` | `deque`, `defaultdict`, `Counter`, `OrderedDict`, `ChainMap` | Caching, frequency counting              |
| `array`       | Compact numeric arrays                                       | Memory-sensitive workloads               |
| `queue`       | Thread-safe FIFO/LIFO/PriorityQueue                          | Producer-consumer systems                |
| `typing`      | `TypedDict`, `Protocol`                                      | Expressive statically checked structures |

### 1.3 Graph Structures

- Represent using adjacency lists (`dict[str, list[str]]`) or adjacency sets for quick membership checks.
- Weighted graphs via `dict[str, list[tuple[str, int]]]`.

## 2. Algorithm Patterns & Complexity

| Pattern             | Description                                     | Example                              |
| ------------------- | ----------------------------------------------- | ------------------------------------ |
| Sliding Window      | Move window over sequence to maintain invariant | Longest subarray with sum constraint |
| Two Pointers        | Move indices from ends/mid                      | Sorted array deduplication           |
| Divide & Conquer    | Recursively split problem                       | Merge sort, quickselect              |
| BFS/DFS             | Graph traversal                                 | Shortest unweighted path             |
| Dynamic Programming | Optimal substructure/overlap                    | Knapsack, edit distance              |
| Greedy              | Locally optimal choices                         | Interval scheduling                  |
| Binary Search       | Search monotonic space                          | Min feasible capacity                |

**Time Complexity Cheatsheet**

- O(1): hash lookups, push/pop on list/deque, dictionary updates.
- O(log n): binary search, heap push/pop.
- O(n): scanning lists/strings.
- O(n log n): efficient sorts, divide & conquer merges.
- O(n^2+): nested loops (watch out!).

## 3. Example Implementations

### 3.1 Sliding Window (Longest Substring w/ K distinct)

```python
def longest_k_distinct(s: str, k: int) -> int:
    from collections import defaultdict
    freq = defaultdict(int)
    left = max_len = 0
    for right, ch in enumerate(s):
        freq[ch] += 1
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len
```

### 3.2 Graph BFS (Shortest Path)

```python
from collections import deque

def shortest_path(graph: dict[str, list[str]], start: str, goal: str) -> list[str] | None:
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == goal:
            return path
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None
```

### 3.3 Dynamic Programming (Edit Distance)

```python
def edit_distance(a: str, b: str) -> int:
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(len(a) + 1):
        dp[i][0] = i
    for j in range(len(b) + 1):
        dp[0][j] = j
    for i, ca in enumerate(a, 1):
        for j, cb in enumerate(b, 1):
            cost = 0 if ca == cb else 1
            dp[i][j] = min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost,
            )
    return dp[-1][-1]
```

## 4. Profiling & Optimization Workflow

1. **Measure** – `timeit`, `cProfile`, `py-spy` to identify hot paths.
2. **Choose Data Structures** – e.g., `deque` for O(1) pops on both ends, `heapq` for priority tasks.
3. **Algorithmic Overhaul** – reduce complexity before micro-optimizing.
4. **Vectorize** – use NumPy/pandas for numeric workloads.
5. **Native Extensions** – apply `cython`, `numba`, Rust/PyO3 wrappers for CPU-bound sections.

### Example: optimizing frequency counting

```python
from collections import Counter
Counter(big_list)  # implemented in C, faster than manual loops
```

## 5. Parallel & Distributed Algorithms

- Use `concurrent.futures` for map-reduce style tasks.
- For large clusters, use `Ray`, `Dask`, or `Spark` (PySpark) to parallelize algorithms.
- Understand consistency & partitioning when scaling graph or ML workloads.

## 6. Numerical Stability & Precision

- Use `math.fsum`, `decimal`, or `fractions` when precision critical.
- For ML, monitor floating point errors; use `numpy.float32` vs `float64` intentionally.

## 7. Competitive Programming Tips

1. Precompute factorials/mod inverses for combinatorics.
2. Use `sys.stdin.readline` for faster IO.
3. Reuse memory buffers to avoid repeated allocations.
4. Understand recursion depth limits (`sys.setrecursionlimit`).

## 8. Mini Project – Log Analyzer with Heaps & Streaming

```python
import heapq
from dataclasses import dataclass

@dataclass(order=True)
class Entry:
    count: int
    endpoint: str

def top_k_endpoints(log_file: str, k: int) -> list[Entry]:
    counts: dict[str, int] = {}
    with open(log_file, "r", encoding="utf-8") as fh:
        for line in fh:
            endpoint = line.split()[6]  # naive extraction
            counts[endpoint] = counts.get(endpoint, 0) + 1
    heap: list[Entry] = []
    for endpoint, count in counts.items():
        heapq.heappush(heap, Entry(count, endpoint))
        if len(heap) > k:
            heapq.heappop(heap)
    return sorted(heap, reverse=True)
```

- Utilizes streaming IO, dictionary counting, min-heap for top-K.

## Best Practices

1. Choose the correct data structure before coding; draw diagrams.
2. Write time/space complexity in docstrings when implementing reusable algorithms.
3. Keep functions pure with explicit inputs/outputs for easier testing.
4. Reuse utility modules (`graph.py`, `dp.py`) across interview prep.
5. Benchmark solutions—FAANG interviews expect both clarity and efficiency.

## Further Research Checklist

- Advanced graph algorithms: Dijkstra with Fibonacci heap, A\*, union-find with path compression.
- String algorithms: suffix arrays, KMP, Z-algorithm, rolling hashes for plagiarism detection.
- Probabilistic structures: Bloom filters, Count-Min sketch, HyperLogLog.
- Parallel algorithms (MapReduce paradigms, BSP model) for massive datasets.
- Auto-vectorization strategies (NumPy broadcasting, JAX XLA compilation).
