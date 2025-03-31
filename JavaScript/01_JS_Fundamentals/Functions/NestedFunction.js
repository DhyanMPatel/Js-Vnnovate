// Nested Function
//  - Here Function inside another function

function outer(a){
    function inner(b){
        console.log(`a: ${a}, b: ${b}`);
        return a+b
    }
    return inner; // Not write as function call just pass reference of inner function.
}
// let call = outer(5); // 5 is a
// console.log(call(10)); // 10 is b

// let call = outer(5)(10); // 5 is a and 10 is b
// console.log(call); // 15 is a+b

let call = outer;
console.log(call(5)(10)); // 5 is a and 10 is b