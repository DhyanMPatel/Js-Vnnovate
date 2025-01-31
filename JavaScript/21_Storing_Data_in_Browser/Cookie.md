# Cookie

- Cookies are small strings of data that are stored directly in the browser.
- Cookies are usually set by a `web server` using the response `Set-Cookie` HTTP header.
- We can also access cookies from the browser, using `document.cookie` property.

## Document.cookie

- The value of `document.cookie` consists of `name=value` pairs, delimited by `;`.

### Reading

```js
console.log(document.cookie); // name=value pair list.
```

### Writing

```js
document.cookie = "user=John"; // update only cookie named 'user'
alert(document.cookie); // show all cookies
```

-  name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:

```js
// special characters (spaces) need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

- Cookie have several attributes
    1. Domain
    2. Path
    3. expire, max-age
    4. secure
    5. samesite
    6. XSRF attack
    7. httpOnly