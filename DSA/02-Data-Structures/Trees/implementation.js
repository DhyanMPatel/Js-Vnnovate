// 🌳 Trees Implementation
// Complete implementations of all tree types and operations

// ==========================================
// BASIC TREE NODE IMPLEMENTATION
// ==========================================

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  // Insert value in BST manner - O(log n) average, O(n) worst
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

  // Search for value - O(log n) average, O(n) worst
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
    function checkBalance(node) {
      if (!node) return { height: 0, balanced: true };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const balanced =
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1;

      return {
        height: Math.max(left.height, right.height) + 1,
        balanced: balanced,
      };
    }

    return checkBalance(this).balanced;
  }

  // Find minimum value - O(log n) for BST, O(n) for general tree
  findMin() {
    let current = this;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  // Find maximum value - O(log n) for BST, O(n) for general tree
  findMax() {
    let current = this;
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  // Convert tree to array (in-order) - O(n)
  toArray() {
    const result = [];

    function inOrder(node) {
      if (!node) return;

      inOrder(node.left);
      result.push(node.val);
      inOrder(node.right);
    }

    inOrder(this);
    return result;
  }

  // Clone tree - O(n)
  clone() {
    return new TreeNode(
      this.val,
      this.left ? this.left.clone() : null,
      this.right ? this.right.clone() : null
    );
  }
}

// ==========================================
// BINARY SEARCH TREE IMPLEMENTATION
// ==========================================

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  // Insert value - O(log n) average, O(n) worst
  insert(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      this.size++;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.val) {
        if (!current.left) {
          current.left = newNode;
          this.size++;
          return this;
        }
        current = current.left;
      } else if (value > current.val) {
        if (!current.right) {
          current.right = newNode;
          this.size++;
          return this;
        }
        current = current.right;
      } else {
        // Value already exists, don't insert
        return this;
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

  // Delete value - O(log n) average, O(n) worst
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
        this.size--;
        return null;
      }

      if (!node.left) {
        this.size--;
        return node.right;
      }

      if (!node.right) {
        this.size--;
        return node.left;
      }

      // Node has two children - find successor
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

  // Find minimum value - O(log n) average
  findMin() {
    if (!this.root) return null;

    let current = this.root;
    while (current.left) {
      current = current.left;
    }

    return current;
  }

  // Find maximum value - O(log n) average
  findMax() {
    if (!this.root) return null;

    let current = this.root;
    while (current.right) {
      current = current.right;
    }

    return current;
  }

  // Check if tree is empty - O(1)
  isEmpty() {
    return this.root === null;
  }

  // Get tree size - O(1)
  getSize() {
    return this.size;
  }

  // Get tree height - O(n)
  getHeight() {
    return this.root ? this.root.getHeight() : 0;
  }

  // Check if tree is balanced - O(n)
  isBalanced() {
    return this.root ? this.root.isBalanced() : true;
  }

  // Convert to array (in-order) - O(n)
  toArray() {
    return this.root ? this.root.toArray() : [];
  }

  // Clear tree - O(1)
  clear() {
    this.root = null;
    this.size = 0;
    return this;
  }
}

// ==========================================
// AVL TREE (SELF-BALANCING BST)
// ==========================================

class AVLNode extends TreeNode {
  constructor(val, left = null, right = null) {
    super(val, left, right);
    this.height = 1;
  }

  // Update height - O(1)
  updateHeight() {
    const leftHeight = this.left ? this.left.height : 0;
    const rightHeight = this.right ? this.right.height : 0;
    this.height = Math.max(leftHeight, rightHeight) + 1;
  }

  // Get balance factor - O(1)
  getBalance() {
    const leftHeight = this.left ? this.left.height : 0;
    const rightHeight = this.right ? this.right.height : 0;
    return leftHeight - rightHeight;
  }

  // Right rotation - O(1)
  rotateRight() {
    const newRoot = this.left;
    const temp = newRoot.right;

    // Perform rotation
    newRoot.right = this;
    this.left = temp;

    // Update heights
    this.updateHeight();
    newRoot.updateHeight();

    return newRoot;
  }

  // Left rotation - O(1)
  rotateLeft() {
    const newRoot = this.right;
    const temp = newRoot.left;

    // Perform rotation
    newRoot.left = this;
    this.right = temp;

    // Update heights
    this.updateHeight();
    newRoot.updateHeight();

    return newRoot;
  }

  // Balance node - O(1)
  balance() {
    this.updateHeight();
    const balance = this.getBalance();

    // Left heavy
    if (balance > 1) {
      if (this.left.getBalance() < 0) {
        // Left-Right case
        this.left = this.left.rotateLeft();
      }
      // Left-Left case
      return this.rotateRight();
    }

    // Right heavy
    if (balance < -1) {
      if (this.right.getBalance() > 0) {
        // Right-Left case
        this.right = this.right.rotateRight();
      }
      // Right-Right case
      return this.rotateLeft();
    }

    return this;
  }
}

class AVLTree extends BinarySearchTree {
  constructor() {
    super();
  }

  // Insert with balancing - O(log n)
  insert(value) {
    this.root = this.insertNode(this.root, value);
    this.size++;
    return this;
  }

  insertNode(node, value) {
    if (!node) {
      return new AVLNode(value);
    }

    if (value < node.val) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.val) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // Duplicate value
    }

    return node.balance();
  }

  // Delete with balancing - O(log n)
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
        this.size--;
        return null;
      }

      if (!node.left) {
        this.size--;
        return node.right;
      }

      if (!node.right) {
        this.size--;
        return node.left;
      }

      // Node has two children
      const minRight = this.findMinNode(node.right);
      node.val = minRight.val;
      node.right = this.deleteNode(node.right, minRight.val);
    }

    return node.balance();
  }
}

// ==========================================
// N-ARY TREE IMPLEMENTATION
// ==========================================

class NaryNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  // Add child - O(1)
  addChild(child) {
    this.children.push(child);
    return this;
  }

  // Remove child - O(n)
  removeChild(value) {
    this.children = this.children.filter((child) => child.val !== value);
    return this;
  }

  // Search for value - O(n)
  search(value) {
    if (this.val === value) return this;

    for (const child of this.children) {
      const found = child.search(value);
      if (found) return found;
    }

    return null;
  }

  // Get tree height - O(n)
  getHeight() {
    if (this.children.length === 0) return 0;

    let maxHeight = 0;
    for (const child of this.children) {
      maxHeight = Math.max(maxHeight, child.getHeight());
    }

    return maxHeight + 1;
  }

  // Count nodes - O(n)
  countNodes() {
    let count = 1;

    for (const child of this.children) {
      count += child.countNodes();
    }

    return count;
  }

  // Convert to array (pre-order) - O(n)
  toArray() {
    const result = [this.val];

    for (const child of this.children) {
      result.push(...child.toArray());
    }

    return result;
  }
}

// ==========================================
// TRIE (PREFIX TREE) IMPLEMENTATION
// ==========================================

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  // Insert word - O(m) where m is word length
  insert(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.size++;
    }

    return this;
  }

  // Search for word - O(m)
  search(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return current.isEndOfWord;
  }

  // Check if prefix exists - O(m)
  startsWith(prefix) {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return true;
  }

  // Get all words with prefix - O(n) in worst case
  getWordsWithPrefix(prefix) {
    let current = this.root;

    // Navigate to prefix
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }

    // Collect all words from this node
    const words = [];

    function collectWords(node, currentPrefix) {
      if (node.isEndOfWord) {
        words.push(currentPrefix);
      }

      for (const [char, child] of node.children) {
        collectWords(child, currentPrefix + char);
      }
    }

    collectWords(current, prefix);
    return words;
  }

  // Delete word - O(m)
  delete(word) {
    function deleteHelper(node, word, index) {
      if (index === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.size === 0;
      }

      const char = word[index];
      if (!node.children.has(char)) return false;

      const shouldDelete = deleteHelper(
        node.children.get(char),
        word,
        index + 1
      );

      if (shouldDelete) {
        node.children.delete(char);
        return node.children.size === 0 && !node.isEndOfWord;
      }

      return false;
    }

    if (this.search(word)) {
      deleteHelper(this.root, word, 0);
      this.size--;
    }

    return this;
  }

  // Get trie size - O(1)
  getSize() {
    return this.size;
  }

  // Clear trie - O(1)
  clear() {
    this.root = new TrieNode();
    this.size = 0;
    return this;
  }
}

// ==========================================
// TREE TRAVERSAL UTILITIES
// ==========================================

class TreeTraversal {
  // In-order traversal (Left, Root, Right) - O(n)
  static inOrder(root) {
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

  // Iterative in-order traversal - O(n)
  static inOrderIterative(root) {
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

  // Pre-order traversal (Root, Left, Right) - O(n)
  static preOrder(root) {
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

  // Iterative pre-order traversal - O(n)
  static preOrderIterative(root) {
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

  // Post-order traversal (Left, Right, Root) - O(n)
  static postOrder(root) {
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

  // Iterative post-order traversal - O(n)
  static postOrderIterative(root) {
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

  // Level-order traversal (BFS) - O(n)
  static levelOrder(root) {
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

  // Level-order traversal by levels - O(n)
  static levelOrderLevels(root) {
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

  // Zigzag level-order traversal - O(n)
  static zigzagLevelOrder(root) {
    if (!root) return [];

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
}

// ==========================================
// TREE UTILITIES
// ==========================================

class TreeUtils {
  // Validate Binary Search Tree - O(n)
  static isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;

    if (root.val <= min || root.val >= max) return false;

    return (
      this.isValidBST(root.left, min, root.val) &&
      this.isValidBST(root.right, root.val, max)
    );
  }

  // Lowest Common Ancestor (Binary Tree) - O(n)
  static lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = this.lowestCommonAncestor(root.left, p, q);
    const right = this.lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    return left || right;
  }

  // Lowest Common Ancestor (BST) - O(log n)
  static lcaBST(root, p, q) {
    if (!root) return null;

    if (root.val > p.val && root.val > q.val) {
      return this.lcaBST(root.left, p, q);
    }

    if (root.val < p.val && root.val < q.val) {
      return this.lcaBST(root.right, p, q);
    }

    return root;
  }

  // Serialize tree to string - O(n)
  static serialize(root) {
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

  // Deserialize tree from string - O(n)
  static deserialize(data) {
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

  // Diameter of Binary Tree - O(n)
  static diameterOfBinaryTree(root) {
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

  // Maximum Path Sum - O(n)
  static maxPathSum(root) {
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

  // Invert Binary Tree - O(n)
  static invertTree(root) {
    if (!root) return null;

    const left = root.left;
    const right = root.right;

    root.left = this.invertTree(right);
    root.right = this.invertTree(left);

    return root;
  }

  // Check if two trees are identical - O(n)
  static isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
  }

  // Check if tree is symmetric - O(n)
  static isSymmetric(root) {
    if (!root) return true;

    function isMirror(left, right) {
      if (!left && !right) return true;
      if (!left || !right) return false;

      return (
        left.val === right.val &&
        isMirror(left.left, right.right) &&
        isMirror(left.right, right.left)
      );
    }

    return isMirror(root.left, root.right);
  }

  // Maximum depth of binary tree - O(n)
  static maxDepth(root) {
    if (!root) return 0;

    const leftDepth = this.maxDepth(root.left);
    const rightDepth = this.maxDepth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  // Minimum depth of binary tree - O(n)
  static minDepth(root) {
    if (!root) return 0;

    if (!root.left && !root.right) return 1;

    if (!root.left) return this.minDepth(root.right) + 1;
    if (!root.right) return this.minDepth(root.left) + 1;

    return Math.min(this.minDepth(root.left), this.minDepth(root.right)) + 1;
  }

  // Right side view of binary tree - O(n)
  static rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        if (i === levelSize - 1) {
          result.push(node.val);
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    return result;
  }

  // Convert sorted array to BST - O(n)
  static sortedArrayToBST(nums) {
    function convert(left, right) {
      if (left > right) return null;

      const mid = Math.floor((left + right) / 2);
      const node = new TreeNode(nums[mid]);

      node.left = convert(left, mid - 1);
      node.right = convert(mid + 1, right);

      return node;
    }

    return convert(0, nums.length - 1);
  }

  // Find kth smallest element in BST - O(n)
  static kthSmallest(root, k) {
    const result = [];

    function inOrder(node) {
      if (!node || result.length >= k) return;

      inOrder(node.left);
      result.push(node.val);
      inOrder(node.right);
    }

    inOrder(root);
    return result[k - 1];
  }
}

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

// File System Tree
class FileSystemTree {
  constructor() {
    this.root = new NaryNode("/", []);
  }

  // Create path - O(m) where m is path depth
  createPath(path) {
    const parts = path.split("/").filter((part) => part.length > 0);
    let current = this.root;

    for (const part of parts) {
      let child = current.children.find((c) => c.val === part);

      if (!child) {
        child = new NaryNode(part, []);
        current.addChild(child);
      }

      current = child;
    }

    return current;
  }

  // Get path - O(m)
  getPath(path) {
    const parts = path.split("/").filter((part) => part.length > 0);
    let current = this.root;

    for (const part of parts) {
      const child = current.children.find((c) => c.val === part);
      if (!child) return null;
      current = child;
    }

    return current;
  }

  // List directory - O(n)
  listDirectory(path) {
    const node = this.getPath(path);
    return node ? node.children.map((child) => child.val) : [];
  }

  // Get tree size - O(n)
  getSize() {
    return this.root.countNodes();
  }

  // Get tree depth - O(n)
  getDepth() {
    return this.root.getHeight();
  }
}

// Expression Tree
class ExpressionTree {
  constructor() {
    this.root = null;
  }

  // Build from postfix expression - O(n)
  buildFromPostfix(postfix) {
    const stack = [];

    for (const token of postfix) {
      if (!isNaN(token)) {
        stack.push(new TreeNode(token));
      } else {
        const right = stack.pop();
        const left = stack.pop();
        const node = new TreeNode(token, left, right);
        stack.push(node);
      }
    }

    this.root = stack[0];
    return this;
  }

  // Evaluate expression - O(n)
  evaluate() {
    if (!this.root) return 0;

    function evaluateNode(node) {
      if (!isNaN(node.val)) return node.val;

      const leftVal = evaluateNode(node.left);
      const rightVal = evaluateNode(node.right);

      switch (node.val) {
        case "+":
          return leftVal + rightVal;
        case "-":
          return leftVal - rightVal;
        case "*":
          return leftVal * rightVal;
        case "/":
          return leftVal / rightVal;
        default:
          throw new Error(`Unknown operator: ${node.val}`);
      }
    }

    return evaluateNode(this.root);
  }

  // Convert to infix notation - O(n)
  toInfix() {
    if (!this.root) return "";

    function toInfixNode(node) {
      if (!isNaN(node.val)) return node.val;

      const left = toInfixNode(node.left);
      const right = toInfixNode(node.right);
      return `(${left} ${node.val} ${right})`;
    }

    return toInfixNode(this.root);
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Tree Implementation Tests...\n");

  // Test Basic Tree
  console.log("🌳 Testing Basic Tree:");
  const tree = new TreeNode(5);
  tree.insert(3);
  tree.insert(7);
  tree.insert(2);
  tree.insert(4);

  console.log("Tree height:", tree.getHeight());
  console.log("Node count:", tree.countNodes());
  console.log("Is balanced:", tree.isBalanced());
  console.log("Min value:", tree.findMin().val);
  console.log("Max value:", tree.findMax().val);
  console.log("In-order:", TreeTraversal.inOrder(tree));

  // Test Binary Search Tree
  console.log("\n🔍 Testing Binary Search Tree:");
  const bst = new BinarySearchTree();
  bst.insert(5).insert(3).insert(7).insert(2).insert(4);

  console.log("Search 3:", bst.search(3) ? "Found" : "Not found");
  console.log("Search 6:", bst.search(6) ? "Found" : "Not found");
  console.log("Tree size:", bst.getSize());
  console.log("Is balanced:", bst.isBalanced());
  console.log("BST array:", bst.toArray());

  bst.delete(3);
  console.log("After deleting 3:", bst.toArray());

  // Test AVL Tree
  console.log("\n⚖️ Testing AVL Tree:");
  const avl = new AVLTree();
  avl.insert(10).insert(20).insert(30).insert(40).insert(50);

  console.log("AVL height:", avl.getHeight());
  console.log("AVL size:", avl.getSize());
  console.log("Is balanced:", avl.isBalanced());
  console.log("AVL array:", avl.toArray());

  // Test Trie
  console.log("\n🔤 Testing Trie:");
  const trie = new Trie();
  trie.insert("apple").insert("app").insert("application").insert("apply");

  console.log('Search "app":', trie.search("app"));
  console.log('Search "apples":', trie.search("apples"));
  console.log('Starts with "appl":', trie.startsWith("appl"));
  console.log('Words with prefix "app":', trie.getWordsWithPrefix("app"));
  console.log("Trie size:", trie.getSize());

  // Test Tree Traversals
  console.log("\n🔄 Testing Tree Traversals:");
  const traversalTree = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(6))
  );

  console.log("In-order:", TreeTraversal.inOrder(traversalTree));
  console.log("Pre-order:", TreeTraversal.preOrder(traversalTree));
  console.log("Post-order:", TreeTraversal.postOrder(traversalTree));
  console.log("Level-order:", TreeTraversal.levelOrder(traversalTree));
  console.log(
    "Level-order levels:",
    TreeTraversal.levelOrderLevels(traversalTree)
  );
  console.log("Zigzag:", TreeTraversal.zigzagLevelOrder(traversalTree));

  // Test Tree Utilities
  console.log("\n🔧 Testing Tree Utilities:");
  console.log("Is valid BST:", TreeUtils.isValidBST(bst.root));
  console.log("Tree diameter:", TreeUtils.diameterOfBinaryTree(traversalTree));
  console.log("Max path sum:", TreeUtils.maxPathSum(traversalTree));
  console.log("Max depth:", TreeUtils.maxDepth(traversalTree));
  console.log("Min depth:", TreeUtils.minDepth(traversalTree));
  console.log("Right side view:", TreeUtils.rightSideView(traversalTree));

  const invertedTree = TreeUtils.invertTree(traversalTree);
  console.log(
    "Inverted tree (pre-order):",
    TreeTraversal.preOrder(invertedTree)
  );

  // Test N-ary Tree
  console.log("\n🌲 Testing N-ary Tree:");
  const naryTree = new NaryNode("root");
  naryTree.addChild(new NaryNode("child1"));
  naryTree.addChild(new NaryNode("child2"));
  naryTree.children[0].addChild(new NaryNode("grandchild1"));

  console.log("N-ary tree array:", naryTree.toArray());
  console.log("N-ary tree height:", naryTree.getHeight());
  console.log("N-ary tree nodes:", naryTree.countNodes());

  // Test File System Tree
  console.log("\n📁 Testing File System Tree:");
  const fs = new FileSystemTree();
  fs.createPath("/home/user/documents");
  fs.createPath("/home/user/downloads");
  fs.createPath("/var/log");

  console.log("List /home/user:", fs.listDirectory("/home/user"));
  console.log("Tree size:", fs.getSize());
  console.log("Tree depth:", fs.getDepth());

  // Test Expression Tree
  console.log("\n🧮 Testing Expression Tree:");
  const exprTree = new ExpressionTree();
  exprTree.buildFromPostfix(["2", "3", "+", "4", "*"]);

  console.log("Expression infix:", exprTree.toInfix());
  console.log("Expression result:", exprTree.evaluate());

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  TreeNode,
  BinarySearchTree,
  AVLNode,
  AVLTree,
  NaryNode,
  TrieNode,
  Trie,
  TreeTraversal,
  TreeUtils,
  FileSystemTree,
  ExpressionTree,
};
