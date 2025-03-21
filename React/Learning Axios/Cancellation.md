# Cancellation

## signal

- There are `AbortController()` to cancel request in fetch API. use to reduce Network load.

  ```js
  const controller = new AbortController();

  axios.get("/example/api", {
    signal: controller.signal,
    // or
    signal: AbortSignal.timeout(5000);      // auto abort after 5 sec.
  }).then(function (response) {...});

    controller.abort();     // Cancel request
  ```

## CancelToken

- can cancel request using **CancelToken**.
