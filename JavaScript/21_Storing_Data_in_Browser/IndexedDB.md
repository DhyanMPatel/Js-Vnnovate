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
  - `error`: opening failed.
  - `upgradeneeded`: database is ready, but its version is outdated (see below).
