# Express JS

### What is Express.js
- Express js is a `minimal and flexible` Node.js **framework** that provides a **robust set of features** to develop web and mobile applications.

- Simplifies `server-side coding` by **providing a layer** of fundamental web application features.
    1. `Built on Node.js` for **fast** and **scalable** server-side development.
    2. Simplifies `routing` and `middleware` handling for web applications.
    3. Supports building `REST APIs`, `real-time applications`, and `single-page applications`.
    4. Provides a `lightweight structure` for flexible and efficient server-side development.

#### Example

- the bellow example show how to handle Sever in Express JS

    ```js
    const express = require("express");

    const app = express();

    // Define a Route
    app.get("/", (req,res) => {
        res.send("Welcome to Express JS");
    })

    // Start the Server
    app.listen(3000, () => {
        console.log("Server is Running on http://localhost:3000 port...");
    })
    ```

### Need of Express.js

- **Simplifies Server Creation**: Helps in `quickly setting up and running a web server` without the need for complex coding.

- **Routing Management**: Provides a `powerful routing mechanism` to handle URLs and HTTP methods effectively.

- **Middleware Support**: Allows the `use of middleware functions to handle requests, responses`, and any middle operations, making code **module** and **maintainable**.

- **API Development**: Facilitates the creation of `RESTful APIs with ease`, allowing for the development of scalable and maintainable web applications.

- **Community and Plugins**: Provides access to a vast community of developers and plugins, making it easier to find solutions and extend functionality.

### Installing Express.js
- installation process of Express js in Node js project
    ```bash
    # If install Express permanently (inside Dependencies)
    npm install express
    #   OR
    npm install --save express

    # If install Express temporarily (inside DevDependencies)
    npm install --save-dev nodemon
    #   OR
    npm install nodemon --save-dev
    ```

    ```javascript
    // Then you can require express package 
    const express = require('express');
    const app = express();
    ```

### Adding Middleware
- `Middleware` are the functions which are executed before the request reaches the route.
- `app.use()` is used to add middleware.

    ```js
    app.use((req,res, next) => {
        console.log("Middleware");
        next();
    })

    // Middleware can be route specific
    app.use("/route", (req,res, next) => {
        console.log("Middleware");
        res.send("Middleware 1 can pass response") // If i write this then it will not execute bellow code
        next();
    })
    ```
    - `next()` is used to pass control to the next middleware function. `next()` is optional.
    - `res.send()` is work as `res.write()` and `res.writeHead()` because **res.send() automatically set Header**.
- **Note** : Most specific Middleware set first and least specific MiddleWare set at last. Because `Middleware` are executed in the order they are defined.   

### [Assignment 2 (use of ``middleware``, `routes`, `Serve Static files` such as **.js**, **.css**, etc.) ](./Assignement%202/ReadMe.md)


### Sending Response

### Express DeepDive

### Handling Routes

### Wrap up

- This is a whole summery of Learning Basic Express js

![Basic Express Wrap up](./Basic%20Express%20wrap%20up.png)

## Note :

- Go Back to Improved Development

[Improved Development Workflow and Debugging](../../ImprovedDevelopment/intro.md)

- Go Next Topic is Working with Dynamic Content & Adding Template Engines

[Dynamic Content & Template](../Dynamic%20Content%20&%20Template%20Engine/intro.md)