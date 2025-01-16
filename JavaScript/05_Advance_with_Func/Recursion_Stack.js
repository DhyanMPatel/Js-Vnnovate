/// Recursion
//  - when function called itself is called Recursion.
//  - Recursion solution is shorter then an iterative one
//  - max limit of JS engine for Recursion is 10,000.
//  - loop-based algo is more memory-saving then Recursion.

// - Recursion can give a shorter code, easier to understand and support. Optimizations are not required in every place, mostly we need a good code, that’s why it’s used

function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
// console.log(pow(2, 3)); // Return - 8

/*
/// Recursive Traversals

let Company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    site: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};
console.log(Company);

function sumSalary(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalary(subdep);
    }
    return sum;
  }
}
console.log(sumSalary(Company));
*/

/*
/// Recursive Structure
//  - Recursive Structure is a structure that replicates itself in parts.
//  - Linked list is also one type of Recursive Structure
let Linked_list1 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null,
    },
  },
};
let Linked_list2 = { value: 1 };
Linked_list2.next = { value: 2 };
Linked_list2.next.next = { value: 3 };
Linked_list2.next.next.next = null;

console.log(Linked_list1);
console.log(Linked_list2);

// Splite Linked_list
let secondLL = Linked_list2.next.next; // contain value:3 and their next
Linked_list2.next.next = null; // contain only value:1,2 and their next

console.log(Linked_list2);
console.log(secondLL);

// Joint Linked_list
Linked_list2.next.next = secondLL;
console.log(Linked_list2);

// to remove value from middle
Linked_list2.next = Linked_list2.next.next;
console.log(Linked_list2);

/// Linked List - is not better answer then arr
//      - because to access that value is more complex then arr
//      - but when we want queue, or even deque
*/

/// Examples

// Sum of all number
function sumTo(n) {
  let sum = 0;
  if (n == 1) return 1;
  sum = n + sumTo(n - 1);

  return sum;
}
console.log(sumTo(5));

// Fectorial Calculation
function FectorialCal(n) {
  let total = 0;
  if (n == 1) return 1;
  total = n * FectorialCal(n - 1);
  return total;
}
console.log(FectorialCal(5));

// Fibonacci Number
function fibonacci(n) {
  if (n == 1 || n == 0) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
console.log(fibonacci(10));

///
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
function printList(list) {
  console.log(list.value);
  if (list.next) {
    printList(list.next);
  }
}
printList(list);
