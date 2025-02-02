/// Arrow Function with This
//      - Arrow Function has not it's "this", take "this" from outside
//      - Do not have this
//      - Do not have arguments
//      - Can’t be called with new
//      - They also don’t have super


let group = {
  sayHii: "Hii",
  students: ["Dhyan", "Raj", "Rahul", "Smit"],
  showList() {
    this.students.forEach((std) => console.log(`${this.sayHii}, ${std}`));
  },
  showListReg() {
    this.students.forEach(
      function (std) {
        console.log(`${this.sayHii}, ${std} Reguar.`);
      }.bind(this) // required to bind with regular function, that pass reference of group object
    );
  },
};

group.showList();
group.showListReg(); // "this" return "undefined", "this.sayHii" refer provided arr "this.students"


// do not have "arguments"

function sayHii(who) {
  console.log(`Hello, ${who}`);
}

//      - Ragular Function
function deferRag(f, ms) {
  return function (...args) {
    let ctx = this;
    setTimeout(function () {
      return f.apply(ctx, args);
    }, ms);
  };
}
let sayHiiRag = deferRag(sayHii, 1000);
sayHiiRag("Vnn");

//      - Arrow Function
function deferArrow(f, ms) {
  return function () {
    setTimeout(() => f.bind(this, arguments), ms);
    // or
    // setTimeout(() => f.call(this, ...arguments),ms); // possible
  };
}
let sayHiiArrow = deferArrow(sayHii, 2000);
sayHiiArrow("Vnnovate");
