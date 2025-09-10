# Cross Window Comunication

- the purpose of the “Same Origin” policy is to protect users from information theft.

- We can access them using properties:

  - `iframe.contentWindow` to get the window inside the `<iframe>`.
  - `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

```html
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function () {
    // we can get the reference to the inner window
    let iframeWindow = iframe.contentWindow; // OK
    try {
      // ...but not to the document inside it
      let doc = iframe.contentDocument; // ERROR
    } catch (e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
      let href = iframe.contentWindow.location.href; // ERROR
    } catch (e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
    iframe.contentWindow.location = "/"; // OK

    iframe.onload = null; // clear the handler, not to run it after the location change
  };
</script>
```

- But from same site

```html
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function () {
    iframe.contentDocument.body.prepend("Hello World!");
  };
</script>
```

## Window on Subdomain

- What if there are 2 subdomains like `john.site.com`, `peter.site.com`. Here `site.com` is same so we can use `document.domain` property to pass `site.com` and can possible that browser will ignore that subdomain as different domain

```js
document.domain = "site.com";
```

- Now they can interact without limitations. Again, that’s only possible for pages with the same second-level domain.

## iframe: wrong document pitfall

```html
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function () {
    let newDoc = iframe.contentDocument;
    // the loaded document is not the same as initial!
    alert(oldDoc == newDoc); // false
  };
</script>
```

- Here oldDoc and newDoc are not same although newDoc is made from oldDoc. This behaviour should know.
- Due to this behaviour we can't set handler on it, they will ignored.

# Collection: window.frames

- An alternative way to get a window object for `<iframe>` – is to get it from the named collection `window.frames`:

  - By number: `window.frames[0]` – the window object for the first frame in the document.
  - By name: `window.frames.iframeName` – the window object for the frame with name="iframeName".

```html
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>
<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

- An iframe may have other iframes inside. The corresponding window objects form a hierarchy.
- Navigation links are:

  - `window.frames` – the collection of “children” windows (for nested frames).
  - `window.parent` – the reference to the “parent” (outer) window.
  - `window.top` – the reference to the topmost parent window.

```js
if (window == top) {
  // current window == window.top?
  alert("The script is in the topmost window, not in a frame");
} else {
  alert("The script runs in a frame!");
}
```

## sandbox

- The sendbox attribute enables an extra set of restrictions for the content in the iframe.
- An empty `"sandbox"` attribute puts the strictest limitations possible.
- there are list of Limitations:
  - `allow-same-origin` - allow iframe content to be treated as begin from same origin.
  - `allow-script` - Re-enable scripts.
  - `allow-forms` - Re-enable form submition
  - `allow-top-navigation`- allows the iframe content to navigate its top-level browsing context. Here needs to add `allow-same-origin` which means it comes from same origin
  - `allow-popups` - Allows to window.open popups from the iframe

# Cross-window Messaging

- the `postMessage` interface allows windows to talk with each other no matter which origin they are from.

## postMessage

- The window that wants to send a message calls `postMessage` method of the receiving window.
- Syntax:-
  `newWindow.postMessage(data, targetOrigin)`
  - `data` - the data to send.
  - `targetOrigin` - Specifies the origin for the target window, so that only a window from the given origin will get the message.

```html
<!-- Index.html -->
<iframe src="https://example.com" name="example"></iframe>

<script>
  let win = window.forms.example;

  win.postMessage("Message", "https://example.com"); // this data will pass to example.com origin
</script>
```

## onMessage

- this is event handler `message`. it trigger when `postMessage` is called
- Properties of `message` event:
  - `data` - data from postMessage
  - `origin` - origin of sender, Ex-index.html
  - `source` - reference to the sender window.

## Go back to Popup and Windows methods

- [Popup and Windows methods](./Popup_windowMethods.md)

## Now Learn about The Clickjacking attack

- [Clickjacking attack](./Clickjaking.md)
