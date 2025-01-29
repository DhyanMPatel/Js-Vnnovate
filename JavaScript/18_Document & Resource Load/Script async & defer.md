# Async & defer Script

- When the browser loads HTML and comes across a `<script>...</script>` or `<script src="..."></script>` tag, it can’t continue building the DOM.
- That leads to two important issues:

  - Scripts can’t see DOM elements below them, so they `can’t add handlers` etc.
  - If there’s a `bulky script` at the top of the page, it “blocks the page”. Users can’t see the page content till it downloads and runs:

## Solution

### Script after HTML Content

- Write all Script after HTML content

  ```html
  <body>
    ...all content is above the script...

    <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
  </body>
  ```

- But that still problem, where slow network arive they face problem like all HTML content loaded but not display untill script will done. theres come `defer`.

### Defer

- The `defer` attribute tells the browser not to wait for the `script`. Instead, the browser will continue to process the `HTML`, build DOM. The script loads `“in the background”`, and then runs when the DOM is fully built (but before `DOMContentLoaded` event).

  ```html
  <p>...content before script...</p>
  <!-- 1) -->

  <script>
    document.addEventListener("DOMContentLoaded", () =>
      alert("DOM ready after defer!")
    );
  </script>
  <!-- 4) -->

  <script
    defer
    src="https://javascript.info/article/script-async-defer/long.js?speed=1"
  ></script>
  <!-- 3) -->

  <!-- visible immediately -->
  <p>...content after script...</p>
  <!-- 2) -->
  ```

- `Deferred` scripts keep their relative order, just like regular scripts.
- The `defer` attribute is only for external scripts. ingore if `<script>` has no `src`

### Async

- The `async` attribute means that a script is completely independent:
  - the browser doesn't block on `async` script.
  - `Async` script will not wait for other scripts and vise versa
  - `DOMContentLoaded` also not wait for `async`.
    1. `DOMContentLoaded` may happend before if `async` script will finish loading after page complete
    2. `DOMContentLoaded` may happend after if `async` script was shorter or in HTML-cache.
- Not like `defer` that they are also not Synchronious with each other. means, if small script will load first then it will run first then long script run after completion. follow `"load-first order"`

  ```html
  <p>...content before scripts...</p>

  <script>
    document.addEventListener("DOMContentLoaded", () => alert("DOM ready!")); //    1)
  </script>

  <script
    async
    src="https://javascript.info/article/script-async-defer/long.js"
  ></script>
  <!--  3)  -->
  <script
    async
    src="https://javascript.info/article/script-async-defer/small.js"
  ></script>
  <!--  2)  -->

  <p>...content after scripts...</p>
  ```

- If Script is catched then `long` script will run first then `small` script
- The `async` attribute is only for external scripts. Ignored if the `<script>` tag has no `src`.

### Dynamic Script

- Create a script and append it to the document dynamically using Javascript.
- Dynamic scripts behave as `“async”` by default. can be change if we explicitly set `script.async = false`. then it will execute just like `defer`.

  ```js
  let script = document.createElement("script");
  script.src = "https://google-analytics.com/analytics.js";
  document.body.append(script);
  ```

  ```js
  function loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.append(script);
  }

  // long.js runs first because of async=false
  loadScript("/article/script-async-defer/long.js"); // 1)
  loadScript("/article/script-async-defer/small.js"); // 2)
  ```
