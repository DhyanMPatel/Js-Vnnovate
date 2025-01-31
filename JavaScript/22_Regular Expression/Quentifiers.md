# Quentifiers

# Quantity {n}

- Can append with digit and char ( or char class, `[set]`).

```js
console.log("Hiii".match(/[^h]i{3}/g)); // Return - ['Hii']
console.log("Dhyan".match(/\w[^\W][a-z][\w\s]p{0,2}\w/)); // Return - 'Dhyan', p can occure 0 to 2(0,1,2). times.
```
