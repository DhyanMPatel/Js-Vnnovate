# Cookie

- Cookies are small strings of data that are stored directly in the browser.
- Cookies are usually set by a `web server` using the response `Set-Cookie` HTTP header.
- We can also access cookies from the browser, using `document.cookie` property.
- Cookie Size is around 4KB.

- They are primarily used for authentication and session management.
- When a user logs in, the server sets a session cookie, which is sent with every request, allowing the server to recognize the user.

## Document.cookie

- The value of `document.cookie` consists of `name=value` pairs, delimited by `;`.

### Reading

```js
console.log(document.cookie); // name=value pair list.
```

### Writing

```js
document.cookie = "user=John; path=/; expires=Fri, 31 Dec 2025 23:59:59 GMT"; // update only cookie named 'user'
console.log(document.cookie); // show all cookies
```

### Encoding Special Characters

- name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:

```js
// special characters (spaces) need encoding
let name = "my name";
let value = "John Smith";

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

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

## Cookie Attributes

### Path

- `path=/mypath`
- It makes the cookie accessible for pages under that path. By default, it’s the current path.
  ```JavaScript
  document.cookie('name=Jhon; path=/admin')
  ```
  - it’s visible on pages `/admin` and `/admin/something` only

### Domain

- Allow access to Cookie across `subdomain`.

  ```JavaScript
  document.cookie = "user=John; domain=example.com";
  ```

### Expire

- Set Expiry date of Cookie

  ```JavaScript
  document.cookie = "user=John; expires=Fri, 31 Dec 2025 23:59:59 GMT";
  ```

- If we pass past value that will delete the Cookie

### Max-age

- Define how long (in Second) the Cookie Remain

  ```JavaScript
    document.cookie = "user=John; max-age=3600"; // Expires in 1 hour
  ```

- If we pass Zero or Negative value that will Delete Cookie

### secure

- Ensure the Cookie is only send over `Https`.

  ```JavaScript
    document.cookie = "user=John; secure";
  ```

### httpOnly

- prevent Javasript access to cookie (set via Server).
- We can’t see such a cookie or manipulate it using document.cookie.
  The web server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` attribute.

### samesite

- It’s designed to protect from so-called XSRF (cross-site request forgery) attacks.
- All forms generated by `bank.com` have a special field, a so-called `“XSRF protection token”`, that an evil page can’t generate or extract from a remote page. It can submit a form there, but can’t get the data back. The site bank.com checks for such a token in every form it receives.

  ```JavaScript
  document.cookie = "user=John; samesite=strict";
  document.cookie = 'user=John; samesite=lax';
  ```

  - there are 2 values of samesite:
    - `strict` - prevent user access from another site (Strict Protection)
    - `lax` - Allow cookie for safe GET Requests.
