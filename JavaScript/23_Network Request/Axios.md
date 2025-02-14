# Axios

- Make `XMLHttpRequests` from the browser.
- Make `http requests` from node.js.
- Supports the `Promise API`.
- Intercept request and response.
- Transform request and response data.
- Provide `Cancel` Requests.
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

- Using unpkg CDN:

  ```html
  <script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
  ```

- Get method

  ```js
  import axios from "axios";
  // Making a GET request to fetch data
  axios
    .get("https://api.example.com/users")
    .then((response) => {
      console.log("Data:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  ```

  ```js
  async function getUser() {
    try {
      const response = await axios.get("/user?ID=12345");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  ```

- Post Method

```js
import axios from "axios";
// Making a POST request to send data
const user = {
  name: "John Doe",
  email: "john@example.com",
};
axios
  .post("https://api.example.com/users", user)
  .then((response) => {
    console.log("Data:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Axios API

- There are many Methods in Axios API

  - `axios.request(config)`
  - `axios.get(url[, config])`
  - `axios.delete(url[, config])`
  - `axios.head(url[, config])`
  - `axios.options(url[, config])`
  - `axios.post(url[, data[, config]])`
  - `axios.put(url[, data[, config]])`
  - `axios.patch(url[, data[, config]])`

- Get API

  ```js
  axios({
    method: "get",
    url: "",
  });
  ```

- Post API

  ```js
  axios({
    method: "post",
    url: "https://api.example.com/users",
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });
  ```

## Axios Instance Methods

- Axios allow us to create instance with custom configuration, making it easier to reuse like baseUrl, Headers, etc.
- Instance methods help `manage API calls efficiently`.

- Using `axios.create()`, can create instance of axios.
  ```js
  const instance = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout:5000
  ```

- Methods like,
  - `instance.request(config)`
  - `instance.get(url[, config])`
  - `instance.post(url[, data[, config]])`
  - `instance.put(url[, data[, config]])`
  - `instance.delete(url[, config])`
  - `instance.patch(url[, data[, config]])`
  - `instance.head(url[, config])`
  - `instance.options(url[, config])`