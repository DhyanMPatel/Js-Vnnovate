# LocalStorage & SessionStorage

- Web storage allows saving key-value pairs in the browser using two objects:

  - `localStorage` (persistent storage)
  - `sessionStorage` (temporary storage)

- Benefits of LocalStorage & SessionStorage

  - More storage (5MB+ vs. ~4KB for cookies)
  - Not sent with each request (better performance)
  - Only accessible via JavaScript (no server access via HTTP headers)
  - Storage is domain-specific (each origin has its own storage)

    ![Difference Between LocalStorage & SessionStorage](./Difference%20of%20Local%20&%20Session%20Storage.png)

- Both Storage type have same method

  - `setItem(key, value)` - store key-value pair.
  - `getItem(key)` - Retrive value by key.
  - `removeItem(key)` - Delete key-value pair.
  - `clear()` - Remove all Stored data.
  - `key(index)` - get key by the index.
  - `length` - Return the number of stored Item

    ```javaScript
    localStorage.setItem("Vnn", 15);
      alert(localStorage.getItem("Vnn"));
      alert(localStorage.key(0));
      alert(localStorage.length);

      setTimeout(() => localStorage.removeItem("Vnn"), 1500);

      setTimeout(() => localStorage.clear(), 2000);


    sessionStorage.setItem("Vnn", 15);
      alert(sessionStorage.getItem("Vnn"));
      alert(sessionStorage.key(0));
      alert(sessionStorage.length);

      setTimeout(() => sessionStorage.removeItem("Vnn"), 1500);

      setTimeout(() => sessionStorage.clear(), 2000);
    ```

- Object-like Access: we can access localStorage & SessionStorage like Object but it is not Recommended because of if key match a built-in methods like `length` then it cause unexpected behavior. instead always use `setItem()` & `getItem()`.

  ```js
  localStorage.test = "Hello";
  console.log(localStorage.test); // "Hello"
  delete localStorage.test; // Removes key
  ```

## Looping Through Storage

- they are not `iterable` same as Objects. So can use normal `for` loop or `.forEach()` on `Object.key()` loop.

```js
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}

let keys = Object.keys(localStorage);
for (let key in keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

## String Only

- If they were any other type, like a number, or an object, they would get converted to a string automatically

```javaScript
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

- So Object Must be converted using `JSON.Stringify()`.

```js
let user = { name: "Dhyan", age: 25 };

// Convert object to JSON string
localStorage.setItem("user", JSON.stringify(user));

// Retrieve and parse JSON
let storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // Output: "Dhyan"
```

## Storage Event

- When the data gets updated in `localStorage` or `sessionStorage`, `storage` event triggers, with properties:
  - `key` - the key that was changed (null if .clear() is called).
  - `oldValue` - the old value (null if the key is newly added).
  - `newValue` - the new value (null if the key is removed).
  - `url` - the url of the document where the update happened.
  - `StorageArea` - either `localStorage` or `sessionStorage`
