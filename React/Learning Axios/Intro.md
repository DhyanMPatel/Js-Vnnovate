# Axios

- `Axios` is a **promise-based HTTP client** for making requests in JavaScript. It works in both **browsers** and **Node.js** so it called as `Isomorphic`, allowing you to interact with APIs efficiently. Axios provides features like `request` and `response` **interception**, **automatic JSON transformation**, **request cancellation**, and **error handling**.
- On server side it use native node.js http module and in client side it uses XMLHttpRequests.

## What is Axios?

- Axios is a JavaScript library used to make HTTP requests, supporting RESTful API communication in web applications.

## Why should we use Axios?

- It simplifies API calls, automatically parses JSON responses, supports request cancellation, and provides robust error handling compared to the Fetch API.

## Where is Axios used?

- It is used in React, Vue.js, Angular, Node.js, and other JavaScript environments to communicate with REST APIs.

## When should you use Axios?

- When you need better error handling, automatic JSON parsing, request retry mechanisms, or when working with interceptors for authentication.

## Who uses Axios?

- Web developers working with frontend (React, Vue) and backend (Node.js) applications to fetch and send data efficiently.

# Axios Instance

- In Axios API there are fixed config like **method**, **url**, **data**. but in Instance there are custom config like **baseURL**, **headers**, **timeout**, etc.

  ```js
  // Simple Axios API
  axios({
    method: "post",
    url: "/user/12345",
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });

  // Axios with instance
  axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 5000,
    header: {
      "X-Custom-Header": "foobar",
    },
  });
  ```

## Request Config

- There are request configs like,

        1. url
        2. method
        3. baseURL
        4. allowAbsoluteUrls
        5. transformRequest
        6. transformResponse
        7. headers
        8. params
        9. paramsSerializer
        10. data
        11. timeout
        12. withCredentials
        13. adapter
        14. auth
        15. responseType
        16. responseEncoding
        17. xsrfCookieName
        18. xsrfHeaderName
        19. onUploadProgress
        20. onDownloadProgress
        21. maxContentLength
        22. maxBodyLength
        23. validateStatus
        24. maxRedirects
        25. socketPath
        26. httpAgent,httpsAgent
        27. proxy
        28. signal
        29. cancelToken
        30. decompress

## Responce Schema

- The response for a request contains the following information.

        1. data
        2. status
        3. statusText
        4. headers
        5. config
        6. request

- When using then, you will receive the response as follows:

  ```js
  axios.get("/user/12345").then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
  ```

- When using `catch`, or passing a `rejection callback` as second parameter of `then`, the response will be available through the **error object** as explained in the `Handling Errors` section.

## config Default

- We can specify config defaults that will be applied to every request.
  ```js
  axios.defaults.baseURL = "https://api.example.com";
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  ```

# Axios Interceptors

- Interceptors can **intercept** requests or responses before they are handled by `then` or `catch`.

- Axios interceptors used to **automate repitative tasks** like adding authentication tokens, handling errors globally, logging requests.

- When we need to **add header dynamicaly**, **handle authentication**, **process response error** use `Axios Interceptors`.

- Web developers who work on API with **secure** and **scalable** apps that require **authentication** and **error handling**.

# Handling Errors

- Example of error handling

  ```js
  axios.get("/user/12345").catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened that request triggered error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
  ```

- Using the `validateStatus` config option, you can define HTTP code(s) that should throw an error.

  ```js
  axios.get("/user/12345", {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });
  ```

- Using `toJSON` you get an object with more information about the HTTP error.

  ```js
  axios.get("/user/12345").catch(function (error) {
    console.log(error.toJSON());
  });
  ```

# Cancellation

- There are 2 methods to cancel request

  1. signal
  2. CancelToken() (deprecated)
