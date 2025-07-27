# Global Object

- In NodeJS global objects are the objects that are accessible in the application from anywhere without explicitly using the import or require.

## Global
- The global object in NodeJS is `equivalent to the window` object in browsers.

    ```js
    global.a = 'This is a global variable';
    console.log(a);  // Accessible from anywhere in the application
    ```

## console
- The console object is used for printing messages to standard output (stdout) or error output (stderr).

    ```js
    console.log("This is a log message");
    console.error("This is an error message");
    ```

## process
- The process object in NodeJS provides information about the currently running NodeJS process.
- It allows to interact with the system, get details about the process, and control how the process runs.
- In simple terms, it helps you manage things like environment settings, command-line arguments, and how the application behaves during execution.

    ```js
    console.log("Process ID:", process.pid);
    console.log("Node.js Version:", process.version);
    ```

## Buffer
- The Buffer class is used to deal with binary data in NodeJS.
- It provides a way to handle raw binary data directly in memory, allowing you to manipulate binary files or network streams.

```js
const buffer = Buffer.from('Hello Node.js');
console.log(buffer);  // Outputs the binary representation
```

## __dirname & __filename

- __dirname -> directory name of the current module
- __filename => filename of the current module

```js
console.log(__dirname);  // Outputs the directory of the current file
console.log(__filename); // Outputs the full path of the current file
```


## setTimeout() & setInterval()

- setTimeout() -> Runs a function after a specified delay
- setInterval() -> Runs a function repeatedly at fixed intervals

```js
setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000);

setInterval(() => {
    console.log("This runs every 3 seconds");
}, 3000);
```


## URL & URLSearchParams
- URL is used to handle URL-related operations. 
- URLSearchParams helps with manipulating URL query parameters.

```js
const myUrl = new URL('https://www.example.com/?name=Dhyan');

console.log(myUrl.searchParams.get('name'));
myUrl.searchParams.append('age', '20')

console.log(myUrl.href);
```

## TextEncoder & TextDecoder
- These classes are used for encoding and decoding text in various encodings, such as `UTF-8`.
- They are useful for working with `string data` that needs to be converted to binary or vice versa.

```js
const encoder = new TextEncoder();
const encoded = encoder.encode("Hello, Node.js!");
console.log(encoded);  // Outputs a Uint8Array of encoded text
```

# NOte : Now understand the flow of web 

[How Web Works](./Web%20work.md)