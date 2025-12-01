// 🌳 Tree Algorithms Implementation
// Complete implementations of tree algorithms with analysis

// ==========================================
// TREE NODE STRUCTURES
// ==========================================

/**
 * Binary Tree Node
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = null; // Optional parent reference
    this.height = 1; // For balanced trees
    this.size = 1; // For order statistics
  }
}

/**
 * N-ary Tree Node
 */
class NaryTreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

/**
 * Trie Node
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.prefixCount = 0;
    this.wordCount = 0;
  }
}

// ==========================================
// BASIC TREE TRAVERSALS
// ==========================================

/**
 * Pre-order Traversal (Root, Left, Right)
 * Time: O(n)
 * Space: O(h) where h is tree height
 */
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

/**
 * In-order Traversal (Left, Root, Right)
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Post-order Traversal (Left, Right, Root)
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Level-order Traversal (BFS)
 * Time: O(n)
 * Space: O(w) where w is maximum width
 */
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

/**
 * Zigzag Level-order Traversal
 * Time: O(n)
 * Space: O(w)
 */
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

// ==========================================
// ITERATIVE TRAVERSALS
// ==========================================

/**
 * Iterative Pre-order Traversal
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Iterative In-order Traversal
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Iterative Post-order Traversal
 * Time: O(n)
 * Space: O(h)
 */
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

// ==========================================
// TREE PROPERTIES AND UTILITIES
// ==========================================

/**
 * Tree Height
 * Time: O(n)
 * Space: O(h)
 */
function treeHeight(root) {
  if (root === null) return -1;

  const leftHeight = treeHeight(root.left);
  const rightHeight = treeHeight(root.right);

  return 1 + Math.max(leftHeight, rightHeight);
}

/**
 * Tree Size (Number of nodes)
 * Time: O(n)
 * Space: O(h)
 */
function treeSize(root) {
  if (root === null) return 0;

  return 1 + treeSize(root.left) + treeSize(root.right);
}

/**
 * Count Leaf Nodes
 * Time: O(n)
 * Space: O(h)
 */
function countLeafNodes(root) {
  if (root === null) return 0;

  if (root.left === null && root.right === null) return 1;

  return countLeafNodes(root.left) + countLeafNodes(root.right);
}

/**
 * Count Complete Nodes
 * Time: O(n)
 * Space: O(h)
 */
function countCompleteNodes(root) {
  if (root === null) return 0;

  if (root.left !== null && root.right !== null) {
    return 1 + countCompleteNodes(root.left) + countCompleteNodes(root.right);
  }

  return 1;
}

/**
 * Tree Diameter (Longest path between any two nodes)
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Maximum Path Sum
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Is Balanced Binary Tree
 * Time: O(n)
 * Space: O(h)
 */
function isBalanced(root) {
  function checkHeight(node) {
    if (node === null) return 0;

    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

// ==========================================
// BINARY SEARCH TREE OPERATIONS
// ==========================================

/**
 * Search in BST
 * Time: O(h) where h is height, O(log n) average, O(n) worst
 * Space: O(h)
 */
function searchBST(root, val) {
  if (root === null) return null;

  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}

/**
 * Iterative Search in BST
 * Time: O(h)
 * Space: O(1)
 */
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

/**
 * Insert into BST
 * Time: O(h)
 * Space: O(h)
 */
function insertIntoBST(root, val) {
  if (root === null) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}

/**
 * Iterative Insert into BST
 * Time: O(h)
 * Space: O(1)
 */
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

/**
 * Delete Node from BST
 * Time: O(h)
 * Space: O(h)
 */
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

/**
 * Find Minimum in BST
 * Time: O(h)
 * Space: O(1)
 */
function findMin(root) {
  if (root === null) return null;

  while (root.left !== null) {
    root = root.left;
  }

  return root;
}

/**
 * Find Maximum in BST
 * Time: O(h)
 * Space: O(1)
 */
function findMax(root) {
  if (root === null) return null;

  while (root.right !== null) {
    root = root.right;
  }

  return root;
}

/**
 * Validate BST
 * Time: O(n)
 * Space: O(h)
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

/**
 * Find Kth Smallest in BST
 * Time: O(k + h)
 * Space: O(h)
 */
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

/**
 * Find Kth Largest in BST
 * Time: O(k + h)
 * Space: O(h)
 */
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

// ==========================================
// ADVANCED TREE ALGORITHMS
// ==========================================

/**
 * Lowest Common Ancestor (Binary Tree)
 * Time: O(n)
 * Space: O(h)
 */
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}

/**
 * Lowest Common Ancestor (BST)
 * Time: O(h)
 * Space: O(h)
 */
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

/**
 * Serialize Binary Tree
 * Time: O(n)
 * Space: O(n)
 */
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

/**
 * Deserialize Binary Tree
 * Time: O(n)
 * Space: O(n)
 */
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

/**
 * Invert Binary Tree
 * Time: O(n)
 * Space: O(h)
 */
function invertTree(root) {
  if (root === null) return null;

  // Swap children
  [root.left, root.right] = [root.right, root.left];

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

/**
 * Same Tree
 * Time: O(n)
 * Space: O(h)
 */
function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/**
 * Symmetric Tree
 * Time: O(n)
 * Space: O(h)
 */
function isSymmetric(root) {
  function isMirror(left, right) {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;

    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
  }

  return root === null || isMirror(root.left, root.right);
}

/**
 * Merge Two Binary Trees
 * Time: O(n)
 * Space: O(h)
 */
function mergeTrees(root1, root2) {
  if (root1 === null && root2 === null) return null;

  const val1 = root1 ? root1.val : 0;
  const val2 = root2 ? root2.val : 0;

  const merged = new TreeNode(val1 + val2);

  merged.left = mergeTrees(
    root1 ? root1.left : null,
    root2 ? root2.left : null
  );
  merged.right = mergeTrees(
    root1 ? root1.right : null,
    root2 ? root2.right : null
  );

  return merged;
}

// ==========================================
// BOUNDARY AND SPECIAL TRAVERSALS
// ==========================================

/**
 * Boundary Traversal
 * Time: O(n)
 * Space: O(h)
 */
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

/**
 * Vertical Order Traversal
 * Time: O(n log n)
 * Space: O(n)
 */
function verticalOrder(root) {
  if (root === null) return [];

  const columnMap = new Map(); // column -> [row, values]
  const queue = [[root, 0, 0]]; // [node, column, row]

  while (queue.length > 0) {
    const [node, column, row] = queue.shift();

    if (!columnMap.has(column)) {
      columnMap.set(column, []);
    }
    columnMap.get(column).push([row, node.val]);

    if (node.left) queue.push([node.left, column - 1, row + 1]);
    if (node.right) queue.push([node.right, column + 1, row + 1]);
  }

  // Sort columns and then sort by row within each column
  const sortedColumns = Array.from(columnMap.keys()).sort((a, b) => a - b);
  const result = [];

  for (const column of sortedColumns) {
    const values = columnMap
      .get(column)
      .sort((a, b) => a[0] - b[0])
      .map((item) => item[1]);
    result.push(values);
  }

  return result;
}

// ==========================================
// TRIE IMPLEMENTATION
// ==========================================

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Insert word into trie
   * Time: O(m) where m is word length
   * Space: O(m)
   */
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

  /**
   * Search word in trie
   * Time: O(m)
   * Space: O(1)
   */
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

  /**
   * Check if any word starts with prefix
   * Time: O(m)
   * Space: O(1)
   */
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

  /**
   * Count words starting with prefix
   * Time: O(m)
   * Space: O(1)
   */
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

  /**
   * Get all words with prefix
   * Time: O(m + k) where k is number of words
   * Space: O(k)
   */
  getWordsWithPrefix(prefix) {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    const words = [];
    this.collectWords(current, prefix, words);
    return words;
  }

  collectWords(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const char in node.children) {
      this.collectWords(node.children[char], prefix + char, words);
    }
  }
}

// ==========================================
// SEGMENT TREE IMPLEMENTATION
// ==========================================

class SegmentTree {
  /**
   * Build segment tree
   * Time: O(n)
   * Space: O(n)
   */
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

  /**
   * Range query
   * Time: O(log n)
   * Space: O(log n)
   */
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

  /**
   * Point update
   * Time: O(log n)
   * Space: O(log n)
   */
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

// ==========================================
// FENWICK TREE (BINARY INDEXED TREE)
// ==========================================

class FenwickTree {
  /**
   * Initialize Fenwick tree
   * Time: O(n)
   * Space: O(n)
   */
  constructor(size) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  /**
   * Point update
   * Time: O(log n)
   * Space: O(1)
   */
  update(index, delta) {
    index++; // Convert to 1-based indexing

    while (index <= this.size) {
      this.tree[index] += delta;
      index += index & -index; // Move to next responsible node
    }
  }

  /**
   * Prefix sum query
   * Time: O(log n)
   * Space: O(1)
   */
  query(index) {
    index++; // Convert to 1-based indexing
    let sum = 0;

    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index; // Move to parent
    }

    return sum;
  }

  /**
   * Range sum query
   * Time: O(log n)
   * Space: O(1)
   */
  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}

// ==========================================
// AVL TREE IMPLEMENTATION
// ==========================================

class AVLNode extends TreeNode {
  constructor(val) {
    super(val);
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  /**
   * Right rotation
   * Time: O(1)
   * Space: O(1)
   */
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  /**
   * Left rotation
   * Time: O(1)
   * Space: O(1)
   */
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  /**
   * Insert value into AVL tree
   * Time: O(log n)
   * Space: O(log n)
   */
  insert(val) {
    this.root = this.insertNode(this.root, val);
  }

  insertNode(node, val) {
    // Standard BST insertion
    if (node === null) return new AVLNode(val);

    if (val < node.val) {
      node.left = this.insertNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.insertNode(node.right, val);
    } else {
      return node; // Duplicate values not allowed
    }

    // Update height
    this.updateHeight(node);

    // Get balance factor
    const balance = this.getBalance(node);

    // Balance the tree

    // Left Left Case
    if (balance > 1 && val < node.left.val) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && val > node.right.val) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && val > node.left.val) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && val < node.right.val) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Build tree from array (level order)
 * Time: O(n)
 * Space: O(n)
 */
function buildTreeFromArray(arr) {
  if (arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let index = 1;

  while (queue.length > 0 && index < arr.length) {
    const node = queue.shift();

    if (index < arr.length && arr[index] !== null) {
      node.left = new TreeNode(arr[index]);
      queue.push(node.left);
    }
    index++;

    if (index < arr.length && arr[index] !== null) {
      node.right = new TreeNode(arr[index]);
      queue.push(node.right);
    }
    index++;
  }

  return root;
}

/**
 * Convert tree to array (level order)
 * Time: O(n)
 * Space: O(n)
 */
function treeToArray(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node !== null) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

/**
 * Print tree visually
 * Time: O(n)
 * Space: O(n)
 */
function printTree(root) {
  if (root === null) {
    console.log("Empty tree");
    return;
  }

  const height = treeHeight(root);
  const maxNodes = Math.pow(2, height + 1) - 1;
  const levels = levelOrder(root);

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const spaces = Math.floor(maxNodes / Math.pow(2, i));
    let line = " ".repeat(spaces);

    for (const val of level) {
      line += val !== null ? val : "N";
      line += " ".repeat(2 * spaces);
    }

    console.log(line.trimEnd());
  }
}

// ==========================================
// TESTING FRAMEWORK
// ==========================================

function runTreeTests() {
  console.log("🧪 Running Tree Algorithm Tests...\n");

  // Build test tree
  const tree = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(6))
  );

  // Test traversals
  console.log("🌳 Testing Tree Traversals:");
  console.log(
    `Pre-order: [${preorderTraversal(tree)}] (expected: [1,2,4,5,3,6])`
  );
  console.log(
    `In-order: [${inorderTraversal(tree)}] (expected: [4,2,5,1,3,6])`
  );
  console.log(
    `Post-order: [${postorderTraversal(tree)}] (expected: [4,5,2,6,3,1])`
  );
  console.log(
    `Level-order: [${levelOrder(tree).map((level) => `[${level}]`)}]`
  );

  // Test tree properties
  console.log("\n📊 Testing Tree Properties:");
  console.log(`Tree Height: ${treeHeight(tree)} (expected: 2)`);
  console.log(`Tree Size: ${treeSize(tree)} (expected: 6)`);
  console.log(`Leaf Nodes: ${countLeafNodes(tree)} (expected: 3)`);
  console.log(`Is Balanced: ${isBalanced(tree)} (expected: true)`);
  console.log(`Tree Diameter: ${diameterOfBinaryTree(tree)} (expected: 4)`);

  // Test BST operations
  console.log("\n🔍 Testing BST Operations:");
  const bst = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(6, new TreeNode(5), new TreeNode(7))
  );

  console.log(
    `Search 5: ${searchBST(bst, 5) ? "Found" : "Not found"} (expected: Found)`
  );
  console.log(
    `Search 8: ${
      searchBST(bst, 8) ? "Found" : "Not found"
    } (expected: Not found)`
  );
  console.log(`Is Valid BST: ${isValidBST(bst)} (expected: true)`);
  console.log(`Kth Smallest (3): ${kthSmallest(bst, 3)} (expected: 3)`);
  console.log(`Kth Largest (2): ${kthLargest(bst, 2)} (expected: 6)`);

  // Test advanced algorithms
  console.log("\n🚀 Testing Advanced Algorithms:");
  console.log(
    `LCA (4,6): ${
      lowestCommonAncestor(tree, tree.left.left, tree.right.right).val
    } (expected: 1)`
  );
  console.log(`Max Path Sum: ${maxPathSum(tree)} (expected: 15)`);
  console.log(`Is Symmetric: ${isSymmetric(tree)} (expected: false)`);

  // Test serialization
  console.log("\n💾 Testing Serialization:");
  const serialized = serialize(tree);
  console.log(`Serialized: ${serialized}`);
  const deserialized = deserialize(serialized);
  console.log(`Deserialized In-order: [${inorderTraversal(deserialized)}]`);

  // Test Trie
  console.log("\n🔤 Testing Trie:");
  const trie = new Trie();
  trie.insert("apple");
  trie.insert("app");
  trie.insert("application");

  console.log(`Search "app": ${trie.search("app")} (expected: true)`);
  console.log(`Search "appl": ${trie.search("appl")} (expected: false)`);
  console.log(`Starts with "app": ${trie.startsWith("app")} (expected: true)`);
  console.log(`Words with prefix "app": [${trie.getWordsWithPrefix("app")}]`);

  // Test Segment Tree
  console.log("\n📈 Testing Segment Tree:");
  const segTree = new SegmentTree([1, 3, 5, 7, 9, 11]);
  console.log(`Range sum (1, 4): ${segTree.query(1, 4)} (expected: 24)`);
  segTree.update(2, 6);
  console.log(
    `After update, range sum (1, 4): ${segTree.query(1, 4)} (expected: 25)`
  );

  // Test Fenwick Tree
  console.log("\n📊 Testing Fenwick Tree:");
  const fenwick = new FenwickTree(6);
  for (let i = 0; i < 6; i++) {
    fenwick.update(i, i + 1);
  }
  console.log(`Prefix sum (3): ${fenwick.query(3)} (expected: 10)`);
  console.log(`Range sum (2, 4): ${fenwick.rangeQuery(2, 4)} (expected: 12)`);

  // Test AVL Tree
  console.log("\n🎯 Testing AVL Tree:");
  const avl = new AVLTree();
  [10, 20, 30, 40, 50, 25].forEach((val) => avl.insert(val));
  console.log(
    `AVL In-order: [${inorderTraversal(avl.root)}] (expected: sorted)`
  );
  console.log(`AVL Is Balanced: ${isBalanced(avl.root)} (expected: true)`);

  console.log("\n✅ All tests completed!");
}

// Export all functions and classes
module.exports = {
  // Node classes
  TreeNode,
  NaryTreeNode,
  TrieNode,

  // Basic traversals
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  levelOrder,
  zigzagLevelOrder,

  // Iterative traversals
  preorderIterative,
  inorderIterative,
  postorderIterative,

  // Tree properties
  treeHeight,
  treeSize,
  countLeafNodes,
  countCompleteNodes,
  diameterOfBinaryTree,
  maxPathSum,
  isBalanced,

  // BST operations
  searchBST,
  searchBSTIterative,
  insertIntoBST,
  insertIntoBSTIterative,
  deleteNode,
  findMin,
  findMax,
  isValidBST,
  kthSmallest,
  kthLargest,

  // Advanced algorithms
  lowestCommonAncestor,
  lowestCommonAncestorBST,
  serialize,
  deserialize,
  invertTree,
  isSameTree,
  isSymmetric,
  mergeTrees,

  // Special traversals
  boundaryOfBinaryTree,
  verticalOrder,

  // Trie
  Trie,

  // Segment Tree
  SegmentTree,

  // Fenwick Tree
  FenwickTree,

  // AVL Tree
  AVLTree,
  AVLNode,

  // Utilities
  buildTreeFromArray,
  treeToArray,
  printTree,
  runTreeTests,
};

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTreeTests();
}
