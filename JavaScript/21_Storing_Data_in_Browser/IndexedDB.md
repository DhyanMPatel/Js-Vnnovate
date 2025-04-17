# IndexedDB

- IndexedDB is a `database` that is built into a browser, much more powerful than `localStorage`.

  - Stores almost `any kind of values` by keys, multiple key types.
  - Supports transactions for reliability.
  - Supports key range queries, indexes.
  - Can store much bigger volumes of data than `localStorage`.

- Note: Data Stored based on primary key index.

## Open IndexedDB Database

- we first need to `open` (connect to) a database.

  ```js
  let openRequest = indexedDB.open(name, version);
  let deleteRequest = indexedDB.deleteDatabase(name);
  ```

  - `name` - db name
  - `version` - positive integer version, by default 1

- The call returns `openRequest` object, we should listen to events on it:

  - `success`: database is ready, there’s the “database object” in `openRequest.result`, we should use it for further calls.
  - `upgradeneeded`: database is ready, but its version is outdated (see below).
  - `error`: opening failed. and recieve error in `openRequest.error`.

- If the **local database version** is less than specified in `open`, then a special event upgradeneeded is triggered, and we can compare versions and upgrade data structures as needed.

## Object Store

- An object store is a core concept of IndexedDB. Counterparts in other databases are called “tables” or “collections”.

  ```js
  db.createObjectStore(name[, keyOptions]);
  db.deleteObjectStore(name[, keyOptions]);

  ```

  - `name` is the store name, e.g. `"books"` for books, `"students"`, etc.
  - `keyOptions` is an optional object with one of two properties:
    - `keyPath` – a path to an object property that IndexedDB will use as the key, e.g. `id`. we can say `primary key`.
    - `autoIncrement` – if `true`, then the key for a newly stored object is generated automatically, as an ever-incrementing number.

- Example:

  ```js
  let openRequest = indexedDB.open("colledge", 2);

  // create/upgrade the database without version checks
  openRequest.onupgradeneeded = function () {
    let db = openRequest.result;
    if (!db.objectStoreNames.contains("students")) {
      // if there's no "students" store
      db.createObjectStore("students", { keyPath: "id" }); // create it
    }
  };
  ```

## Transactions

- A transaction is a group of Operations, that should either all `succeed` or all `fail`
- All Data Operation must be made withing a `Transaction` in IndexDB.
- When all transaction requests are finished, and the `microtasks queue` is empty, it is committed automatically.
- A failed request automatically aborts the transaction, canceling all its changes.
- IndexedDB events bubble: `request` -> `transaction` -> `database`.
- To stop abort Transaction use `e.preventDefault()`, which is used in Event Delegation.
- To stop bubble error use `e.stopPropogation()`, which is used in Event Delegation.

- Object stores support two methods to store a value:

  - `put(value, [key])` - If there is already key exist then value will be update
  - `add(value, [key])` - If there is key already exist then return error.

- Events with Transactions
  - `onsuccess` - if request complete their operation.
  - `onerror` - if request generate error
  - `oncomplete` - Guarentees that transaction is saved as a whole.
  - `onabort`
- Syntax:

  ```js
  db.transaction(store, [type]);
  ```

  - `store` - ObjectStore Name where we want to perform transaction
  - `type` - transaction type: `Readonly`(only read), `readwrite`(not create/remove/alter data).

  ```js
  let openReques = indexDB.open("colledge", 2);
  openRequest.onsuccess = function (e) {
    let db = openRequest.result;
    let transaction = db.transaction("students", "readwrite");

    // Get that Object store to operate on it.
    let students = transaction.objectStore("students");

    let request = students.add({
      id: 1,
      name: "John",
      email: "john@test.com",
    });

    request.onsuccess = (e) => {
      console.log(e.target.result);
    };
    request.onerror = (e) => {
      console.log(e);
    };
  };
  ```

# Searching

- Transaction have 2 way to search
  - By `key value` or `key range`: e.g. "students.id".
  - By `object property`: e.g. "students.name"

## By key

- If there is no any key then return `undefined`.
- `IDBKeyRange` Objects that specify an acceptable "key value"

  - `IDBKeyRange.upperBound(upper, [open])` means: `>lower` if `open` is true
  - `IDBKeyRange.lowerBound(lower, [open])` means: `<upper` if 'open' is true
  - `IDBKeyRange.bound(lower, upper, [loweOpen], [upperOpen])` means: between `lower` and `upper`.
  - `IDBKeyRange.only(key)` - a range that consist of only one `key`, rarely used.

- Real searching Methods are,

  - `objStore.get(query)` - search for the first value by a key or a range
  - `objStore.getAll([query], [count])`- search for all values, limit by `count` if given.
  - `objStore.getKey(query)` - search for the first key that satisfies the query, usually a range.
  - `objStore.getAllKey([query], [count])` - search for all keys that satisfy the query, usually a range, up to `count` if given.
  - `objStore.count([query])` - get the total count of keys that satisfy the query, usually a range.

- This Result will provide at `onsuccess` event if no any error.

## By Field using index

- to Search by Object field, need to create additional data structure named `index`.

  ```js
  ObjectStore.index(colName);
  ```

  - `colName` - Collumn name that we want to create index

# Delete Data

- The `delete` method looks up values to delete by a query, the call format is similar to `getAll`:

  - `delete(query)` – delete matching values by query.
  - `clear()` - clear the storage.

  ```js
  ObjectStore.delete(keyPath value);
  ObjectStore.clear();
  ```

# Cursor

- In real-life Object can be huge, bigger then available array. Then `getAll`/`getAllKey` methods we fail to get all resources as Array. Here `Cursor` comes
- [A Cursor is a special Object that traverses the Object Storage, given a query, and return one key-value at a time, thus saving memory].

  ```js
  let request = ObjectStore.openCursor(query, [direction]);
  ```

  - `query` - query is same as in `getAll`
  - `direction` - give list, which order to use like: `next`(default), `prev`, `nextunique`, `prevunique`.

- Cursor trigger `request.onsuccess` event multiple times: once for each result

# Promise Wrapper

- To make simple we `Delegation` but `async/await` is much more convenient.

  ```js
  let db = await idb.openDB('college', 1, db => {
    if(db.oldValue == 0){
      db.createObjectStore('students', {keyPath: 'id'});
    }
  });

    let transaction = db.transaction("students", "readwrite");
    let students = objectStore.transaction("students");

    try{
      await students.add({
        id:10,
        name: "Dhyan",
        email: "dhyan@test.com"
      })
      await students.add({...})
      await students.add({...})

      await transaction.complete;

      console.log("Students Added")
    } catch(e){
      console.log("Error: ", e.message)
    }
  ```

-
