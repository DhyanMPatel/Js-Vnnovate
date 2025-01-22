/// Extending Error

// class ValidationError extends Error{
//     constructor(message){
//         super(message)
//         this.name = "ValidationError"
//     }
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
function readData(json){
    let user = JSON.parse(json)

    if(!user.age){
        throw new ValidationError("No Field: Age")
    }
    if(!user.name){
        throw new ValidationError("No Field: Name")
    }
    return user;
}

try{
    let json = '{ "age": 30 }';
    let user = readData(json);
} catch(err){
    if(err instanceof SyntaxError){
        console.log("Invalid JSON");
    } else if (err instanceof ValidationError){
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

/// Wrapping Exceptionse
class ReadError extends Error{
    constructor(message, cause){
        super(message)
        this.cause = cause
        this.name = "ReadError"
    }
}
class ValidationError extends Error{
    constructor(message){
        super(message)
        this.name = "ValidationError"
    }
}
class PropertyRequiredError extends ValidationError{
    constructor(property){
        super(property)
        this.name = "PropertyRequiredError"
    }
}

function validateUser(user){
    if(!user.name){
        throw new PropertyRequiredError('No Field: Name')
    }
    if(!user.age){
        throw new PropertyRequiredError("No Field: Age")
    }
}
function readUser(json){
    let user;

    try{
        user - JSON.parse(json)
    } catch(err){
        if(err instanceof SyntaxError){
            throw new ReadError("Syntax Error", err)
        } else {
            throw err;
        }
    }

    try{
        validateUser(user)
    } catch(err){
        if(err instanceof ValidationError){
            throw new ReadError('ValidationError', err)
        } else {
            throw err;
        }
    }
}

try{
    readUser('{"age": 30}')
} catch(err){
    if(err instanceof ReadError){
        console.log(err)
        console.log(`Original Error: ${err.cause}`)
    } else {
        throw err;
    }
}


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
