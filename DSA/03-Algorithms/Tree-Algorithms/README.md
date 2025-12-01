# 🌳 Tree Algorithms

> **Hierarchical Data Processing and Traversal**

## 📋 Table of Contents

- [What are Tree Algorithms?](#what-are-tree-algorithms)
- [Tree Fundamentals](#tree-fundamentals)
- [Tree Traversal Algorithms](#tree-traversal-algorithms)
- [Binary Search Tree Operations](#binary-search-tree-operations)
- [Balanced Trees](#balanced-trees)
- [Advanced Tree Algorithms](#advanced-tree-algorithms)
- [Specialized Trees](#specialized-trees)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Tree Algorithms?

### Definition

Tree algorithms are techniques for processing and manipulating hierarchical data structures where elements are organized in parent-child relationships. Trees are fundamental data structures used to represent hierarchical relationships and enable efficient searching, insertion, and deletion operations.

### Real-World Analogy

```javascript
// Think of a company organizational chart:
// CEO at the root
// VPs as children of CEO
// Directors as children of VPs
// Managers as children of Directors
// Employees as leaf nodes

const orgChart = {
  CEO: {
    VP_Engineering: {
      Director_Frontend: {
        Manager_UI: ["Dev1", "Dev2"],
        Manager_UX: ["Designer1", "Designer2"],
      },
      Director_Backend: {
        Manager_API: ["Dev3", "Dev4"],
        Manager_Database: ["DBA1", "DBA2"],
      },
    },
    VP_Sales: {
      Director_Enterprise: ["Sales1", "Sales2"],
      Director_SMB: ["Sales3", "Sales4"],
    },
  },
};
```

### Why Tree Algorithms Matter

- **Hierarchical Data**: Natural representation for file systems, organizations
- **Efficient Operations**: O(log n) average case for balanced trees
- **Ordered Data**: Maintain sorted order with fast operations
- **Search Optimization**: Faster than linear search for sorted data
- **Algorithm Foundation**: Basis for many advanced algorithms

## 🔍 Tree Fundamentals

### Basic Tree Structure

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = null; // Optional
    this.height = 1; // For balanced trees
    this.size = 1; // For order statistics
  }
}

class NaryTreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}
```

### Tree Properties

```javascript
// Height: Longest path from root to leaf
function treeHeight(node) {
  if (node === null) return -1;
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}

// Size: Total number of nodes
function treeSize(node) {
  if (node === null) return 0;
  return 1 + treeSize(node.left) + treeSize(node.right);
}

// Depth: Distance from root to current node
function nodeDepth(root, target, depth = 0) {
  if (root === null) return -1;
  if (root.val === target) return depth;

  const leftDepth = nodeDepth(root.left, target, depth + 1);
  if (leftDepth !== -1) return leftDepth;

  return nodeDepth(root.right, target, depth + 1);
}
```

## 🌳 Tree Traversal Algorithms

### 1. Depth-First Search (DFS)

#### Pre-order Traversal

```javascript
function preorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (node === null) return;

    result.push(node.val); // Process current
    dfs(node.left); // Process left subtree
    dfs(node.right); // Process right subtree
  }

  dfs(root);
  return result;
}

// Iterative version
function preorderIterative(root) {
  if (root === null) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Push right first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
```

#### In-order Traversal

```javascript
function inorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (node === null) return;

    dfs(node.left); // Process left subtree
    result.push(node.val); // Process current
    dfs(node.right); // Process right subtree
  }

  dfs(root);
  return result;
}

// Iterative version
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}
```

#### Post-order Traversal

```javascript
function postorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (node === null) return;

    dfs(node.left); // Process left subtree
    dfs(node.right); // Process right subtree
    result.push(node.val); // Process current
  }

  dfs(root);
  return result;
}

// Iterative version using two stacks
function postorderIterative(root) {
  if (root === null) return [];

  const result = [];
  const stack1 = [root];
  const stack2 = [];

  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);

    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }

  while (stack2.length > 0) {
    result.push(stack2.pop().val);
  }

  return result;
}
```

### 2. Breadth-First Search (BFS)

#### Level Order Traversal

```javascript
function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// Simple BFS (single array result)
function bfs(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}
```

### 3. Specialized Traversals

#### Zigzag Traversal

```javascript
function zigzagLevelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}
```

#### Boundary Traversal

```javascript
function boundaryOfBinaryTree(root) {
  if (root === null) return [];

  const result = [];

  // Add root if it's not a leaf
  if (!isLeaf(root)) result.push(root.val);

  // Add left boundary
  addLeftBoundary(root.left, result);

  // Add leaves
  addLeaves(root, result);

  // Add right boundary (in reverse)
  addRightBoundary(root.right, result);

  return result;
}

function isLeaf(node) {
  return node !== null && node.left === null && node.right === null;
}

function addLeftBoundary(node, result) {
  while (node !== null) {
    if (!isLeaf(node)) result.push(node.val);
    node = node.left || node.right;
  }
}

function addLeaves(node, result) {
  if (node === null) return;

  if (isLeaf(node)) {
    result.push(node.val);
    return;
  }

  addLeaves(node.left, result);
  addLeaves(node.right, result);
}

function addRightBoundary(node, result) {
  const temp = [];

  while (node !== null) {
    if (!isLeaf(node)) temp.push(node.val);
    node = node.right || node.left;
  }

  // Add in reverse order
  for (let i = temp.length - 1; i >= 0; i--) {
    result.push(temp[i]);
  }
}
```

## 🔍 Binary Search Tree Operations

### 1. Basic Operations

#### Search

```javascript
function searchBST(root, val) {
  if (root === null) return null;

  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}

// Iterative search
function searchBSTIterative(root, val) {
  let current = root;

  while (current !== null) {
    if (current.val === val) return current;
    if (val < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return null;
}
```

#### Insert

```javascript
function insertIntoBST(root, val) {
  if (root === null) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}

// Iterative insert
function insertIntoBSTIterative(root, val) {
  if (root === null) return new TreeNode(val);

  let current = root;
  let parent = null;

  while (current !== null) {
    parent = current;
    if (val < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  if (val < parent.val) {
    parent.left = new TreeNode(val);
  } else {
    parent.right = new TreeNode(val);
  }

  return root;
}
```

#### Delete

```javascript
function deleteNode(root, key) {
  if (root === null) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to be deleted found

    // Case 1: No child
    if (root.left === null && root.right === null) {
      return null;
    }

    // Case 2: One child
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // Case 3: Two children
    // Find inorder successor (smallest in right subtree)
    let successor = root.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    // Replace root's value with successor's value
    root.val = successor.val;

    // Delete the successor
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}
```

### 2. Advanced BST Operations

#### Find Min/Max

```javascript
function findMin(root) {
  if (root === null) return null;

  while (root.left !== null) {
    root = root.left;
  }

  return root;
}

function findMax(root) {
  if (root === null) return null;

  while (root.right !== null) {
    root = root.right;
  }

  return root;
}
```

#### Validate BST

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}
```

#### Find Kth Smallest/Largest

```javascript
function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (node === null || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}

function kthLargest(root, k) {
  let count = 0;
  let result = null;

  function reverseInorder(node) {
    if (node === null || result !== null) return;

    reverseInorder(node.right);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    reverseInorder(node.left);
  }

  reverseInorder(root);
  return result;
}
```

## 🌲 Balanced Trees

### 1. AVL Trees

#### AVL Rotation

```javascript
class AVLNode extends TreeNode {
  constructor(val) {
    super(val);
    this.height = 1;
  }
}

function getHeight(node) {
  return node ? node.height : 0;
}

function updateHeight(node) {
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function getBalance(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

// Right rotation
function rightRotate(y) {
  const x = y.left;
  const T2 = x.right;

  // Perform rotation
  x.right = y;
  y.left = T2;

  // Update heights
  updateHeight(y);
  updateHeight(x);

  return x;
}

// Left rotation
function leftRotate(x) {
  const y = x.right;
  const T2 = y.left;

  // Perform rotation
  y.left = x;
  x.right = T2;

  // Update heights
  updateHeight(x);
  updateHeight(y);

  return y;
}
```

#### AVL Insert

```javascript
function insertAVL(root, val) {
  // Standard BST insertion
  if (root === null) return new AVLNode(val);

  if (val < root.val) {
    root.left = insertAVL(root.left, val);
  } else if (val > root.val) {
    root.right = insertAVL(root.right, val);
  } else {
    return root; // Duplicate values not allowed
  }

  // Update height
  updateHeight(root);

  // Get balance factor
  const balance = getBalance(root);

  // Balance the tree

  // Left Left Case
  if (balance > 1 && val < root.left.val) {
    return rightRotate(root);
  }

  // Right Right Case
  if (balance < -1 && val > root.right.val) {
    return leftRotate(root);
  }

  // Left Right Case
  if (balance > 1 && val > root.left.val) {
    root.left = leftRotate(root.left);
    return rightRotate(root);
  }

  // Right Left Case
  if (balance < -1 && val < root.right.val) {
    root.right = rightRotate(root.right);
    return leftRotate(root);
  }

  return root;
}
```

### 2. Red-Black Trees

#### Red-Black Node Structure

```javascript
class RBNode {
  constructor(val, color = "RED", left = null, right = null) {
    this.val = val;
    this.color = color; // RED or BLACK
    this.left = left;
    this.right = right;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.NIL = new RBNode(null, "BLACK");
    this.root = this.NIL;
  }

  // Red-Black insertion with rebalancing
  insert(val) {
    const node = new RBNode(val, "RED", this.NIL, this.NIL);

    // Standard BST insertion
    let parent = null;
    let current = this.root;

    while (current !== this.NIL) {
      parent = current;
      if (node.val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    node.parent = parent;

    if (parent === null) {
      this.root = node;
    } else if (node.val < parent.val) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    // Fix Red-Black properties
    this.insertFixup(node);
  }

  insertFixup(node) {
    while (node.parent && node.parent.color === "RED") {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;

        if (uncle.color === "RED") {
          // Case 1: Recolor
          node.parent.color = "BLACK";
          uncle.color = "BLACK";
          node.parent.parent.color = "RED";
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            // Case 2: Left rotation
            node = node.parent;
            this.leftRotate(node);
          }

          // Case 3: Right rotation
          node.parent.color = "BLACK";
          node.parent.parent.color = "RED";
          this.rightRotate(node.parent.parent);
        }
      } else {
        // Symmetric cases
        // ... (mirror of above)
      }
    }

    this.root.color = "BLACK";
  }
}
```

## 🚀 Advanced Tree Algorithms

### 1. Lowest Common Ancestor (LCA)

#### Binary Tree LCA

```javascript
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}
```

#### BST LCA

```javascript
function lowestCommonAncestorBST(root, p, q) {
  if (root === null) return null;

  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestorBST(root.left, p, q);
  }

  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestorBST(root.right, p, q);
  }

  return root;
}
```

### 2. Diameter of Binary Tree

```javascript
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function height(node) {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}
```

### 3. Maximum Path Sum

```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (node === null) return 0;

    // Max path sum from left and right subtrees
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // Price to start a new path where current node is highest node
    const currentPath = node.val + leftGain + rightGain;

    // Update max sum
    maxSum = Math.max(maxSum, currentPath);

    // Return max gain if continuing the same path
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
```

### 4. Serialize and Deserialize Tree

```javascript
function serialize(root) {
  const result = [];

  function dfs(node) {
    if (node === null) {
      result.push("null");
      return;
    }

    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(",");
}

function deserialize(data) {
  const values = data.split(",");
  let index = 0;

  function dfs() {
    if (index >= values.length) return null;

    const val = values[index++];
    if (val === "null") return null;

    const node = new TreeNode(parseInt(val));
    node.left = dfs();
    node.right = dfs();

    return node;
  }

  return dfs();
}
```

## 🎯 Specialized Trees

### 1. Trie (Prefix Tree)

#### Trie Implementation

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.prefixCount = 0;
    this.wordCount = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
      current.prefixCount++;
    }

    current.isEndOfWord = true;
    current.wordCount++;
  }

  search(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }

    return current.isEndOfWord;
  }

  startsWith(prefix) {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }

    return true;
  }

  countWordsStartingWith(prefix) {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children[char]) {
        return 0;
      }
      current = current.children[char];
    }

    return current.wordCount;
  }
}
```

### 2. Segment Tree

#### Segment Tree Implementation

```javascript
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.build(arr, 2 * node + 1, start, mid);
    this.build(arr, 2 * node + 2, mid + 1, end);

    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  query(l, r, node = 0, start = 0, end = this.n - 1) {
    if (r < start || end < l) {
      return 0; // Out of range
    }

    if (l <= start && end <= r) {
      return this.tree[node]; // Completely in range
    }

    // Partially in range
    const mid = Math.floor((start + end) / 2);
    return (
      this.query(l, r, 2 * node + 1, start, mid) +
      this.query(l, r, 2 * node + 2, mid + 1, end)
    );
  }

  update(index, value, node = 0, start = 0, end = this.n - 1) {
    if (start === end) {
      this.tree[node] = value;
      return;
    }

    const mid = Math.floor((start + end) / 2);

    if (index <= mid) {
      this.update(index, value, 2 * node + 1, start, mid);
    } else {
      this.update(index, value, 2 * node + 2, mid + 1, end);
    }

    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }
}
```

### 3. Fenwick Tree (Binary Indexed Tree)

#### Fenwick Tree Implementation

```javascript
class FenwickTree {
  constructor(size) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update(index, delta) {
    index++; // Convert to 1-based indexing

    while (index <= this.size) {
      this.tree[index] += delta;
      index += index & -index; // Move to next responsible node
    }
  }

  query(index) {
    index++; // Convert to 1-based indexing
    let sum = 0;

    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index; // Move to parent
    }

    return sum;
  }

  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}
```

## 🚀 Real-World Applications

### 1. File System Operations

```javascript
class FileSystemTree {
  constructor() {
    this.root = new TreeNode("/");
  }

  createPath(path) {
    const parts = path.split("/").filter((part) => part.length > 0);
    let current = this.root;

    for (const part of parts) {
      if (!current.children) {
        current.children = new Map();
      }

      if (!current.children.has(part)) {
        current.children.set(part, new TreeNode(part));
      }

      current = current.children.get(part);
    }

    return true;
  }

  listFiles(path) {
    const node = this.findNode(path);
    if (!node) return [];

    return Array.from(node.children.keys());
  }

  findNode(path) {
    if (path === "/") return this.root;

    const parts = path.split("/").filter((part) => part.length > 0);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children.has(part)) {
        return null;
      }
      current = current.children.get(part);
    }

    return current;
  }
}
```

### 2. Expression Tree Evaluator

```javascript
class ExpressionTree {
  static build(postfix) {
    const stack = [];

    for (const token of postfix) {
      if (this.isOperator(token)) {
        const right = stack.pop();
        const left = stack.pop();
        const node = new TreeNode(token, left, right);
        stack.push(node);
      } else {
        stack.push(new TreeNode(token));
      }
    }

    return stack.pop();
  }

  static evaluate(node) {
    if (!node.left && !node.right) {
      return parseFloat(node.val);
    }

    const left = this.evaluate(node.left);
    const right = this.evaluate(node.right);

    switch (node.val) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      default:
        throw new Error(`Unknown operator: ${node.val}`);
    }
  }

  static isOperator(token) {
    return ["+", "-", "*", "/"].includes(token);
  }
}
```

### 3. Autocomplete System

```javascript
class AutoCompleteSystem {
  constructor() {
    this.trie = new Trie();
    this.suggestions = [];
  }

  addWord(word, frequency = 1) {
    this.trie.insert(word);
    // In a real implementation, we'd store frequency
    // and use it for ranking suggestions
  }

  getSuggestions(prefix) {
    const suggestions = [];
    let current = this.trie.root;

    // Navigate to prefix
    for (const char of prefix) {
      if (!current.children[char]) {
        return suggestions;
      }
      current = current.children[char];
    }

    // Collect all words starting with prefix
    this.collectWords(current, prefix, suggestions);

    // Sort by frequency (simplified)
    return suggestions.sort((a, b) => b.frequency - a.frequency).slice(0, 10);
  }

  collectWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push({ word: prefix, frequency: 1 }); // Simplified
    }

    for (const char in node.children) {
      this.collectWords(node.children[char], prefix + char, suggestions);
    }
  }
}
```

### 4. Huffman Coding

```javascript
class HuffmanCoding {
  static buildTree(frequencies) {
    const heap = new MinHeap();

    // Create leaf nodes and add to heap
    for (const [char, freq] of Object.entries(frequencies)) {
      heap.insert(new TreeNode(char, null, null, freq));
    }

    // Build Huffman tree
    while (heap.size() > 1) {
      const left = heap.extractMin();
      const right = heap.extractMin();

      const internal = new TreeNode(
        left.val + right.val, // Combined value
        left,
        right,
        left.frequency + right.frequency
      );

      heap.insert(internal);
    }

    return heap.extractMin();
  }

  static generateCodes(root, prefix = "", codes = {}) {
    if (!root.left && !root.right) {
      codes[root.val] = prefix || "0";
      return codes;
    }

    if (root.left) {
      this.generateCodes(root.left, prefix + "0", codes);
    }

    if (root.right) {
      this.generateCodes(root.right, prefix + "1", codes);
    }

    return codes;
  }
}

// MinHeap for Huffman coding
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
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

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent].frequency <= this.heap[index].frequency) break;

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  bubbleDown(index) {
    while (true) {
      let minIndex = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < this.heap.length &&
        this.heap[left].frequency < this.heap[minIndex].frequency
      ) {
        minIndex = left;
      }

      if (
        right < this.heap.length &&
        this.heap[right].frequency < this.heap[minIndex].frequency
      ) {
        minIndex = right;
      }

      if (minIndex === index) break;

      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index],
      ];
      index = minIndex;
    }
  }
}
```

## 💡 Tree Algorithm Selection Guide

### When to Use Which Tree

#### Binary Search Tree (BST):

- **Ordered data**: Need to maintain sorted order
- **Search operations**: Frequent lookups
- **Dynamic data**: Frequent insertions/deletions
- **Range queries**: Find elements in ranges

#### AVL Tree:

- **Balanced operations**: Guaranteed O(log n) operations
- **Search-heavy**: More lookups than insertions
- **Memory constraints**: Less overhead than Red-Black

#### Red-Black Tree:

- **Balanced operations**: Guaranteed O(log n) operations
- **Insertion-heavy**: Better insertion performance than AVL
- **Standard library**: Used in many standard implementations

#### Trie:

- **String operations**: Prefix searches, autocomplete
- **Dictionary applications**: Word validation, suggestions
- **Pattern matching**: Efficient string searches

#### Segment Tree:

- **Range queries**: Sum, min, max in ranges
- **Static data**: Data doesn't change frequently
- **Complex queries**: Multiple types of range operations

#### Fenwick Tree:

- **Range sum queries**: Efficient prefix sums
- **Dynamic updates**: Frequent point updates
- **Memory efficient**: Less space than segment tree

## 🚨 Common Mistakes to Avoid

### Tree Mistakes

- ❌ Not handling null nodes properly
- ❌ Incorrect base cases in recursion
- ❌ Not updating parent pointers
- ❌ Forgetting to update heights/balance factors
- ❌ Incorrect traversal order

### BST Mistakes

- ❌ Not maintaining BST property
- ❌ Duplicate value handling
- ❌ Incorrect deletion cases
- ❌ Not rebalancing when needed
- ❌ Memory leaks in deletion

### Performance Mistakes

- ❌ Using unbalanced trees for large datasets
- ❌ Not considering space complexity
- ❌ Inefficient traversal patterns
- ❌ Not using appropriate tree type

## 📖 Additional Resources

### Videos

- **Tree Traversals**: Visual walkthrough of all traversal methods
- **Balanced Trees**: AVL and Red-Black tree rotations
- **Advanced Trees**: Segment trees, Fenwick trees

### Websites

- **Tree Visualizer**: Interactive tree operations
- **Algorithm Designer**: Design tree-based solutions
- **Tree Problem Library**: Practice problems by difficulty

### Books

- **"Algorithms" by Robert Sedgewick**: Comprehensive tree coverage
- **"Introduction to Algorithms"**: Advanced tree algorithms
- **"Data Structures and Algorithm Analysis"**: Tree design patterns

## 🎓 What You Need from Other Resources

### Mathematics

- **Combinatorics**: Counting tree structures
- **Graph Theory**: Trees as special graphs
- **Probability**: Randomized tree algorithms

### Data Structures

- **Stacks**: Iterative tree traversals
- **Queues**: Level-order traversals
- **Arrays**: Tree serialization

---

## 🚀 Getting Started

**Ready to master tree algorithms?**

1. **Start with Basic Traversals** → `implementation.js`
2. **Practice BST Operations** → Search, insert, delete
3. **Learn Balanced Trees** → AVL, Red-Black
4. **Solve Practice Problems** → `practice.js`

> 💡 **Key Insight**: Tree algorithms teach you _how to think hierarchically_. Master traversals first, then move to complex operations!

---

## 📊 Progress Checklist

### Basic Tree Operations

- [ ] Pre-order, In-order, Post-order traversals
- [ ] Level-order traversal
- [ ] Tree height and size calculations
- [ ] Leaf node counting

### Binary Search Trees

- [ ] Search, insert, delete operations
- [ ] Find min/max operations
- [ ] Validate BST property
- [ ] Find kth smallest/largest

### Advanced Tree Algorithms

- [ ] Lowest Common Ancestor
- [ ] Tree diameter calculation
- [ ] Maximum path sum
- [ ] Tree serialization/deserialization

### Specialized Trees

- [ ] Trie operations
- [ ] Segment tree range queries
- [ ] Fenwick tree prefix sums
- [ ] Balanced tree rotations

---

## 🎯 Interview Focus

### Most Common Tree Questions

1. **Tree Traversals** - 70% of interviews
2. **BST Operations** - 60% of interviews
3. **LCA Problems** - 50% of interviews
4. **Tree Properties** - 40% of interviews
5. **Balanced Trees** - 30% of interviews

### Must-Know Tree Patterns for FAANG

- **DFS Traversals**: Pre, in, post-order
- **BFS Traversal**: Level-order processing
- **BST Operations**: Search, insert, delete
- **Tree Properties**: Height, size, balance
- **Advanced Algorithms**: LCA, diameter, path sum

---

_Last Updated: December 2025_  
_Difficulty: Intermediate to Advanced_  
_Prerequisites: Recursion, Basic Data Structures_  
_Time Commitment: 3-4 weeks_
