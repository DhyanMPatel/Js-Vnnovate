// condition ? true : false;

//  - use only when there is one Condition.
//  - Mutiple condition using Ternary can be possible but it is not much readable.


let age = prompt("Age","")

let good = (age < 18)? "You can't vote":"You can vote"

// Not Readable
let message = (age < 3)? "Hi, Baby!": (age < 18)? "Hey, Boy": (age < 45)? "Hey, Man":"Hello, Uncle"; 

// Readable
if(age<3){
    message = "Hi, Baby!"
} else if (age < 18){
    message = "Hey, Boy"
} else if (age < 45){
    message = "Hey, Man"
} else {
    message = "Hello, uncle"
}


/// Experiment
age = 13
function checkAge(age){
    (age > 18)? true: confirm("Did parents allow?")
}
