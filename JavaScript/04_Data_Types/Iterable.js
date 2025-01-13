// Iterable
//  - Ex - Array, String,

// range Object
let range1 = {
  from: 2,
  to: 6,
};
for (let num of range1) {
  console.log(num);
}

// Problem
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
