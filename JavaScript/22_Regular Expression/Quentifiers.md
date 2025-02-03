# Quentifiers

# Quantity {n}

- Can append with digit and char ( or char class, `[set]`).

```js
console.log("Hiii".match(/[^h]i{3}/g)); // Return - ['Hii']
console.log("Dhyan".match(/\w[^\W][a-z][\w\s]p{0,2}\w/)); // Return - 'Dhyan', p can occure 0 to 2(0,1,2). times.
```

- Also work for Digit

```js
console.log("+7(903)-123-45-67".match(/\d{2,}/)); // Return - 903,123,45,67
```

# Shorthand

- `+` means "One or More", same as `{1,}`.
- `?` means "Zero or One", same as `{0,1}`.
- `*` means "Zero or More", means as `{0,}`.

```js
alert("0 1 12.345 7890".match(/\d+\.\d+/g)); // 12.345
alert("<body> ... </body>".match(/<\/?[a-z]+>/gi)); // <body>, </body>
alert("<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi)); // <h1>
```

# Experiment

-       1. How to find Ellipsis "..."?

  ```js
  console.log("Hello!... How goes?.....".match(/\.{3,}/));
  ```

-       2. RegExp for HTML colors
  ```js
  let str =
    "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";
  console.log(str.match(/\#[0-9a-f]{6}/i));
  console.log(str.match(/\#\p{Hex_Digit}{6}/iu));
  ```
