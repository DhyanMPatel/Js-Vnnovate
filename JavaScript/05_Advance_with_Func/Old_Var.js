/// Old Var
//      - Declarations are Hoisted but Assignment is not.
//      - IIFE is created and immediately called. So it has its own private variable

/*
var name = "clark";
var name = "john"; // not give error just Override it
console.log(name);

let name = "mitsu"; // Error - already been declared
*/

/// IIFE
(function () {
  var name = "Vnnovate";
  console.log(name);
})();
console.log(name); // Error - not defined
