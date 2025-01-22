# Browser Environment

- Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

  ![Root Object](./Screenshot%20from%202025-01-22%2016-37-30.png)

- root `window` has 2 role:

  1. It is a global object for JavaScript code
  2. It represents the “browser window” and provides methods to control it.

  ```js
  function sayHi() {
    alert(`Hii!`);
  }
  window.sayHi();

  window.innerHeight; // Return - 654 inner window height
  ```

## DOM

- [Document Object Model]
- Represent all page content as Objects that can be modified
- The `document` object is the main “entry point” to the page
- DOM is not only for browsers, non-browser instruments that use DOM too
- CSSOM (CSS Object Model) for styling

## BOM

- [Browser Object Model]
- Represent additional object provided by the browser for working with everything except the document
- `navigator` Object provide background information like `navigator.plateform` provide current OS (linux/window/mac).
- `location` Object allow us to read the current URL and can redirect the browser to a new one.
