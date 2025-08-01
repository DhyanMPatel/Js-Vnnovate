
## Node.js Architecture Diagram
    
![Nodejs Architecture Diagram](./NodeJS%20Architecture%20Diagram.png)

1. Components of the Node.js Architecture
    - **Requests**: Depending on the actions that a user needs to perform, the requests to the server can be either blocking (complex) or non-blocking (simple).
    - **Node.js Server**: The Node.js server accepts user requests, processes them, and returns results to the users.
    - **Event Queue**: The main use of Event Queue is to store the incoming client requests and pass them sequentially to the Event Loop.
    - **Thread Pool**: The Thread pool in a Node.js server contains the threads that are available for performing operations required to process requests.
    - **Event Loop**: Event Loop receives requests from the Event Queue and sends out the responses to the clients.
    - **External Resources**: In order to handle blocking client requests, external resources are used. They can be of any type ( computation, storage, etc).


    ![Work Flow of NodeJS Server Architecture](./Workflow%20of%20NodeJS%20Server%20Architecture.png)

### Why Event Loop is important?

- The Event Loop is essential in Node.js because it `allows non-blocking`, `asynchronous operations` to be handled efficiently, even though Node.js operates on a **single thread**.

    - Enables non-blocking execution despite Node.js being single-threaded.
    - Helps handle I/O-bound tasks efficiently.
    - Makes Node.js suitable for scalable applications like web servers.

![Event Loop](./Event%20Loop.png)

- How It Works:
    - The event loop processes tasks in phases, handling timers, I/O callbacks, and other events.
    - Key phases:
        - **Timers**: Executes setTimeout and setInterval callbacks.
        - **Pending Callbacks**: Handles I/O callbacks (e.g., file read completed).
        - **Poll**: Retrieves new I/O events; executes callbacks for completed I/O.
        - **Check**: Executes setImmediate callbacks.
        - **Close**: Handles cleanup (e.g., closing sockets).
    - The loop runs as long as there are tasks to process.

    ![Event behind the Seen](./Event%20behind%20the%20seen.png)

- How to exit Event loop?
    ```js
    process.exit()
    ```
    - `Process exit` basically hard exited our event loop means close our server and gave control back to our terminal or simply press `CTRL + C` in same terminal where we run our server.
    - without import anything


### 4. Key Components
- Node.js’s architecture relies on several components:
    - **V8 Engine**:
        - Google’s JavaScript engine, compiles JavaScript to machine code for speed.
        - Same engine used in Chrome (from Topic 1’s browser comparison).
    - **libuv**:
        - C library that handles asynchronous I/O and the event loop.
        - Manages file operations, network requests, and thread pool tasks.
    - **Thread Pool**:
        - A small pool of background threads (managed by libuv) for tasks that can’t be non-blocking (e.g., file system operations on some OSes).
        - Example: `fs.readFile` may use the thread pool, but the main thread remains free.
    - **Node.js Bindings**:
        - Connects V8 and libuv, enabling JavaScript to interact with system-level operations.

### Behind the seen of actual Work flow

![Actual Work flow](./Actual%20Work%20flow.png)

### Now Know whole Work flow of Backend.
- Explore Assignment 1 which is at Node Core Modules folder
- In Assignment 1, We `create server`, `make 2 routes` through provide route to middleware in same file, pass data from one route to another route.

[Assignment 1](../Node%20Core%20Modules/practice%201/intro.md)


# Note : Now Deep dive to improved Development Workflow and Debugging

[Improved Development Workflow and Debugging](../ImprovedDevelopment/intro.md)