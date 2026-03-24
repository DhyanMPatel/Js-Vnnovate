# Execution Context & Call Stack

A structured reference for understanding JavaScript execution models, scoping, hoisting, closures, and related advanced concepts.

---

## Table of Contents

- [Doubts & Clarifications](#doubts--clarifications)
- [Code Examples](#code-examples)
- [Keywords & Concepts](#keywords--concepts)
- [Advanced Patterns](#advanced-patterns)

---

## Doubts & Clarifications

| #   | Doubt                                                     | Clarification     | Status  |
| --- | --------------------------------------------------------- | ----------------- | ------- |
| 1   | How are **lexical scope** and **global scope** different? | _Add answer here_ | Pending |

---

## Code Examples

### Example 1: Variable Shadowing in Nested Functions

```javascript
var a = 10;
function outer() {
  function inner() {
    console.log(a); // undefined (not 10!)
  }
  var a = 20; // shadows global `a` within outer's scope
  inner();
}
outer();
```

**Key Learning:**

- `var a = 20` is hoisted to the top of `outer()`'s scope
- Inner function looks up `a` in outer's scope first (lexical scoping), finds hoisted `undefined` before reaching global `a = 10`

---

### Example 2: Lexical Scope - Function Defined in Global Scope

```javascript
var x = 10;
function foo() {
  console.log(x, "Foo"); // 10 "Foo"
}

function bar() {
  var x = 20;
  return foo;
}
bar()();
```

**Key Learning:**

- `foo()` was **defined** in global scope, so it always looks for `x` in global scope
- Even though `bar()` calls `foo()` and has its own `x = 20`, `foo()` still logs `10` from global
- **Scope is determined where function is written, not where it is called**

---

### Example 3: Lexical Scope - Function Defined Inside Another Function

```javascript
// Replace all "OR" with actual code
var x = 10;
function outer() {
  function inner() {
    console.log(x, "outer"); // 20 "outer"
  }
  var x = 20;
  return inner; // OR return inner();
}
outer()(); // OR outer();
```

**Key Learning:**

- `inner()` was **defined** inside `outer()`, so it looks for `x` in `outer()`'s scope
- Even though `outer()` finishes executing before `inner()` is called, `inner()` still remembers `x = 20`
- This demonstrates the **closure** behavior that comes from lexical scoping

---

## Keywords & Concepts

### Scope & Binding

| Keyword/Concept                          | Definition                                                                                                                                                                                     | Example                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Variable Shadowing / Scope Shadowing** | If a variable exists in local scope, it shadows the global variable — even if it's `undefined` at the time of access.                                                                          | `var a = 10; function f() { console.log(a); var a = 20; } f(); // undefined` |
| **Lexical Scope**                        | A function remembers the scope where it was **defined**, not where it was **called**. Scope is determined at write-time, not run-time. JavaScript is lexically scoped, not dynamically scoped. | See Examples 2 & 3 below                                                     |
| _Add more here..._                       |                                                                                                                                                                                                |                                                                              |

### Execution Context

| Keyword/Concept | Definition   | Notes   |
| --------------- | ------------ | ------- |
| _Add keyword_   | _Definition_ | _Notes_ |

### Call Stack

| Keyword/Concept | Definition   | Notes   |
| --------------- | ------------ | ------- |
| _Add keyword_   | _Definition_ | _Notes_ |

---

## Advanced Patterns

### Pattern 1: _Pattern Name_

```javascript
// Code example
```

**When to use:**
**Gotchas:**

---

## Quick Reference Templates

Use these templates to add new content consistently:

### Template: New Doubt

```markdown
| #   | Doubt             | Clarification | Status           |
| --- | ----------------- | ------------- | ---------------- |
| N   | **Question here** | _Answer here_ | Pending/Resolved |
```

### Template: New Code Example

````markdown
### Example N: [Descriptive Title]

```javascript
// Code here
```
````

**Key Learning:**

- Point 1
- Point 2

````

### Template: New Keyword
```markdown
| **Keyword Name** | Definition here | Example/Notes |
````

### Template: New Pattern

````markdown
### Pattern N: [Pattern Name]

```javascript
// Code here
```
````

**When to use:**
**Gotchas:**

```

---

*Last Updated: [Date]*
```
