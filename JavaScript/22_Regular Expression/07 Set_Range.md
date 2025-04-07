# Set & Range

- `[…]` mean to “search for any character among given”.

## Set

- [a,b,c] means any of 3 char at that perticular 1 char place in string.
- this will use on single word

  ```js
  // find "V", then [o or i], then "la"
  alert("Voila".match(/V[oi]la/)); // null, because there are used on 2 chars(o,i).
  ```

## Range

- give Range of char like [a-z],[A-Z],[0-10],[5-10],[a-z0-15],[A-Z0-50], etc

- Character classes are shorthand for certain character set

  - `\d` – is the same as `[0-9]`,
  - `\w` – is the same as `[a-zA-Z0-9_]`,
  - `\s` – is the same as `[\t\n\v\f\r ]`, plus few other rare Unicode space characters.

# Multi Language \w

- We can't find language specifice words except English like chines words, Cyrillic letters, etc.
- For that we can use Unicode Properties:

  - Alphabetic (`Alpha`) – for letters,
  - Mark (`M`) – for accents,
  - Decimal_Number (`Nd`) – for digits,
  - Connector_Punctuation (`Pc`) – for the underscore `'_'` and similar characters,
  - Join_Control (`Join_C`) – two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

  ```js
  let regex = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{join_C}]/;
  let str = `Hi 你好 12 _c`;
  ```

# Excluding Range or Set

- “excluding” ranges that look like `[^…]`. means match any character except the given ones.
  - `[^aeyo]` – any character except `'a'`, `'e'`, `'y'` or `'o'`.
  - `[^0-9]` – any character except a digit, the same as `\D`.
  - `[^\s]` – any non-space character, same as `\S`.

```js
alert("alice15@gmail.com".match(/[^\d\sA-Z]/gi)); // @ and .
```

# Ranges and flag "u"

- If there are surrogate pairs then use `u` flag to handle them at the end of regex

```js
console.log("𝒳".match(/[𝒳𝒴]/u)); // Return - 𝒳
```

# Experiment

-     1. which one will be match with `/Java[^script]/`.

```js
let regex = /Java[^script]/;
console.log("Java".match(regex)); // Return - null
console.log("JavaScript".match(regex)); // Return - JavaS
```

-     2. Findout Time `hh:mm` and `hh-mm`

```js
let regex = /\d\d[-:]\d\d/;
console.log("Breakfast at 09:00. Dinner at 21-30".match(regex)); // Return - 09:00 , 21-30
```
