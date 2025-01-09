// Function
//  - If we need to perform similar action in many places.
//  - Example - we need to show a nice-looking message when visitor log in, log out and may be somewhere else.
//  - Function with no return or empty return always equal to undefined
//  - Never add newline between return and value
//  - call many times without repetition.
//  - like
//      - alert(message), prompt(message, default), confirm(question)


let nameOut; // Global Variable
// func1();
// func2();

function func1() {
  let nameIn = "Dhyan"; // Local Variable
  nameOut = "Vnnovate";
  console.log(nameIn, nameOut);
}

function func2() {
  let nameIn = "Patel";
  nameOut = "Solution";
  console.log(nameIn, nameOut);
}
// console.log(nameOut);


/// Parameter - can pass data to functions using parameter
//      - function create a local copy which is parameter

function fun(par1 ,par2, par3 = "Default Value"){ // Parameter
    console.log(`${par1}, ${par2} ${par3}`)
}
// fun("Hello","Vnnovate!"); // Arguments


/// Experiment
function func1(par1, par2 = func2()){
    console.log(`${par1}, ${par2}`)
}
function func2(){
    return "Default"
}
// func1() // Return - undefined, Default
// func1("Hello")  // Return - Hello, Default 
// func1("Hello",undefined) // Return - Hello, Default
// func1("Hello",null) // Return - Hello, null
// func1("Hello",NaN) // Return - Hello, NaN
// func1("Hello","Vnnovate") // Return - Hello, Vnnovate



// /// Check age and give alert acording to that
// function checkAge(age){ // Aslo written using ? and || check it also. 
//     if(age >= 18){
//         return true
//     } else {
//         return confirm("you have a permission?");   // Return true(OK) or false(Cancel)
//     }
// }
// let age = prompt("How old are you",18)
// if( checkAge(age)){
//     alert("Access Granted");
// } else {
//     alert("Access Denied");
// }



/// Prime with multiple function
function showPrimes(n){
    for(let i = 2; i <= n; i++){
        if(isPrime(i))  console.log(i)
    }
}
function isPrime(i){
    for(let j = 2; j < i; j++){
        if(i % j == 0) return false;
    }
    return true;
}
// showPrimes(13)


/// Return list of 2 numbers
function min(a,b){
    return (a<b)? a : b;
}
// console.log(min(2,5));
// console.log(min(2,-5));


/// Return Pow()
function myPow(x,n){
    return (x ** n)
}
console.log(myPow(3,3.5));


///
function outerFun(a) {
    function innerFun(b) {
        console.log(`a: ${a}, b: ${b}`);
        return a + b;
    }
    return innerFun;
}

const addTen = outerFun(10); // value of a
console.log(addTen(5)); // Value of b
