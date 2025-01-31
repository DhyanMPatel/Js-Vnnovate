/*
///   Create a Blob

let textBlob = new Blob(["Hello "], { type: "text/plain" });
console.log(textBlob); // Return - Blob { size: 6, type: 'text/plain' }

// create Blob from a typed array and strings
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
let blob = new Blob([hello, " ", "world"], { type: "text/plain" });
console.log(blob); // Return - Blob { size: 11, type: 'text/plain' }

let anotherBlob = blob.slice(3, 10, "text/plain");
console.log(anotherBlob);
*/

/*
/// Blob As URL
//    <a download="hello.txt" href='#' id="link">Download</a>

let blob = new Blob(["Hello, World!"], { type: "text/plain" });

link.href = URL.createObjectURL(blob);

URL.revokeObjectURL(link.href);
*/

/// Blob as base64

let link = document.createElement("a");
link.download = "hello1.txt";

let blob = new Blob(["Hello, world!"], { type: "text/plain" });

let reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

reader.onload = function () {
  link.href = reader.result; // data url
  link.click();
};
