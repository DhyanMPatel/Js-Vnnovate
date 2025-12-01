// 📊 Sorting Algorithms Implementation
// Complete implementations of all sorting algorithms with analysis

// ==========================================
// BASIC SORTING ALGORITHMS
// ==========================================

/**
 * Bubble Sort
 * Repeatedly swap adjacent elements if they're in wrong order
 * Time: O(n²) worst/average, O(n) best (with optimization)
 * Space: O(1)
 * Stable: Yes
 */
function bubbleSort(arr) {
  const n = arr.length;
  const result = [...arr]; // Create copy to avoid modifying original

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }

  return result;
}

/**
 * Optimized Bubble Sort
 * Tracks last swap position to reduce comparisons
 */
function optimizedBubbleSort(arr) {
  const n = arr.length;
  const result = [...arr];
  let newN = n;

  while (newN > 1) {
    let lastSwap = 0;

    for (let i = 1; i < newN; i++) {
      if (result[i - 1] > result[i]) {
        [result[i - 1], result[i]] = [result[i], result[i - 1]];
        lastSwap = i;
      }
    }

    newN = lastSwap;
    if (lastSwap === 0) break;
  }

  return result;
}

/**
 * Selection Sort
 * Find minimum element and place at beginning
 * Time: O(n²) all cases
 * Space: O(1)
 * Stable: No (without modification)
 */
function selectionSort(arr) {
  const n = arr.length;
  const result = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    // Swap minimum with first unsorted element
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }

  return result;
}

/**
 * Insertion Sort
 * Build sorted array one element at a time
 * Time: O(n²) worst/average, O(n) best (already sorted)
 * Space: O(1)
 * Stable: Yes
 */
function insertionSort(arr) {
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;

    // Shift elements greater than key to the right
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = key;
  }

  return result;
}

/**
 * Binary Insertion Sort
 * Uses binary search to find insertion position
 */
function binaryInsertionSort(arr) {
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const key = result[i];

    // Find position using binary search
    let left = 0,
      right = i - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (result[mid] > key) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // Shift elements and insert
    for (let j = i - 1; j >= left; j--) {
      result[j + 1] = result[j];
    }
    result[left] = key;
  }

  return result;
}

// ==========================================
// ADVANCED SORTING ALGORITHMS
// ==========================================

/**
 * Merge Sort
 * Divide and conquer algorithm
 * Time: O(n log n) all cases
 * Space: O(n) for merge operation
 * Stable: Yes
 */
function mergeSort(arr) {
  // Base case: array of length 0 or 1 is already sorted
  if (arr.length <= 1) return arr;

  // Divide array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge sorted halves
  return merge(left, right);
}

/**
 * Merge helper function for Merge Sort
 */
function merge(left, right) {
  const merged = [];
  let leftIndex = 0,
    rightIndex = 0;

  // Compare elements from both arrays and merge
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex++;
    } else {
      merged.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements
  return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * In-place Merge Sort
 * Reduces space complexity to O(1) but more complex
 */
function inPlaceMergeSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  inPlaceMergeSort(arr, left, mid);
  inPlaceMergeSort(arr, mid + 1, right);
  inPlaceMerge(arr, left, mid, right);
}

function inPlaceMerge(arr, left, mid, right) {
  // Create temporary arrays for the two halves
  const leftTemp = arr.slice(left, mid + 1);
  const rightTemp = arr.slice(mid + 1, right + 1);

  let i = 0,
    j = 0,
    k = left;

  while (i < leftTemp.length && j < rightTemp.length) {
    if (leftTemp[i] <= rightTemp[j]) {
      arr[k++] = leftTemp[i++];
    } else {
      arr[k++] = rightTemp[j++];
    }
  }

  while (i < leftTemp.length) arr[k++] = leftTemp[i++];
  while (j < rightTemp.length) arr[k++] = rightTemp[j++];
}

/**
 * Quick Sort
 * Partition-based divide and conquer
 * Time: O(n log n) average, O(n²) worst
 * Space: O(log n) average (recursion stack)
 * Stable: No
 */
function quickSort(arr) {
  // Create copy to avoid modifying original
  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1);
  return result;
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    // Partition array and get pivot index
    const pivotIndex = partition(arr, low, high);

    // Recursively sort elements before and after partition
    quickSortHelper(arr, low, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function partition(arr, low, high) {
  // Choose the rightmost element as pivot
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    // If current element is smaller than pivot
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Quick Sort with Random Pivot
 * Reduces chance of worst-case O(n²)
 */
function quickSortRandom(arr) {
  const result = [...arr];
  quickSortRandomHelper(result, 0, result.length - 1);
  return result;
}

function quickSortRandomHelper(arr, low, high) {
  if (low < high) {
    const pivotIndex = randomPartition(arr, low, high);
    quickSortRandomHelper(arr, low, pivotIndex - 1);
    quickSortRandomHelper(arr, pivotIndex + 1, high);
  }
}

function randomPartition(arr, low, high) {
  // Choose random pivot
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];

  return partition(arr, low, high);
}

/**
 * Quick Sort with Three-way Partition (Dutch National Flag)
 * Efficient for arrays with many duplicates
 */
function quickSortThreeWay(arr) {
  const result = [...arr];
  quickSortThreeWayHelper(result, 0, result.length - 1);
  return result;
}

function quickSortThreeWayHelper(arr, low, high) {
  if (low >= high) return;

  const pivot = arr[low];
  let lt = low; // arr[low..lt-1] < pivot
  let gt = high; // arr[gt+1..high] > pivot
  let i = low + 1; // arr[lt..i-1] == pivot

  while (i <= gt) {
    if (arr[i] < pivot) {
      [arr[lt], arr[i]] = [arr[i], arr[lt]];
      lt++;
      i++;
    } else if (arr[i] > pivot) {
      [arr[i], arr[gt]] = [arr[gt], arr[i]];
      gt--;
    } else {
      i++;
    }
  }

  quickSortThreeWayHelper(arr, low, lt - 1);
  quickSortThreeWayHelper(arr, gt + 1, high);
}

// ==========================================
// HEAP SORT
// ==========================================

/**
 * Heap Sort
 * Uses binary heap data structure
 * Time: O(n log n) all cases
 * Space: O(1)
 * Stable: No
 */
function heapSort(arr) {
  const result = [...arr];
  const n = result.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [result[0], result[i]] = [result[i], result[0]];

    // Heapify reduced heap
    heapify(result, i, 0);
  }

  return result;
}

/**
 * Heapify helper function
 */
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

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

    // Recursively heapify the affected subtree
    heapify(arr, n, largest);
  }
}

// ==========================================
// LINEAR TIME SORTING ALGORITHMS
// ==========================================

/**
 * Counting Sort
 * Non-comparison based sorting for integers
 * Time: O(n + k) where k is range of values
 * Space: O(k)
 * Stable: Yes
 */
function countingSort(arr) {
  if (arr.length === 0) return [];

  // Find minimum and maximum values
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  // Create count array
  const count = new Array(range).fill(0);

  // Count occurrences of each element
  for (const num of arr) {
    count[num - min]++;
  }

  // Build output array
  const result = [];
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      result.push(i + min);
      count[i]--;
    }
  }

  return result;
}

/**
 * Stable Counting Sort
 * Maintains relative order of equal elements
 */
function stableCountingSort(arr) {
  if (arr.length === 0) return [];

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  // Count array
  const count = new Array(range).fill(0);

  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }

  // Transform count to cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  const result = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const index = num - min;
    count[index]--;
    result[count[index]] = num;
  }

  return result;
}

/**
 * Radix Sort (LSD - Least Significant Digit)
 * Non-comparison based sorting for integers
 * Time: O(d * (n + k)) where d is number of digits
 * Space: O(n + k)
 * Stable: Yes
 */
function radixSort(arr) {
  if (arr.length === 0) return [];

  // Handle negative numbers by separating positive and negative
  const negatives = arr.filter((x) => x < 0);
  const positives = arr.filter((x) => x >= 0);

  // Sort positive numbers
  const sortedPositives = radixSortPositive(positives);

  // Sort negative numbers (in reverse order)
  const sortedNegatives = radixSortNegative(negatives);

  // Combine results
  return [...sortedNegatives, ...sortedPositives];
}

function radixSortPositive(arr) {
  if (arr.length === 0) return [];

  // Find maximum number to know number of digits
  const max = Math.max(...arr);

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }

  return arr;
}

function radixSortNegative(arr) {
  if (arr.length === 0) return [];

  // Convert to positive, sort, then convert back and reverse
  const absArr = arr.map((x) => Math.abs(x));
  const sortedAbs = radixSortPositive(absArr);
  return sortedAbs.map((x) => -x).reverse();
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Transform count to cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // Copy output back to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

/**
 * Bucket Sort
 * Distributes elements into buckets and sorts each bucket
 * Time: O(n + k) average, O(n²) worst
 * Space: O(n + k)
 * Stable: Depends on bucket sorting algorithm
 */
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return [];

  // Find minimum and maximum values
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // Calculate bucket count
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount).fill().map(() => []);

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

// ==========================================
// SPECIALIZED SORTING ALGORITHMS
// ==========================================

/**
 * Shell Sort
 * Generalization of insertion sort
 * Time: O(n²) worst, O(n^(3/2)) average (depends on gap sequence)
 * Space: O(1)
 * Stable: No
 */
function shellSort(arr) {
  const result = [...arr];
  const n = result.length;

  // Start with a large gap and reduce it
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j;

      // Shift elements that are gap distance apart
      for (j = i; j >= gap && result[j - gap] > temp; j -= gap) {
        result[j] = result[j - gap];
      }

      result[j] = temp;
    }
  }

  return result;
}

/**
 * Shell Sort with Knuth Sequence
 * More efficient gap sequence
 */
function shellSortKnuth(arr) {
  const result = [...arr];
  const n = result.length;

  // Calculate initial gap using Knuth sequence
  let gap = 1;
  while (gap < n / 3) {
    gap = gap * 3 + 1;
  }

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j;

      for (j = i; j >= gap && result[j - gap] > temp; j -= gap) {
        result[j] = result[j - gap];
      }

      result[j] = temp;
    }

    gap = Math.floor(gap / 3);
  }

  return result;
}

/**
 * Cocktail Sort (Bidirectional Bubble Sort)
 * Bubble sort variant that sorts in both directions
 * Time: O(n²)
 * Space: O(1)
 * Stable: Yes
 */
function cocktailSort(arr) {
  const result = [...arr];
  const n = result.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (result[i] > result[i + 1]) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    // Backward pass
    for (let i = end - 1; i >= start; i--) {
      if (result[i] > result[i + 1]) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swapped = true;
      }
    }

    start++;
  }

  return result;
}

/**
 * Odd Even Sort
 * Similar to bubble sort but compares odd-even and even-odd pairs
 * Time: O(n²)
 * Space: O(1)
 * Stable: Yes
 */
function oddEvenSort(arr) {
  const result = [...arr];
  const n = result.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    // Perform odd-even sort
    for (let i = 1; i < n - 1; i += 2) {
      if (result[i] > result[i + 1]) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        sorted = false;
      }
    }

    // Perform even-odd sort
    for (let i = 0; i < n - 1; i += 2) {
      if (result[i] > result[i + 1]) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        sorted = false;
      }
    }
  }

  return result;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Generic comparison function
 */
function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Check if array is sorted
 */
function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

/**
 * Generate random array for testing
 */
function generateRandomArray(size, min = 0, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generate sorted array for testing
 */
function generateSortedArray(size, ascending = true) {
  const arr = Array.from({ length: size }, (_, i) => i);
  return ascending ? arr : arr.reverse();
}

/**
 * Generate nearly sorted array for testing
 */
function generateNearlySortedArray(size, swaps = 10) {
  const arr = Array.from({ length: size }, (_, i) => i);

  // Perform random swaps
  for (let i = 0; i < swaps; i++) {
    const i1 = Math.floor(Math.random() * size);
    const i2 = Math.floor(Math.random() * size);
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
  }

  return arr;
}

/**
 * Generate array with many duplicates for testing
 */
function generateArrayWithDuplicates(size, uniqueValues = 10) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * uniqueValues)
  );
}

// ==========================================
// SORTING ANALYSIS UTILITIES
// ==========================================

/**
 * Measure sorting performance
 */
function measureSortPerformance(sortFunction, arr, iterations = 1000) {
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const testArr = [...arr];
    const startTime = performance.now();
    sortFunction(testArr);
    const endTime = performance.now();
    times.push(endTime - startTime);
  }

  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return {
    average: avgTime,
    minimum: minTime,
    maximum: maxTime,
    iterations,
  };
}

/**
 * Compare multiple sorting algorithms
 */
function compareSortingAlgorithms(algorithms, testArray) {
  const results = {};

  for (const [name, algorithm] of Object.entries(algorithms)) {
    console.log(`Testing ${name}...`);

    try {
      const testArr = [...testArray];
      const startTime = performance.now();
      const sorted = algorithm(testArr);
      const endTime = performance.now();

      results[name] = {
        time: endTime - startTime,
        correct: isSorted(sorted),
        length: sorted.length,
        originalLength: testArray.length,
      };
    } catch (error) {
      results[name] = {
        error: error.message,
        correct: false,
      };
    }
  }

  return results;
}

/**
 * Visualize sorting process (for educational purposes)
 */
function visualizeSort(sortFunction, arr, stepCallback = null) {
  const steps = [];
  const result = [...arr];

  // This is a simplified version - in practice, you'd modify
  // the sorting algorithm to capture each step
  steps.push({ array: [...result], description: "Initial array" });

  // Sort the array
  const sorted = sortFunction(result);

  steps.push({ array: [...sorted], description: "Sorted array" });

  if (stepCallback) {
    steps.forEach((step) => stepCallback(step));
  }

  return steps;
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runSortingTests() {
  console.log("🧪 Running Sorting Algorithm Tests...\n");

  // Test arrays
  const testArrays = {
    empty: [],
    single: [42],
    sorted: [1, 2, 3, 4, 5],
    reverse: [5, 4, 3, 2, 1],
    random: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3],
    duplicates: [2, 3, 2, 1, 4, 1, 5, 2],
    negative: [-3, -1, -4, -2, -5, 0, 2, 1],
  };

  // Sorting algorithms to test
  const algorithms = {
    "Bubble Sort": bubbleSort,
    "Optimized Bubble Sort": optimizedBubbleSort,
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
    "Binary Insertion Sort": binaryInsertionSort,
    "Merge Sort": mergeSort,
    "Quick Sort": quickSort,
    "Quick Sort (Random)": quickSortRandom,
    "Quick Sort (Three-way)": quickSortThreeWay,
    "Heap Sort": heapSort,
    "Counting Sort": countingSort,
    "Radix Sort": radixSort,
    "Bucket Sort": bucketSort,
    "Shell Sort": shellSort,
    "Shell Sort (Knuth)": shellSortKnuth,
    "Cocktail Sort": cocktailSort,
    "Odd Even Sort": oddEvenSort,
  };

  // Test each algorithm with each test case
  for (const [algorithmName, algorithm] of Object.entries(algorithms)) {
    console.log(`\n📊 Testing ${algorithmName}:`);

    for (const [testName, testArray] of Object.entries(testArrays)) {
      try {
        const result = algorithm(testArray);
        const isCorrect =
          isSorted(result) && result.length === testArray.length;

        console.log(`  ${testName}: ${isCorrect ? "✅" : "❌"}`);

        if (!isCorrect) {
          console.log(`    Input: [${testArray.join(", ")}]`);
          console.log(`    Output: [${result.join(", ")}]`);
        }
      } catch (error) {
        console.log(`  ${testName}: ❌ Error: ${error.message}`);
      }
    }
  }

  // Performance comparison
  console.log("\n⚡ Performance Comparison:");
  const performanceArray = generateRandomArray(1000, 0, 1000);

  const performanceResults = compareSortingAlgorithms(
    {
      "Bubble Sort": bubbleSort,
      "Selection Sort": selectionSort,
      "Insertion Sort": insertionSort,
      "Merge Sort": mergeSort,
      "Quick Sort": quickSort,
      "Heap Sort": heapSort,
      "Counting Sort": countingSort,
      "Radix Sort": radixSort,
    },
    performanceArray
  );

  for (const [name, result] of Object.entries(performanceResults)) {
    if (result.error) {
      console.log(`${name}: ❌ ${result.error}`);
    } else {
      console.log(
        `${name}: ${result.time.toFixed(2)}ms ${result.correct ? "✅" : "❌"}`
      );
    }
  }

  console.log("\n✅ All tests completed!");
}

// Export all sorting functions and utilities
module.exports = {
  // Basic sorting algorithms
  bubbleSort,
  optimizedBubbleSort,
  selectionSort,
  insertionSort,
  binaryInsertionSort,

  // Advanced sorting algorithms
  mergeSort,
  inPlaceMergeSort,
  quickSort,
  quickSortRandom,
  quickSortThreeWay,

  // Heap sort
  heapSort,

  // Linear time sorting
  countingSort,
  stableCountingSort,
  radixSort,
  bucketSort,

  // Specialized sorting
  shellSort,
  shellSortKnuth,
  cocktailSort,
  oddEvenSort,

  // Utility functions
  compare,
  isSorted,
  generateRandomArray,
  generateSortedArray,
  generateNearlySortedArray,
  generateArrayWithDuplicates,
  measureSortPerformance,
  compareSortingAlgorithms,
  visualizeSort,
  runSortingTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runSortingTests();
}
