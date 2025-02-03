# Word Boundary

- A Word Boundary [`\b`] is a test, like `^` and `$`.
- it checks that the position in the string is a word boundary.

- There are three different positions that qualify as word boundaries:

  - `at String Start`
  - `Between char in the String`
  - `At String End`

  ```js
  console.log("Hello, Java!".match(/\bJava\b/)); // Java
  console.log("Hello, JavaScript!".match(/\bJava\b/)); // null
  ```

- We can use `\b` not only with words, but with digits as well.
- Word boundary `\b` doesn’t work for non-latin alphabets means doesn't work for Cryillic, Chines letters.
