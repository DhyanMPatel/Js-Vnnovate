# Error Handling

- Error handling is a mandatory step in application development.
- A Node.js developer may work with both **synchronous** and **asynchronous** functions simultaneously.
- Handling errors in asynchronous functions is important because their behavior may vary, unlike synchronous functions.

## How to Handle Errors in Node?
- There are many approaches to handle errors in Node js like
    1. try-catch
    2. callback functions
    3. promises
    4. async-await

- **Note** : `Try-catch is synchronous` means that if an asynchronous function throws an error in a synchronous try/catch block, no error throws.

### 1. Using Try-Catch block

- The `try-catch block` can be used to handle errors thrown by a block of code.
- `Try-catch block` is synchronous. Meaning It can handle synchronous error only.

    ```js
    function dosomething() {
        throw new Error(
            'a error is thrown from dosomething');
    }

    function init() {
        try {
            dosomething();
        }
        catch (e) {
            console.log(e);
        }
        console.log(
            "After successful error handling");
    }
    init();
    ```

### 2. Using Callback functions
- A callback is a function `called at the completion` of a certain task
- It prevents any blocking and allows other code to be run in the meantime.
- Example : 
    - The program does `not wait for the file reading` to complete and proceeds to print "**Program Ended**" while continuing to read the file. If any error occurs like the `file does not exist` in the system then the `error is printed after "Program Ended"`.

    ```js
    const fs = require("fs");

    fs.readFile('foo.txt', function (err, data) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(data.toString());
        }
    });

    console.log("Program Ended");


    /// Output:
    
    // Program Ended
    // [Error: ENOENT: no such file or directory, 
    // open 'C:\Users\User\Desktop\foo.txt'] {
    // errno: -4058,
    // code: 'ENOENT',
    // syscall: 'open',
    // path: 'C:\\Users\\User\\Desktop\\foo.txt'
    // }
    ```

### 3. Using promises and promise callbacks

- Promises are an **enhancement to Node.js callbacks**. When defining the callback, the value which is returned is called a **promise**.
- The key difference between a promise and a callback is the `return value`. There is `no concept of a return value in callbacks`.

- key points must know about promises
    - In order to use promises, the promise module must be installed and imported into the application.
    - The `.then` clause handles the output of the promise.
    - If an error occurs in any `.then` clause or if any of the promises above are rejects, it is passed to the immediate `.catch` clause.
    - In case of a promise is rejected, and there is no error handler then the program terminates.


    ```js
    const Promise = require('promise');
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost/TestDB';
    MongoClient.connect(url)
        .then(function (err, db) {
            db.collection('Test').updateOne({
                "Name": "Joe"
            },
                {
                    $set: {
                        "Name": "Beck"
                    }
                });
        })
        .catch(error => alert(error.message))
    ```
    ```bash
    # Output

    # In this case we assume the url is wrong
    MongoError: failed to connect to server [localhost:27017]
    # error message may vary
    ```

### 4. Using async-await

- Async-await is a special syntax to work with promises in a simpler way that is easy to understand.
- Async-await can also be wrapped in a try-catch block for error handling.

    ```js
    async function f() {
        let response = await fetch('http://xyz.url');
    }
    // f() becomes a rejected promise
    f().catch(alert);
    ```
    ```bash
    # the url is wrong //
    TypeError: failed to fetch 
    ```

# Note : Now know about Architecture Diagram

[Node Architecture Diagram to handle task async](../Node%20Architecture/Architecture_Diagram.md)


