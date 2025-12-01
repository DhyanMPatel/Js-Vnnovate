// 🌳 Tree Algorithms Practice Problems
// Implement these functions to master tree algorithms

// ==========================================
// EASY PROBLEMS (O(n) or O(h))
// ==========================================

/**
 * Problem 1: Maximum Depth of Binary Tree
 * Find the maximum depth of a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number} Maximum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 */
function maxDepth(root) {
  // Your implementation here
}

/**
 * Problem 2: Invert Binary Tree
 * Invert a binary tree (mirror it).
 *
 * @param {TreeNode} root - Root of the tree
 * @return {TreeNode} Inverted tree root
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 */
function invertTree(root) {
  // Your implementation here
}

/**
 * Problem 3: Same Tree
 * Check if two binary trees are the same.
 *
 * @param {TreeNode} p - First tree root
 * @param {TreeNode} q - Second tree root
 * @return {boolean} True if trees are identical
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 */
function isSameTree(p, q) {
  // Your implementation here
}

/**
 * Problem 4: Symmetric Tree
 * Check if a binary tree is symmetric.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {boolean} True if tree is symmetric
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,2,2,3,4,4,3]
 * Output: true
 */
function isSymmetric(root) {
  // Your implementation here
}

/**
 * Problem 5: Average of Levels in Binary Tree
 * Calculate the average value of nodes on each level.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Array of level averages
 *
 * Expected Time: O(n)
 * Expected Space: O(w) where w is maximum width
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [3.0, 14.5, 11.0]
 */
function averageOfLevels(root) {
  // Your implementation here
}

/**
 * Problem 6: Find Largest Value in Each Tree Row
 * Find the largest value in each level of the tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Array of maximum values per level
 *
 * Expected Time: O(n)
 * Expected Space: O(w)
 *
 * Example:
 * Input: root = [1,3,2,5,3,null,9]
 * Output: [1,3,9]
 */
function largestValues(root) {
  // Your implementation here
}

/**
 * Problem 7: Leaf Similar Trees
 * Check if two trees have similar leaf sequences.
 *
 * @param {TreeNode} root1 - First tree root
 * @param {TreeNode} root2 - Second tree root
 * @return {boolean} True if leaf sequences are identical
 *
 * Expected Time: O(n1 + n2)
 * Expected Space: O(h1 + h2)
 *
 * Example:
 * Input: root1 = [3,5,1,6,2,9,8], root2 = [3,5,1,6,7,4,2]
 * Output: true
 */
function leafSimilar(root1, root2) {
  // Your implementation here
}

/**
 * Problem 8: Univalued Binary Tree
 * Check if all nodes in the tree have the same value.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {boolean} True if all nodes have same value
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,1,1,1,1,null,1]
 * Output: true
 */
function isUnivalTree(root) {
  // Your implementation here
}

/**
 * Problem 9: Increasing Order Search Tree
 * Convert BST to increasing order search tree.
 *
 * @param {TreeNode} root - Root of the BST
 * @return {TreeNode} Root of the new tree
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
 * Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
 */
function increasingBST(root) {
  // Your implementation here
}

/**
 * Problem 10: Merge Two Binary Trees
 * Merge two binary trees by summing overlapping nodes.
 *
 * @param {TreeNode} root1 - First tree root
 * @param {TreeNode} root2 - Second tree root
 * @return {TreeNode} Merged tree root
 *
 * Expected Time: O(n1 + n2)
 * Expected Space: O(h1 + h2)
 *
 * Example:
 * Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
 * Output: [3,4,5,5,4,null,7]
 */
function mergeTrees(root1, root2) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Binary Tree Level Order Traversal
 * Return level order traversal of a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[][]} Level order traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(w)
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 */
function levelOrder(root) {
  // Your implementation here
}

/**
 * Problem 12: Binary Tree Zigzag Level Order Traversal
 * Return zigzag level order traversal.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[][]} Zigzag level order traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(w)
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[20,9],[15,7]]
 */
function zigzagLevelOrder(root) {
  // Your implementation here
}

/**
 * Problem 13: Validate Binary Search Tree
 * Check if a tree is a valid BST.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {boolean} True if valid BST
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [2,1,3]
 * Output: true
 */
function isValidBST(root) {
  // Your implementation here
}

/**
 * Problem 14: Kth Smallest Element in a BST
 * Find the kth smallest element in a BST.
 *
 * @param {TreeNode} root - Root of the BST
 * @param {number} k - Kth position
 * @return {number} Kth smallest element
 *
 * Expected Time: O(k + h)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [3,1,4,null,2], k = 1
 * Output: 1
 */
function kthSmallest(root, k) {
  // Your implementation here
}

/**
 * Problem 15: Lowest Common Ancestor of a Binary Tree
 * Find LCA of two nodes in a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @param {TreeNode} p - First node
 * @param {TreeNode} q - Second node
 * @return {TreeNode} LCA node
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * Output: 3
 */
function lowestCommonAncestor(root, p, q) {
  // Your implementation here
}

/**
 * Problem 16: Binary Tree Right Side View
 * Return the right side view of a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Right side view
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 */
function rightSideView(root) {
  // Your implementation here
}

/**
 * Problem 17: Construct Binary Tree from Preorder and Inorder Traversal
 * Build tree from preorder and inorder traversals.
 *
 * @param {number[]} preorder - Preorder traversal
 * @param {number[]} inorder - Inorder traversal
 * @return {TreeNode} Root of the constructed tree
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 */
function buildTree(preorder, inorder) {
  // Your implementation here
}

/**
 * Problem 18: Populating Next Right Pointers in Each Node
 * Connect each node to its next right node.
 *
 * @param {Node} root - Root of perfect binary tree
 * @return {Node} Connected tree root
 *
 * Expected Time: O(n)
 * Expected Space: O(1) (excluding recursion stack)
 *
 * Example:
 * Input: root = [1,2,3,4,5,6,7]
 * Output: [1,#,2,3,#,4,5,6,7,#]
 */
function connect(root) {
  // Your implementation here
}

/**
 * Problem 19: Serialize and Deserialize Binary Tree
 * Convert tree to string and back.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {string} Serialized string
 */
function serialize(root) {
  // Your implementation here
}

/**
 * Problem 20: Deserialize Binary Tree
 * Convert string back to tree.
 *
 * @param {string} data - Serialized string
 * @return {TreeNode} Root of the tree
 */
function deserialize(data) {
  // Your implementation here
}

/**
 * Problem 21: Delete Node in a BST
 * Delete a node with given key from BST.
 *
 * @param {TreeNode} root - Root of the BST
 * @param {number} key - Key to delete
 * @return {TreeNode} Root after deletion
 *
 * Expected Time: O(h)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [5,3,6,2,4,null,7], key = 3
 * Output: [5,4,6,2,null,null,7]
 */
function deleteNode(root, key) {
  // Your implementation here
}

/**
 * Problem 22: Find Mode in Binary Search Tree
 * Find all modes (most frequent elements) in BST.
 *
 * @param {TreeNode} root - Root of the BST
 * @return {number[]} Array of modes
 *
 * Expected Time: O(n)
 * Expected Space: O(1) (excluding output)
 *
 * Example:
 * Input: root = [1,null,2,2]
 * Output: [2]
 */
function findMode(root) {
  // Your implementation here
}

/**
 * Problem 23: Convert BST to Greater Tree
 * Convert BST to greater tree (each node = original + sum of greater nodes).
 *
 * @param {TreeNode} root - Root of the BST
 * @return {TreeNode} Root of greater tree
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
 * Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
 */
function convertBST(root) {
  // Your implementation here
}

/**
 * Problem 24: Diameter of Binary Tree
 * Find the diameter (longest path) of a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number} Diameter length
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,2,3,4,5]
 * Output: 3
 */
function diameterOfBinaryTree(root) {
  // Your implementation here
}

/**
 * Problem 25: Maximum Path Sum
 * Find the maximum path sum in a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number} Maximum path sum
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [-10,9,20,null,null,15,7]
 * Output: 42
 */
function maxPathSum(root) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Binary Tree Maximum Path Sum II
 * Find maximum path sum from root to any node.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number} Maximum root-to-leaf path sum
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,2,3]
 * Output: 6
 */
function maxPathSumII(root) {
  // Your implementation here
}

/**
 * Problem 27: Recover Binary Search Tree
 * Recover BST where two nodes were swapped.
 *
 * @param {TreeNode} root - Root of the BST
 * @return {void} Modify tree in-place
 *
 * Expected Time: O(n)
 * Expected Space: O(1) (excluding recursion stack)
 *
 * Example:
 * Input: root = [1,3,null,null,2]
 * Output: [3,1,null,null,2]
 */
function recoverTree(root) {
  // Your implementation here
}

/**
 * Problem 28: Unique Binary Search Trees
 * Count unique BSTs with n nodes.
 *
 * @param {number} n - Number of nodes
 * @return {number} Count of unique BSTs
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3
 * Output: 5
 */
function numTrees(n) {
  // Your implementation here
}

/**
 * Problem 29: Unique Binary Search Trees II
 * Generate all unique BSTs with values 1 to n.
 *
 * @param {number} n - Number of nodes
 * @return {TreeNode[]} Array of BST roots
 *
 * Expected Time: O(Catalan(n))
 * Expected Space: O(Catalan(n))
 *
 * Example:
 * Input: n = 3
 * Output: Array of 5 unique BSTs
 */
function generateTrees(n) {
  // Your implementation here
}

/**
 * Problem 30: Binary Tree Postorder Traversal
 * Return postorder traversal using iteration.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Postorder traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [3,2,1]
 */
function postorderTraversal(root) {
  // Your implementation here
}

/**
 * Problem 31: Binary Tree Preorder Traversal
 * Return preorder traversal using iteration.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Preorder traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [1,2,3]
 */
function preorderTraversal(root) {
  // Your implementation here
}

/**
 * Problem 32: Binary Tree Inorder Traversal
 * Return inorder traversal using iteration.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Inorder traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [1,3,2]
 */
function inorderTraversal(root) {
  // Your implementation here
}

/**
 * Problem 33: Find Duplicate Subtrees
 * Find all duplicate subtrees in a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {TreeNode[]} Array of duplicate subtree roots
 *
 * Expected Time: O(n²)
 * Expected Space: O(n²)
 *
 * Example:
 * Input: root = [1,2,3,4,null,2,4,null,null,4]
 * Output: [[2,4],[4]]
 */
function findDuplicateSubtrees(root) {
  // Your implementation here
}

/**
 * Problem 34: Construct Binary Tree from Inorder and Postorder Traversal
 * Build tree from inorder and postorder traversals.
 *
 * @param {number[]} inorder - Inorder traversal
 * @param {number[]} postorder - Postorder traversal
 * @return {TreeNode} Root of the constructed tree
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * Output: [3,9,20,null,null,15,7]
 */
function buildTree2(inorder, postorder) {
  // Your implementation here
}

/**
 * Problem 35: Boundary of Binary Tree
 * Find boundary traversal of a binary tree.
 *
 * @param {TreeNode} root - Root of the tree
 * @return {number[]} Boundary traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]
 * Output: [1,2,4,7,8,9,10,6,3]
 */
function boundaryOfBinaryTree(root) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Trie
 * Prefix tree implementation.
 */
class Trie {
  constructor() {
    // Your implementation here
  }

  insert(word) {
    // Your implementation here
  }

  search(word) {
    // Your implementation here
  }

  startsWith(prefix) {
    // Your implementation here
  }
}

/**
 * Bonus 2: Implement Segment Tree
 * Range query and update data structure.
 */
class SegmentTree {
  constructor(arr) {
    // Your implementation here
  }

  update(index, value) {
    // Your implementation here
  }

  query(left, right) {
    // Your implementation here
  }
}

/**
 * Bonus 3: Implement Fenwick Tree
 * Binary indexed tree for prefix sums.
 */
class FenwickTree {
  constructor(size) {
    // Your implementation here
  }

  update(index, delta) {
    // Your implementation here
  }

  query(index) {
    // Your implementation here
  }

  rangeQuery(left, right) {
    // Your implementation here
  }
}

/**
 * Bonus 4: Implement AVL Tree
 * Self-balancing binary search tree.
 */
class AVLTree {
  constructor() {
    // Your implementation here
  }

  insert(value) {
    // Your implementation here
  }

  delete(value) {
    // Your implementation here
  }

  search(value) {
    // Your implementation here
  }
}

/**
 * Bonus 5: Implement Red-Black Tree
 * Self-balancing binary search tree.
 */
class RedBlackTree {
  constructor() {
    // Your implementation here
  }

  insert(value) {
    // Your implementation here
  }

  delete(value) {
    // Your implementation here
  }

  search(value) {
    // Your implementation here
  }
}

/**
 * Bonus 6: Tree Isomorphism Check
 * Check if two trees are isomorphic.
 */
function areIsomorphic(root1, root2) {
  // Your implementation here
}

/**
 * Bonus 7: Tree to String Conversion
 * Convert tree to string representation.
 */
function treeToString(root) {
  // Your implementation here
}

/**
 * Bonus 8: Find All Paths Root to Leaf
 * Find all root-to-leaf paths.
 */
function findAllPaths(root) {
  // Your implementation here
}

/**
 * Bonus 9: Check if Tree is Complete
 * Check if binary tree is complete.
 */
function isCompleteTree(root) {
  // Your implementation here
}

/**
 * Bonus 10: Tree Serialization with Parentheses
 * Serialize tree using parentheses notation.
 */
function serializeWithParentheses(root) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Tree Algorithms Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test max depth
  console.log("Example - Max Depth:");
  console.log("Input: root = [3,9,20,null,null,15,7]");
  console.log("Expected: 3");
  console.log("Your result:", maxDepth(null)); // Replace with actual test tree

  // Test invert tree
  console.log("\nExample - Invert Tree:");
  console.log("Input: root = [4,2,7,1,3,6,9]");
  console.log("Expected: [4,7,2,9,6,3,1]");
  console.log("Your result:", invertTree(null)); // Replace with actual test tree

  // Test same tree
  console.log("\nExample - Same Tree:");
  console.log("Input: p = [1,2,3], q = [1,2,3]");
  console.log("Expected: true");
  console.log("Your result:", isSameTree(null, null)); // Replace with actual test trees

  // Test symmetric tree
  console.log("\nExample - Symmetric Tree:");
  console.log("Input: root = [1,2,2,3,4,4,3]");
  console.log("Expected: true");
  console.log("Your result:", isSymmetric(null)); // Replace with actual test tree

  // Test average of levels
  console.log("\nExample - Average of Levels:");
  console.log("Input: root = [3,9,20,null,null,15,7]");
  console.log("Expected: [3.0, 14.5, 11.0]");
  console.log("Your result:", averageOfLevels(null)); // Replace with actual test tree

  // Test largest values
  console.log("\nExample - Largest Values:");
  console.log("Input: root = [1,3,2,5,3,null,9]");
  console.log("Expected: [1,3,9]");
  console.log("Your result:", largestValues(null)); // Replace with actual test tree

  // Test leaf similar
  console.log("\nExample - Leaf Similar:");
  console.log("Input: root1 = [3,5,1,6,2,9,8], root2 = [3,5,1,6,7,4,2]");
  console.log("Expected: true");
  console.log("Your result:", leafSimilar(null, null)); // Replace with actual test trees

  // Test unival tree
  console.log("\nExample - Unival Tree:");
  console.log("Input: root = [1,1,1,1,1,null,1]");
  console.log("Expected: true");
  console.log("Your result:", isUnivalTree(null)); // Replace with actual test tree

  // Test merge trees
  console.log("\nExample - Merge Trees:");
  console.log("Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]");
  console.log("Expected: [3,4,5,5,4,null,7]");
  console.log("Your result:", mergeTrees(null, null)); // Replace with actual test trees

  // Test level order
  console.log("\nExample - Level Order:");
  console.log("Input: root = [3,9,20,null,null,15,7]");
  console.log("Expected: [[3],[9,20],[15,7]]");
  console.log("Your result:", levelOrder(null)); // Replace with actual test tree

  // Test zigzag level order
  console.log("\nExample - Zigzag Level Order:");
  console.log("Input: root = [3,9,20,null,null,15,7]");
  console.log("Expected: [[3],[20,9],[15,7]]");
  console.log("Your result:", zigzagLevelOrder(null)); // Replace with actual test tree

  // Test valid BST
  console.log("\nExample - Valid BST:");
  console.log("Input: root = [2,1,3]");
  console.log("Expected: true");
  console.log("Your result:", isValidBST(null)); // Replace with actual test tree

  // Test kth smallest
  console.log("\nExample - Kth Smallest:");
  console.log("Input: root = [3,1,4,null,2], k = 1");
  console.log("Expected: 1");
  console.log("Your result:", kthSmallest(null, 1)); // Replace with actual test tree

  // Test LCA
  console.log("\nExample - LCA:");
  console.log("Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1");
  console.log("Expected: 3");
  console.log("Your result:", lowestCommonAncestor(null, null, null)); // Replace with actual test trees

  // Test right side view
  console.log("\nExample - Right Side View:");
  console.log("Input: root = [1,2,3,null,5,null,4]");
  console.log("Expected: [1,3,4]");
  console.log("Your result:", rightSideView(null)); // Replace with actual test tree

  // Test build tree
  console.log("\nExample - Build Tree:");
  console.log("Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]");
  console.log("Expected: [3,9,20,null,null,15,7]");
  console.log("Your result:", buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

  // Test diameter
  console.log("\nExample - Diameter:");
  console.log("Input: root = [1,2,3,4,5]");
  console.log("Expected: 3");
  console.log("Your result:", diameterOfBinaryTree(null)); // Replace with actual test tree

  // Test max path sum
  console.log("\nExample - Max Path Sum:");
  console.log("Input: root = [-10,9,20,null,null,15,7]");
  console.log("Expected: 42");
  console.log("Your result:", maxPathSum(null)); // Replace with actual test tree

  // Test delete node
  console.log("\nExample - Delete Node:");
  console.log("Input: root = [5,3,6,2,4,null,7], key = 3");
  console.log("Expected: [5,4,6,2,null,null,7]");
  console.log("Your result:", deleteNode(null, 3)); // Replace with actual test tree

  // Test find mode
  console.log("\nExample - Find Mode:");
  console.log("Input: root = [1,null,2,2]");
  console.log("Expected: [2]");
  console.log("Your result:", findMode(null)); // Replace with actual test tree

  // Test convert BST
  console.log("\nExample - Convert BST:");
  console.log(
    "Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]"
  );
  console.log(
    "Expected: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]"
  );
  console.log("Your result:", convertBST(null)); // Replace with actual test tree

  // Test boundary traversal
  console.log("\nExample - Boundary Traversal:");
  console.log("Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]");
  console.log("Expected: [1,2,4,7,8,9,10,6,3]");
  console.log("Your result:", boundaryOfBinaryTree(null)); // Replace with actual test tree

  console.log("\n🎯 Implement all functions and test them!");
  console.log(
    "💡 Focus on understanding tree traversal patterns and BST operations"
  );
  console.log("🚀 Move to medium problems when comfortable with easy ones");

  console.log("\n✅ Testing framework ready!");
}

// Helper function to create test trees
function createTreeFromArray(arr) {
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

// Helper function to test your solutions
function testFunction(funcName, testCases) {
  console.log(`\n🧮 Testing ${funcName}:`);

  for (let i = 0; i < testCases.length; i++) {
    const { input, expected } = testCases[i];
    const result = eval(
      `${funcName}(${input.map((arg) => JSON.stringify(arg)).join(", ")})`
    );

    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test ${i + 1}: ${passed ? "✅" : "❌"}`);
    if (!passed) {
      console.log(`  Input: ${JSON.stringify(input)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got: ${JSON.stringify(result)}`);
    }
  }
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  maxDepth,
  invertTree,
  isSameTree,
  isSymmetric,
  averageOfLevels,
  largestValues,
  leafSimilar,
  isUnivalTree,
  increasingBST,
  mergeTrees,

  // Medium problems
  levelOrder,
  zigzagLevelOrder,
  isValidBST,
  kthSmallest,
  lowestCommonAncestor,
  rightSideView,
  buildTree,
  connect,
  serialize,
  deserialize,
  deleteNode,
  findMode,
  convertBST,
  diameterOfBinaryTree,
  maxPathSum,

  // Hard problems
  maxPathSumII,
  recoverTree,
  numTrees,
  generateTrees,
  postorderTraversal,
  preorderTraversal,
  inorderTraversal,
  findDuplicateSubtrees,
  buildTree2,
  boundaryOfBinaryTree,

  // Bonus challenges
  Trie,
  SegmentTree,
  FenwickTree,
  AVLTree,
  RedBlackTree,
  areIsomorphic,
  treeToString,
  findAllPaths,
  isCompleteTree,
  serializeWithParentheses,

  // Utilities
  createTreeFromArray,
  testFunction,
};
