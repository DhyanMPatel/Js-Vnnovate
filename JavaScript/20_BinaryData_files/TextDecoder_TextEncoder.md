# TextDecoder

- convert `Uint8Array` to `String`.

  ```js
  let decoder = new TextDecoder([label], [options]);
  ```

  - `label` - the encoding, like `utf-8` (default)
  - `options` -

- there is method that will conver `Uint8Array` to `String` which is `decoder.decode()`

  ```js
  let str = decoder.decode([input], [options]);
  ```

  - `input` - `BufferSource` to decode.
  - `options` - like `stream` use to handle continuous data.

# TextEncoder

- convert `String` to `Byte`.

  ```js
  let encoder = new TextEncoder();

  let encoding = encoder.encode(str);

  let uint8Array = new Uint8Array(10);

  let encodingInto = encoder.encodeInto(str, uint8Array);
  ```

## Go back to ArrayBuffer

- [ArrayBuffer](./01%20ArrayBuffer.md)

## Now Learn about Blob

- [Blob](./Blob.md)