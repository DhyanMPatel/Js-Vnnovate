# Axios Interceptors

- There are 2 type of interceptors

  ```js
  // Add Request Interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something when request give error
      return Promise.reject(error);
    }
  );
  ```

  ```js
  // Add Response Interceptor
  axios.interceptors.response.use(
    function (response) {
      // When Satus code lie within the range of 2xx this func trigger.
      // Do something before response is handled by .then() or .catch().
      return response;
    },
    function (error) {
      // outside the range of 2xx trigger this func.
      // Do something with error
    }
  );
  ```

- If we need to **remove** an Interceptor

  ```js
  // Request Interceptor
  const MyInterceptor = axios.interceptors.request.use(...);
  axios.interceptors.request.eject(MyInterceptor);

  // Response Interceptor
  const InterceptorId = axios.interceptors.response.use(
    res=> res,
    err=>{
        return Promise.reject(err);
    }
  )
  axios.interceptors.response.eject(InterceptorId);
  ```

- There are also remove possible in response **after condition is met**.

- Interceptor to custom **instunce**

  ```js
  const Axios = axios.create({...})
  Axios.interceptors.request.use(...)
  ```
