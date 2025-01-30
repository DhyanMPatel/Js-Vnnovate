/*
///     TypedArray
let buffer = new ArrayBuffer(16);
console.log(buffer.byteLength); // Return - 16

let view = new Uint32Array(buffer);

console.log(Uint32Array.BYTES_PER_ELEMENT); // Return - 4, 4 bytes per integer

console.log(view.length); // Return - 4
console.log(view.byteLength); // Return - 16

view[0] = 123456;
for (let value of view) {
  console.log(value); // Return - 123456 -> 0 -> 0 -> 0
}
*/

/*
/// DataView

let buffer = new Uint8Array([255, 155, 55, 5]).buffer;

let dataView = new DataView(buffer);

console.log(dataView.getUint8(0)); // Return - 255
console.log(dataView.getUint16(0)); // Return - 65435, 2 bytes as single
console.log(dataView.getUint32(0)); // Return - 4288362245, 4 bytes as single
*/

/// Experiment

/*
// concatenate typed array
function concate(arrays) {
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  let result = new Uint8Array(totalLength);

  let length = 0;
  for (let arr of arrays) {
    result.set(arr, length);
    length += arr.length;
  }
  return result;
}
let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8]),
];
console.log(Array.from(concate(chunks))); // Return [0,1,2,3,4,5,6,7,8]
console.log(concate(chunks).constructor.name); // Return - Uint8Array
*/
