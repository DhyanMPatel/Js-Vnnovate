// Scheduling a call - we may decide to exucute the function not right now, but at a certain time.
//      1. setTimeout - allow to run function once after interval of time.
//      2. setInterval - allow to run function repeatedly, starting after the interval of time, then repeate continuously

//  - This are not part of JS specification. but supported in all browsers and node.js
//  - if there are Zero delay, still run after current executing script.
//  - Scheduling is perform Sync task untill it display less time scheduling first then more time scheduling. means there are 1ms, 2ms, 4ms, 1ms(again), 3ms then it display like 1ms, 1ms(again), 2ms, 3ms, 4ms.

/*
/// setTimeout
//      - Syntax -> let timeId = setTimeout(func/code, [delay], [arg1], [arg2], ... )
//      - if 1st arg is String in setTimeout() then JS create a function from it
//      - less delay time display output First.
//      - setTimeout() accept function reference not function call
//      - can cancel `setTimeout` using clearTimeout()
//      - when we console that variable, which return timer Object with additional methods

function sayHi(who) {
  console.log(`Hii ${who}`);
}
setTimeout(sayHi, 2000, "Vnnovate");

// setTimeout("console.log('hii Vnnovate!');", 2000); // Error - TypeError

setTimeout((who) => console.log(`hii ${who}`), 1000, "Vnnovate!");

let time = setTimeout(() => console.log("Hii"), 2000);
console.log(time);
setTimeout(() => clearTimeout(time), 1000); // Clear setTimeout after 1 Sec
clearTimeout(time); // Clear instantly
console.log(time);
*/

/*
/// setInterval
//      - Syntax - setInterval(func/Str, [delay], [arg1], [arg2], ...)
//      - during execution of function this may take time so timeinterval start stair next call timer from prev function call. Means function will called this will take 500 ms, Now next function call interval is only 500ms.
//      - In case of, func will take more time than delay then engine wait to complete that function then check interval is finished then call again
//      - setInterval func exist untill clearInterval is called. so it's better to cancel it, even if it's very small.

let timeId = setInterval(() => console.log("Hii"), 1000);
setTimeout(() => {
  clearInterval(timeId);
}, 2000); // only one time, but both are set at 1000 still timeId run and console one time
*/

/*
/// Nested setTimeout
//      - nested setTimeout is more Flexible then setInterval.
//      - can schedule the next call differently like bellow 1 Sec
//      - if operation will take more time then delay then nested setTimeout comes in, and they provide fixed time delay, because new call is planned at the end of the previous one

let timeId = setTimeout(function tick() {
  console.log("Tick");
  //   setTimeout(tick, 1000); // this will create infinite loop of setTimeout
  timeId = setTimeout(tick, 1000);
}, 2000);
setTimeout(() => clearTimeout(timeId), 10000);
*/

/*
/// Zero Delay settimeout
setTimeout(() => {
  console.log("Vnnovate!");
}, 0);
console.log("Hello");
*/

/// Experiment
///     1) display number (from, to) in every second
function printNum(from, to) {
  let current = from;

  /*
  let timerId = setInterval(() => {
    console.log(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
  */

  let timerId = setTimeout(function print() {
    console.log(current);
    if (current < to) {
      setTimeout(print, 1000);
    }
    current++;
  }, 1000);
}
printNum(1, 5);
printNum(11, 15);

/*
///     2) What is the output of `i`?
let i = 0;
setTimeout(() => console.log(i), 100); // Return - 100000000
// assume that the time to execute this function is >100ms
for (let j = 0; j < 100000000; j++) {
  i++;
}
*/
