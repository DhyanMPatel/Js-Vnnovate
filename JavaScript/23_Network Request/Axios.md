# Axios

- Make `XMLHttpRequests` from the browser.
- Make `http requests` from node.js.
- Supports the `Promise API`.
- Intercept request and response.
- Transform request and response data.
- Cancel requests.
- Automatic transforms for JSON data.
- 🆕 Automatic data object serialization to multipart/form-data and x-www-form-urlencoded body encodings.
- Client side support for protecting against `XSRF`.

## Package Install

- Using npm:

  ```
  npm install axios
  ```

- After installation, import the library using `import` or `reuired`.

  ```js
  // Use import
  import axios, { isCancel, AxiosError } from "axios";

  // Use Required - But only default export is available.
  const axios = require("axios");

  console.log(axios.isCancel("something"));
  ```

- Using jsDeliver CDN:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
  ```
