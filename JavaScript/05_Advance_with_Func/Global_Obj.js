/// Global Object
//      - inside Browser, it is "window"
//      - in Node, it is "global"
//      - all properties of Global Obj is accessed directly
//      - in Global Object, properties and variables are declared with "var" only.

/// For Browser
var gVar = 5;
alert(window.gVar); // 5

let gLet = 5;
alert(window.gLet); // undefined

window.currentUser = {
  name: "John",
};
alert(currentUser.name); // John
alert(window.currentUser.name); // John

sample = 5;
console.log(`sample: `, window.sample);
