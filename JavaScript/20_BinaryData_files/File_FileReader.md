# File

- A `File` object inherits from `Blob` and is extended with filesystem-related capabilities.
- Two ways to Obtain it:

  ```js
  new File(filePart, fileName, [options]);
  ```

  - `fileParts` – is an array of `Blob/BufferSource/String` values.
  - `fileName` – file name string.
  - `options` -
    1. `lastModified` - The timestamp (integer date) of last modification

- Second, more often we get a file from `<input type="file">` or `drag’n’drop` or other browser interfaces. In that case, the file gets this information from OS.

- `File` inherite from `blob`. So `File` objects have the same properties, plus:

  - `name`: the file name
  - `lastModified`: last modified timestamp.

    ```html
    <input type="file" onchange="showFile(this)" />

    <script>
      function showFile(input) {
        let file = input.files[0];

        alert(`File name: ${file.name}`); // e.g my.png
        alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
      }
    </script>
    ```

# FileReader

- `FileReader` is an object with the sole purpose of reading data from `Blob`

  ```js
  let reader = new FileReader(); // no arguments
  ```

- The main methods:

  - `readAsArrayBuffer(blob)` – read the data in binary format `ArrayBuffer`.
  - `readAsText(blob, [encoding])` – read the data as a text string with the given encoding (utf-8 by default).
  - `readAsDataURL(blob)` – read the binary data and encode it as base64 data url.
  - `abort()` – cancel the operation.

- As the reading proceeds, there are events:

  - `loadstart` – loading started.
  - `progress` – occurs during reading.
  - `load` – no errors, reading complete.
  - `abort` – abort() called.
  - `error` – error has occurred.
  - `loadend` – reading finished with either success or failure.

- When the reading is finished, we can access the result as:

  - `reader.result` is the result (if successful)
  - `reader.error` is the error (if failed).

- We can use it to convert a blob to another format:

  - `readAsArrayBuffer(blob)` – to ArrayBuffer,
  - `readAsText(blob, [encoding])` – to string (an alternative to TextDecoder),
  - `readAsDataURL(blob)` – to base64 data url.
