# Anchors

- String start(`^`), end(`$`)
- The caret `^` matches at the beginning of the text, and the dollar `$` – at the end.
- Anchors have “zero width”
- `/^$/` - An empty string is the only match: it starts and immediately finishes.

```js
let str1 = "Mary had a little lamb";
alert(/^Mary/.test(str1)); // true

alert(/lamb$/.test(str1)); // true
```

# Multiline Mode with Anchors

- To enable Multiline mode use `m` flag.

```js
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

console.log(str.match(/^\d/gm));
```

- we can perform some tasks like,
  - Searching at line start ^
  - Searching at line end $
  - Searching for \n
