/// Try...Catch()
//      - try...catch only works for runtime errors
//      - try...catch works synchronously

try {
  console.log("Start of try runs"); // (1) <--

  lalala; // error, variable is not defined!

  console.log("End of try (never reached)"); // (2)
} catch (err) {
  console.log(`Error has occurred!`); // (3) <--
}

// because the function itself is executed later, when the engine has already left the try...catch construct.
try {
  setTimeout(function () {
    noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  console.log("won't work");
}
