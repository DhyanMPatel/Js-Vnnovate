// This with Object
//      - this in obj refer to current object
//      - Function has not own this
//      - Arrow Function has also no own this

let user = {
  name: "Vnn",
  sayHii() {
    console.log(`Hii, ${this.name}!`);
  },
};
let admin = user;
user = null;
console.log(admin.sayHii());
