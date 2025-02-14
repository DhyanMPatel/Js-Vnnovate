# Network Request

- API basically work on Request and Responce.
- In past We get Data in `AJAX` format and now get Data in `JSON` format

## Fetch

- fetch is modern and versalite.
- Syntax:-
  ```js
  let promise = fetch(url, [options]);
  ```
  - `url` – the URL to access.
  - `options` – optional parameters: method, headers etc.
- without `options`, this is simple `GET` request, downloading a content of URL.

# Note

- Getting a Response is a 2-step Process

  1. An object of Response class cantaining "Status" & "ok" properties.
  2. After that we need to call another method to access the body in different formats.

- Request Properties like (1st then)

  - `ok`- return `true` if HTTP-status is 200-299.
  - `status` - if HTTP-status return 200.

- `Response` provides multiple promise-based methods to access body in various formats. (2nd then)

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

- The response headers are available in a Map-like headers object in `response.headers`.
- They are not proper Map. but similar method to get individual header.

- Response Header will get when we fetch any API and get any response. They are available in `response.header`.

### Request Header

- Request Header is a header that we pass with our Request.
- To set a Request Header in fetch, we can use the header option.

  ```js
  let res = fetch(url, {
    header: {
      Authentication: "secret",
    },
  });
  ```

### Response Status Codes

- Response status codes indicate specific `HTTP` request has been successfully completed or not.
- There are total 5 Classes
  - `Informational Responses` (100-199)
  - `Successfull Response` (200-299)
  - `Redirecting Response` (300-399)
  - `Client error Response` (400-499)
  - `Server error Response` (500-599)

# FormData

- `FormData` is about sending HTML forms: with or without files, with additional fields and so on
