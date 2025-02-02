/// Built-in classes
//      - Built-in like Array, Map, etc.
//      - We can add a special static getter Symbol.species to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in map, filter and so on.
//      - But in Built-in classes, no inherite `static methods`. only `Date.prototype` inherits from `Object.prototype`

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 3, 6, 10, 30, 12, 18);
console.log(arr.isEmpty()); // Return - false

let FilteredArr = arr.filter((item) => item > 10);
// console.log(FilteredArr.isEmpty()); // Return - false, or Error - not a function if we use [Symbol.species] method
console.log(FilteredArr); // Return - [30,12,18]

/// Extends what provide ?
//      - If class make any static method that will also accessible from inherit classes.
//      - but in Buit-in Objects like Array, Map, Set, Date etc. they can't inherit static methods. Because static methods are created in perticuler Object like "Array", "Map" not in .Prototype like "Array.Prototype", "Map.Prototype", etc. and They are inherited from [[.Prototype]] means `Array.prototype`, `Map.prototype`, etc. Inshort `static methods are not inherited in Buit-in Objects`.