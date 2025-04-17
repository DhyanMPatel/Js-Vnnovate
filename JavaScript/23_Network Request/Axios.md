# Axios

- Axios is a promise-based HTTP library that helps you easily communicate with servers or APIs

- Make `XMLHttpRequests` from the browser.
- Make `http requests` from node.js.
- Supports the `Promise API`.
- Intercept request and response.
- Transform request and response data.
- Provide `Cancel` Requests.
- `Automatic transforms for JSON data`.
- 🆕 Automatic data object serialization to multipart/form-data and x-www-form-urlencoded body encodings.
- Client side support for protecting against `XSRF`.

- In Response we get `data`, `status`, `statusText`, `headers`, `config`, `request` information.

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

# Axios API

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
    url: "https://api.example.com/Users",
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
    baseURL: "https://api.example.com",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });
  instance.default.headers.common["Authorization"] = AUTH_TOKEN; //   use `default` keyword to make global axios like above
  instance.default.headers.common["timeout"] = 2500;
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

### Example

```js
import axios from "axios";

// Making a GET request to fetch data
axios
  .get("https://example.com/users", config?)
  .then((res) => console.log(`Data: ${res.data}`))
  .catch((err) => console.error(`Error: ${err}`));

let user = {
  name: "John Doe",
  email: "john@test.com",
};
let config = {
  headers: {
    Authorization: "Bearer <token>",
  },
};

axios
  .post("https://example.com/users/user1", user, config?)
  .then((res) => console.log(`User Created: ${res.data}`))
  .catch((err) => console.error(`Error: ${err}`));
```

- Instance of Axios

```js
instance.get("https://example.com", {
  timeout: 5000, // Override for this Request.
});
```

## Interceptors

- There are 2 Types of Interceptors `Response Interceptors` & `Request Interceptors`.
- Interceptors use to do Something with Response and Request before `.then()` and `.catch()`.
- We can create Interceptors for `instance` also.

```js
//  Add Request interceptor
let reqInter = axios.interceptors.request.use(
  function (config) {
    //  We can modify before request is sent
    return config;
  },
  function (error) {
    //    We can do something with request error
    return error;
  }
);

//  Add Response Interceptor
let resInter = axios.interceptors.response.use(
  function (response) {
    //  We can do Something with Response data
    return response;
  },
  function (error) {
    //  We can do something with Response error
    return Promise.reject(error);
  }
);

//  Remove Interceptors
axios.interceptors.request.eject(reqInter);

//  Clear Interceptors from Req or Res.
axios.interceptors.request.clear();
axios.interceptors.response.clear();
```

- Using `validateStatus` config, you can override the default conditions (status >= 200 && status < 300) and define HTTP code(s) that should throw an error.

- You can cancel requests using the `CancelToken` feature in Axios.
