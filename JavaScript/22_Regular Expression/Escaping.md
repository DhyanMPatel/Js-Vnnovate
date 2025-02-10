# Escaping in "\ "

- There are other special characters as well, that have special meaning in a regexp, such as `[ { } ( ) \ ^ $ . | ? * +`.
- Also `/` need to escap if we use `/.../`.
- `]` no need to escap.

```js
console.log("Height: 5.8".match(/\d\.\d/)); // Return - 5.8

console.log("function f()".match(new RegExp("f\\(\\)", "i"))); // Return - f()
```

- When passing a string to `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.

# # Excaping in [...]

- `. + () : $` no need to escap.
- `^` no need to escap if it is any wher except `Begining`. e.g. `[^agc]` matches any char except `a,g,c`.
- `? * {} [ \\` no need to escap too.
- `-` (Hyphen) Must at end points not Between. e.g. `[a-z]` matches Range of `a` to `z`.
- `]` Required to escap. e.g. `[\]]` matches `]`.
- `\` Required to escap

- all special characters are allowed without escaping, except when they mean something for square brackets.
