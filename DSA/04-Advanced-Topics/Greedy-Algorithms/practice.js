// 🎯 Greedy Algorithms Practice Problems
// Implement these functions to master greedy algorithms

// ==========================================
// EASY PROBLEMS (O(n log n) or O(n))
// ==========================================

/**
 * Problem 1: Assign Cookies
 * Assign cookies to children to maximize satisfied children.
 *
 * @param {number[]} g - Greed factors of children
 * @param {number[]} s - Sizes of cookies
 * @return {number} Maximum number of satisfied children
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: g = [1,2,3], s = [1,1]
 * Output: 1
 */
function findContentChildren(g, s) {
  // Your implementation here
}

/**
 * Problem 2: Maximum Number of Balloons
 * Maximum number of instances of "balloon" that can be formed.
 *
 * @param {string} text - Input string
 * @return {number} Maximum number of "balloon" instances
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: text = "nlaebolko"
 * Output: 1
 */
function maxNumberOfBalloons(text) {
  // Your implementation here
}

/**
 * Problem 3: Can Place Flowers
 * Can n flowers be placed without violating no-adjacent rule.
 *
 * @param {number[]} flowerbed - Array of flower positions
 * @param {number} n - Number of flowers to place
 * @return {boolean} True if n flowers can be placed
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: flowerbed = [1,0,0,0,1], n = 1
 * Output: true
 */
function canPlaceFlowers(flowerbed, n) {
  // Your implementation here
}

/**
 * Problem 4: Goat Latin
 * Convert sentence to Goat Latin.
 *
 * @param {string} sentence - Input sentence
 * @return {string} Goat Latin sentence
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: sentence = "I speak Goat Latin"
 * Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
 */
function toGoatLatin(sentence) {
  // Your implementation here
}

/**
 * Problem 5: Largest Perimeter Triangle
 * Largest perimeter of triangle with non-zero area.
 *
 * @param {number[]} sticks - Array of stick lengths
 * @return {number} Largest perimeter, 0 if no triangle possible
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: sticks = [2,1,2]
 * Output: 5
 */
function largestPerimeter(sticks) {
  // Your implementation here
}

/**
 * Problem 6: Check if Array Is Sorted and Rotated
 * Check if array is sorted and rotated.
 *
 * @param {number[]} nums - Input array
 * @return {boolean} True if sorted and rotated
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [3,4,5,1,2]
 * Output: true
 */
function check(nums) {
  // Your implementation here
}

/**
 * Problem 7: Split Array in Consecutive Subsequences
 * Split array into consecutive subsequences.
 *
 * @param {number[]} nums - Sorted array
 * @return {boolean} True if possible to split
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [1,2,3,3,4,5]
 * Output: true
 */
function isPossible(nums) {
  // Your implementation here
}

/**
 * Problem 8: Partition Array Into Three Parts With Equal Sum
 * Can array be partitioned into three parts with equal sum.
 *
 * @param {number[]} arr - Input array
 * @return {boolean} True if partition possible
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
 * Output: false
 */
function canThreePartsEqualSum(arr) {
  // Your implementation here
}

/**
 * Problem 9: Boats to Save People
 * Minimum number of boats to carry people.
 *
 * @param {number[]} people - Array of people weights
 * @param {number} limit - Boat weight limit
 * @return {number} Minimum number of boats
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: people = [1,2], limit = 3
 * Output: 1
 */
function numRescueBoats(people, limit) {
  // Your implementation here
}

/**
 * Problem 10: Maximum Units on a Truck
 * Maximum number of units that can be put on the truck.
 *
 * @param {number[][]} boxTypes - Array of [numberOfBoxes, numberOfUnitsPerBox]
 * @param {number} truckSize - Maximum number of boxes
 * @return {number} Maximum units that can be shipped
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
 * Output: 8
 */
function maximumUnits(boxTypes, truckSize) {
  // Your implementation here
}

// ==========================================
// MEDIUM PROBLEMS
// ==========================================

/**
 * Problem 11: Gas Station
 * Find starting gas station to complete circuit.
 *
 * @param {number[]} gas - Gas available at each station
 * @param {number[]} cost - Cost to travel to next station
 * @return {number} Starting station index, -1 if impossible
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * Output: 3
 */
function canCompleteCircuit(gas, cost) {
  // Your implementation here
}

/**
 * Problem 12: Candy
 * Minimum candies to distribute with ratings constraints.
 *
 * @param {number[]} ratings - Array of ratings
 * @return {number} Minimum total candies
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: ratings = [1,0,2]
 * Output: 5
 */
function candy(ratings) {
  // Your implementation here
}

/**
 * Problem 13: Jump Game II
 * Minimum number of jumps to reach end of array.
 *
 * @param {number[]} nums - Jump lengths at each position
 * @return {number} Minimum number of jumps
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 */
function jump(nums) {
  // Your implementation here
}

/**
 * Problem 14: Reconstruct Queue
 * Reconstruct queue from height and k-values.
 *
 * @param {number[][]} people - Array of [height, k] pairs
 * @return {number[][]} Reconstructed queue
 *
 * Expected Time: O(n²)
 * Expected Space: O(n)
 *
 * Example:
 * Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
 * Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
 */
function reconstructQueue(people) {
  // Your implementation here
}

/**
 * Problem 15: Course Schedule III
 * Maximum number of courses that can be taken.
 *
 * @param {number[][]} courses - Array of [duration, lastDay] pairs
 * @return {number} Maximum number of courses
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
 * Output: 3
 */
function scheduleCourse(courses) {
  // Your implementation here
}

/**
 * Problem 16: Minimum Number of Arrows to Burst Balloons
 * Minimum arrows to burst all balloons.
 *
 * @param {number[][]} points - Array of [x_start, x_end] balloon coordinates
 * @return {number} Minimum number of arrows
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: points = [[10,16],[2,8],[1,6],[7,12]]
 * Output: 2
 */
function findMinArrowShots(points) {
  // Your implementation here
}

/**
 * Problem 17: Minimum Number of Taps to Open to Water a Garden
 * Minimum taps to water entire garden.
 *
 * @param {number} n - Garden length
 * @param {number[]} ranges - Tap ranges
 * @return {number} Minimum taps, -1 if impossible
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: n = 5, ranges = [3,4,1,1,0,0]
 * Output: 1
 */
function minTaps(n, ranges) {
  // Your implementation here
}

/**
 * Problem 18: Task Scheduler
 * Minimum intervals to complete tasks with cooling period.
 *
 * @param {char[]} tasks - Array of tasks
 * @param {number} n - Cooling period
 * @return {number} Minimum intervals
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: tasks = ['A','A','A','B','B','B'], n = 2
 * Output: 8
 */
function leastInterval(tasks, n) {
  // Your implementation here
}

/**
 * Problem 19: Reorganize String
 * Rearrange string so no adjacent characters are same.
 *
 * @param {string} s - Input string
 * @return {string} Rearranged string or empty string if impossible
 *
 * Expected Time: O(n log k) where k is unique characters
 * Expected Space: O(k)
 *
 * Example:
 * Input: s = "aab"
 * Output: "aba"
 */
function reorganizeString(s) {
  // Your implementation here
}

/**
 * Problem 20: Longest Happy String
 * Longest string that contains 'a', 'b', 'c' and no two consecutive characters are equal.
 *
 * @param {number} a - Count of 'a'
 * @param {number} b - Count of 'b'
 * @param {number} c - Count of 'c'
 * @return {string} Longest happy string
 *
 * Expected Time: O(a + b + c)
 * Expected Space: O(1)
 *
 * Example:
 * Input: a = 1, b = 1, c = 7
 * Output: "ccaccbcc"
 */
function longestDiverseString(a, b, c) {
  // Your implementation here
}

/**
 * Problem 21: Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
 * Maximum area of cake piece after cuts.
 *
 * @param {number} h - Height of cake
 * @param {number} w - Width of cake
 * @param {number[]} horizontalCuts - Horizontal cut positions
 * @param {number[]} verticalCuts - Vertical cut positions
 * @return {number} Maximum area modulo 10^9 + 7
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
 * Output: 4
 */
function maxArea(h, w, horizontalCuts, verticalCuts) {
  // Your implementation here
}

/**
 * Problem 22: Minimum Number of Operations to Make Array Empty
 * Minimum operations to make array empty.
 *
 * @param {number[]} nums - Input array
 * @return {number} Minimum operations, -1 if impossible
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [2,3,3,2,2,4,2,3,4]
 * Output: 4
 */
function minOperations(nums) {
  // Your implementation here
}

/**
 * Problem 23: Minimum Number of Swaps to Make the String Balanced
 * Minimum swaps to make string balanced.
 *
 * @param {string} s - String of '[' and ']'
 * @return {number} Minimum swaps
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: s = "][]["
 * Output: 1
 */
function minSwaps(s) {
  // Your implementation here
}

/**
 * Problem 24: Minimum Deletions to Make Character Frequencies Unique
 * Minimum deletions to make character frequencies unique.
 *
 * @param {string} s - Input string
 * @return {number} Minimum deletions
 *
 * Expected Time: O(n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: s = "aaabbbcc"
 * Output: 2
 */
function minDeletions(s) {
  // Your implementation here
}

/**
 * Problem 25: Find the Minimum Number of Fibonacci Numbers Whose Sum is K
 * Minimum Fibonacci numbers that sum to K.
 *
 * @param {number} k - Target sum
 * @return {number} Minimum count of Fibonacci numbers
 *
 * Expected Time: O(log k)
 * Expected Space: O(log k)
 *
 * Example:
 * Input: k = 7
 * Output: 2
 * Explanation: 7 = 5 + 2
 */
function findMinFibonacciNumbers(k) {
  // Your implementation here
}

// ==========================================
// HARD PROBLEMS
// ==========================================

/**
 * Problem 26: Jump Game V
 * Maximum number of indices you can reach.
 *
 * @param {number[]} nums - Jump lengths at each position
 * @param {number} d - Maximum jump distance
 * @return {number} Maximum reachable indices
 *
 * Expected Time: O(n * d)
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [6,4,14,8,13,9,7,10,6,12], d = 2
 * Output: 4
 */
function maxJumps(nums, d) {
  // Your implementation here
}

/**
 * Problem 27: Maximum Number of Visible People in a Queue
 * Maximum number of visible people in a queue.
 *
 * @param {number[]} heights - Array of heights
 * @return {number[]} Array of visible counts
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: heights = [10,6,8,5,11,9]
 * Output: [3,1,2,1,1,0]
 */
function canSeePersonsCount(heights) {
  // Your implementation here
}

/**
 * Problem 28: Maximum Number of Tasks You Can Assign
 * Maximum number of tasks that can be assigned.
 *
 * @param {number[][]} tasks - Array of [difficulty, profit] pairs
 * @param {number[]} workers - Worker abilities
 * @return {number} Maximum number of tasks
 *
 * Expected Time: O(n log n + m log m)
 * Expected Space: O(n + m)
 *
 * Example:
 * Input: tasks = [[2,4],[3,5],[1,2]], workers = [3,4]
 * Output: 2
 */
function maxTaskAssign(tasks, workers) {
  // Your implementation here
}

/**
 * Problem 29: Maximum Number of Coins in a Subtree
 * Maximum coins that can be collected in a subtree.
 *
 * @param {Node} root - Root of binary tree
 * @param {number[][]} coins - Coin distribution rules
 * @return {number[]} Array of maximum coins for each node
 *
 * Expected Time: O(n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: tree structure and coins
 * Output: Array of maximum coins
 */
function maximumCoin(root, coins) {
  // Your implementation here
}

/**
 * Problem 30: Minimum Number of Refueling Stops
 * Minimum refueling stops to reach target.
 *
 * @param {number} target - Target distance
 * @param {number} startFuel - Starting fuel
 * @param {number[][]} stations - Array of [position, fuel] stations
 * @return {number} Minimum stops, -1 if impossible
 *
 * Expected Time: O(n log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: target = 100, startFuel = 10, stations = [[10,60]]
 * Output: 2
 */
function minRefuelStops(target, startFuel, stations) {
  // Your implementation here
}

/**
 * Problem 31: IPO
 * Maximum capital after k projects.
 *
 * @param {number} k - Maximum number of projects
 * @param {number} w - Initial capital
 * @param {number[]} profits - Project profits
 * @param {number[]} capital - Project capital requirements
 * @return {number} Maximum capital
 *
 * Expected Time: O((n + k) log n)
 * Expected Space: O(n)
 *
 * Example:
 * Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
 * Output: 4
 */
function findMaximizedCapital(k, w, profits, capital) {
  // Your implementation here
}

/**
 * Problem 32: Course Schedule IV
 * Check if one course is prerequisite of another.
 *
 * @param {number} numCourses - Number of courses
 * @param {number[][]} prerequisites - Prerequisite pairs
 * @param {number[][]} queries - Query pairs
 * @return {boolean[]} Array of query results
 *
 * Expected Time: O(n³ + q)
 * Expected Space: O(n²)
 *
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
 * Output: [false,true]
 */
function checkIfPrerequisite(numCourses, prerequisites, queries) {
  // Your implementation here
}

/**
 * Problem 33: Maximum Number of People That Can Be Fed
 * Maximum number of people that can be fed.
 *
 * @param {number[]} food - Array of food quantities
 * @param {number[]} people - Array of people requirements
 * @return {number} Maximum people fed
 *
 * Expected Time: O(n log n)
 * Expected Space: O(1)
 *
 * Example:
 * Input: food = [5,3,7], people = [4,6,8]
 * Output: 2
 */
function maxFedPeople(food, people) {
  // Your implementation here
}

/**
 * Problem 34: Minimum Number of Work Sessions to Finish the Tasks
 * Minimum work sessions to finish all tasks.
 *
 * @param {number[]} tasks - Array of task durations
 * @param {number} sessionTime - Session time limit
 * @return {number} Minimum sessions
 *
 * Expected Time: O(2^n)
 * Expected Space: O(2^n)
 *
 * Example:
 * Input: tasks = [1,2,3], sessionTime = 3
 * Output: 2
 */
function minSessions(tasks, sessionTime) {
  // Your implementation here
}

/**
 * Problem 35: Maximum Number of Groups With Common Divisors
 * Maximum number of groups with common divisors.
 *
 * @param {number[]} nums - Input array
 * @return {number} Maximum groups
 *
 * Expected Time: O(n * sqrt(max(nums)))
 * Expected Space: O(n)
 *
 * Example:
 * Input: nums = [2,3,4,5,6]
 * Output: 2
 */
function maximumGroups(nums) {
  // Your implementation here
}

// ==========================================
// BONUS CHALLENGES
// ==========================================

/**
 * Bonus 1: Activity Selection with Weights
 * Weighted activity selection problem.
 */
function weightedActivitySelection(activities) {
  // Your implementation here
}

/**
 * Bonus 2: Egyptian Fraction
 * Represent fraction as sum of distinct unit fractions.
 */
function egyptianFraction(numerator, denominator) {
  // Your implementation here
}

/**
 * Bonus 3: Minimum Spanning Tree with Constraints
 * MST with additional constraints.
 */
function constrainedMST(graph, constraints) {
  // Your implementation here
}

/**
 * Bonus 4: Greedy for Approximation Algorithms
 * Use greedy for NP-hard problems.
 */
function greedyApproximation(problem) {
  // Your implementation here
}

/**
 * Bonus 5: Online Greedy Algorithms
 * Greedy algorithms for online problems.
 */
function onlineGreedy(input) {
  // Your implementation here
}

/**
 * Bonus 6: Matroid Greedy Algorithm
 * Generic matroid greedy implementation.
 */
function matroidGreedy(elements, independentSet) {
  // Your implementation here
}

/**
 * Bonus 7: Greedy for Streaming Problems
 * Greedy algorithms for data streams.
 */
function streamingGreedy(stream) {
  // Your implementation here
}

/**
 * Bonus 8: Competitive Analysis of Greedy
 * Analyze competitive ratio of greedy algorithms.
 */
function competitiveAnalysis(greedy, optimal, inputs) {
  // Your implementation here
}

/**
 * Bonus 9: Greedy with Lookahead
 * Greedy algorithms with limited lookahead.
 */
function greedyWithLookahead(input, lookahead) {
  // Your implementation here
}

/**
 * Bonus 10: Adaptive Greedy Algorithms
 * Greedy algorithms that adapt to input characteristics.
 */
function adaptiveGreedy(input) {
  // Your implementation here
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Greedy Algorithms Practice Tests...\n");

  console.log("📝 Test your implementations:");
  console.log("Start with easy problems, then move to medium and hard");

  // Example tests
  console.log("\n🎯 Example Tests:");

  // Test assign cookies
  console.log("Example - Assign Cookies:");
  console.log("Input: g = [1,2,3], s = [1,1]");
  console.log("Expected: 1");
  console.log("Your result:", findContentChildren([1, 2, 3], [1, 1]));

  // Test maximum balloons
  console.log("\nExample - Maximum Balloons:");
  console.log('Input: text = "nlaebolko"');
  console.log("Expected: 1");
  console.log("Your result:", maxNumberOfBalloons("nlaebolko"));

  // Test place flowers
  console.log("\nExample - Place Flowers:");
  console.log("Input: flowerbed = [1,0,0,0,1], n = 1");
  console.log("Expected: true");
  console.log("Your result:", canPlaceFlowers([1, 0, 0, 0, 1], 1));

  // Test goat latin
  console.log("\nExample - Goat Latin:");
  console.log('Input: sentence = "I speak Goat Latin"');
  console.log('Expected: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"');
  console.log("Your result:", toGoatLatin("I speak Goat Latin"));

  // Test largest perimeter
  console.log("\nExample - Largest Perimeter:");
  console.log("Input: sticks = [2,1,2]");
  console.log("Expected: 5");
  console.log("Your result:", largestPerimeter([2, 1, 2]));

  // Test sorted and rotated
  console.log("\nExample - Sorted and Rotated:");
  console.log("Input: nums = [3,4,5,1,2]");
  console.log("Expected: true");
  console.log("Your result:", check([3, 4, 5, 1, 2]));

  // Test consecutive subsequences
  console.log("\nExample - Consecutive Subsequences:");
  console.log("Input: nums = [1,2,3,3,4,5]");
  console.log("Expected: true");
  console.log("Your result:", isPossible([1, 2, 3, 3, 4, 5]));

  // Test three parts equal sum
  console.log("\nExample - Three Parts Equal Sum:");
  console.log("Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]");
  console.log("Expected: false");
  console.log(
    "Your result:",
    canThreePartsEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1])
  );

  // Test boats
  console.log("\nExample - Boats to Save People:");
  console.log("Input: people = [1,2], limit = 3");
  console.log("Expected: 1");
  console.log("Your result:", numRescueBoats([1, 2], 3));

  // Test maximum units
  console.log("\nExample - Maximum Units:");
  console.log("Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4");
  console.log("Expected: 8");
  console.log(
    "Your result:",
    maximumUnits(
      [
        [1, 3],
        [2, 2],
        [3, 1],
      ],
      4
    )
  );

  // Test gas station
  console.log("\nExample - Gas Station:");
  console.log("Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]");
  console.log("Expected: 3");
  console.log(
    "Your result:",
    canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
  );

  // Test candy
  console.log("\nExample - Candy:");
  console.log("Input: ratings = [1,0,2]");
  console.log("Expected: 5");
  console.log("Your result:", candy([1, 0, 2]));

  // Test jump game
  console.log("\nExample - Jump Game II:");
  console.log("Input: nums = [2,3,1,1,4]");
  console.log("Expected: 2");
  console.log("Your result:", jump([2, 3, 1, 1, 4]));

  // Test reconstruct queue
  console.log("\nExample - Reconstruct Queue:");
  console.log("Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]");
  console.log("Expected: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]");
  console.log(
    "Your result:",
    reconstructQueue([
      [7, 0],
      [4, 4],
      [7, 1],
      [5, 0],
      [6, 1],
      [5, 2],
    ])
  );

  // Test course schedule
  console.log("\nExample - Course Schedule III:");
  console.log(
    "Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]"
  );
  console.log("Expected: 3");
  console.log(
    "Your result:",
    scheduleCourse([
      [100, 200],
      [200, 1300],
      [1000, 1250],
      [2000, 3200],
    ])
  );

  // Test minimum arrows
  console.log("\nExample - Minimum Arrows:");
  console.log("Input: points = [[10,16],[2,8],[1,6],[7,12]]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    findMinArrowShots([
      [10, 16],
      [2, 8],
      [1, 6],
      [7, 12],
    ])
  );

  // Test task scheduler
  console.log("\nExample - Task Scheduler:");
  console.log('Input: tasks = ["A","A","A","B","B","B"], n = 2');
  console.log("Expected: 8");
  console.log("Your result:", leastInterval(["A", "A", "A", "B", "B", "B"], 2));

  // Test reorganize string
  console.log("\nExample - Reorganize String:");
  console.log('Input: s = "aab"');
  console.log('Expected: "aba"');
  console.log("Your result:", reorganizeString("aab"));

  // Test diverse string
  console.log("\nExample - Diverse String:");
  console.log("Input: a = 1, b = 1, c = 7");
  console.log('Expected: "ccaccbcc"');
  console.log("Your result:", longestDiverseString(1, 1, 7));

  // Test maximum area
  console.log("\nExample - Maximum Area:");
  console.log(
    "Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]"
  );
  console.log("Expected: 4");
  console.log("Your result:", maxArea(5, 4, [3, 1], [1]));

  // Test min operations
  console.log("\nExample - Min Operations:");
  console.log("Input: nums = [2,3,3,2,2,4,2,3,4]");
  console.log("Expected: 4");
  console.log("Your result:", minOperations([2, 3, 3, 2, 2, 4, 2, 3, 4]));

  // Test min swaps
  console.log("\nExample - Min Swaps:");
  console.log('Input: s = "][]["');
  console.log("Expected: 1");
  console.log("Your result:", minSwaps("][]["));

  // Test min deletions
  console.log("\nExample - Min Deletions:");
  console.log('Input: s = "aaabbbcc"');
  console.log("Expected: 2");
  console.log("Your result:", minDeletions("aaabbbcc"));

  // Test Fibonacci numbers
  console.log("\nExample - Min Fibonacci Numbers:");
  console.log("Input: k = 7");
  console.log("Expected: 2");
  console.log("Your result:", findMinFibonacciNumbers(7));

  // Test jump game V
  console.log("\nExample - Jump Game V:");
  console.log("Input: nums = [6,4,14,8,13,9,7,10,6,12], d = 2");
  console.log("Expected: 4");
  console.log("Your result:", maxJumps([6, 4, 14, 8, 13, 9, 7, 10, 6, 12], 2));

  // Test visible people
  console.log("\nExample - Visible People:");
  console.log("Input: heights = [10,6,8,5,11,9]");
  console.log("Expected: [3,1,2,1,1,0]");
  console.log("Your result:", canSeePersonsCount([10, 6, 8, 5, 11, 9]));

  // Test task assignment
  console.log("\nExample - Task Assignment:");
  console.log("Input: tasks = [[2,4],[3,5],[1,2]], workers = [3,4]");
  console.log("Expected: 2");
  console.log(
    "Your result:",
    maxTaskAssign(
      [
        [2, 4],
        [3, 5],
        [1, 2],
      ],
      [3, 4]
    )
  );

  // Test refueling stops
  console.log("\nExample - Refueling Stops:");
  console.log("Input: target = 100, startFuel = 10, stations = [[10,60]]");
  console.log("Expected: 2");
  console.log("Your result:", minRefuelStops(100, 10, [[10, 60]]));

  // Test IPO
  console.log("\nExample - IPO:");
  console.log("Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]");
  console.log("Expected: 4");
  console.log("Your result:", findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]));

  // Test course schedule IV
  console.log("\nExample - Course Schedule IV:");
  console.log(
    "Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]"
  );
  console.log("Expected: [false,true]");
  console.log(
    "Your result:",
    checkIfPrerequisite(
      2,
      [[1, 0]],
      [
        [0, 1],
        [1, 0],
      ]
    )
  );

  // Test fed people
  console.log("\nExample - Fed People:");
  console.log("Input: food = [5,3,7], people = [4,6,8]");
  console.log("Expected: 2");
  console.log("Your result:", maxFedPeople([5, 3, 7], [4, 6, 8]));

  // Test min sessions
  console.log("\nExample - Min Sessions:");
  console.log("Input: tasks = [1,2,3], sessionTime = 3");
  console.log("Expected: 2");
  console.log("Your result:", minSessions([1, 2, 3], 3));

  // Test maximum groups
  console.log("\nExample - Maximum Groups:");
  console.log("Input: nums = [2,3,4,5,6]");
  console.log("Expected: 2");
  console.log("Your result:", maximumGroups([2, 3, 4, 5, 6]));

  console.log("\n🎯 Implement all functions and test them!");
  console.log("💡 Focus on understanding greedy choice property");
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

// Greedy pattern detector
function detectGreedyPattern(problem) {
  const patterns = {
    interval: ["interval", "schedule", "meeting", "activity"],
    knapsack: ["knapsack", "weight", "value", "capacity"],
    scheduling: ["schedule", "task", "course", "deadline"],
    string: ["string", "character", "rearrange", "organize"],
    array: ["array", "jump", "gas", "station"],
    graph: ["graph", "tree", "node", "edge"],
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

// Greedy proof helper
function proveGreedyOptimal(funcName, greedyChoice) {
  console.log(`\n🔍 Proving ${funcName} is optimal:`);
  console.log(`Greedy choice: ${greedyChoice}`);
  console.log("Proof techniques to consider:");
  console.log("1. Exchange argument");
  console.log("2. Induction");
  console.log("3. Greedy stays ahead");
  console.log("4. Matroid theory");

  return {
    greedyChoice,
    proofTechniques: ["exchange", "induction", "greedy-stays-ahead", "matroid"],
    status: "needs-proof",
  };
}

// Complexity analyzer for greedy algorithms
function analyzeGreedyComplexity(func, args) {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();

  return {
    result,
    time: end - start,
    memory: process.memoryUsage().heapUsed,
    greedyComplexity: estimateGreedyComplexity(args),
  };
}

function estimateGreedyComplexity(args) {
  const sizes = args.map((arg) =>
    Array.isArray(arg)
      ? arg.length
      : typeof arg === "object"
      ? Object.keys(arg).length
      : 1
  );

  const max = Math.max(...sizes);
  // Most greedy algorithms are O(n log n) due to sorting
  return `O(${max} log ${max})`;
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export functions for testing
module.exports = {
  // Easy problems
  findContentChildren,
  maxNumberOfBalloons,
  canPlaceFlowers,
  toGoatLatin,
  largestPerimeter,
  check,
  isPossible,
  canThreePartsEqualSum,
  numRescueBoats,
  maximumUnits,

  // Medium problems
  canCompleteCircuit,
  candy,
  jump,
  reconstructQueue,
  scheduleCourse,
  findMinArrowShots,
  minTaps,
  leastInterval,
  reorganizeString,
  longestDiverseString,
  maxArea,
  minOperations,
  minSwaps,
  minDeletions,
  findMinFibonacciNumbers,

  // Hard problems
  maxJumps,
  canSeePersonsCount,
  maxTaskAssign,
  maximumCoin,
  minRefuelStops,
  findMaximizedCapital,
  checkIfPrerequisite,
  maxFedPeople,
  minSessions,
  maximumGroups,

  // Bonus challenges
  weightedActivitySelection,
  egyptianFraction,
  constrainedMST,
  greedyApproximation,
  onlineGreedy,
  matroidGreedy,
  streamingGreedy,
  competitiveAnalysis,
  greedyWithLookahead,
  adaptiveGreedy,

  // Utilities
  testFunction,
  detectGreedyPattern,
  proveGreedyOptimal,
  analyzeGreedyComplexity,
};
