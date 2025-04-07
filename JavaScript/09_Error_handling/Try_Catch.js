/// Try...Catch()
//      - try...catch only works for runtime errors
//      - try...catch works synchronously

//      - Error has 3 main Properties
//        1. err.name - type of Error 
//        2. err.message - Description of Error
//        3. err.stack - stack trace (where error happened)
//      - throw - generate an error
//      - Error standerd type - Error, SyntaxError, ReferenceError, TypeError, HttpError, DbError, NotFoundError
//      - Error can be inherite from above standerd type. 

/*
try {
  console.log("Start of try runs"); // (1) <--

  lalala; // error, variable is not defined!

  console.log("End of try (never reached)"); // (2)
} catch (err) {
  console.log(`Error has occurred!`); // (3) <--
}
*/

/*
// because the function itself is executed later, when the engine has already left the try...catch construct.
try {
  setTimeout(function () {
    noSuchVariable; // error, because script will die here
  }, 1000);
} catch (err) {
  console.log("won't work");
}
*/

/*
// Solution - write try and catch inside setTimeout()
setTimeout(function(){
  try{
    noSuchVariable;
  } catch(err) {
    console.log(`Error Name: ${err.name}`)
    console.log(`Error message: ${err.message}`)
    console.log(`Error Stack: ${err.stack}`)
  }
},1000);
*/

/*
/// Modern JS
try{
  lalala;
} catch { // <-- without (err)
  console.log("Error has occurred!");
}
*/

/*
// throw Error 
let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json); // <-- no errors
  console.log( user.name ); // no name!, which is error for us but Object will not define as an error

  if(!user.name){
    throw new SyntaxError("Incomplete data: no name! ")
  }

} catch(err) {
  console.log( "doesn't execute", err.name, err.message  );
}
*/

/*
// Rethrow - if we do't know how to deal with it.
function readData(){
  let json = '{ "age": 30 }'; // incomplete data
  try{
    let user = JSON.parse(json); // <-- no errors
    lalala();
  } catch(err){
    console.log(`Error is Generate`)
    if(!(err instanceof SyntaxError)){
      throw err; // Rethrow
    }
  }
}
try{
  readData();
} catch(err){
  console.log(`External catch: ${err}`);
  
}
*/

/*
try {
  let json = '{ "age": 30 }';
  let user = JSON.parse(json); // <-- no errors
  throw new ReferenceError("user is not define")
} catch(err){
  console.log(`${err.name}, ${err.message}`)
} finally{
  console.log(`Try...catch...finally complete`);
}
  */