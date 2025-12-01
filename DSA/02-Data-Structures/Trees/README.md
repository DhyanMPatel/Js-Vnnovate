# 🌳 Trees

> **Hierarchical Data Structure for Organized Data**

## 📋 Table of Contents

- [What are Trees?](#what-are-trees)
- [Tree Properties](#tree-properties)
- [Tree Types](#tree-types)
- [Core Operations](#core-operations)
- [Traversal Methods](#traversal-methods)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Trees?

### Definition

A tree is a hierarchical data structure consisting of nodes connected by edges, with one node designated as the root. Each node can have zero or more child nodes, forming a parent-child relationship.

### Real-World Analogy

```javascript
// Think of a family tree:
// - Grandparents at the top (root)
// - Parents in the middle
// - Children at the bottom (leaves)

const familyTree = {
  root: "Grandparents",
  children: ["Parent1", "Parent2"],
  grandchildren: ["Child1", "Child2", "Child3", "Child4"],
};
```

### Why Trees Matter

- **Hierarchical Data**: File systems, organization charts
- **Search Optimization**: Binary search trees, B-trees
- **Expression Parsing**: Abstract syntax trees
- **Game AI**: Decision trees, minimax
- **Compression**: Huffman trees

## 🔍 Tree Properties

### Basic Terminology

```javascript
const treeTerms = {
  node: "Element containing data and pointers",
  root: "Topmost node of the tree",
  parent: "Node that has child nodes",
  child: "Node connected to a parent",
  leaf: "Node with no children",
  edge: "Connection between two nodes",
  path: "Sequence of nodes from root to a node",
  depth: "Distance from root to a node",
  height: "Distance from node to deepest leaf",
  level: "Depth + 1",
  subtree: "Tree consisting of a node and its descendants",
};
```

### Time Complexity Analysis

```javascript
const treeOperations = {
  search: "O(log n) for BST, O(n) for general tree",
  insert: "O(log n) for BST, O(1) for general tree",
  delete: "O(log n) for BST, O(n) for general tree",
  traversal: "O(n) - visits each node once",
  findMin: "O(log n) for BST, O(n) for general tree",
  findMax: "O(log n) for BST, O(n) for general tree",
};
```

### Space Complexity

- **O(n)** - Space grows linearly with number of nodes
- **O(h)** - Height-dependent for recursive operations
- **O(log n)** - Balanced trees have logarithmic height

## 🌲 Tree Types

### 1. Binary Tree

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### 2. Binary Search Tree (BST)

```javascript
// BST Property: left < node < right
class BSTNode extends TreeNode {
  constructor(val) {
    super(val);
  }

  insert(value) {
    if (value < this.val) {
      if (!this.left) this.left = new BSTNode(value);
      else this.left.insert(value);
    } else {
      if (!this.right) this.right = new BSTNode(value);
      else this.right.insert(value);
    }
  }
}
```

### 3. AVL Tree (Self-Balancing BST)

```javascript
class AVLNode extends BSTNode {
  constructor(val) {
    super(val);
    this.height = 1;
  }

  getBalance() {
    const leftHeight = this.left ? this.left.height : 0;
    const rightHeight = this.right ? this.right.height : 0;
    return leftHeight - rightHeight;
  }
}
```

### 4. N-ary Tree

```javascript
class NaryNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}
```

### 5. Trie (Prefix Tree)

```javascript
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}
```

## ⚡ Core Operations

### Tree Node Implementation

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  // Insert value - O(n) for general tree
  insert(value) {
    if (value < this.val) {
      if (!this.left) {
        this.left = new TreeNode(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new TreeNode(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  // Search for value - O(n) for general tree
  search(value) {
    if (this.val === value) return this;

    if (value < this.val && this.left) {
      return this.left.search(value);
    }

    if (value > this.val && this.right) {
      return this.right.search(value);
    }

    return null;
  }

  // Get tree height - O(n)
  getHeight() {
    if (!this.left && !this.right) return 0;

    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Count nodes - O(n)
  countNodes() {
    let count = 1;

    if (this.left) count += this.left.countNodes();
    if (this.right) count += this.right.countNodes();

    return count;
  }

  // Check if tree is balanced - O(n)
  isBalanced() {
    if (!this.left && !this.right) return true;

    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    const leftBalanced = !this.left || this.left.isBalanced();
    const rightBalanced = !this.right || this.right.isBalanced();

    return leftBalanced && rightBalanced;
  }
}
```

### Binary Search Tree Operations

```javascript
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert value - O(log n) average, O(n) worst
  insert(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Search for value - O(log n) average, O(n) worst
  search(value) {
    let current = this.root;

    while (current) {
      if (value === current.val) return current;
      current = value < current.val ? current.left : current.right;
    }

    return null;
  }

  // Find minimum value - O(log n) average
  findMin() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  // Find maximum value - O(log n) average
  findMax() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  // Delete value - O(log n) average
  delete(value) {
    this.root = this.deleteNode(this.root, value);
    return this;
  }

  deleteNode(node, value) {
    if (!node) return null;

    if (value < node.val) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.val) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to be deleted found
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Node has two children
      const minRight = this.findMinNode(node.right);
      node.val = minRight.val;
      node.right = this.deleteNode(node.right, minRight.val);
    }

    return node;
  }

  findMinNode(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
}
```

## 🎯 Traversal Methods

### 1. Depth-First Search (DFS)

#### In-Order Traversal (Left, Root, Right)

```javascript
function inOrderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

// Iterative version
function inOrderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
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

#### Pre-Order Traversal (Root, Left, Right)

```javascript
function preOrderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

// Iterative version
function preOrderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
```

#### Post-Order Traversal (Left, Right, Root)

```javascript
function postOrderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }

  traverse(root);
  return result;
}

// Iterative version
function postOrderIterative(root) {
  if (!root) return [];

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

#### Level-Order Traversal

```javascript
function levelOrderTraversal(root) {
  if (!root) return [];

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

// Level by level traversal
function levelOrderLevels(root) {
  if (!root) return [];

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
```

## 🚀 Advanced Tree Operations

### 1. Validate Binary Search Tree

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;

  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}
```

### 2. Lowest Common Ancestor (LCA)

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;
}

// For BST - optimized version
function lcaBST(root, p, q) {
  if (!root) return null;

  if (root.val > p.val && root.val > q.val) {
    return lcaBST(root.left, p, q);
  }

  if (root.val < p.val && root.val < q.val) {
    return lcaBST(root.right, p, q);
  }

  return root;
}
```

### 3. Serialize and Deserialize Tree

```javascript
function serialize(root) {
  const result = [];

  function serializeHelper(node) {
    if (!node) {
      result.push("null");
      return;
    }

    result.push(node.val.toString());
    serializeHelper(node.left);
    serializeHelper(node.right);
  }

  serializeHelper(root);
  return result.join(",");
}

function deserialize(data) {
  const values = data.split(",");
  let index = 0;

  function deserializeHelper() {
    if (index >= values.length || values[index] === "null") {
      index++;
      return null;
    }

    const node = new TreeNode(parseInt(values[index]));
    index++;
    node.left = deserializeHelper();
    node.right = deserializeHelper();

    return node;
  }

  return deserializeHelper();
}
```

### 4. Tree Diameter

```javascript
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function height(node) {
    if (!node) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(root);
  return maxDiameter;
}
```

### 5. Maximum Path Sum

```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (!node) return 0;

    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // Path through current node
    const currentPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPath);

    // Return max gain for parent
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
```

## 💡 Real-World Applications

### 1. File System Structure

```javascript
class FileSystemNode {
  constructor(name, isFile = false) {
    this.name = name;
    this.isFile = isFile;
    this.children = new Map();
    this.size = isFile ? 0 : null;
  }

  addFile(path, size) {
    const parts = path.split("/");
    let current = this;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (!current.children.has(part)) {
        const isLast = i === parts.length - 1;
        current.children.set(part, new FileSystemNode(part, isLast));

        if (isLast) {
          current.children.get(part).size = size;
        }
      }

      current = current.children.get(part);
    }
  }

  getTotalSize() {
    if (this.isFile) return this.size;

    let total = 0;
    for (const child of this.children.values()) {
      total += child.getTotalSize();
    }

    return total;
  }

  findDirectoriesAboveSize(minSize) {
    const result = [];

    function traverse(node, path) {
      if (node.isFile) return;

      const totalSize = node.getTotalSize();
      if (totalSize >= minSize) {
        result.push({ path, size: totalSize });
      }

      for (const [name, child] of node.children) {
        traverse(child, path + "/" + name);
      }
    }

    traverse(this, this.name);
    return result;
  }
}
```

### 2. Expression Tree

```javascript
class ExpressionNode {
  constructor(value, isOperator = false) {
    this.value = value;
    this.isOperator = isOperator;
    this.left = null;
    this.right = null;
  }

  evaluate() {
    if (!this.isOperator) return this.value;

    const leftVal = this.left.evaluate();
    const rightVal = this.right.evaluate();

    switch (this.value) {
      case "+":
        return leftVal + rightVal;
      case "-":
        return leftVal - rightVal;
      case "*":
        return leftVal * rightVal;
      case "/":
        return leftVal / rightVal;
      default:
        throw new Error(`Unknown operator: ${this.value}`);
    }
  }

  toInfix() {
    if (!this.isOperator) return this.value;

    const left = this.left.toInfix();
    const right = this.right.toInfix();
    return `(${left} ${this.value} ${right})`;
  }
}

function buildExpressionTree(postfix) {
  const stack = [];

  for (const token of postfix) {
    if (!isNaN(token)) {
      stack.push(new ExpressionNode(token, false));
    } else {
      const right = stack.pop();
      const left = stack.pop();
      const node = new ExpressionNode(token, true);
      node.left = left;
      node.right = right;
      stack.push(node);
    }
  }

  return stack[0];
}
```

### 3. Decision Tree

```javascript
class DecisionNode {
  constructor(feature, threshold, left, right, value = null) {
    this.feature = feature;
    this.threshold = threshold;
    this.left = left;
    this.right = right;
    this.value = value; // For leaf nodes
  }

  predict(data) {
    if (this.value !== null) return this.value;

    const featureValue = data[this.feature];

    if (featureValue <= this.threshold) {
      return this.left.predict(data);
    } else {
      return this.right.predict(data);
    }
  }
}

function buildDecisionTree(dataset, features, maxDepth = 3) {
  // Simplified decision tree building
  if (maxDepth === 0 || isPure(dataset)) {
    return new DecisionNode(null, null, null, null, getMajorityClass(dataset));
  }

  const { feature, threshold } = findBestSplit(dataset, features);

  const leftData = dataset.filter((item) => item[feature] <= threshold);
  const rightData = dataset.filter((item) => item[feature] > threshold);

  const leftTree = buildDecisionTree(leftData, features, maxDepth - 1);
  const rightTree = buildDecisionTree(rightData, features, maxDepth - 1);

  return new DecisionNode(feature, threshold, leftTree, rightTree);
}
```

## 💪 Practice Problems

### Easy

1. **Maximum Depth of Binary Tree** - Find tree height
2. **Same Tree** - Check if two trees are identical
3. **Invert Binary Tree** - Mirror the tree
4. **Symmetric Tree** - Check if tree is symmetric
5. **Convert Sorted Array to BST** - Build balanced BST

### Medium

1. **Validate Binary Search Tree** - Check BST property
2. **Lowest Common Ancestor** - Find LCA of two nodes
3. **Binary Tree Level Order Traversal** - BFS traversal
4. **Binary Tree Right Side View** - Right side view
5. **Kth Smallest Element in BST** - Find kth smallest
6. **Construct Binary Tree from Preorder and Inorder** - Tree reconstruction

### Hard

1. **Binary Tree Maximum Path Sum** - Find maximum path sum
2. **Serialize and Deserialize Binary Tree** - Tree serialization
3. **Diameter of Binary Tree** - Find longest path
4. **Recover Binary Search Tree** - Fix swapped nodes
5. **Word Ladder II** - BFS with tree building

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveTreeProblem(problem) {
  // 1. Identify tree type
  const treeTypes = {
    binary: "Each node has at most 2 children",
    bst: "Binary tree with ordering property",
    balanced: "Height difference ≤ 1",
    complete: "All levels filled except last",
  };

  // 2. Choose traversal method
  const traversals = {
    dfs: "Depth-first for path problems",
    bfs: "Breadth-first for level problems",
    inorder: "Sorted order for BST",
    preorder: "Root-first operations",
    postorder: "Bottom-up operations",
  };

  // 3. Implement solution
  // 4. Handle edge cases
  // 5. Optimize if needed
}
```

### Common Mistakes to Avoid

- ❌ Not handling null root case
- ❌ Forgetting to update pointers in tree modification
- ❌ Using wrong traversal for the problem
- ❌ Not considering tree balance in complexity analysis
- ❌ Forgetting to handle duplicate values in BST

### Communication Tips

- **Explain tree structure** and constraints
- **Discuss traversal choice** and reasoning
- **Handle edge cases** explicitly (empty tree, single node)
- **Show step-by-step** tree operations

## 📊 Tree vs Other Data Structures

| Operation | Tree               | Array | Linked List | Hash Table |
| --------- | ------------------ | ----- | ----------- | ---------- |
| Search    | O(log n) BST, O(n) | O(n)  | O(n)        | O(1)       |
| Insert    | O(log n) BST, O(1) | O(n)  | O(1)        | O(1)       |
| Delete    | O(log n) BST, O(n) | O(n)  | O(1)        | O(1)       |
| Traversal | O(n)               | O(n)  | O(n)        | O(n)       |
| Space     | O(n)               | O(n)  | O(n)        | O(n)       |

## 📖 Additional Resources

### Videos

- **Tree Traversal - MIT 6.006**: Academic introduction
- **Binary Search Tree - TechLead**: Implementation details
- **Tree Algorithms - NeetCode**: Problem-solving patterns

### Websites

- **Tree Visualizer**: Interactive tree operations
- **GeeksforGeeks Trees**: Comprehensive tutorials
- **LeetCode Tree Problems**: Practice problems by difficulty

### Books

- **"Introduction to Algorithms"**: Tree chapters
- **"Data Structures and Algorithms in JavaScript"**: JS implementations

## 🎓 What You Need from Other Resources

### System Design

- **Database Indexing**: B-trees and B+ trees
- **File Systems**: Tree-based directory structures
- **DNS Resolution**: Hierarchical tree structure

### Algorithm Design

- **Graph Algorithms**: Trees are special graphs
- **Dynamic Programming**: Tree DP patterns
- **Divide and Conquer**: Tree-based algorithms

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Heaps** → `../Heaps/README.md`

> 💡 **Key Insight**: Trees teach you hierarchical thinking - crucial for recursion, divide-and-conquer, and many advanced algorithms!

---

## 📊 Quick Reference

### Must-Know Tree Operations

```javascript
const essentialOperations = {
  traversal: "DFS/BFS - O(n)",
  search: "BST: O(log n), General: O(n)",
  insert: "BST: O(log n), General: O(1)",
  delete: "BST: O(log n), General: O(n)",
  height: "O(n)",
  balance: "O(n)",
};
```

### Common Tree Patterns

- **DFS Traversal**: Pre-order, In-order, Post-order
- **BFS Traversal**: Level-order traversal
- **BST Operations**: Search, insert, delete with ordering
- **Tree Properties**: Height, balance, diameter
- **Path Problems**: LCA, maximum path sum

---

_Last Updated: December 2025_  
_Difficulty: Intermediate_  
_Prerequisites: Arrays, Recursion, Big O Complexity_  
_Time Commitment: 2 weeks_
