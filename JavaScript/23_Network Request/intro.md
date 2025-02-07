# Network Request

## Fetch

- fetch is modern and versalite.
- Syntax:-
  ```js
  let promise = getch(url, [options]);
  ```
  - `url` – the URL to access.
  - `options` – optional parameters: method, headers etc.
- without `options`, this is simple `GET` request, downloading a content of URL.

- Request Properties like

  - `ok`- return `true` if HTTP-status is 200-299.
  - `status` - if HTTP-status return 200.

- `Response` provides multiple promise-based methods to access body in various formats.

  - `responsce.json()` - return as json.
  - `responce.text()` - return as text format
  - `responce.formData()` - return as formData Object
  - `responce.blob()` - return as blob(binary data with type)
  - `responce.ArrayBuffer()` - return as ArrayBuffer

- [We can choose only one body-reading method]
  ```js
  let res1 = response.text(); // response body consumed
  let res2 = response.json(); // fails (already consumed)
  ```

### Response Header

-
