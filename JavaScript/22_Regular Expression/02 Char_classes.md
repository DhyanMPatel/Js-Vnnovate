# Character Classes

- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

```js
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert(str.match(regexp)); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert(str.match(regexp).join("")); // 79031234567
```

- Most used are:

- [`\d`] (“d” is from “digit”)
  - A digit: a character from 0 to 9.
- [`\s`] (“s” is from “space”)
  - A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.
- [`\w`] (“w” is from “word”)
  -A “wordly” character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.

Ex:- `\d\s\w` means a “digit” followed by a “space character” followed by a “wordly character”, such as `1 a`.

```js
let str = "Is there CSS4?";
let regexp = /CSS\d/;

alert(str.match(regexp)); // CSS4

alert("I love HTML5!".match(/\s\w\w\w\w\d/)); // ' HTML5'
```

# Invert Classes

- [`\D`]
  - Non-digit: any character except `\d`, for instance a letter.
- [`\S`]
  - Non-space: any character except `\s`, for instance a letter.
- [`\W`]

  - Non-wordly character: anything but `\w`, e.g a non-latin letter or a space.

- find non-digit and remove from the string

```js
let str = "+7(903)-123-45-67";

console.log(str.replace(/\D/, "")); // Return - 79031234567
```

# dot "."

- A dot `.` is a special character class that matches “any character except a `newline`”.
- dot means `“any character”`, but not the `“absence of a character”`.
- By default, a `dot` doesn’t match the newline character `\n`.

```js
console.log("Z".match(/./)); // Return - Z

let regexp = /CS.4/;
alert("CSS4".match(regexp)); // Return - CSS4
alert("CS-4".match(regexp)); // Return - CS-4
alert("CS 4".match(regexp)); // Return - CS 4 (space is also a character)
alert("cs4".match(regexp)); // Return - null
alert("A\nB".match(/A.B/)); // null (no match)
alert("A\nB".match(/A.B/s)); // A\nB (s make pattern dotable)

alert("1 - 5".match(/\d-\d/)); // null, no match!
alert("1 - 5".match(/\d - \d/)); // 1 - 5, now it works
// or we can use \s class:
alert("1 - 5".match(/\d\s-\s\d/)); // 1 - 5, also works
```


## Go back to Pattern Flag

- [Pattern Flag](./01%20pattern_flag.md)

## Now Learn about Unicode: flag "u" and class \p{...}

- [Unicode: flag "u" and class \p{...}](./03%20Unicodeu_classp.md)