# Improved Development Workflow and Debugging

- To Create Node Project

```js
npm init
```

## Global Features, Core Modules and Third-party Modules

- **Global Features** : These are the features which are available globally in Node.js.

    - There are several global features in Node.js.
    - There no need to import them.
    - Several examples of global features like,
        - `__dirname` : It returns the directory name of the current module.
        - `__filename` : It returns the file name of the current module.
        - `console` : It is used to print output to the console.
        - `process` : It is used to get the process information.
        - `require` : It is used to import modules.
        - `module` : It is used to get the module information.
        - `exports` : It is used to export the module.

    ```js
    console.log(__dirname);
    console.log(__filename);
    ```

- **Core Modules** : There are the modules which needs to import to use them.
    - Core modules are the modules which are built-in modules of Node.js.
    - Several modules like `fs`, `http`, `path`, `os`, `events` etc are core modules.

    ```js
    const fs = require('fs');
    const http = require('http');
    const path = require('path');
    const os = require('os');
    const events = require('events');
    ```


- **Third-party Modules** : These are the modules which are not built-in modules of Node.js.
    - Several modules like `express`, `nodemon`, `dotenv` etc are third-party modules.
    - These modules need to install using `npm install` to use them.

    ```bash
    npm install express
    npm install nodemon --save-dev
    npm install --save express-session
    ```

    ```js
    const express = require('express');
    const session = require('express-session');
    ```

## Types of Errors

- **Syntax Errors** : These are the errors which are due to syntax errors in the code.
    - These errors are easy to find.
    - These errors which should automatically be thrown when we try to run Project.
    - These errors like, 
        - Mismatch of brackets, semicolons, etc.
        - Missing character, etc.
        - Extra character, etc.

- **Runtime Errors** : These are the errors which are due to runtime errors in the code.
    - These errors can be found after we try to run Project.

- **Logical Errors** : These are the errors which are due to logical errors in the code.
    - These errors are hard to identify.
    - These not cause error message.

    - Example :
        ```js
        req.on("end", () => {
            const parsedData = Buffer.concat(body).toString();
            console.log(parsedData.split("=")[0]); // Actually we want value.
                // But we are getting key. Which is logical error.

            fs.writeFile("user.txt", parsedData, (err) => {
                if (err) {
                    res.writeHead(302, { "Content-type": "text/plain", "Location": "/fail" })
                    return res.end()
                } else {
                    res.writeHead(302, { "Content-type": "text/plain", "Location": "/success" })
                    return res.end()
                }
            })
        })
        ```

## Debugger

- There is an inbuilt debugger in Node.js.
- There is an **Run** tab and there is **Start Debugging** button or `F5` to start debugger where we can mark to any line of code so easily identify value of variable or function etc.