// 🔍 Backtracking Practice Problems
// Implement these functions to master backtracking algorithms

// ==========================================
// EASY PROBLEMS (O(2^n) or O(n!))
// ==========================================

/**
 * Problem 1: Subsets
 * Generate all subsets (power set) of given array.
 *
 * @param {number[]} nums - Input array
 * @return {number[][]} All subsets
 *
 * Expected Time: O(2^n * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
function subsets(nums) {
  // Your implementation here
}

/**
 * Problem 2: Letter Case Permutation
 * Generate all letter case permutations of string.
 *
 * @param {string} s - Input string
 * @return {string[]} All case permutations
 *
 * Expected Time: O(2^k * n) where k is number of letters
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "a1b2"
 * Output: ["a1b2","a1B2","A1b2","A1B2"]
 */
function letterCasePermutation(s) {
  // Your implementation here
}

/**
 * Problem 3: Combination Sum
 * Find combinations that sum to target (unlimited usage).
 *
 * @param {number[]} candidates - Candidate numbers
 * @param {number} target - Target sum
 * @return {number[][]} All combinations
 *
 * Expected Time: O(n^(target/min))
 * Expected Space: O(target/min)
 *
 * Example:
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 */
function combinationSum(candidates, target) {
  // Your implementation here
}

/**
 * Problem 4: Permutations
 * Generate all permutations of array elements.
 *
 * @param {number[]} nums - Input array
 * @return {number[][]} All permutations
 *
 * Expected Time: O(n! * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
function permute(nums) {
  // Your implementation here
}

/**
 * Problem 5: Binary Watch
 * All possible times the binary watch could represent.
 *
 * @param {number} turnedOn - Number of LEDs turned on
 * @return {string[]} All possible times
 *
 * Expected Time: O(1) - constant time (max 12 possibilities)
 * Expected Space: O(1)
 *
 * Example:
 * Input: turnedOn = 1
 * Output: ["1:00","2:00","4:00","8:00","0:01","0:02","0:04","0:08","0:16","0:32"]
 */
function readBinaryWatch(turnedOn) {
  // Your implementation here
}

/**
 * Problem 6: Letter Tile Possibilities
 * All possible sequences of letters from tiles.
 *
 * @param {string} tiles - String of tiles
 * @return {number} Number of possible sequences
 *
 * Expected Time: O(n! * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: tiles = "AAB"
 * Output: 8
 */
function numTilePossibilities(tiles) {
  // Your implementation here
}

/**
 * Problem 7: Subsets II
 * Generate all subsets with duplicate elements.
 *
 * @param {number[]} nums - Input array with duplicates
 * @return {number[][]} All unique subsets
 *
 * Expected Time: O(2^n * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 */
function subsetsWithDup(nums) {
  // Your implementation here
}

/**
 * Problem 8: Permutations II
 * Generate unique permutations with duplicate elements.
 *
 * @param {number[]} nums - Input array with duplicates
 * @return {number[][]} All unique permutations
 *
 * Expected Time: O(n! * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,1,2]
 * Output: [[1,1,2],[1,2,1],[2,1,1]]
 */
function permuteUnique(nums) {
  // Your implementation here
}

/**
 * Problem 9: Combination Sum II
 * Find combinations that sum to target (each element used once).
 *
 * @param {number[]} candidates - Candidate numbers with duplicates
 * @param {number} target - Target sum
 * @return {number[][]} All unique combinations
 *
 * Expected Time: O(2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
 */
function combinationSum2(candidates, target) {
  // Your implementation here
}

/**
 * Problem 10: Generate Parentheses
 * Generate all combinations of well-formed parentheses.
 *
 * @param {number} n - Number of pairs
 * @return {string[]} All valid parentheses combinations
 *
 * Expected Time: O(C_n) where C_n is nth Catalan number
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 */
function generateParenthesis(n) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Combination Sum III
 * Find combinations of k numbers that sum to n (1-9).
 *
 * @param {number} k - Number of elements
 * @param {number} n - Target sum
 * @return {number[][]} All valid combinations
 *
 * Expected Time: O(C(9,k))
 * Expected Space: O(k)
 *
 * Example:
 * Input: k = 3, n = 7
 * Output: [[1,2,4]]
 */
function combinationSum3(k, n) {
  // Your implementation here
}

/**
 * Problem 12: Palindrome Partitioning
 * Partition string into palindromic substrings.
 *
 * @param {string} s - Input string
 * @return {string[][]} All palindrome partitions
 *
 * Expected Time: O(n * 2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 */
function partition(s) {
  // Your implementation here
}

/**
 * Problem 13: Restore IP Addresses
 * Restore possible IP addresses from string.
 *
 * @param {string} s - Input string
 * @return {string[]} All valid IP addresses
 *
 * Expected Time: O(n^3)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "25525511135"
 * Output: ["255.255.11.135","255.255.111.35"]
 */
function restoreIpAddresses(s) {
  // Your implementation here
}

/**
 * Problem 14: N-Queens
 * Place N queens on N×N chessboard.
 *
 * @param {number} n - Board size
 * @return {string[][]} All distinct solutions
 *
 * Expected Time: O(N!)
 * Expected Space: O(N)
 *
 * Example:
 * Input: n = 4
 * Output: 2 solutions
 */
function solveNQueens(n) {
  // Your implementation here
}

/**
 * Problem 15: Word Search
 * Find if word exists in grid.
 *
 * @param {character[][]} board - Game board
 * @param {string} word - Target word
 * @return {boolean} True if word exists
 *
 * Expected Time: O(m * n * 4^L) where L is word length
 * Expected Space: O(L)
 *
 * Example:
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * Output: true
 */
function exist(board, word) {
  // Your implementation here
}

/**
 * Problem 16: Combinations
 * Generate all combinations of k numbers from 1 to n.
 *
 * @param {number} n - Range end
 * @param {number} k - Combination size
 * @return {number[][]} All combinations
 *
 * Expected Time: O(C(n,k) * k)
 * Expected Space: O(k)
 *
 * Example:
 * Input: n = 4, k = 2
 * Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
 */
function combine(n, k) {
  // Your implementation here
}

/**
 * Problem 17: Subsets II
 * Generate all subsets of array with duplicates.
 *
 * @param {number[]} nums - Input array with duplicates
 * @return {number[][]} All unique subsets
 *
 * Expected Time: O(2^n * n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 */
function subsetsWithDup(nums) {
  // Your implementation here
}

/**
 * Problem 18: Beautiful Arrangement
 * Count beautiful arrangements where nums[i] % i == 0 or i % nums[i] == 0.
 *
 * @param {number} n - Number of positions
 * @return {number} Number of beautiful arrangements
 *
 * Expected Time: O(n!)
 * Expected Space: O(n)
 *
 * Example:
 * Input: n = 2
 * Output: 2
 */
function countArrangement(n) {
  // Your implementation here
}

/**
 * Problem 19: Split String into Maximum Number of Unique Substrings
 * Split string into maximum number of unique substrings.
 *
 * @param {string} s - Input string
 * @return {number} Maximum number of unique substrings
 *
 * Expected Time: O(2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "abababa"
 * Output: 3
 */
function maxUniqueSplit(s) {
  // Your implementation here
}

/**
 * Problem 20: Number of Squareful Permutations
 * Count permutations where adjacent sum is perfect square.
 *
 * @param {number[]} nums - Input array
 * @return {number} Number of squareful permutations
 *
 * Expected Time: O(n!)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,17,8]
 * Output: 2
 */
function numSquarefulPerms(nums) {
  // Your implementation here
}

/**
 * Problem 21: Letter Case Permutation II
 * Generate all possible strings by toggling case of each letter.
 *
 * @param {string} s - Input string
 * @return {string[]} All possible strings
 *
 * Expected Time: O(2^k * n) where k is number of letters
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "a1b2"
 * Output: ["a1b2","a1B2","A1b2","A1B2"]
 */
function letterCasePermutation(s) {
  // Your implementation here
}

/**
 * Problem 22: Distribute Candies
 * Distribute candies equally among siblings.
 *
 * @param {number[]} candies - Candy types
 * @return {number} Maximum number of different candies
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: candies = [1,1,2,2,3,3]
 * Output: 3
 */
function distributeCandies(candies) {
  // Your implementation here
}

/**
 * Problem 23: Find All Numbers Disappeared in an Array
 * Find numbers that disappeared from array.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} Missing numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(1) extra space
 *
 * Example:
 * Input: nums = [4,3,2,7,8,2,3,1]
 * Output: [5,6]
 */
function findDisappearedNumbers(nums) {
  // Your implementation here
}

/**
 * Problem 24: Find All Duplicates in an Array
 * Find all duplicate elements in array.
 *
 * @param {number[]} nums - Input array
 * @return {number[]} All duplicate numbers
 *
 * Expected Time: O(n)
 * Expected Space: O(1) extra space
 *
 * Example:
 * Input: nums = [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 */
function findDuplicates(nums) {
  // Your implementation here
}

/**
 * Problem 25: Array Nesting
 * Find largest set formed by array nesting.
 *
 * @param {number[]} nums - Input array
 * @return {number} Size of largest set
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [5,4,0,3,1,6,2]
 * Output: 4
 */
function arrayNesting(nums) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Word Search II
 * Find all words in grid using Trie optimization.
 *
 * @param {character[][]} board - Game board
 * @param {string[]} words - List of words
 * @return {string[]} All found words
 *
 * Expected Time: O(m * n * 4^L) but heavily pruned
 * Expected Space: O(total word length)
 *
 * Example:
 * Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * Output: ["oath","eat"]
 */
function findWords(board, words) {
  // Your implementation here
}

/**
 * Problem 27: Sudoku Solver
 * Solve Sudoku puzzle.
 *
 * @param {character[][]} board - Sudoku board
 * @return {void} Modify board in-place
 *
 * Expected Time: O(9^(81)) worst case
 * Expected Space: O(81)
 *
 * Example:
 * Input: board with some cells filled
 * Output: solved board
 */
function solveSudoku(board) {
  // Your implementation here
}

/**
 * Problem 28: N-Queens II
 * Count distinct solutions to N-Queens.
 *
 * @param {number} n - Board size
 * @return {number} Number of distinct solutions
 *
 * Expected Time: O(N!)
 * Expected Space: O(N)
 *
 * Example:
 * Input: n = 4
 * Output: 2
 */
function totalNQueens(n) {
  // Your implementation here
}

/**
 * Problem 29: Word Break II
 * Return all possible sentences from word break.
 *
 * @param {string} s - Input string
 * @param {string[]} wordDict - Word dictionary
 * @return {string[]} All possible sentences
 *
 * Expected Time: O(n^3 + number of sentences * average length)
 * Expected Space: O(n^2)
 *
 * Example:
 * Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 * Output: ["cat sand dog","cats and dog"]
 */
function wordBreak(s, wordDict) {
  // Your implementation here
}

/**
 * Problem 30: Remove Invalid Parentheses
 * Remove minimum parentheses to make valid.
 *
 * @param {string} s - Input string
 * @return {string[]} All possible results
 *
 * Expected Time: O(n * 2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: s = "()())()"
 * Output: ["()()()", "(())()"]
 */
function removeInvalidParentheses(s) {
  // Your implementation here
}

/**
 * Problem 31: Split Array into Fibonacci Sequence
 * Split array into Fibonacci sequence.
 *
 * @param {string} num - Input string
 * @return {number[]} All possible Fibonacci sequences
 *
 * Expected Time: O(n * 2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: num = "123456579"
 * Output: [123,456,579]
 */
function splitIntoFibonacci(num) {
  // Your implementation here
}

/**
 * Problem 32: Reconstruct Itinerary
 * Reconstruct itinerary from tickets.
 *
 * @param {string[][]} tickets - List of tickets
 * @return {string[]} Reconstructed itinerary
 *
 * Expected Time: O(n!)
 * Expected Space: O(n)
 *
 * Example:
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 */
function findItinerary(tickets) {
  // Your implementation here
}

/**
 * Problem 33: Matchsticks to Square
 * Can matchsticks form a square.
 *
 * @param {number[]} matchsticks - Array of matchstick lengths
 * @return {boolean} True if square can be formed
 *
 * Expected Time: O(4^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: matchsticks = [1,1,2,2,2]
 * Output: true
 */
function makesquare(matchsticks) {
  // Your implementation here
}

/**
 * Problem 34: Partition to K Equal Sum Subsets
 * Partition array into k subsets with equal sum.
 *
 * @param {number[]} nums - Input array
 * @param {number} k - Number of subsets
 * @return {boolean} True if partition possible
 *
 * Expected Time: O(k * 2^n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [4,3,2,3,5,2,1], k = 4
 * Output: true
 */
function canPartitionKSubsets(nums, k) {
  // Your implementation here
}

/**
 * Problem 35: Palindrome Partitioning II
 * Minimum cuts to partition string into palindromes.
 *
 * @param {string} s - Input string
 * @return {number} Minimum cuts
 *
 * Expected Time: O(n^2)
 * Expected Space: O(n^2)
 *
 * Example:
 * Input: s = "aab"
 * Output: 1
 */
function minCut(s) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Knight's Tour
 * Find complete knight's tour on chessboard.
 */
function knightsTour(n, m) {
  // Your implementation here
}

/**
 * Bonus 2: Hamiltonian Path
 * Find Hamiltonian path in graph.
 */
function hamiltonianPath(graph) {
  // Your implementation here
}

/**
 * Bonus 3: Latin Square
 * Generate Latin square of size n.
 */
function latinSquare(n) {
  // Your implementation here
}

/**
 * Bonus 4: Magic Square
 * Generate magic square of odd size.
 */
function magicSquare(n) {
  // Your implementation here
}

/**
 * Bonus 5: Graph Coloring
 * Color graph with minimum colors.
 */
function graphColoring(graph, colors) {
  // Your implementation here
}

/**
 * Bonus 6: Cryptarithmetic Puzzle
 * Solve cryptarithmetic puzzles like SEND + MORE = MONEY.
 */
function solveCryptarithmetic(puzzle) {
  // Your implementation here
}

/**
 * Bonus 7: Eight Queens Problem
 * Extended version with additional constraints.
 */
function eightQueens(constraints) {
  // Your implementation here
}

/**
 * Bonus 8: Maze Solving
 * Find all paths in maze from start to end.
 */
function solveMaze(maze, start, end) {
  // Your implementation here
}

/**
 * Bonus 9: Kakuro Solver
 * Solve Kakuro puzzles.
 */
function solveKakuro(puzzle) {
  // Your implementation here
}

/**
 * Bonus 10: Fillomino Solver
 * Solve Fillomino puzzles.
 */
function solveFillomino(board) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Backtracking Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test subsets
  console.log("Example - Subsets:");
  console.log("Input: nums = [1,2,3]");
  console.log("Expected: 8 subsets");
  console.log("Your result:", subsets([1, 2, 3]).length);

  // Test letter case permutation
  console.log("\nExample - Letter Case Permutation:");
  console.log('Input: s = "a1b2"');
  console.log("Expected: 4 permutations");
  console.log("Your result:", letterCasePermutation("a1b2").length);

  // Test combination sum
  console.log("\nExample - Combination Sum:");
  console.log("Input: candidates = [2,3,6,7], target = 7");
  console.log("Expected: 2 solutions");
  console.log("Your result:", combinationSum([2, 3, 6, 7], 7).length);

  // Test permutations
  console.log("\nExample - Permutations:");
  console.log("Input: nums = [1,2,3]");
  console.log("Expected: 6 permutations");
  console.log("Your result:", permute([1, 2, 3]).length);

  // Test binary watch
  console.log("\nExample - Binary Watch:");
  console.log("Input: turnedOn = 1");
  console.log("Expected: 10 times");
  console.log("Your result:", readBinaryWatch(1).length);

  // Test letter tile possibilities
  console.log("\nExample - Letter Tile Possibilities:");
  console.log('Input: tiles = "AAB"');
  console.log("Expected: 8 possibilities");
  console.log("Your result:", numTilePossibilities("AAB"));

  // Test subsets with duplicates
  console.log("\nExample - Subsets II:");
  console.log("Input: nums = [1,2,2]");
  console.log("Expected: 6 unique subsets");
  console.log("Your result:", subsetsWithDup([1, 2, 2]).length);

  // Test unique permutations
  console.log("\nExample - Permutations II:");
  console.log("Input: nums = [1,1,2]");
  console.log("Expected: 3 unique permutations");
  console.log("Your result:", permuteUnique([1, 1, 2]).length);

  // Test combination sum II
  console.log("\nExample - Combination Sum II:");
  console.log("Input: candidates = [10,1,2,7,6,1,5], target = 8");
  console.log("Expected: 4 combinations");
  console.log(
    "Your result:",
    combinationSum2([10, 1, 2, 7, 6, 1, 5], 8).length
  );

  // Test generate parentheses
  console.log("\nExample - Generate Parentheses:");
  console.log("Input: n = 3");
  console.log("Expected: 5 combinations");
  console.log("Your result:", generateParenthesis(3).length);

  // Test combination sum III
  console.log("\nExample - Combination Sum III:");
  console.log("Input: k = 3, n = 7");
  console.log("Expected: 1 combination");
  console.log("Your result:", combinationSum3(3, 7).length);

  // Test palindrome partitioning
  console.log("\nExample - Palindrome Partitioning:");
  console.log('Input: s = "aab"');
  console.log("Expected: 2 partitions");
  console.log("Your result:", partition("aab").length);

  // Test restore IP addresses
  console.log("\nExample - Restore IP Addresses:");
  console.log('Input: s = "25525511135"');
  console.log("Expected: 2 IP addresses");
  console.log("Your result:", restoreIpAddresses("25525511135").length);

  // Test N-Queens
  console.log("\nExample - N-Queens:");
  console.log("Input: n = 4");
  console.log("Expected: 2 solutions");
  console.log("Your result:", solveNQueens(4).length);

  // Test word search
  console.log("\nExample - Word Search:");
  const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  console.log('Input: board, word = "ABCCED"');
  console.log("Expected: true");
  console.log("Your result:", exist(board, "ABCCED"));

  // Test combinations
  console.log("\nExample - Combinations:");
  console.log("Input: n = 4, k = 2");
  console.log("Expected: 6 combinations");
  console.log("Your result:", combine(4, 2).length);

  // Test beautiful arrangement
  console.log("\nExample - Beautiful Arrangement:");
  console.log("Input: n = 2");
  console.log("Expected: 2 arrangements");
  console.log("Your result:", countArrangement(2));

  // Test max unique split
  console.log("\nExample - Max Unique Split:");
  console.log('Input: s = "abababa"');
  console.log("Expected: 3");
  console.log("Your result:", maxUniqueSplit("abababa"));

  // Test squareful permutations
  console.log("\nExample - Squareful Permutations:");
  console.log("Input: nums = [1,17,8]");
  console.log("Expected: 2 permutations");
  console.log("Your result:", numSquarefulPerms([1, 17, 8]));

  // Test distribute candies
  console.log("\nExample - Distribute Candies:");
  console.log("Input: candies = [1,1,2,2,3,3]");
  console.log("Expected: 3");
  console.log("Your result:", distributeCandies([1, 1, 2, 2, 3, 3]));

  // Test find disappeared numbers
  console.log("\nExample - Find Disappeared Numbers:");
  console.log("Input: nums = [4,3,2,7,8,2,3,1]");
  console.log("Expected: [5,6]");
  console.log("Your result:", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));

  // Test find duplicates
  console.log("\nExample - Find Duplicates:");
  console.log("Input: nums = [4,3,2,7,8,2,3,1]");
  console.log("Expected: [2,3]");
  console.log("Your result:", findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));

  // Test array nesting
  console.log("\nExample - Array Nesting:");
  console.log("Input: nums = [5,4,0,3,1,6,2]");
  console.log("Expected: 4");
  console.log("Your result:", arrayNesting([5, 4, 0, 3, 1, 6, 2]));

  // Test word search II
  console.log("\nExample - Word Search II:");
  const board2 = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"],
  ];
  console.log('Input: board, words = ["oath","pea","eat","rain"]');
  console.log('Expected: ["oath","eat"]');
  console.log(
    "Your result:",
    findWords(board2, ["oath", "pea", "eat", "rain"]).length
  );

  // Test N-Queens II
  console.log("\nExample - N-Queens II:");
  console.log("Input: n = 4");
  console.log("Expected: 2");
  console.log("Your result:", totalNQueens(4));

  // Test word break II
  console.log("\nExample - Word Break II:");
  console.log(
    'Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]'
  );
  console.log("Expected: 2 sentences");
  console.log(
    "Your result:",
    wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]).length
  );

  // Test remove invalid parentheses
  console.log("\nExample - Remove Invalid Parentheses:");
  console.log('Input: s = "()())()"');
  console.log("Expected: 2 results");
  console.log("Your result:", removeInvalidParentheses("()())()").length);

  // Test split into Fibonacci
  console.log("\nExample - Split into Fibonacci:");
  console.log('Input: num = "123456579"');
  console.log("Expected: [123,456,579]");
  console.log("Your result:", JSON.stringify(splitIntoFibonacci("123456579")));

  // Test reconstruct itinerary
  console.log("\nExample - Reconstruct Itinerary:");
  console.log(
    'Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]'
  );
  console.log('Expected: ["JFK","MUC","LHR","SFO","SJC"]');
  console.log(
    "Your result:",
    JSON.stringify(
      findItinerary([
        ["MUC", "LHR"],
        ["JFK", "MUC"],
        ["SFO", "SJC"],
        ["LHR", "SFO"],
      ])
    )
  );

  // Test matchsticks to square
  console.log("\nExample - Matchsticks to Square:");
  console.log("Input: matchsticks = [1,1,2,2,2]");
  console.log("Expected: true");
  console.log("Your result:", makesquare([1, 1, 2, 2, 2]));

  // Test partition to k subsets
  console.log("\nExample - Partition to K Subsets:");
  console.log("Input: nums = [4,3,2,3,5,2,1], k = 4");
  console.log("Expected: true");
  console.log("Your result:", canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4));

  // Test min cut
  console.log("\nExample - Min Cut:");
  console.log('Input: s = "aab"');
  console.log("Expected: 1");
  console.log("Your result:", minCut("aab"));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding backtracking patterns");
  console.log("🚀 Move to medium problems when comfortable with easy ones");

  console.log("\n✅ Testing framework ready!");
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

// Backtracking pattern detector
function detectBacktrackingPattern(problem) {
  const patterns = {
    permutation: ["permutation", "arrange", "order", "sequence"],
    combination: ["combination", "choose", "select", "subset"],
    subset: ["subset", "power set", "all subsets"],
    string: ["string", "word", "text", "palindrome"],
    grid: ["grid", "board", "matrix", "chess"],
    partition: ["partition", "split", "divide"],
    search: ["search", "find", "exist", "locate"],
  };

  const problemStr = problem.toLowerCase();

  for (const [pattern, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (problemStr.includes(keyword)) {
        return pattern;
      }
    }
  }

  return "unknown";
}

// Backtracking state visualizer
function visualizeBacktracking(func, ...args) {
  const states = [];

  // Monkey patch to capture states
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    states.push({
      timestamp: performance.now(),
      message: args.join(" "),
      depth: states.length,
    });
    originalConsoleLog(...args);
  };

  const result = func(...args);

  // Restore original console.log
  console.log = originalConsoleLog;

  return {
    result,
    states,
    totalStates: states.length,
    maxDepth: Math.max(...states.map((s) => s.depth)),
  };
}

// Complexity analyzer for backtracking
function analyzeBacktrackingComplexity(func, args) {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();

  return {
    result,
    time: end - start,
    memory: process.memoryUsage().heapUsed,
    backtrackingComplexity: estimateBacktrackingComplexity(args),
  };
}

function estimateBacktrackingComplexity(args) {
  const sizes = args.map((arg) =>
    Array.isArray(arg)
      ? arg.length
      : typeof arg === "object"
      ? Object.keys(arg).length
      : 1
  );

  const max = Math.max(...sizes);
  // Most backtracking algorithms are exponential or factorial
  if (sizes.length === 1) return `O(${max}!)`;
  return `O(2^${max})`; // Simplified estimation
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  subsets,
  letterCasePermutation,
  combinationSum,
  permute,
  readBinaryWatch,
  numTilePossibilities,
  subsetsWithDup,
  permuteUnique,
  combinationSum2,
  generateParenthesis,

  // Medium problems
  combinationSum3,
  partition,
  restoreIpAddresses,
  solveNQueens,
  exist,
  combine,
  countArrangement,
  maxUniqueSplit,
  numSquarefulPerms,
  distributeCandies,
  findDisappearedNumbers,
  findDuplicates,
  arrayNesting,

  // Hard problems
  findWords,
  solveSudoku,
  totalNQueens,
  wordBreak,
  removeInvalidParentheses,
  splitIntoFibonacci,
  findItinerary,
  makesquare,
  canPartitionKSubsets,
  minCut,

  // Bonus challenges
  knightsTour,
  hamiltonianPath,
  latinSquare,
  magicSquare,
  graphColoring,
  solveCryptarithmetic,
  eightQueens,
  solveMaze,
  solveKakuro,
  solveFillomino,

  // Utilities
  testFunction,
  detectBacktrackingPattern,
  visualizeBacktracking,
  analyzeBacktrackingComplexity,
};
