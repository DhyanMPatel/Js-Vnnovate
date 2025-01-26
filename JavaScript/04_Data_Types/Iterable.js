// Iterable
//  - Ex - Array, String,
//  - simply writing `typeof objs[Symbol.iterable]` return function then we can say that objs is iterable.

// range Object
let range1 = {
  from: 2,
  to: 6,
};
// for (let num of range1) { // Error- range1 is not iterable
//   console.log(num);
// }

// Solution - Symbol.iterator method convert this Obj to iterable.
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ }
    }
    return { done: true };
  }
};
// for (let num of range) {
//   console.log(num); // 1, then 2, 3, 4, 5
// }

// Also we can do from outside

let range2 = {
  from: 1,
  to: 5
}
range2[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ }
      }
      return { done: true };
    }
  }
}

for(let num of range2){
  // console.log(num); // Return - 1 -> 2 -> 3 -> 4 -> 5
}


/*
// We can see work inside String
let str = "Hello!";
let iterator = str[Symbol.iterator]();

while(true){
  let next = iterator.next();
  if(next.done){
    break;
  }
  console.log(next.value);
}
*/

/// Iterable and Array-like
//    - Array-likes are Obj that have `indexes` and `length`, so they look like Array.
//    - Iterable are Object that impliment the `Symbol.iterator` Method.
//    - Some Objects are Iterable or Array-like or both.
//        - like `String` - Iterable and Array-like
//        - but Iterable may not be Array-like or vise versa such as above Object which is Iterable but not Array-like.

/*
/// Array.from()
//    - Array.from() method takes iterable or array-like values and makes `Real Array`.

let arr = Array.from(range1) 
console.log(arr); // Return - [], because there are properties should be number

let arrIterable = Array.from(range)
console.log(arrIterable); // Return - [1,2,3,4,5], because use Symbol.iterable to iterate their value
*/
