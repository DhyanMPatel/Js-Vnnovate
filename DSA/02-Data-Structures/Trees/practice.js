// 🌳 Trees Practice Problems
// Implement these functions to master tree operations

// ==========================================
// EASY PROBLEMS (O(n) or less)
// ==========================================

/**
 * Problem 1: Maximum Depth of Binary Tree
 * Find the maximum depth of a binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Maximum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(h) where h is tree height
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 3
 */
function maxDepth(root) {
  // Your implementation here
}

/**
 * Problem 2: Same Tree
 * Check if two binary trees are identical.
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
 * Problem 3: Invert Binary Tree
 * Mirror a binary tree (left becomes right).
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 */
function invertTree(root) {
  // Your implementation here
}

/**
 * Problem 4: Symmetric Tree
 * Check if a binary tree is symmetric.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {boolean} True if symmetric
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,2,2,3,4,4,3]
 * Output: true
 */
function isSymmetric(root) {
  // Your implementation here
}

/**
 * Problem 5: Convert Sorted Array to Binary Search Tree
 * Convert sorted array to height-balanced BST.
 *
 * @param {number[]} nums - Sorted array
 * @return {TreeNode} Root of BST
 *
 * Expected Time: O(n)
 * Expected Space: O(log n) recursion depth
 *
 * Example:
 * Input: [-10,-3,0,5,9]
 * Output: [0,-3,9,-10,null,5]
 */
function sortedArrayToBST(nums) {
  // Your implementation here
}

/**
 * Problem 6: Minimum Depth of Binary Tree
 * Find the minimum depth of a binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Minimum depth
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 2
 */
function minDepth(root) {
  // Your implementation here
}

/**
 * Problem 7: Path Sum
 * Check if tree has root-to-leaf path with given sum.
 *
 * @param {TreeNode} root - Root of binary tree
 * @param {number} targetSum - Target sum
 * @return {boolean} True if path exists
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [5,4,8,11,null,13,4,7,2,null], targetSum = 22
 * Output: true
 */
function hasPathSum(root, targetSum) {
  // Your implementation here
}

/**
 * Problem 8: Sum of Left Leaves
 * Find sum of all left leaves in a binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Sum of left leaves
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 24
 */
function sumOfLeftLeaves(root) {
  // Your implementation here
}

/**
 * Problem 9: Find Mode in Binary Search Tree
 * Find all modes (most frequent elements) in BST.
 *
 * @param {TreeNode} root - Root of BST
 * @return {number[]} Array of modes
 *
 * Expected Time: O(n)
 * Expected Space: O(1) extra space
 *
 * Example:
 * Input: [1,null,2,2]
 * Output: [2]
 */
function findMode(root) {
  // Your implementation here
}

/**
 * Problem 10: Average of Levels in Binary Tree
 * Calculate average value at each tree level.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Average values
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [3.00000,14.50000,11.00000]
 */
function averageOfLevels(root) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Validate Binary Search Tree
 * Check if tree is a valid BST.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {boolean} True if valid BST
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [2,1,3]
 * Output: true
 */
function isValidBST(root) {
  // Your implementation here
}

/**
 * Problem 12: Lowest Common Ancestor of a Binary Tree
 * Find LCA of two nodes in binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
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
 * Problem 13: Binary Tree Level Order Traversal
 * Perform level-order traversal of binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Levels of tree
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 */
function levelOrder(root) {
  // Your implementation here
}

/**
 * Problem 14: Binary Tree Right Side View
 * Find right side view of binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Right side view
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 */
function rightSideView(root) {
  // Your implementation here
}

/**
 * Problem 15: Kth Smallest Element in a BST
 * Find kth smallest element in BST.
 *
 * @param {TreeNode} root - Root of BST
 * @param {number} k - Kth position
 * @return {number} Kth smallest element
 *
 * Expected Time: O(n)
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
 * Problem 16: Construct Binary Tree from Preorder and Inorder Traversal
 * Build binary tree from preorder and inorder traversals.
 *
 * @param {number[]} preorder - Preorder traversal
 * @param {number[]} inorder - Inorder traversal
 * @return {TreeNode} Root of binary tree
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
 * Problem 17: Populating Next Right Pointers in Each Node
 * Connect nodes at same level in perfect binary tree.
 *
 * @param {Node} root - Root of perfect binary tree
 * @return {Node} Connected tree
 *
 * Expected Time: O(n)
 * Expected Space: O(1) extra space
 *
 * Example:
 * Input: [1,2,3,4,5,6,7]
 * Output: [1,#,2,3,#,4,5,6,7,#]
 */
function connect(root) {
  // Your implementation here
}

/**
 * Problem 18: Flatten Binary Tree to Linked List
 * Flatten binary tree to linked list in-place.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {void} Modify tree in-place
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,2,5,3,4,null,6]
 * Output: [1,null,2,null,3,null,4,null,5,null,6]
 */
function flatten(root) {
  // Your implementation here
}

/**
 * Problem 19: Path Sum II
 * Find all root-to-leaf paths with given sum.
 *
 * @param {TreeNode} root - Root of binary tree
 * @param {number} targetSum - Target sum
 * @return {number[][]} All valid paths
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * Output: [[5,4,11,2],[5,8,4,5]]
 */
function pathSum(root, targetSum) {
  // Your implementation here
}

/**
 * Problem 20: Count Complete Tree Nodes
 * Count nodes in complete binary tree efficiently.
 *
 * @param {TreeNode} root - Root of complete binary tree
 * @return {number} Number of nodes
 *
 * Expected Time: O(log n * log n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,2,3,4,5,6]
 * Output: 6
 */
function countNodes(root) {
  // Your implementation here
}

/**
 * Problem 21: Binary Tree Zigzag Level Order Traversal
 * Perform zigzag level-order traversal.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Zigzag levels
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [[3],[20,9],[15,7]]
 */
function zigzagLevelOrder(root) {
  // Your implementation here
}

/**
 * Problem 22: Find Largest Value in Each Tree Row
 * Find maximum value at each tree level.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Maximum values per level
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,3,2,5,3,null,9]
 * Output: [1,3,9]
 */
function largestValues(root) {
  // Your implementation here
}

/**
 * Problem 23: Delete Node in a BST
 * Delete a node from binary search tree.
 *
 * @param {TreeNode} root - Root of BST
 * @param {number} key - Value to delete
 * @return {TreeNode} Root of modified BST
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
 * Problem 24: Insert into a Binary Search Tree
 * Insert value into binary search tree.
 *
 * @param {TreeNode} root - Root of BST
 * @param {number} val - Value to insert
 * @return {TreeNode} Root of modified BST
 *
 * Expected Time: O(h)
 * Expected Space: O(h)
 *
 * Example:
 * Input: root = [4,2,7,1,3], val = 5
 * Output: [4,2,7,1,3,5]
 */
function insertIntoBST(root, val) {
  // Your implementation here
}

/**
 * Problem 25: Search in a Binary Search Tree
 * Search for value in BST.
 *
 * @param {TreeNode} root - Root of BST
 * @param {number} val - Value to search
 * @return {TreeNode} Node with value or null
 *
 * Expected Time: O(h)
 * Expected Space: O(1)
 *
 * Example:
 * Input: root = [4,2,7,1,3], val = 2
 * Output: [2,1,3]
 */
function searchBST(root, val) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Binary Tree Maximum Path Sum
 * Find maximum path sum in binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
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

/**
 * Problem 27: Serialize and Deserialize Binary Tree
 * Serialize tree to string and deserialize back.
 */
class Codec {
  constructor() {
    // Your implementation here
  }

  // Serialize tree to string
  serialize(root) {
    // Your implementation here
  }

  // Deserialize string to tree
  deserialize(data) {
    // Your implementation here
  }
}

/**
 * Problem 28: Diameter of Binary Tree
 * Find the diameter (longest path) of binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Tree diameter
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [1,2,3,4,5]
 * Output: 3
 */
function diameterOfBinaryTree(root) {
  // Your implementation here
}

/**
 * Problem 29: Recover Binary Search Tree
 * Recover BST with two swapped nodes.
 *
 * @param {TreeNode} root - Root of BST with swapped nodes
 * @return {void} Modify tree in-place
 *
 * Expected Time: O(n)
 * Expected Space: O(1) extra space
 *
 * Example:
 * Input: [1,3,null,null,2]
 * Output: [3,1,null,null,2]
 */
function recoverTree(root) {
  // Your implementation here
}

/**
 * Problem 30: Unique Binary Search Trees
 * Count unique BSTs with n nodes.
 *
 * @param {number} n - Number of nodes
 * @return {number} Number of unique BSTs
 *
 * Expected Time: O(n^2)
 * Expected Space: O(n)
 *
 * Example:
 * Input: 3
 * Output: 5
 */
function numTrees(n) {
  // Your implementation here
}

/**
 * Problem 31: Unique Binary Search Trees II
 * Generate all unique BSTs with n nodes.
 *
 * @param {number} n - Number of nodes
 * @return {TreeNode[]} All unique BSTs
 *
 * Expected Time: O(4^n / sqrt(n))
 * Expected Space: O(4^n / sqrt(n))
 *
 * Example:
 * Input: 3
 * Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
 */
function generateTrees(n) {
  // Your implementation here
}

/**
 * Problem 32: Binary Tree Postorder Traversal
 * Postorder traversal without recursion.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number[]} Postorder traversal
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: [1,null,2,3]
 * Output: [3,2,1]
 */
function postorderTraversal(root) {
  // Your implementation here
}

/**
 * Problem 33: Construct Binary Tree from Inorder and Postorder Traversal
 * Build binary tree from inorder and postorder traversals.
 *
 * @param {number[]} inorder - Inorder traversal
 * @param {number[]} postorder - Postorder traversal
 * @return {TreeNode} Root of binary tree
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
 * Problem 34: Convert Binary Search Tree to Sorted Doubly Linked List
 * Convert BST to sorted doubly linked list.
 *
 * @param {TreeNode} root - Root of BST
 * @return {Node} Head of doubly linked list
 *
 * Expected Time: O(n)
 * Expected Space: O(h)
 *
 * Example:
 * Input: [4,2,5,1,3]
 * Output: [1,2,3,4,5]
 */
function treeToDoublyList(root) {
  // Your implementation here
}

/**
 * Problem 35: Word Ladder II
 * Find all shortest transformation sequences.
 *
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - Word dictionary
 * @return {string[][]} All shortest sequences
 *
 * Expected Time: O(n * m^2)
 * Expected Space: O(n * m^2)
 *
 * Example:
 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
 */
function findLadders(beginWord, endWord, wordList) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Implement Trie (Prefix Tree)
 * Implement trie with insert, search, and startsWith.
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
 * Bonus 2: Design Add and Search Words Data Structure
 * Design data structure to add words and search with '.' wildcard.
 */
class WordDictionary {
  constructor() {
    // Your implementation here
  }

  addWord(word) {
    // Your implementation here
  }

  search(word) {
    // Your implementation here
  }
}

/**
 * Bonus 3: Find Duplicate Subtrees
 * Find all duplicate subtrees in binary tree.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode[]} Array of duplicate subtree roots
 *
 * Example:
 * Input: [1,2,3,4,null,2,4,null,null,4]
 * Output: [[2,4],[4]]
 */
function findDuplicateSubtrees(root) {
  // Your implementation here
}

/**
 * Bonus 4: All Nodes Distance K in Binary Tree
 * Find all nodes at distance K from target node.
 *
 * @param {TreeNode} root - Root of binary tree
 * @param {TreeNode} target - Target node
 * @param {number} k - Distance
 * @return {number[]} Nodes at distance k
 *
 * Example:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
 * Output: [7,4,1]
 */
function distanceK(root, target, k) {
  // Your implementation here
}

/**
 * Bonus 5: Binary Tree Cameras
 * Place minimum cameras to monitor all nodes.
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} Minimum cameras needed
 *
 * Example:
 * Input: [0,0,null,0,0]
 * Output: 1
 */
function minCameraCover(root) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

// Helper function to create binary tree from array
function createBinaryTree(arr) {
  if (!arr || arr.length === 0) return null;

  const nodes = arr.map((val) => (val === null ? null : new TreeNode(val)));
  const queue = [];
  let index = 0;

  queue.push(nodes[index++]);

  while (queue.length > 0 && index < arr.length) {
    const node = queue.shift();

    if (node && index < arr.length) {
      node.left = nodes[index++];
      if (node.left) queue.push(node.left);
    }

    if (node && index < arr.length) {
      node.right = nodes[index++];
      if (node.right) queue.push(node.right);
    }
  }

  return nodes[0];
}

// Helper function to convert tree to array (level order)
function treeToArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
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

function runTests() {
  console.log("🧪 Running Tree Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test max depth
  console.log("Example - Max Depth:");
  const tree1 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
  console.log("Input: [3,9,20,null,null,15,7]");
  console.log("Expected: 3");
  console.log("Your result:", maxDepth(tree1));

  // Test same tree
  console.log("\nExample - Same Tree:");
  const tree2 = createBinaryTree([1, 2, 3]);
  const tree3 = createBinaryTree([1, 2, 3]);
  console.log("Input: [1,2,3], [1,2,3]");
  console.log("Expected: true");
  console.log("Your result:", isSameTree(tree2, tree3));

  // Test invert tree
  console.log("\nExample - Invert Tree:");
  const tree4 = createBinaryTree([4, 2, 7, 1, 3, 6, 9]);
  console.log("Input: [4,2,7,1,3,6,9]");
  console.log("Expected: [4,7,2,9,6,3,1]");
  const inverted = invertTree(tree4);
  console.log("Your result:", treeToArray(inverted));

  // Test symmetric tree
  console.log("\nExample - Symmetric Tree:");
  const tree5 = createBinaryTree([1, 2, 2, 3, 4, 4, 3]);
  console.log("Input: [1,2,2,3,4,4,3]");
  console.log("Expected: true");
  console.log("Your result:", isSymmetric(tree5));

  // Test sorted array to BST
  console.log("\nExample - Sorted Array to BST:");
  console.log("Input: [-10,-3,0,5,9]");
  console.log("Expected: [0,-3,9,-10,null,5]");
  const bst = sortedArrayToBST([-10, -3, 0, 5, 9]);
  console.log("Your result:", treeToArray(bst));

  // Test level order
  console.log("\nExample - Level Order:");
  const tree6 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
  console.log("Input: [3,9,20,null,null,15,7]");
  console.log("Expected: [[3],[9,20],[15,7]]");
  console.log("Your result:", levelOrder(tree6));

  // Test right side view
  console.log("\nExample - Right Side View:");
  const tree7 = createBinaryTree([1, 2, 3, null, 5, null, 4]);
  console.log("Input: [1,2,3,null,5,null,4]");
  console.log("Expected: [1,3,4]");
  console.log("Your result:", rightSideView(tree7));

  // Test kth smallest
  console.log("\nExample - Kth Smallest:");
  const tree8 = createBinaryTree([3, 1, 4, null, 2]);
  console.log("Input: root = [3,1,4,null,2], k = 1");
  console.log("Expected: 1");
  console.log("Your result:", kthSmallest(tree8, 1));

  // Test max path sum
  console.log("\nExample - Max Path Sum:");
  const tree9 = createBinaryTree([-10, 9, 20, null, null, 15, 7]);
  console.log("Input: [-10,9,20,null,null,15,7]");
  console.log("Expected: 42");
  console.log("Your result:", maxPathSum(tree9));

  // Test diameter
  console.log("\nExample - Diameter:");
  const tree10 = createBinaryTree([1, 2, 3, 4, 5]);
  console.log("Input: [1,2,3,4,5]");
  console.log("Expected: 3");
  console.log("Your result:", diameterOfBinaryTree(tree10));

  console.log("\n🎯 Implement all functions and test them!");
  console.log(
    "💡 Focus on understanding tree traversals and recursive patterns"
  );
  console.log("🚀 Move to medium problems when comfortable with easy ones");

  console.log("\n✅ Testing framework ready!");
}

// Helper function to test your solutions
function testFunction(funcName, testCases) {
  console.log(`\n🧮 Testing ${funcName}:`);

  for (let i = 0; i < testCases.length; i++) {
    const { input, expected } = testCases[i];
    const result = eval(
      `${funcName}(${input
        .map((arg) =>
          Array.isArray(arg)
            ? `createBinaryTree(${JSON.stringify(arg)})`
            : JSON.stringify(arg)
        )
        .join(", ")})`
    );

    const actual = Array.isArray(result) ? result : result;
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`Test ${i + 1}: ${passed ? "✅" : "❌"}`);
    if (!passed) {
      console.log(`  Input: ${JSON.stringify(input)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got: ${JSON.stringify(actual)}`);
    }
  }
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  maxDepth,
  isSameTree,
  invertTree,
  isSymmetric,
  sortedArrayToBST,
  minDepth,
  hasPathSum,
  sumOfLeftLeaves,
  findMode,
  averageOfLevels,
  isValidBST,
  lowestCommonAncestor,
  levelOrder,
  rightSideView,
  kthSmallest,
  buildTree,
  connect,
  flatten,
  pathSum,
  countNodes,
  zigzagLevelOrder,
  largestValues,
  deleteNode,
  insertIntoBST,
  searchBST,
  maxPathSum,
  Codec,
  diameterOfBinaryTree,
  recoverTree,
  numTrees,
  generateTrees,
  postorderTraversal,
  buildTree2,
  treeToDoublyList,
  findLadders,
  Trie,
  WordDictionary,
  findDuplicateSubtrees,
  distanceK,
  minCameraCover,
  createBinaryTree,
  treeToArray,
  testFunction,
};
