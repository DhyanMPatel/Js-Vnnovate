// Dynamic Import
//      - Dynamic imports work in regular scripts, they don’t require script type="module".

/*
// 📁 say.js
export function hi() {
  alert(`Hello`);
}
export function bye() {
  alert(`Bye`);
}

let { hi, bye } = await import("./say.js");
hi();
bye();
*/

// 📁 say.js
export default function () {
  alert("Module loaded (export default)!");
}
let obj = await import("./say.js");
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');
say();
