# Resource Loading

- Browser allow us to Track loading of External Resources like `Scripts`, `Images` and so on. Exception is `Iframe` that have only `onload` event
- There are two events for it:

  - `onload` – successful load,
  - `onerror` – an error occurred.

## onload

- The main helper is the `load` event. It triggers after the script was loaded and executed.

  ```js
  let script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
  document.body.append(script);

  script.onload = function () {
    alert(_.VERSION);
  };
  ```

## onerror

- Error that occurs during the loading of the script can be tracked in an `error` event.

  ```js
  let script = document.createElement("script");
  script.src = "https://example.com/404.js"; // no such script
  document.body.append(script);

  script.onerror = function () {
    alert(`Error: ${this.error}, ${this.src}`);
  };
  ```

## Other Resources

- `onload` & `onerror` also work with other resources like: `<img>`, `<iframe>`

  ```js
  let img = document.createElement("img");
  img.src = "https://js.cx/clipart/train.gif";

  img.onload = function () {
    alert(`Image loaded, size ${img.width}x${img.height}`);
  };
  img.onerror = function () {
    alert("Error occurred while loading image");
  };
  ```

## Crossorigin Policy

- there are something which browser not support. if my domain is `https://Sample.com`

  - No another domain data access:- `google.com/api/dataset`.
  - No other port:- `https://Sample.com:5050`
  - same but different protocall:- `http://Sample.com` not allow.
  - No subdomain:- `api.Sample.com`

- There are three levels of cross-origin access:
  1. No `crossorigin` attributes - Access prohibit
  2. `crossorigin= "anonymous"` - Access allow if server respond with header `Access-Cross-Allow-Origin` with `*` that allow anyone.
  3. `crossorigin= "user-credentials"` - Access allow if server respond with header `Access-Cross-Allow-Origin` with our origin and `Access-Cross-Allow-Credentials: true`.

```html
<script>
  window.onerror = function (message, url, line, col, errorObj) {
    alert(`${message}\n${url}, ${line}:${col}`);
  };
</script>
<script
  crossorigin="anonymous"
  src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"
></script>
```


## Go back to Script async & defer

- [Script async & defer](./Script%20async%20&%20defer.md)

## Now Learn about Popup and Windows methods in Frames & Windows topic

- [Popup and Windows methods](../19_Frames%20&%20Windows/Popup_windowMethods.md)