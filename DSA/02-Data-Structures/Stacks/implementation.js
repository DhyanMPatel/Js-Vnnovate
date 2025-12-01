// 📚 Stacks Implementation
// Complete implementations of all stack types and operations

// ==========================================
// BASIC STACK IMPLEMENTATION
// ==========================================

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

  // Clone stack - O(n)
  clone() {
    const newStack = new Stack();
    newStack.items = [...this.items];
    newStack.top = this.top;
    return newStack;
  }
}

// ==========================================
// LINKED LIST STACK IMPLEMENTATION
// ==========================================

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

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.top;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Clear stack - O(1)
  clear() {
    this.top = null;
    this.size = 0;
    return this;
  }
}

// ==========================================
// SPECIALIZED STACKS
// ==========================================

// Min Stack - O(1) getMin operation
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

  size() {
    return this.stack.length;
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

// Max Stack - O(1) getMax operation
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

  size() {
    return this.stack.length;
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

// Stack with frequency tracking
class FreqStack {
  constructor() {
    this.stack = [];
    this.frequency = new Map();
    this.group = new Map(); // frequency -> stack of elements
    this.maxFreq = 0;
  }

  push(val) {
    const freq = (this.frequency.get(val) || 0) + 1;
    this.frequency.set(val, freq);

    if (!this.group.has(freq)) {
      this.group.set(freq, []);
    }
    this.group.get(freq).push(val);

    this.maxFreq = Math.max(this.maxFreq, freq);
    this.stack.push(val);
  }

  pop() {
    const val = this.group.get(this.maxFreq).pop();
    this.frequency.set(val, this.frequency.get(val) - 1);

    if (this.group.get(this.maxFreq).length === 0) {
      this.maxFreq--;
    }

    return val;
  }
}

// ==========================================
// STACK UTILITIES
// ==========================================

class StackUtils {
  // Check if parentheses are balanced
  static isValidParentheses(s) {
    const stack = [];
    const pairs = { "(": ")", "[": "]", "{": "}" };

    for (const char of s) {
      if (pairs[char]) {
        stack.push(char);
      } else if (char === ")" || char === "]" || char === "}") {
        if (stack.length === 0) return false;

        const last = stack.pop();
        if (pairs[last] !== char) return false;
      }
    }

    return stack.length === 0;
  }

  // Evaluate postfix expression
  static evaluatePostfix(expression) {
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
          default:
            throw new Error(`Invalid operator: ${token}`);
        }
      }
    }

    return stack[0];
  }

  // Infix to postfix conversion
  static infixToPostfix(infix) {
    const stack = [];
    const result = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (const token of infix.split(" ")) {
      if (!isNaN(token)) {
        result.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          result.push(stack.pop());
        }
        stack.pop(); // Remove '('
      } else {
        while (
          stack.length > 0 &&
          precedence[stack[stack.length - 1]] >= precedence[token]
        ) {
          result.push(stack.pop());
        }
        stack.push(token);
      }
    }

    while (stack.length > 0) {
      result.push(stack.pop());
    }

    return result.join(" ");
  }

  // Next greater element using monotonic stack
  static nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = []; // Store indices

    for (let i = 0; i < nums.length; i++) {
      while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
        const index = stack.pop();
        result[index] = nums[i];
      }
      stack.push(i);
    }

    return result;
  }

  // Largest rectangle in histogram
  static largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
      const currentHeight = i === heights.length ? 0 : heights[i];

      while (
        stack.length > 0 &&
        currentHeight < heights[stack[stack.length - 1]]
      ) {
        const height = heights[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }

      stack.push(i);
    }

    return maxArea;
  }

  // Trapping rain water using stack
  static trap(height) {
    const stack = [];
    let water = 0;

    for (let i = 0; i < height.length; i++) {
      while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
        const top = stack.pop();

        if (stack.length === 0) break;

        const distance = i - stack[stack.length - 1] - 1;
        const boundedHeight =
          Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
        water += distance * boundedHeight;
      }

      stack.push(i);
    }

    return water;
  }

  // Generate valid parentheses
  static generateParentheses(n) {
    const result = [];

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

  // Remove duplicates from string
  static removeDuplicates(s) {
    const stack = [];
    const seen = new Set();

    for (const char of s) {
      if (seen.has(char)) {
        continue;
      }

      while (
        stack.length > 0 &&
        char < stack[stack.length - 1] &&
        s.indexOf(stack[stack.length - 1], stack.length) > stack.length - 1
      ) {
        seen.delete(stack.pop());
      }

      stack.push(char);
      seen.add(char);
    }

    return stack.join("");
  }

  // Decode string
  static decodeString(s) {
    const stack = [];

    for (const char of s) {
      if (char === "]") {
        let decoded = "";

        while (stack.length > 0 && stack[stack.length - 1] !== "[") {
          decoded = stack.pop() + decoded;
        }

        stack.pop(); // Remove '['

        let num = "";
        while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
          num = stack.pop() + num;
        }

        const count = parseInt(num);
        stack.push(decoded.repeat(count));
      } else {
        stack.push(char);
      }
    }

    return stack.join("");
  }
}

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

// Browser History using Stack
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

  getCurrentUrl() {
    return this.history[this.currentIndex];
  }

  canGoBack() {
    return this.currentIndex > 0;
  }

  canGoForward() {
    return this.currentIndex < this.history.length - 1;
  }
}

// Text Editor with Undo/Redo
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

  delete(chars) {
    this.content = this.content.slice(0, -chars);
    this.undoStack.push(this.content);
    this.redoStack = [];
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

  getContent() {
    return this.content;
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }
}

// Function Call Stack Simulator
class CallStack {
  constructor() {
    this.stack = [];
    this.callCount = 0;
  }

  call(functionName, args = []) {
    const call = {
      id: ++this.callCount,
      function: functionName,
      args: args,
      timestamp: Date.now(),
    };

    this.stack.push(call);
    console.log(`[${call.id}] Calling ${functionName}(${args.join(", ")})`);
    return this;
  }

  return(result) {
    if (this.stack.length === 0) return null;

    const call = this.stack.pop();
    console.log(`[${call.id}] ${call.function} returned: ${result}`);
    return call;
  }

  getCurrentCall() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  getStackTrace() {
    return [...this.stack].reverse();
  }

  getDepth() {
    return this.stack.length;
  }
}

// ==========================================
// TESTING UTILITIES
// ==========================================

function runTests() {
  console.log("🧪 Running Stack Implementation Tests...\n");

  // Test Basic Stack
  console.log("📚 Testing Basic Stack:");
  const stack = new Stack();

  stack.push(1).push(2).push(3);
  console.log("After pushes:", stack.toArray());
  console.log("Peek:", stack.peek());
  console.log("Pop:", stack.pop());
  console.log("After pop:", stack.toArray());
  console.log("Size:", stack.size());
  console.log("Is empty:", stack.isEmpty());

  // Test Min Stack
  console.log("\n📊 Testing Min Stack:");
  const minStack = new MinStack();
  minStack.push(5).push(3).push(7).push(2);
  console.log("Stack:", minStack.stack);
  console.log("Min:", minStack.getMin());
  minStack.pop();
  console.log("After pop, Min:", minStack.getMin());

  // Test Stack Utilities
  console.log("\n🔧 Testing Stack Utilities:");
  console.log("Valid parentheses:", StackUtils.isValidParentheses("()[]{}"));
  console.log("Invalid parentheses:", StackUtils.isValidParentheses("([)]"));

  console.log(
    "Postfix evaluation:",
    StackUtils.evaluatePostfix("2 3 1 * + 9 -")
  );
  console.log(
    "Infix to postfix:",
    StackUtils.infixToPostfix("3 + 4 * 2 / ( 1 - 5 )")
  );

  console.log(
    "Next greater element:",
    StackUtils.nextGreaterElement([2, 1, 2, 4, 3])
  );
  console.log(
    "Largest rectangle:",
    StackUtils.largestRectangleArea([2, 1, 5, 6, 2, 3])
  );
  console.log(
    "Trap water:",
    StackUtils.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
  );

  console.log("Generate parentheses:", StackUtils.generateParentheses(3));
  console.log("Remove duplicates:", StackUtils.removeDuplicates("bcabc"));
  console.log("Decode string:", StackUtils.decodeString("3[a]2[bc]"));

  // Test Browser History
  console.log("\n🌐 Testing Browser History:");
  const browser = new BrowserHistory("google.com");
  browser.visit("facebook.com");
  browser.visit("youtube.com");
  console.log("Current:", browser.getCurrentUrl());
  console.log("Back 1:", browser.back(1));
  console.log("Forward 1:", browser.forward(1));

  // Test Text Editor
  console.log("\n📝 Testing Text Editor:");
  const editor = new TextEditor();
  editor.type("Hello");
  editor.type(" World");
  console.log("Content:", editor.getContent());
  editor.undo();
  console.log("After undo:", editor.getContent());
  editor.redo();
  console.log("After redo:", editor.getContent());

  // Test Call Stack
  console.log("\n📞 Testing Call Stack:");
  const callStack = new CallStack();
  callStack.call("main", []).call("helper", [1, 2]).call("inner", [3]);
  console.log("Current depth:", callStack.getDepth());
  callStack.return("result").return("success").return("done");
  console.log("Final depth:", callStack.getDepth());

  console.log("\n✅ All tests completed!");
}

// Run tests if this file is executed directly
if (typeof module !== "undefined" && require.main === module) {
  runTests();
}

// Export classes for use in other files
module.exports = {
  Stack,
  LinkedListStack,
  MinStack,
  MaxStack,
  FreqStack,
  StackUtils,
  BrowserHistory,
  TextEditor,
  CallStack,
};
