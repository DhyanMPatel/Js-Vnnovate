# BackReference By Number: \N

- We need to find quoted strings: either single-quoted `'...'` or a double-quoted `"..."` – both variants should match.

```js
let str = `He said: "She's the one!".`;

let regexp = /(['"])(.*?)\1/g; // (*)

alert(str.match(regexp)); // "She's the one!"
```

- `(*)` there `\1` will find first group maching, means find `"`. till `(.*?)` go and if `"` found till result match.
- By the way BackReference by number `\N` will not work with non-capturing group `(?:...)`.

# BackReference By Name: `\k<name>`

- if group has name then we can BackRef by Name.

```js
let str = `He said: "She's the one!".`;
let regex = /(?<Quate>['"])(.*?)\k<Quate>/g; // (*)
alert(str.match(regex)); // Return - "She's the one!"
```

- find `Quate` match untile that repeate `(.*?)` pattern.
