# Greedy and Lazy Quentifiers

- Here, This Example generate Problem

```js
let regexp = /".+"/g;
let str = 'a "witch" and her "broom" is one';
alert(str.match(regexp)); // "witch" and her "broom"
```

- In the greedy mode (by default) a quantified character is repeated as many times as possible.
- Here Lazy mode can help

# Lazy mode

- can impliment using `?` after the Quentifier.
- The lazy mode doesn’t repeat anything without a need

```js
let regexp = /".+?"/g; // Lazy quantifiers
let another = /"[^"]+"/g;
let str = 'a "witch" and her "broom" is one';
alert(str.match(regexp)); // "witch", "broom"
```

- some times lazy mode give wrong answer then we should check `"[^"]+"`.

# Experiment

-       2. Find Comments

```js
let regexp = /<!--.*?-->/gm;
let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

console.log(str.match(regexp)); // '<!-- My -- comment \n test -->', '<!---->'
```

-       3. HTML tag find

```js
let regexp = /<[^<>]+>/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert(str.match(regexp)); // '<a href="/">', '<input type="radio" checked>', '<b>'
```
