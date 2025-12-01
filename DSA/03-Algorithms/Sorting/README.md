# 📊 Sorting Algorithms

> **Organizing Data Efficiently**

## 📋 Table of Contents

- [Why Sorting Matters](#why-sorting-matters)
- [Sorting Fundamentals](#sorting-fundamentals)
- [Comparison-Based Sorting](#comparison-based-sorting)
- [Non-Comparison Sorting](#non-comparison-sorting)
- [Implementation](#implementation)
- [Performance Analysis](#performance-analysis)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 Why Sorting Matters

### Real-World Applications

- **Database Queries**: ORDER BY clauses
- **Search Optimization**: Binary search requires sorted data
- **Data Analysis**: Finding patterns, outliers
- **User Interfaces**: Sorted lists, tables
- **Algorithms**: Many algorithms require sorted input

### Interview Importance

- **Fundamental Skill**: Tests basic algorithm understanding
- **Complexity Analysis**: Practice Big O analysis
- **Problem Solving**: Multiple approaches to same problem
- **Code Quality**: Clean, efficient implementations

## 🔍 Sorting Fundamentals

### Key Concepts

```javascript
// Stability: Equal elements maintain relative order
const stable = [5, 2, 5, 1]; // After sorting: [1, 2, 5, 5] (5s maintain order)

// In-place: Uses constant extra space
const inPlace = true; // O(1) auxiliary space

// Adaptivity: Performs better on partially sorted data
const adaptive = true; // Insertion sort is adaptive

// Comparison vs Non-Comparison
const comparison = true; // Uses element comparisons
```

### Sorting Terminology

```javascript
const sortingTerms = {
  Stable: "Preserves order of equal elements",
  "In-place": "Uses O(1) extra space",
  Adaptive: "Faster on partially sorted data",
  Internal: "All data fits in memory",
  External: "Data doesn't fit in memory",
  Comparison: "Uses element comparisons",
  "Non-comparison": "Uses properties of elements",
};
```

## ⚖️ Comparison-Based Sorting

### 1. Bubble Sort

```javascript
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }

  return arr;
}

// Time: O(n²) worst/average, O(n) best (optimized)
// Space: O(1)
// Stable: Yes
// In-place: Yes
```

### 2. Selection Sort

```javascript
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap with first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// Time: O(n²) all cases
// Space: O(1)
// Stable: No (unless modified)
// In-place: Yes
```

### 3. Insertion Sort

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements greater than key to right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

// Time: O(n²) worst/average, O(n) best (already sorted)
// Space: O(1)
// Stable: Yes
// In-place: Yes
// Adaptive: Yes
```

### 4. Merge Sort

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Time: O(n log n) all cases
// Space: O(n) auxiliary
// Stable: Yes
// In-place: No (without complex modifications)
```

### 5. Quick Sort

```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  // Choose last element as pivot
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Time: O(n log n) average, O(n²) worst
// Space: O(log n) average (recursion stack), O(n) worst
// Stable: No
// In-place: Yes
```

### 6. Heap Sort

```javascript
function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current root to end
    heapify(arr, i, 0); // Call heapify on reduced heap
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest); // Recursively heapify
  }
}

// Time: O(n log n) all cases
// Space: O(1)
// Stable: No
// In-place: Yes
```

## 🚀 Non-Comparison Sorting

### 1. Counting Sort

```javascript
function countingSort(arr) {
  if (arr.length === 0) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  // Create count array
  const count = new Array(range).fill(0);

  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }

  // Reconstruct sorted array
  const result = [];
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      result.push(i + min);
      count[i]--;
    }
  }

  return result;
}

// Time: O(n + k) where k = range
// Space: O(k)
// Stable: Can be made stable
// In-place: No
```

### 2. Radix Sort

```javascript
function radixSort(arr) {
  if (arr.length === 0) return arr;

  const max = Math.max(...arr);

  // Counting sort for each digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }

  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // Copy to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

// Time: O(d·(n + k)) where d = digits, k = base (10)
// Space: O(n + k)
// Stable: Yes
// In-place: No
```

### 3. Bucket Sort

```javascript
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // Create buckets
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount).fill(null).map(() => []);

  // Distribute elements into buckets
  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize);
    buckets[bucketIndex].push(num);
  }

  // Sort individual buckets and concatenate
  const result = [];
  for (const bucket of buckets) {
    if (bucket.length > 0) {
      // Use insertion sort for small buckets
      insertionSort(bucket);
      result.push(...bucket);
    }
  }

  return result;
}

// Time: O(n + k) average, O(n²) worst
// Space: O(n + k)
// Stable: Depends on bucket sort algorithm
// In-place: No
```

## 📊 Performance Analysis

### Comparison Table

| Algorithm | Best         | Average      | Worst        | Space    | Stable | In-place |
| --------- | ------------ | ------------ | ------------ | -------- | ------ | -------- |
| Bubble    | O(n)         | O(n²)        | O(n²)        | O(1)     | Yes    | Yes      |
| Selection | O(n²)        | O(n²)        | O(n²)        | O(1)     | No     | Yes      |
| Insertion | O(n)         | O(n²)        | O(n²)        | O(1)     | Yes    | Yes      |
| Merge     | O(n log n)   | O(n log n)   | O(n log n)   | O(n)     | Yes    | No       |
| Quick     | O(n log n)   | O(n log n)   | O(n²)        | O(log n) | No     | Yes      |
| Heap      | O(n log n)   | O(n log n)   | O(n log n)   | O(1)     | No     | Yes      |
| Counting  | O(n + k)     | O(n + k)     | O(n + k)     | O(k)     | Yes    | No       |
| Radix     | O(d·(n + k)) | O(d·(n + k)) | O(d·(n + k)) | O(n + k) | Yes    | No       |

### When to Use Which Algorithm

#### Small Arrays (< 100 elements)

```javascript
// Insertion sort - low overhead, adaptive
function sortSmallArray(arr) {
  if (arr.length < 100) {
    return insertionSort([...arr]);
  }
  return quickSort([...arr]);
}
```

#### Nearly Sorted Arrays

```javascript
// Insertion sort - performs well on nearly sorted data
function sortNearlySorted(arr) {
  // Check if array is nearly sorted
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) inversions++;
    if (inversions > arr.length / 10) break;
  }

  return inversions < arr.length / 10
    ? insertionSort([...arr])
    : mergeSort([...arr]);
}
```

#### Memory Constraints

```javascript
// Heap sort - O(1) space, guaranteed performance
function sortWithMemoryConstraint(arr) {
  if (arr.length > 1000000) {
    // Large array
    return heapSort([...arr]);
  }
  return mergeSort([...arr]);
}
```

#### Stability Required

```javascript
// Merge sort or stable quick sort variant
function stableSort(arr) {
  return mergeSort([...arr]);
}
```

## 🎯 Advanced Sorting Techniques

### 1. Hybrid Algorithms

```javascript
// Introsort: Quick sort + Heap sort fallback
function introSort(arr, maxDepth = 2 * Math.floor(Math.log2(arr.length))) {
  if (arr.length <= 16) {
    return insertionSort(arr);
  }

  if (maxDepth === 0) {
    return heapSort(arr);
  }

  const pivotIndex = partition(arr, 0, arr.length - 1);

  const left = introSort(arr.slice(0, pivotIndex), maxDepth - 1);
  const right = introSort(arr.slice(pivotIndex + 1), maxDepth - 1);

  return [...left, arr[pivotIndex], ...right];
}

// Timsort: Merge sort + Insertion sort (used in Python, JavaScript)
function timsort(arr) {
  const MIN_RUN = 32;
  const n = arr.length;

  // Sort small runs using insertion sort
  for (let i = 0; i < n; i += MIN_RUN) {
    const end = Math.min(i + MIN_RUN, n);
    insertionSortRange(arr, i, end);
  }

  // Merge sorted runs
  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size;
      const right = Math.min(left + 2 * size, n);

      if (mid < right) {
        mergeRange(arr, left, mid, right);
      }
    }
  }

  return arr;
}
```

### 2. External Sorting

```javascript
// For data that doesn't fit in memory
function externalSort(dataFile, chunkSize = 1000000) {
  // 1. Divide data into chunks that fit in memory
  const chunks = readFileInChunks(dataFile, chunkSize);

  // 2. Sort each chunk individually
  const sortedChunks = chunks.map((chunk) => quickSort(chunk));

  // 3. Merge sorted chunks using k-way merge
  return kWayMerge(sortedChunks);
}

function kWayMerge(sortedChunks) {
  const minHeap = new MinHeap();
  const result = [];

  // Initialize heap with first element of each chunk
  for (let i = 0; i < sortedChunks.length; i++) {
    if (sortedChunks[i].length > 0) {
      minHeap.insert({
        value: sortedChunks[i][0],
        chunkIndex: i,
        elementIndex: 0,
      });
    }
  }

  // Extract minimum and insert next from same chunk
  while (!minHeap.isEmpty()) {
    const min = minHeap.extractMin();
    result.push(min.value);

    const nextIndex = min.elementIndex + 1;
    if (nextIndex < sortedChunks[min.chunkIndex].length) {
      minHeap.insert({
        value: sortedChunks[min.chunkIndex][nextIndex],
        chunkIndex: min.chunkIndex,
        elementIndex: nextIndex,
      });
    }
  }

  return result;
}
```

## 💪 Practice Problems

### Easy

1. **Sort an Array** - Implement any sorting algorithm
2. **Valid Anagram** - Sort strings to check anagram
3. **Kth Largest Element** - Sort and find kth element
4. **Sort Colors** - Sort with limited colors (Dutch flag)

### Medium

1. **Merge Sorted Arrays** - Merge multiple sorted arrays
2. **Sort Characters By Frequency** - Sort by frequency
3. **Relative Sort Array** - Sort according to another array
4. **Array of Doubled Pairs** - Sort and pair elements

### Hard

1. **Maximum Gap** - Find maximum gap after sorting
2. **Count of Range Sum** - Count range sums (use sorting)
3. **Create Target Array** - Sort with given constraints
4. **Maximum Number** - Form largest number from array

## 🎤 Interview Tips

### Algorithm Selection Framework

```javascript
function chooseSortAlgorithm(arr, constraints) {
  const { size, memory, stability, range, partiallySorted } = constraints;

  if (size < 100) return "Insertion Sort";
  if (partiallySorted) return "Insertion Sort";
  if (memory.limited) return "Heap Sort";
  if (stability.required) return "Merge Sort";
  if (range.limited) return "Counting Sort";
  return "Quick Sort"; // Default choice
}
```

### Common Interview Questions

- "Implement quick sort from scratch"
- "Explain why merge sort is stable"
- "When would you use counting sort?"
- "What's the time complexity of heap sort?"
- "How would you sort a large dataset that doesn't fit in memory?"

### Communication Tips

- **Start with high-level approach** before coding
- **Explain trade-offs** between algorithms
- **Discuss edge cases** (empty array, single element)
- **Analyze complexity** of your implementation
- **Mention optimizations** (hybrid approaches)

## 📖 Additional Resources

### Videos

- **Sorting Algorithms Visualized**: Step-by-step animations
- **MIT 6.006 Sorting Lectures**: Academic perspective
- **Sorting Algorithm Comparisons**: Performance analysis

### Websites

- **Sorting Algorithms Visualizer**: Interactive comparisons
- **Algorithm-Designer**: Practice implementing sorts
- **GeeksforGeeks Sorting**: Comprehensive tutorials

### Books

- **"The Art of Computer Programming"**: Deep theoretical treatment
- **"Algorithms" by Sedgewick**: Practical implementations
- **"Programming Pearls"**: Algorithm design insights

## 🎓 What You Need from Other Resources

### Mathematical Concepts

- **Probability**: Average case analysis
- **Combinatorics**: Counting inversions
- **Information Theory**: Lower bounds on sorting

### Advanced Topics

- **Parallel Sorting**: Multi-threaded implementations
- **Distributed Sorting**: Sorting across machines
- **Online Sorting**: Sorting streaming data
- **Adaptive Sorting**: Algorithms that adapt to input

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Searching** → `../Searching/README.md`

> 💡 **Key Insight**: Sorting algorithms teach fundamental algorithmic thinking. Understanding the trade-offs helps you choose the right tool for any situation!

---

## 📊 Quick Reference

### Must-Know Sorting Algorithms

```javascript
const essentialSorts = {
  bubble: "Educational, O(n²)",
  insertion: "Small/nearly sorted arrays",
  merge: "Stable, O(n log n) guaranteed",
  quick: "Fast average case, in-place",
  heap: "O(1) space, guaranteed performance",
  counting: "Linear for integers",
  radix: "Linear for fixed-length numbers",
};
```

### Interview Cheat Sheet

- **Time Complexity**: Know best/average/worst cases
- **Space Complexity**: Auxiliary space requirements
- **Stability**: Does it preserve order of equals?
- **In-place**: Does it use O(1) extra space?
- **Adaptivity**: Does it perform better on sorted data?

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Arrays, Big O Complexity_  
_Time Commitment: 1 week_
