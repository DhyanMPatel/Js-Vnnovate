/// New Function Syntax
//      - function is created literally from a String, that is passed at run time.
//      - It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications. Hence, they cannot use outer variables.

//  - Syntax -> let func = new Function([arg1,arg2,...], functionBody);

let func = new Function("a", "b", "return a + b");
console.log(func(1, 2));

let sayHi = new Function("console.log('Hii')");
sayHi();

/// This bellow 3 syntax is same
new Function("a", "b", "return a + b"); // basic syntax
new Function("a,b", "return a + b"); // comma-separated
new Function("a , b", "return a + b"); // comma-separated with spaces
