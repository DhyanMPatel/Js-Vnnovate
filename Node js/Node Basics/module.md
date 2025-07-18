# Module

- modules play an important role in `organizing`, `structuring`, and `reusing code` efficiently.
- `A module is a self-contained block of code that can be exported and imported into different parts of an application.`
- This modular approach helps developers manage large projects, making them more scalable and maintainable.

#### Modules can contain

    - Variables
    - Functions
    - Classes
    - Objects

## Type of Modules

- Node provides two primary module systems

### 1. ES6 Modules

- ES6 Modules offer a modern and standardized way to structure NodeJS applications.
- Unlike CommonJS, ESM uses `import`/`export` instead of `require`/`module.exports`.

  - Uses `import` to import modules.
  - Uses `export` to export functions, objects, or variables.
  - Modules are loaded `asynchronously`, allowing better performance.
  - Requires `"type": "module"` in package.json.

- Use Cases of ES6 Modules

  1. Default Export and Import

     - The default export allows a module to `export a single` `function`, `object`, or `class` `as its main functionality`.
     - When importing, the `name can be customized`, making it `more flexible than named exports`.

       ```js
       // greet.js
       export default function greet(name) {
         return `Hello, ${name}!`;
       }

       // app.js
       import greet from "./greet.js";
       console.log(greet("Node.js"));
       ```

  2. Named Exports with Aliases

     - Named exports `allow multiple` `functions`, `objects`, or `variables` to be exported `from a single module`.
     - Unlike default exports, named exports `must be imported using the exact name` they were exported with, `unless an alias is provided during import`.

       ```js
       // Operations.js
       export function multiply(a, b) {
         return a * b;
       }
       export function divide(a, b) {
         return a / b;
       }

       // app.js
       import { multiply as mul, divide as div } from "./operations.js";
       console.log(mul(6, 3));
       console.log(div(10, 2));
       ```

  3. Dynamic Imports

     - Dynamic imports allow JavaScript to `load modules at runtime`, rather than at the start of execution.
     - This is `useful` for `optimizing performance`, `reducing` `initial load times`, and `conditionally loading modules` `only when needed`.

       ```js
       /// math.js
       export function add(a, b) {
         return a + b;
       }

       export function multiply(a, b) {
         return a * b;
       }
       ```

       ```js
       /// app.js
       async function loadMathModule() {
         const math = await import("./math.js");

         console.log("Dynamic Imports: ");
         console.log("Addition:", math.add(5, 3));
         console.log("Multiplication:", math.multiply(4, 3));
       }

       loadMathModule();
       ```

  4. Combining Default and Named Exports

     - ES6 modules allow exporting both `default` and `named exports` in the `same module`.
     - This provides flexibility when structuring code, making it easier to organize reusable functions, objects, and classes while keeping a primary export as the default.

       ```js
       /// Person.js
       export default class Person {
         constructor(name) {
           this.name = name;
         }
         sayHello() {
           return `Hello, I am ${this.name}`;
         }
       }
       export const greet = (name) => `Hi, ${name}!`;

       /// app.js
       import Person, { greet } from "./person.js";

       const user = new Person("Aman");
       console.log(user.sayHello());
       console.log(greet("Rohan"));
       ```

### 2. CommonJS Modules (CJS)

- CommonJS is the default module system used in NodeJS.
- It enables code modularity by allowing developers to export and import functions, objects, or variables using `module.exports` and `require()`.

  ```jsx
  //import 
  const module1 = require('./module1');

  //export
  module.exports = { module1, module2, ... };
  ```

- How Common JS works?

  - Uses `require()` to import modules.
  - Uses `module.exports` to export functions, objects, or variables.
  - Modules are loaded `synchronously`, meaning execution waits until the module is fully loaded.- It is default in NodeJS, but not natively supported in browsers.
  - `Each module` `runs in its own scope`, preventing variable conflicts.

- Use Cases of CommonJS Modules
  1. Creating a Utility Module
  2. Building a Configuration File
  3. Handling Routes in an Express App

# Note : Now know about Global Objects

[Global Objects are accessible without install](./Global%20Objects.md)