// Switch Statement

//      - Replace multiple if checks
//      - Default can be at any place
//      - break is required in all cases including default if it is not at last of switch Statement
//      - Switch or case both can be arbitrary expressions.
//      - passed value type and case type should be "===". 

let c = "4"
let a = 2 + 2
let b = 2
switch (a /* or +c */) {
    default:
        console.log("I don't know.");
        break;
    case b + 2:
        console.log("Here b+2 is same as a");
        break;
    case 2:
        console.log("2");
        break;

    // This is Grouping of Cases
    case b + 2:
    case 2:
        console.log("Here b+2 is same as a");
        console.log("2");
        break;

    // Type Matters
    case "2":
        console.log("This is not same as int 2.")
        break;

    case 4:
        console.log("4");
        break;

}