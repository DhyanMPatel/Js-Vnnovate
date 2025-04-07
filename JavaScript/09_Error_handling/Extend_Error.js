/// Extending Error

// class ValidationError extends Error {
//   constructor(message) {
//     super(message)
//     this.name = "ValidationError"
//   }
// }

/*
function test(){
    throw new ValidationError("Whoops!")
}

try{
    test();
} catch(err){
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
}
*/

/*
function readData(json) {
  let user = JSON.parse(json)

  if (!user.age) {
    throw new ValidationError("No Field: Age")
  }
  if (!user.name) {
    throw new ValidationError("No Field: Name")
  }
  return user;
}

try {
  let json = '{ "age": 30 }';   // { bad Json }   // {"name": "Vnn"}
  let user = readData(json);
} catch (err) {
  if (err instanceof SyntaxError) {
    console.log("Invalid JSON");
  } else if (err instanceof ValidationError) {
    console.log(`Invalid Data: ${err.message}`);
  } else {
    throw err;
  }
}
*/

/*
/// further inheritance
class PropertyRequiredError extends ValidationError{
    constructor(property){ // passed Error when we called
        super(`No Property: ${property}`)
        this.name = "PropertyRequiredError";
        this.property = property
        console.log(this.constructor.name); // Provide name of class
        
    }
    // this above is Basic Thing that when we create a custom Error we need to use `this.name = this.constructor.name` to avoid such above things.
}
function readData(json){
    let user = JSON.parse(json)

    if(!user.name){
        throw new PropertyRequiredError('No Field: Name')
    }
    if(!user.age){
        throw new PropertyRequiredError('No Field: Age')
    }
    return user
}
try{
    let user = readData('{ "age": 25 }');
} catch(err){
    
    if(err.name == "ValidationError"){ // - instanceOf version is much better because there is extended Errors that makes subtype
        console.log(`Invalide: ${err.message}`)
        console.log(err.name);
        console.log(err.property)
    } else if(err instanceof SyntaxError){
        console.log("JSON Syntax error: ", err.message)
        console.log(err.name);
    } else if(err instanceof ValidationError) {
        console.log(`Again Invalide: ${err.message}`)
        console.log(err.name); // Return - PropertyRequiredError
        console.log(err.property)
    }
}
*/

/*
/// Wrapping Exceptionse
//      - it also caught first Error that occur first same as above.
//      - we just make new class `ReadError extends Error` and call when we need Error handler and pass message and cause.
//      - Used in Debugging ()

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause; // Store original error
    this.name = "ReadError";
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super(property);
    this.name = "PropertyRequiredError";
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new PropertyRequiredError("No Field: Name");
  }
  if (!user.age) {
    throw new PropertyRequiredError("No Field: Age");
  }
}
function readUser(json) {
  let user;

  try {
    user = JSON.parse(json); // Actually it is SyntaxError
  } catch (err) {
    if (err instanceof SyntaxError) { 
      throw new ReadError("Syntax Error", err); // err will describe the original error
    } else {
      throw err;
    }
  }

  // If Json will right then we will validate the user.
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("ValidationError", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{30}");
} catch (err) {
  if (err instanceof ReadError) {
    console.log(err.name);
    console.log(`Original Error: ${err.cause}`);
  } else {
    throw err;
  }
}
*/

/*
/// Improved Further Extends
class MyErrr extends Error{
    constructor(message){
        super(message)
        this.name = this.constructor.name // using this no need to add name manually in all Error.
    }
}
class ValidationError extends MyErrr {}

class PropertyRequiredError extends ValidationError {
    constructor(property){
        super(`No Property : ${property}`)
        this.property = property
    }
}
try{
    throw new PropertyRequiredError("field") // if throw ValidationError, then return `err.name` - ValidationError  
} catch(err){
    console.log(err.name); // Return - PropertyRequiredError
}
*/
/*
/// Experiment
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // or this.name = "FormateError"
  }
}

try {
  let err = new FormatError("Formate Error");
  throw err;
} catch (err) {
  console.log(err.name); // Return - FormateError
  console.log(err.message); // Return - Formate Error

  console.log(err instanceof FormatError); // Return - true
  console.log(err instanceof SyntaxError); // Return - true
}
*/