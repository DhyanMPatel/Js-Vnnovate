# Unicode: flag "u" and class \p{...}

- Js use Unicode encoding for string. Most characters are encoded with 2 bytes, but that allow to represent 65536 characters. Also some characters are encoded with 4 bytes.

- To handle what such problems use `u` flag. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available.

- Here’s the main character categories and their subcategories:

  - Letter `L`:
  - Number `N`:
  - Punctuation `P`:
  - Mark `M` (accents etc):
  - Symbol `S`:
  - Separator `Z`:
  - Other `C`:

- there are another derived categories like

  - Alphabetic (`Alpha`) include letters `L` + letter Numbers `Nl` + other Symbol `OAlpha`.
  - `Hex_Digit` includes `0-9`, `a-f`, `A-F`
  - Script (`sc`) have values like: `Han`(chinese), `Cryillic`, `Greek`, `Arabic` etc.
  - Currency Character: `\p{Currency_Symbol}` or `\p{Sc}`

  ```js
  let regex = /x\p{Hex_Digit}\p{Hex_Digit}/u;

  console.log("Number: XcF".match(regex));
  ```

- `script=<value>` for Cryillic letter `\p{sc=Cryillic}`, for Chinese letter `\p{sc=Han}`.

  ```js
  let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs
  let str = `Hello Привет 你好 123_456`;
  console.log(str.match(regexp)); // Return - 你,好
  ```

- Currency
  ```js
  let regexp = /\p{Sc}/gu;
  let str = `Prices: $2, €1, ¥9`;
  console.log(str.match(regexp)); // $2,€1,¥9
  ```


## Go back to Character Classes

- [Character Classes](./02%20Char_classes.md)

## Now Learn about Anchors: string start ^ and end $ 

- [Anchors: string start ^ and end $](./04%20Anchors.md)