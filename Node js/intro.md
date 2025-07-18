# Topic 1: Introduction to Node.js

## What is Node.js?

- Node.js is a JavaScript runtime built on Chrome’s `V8 JavaScript engine`, which allows to run JavaScript code outside a web browser, typically on a `server`.
- It enables developers to use JavaScript for `server-side programming`, making it possible to build backend applications like `APIs`, `web servers`, or `real-time apps`.

    - **Runtime**: Node.js is not a programming language or framework; `it’s an environment that executes JavaScript code`.
    - **V8 Engine**: The `same engine used by Google Chrome` to run JavaScript in browsers, making Node.js fast and efficient.
    - **Server-Side**: Unlike traditional JavaScript (which runs in browsers to manipulate web pages), Node.js handles server tasks like `file operations`, `database interactions`, and `HTTP requests`.

## Why Node.js?

- Node.js is popular for backend development due to its unique features:

    1. **Non-Blocking I/O** : Node.js uses `asynchronous`, `non-blocking input/output operations`, meaning it can handle many tasks (e.g., reading files, making API calls) without waiting for one to finish before starting another.

    2. **Single-Threaded Event Loop** : Node.js runs on a single thread but `uses an event loop` to manage multiple tasks efficiently, making it lightweight.

    3. **Cross-Platform** : Works on Windows, macOS, and Linux.
    4. **Huge Ecosystem** : Comes with **`npm`** (Node Package Manager), which hosts millions of open-source libraries to extend functionality.
    5. **JavaScript Everywhere** : Js use for both frontend and backend.

## key features of Node.js

1. **Asynchronous and Event-Driven** : 
    - Node.js handles operations (e.g., reading files, network requests) `asynchronously` using **callbacks**, **promises**, or **async/await**.
    - Example: When reading a file, Node.js doesn’t wait; it moves to the next task and notifies when the file is ready.

2. **Lightweight and Scalable** :
    - Ideal for `I/O-heavy tasks` (e.g., APIs, streaming) but `not CPU-intensive tasks` (e.g., complex calculations).

3. **Built-In Modules** : 
    - Includes modules like `http`, `fs`, and `path` for common tasks without needing external libraries.
4. **Community and npm** :
    - Access thousands of packages (e.g., `Express.js`, `MongoDB drivers`) to speed up development.

## Use Cases of Node.js

- Node js shine in scenarios where speed and scalability are key.
    - **RESTful APIs** : Build APIs for web or mobile apps
    - **Real-Time Applications** : Chat apps, live notifications, or collaborative tools (e.g., `Slack`, `Trello`).
    - **Streaming Applications** : Video or audio streaming (e.g., `Netflix` uses Node.js for parts of its backend).
    - **Microservices** : Lightweight services in a larger system (e.g., `PayPal` uses Node.js).
    - **Command-Line Tools** : Build tools like npm or Yarn.

## Node.js vs. Other Technologies

- There are some comparison with Node.js
    - **Node.js vs. PHP**: Node.js is `asynchronous` and `JavaScript-based`; PHP is synchronous and better for traditional web pages.
    - **Node.js vs. Python (Django/Flask)**: Node.js is `faster for I/O tasks`; `Python is better for CPU-heavy tasks` like machine learning.
    - **Node.js vs. Java**: Node.js is `lighter and faster to develop`; Java is more robust for enterprise systems.

## Common Pitfalls for Beginners

- There are common pitfalls that all beginners do:
    - **Not Installing Node.js**: Ensure Node.js and npm are installed correctly.
    - **Blocking Code**: Avoid synchronous operations (e.g., fs.readFileSync) in servers, as they slow down Node.js.
    - **Port Conflicts**: If port 3000 is in use, you’ll get an error. Try another port (e.g., 3001).
    - **Old Tutorials**: Some tutorials use outdated Node.js versions. Stick to recent resources (2023–2025).

## Setup Environment

- Basic Terminal Commands to navigate and manage files :
    - `ls` (macOS/Linux) or `dir` (Windows): List files.
    - `cd folder`: Change directory.
    - `mkdir folder`: Create a folder.
    - `touch file.js` (macOS/Linux) or `echo. > file.js` (Windows): Create a file.
    - `rm file.js` (macOS/Linux) or `del file.js` (Windows): Delete a file.

## Comparison with Browsers

- Node.js and browser-based JavaScript both use JavaScript as their programming language, but they run in different environments with distinct purposes, capabilities, and APIs.

    1. Environment
        - **Browser JavaScript** : 
            - Runs in a web browser (e.g., Chrome, Firefox) inside a `sandboxed` environment.
            - Purpose: Manipulate web pages (`DOM`), handle user interactions (`clicks`, `forms`), and make HTTP requests (e.g., via `fetch`, `axios`).

        - **Node.js** :
            - Runs on a `server` or `local machine` as a standalone runtime.
            - Purpose: Handle server-side tasks like `file operations`, `database interactions`, and `HTTP servers`.

        - **Key Difference** : Browsers focus on client-side rendering and user interfaces; Node.js focuses on server-side logic and I/O operations.

    2. Available APIs
        - **Browser JavaScript** : Provides browser-specific APIs:
            - DOM: Manipulate HTML (`document.getElementById`, `document.querySelector`).
            - Window: Access browser features (`window.alert`, `window.location`).
            - Fetch/XMLHttpRequest: Make HTTP requests.
            - Web APIs: Canvas, WebGL, localStorage, etc.

                ```js
                /// Store data in the Browser
                localStorage.getItem('userName', "Dhyan");
                ```
            **Limitation** : `No direct access to the file system` or `low-level OS operations` due to security restrictions.

        - **Node.js** : Provides server-side APIs via core modules
            - **fs** : File system operations (e.g., `fs.readFile`).
            - **http** : Create servers and handle requests.
            - **path** : Manage file paths.
            - **os** : Access OS details (e.g., `os.cpus()`).
            - **events** : Event-driven programming.

                ```js
                import fs from 'fs';
                import path from 'path';
                import { fileURLToPath } from 'url';
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                fs.readFile(path.join(__dirname, 'message.txt'), 'utf8', (err, data) => {
                console.log(data);
                });
                ```
            **Limitation**: No DOM or browser APIs (`document`, `window`) unless you use libraries like `jsdom`.

        - **Key Difference** : Browser APIs are for web interfaces; Node.js APIs are for server tasks like file I/O and networking.

    3. JavaScript Engine
        - **Browser JavaScript** : 
            - Runs on the `V8 engine` (Chrome), `SpiderMonkey` (Firefox), or `JavaScriptCore` (Safari).
            - Optimized for rendering web pages and handling user events.
        
        - **Node.js** :
            - Runs exclusively on the `V8 engine`, same as Chrome, but outside the browser.
            - Optimized for server-side tasks like handling multiple connections or file operations.

        - **Key Difference** : Same core language (JavaScript), but Node.js extends `V8 with C++ bindings for system-level tasks`.
    
    4. Module Systems
        - **Browser JavaScript** : 
            - Uses ES Modules (`import`/`export`) natively in modern browsers.
            - Historically used `<script>` tags or module bundlers (e.g., `Webpack`).

                ```js
                import { someFunction } from './module.js';
                ```
        
        - **Node.js** :
            - Supports both CommonJS (`require`/`module.exports`) and ES Modules (`since Node.js v12+`).

                ```js
                /// CommonJS
                const fs = require('fs');

                /// ES Modules
                import fs from 'fs';
                ```
                Requires `"type": "module"` in **package.json** or **.mjs** extension for ES Modules.

        - **Key Difference** : Node.js supports both module systems; browsers primarily use ES Modules.
    
    5. Asynchronous Programming
        - **Browser JavaScript** : 
            - Asynchronous tasks (e.g., `setTimeout`, `fetch`) are managed by the browser’s event loop.

                ```js
                fetch('https://api.example.com/data')
                .then(response => response.json())
                .then(data => console.log(data));
                ```
        
        - **Node.js** :
            - Uses its own event loop for asynchronous tasks (e.g., `file reading`, `HTTP requests`).

                ```js
                import fs from 'fs';
                fs.readFile('message.txt', 'utf8', (err, data) => {
                if (err) console.error(err);
                else console.log(data);
                });
                ```

        - **Key Difference** : Both use event loops, but **Node.js handles server-side I/O** (`files`, `databases`) while **browsers handle client-side events** (`clicks`, `page loads`).
    
    6. Security and Access
        - **Browser JavaScript** : 
            - Runs in a **sandbox** with strict security restrictions (e.g., `no file system access`).
            - Limited by `CORS` (Cross-Origin Resource Sharing) for network requests.
        
        - **Node.js** :
            - Has full access to the system (`files`, `network`, `processes`), making it powerful but requiring careful security practices.

                ```js
                /// Write a file.
                import fs from 'fs';
                fs.writeFile('output.txt', 'Hello, Node.js!', err => {
                if (err) console.error(err);
                else console.log('File written!');
                });
                ```

        - **Key Difference** : Node.js has more power but requires you to handle security (e.g., sanitizing inputs).


# Note : Now learn Code Modules

[Code modules are Built-in modules of Node](./Node%20Core%20Modules/Intro.md)