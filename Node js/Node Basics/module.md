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

     - Named exports `allow multiple functions`, `objects`, or `variables` to be exported `from a single module`.
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

#### **Features** of ECMAScript Modules in Node.js

- **Named Exports**: Export multiple variables, functions, or classes from a module using named exports.
- **Default Exports**: Export a single variable, function, or class as the default export.
- **Importing**: Import named exports or the default export from other modules.
- **Asynchronous Module Loading**: Use dynamic imports (import() syntax) for loading modules asynchronously.

#### **Differences** from CommonJS
  1. **Syntax**: Use `import` and `export` keywords instead of `require` and `module.exports`.
  2. **Scope**: `ECMAScript Modules` are **scoped to the file** (`similar to ES6 modules` in the browser), while `CommonJS modules` are **evaluated synchronously** and **share a global module scope**.
  3. **Static Analysis**: `ECMAScript Modules` allow for more efficient static analysis and optimization by the JavaScript engine.

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

     - A utility module is a collection of reusable helper functions that simplify coding by handling common tasks like **string manipulation**, **date formatting**, **number calculations**, **logging**, and **error handling**.

       ```js
       /// utils.js
       export function add(a, b) {
         return a + b;
       }

       export function multiply(a, b) {
         return a * b;
       }

       export function capitalize(str) {
         return str.charAt(0).toUpperCase() + str.slice(1);
       }

       export function reverseString(str) {
         return str.split("").reverse().join("");
       }

       /// app.js
       import { add, multiply, capitalize, reverseString } from "./utils.js";

       console.log("Utility Module Output:");
       console.log("Addition:", add(10, 5));
       console.log("Multiplication:", multiply(6, 3));
       console.log("Capitalized:", capitalize("hello"));
       console.log("Reversed String:", reverseString("Node.js"));
       ```

  2. Building a Configuration File

     - A configuration file in NodeJS is used to store **application settings**, **environment variables**, **API keys**, **database credentials**, and other configurable options.

      ```js
      /// Config.js
        const config = {
            appName: "My Node.js App",
            port: 3000,
            databaseURL: "mongodb://localhost:27017/mydatabase",
            apiKey: "1234567890abcdef",
        };

        export default config;

        /// app.js
        import config from './config.js';

        console.log("Building a Configuration File Output:");
        console.log("Application Name:", config.appName);
        console.log("Server running on port:", config.port);
        console.log("Database URL:", config.databaseURL);
        console.log("API Key:", config.apiKey);
      ```

  3. Handling Routes in an Express App

     - Routing is a crucial part of any web application as it defines how the application responds to client requests for different URLs. In Express.js, routing enables us to handle `HTTP` requests like **GET**, **POST**, **PUT**, **DELETE**, and more.

     ```js
      /// routes.js
      const express = require('express');
      const router = express.Router();

      router.get('/', (req, res) => res.send('Home Page'));

      module.exports = router;


      /// app.js
      const express = require('express');
      const app = express();
      const routes = require('./routes');

      app.use('/', routes);
      app.listen(3000, () => console.log('Server running on port 3000'));
     ```
#### Module Caching in NodeJS
- When a module is loaded using `require()`, NodeJS caches it, preventing repeated loading and improving performance.`

```js
require('./greet'); // First time - Loads module
require('./greet'); // Second time - Uses cached version

// To clear cache, use
delete require.cache[require.resolve('./greet')];
```

## Why Use Modules in NodeJS?

- Using modules provides several benefits like,

  1. **Separation of Concerns**: Keeps code `modular` and `well-structured`.
  2. **Reusability**: `Code can be reused` across multiple files or projects
  3. **Encapsulation**: `Avoids global scope` pollution by keeping variables local.
  4. **Maintainability**: `Smaller`, `independent modules` make debugging easier.
  5. **Performance Optimization**: `Cached modules` improve execution speed.

# Note : Now know about Global Objects

[Global Objects are accessible without install](./Global%20Objects.md)
