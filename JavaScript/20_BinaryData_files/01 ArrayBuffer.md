# ArrayBuffer

- in Web-development we meet binary data mostly when dealing with files(create, upload, download) and image processing.
- Binary data in JavaScript is important in a non-standard way.
- The Basic Binary Object is `ArrayBuffer` - a reference to a fixed-length Binary Buffer.

### What is Buffer?
- `Buffer` is a temporary space in a memory used to store binary data.

```js
let buffer = new ArrayBuffer(16);
console.log(buffer.byteLength); // Return 16
```

- this allocate configue memory area of `16` byte with `Zeros`.
- ArrayBuffer is not an array of something

  - It has a fixed length, we can’t increase or decrease it.
  - It takes exactly that much space in the memory.
  - To access individual bytes, another “view” object is needed, not `buffer[index]`.

- To manipulate an `ArrayBuffer`, we need to use a `“view”` object (**TypedArray**).
- The `view` Object will not store any Value. it's the `eyeglasses` that give an interpretation of the bytes stored in the `ArrayBuffer`.

  - `Uint8Array` - treat 1 byte as an integer number. `0` to `255`. called as `8-bit unsigned integer`
  - `Uint16Array` - treat 2 bytes as an integer Number. `0` to `2^16 - 1`. called as `16-bit unsigned integer`.
  - `Uint32Array` - Treat 4 bytes as an integer Number. `0` to `2^32 - 1`. called as `32-bit unsigned integer`.
  - `Float64Array` - Treat 8 bytes as an Float Number. `5.0*10^-324` to `1.8*10^308`.

    ![View for ArrayBuffer](./View%20for%20ArrayBuffer.png)

# TypedArray

- TypedArray is Ragular Array, but use to work with binary data in a more structured and efficient manner. (what?)
- TypedArrays are designed to work directly with binary data, providing better performance and memory management. (why?)
- TypedArray has all Array method accept

  - No `Splice` - because we can't delete data in buffer
  - No `concat`.

- There are 2 additional Methods
  - `arr.set(fromArr, [offset])` - copies all elements from fromArr to the arr, starting at position offset (0 by default).
  - `arr.subarray([begin, end])` - creates a new view of the same type from begin to end (exclusive). do not copy just create new view.

# DataView

- `DataView` is a special super-flexible “untyped” view over `ArrayBuffer`. It allows to access the data on any offset in any format.
  - format like `.getUint(8)`, `.getUint(16)` Methods to get value in that format
- Syntax:

  ```
  new DataView(buffer, [byteOffset], [byteLength])
  ```

  - `buffer` - ArrayButter
  - `byteOffset` - starting byte position of the view (bydefault 0)
  - `byteLength` - byte length of view (by default till the end of `buffer`).
