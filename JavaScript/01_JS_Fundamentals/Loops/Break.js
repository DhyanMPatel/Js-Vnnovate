// Break

//  - can force exit from loop using Break
//  - Break is used to check condition to stop the infinite condition.

let sum = 0
while(true){
    let value = +prompt("Enter a Number",0);
    if(!value){
        break;
    }
    sum += value
}
console.log(sum);
