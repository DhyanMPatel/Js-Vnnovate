# Blob

- Blob stands for [Binary Large Object].
- It is represent raw Binary data. it can store `image`, `text`, `video`, any other binay content.
- Blob are Immutable. means they can't change after creation.
- we can use `slice()` to blob, which create now blob with same `type` by default with sliced data
- With `const` Reassignment is not possible but Modification still possible using `view` like `dataView`.

- Create a Blob,

  ```js
  let blob = new Blob(blobpart, options);
  ```

  - `blobpart` - is an Array of `blob`/`ArrayBuffer`/`String` values.
  - `options` - There are 2 Option. `Type` to show

  ```js
  // create Blob from a typed array and strings
  let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form

  let blob = new Blob([hello, " ", "world"], { type: "text/plain" });
  ```

- `blob.slice()`,

  ```js
  blob.slice([byteStart], [byteEnd], [contentType]);
  ```

  - `byteStart` - the starting byte, by default `0`.
  - `byteEnd` - the last byte (exclusive, by default till the end).
  - `contentType` - the `type` of the new blob, by default the same as the source.

- Use Cases of `Blob`,

  ✅ Store and manipulate binary data (e.g., images, videos, files).
  ✅ Download files dynamically in JavaScript.
  ✅ Read uploaded files before sending them to a server.
  ✅ Work with Web APIs like FileReader, fetch(), etc.

  ```js
  const buffer = new ArrayBuffer(8); // 8-byte buffer
  const view = new DataView(buffer);

  view.setInt8(0, 42); // Set first byte to 42
  console.log(view.getInt8(0)); // Output: 42
  ```

## Blob as URL

- A Blob can be easily used as a URL for `<a>`, `<img>` or other tags, to show its contents.
- Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

  ```html
  <!-- download attribute forces the browser to download instead of navigating -->
  <a download="hello.txt" href="#" id="link">Download</a>

  <script>
    let blob = new Blob(["Hello, world!"], { type: "text/plain" });

    link.href = URL.createObjectURL(blob);
  </script>
  ```

  - `URL.createObjectURL()` create unique URL like, `blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273`. Direct access to blob, no “encoding/decoding”.
  - `URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the `Blob` to be deleted.

# Blob to Base64

- to convert Blob to Base64 we use Built-in `FileReader` Object

  ```js
  let link = document.createElement("a");
  link.download = "hello.txt";

  let blob = new Blob(["Hello, world!"], { type: "text/plain" });

  let reader = new FileReader();
  reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

  reader.onload = function () {
    link.href = reader.result; // data url
    link.click();
  };
  ```

# Image to Blob

- Image operations are done via `<canvas>` element:

  - Draw an image (or its part) on canvas using `canvas.drawImage`.
  - Call canvas method `.toBlob(callback, format, quality)` that creates a Blob and runs callback with it when done.

    ```js
    // take any image
    let img = document.querySelector("img");

    // make <canvas> of the same size
    let canvas = document.createElement("canvas");
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    let context = canvas.getContext("2d");

    // copy image to it (this method allows to cut image)
    context.drawImage(img, 0, 0);
    // we can context.rotate(), and do many other things on canvas

    // toBlob is async operation, callback is called when done
    canvas.toBlob(function (blob) {
      // blob ready, download it
      let link = document.createElement("a");
      link.download = "example.png";

      link.href = URL.createObjectURL(blob);
      link.click();

      // delete the internal blob reference, to let the browser clear memory from it
      URL.revokeObjectURL(link.href);
    }, "image/png");
    ```

# Blob to ArrayBuffer

- Using `blob.arrayBuffer()` use can create `ArrayButter`.

  ```js
  // get arrayBuffer from blob
  const bufferPromise = await blob.arrayBuffer();

  // or
  blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
  ```

# Blob to Stream

- when read/write to blob of more then `2 GB`, the use of `ArrayBuffer` become more Memory intensive for us. so we use `Stream`.
- `blob.stream()` return `ReadableStream`
