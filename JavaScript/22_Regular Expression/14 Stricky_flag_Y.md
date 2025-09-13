# Stricky Flag `Y`

- The flag `y` allows to perform the search at the given position in the source string.
- There is one method `regexp.exec(str)`.

- `regexp.lastIndex` serves as a starting point for the search, that each `regexp.exec(str)` call resets to the new value (“after the last match”). That’s only if there’s g flag, of course.

  ```js
  let str = "let varName"; // Let's find all words in this string
  let regexp = /\w+/g;

  alert(regexp.lastIndex); // 0 (initially lastIndex=0)

  let word1 = regexp.exec(str);
  alert(word1[0]); // let (1st word)
  alert(regexp.lastIndex); // 3 (position after the match)

  let word2 = regexp.exec(str);
  alert(word2[0]); // varName (2nd word)
  alert(regexp.lastIndex); // 11 (position after the match)

  let word3 = regexp.exec(str);
  alert(word3); // null (no more matches)
  alert(regexp.lastIndex); // 0 (resets at search end)
  ```

- we want searching from perticular position. use `regexp.exec(str)` and `regexp.lastIndex`.
- `regexp.lastIndex` can change position of current `regexp.exec(str)`.

  ```js
  let str = 'let varName = "value"';

  let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

  regexp.lastIndex = 4;

  let word = regexp.exec(str);
  alert(word); // varName
  ```

  - the `regexp.exec` call starts searching at position `lastIndex` and then goes further.

- The flag `y` makes `regexp.exec` to search exactly at position `lastIndex`, not “starting from” it.

  ```js
  let str = 'let varName = "value"';

  let regexp = /\w+/y;

  regexp.lastIndex = 3;
  alert(regexp.exec(str)); // null (there's a space at position 3, not a word)

  regexp.lastIndex = 4;
  alert(regexp.exec(str)); // varName (word at position 4)
  ```

## Go back to Back Reference

- [Backreferences in pattern: \N and \k<name>](./11%20BackReference.md)

## Now learn about Methods of RegExp and String

- [Methods of RegExp and String](./15%20Methods%20of%20RegExp.js)

