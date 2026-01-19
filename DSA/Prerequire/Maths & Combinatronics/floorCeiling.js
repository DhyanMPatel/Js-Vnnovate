/**
 * 🎯 PURPOSE: Floor & Ceiling Operations
 *
 * Learning Objectives:
 * - Master Math.floor() and Math.ceil() functions
 * - Understand rounding operations and their differences
 * - Practice mathematical operations in JavaScript
 * - Learn precision handling with floating-point numbers
 *
 * Real-world Applications:
 * - Pagination calculations (total pages needed)
 * - Resource allocation and distribution
 * - Financial calculations (rounding up/down)
 * - Graphics and game development (grid positioning)
 * - Data visualization and chart scaling
 *
 * Key Concepts:
 * - Floor: Always rounds DOWN to nearest integer
 * - Ceiling: Always rounds UP to nearest integer
 * - Different from Math.round() (rounds to nearest)
 * - Handles negative numbers correctly
 *
 * Time Complexity: O(1) - Constant time operations
 * Space Complexity: O(1) - No extra space needed
 */

function demonstrateFloorCeiling() {
  console.log("Floor & Ceiling Examples:");

  let examples = [
    3.7,
    3.2,
    3.0, // Positive numbers
    -2.3,
    -2.8,
    -2.0, // Negative numbers
    0.5,
    0.0,
    -0.5, // Edge cases
  ];

  examples.forEach((num) => {
    console.log(`Number: ${num}`);
    console.log(`  Floor: ${Math.floor(num)}`);
    console.log(`  Ceiling: ${Math.ceil(num)}`);
    console.log(`  Round: ${Math.round(num)}`);
    console.log("---");
  });
}

function calculatePages(totalItems, itemsPerPage) {
  // Real-world example: Calculate how many pages needed
  let pages = Math.ceil(totalItems / itemsPerPage);
  return pages;
}

function calculateFullGroups(totalPeople, groupSize) {
  // Real-world example: Calculate complete groups
  let fullGroups = Math.floor(totalPeople / groupSize);
  return fullGroups;
}

// Driver code
console.log("=== Floor & Ceiling Operations ===\n");

demonstrateFloorCeiling();

console.log("\n=== Real-world Applications ===");

// Pagination example
let totalBooks = 23;
let booksPerPage = 5;
console.log(`Books: ${totalBooks}, Per page: ${booksPerPage}`);
console.log(`Pages needed: ${calculatePages(totalBooks, booksPerPage)}`);

// Group formation example
let totalStudents = 32;
let studentsPerTeam = 7;
console.log(`Students: ${totalStudents}, Team size: ${studentsPerTeam}`);
console.log(
  `Complete teams: ${calculateFullGroups(totalStudents, studentsPerTeam)}`,
);
console.log(`Remaining students: ${totalStudents % studentsPerTeam}`);
