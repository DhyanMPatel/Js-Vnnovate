# IndexedDB

- IndexedDB is a `database` that is built into a browser, much more powerful than `localStorage`.
  - Stores almost `any kind of values` by keys, multiple key types.
  - Supports transactions for reliability.
  - Supports key range queries, indexes.
  - Can store much bigger volumes of data than `localStorage`.

## Open IndexedDB Database

- we first need to `open` (connect to) a database.

  ```js
  let openRequest = indexedDB.open(name, version);
  ```

  - `name` - db name
  - `version` - positive integer version, by default 1

- The call returns `openRequest` object, we should listen to events on it:

  - `success`: database is ready, there’s the “database object” in openRequest.result, we should use it for further calls.
  - `upgradeneeded`: database is ready, but its version is outdated (see below).
  - `error`: opening failed.

## Object Store

- An object store is a core concept of IndexedDB. Counterparts in other databases are called “tables” or “collections”.

  ```js
  db.createObjectStore(name[, keyOptions]);
  ```
    - `name` is the store name, e.g. `"books"` for books, `"students"`, etc.
    - `keyOptions` is an optional object with one of two properties:
      - `keyPath` – a path to an object property that IndexedDB will use as the key, e.g. `id`. we can say `primary key`.
      - `autoIncrement` – if `true`, then the key for a newly stored object is generated automatically, as an ever-incrementing number.
    
- Example:
    ```js
    let openRequest = indexedDB.open("db", 2);

    // create/upgrade the database without version checks
    openRequest.onupgradeneeded = function() {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
        db.createObjectStore('books', {keyPath: 'id'}); // create it
      }
    };
    ```