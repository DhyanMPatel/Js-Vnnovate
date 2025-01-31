/*
let buffer = new Uint8Array([72, 101, 108, 108, 111]);
console.log(new TextDecoder().decode(buffer)); // Return - 'Hello'

let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);
console.log(new TextDecoder().decode(uint8Array)); // Return - 你好
*/

///     Can decode a part of Arraybuffer
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// the string is in the middle
// create a new view over it, without copying anything
let binaryString = uint8Array.subarray(1, -1);
let String = new TextDecoder().decode(binaryString);

console.log(String); // Return - Hello

//    TextEncoder
let uint8Arr = new Uint8Array(16);
let Encoder = new TextEncoder().encode(String);
let EncoderInto = new TextEncoder().encodeInto(String, uint8Arr);

console.log(Encoder); // Return - Uint8Array(5) [ 72, 101, 108, 108, 111 ]
-console.log(EncoderInto); // Return - { read: 5, written: 5 }
