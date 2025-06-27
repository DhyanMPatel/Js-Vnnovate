# Node Core Modules

## HTTP Module

- Node.js includes a powerful `built-in HTTP module` that enables to **create HTTP servers** and **make HTTP requests**.

- **Purpose**: Create HTTP servers and clients to handle requests and responses.
- **Key Methods**:
  - `http.createServer((req, res) => {...})`: Creates a server.
  - `req`: Request object (URL, method, headers).
  - `res`: Response object (set headers, send data).
- **Example**:

  ```js
  import http from "http";
  const server = http.createServer((req, res) => {
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  });
  server.listen(3000, () => console.log("Server on http://localhost:3000"));
  ```

- **Use Case**: Build REST APIs or serve static content.

## Fs Module

- **Purpose**: Read, write, and manage files and directories.
- **Key Methods**:
  - `fs.readFile`/`fs.promises.readFile`: Read files (async).
  - `fs.writeFile`/`fs.promises.writeFile`: Write files.
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