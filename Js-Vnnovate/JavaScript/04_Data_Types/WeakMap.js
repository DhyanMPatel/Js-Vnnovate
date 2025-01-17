/// WeakMap()
//      - Weakmap does not support iteration and methods like keys(),values(), entries()
//      - use to store value in a key-value pair but it is different as the entries are weakly referred to.
//      - Garbase collector removes the key pointer from "WeakMap" ans also removes the key from memory

//      - keys must be objects, not primitive. So if obj is garbase collected then data automatically disappear as well.

/*
/// Methods & properties
weakMap.set(objAsKey, value);
weakMap.get(key)
weakMap.delete(key)
weakMap.has(key)
*/

let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok");

console.log(weakMap.get(obj));
