/// Arrow Function
//      - Arrow Function has not it's "this", take "this" from outside means from sourding laxical scope
//      - Comes in ES6

let sum = (a, b) => a + b;
console.log(sum(2, 3));

let sayHi = () => console.log("Hello");
sayHi();
