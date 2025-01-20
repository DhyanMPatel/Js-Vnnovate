# Module

- Module is just a file, One Script is one Module.
- Module may contain a class or a library of functions for a specific purpose.
- Eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.
- keywords

  1. Export
  2. Import

- Export file - to access outside medule

```js
export function sayHii(user) {
  console.log(`Hello ${user}`);
}
```

- Import file - to access that perticular module

```js
import { sayHii } from "./sayHi.js";
console.log(sayHii); // Function
sayHii("John"); // Return - Hello John
```

- In Browser, we make variable at window-level
- Module code evaluated only first time when imported
- `import.meta` contain information about current module
- `deffered modules` run after the HTML load
- `ragular modules` run before HTML load
- `async modules` run when ready, means independent from other script of HTML document

# External scripts

- External scripts with the same src run only once:
- In the browser, import must get either a relative or absolute URL. Modules without any path are called “bare” modules

## Notes

- top-level variables and functions from a module are not seen in other scripts. means both script can not share any data with each other untill they are connected with each other using `import` keyword
