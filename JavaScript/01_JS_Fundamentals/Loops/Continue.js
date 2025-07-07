// Continue

//  - it skip current iteration.
//  - Continue/Break is not work with Tarnery Operator

let sum = 0
// while (sum < 100) {
//     let val = +prompt('Enter a Number', "")
//     if (!val) continue;  // it will ask the user untill user put the value
//     sum += val;
// }


// (sum>=0)? break: break // Error - Syntactic Error



/// Experiment
// prime number
let n = 5

outer: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue outer;
    }
    console.log(i)
}
