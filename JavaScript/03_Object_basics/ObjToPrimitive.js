// Object to Primitive Convertion
//      - We can use Symbol.toPrimitive or toString() and valueOf() to convert Obj to Primitive.
//      - If hint is "number" or "default" valueOf() prefer first
//      - if hint is "string" toString() prefer first

/// Hints

// Symbol.toPrimitive
let user = {
  name: "Vnnovate",
  num: 1312,

  toString() {
    return `{name: "${this.name}"}`;
  },

  valueOf() {
    return this.num;
  },

  // or

  /*
  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);

    return hint == "string" ? `{name: "${this.name}"}` : this.num;
  },
  */
};

// Required to pass inside String()/Number(), because console.log() unable to trigger [Symbol.toPrimitive] and toString()/ValueOf(). 
// console.log(String(user)); // Return - Vnnovate
// console.log(Number(user)); // Return - 1312
