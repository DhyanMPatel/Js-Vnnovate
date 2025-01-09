// Labels

//  - Sometime we need to break out from multiple nested loops then we use Labels.
//  - Break will not jump from any where to outer loop to do that break must me inside that Label block

outer: for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        let input = +prompt(`Enter value at ${i} ${j} location`,null)
        if(!input){
            break outer; // Go to "Done" console line
        }
    }
}
console.log("Done");    
