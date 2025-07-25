# Node Core Modules

## HTTP Module

- Node.js includes a powerful `built-in HTTP module` that enables to **create HTTP servers** and **make HTTP requests**.

- **Purpose**: Create HTTP servers and handle requests and responses comes from clients.
- **Key Methods**:
  - `http.createServer((req, res) => {...})`: Creates a server.
  - `req`: Request object (URL, method, headers).
  - `res`: Response object (set headers, send data).

- **Syntax** : 
  - You can explicitly use function call or anonymous function or Arrow function.
  ```js
  import http from "http";
  const server = http.createServer(requestListener)

  server.listen(port, callback);
  ```
  - The `requestListener` is a function which receive `request` and `response` objects. request and response objects are `built-in` provided by Node.js.

- **Example**:

  ```js
  import http from "http";

  const explicitFunction = (req, res) => {
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  }

  const explicitServer = http.createServer(explicitFunction); // Explicit function call

  const anonymousServer = http.createServer(function (req, res) { // Anonymous function
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  });
  
  const arrowServer = http.createServer((req, res) => { // Arrow function
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  });

  explicitServer.listen(3001, () => console.log("Server on http://localhost:3001"));
  anonymousServer.listen(3002, () => console.log("Server on http://localhost:3002"));
  arrowServer.listen(3000, () => console.log("Server on http://localhost:3000")); 
  ```

- **Use Case**: Build REST APIs or serve static content.

### Request and Response Object

- **Request Object**: 
    - `req.url`: URL of the request.
    - `req.method`: HTTP method (GET, POST, etc).
    - `req.headers`: Request headers.
    - `req.query`: Query parameters (e.g., `?name=John`).
    - `req.body`: Request body (for POST/PUT requests).
    - `req.on("data", (chunk) => {...})`: Listen for data events. parameters are `event name` and `callback function`.


- **Response Object**: 
    - `res.writeHead`: Set response headers (but less flexible). parameters are `status code` and `headers`.
    - `res.setHeader`: Set response headers (more flexible). parameters are `header name` and `header value`.
    - `res.write`: Send data to the client.
    - `res.end`: End the response.
    - `res.statusCode`: Set HTTP status code.


## Fs Module

- **Purpose**: Read, write, and manage files and directories.
- **Key Methods**:
  - `fs.readFile`/`fs.promises.readFile`: Read files (async). parameters are `file name`, `encoding` and `callback function`.
  - `fs.writeFile`/`fs.promises.writeFile`: Write files. parameters are `file name`, `data`, `encoding` and `callback function`.
  - `fs.readdir`: List directory contents.
  - `fs.mkdir`: Create directories.
- **Example**:
  ```js
  import fs from "fs/promises";
  async function readFileAsync() {
    try {
      const data = await fs.readFile("message.txt", "utf8");
      console.log(data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
  readFileAsync();
  ```
- **Use Case**: Read config files, log data, or serve static files.


## Path Module

- **Purpose**: Handle file paths cross-platform (e.g., Windows uses `\`, Unix uses `/`).
- **Key Methods**:
    - `path.join`: Combine path segments.
    - `path.resolve`: Get absolute path.    /// Or `fileURLToPath(import.meta.url)`
    - `path.dirname`: Get directory of a file.
- **Example**:
    ```js
    import path from 'path';
    import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'message.txt');
    ```
- `Use Case`: Ensure paths work across operating systems.

## URL Module

- Purpose: Parse and format URLs.
- Key Methods:
    - `url.parse`: Break down a URL into components (host, path, query).
    - `new URL`: Modern way to parse URLs (ES Modules).
- Example:
    ```js
    import {URL} from 'url';
    
    const myURL = new URL("http://example.com:3000/path?name=John");
    console.log(myURL.pathname); // /path
    console.log(myURL.searchParams.get("name"));
    ```
- **Use Case**: Handle query parameters in APIs.

## Events Module

- Purpose: Create event-driven systems using EventEmitter.
- Key Methods:
    - `on`: Listen for events.
    - `emit`: Trigger events.
- Example:
    ```js
    import {EventEmitter} from 'events';

    const emitter = new EventEmitter();
    emitter.on("greet", (name) => console.log(`Hello, ${name}!`))
    emitter.emit("greet", "Node.js")
    ```
- **Use Case**: Build real-time apps (e.g., chat systems).

## OS Module

- Purpose: Access operating system information.
- Key Methods:
    - `os.cpus`: Get CPU info.
    - `os.totalmem`: Get total memory.
    - `os.platform`: Get OS type (e.g., 'linux', 'win32').
- Example:
    ```js
    import os from 'os';
    console.log('CPUs:', os.cpus().length);
    console.log('Total Memory:', os.totalmem() / 1024 / 1024, 'MB');
    ```
- **Use Case**: Monitor server resources.


# Note : Now learn Basic Concept of Node

[Basic Concept like module, Global Objects](../Node%20Basics/module.md)