// [||, &&, !, ??]
//  - Precedence of (AND) && is higher than (OR) ||



/// || (OR)
//      - Return true if anyone is true/Truthy (Classical)
//      - for multiple Operand Return first Truthy value otherwise Return last operand (Tricky)

// true || alert("not Printed");// not run, got true
// false || alert("printed"); // return printed, not get truthy

// let val = 0 || alert("Return undefined") || true;
// console.log(val)    // true


/// Experiment
let age = 40
function checkAge(age){
    return (age>18) || confirm("Parents allow you?");
}



/// && (AND)
//      - Retrun true if all are true/Truthy (Classical)
//      - for multiple Operand Return First Falsy value otherwise return last operand

// let value = true && alert("Return undefined") && 0;  // alert will return undefind which is falsy
// console.log(value);     // undefined

let val = 1 && 2 && 0 && 3
console.log(val);



/// ! (NOT)
//      - Return Boolean value only
//      - "!!" use same as Boolean conversion

let bool = !"Return boolean value"   
// console.log(bool)   // Return - false

let bool2 = !!"perform Boolean Conversion"
// console.log(bool2);     // Return - true