# 📚 Stacks

> **LIFO Data Structure for Sequential Processing**

## 📋 Table of Contents

- [What are Stacks?](#what-are-stacks)
- [Stack Properties](#stack-properties)
- [Core Operations](#core-operations)
- [Implementation](#implementation)
- [Common Patterns](#common-patterns)
- [Applications](#applications)
- [Practice Problems](#practice-problems)
- [Interview Tips](#interview-tips)
- [Next Steps](#next-steps)

## 🎯 What are Stacks?

### Definition

A stack is a linear data structure that follows the **Last-In-First-Out (LIFO)** principle. Elements can only be added and removed from one end (the "top").

### Real-World Analogy

```javascript
// Think of a stack of plates:
// - You add plates to the top
// - You remove plates from the top
// - Last plate added is first one removed

const stackOfPlates = {
  push: "Add plate to top",
  pop: "Remove top plate",
  peek: "Look at top plate",
  isEmpty: "Check if stack is empty",
};
```

### Why Stacks Matter

- **Function Call Management**: Managing function calls and recursion
- **Expression Evaluation**: Evaluating mathematical expressions
- **Undo/Redo Operations**: Implementing undo functionality
- **Browser History**: Managing navigation history
- **Algorithm Foundation**: Base for many algorithms (DFS, backtracking)

## 🔍 Stack Properties

### Time Complexity Analysis

```javascript
const stackOperations = {
  push: "O(1) - Add element to top",
  pop: "O(1) - Remove element from top",
  peek: "O(1) - Look at top element",
  isEmpty: "O(1) - Check if empty",
  size: "O(1) - Get current size",
  search: "O(n) - Search for element",
};
```

### Space Complexity

- **O(n)** - Space grows linearly with number of elements
- **Contiguous Memory**: Can be implemented with arrays or linked lists

### LIFO Principle

```javascript
// Last In, First Out
const example = [];
example.push(1); // [1]
example.push(2); // [1, 2]
example.push(3); // [1, 2, 3]
example.pop(); // Returns 3, stack is [1, 2]
example.pop(); // Returns 2, stack is [1]
```

## ⚡ Core Operations

### Basic Stack Implementation

```javascript
class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }

  // Add element to top - O(1)
  push(element) {
    this.items.push(element);
    this.top++;
    return this;
  }

  // Remove element from top - O(1)
  pop() {
    if (this.isEmpty()) return undefined;

    this.top--;
    return this.items.pop();
  }

  // Look at top element - O(1)
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.top];
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.top === -1;
  }

  // Get size - O(1)
  size() {
    return this.top + 1;
  }

  // Clear stack - O(1)
  clear() {
    this.items = [];
    this.top = -1;
    return this;
  }

  // Convert to array - O(n)
  toArray() {
    return [...this.items];
  }

  // Print stack - O(n)
  print() {
    console.log(this.items.join(" <- "));
  }
}
```

### Linked List Stack Implementation

```javascript
class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  // Add to top - O(1)
  push(value) {
    const newNode = new StackNode(value);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
    return this;
  }

  // Remove from top - O(1)
  pop() {
    if (this.isEmpty()) return undefined;

    const removed = this.top;
    this.top = this.top.next;
    this.size--;
    return removed.value;
  }

  // Look at top - O(1)
  peek() {
    return this.isEmpty() ? undefined : this.top.value;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }
}
```

## 🎯 Common Patterns

### 1. Monotonic Stack

```javascript
// Stack that maintains monotonic property (increasing/decreasing)
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Store indices

  for (let i = 0; i < nums.length; i++) {
    // While current element is greater than stack top element
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }

  return result;
}

// Example: [2, 1, 2, 4, 3] -> [4, 2, 4, -1, -1]
```

### 2. Stack for Valid Parentheses

```javascript
function isValidParentheses(s) {
  const stack = [];
  const pairs = { "(": ")", "[": "]", "{": "}" };

  for (const char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }

  return stack.length === 0;
}
```

### 3. Stack for Expression Evaluation

```javascript
function evaluatePostfix(expression) {
  const stack = [];

  for (const token of expression.split(" ")) {
    if (!isNaN(token)) {
      stack.push(parseInt(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(Math.trunc(a / b));
          break;
      }
    }
  }

  return stack[0];
}

// Example: "2 3 1 * + 9 -" -> -4
```

### 4. Stack for String Reversal

```javascript
function reverseString(s) {
  const stack = [];

  // Push all characters
  for (const char of s) {
    stack.push(char);
  }

  // Pop all characters to reverse
  let reversed = "";
  while (stack.length > 0) {
    reversed += stack.pop();
  }

  return reversed;
}
```

## 🚀 Advanced Applications

### 1. Min Stack (Stack with getMin in O(1))

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(x) {
    this.stack.push(x);

    if (
      this.minStack.length === 0 ||
      x <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(x);
    }
  }

  pop() {
    const popped = this.stack.pop();

    if (popped === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }

    return popped;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

### 2. Stack with Max Operation

```javascript
class MaxStack {
  constructor() {
    this.stack = [];
    this.maxStack = [];
  }

  push(x) {
    this.stack.push(x);

    if (
      this.maxStack.length === 0 ||
      x >= this.maxStack[this.maxStack.length - 1]
    ) {
      this.maxStack.push(x);
    }
  }

  pop() {
    const popped = this.stack.pop();

    if (popped === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }

    return popped;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMax() {
    return this.maxStack[this.maxStack.length - 1];
  }
}
```

### 3. Implement Queue using Stacks

```javascript
class MyQueue {
  constructor() {
    this.stack1 = []; // For enqueue
    this.stack2 = []; // For dequeue
  }

  enqueue(x) {
    this.stack1.push(x);
  }

  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2.pop();
  }

  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2[this.stack2.length - 1];
  }

  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
```

### 4. Stack for Backtracking

```javascript
function generateParentheses(n) {
  const result = [];
  const stack = []; // Store current string

  function backtrack(open, close, current) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(open + 1, close, current + "(");
    }

    if (close < open) {
      backtrack(open, close + 1, current + ")");
    }
  }

  backtrack(0, 0, "");
  return result;
}
```

## 💡 Real-World Applications

### 1. Browser History

```javascript
class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.currentIndex = 0;
  }

  visit(url) {
    // Clear forward history
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(url);
    this.currentIndex++;
  }

  back(steps) {
    this.currentIndex = Math.max(0, this.currentIndex - steps);
    return this.history[this.currentIndex];
  }

  forward(steps) {
    this.currentIndex = Math.min(
      this.history.length - 1,
      this.currentIndex + steps
    );
    return this.history[this.currentIndex];
  }
}
```

### 2. Undo/Redo System

```javascript
class TextEditor {
  constructor() {
    this.content = "";
    this.undoStack = [];
    this.redoStack = [];
  }

  type(text) {
    this.content += text;
    this.undoStack.push(this.content);
    this.redoStack = []; // Clear redo stack
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.content);
      this.content = this.undoStack.pop();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.content);
      this.content = this.redoStack.pop();
    }
  }
}
```

### 3. Function Call Stack Simulation

```javascript
class CallStack {
  constructor() {
    this.stack = [];
  }

  call(functionName, args) {
    console.log(`Calling ${functionName}(${args.join(", ")})`);
    this.stack.push({ function: functionName, args });
    return this;
  }

  return(result) {
    const call = this.stack.pop();
    console.log(`${call.function} returned: ${result}`);
    return this;
  }

  getCurrentCall() {
    return this.stack[this.stack.length - 1];
  }
}
```

## 💪 Practice Problems

### Easy

1. **Valid Parentheses** - Check if parentheses are balanced
2. **Reverse String** - Reverse string using stack
3. **Backspace String Compare** - Handle backspaces in string comparison
4. **Make The String Great** - Remove adjacent duplicates

### Medium

1. **Min Stack** - Stack with O(1) getMin operation
2. **Evaluate Reverse Polish Notation** - Evaluate postfix expressions
3. **Generate Parentheses** - Generate all valid parentheses
4. **Asteroid Collision** - Handle asteroid collisions
5. **Remove All Adjacent Duplicates** - Remove repeated adjacent characters

### Hard

1. **Largest Rectangle in Histogram** - Find largest rectangle area
2. **Trapping Rain Water** - Calculate trapped water using stack
3. **Basic Calculator** - Evaluate mathematical expressions
4. **Remove Duplicate Letters** - Remove duplicates maintaining order
5. **Validate Stack Sequences** - Check if push/pop sequence is valid

## 🎤 Interview Tips

### Problem-Solving Framework

```javascript
function solveStackProblem(problem) {
  // 1. Identify if stack is appropriate
  const stackIndicators = [
    "LIFO behavior needed",
    "Nested structure processing",
    "Expression evaluation",
    "Backtracking required",
    "Need to reverse order",
  ];

  // 2. Choose stack type
  const stackTypes = {
    basic: "Simple stack operations",
    monotonic: "Maintaining order property",
    minMax: "Additional min/max tracking",
    custom: "Specialized requirements",
  };

  // 3. Implement solution
  // 4. Handle edge cases
  // 5. Optimize if needed
}
```

### Common Mistakes to Avoid

- ❌ Not handling empty stack case
- ❌ Forgetting to check stack bounds
- ❌ Not considering time complexity of stack operations
- ❌ Using wrong data structure for the problem
- ❌ Not handling edge cases in stack operations

### Communication Tips

- **Explain why stack is appropriate** for the problem
- **Discuss stack operations** and their complexity
- **Handle edge cases** explicitly
- **Show step-by-step** stack manipulation

## 📊 Stack vs Other Data Structures

| Operation     | Stack | Queue | Array | Linked List |
| ------------- | ----- | ----- | ----- | ----------- |
| Add End       | O(1)  | O(1)  | O(1)  | O(1)        |
| Remove End    | O(1)  | O(n)  | O(1)  | O(1)        |
| Add Start     | O(1)  | O(1)  | O(n)  | O(1)        |
| Remove Start  | O(1)  | O(1)  | O(n)  | O(1)        |
| Access Middle | O(n)  | O(n)  | O(1)  | O(n)        |
| Search        | O(n)  | O(n)  | O(n)  | O(n)        |

## 📖 Additional Resources

### Videos

- **Stack Data Structure - CS50**: Harvard introduction
- **Monotonic Stack - NeetCode**: Advanced pattern explanation
- **Stack Applications - TechLead**: Real-world use cases

### Websites

- **Stack Visualizer**: Interactive stack operations
- **GeeksforGeeks Stacks**: Comprehensive tutorials
- **LeetCode Stack Problems**: Practice problems by difficulty

### Books

- **"Data Structures and Algorithms"**: Stack chapter
- **"Cracking the Coding Interview"**: Stack interview questions

## 🎓 What You Need from Other Resources

### System Design

- **Caching Systems**: LRU cache implementation
- **Message Queues**: Stack-based queue implementations
- **Undo Systems**: Stack-based undo/redo

### Algorithm Design

- **Tree Traversal**: Stack-based DFS implementation
- **Graph Algorithms**: Stack for path finding
- **Backtracking**: Stack for state management

---

## 🚀 Next Steps

**Ready to continue?**

1. **Complete implementation** in `implementation.js`
2. **Solve practice problems** in `practice.js`
3. **Move to Queues** → `../Queues/README.md`

> 💡 **Key Insight**: Stacks teach you LIFO thinking - crucial for recursion, backtracking, and many algorithmic patterns!

---

## 📊 Quick Reference

### Must-Know Stack Operations

```javascript
const essentialOperations = {
  push: "Add element to top - O(1)",
  pop: "Remove from top - O(1)",
  peek: "Look at top - O(1)",
  isEmpty: "Check if empty - O(1)",
  size: "Get current size - O(1)",
};
```

### Common Stack Patterns

- **Monotonic Stack**: Next greater/smaller element
- **Valid Parentheses**: Balanced parentheses checking
- **Expression Evaluation**: Postfix/infix evaluation
- **Backtracking**: State management
- **Undo/Redo**: History management

---

_Last Updated: December 2025_  
_Difficulty: Beginner to Intermediate_  
_Prerequisites: Arrays, Big O Complexity_  
_Time Commitment: 1 week_
