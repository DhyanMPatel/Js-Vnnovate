/// Destructuring
//      - Work on any Iterable on right-side
//      - we can swap using destructuring

/*
let arr = ["Dhyan", "This will ignore using comma(,) ", "Patel"];
let obj = {
  name: "Vnnovate",
  age: 12,
};
let map = new Map();
map.set("name", "Vnn");
map.set("location", "Ahmedabad");

let [firstName, , lastName] = arr;
// console.log(`First Name: ${firstName},\nLast Name: ${lastName}`);

for (let [key, value] of Object.entries(obj)) {
  console.log(`Key: ${key}, Value: ${value}.`);
}

for (let [key, value] of map) {
  console.log(`Key: ${key}, Value: ${value}.`);
}
*/

/*
let guest = "Jane";
let admin = "Pete";
// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];
*/

/*
let [name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];
console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2
*/

/*
// Default values in destructuring
let [nameDeffault = "Guest", surname1 = "Anonymous"] = ["Julius"];
let [name = prompt("name?"), surname = prompt("surname?")] = ["Julius"];
*/

/*
/// Object destructuring
//      - destructuring with Object also support like
//          {sourceProperty: targetVariable}
//      - order is not mettor just write same name
let options = {
  title: "Menu",
  width: 100,
  height: 200,
};
let { width, title, height } = options; // Should be the same with obj properties name
let { width: w, title: t, height: h } = options;
console.log(title, width, height);

console.log(t, w, h);
*/

///
let options = {
  size: {
    height: 200,
    width: 100,
  },
  items: ["Cake", "Donut"],
  extra: true,
};

let {
  size: { width, height },
  items: [item1, item2],
  title = "Menu",
  ...rest
} = options;

// console.log(size); // size is not a variable
console.log(width, height);
// console.log(items); // items is also not a variable
console.log(item1, item2);
console.log(title);
console.log(rest);
