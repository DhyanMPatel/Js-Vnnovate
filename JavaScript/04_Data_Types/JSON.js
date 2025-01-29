/// Json.stringify
//      - Syntax -> JSON.stringify(value, replacer, space)
//      - Initially made for JS
//      - Easy to use JSON for Data exchange when client uses JS and server written using Ruby/PHP/Java/Whatever.
//      - JSON support Data types like Object, Array, Primitive (String, Number, Boolean, null).
//      - JSON is lang-independent so JS specific obj properties are skipped by JSON.stringify
//          - js methods, Symbolic keys & values, properties with undefined
//      - there must be no circular references

//      - String must be Double quotes. no Single quotes and no Backtickes also
//      - properties also in Double quotes.

// Methods
//  1. JSON.stringify() - to convert from Object to JSON.
//  2. JSON.parse() - to convert from JSON to Object.

let student = {
  name: "Vnn",
  age: 13,
  isAdmin: false,
  course: ["MERN", "Laravel", "React Native"],
  spouse: null,
  room: {
    number: 23,
    participants: ["john", "ann"],
  },
  date: new Date(),

  /// skipped
  [Symbol("id")]: 123,
  something: undefined,
  sayHii() {
    console.log("Hello");
  },
};

let json = JSON.stringify(student);
// console.log(typeof json); // Return - String
// console.log(json);

/*
/// Circular Reference
let room = { number: 23 };
let meetup = {
  title: "Conference",
  participants: ["john", "ann"],
};
meetup.place = room;
room.occupiedBy = meetup;


// console.log(JSON.stringify(meetup)); // Error - converting circular structure to json
// To filter out circular references, we use second argu of JSON.stringify()

// console.log(JSON.stringify(meetup, ["title", "participants", "place"]));

console.log(
  JSON.stringify(meetup, function (key, value) {
    console.log(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
); /// output contain first element also that represent whole object.
*/

// indicate how many space is needed in nested Object.
// console.log(JSON.stringify(student, null, 2));

/*
// Custom 'toJSON'
//      - object provide method toJSON() for to-JSON conversion

let room = {
  number: 23,
  toJSON() {
    return this.number;
  },
};
let meetup = {
  title: "Conference",
  date: new Date(),
  room,
};

console.log(JSON.stringify(meetup,null,2));
*/

/*
/// JSON.parse()

let std = JSON.parse(json);
// console.log(std);
// console.log(std?.room?.number);
// console.log(std?.date.getDate()); // Error, date is now String not an Object. solution

// worked for nested Object that contain date inside inner obj as well:
let solution = JSON.parse(json, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});
console.log(solution?.date?.getDate());
*/
