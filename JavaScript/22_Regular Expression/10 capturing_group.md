# Capturing Group

- A part of a pattern can be enclosed in parentheses `(...)`. This is called a “capturing group”.

- That has two effects:

  1. It allows to get a part of the match as a separate item in the result array.
  2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole.

```js
alert("Gogogo now!".match(/(go)+/gi)); // "Gogogo"

alert("site.com my.site.com".match(/(\w+\.)+\w+/g)); // site.com,my.site.com
```

- For Email

```js
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

- Using Group `(...)` we can make arr that contain `tag` and inside in `angle` means `<h1>`, `h1` is possible. If not `g` flag at the end.

```js
let regexp = /<(.*?)>/;
console.log("<h1>Hello, world!</h1>".match(regexp)); // Return - <h1>, h1
```

# Nested Groups

- This value can be Nested if we do like,
- If not `g` flag at the end. otherwise find only that tags not inner content.

  ```js
  let regexp = /<(([a-z]+)\s*([^>]*))>/;
  console.log('<span class="my">'.match(regexp));
  ```

# Optional Group

- Even if a group is optional doesn't exist in match (`(...)?`)

  ```js
  let match = "ac".match(/a(z)?(c)?/);

  alert(match.length); // 3
  alert(match[0]); // ac (whole match)
  alert(match[1]); // undefined, because there's nothing for (z)?
  alert(match[2]); // c
  ```

# Searching for all matches with group: matchAll

- Just like `match`, it looks for matches, there are 3 differences:

- It returns not an array, but an iterable object.
- When the flag `g` is present, it returns every match as an array with groups.
- If there are no matches, it returns not `null`, but an empty iterable object.

  ```js
  let result = "<h1> <h2>".matchAll(/<(.*?)>/gi);

  console.log(result); // Return - [object RegExp String Iterator]
  console.log(result[0]); // Return - undefined

  for (let res of result) {
    console.log(res);
    // first alert: <h1>,h1
    // second: <h2>,h2
  }
  //      OR
  result = Array.from(result); // convert into array

  console.log(result[0]); // Return - <h1>,h1 (1st tag)
  console.log(result[1]); // Return - <h2>,h2 (2nd tag)
  ```

# Named Grouping

- Give name to that Group putting `?<name>` immidiately after opening parentheses.

  ```js
  let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
  let str = "2019-04-30";
  let groups = str.match(dateRegexp).groups;

  console.log(groups.year); // Return - 2019
  console.log(groups.month); // Return - 04
  console.log(groups.day); // Return - 30
  ```

# Capturing Groups in Replacement

- We can use `replace` method and change matched String

```js
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert(str.replace(regexp, "$2, $1")); // Bull, John
```

- For named parentheses the reference will be $<name>.

```js
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert(str.replace(regexp, "$<day>.$<month>.$<year>"));
// 30.10.2019, 01.01.2020
```

# non-capturing group with `?:`

- Sometimes we need parentheses to correctly apply a quantifier, but we don’t want their contents in results.
- A group may be excluded by adding ?: in the beginning.

```js
let str = "Gogogo John!";

// ?: excludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;

let result = str.match(regexp);

console.log(result[0]); // Return - Gogogo John
console.log(result[1]); // Return - John
```
