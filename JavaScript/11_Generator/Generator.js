/// Generator
//      - Can return multiple values
//      - Generator are iterable
//      - `generator.return(value)` finishes the generator execution and return the given value.
//      - The spread syntax ... doesn’t work asynchronously
//      - Syntax

function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
}
function* anotherFunc() {
  yield 4;
  yield 7;
}
let genFunc = generatorFunc();
let anoFunc = anotherFunc();
let one = genFunc.next();

/*
console.log(genFunc); // Return - [object Generator]
console.log(one); // Return - { value: 1, done: false }
console.log(genFunc.next());
console.log(genFunc.next());
console.log(genFunc.next());

console.log(anoFunc.next());
console.log(anoFunc.next());
*/

/*
for (let gen of genFunc) {
  console.log(gen); // Return - 2 -> 3, because one is already taken
}
*/

genFunc.return("Hii");
