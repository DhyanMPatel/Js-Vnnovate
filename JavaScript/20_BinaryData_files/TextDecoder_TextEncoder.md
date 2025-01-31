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
