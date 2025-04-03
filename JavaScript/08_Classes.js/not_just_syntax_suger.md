# There are some difference with function that should know

### 1. First, a function created by class is labelled by a special internal property ``[[IsClassConstructor]]: true``. So it’s not entirely the same as creating it manually.

- Each function in JavaScript has an internal property called `[[IsClassConstructor]]`.
- For **functions created with** `class`, this property is set to `true`.
- This tells JavaScript that **Person named class** should behave differently than a regular function.
- Class must be called with `new` keyword.
- Classes do not get hoisted like functions

### 2. Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype".

- In regular objects, methods are enumerable, meaning they show up in loops
- But class methods are automatically non-enumerable to prevent accidental modifications or unintended looping.

### 3. Classes always use strict. All code inside the class construct is automatically in strict mode.

- Prevents accidental global variables

        undeclaredVar = 10; // ❌ Without "use strict", this would create a global variable!

- Disallows duplicate parameter names

        function sum(a, a) { // ❌ Allowed in normal mode
        return a + a;
        }

        class Math {
        sum(a, a) { } // ❌ SyntaxError in class (strict mode enabled)
        }

- No deleting var variables.

- `this` remains `undefined` in functions when not called on an object.