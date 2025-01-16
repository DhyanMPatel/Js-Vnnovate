/// Date & Time
//      - date can be substracted, the result is their difference in ms.
//      - Use Date.now() to get the current timestamp fast.

let now = new Date();
let Jan01_1970 = new Date(0);
let Jan02_1970 = new Date(24 * 3600 * 1000);
let Dec31_1969 = new Date(-24 * 3600 * 1000);

/*
// new Date(year, month, date, hours, minutes, seconds, ms)
//  - Month 0(Jan) to 11(Dec)
//  - hours, minutes, seconds, ms is absent. they are asume to be equal `0`.

console.log(new Date(2026, 1, 31, 0, 0, 0, 0)); // Return - 2026-03-02T18:30:00.000Z
*/

/*
// Access Date Components
//  - getFullYear() - get 4-digit year
//  - getMonth() - get month, from 0 to 11
//  - getDate() - get date, from 1 to 31
//  - getHours(), getMinutes(), getSeconds(), getMilliseconds() - get corresponding time
//  - getDay() - get day of week, from 0(Sunday) to 6(Saturday)
//  - getYear() method is also there but it some time return 2 digit year.
//  - There are also UTC-counterparts like getUTCFullYear(), getUTCMonth(), so on for the time zone UTC+0
//  - getTime() - num in ms from Jan 01 1970 UTC+0
//  - getTimezoneOffset() - return difference between UTC and the local time Zone, in minute

let date = new Date();
console.log(date.getHours()); // hours based in India
console.log(date.getUTCHours()); // hours based in London

// if you are in timezone UTC-1, outputs 60
// if you are in timezone UTC+3, outputs -180
console.log(new Date().getTimezoneOffset()); // Return - -330
*/

/*
/// Set Date Components
//  - set propeties use to set perticular porsion of date
//  - setFullYear(year, [month], [date])
//  - setMonth(month, [date])
//  - setDate(date)
//  - setHours(hour, [min], [sec], [ms])
//  - setMinutes(min, [sec], [ms])
//  - setSeconds(sec, [ms])
//  - setMilliseconds(ms)
//  - setTime(ms) - set whole date using millisecond only, since 01.01.1970 UTC
//  - There are also an UTC varient except setTime() like setUTCFullYear(), setUTCMonth(), so on.
console.log(now);

now.setHours(0);
console.log(now); //

now.setHours(0, 0, 0, 0);
console.log(now);
*/

/// Date.parse() from String
//      - can read date from String
//      - Formate: `YYYY-MM-DDTHH:mm:ss.sssZ`
//          - T - use as delimiter
//          - Z - denote the timeZone
//      - return value in ms from jan 01 1970
let parsing = new Date(Date.parse("2028-02-30T14:51:30.000"));
console.log(parsing);

/// Experiment
let interesting = new Date("2026-02-31");
console.log(interesting); // Return - 2026-03-03T00:00:00.000Z

/*
// // as time measurement
let start = new Date();
for (let i = 0; i < 100000; i++) {
  let doSomeThing = i * i * i;
}
let end = new Date();
console.log(`taken time: ${end - start} ms`);
*/

/*
// Faster - we want to just measure time not get whole Date use Date.now().
let s = Date.now();
for (let i = 0; i < 100000; i++) {
  let doSomeThing = i * i * i;
}
let e = Date.now();
console.log(`takon time: ${e - s} ms`);
*/

/*
// Who is faster from bellow
function diffSubtract(date1, date2) {
  // take time for implicite conversion
  return date2 - date1;
}
function diffGetTime(date1, date2) {
  // faster
  return date2.getTime() - date1.getTime();
}
function banch(fun) {
  let date1 = new Date();
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) {
    fun(date1, date2);
  }
  return Date.now() - start;
}

console.log(`Time of Difference: ${banch(diffSubtract)}ms`);
console.log(`Time of Difference: ${banch(diffGetTime)}ms`);
*/

/*
//// Check it home
/// Autocorrection
//  - we can set out-of-range values, it autoadjust itself

let date1 = new Date(2013, 0, 1); // 33 Jan 2013 ?!?
console.log(date1); // ...is 1st Feb 2013!

let date = new Date(2016, 0, 2); // 2 Jan 2016
console.log(date);
date.setDate(1); // set day 1 of month
console.log(date);
date.setDate(0); // min day is 1, so the last day of the previous month is assumed
console.log(date); // 31 Dec 2015
*/
