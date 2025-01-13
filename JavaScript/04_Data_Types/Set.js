// Set
//      - set of values (without keys), where each value occur only once.
//      - set also accept object as a
//      - can loop over set using "for..of" and "forEach"

/*
/// Methods & properties
new Set([iterable]) - create new Set, if iterable Object is provided, copies values from it into set
set.add(value) - add a value, return the set itself
set.delete(value) - delete a value, return true if it is deleted, otherwise false
set.has(value) - return true if value is exist.
set.clear() - clear everything from set
set.size - return current element count
*/

/*
let set = new Set();

let john = { name: "John" };
let dhyan = { name: "Dhyan" };
let prakash = { name: "Prakash" };
let mahi = { name: "Mahi" };

set.add(john);
set.add(dhyan);
set.add(prakash);
set.add(dhyan);
set.add(mahi);

console.log(set.size);

for (let visitor of set) {
  console.log(visitor);
}

set.forEach((visitor) => console.log(visitor));

/// Iteration over Set
//      - keys and values are same
//      - set.keys() -> return iterable for keys
//      - set.values() -> return iterable for values
//      - set.entries() -> return iterable for entries(key, value), used by default in for..of.

for (let index of set.keys()) {
  console.log(index);
}
for (let visitor of set.values()) {
  console.log(visitor);
}
for (let entry of set.entries()) {
  console.log(entry);
}
*/

/// Experiment
// Anagrams = words that have a same number of same letter, but in different order.
//  - step-> convert all words to letter then sort all letters then join and make word again

function cleanAnagrams(arr) {
  let map = new Map();
  for (let word of arr) {
    let sorting = word.toLowerCase().split("").sort().join("");
    map.set(sorting, word);
  }
  console.log(map);
}
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
cleanAnagrams(arr);

/*
/// map keys are iterable but not an Array
let map = new Map();
map.set("name", "john");
let keys = Array.from(map.keys());
keys.push("More");
console.log(keys);
*/
