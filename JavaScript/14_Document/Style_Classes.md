## className

- the `elem.className` corresponds to the "class" attribute.
- `elem.className`, it replaces the whole string of classes. Sometimes that’s what we need, but often we want to add/remove a single class.

## classList

- The `elem.classList` is a special object with methods to `add/remove/toggle` a single class.
- Methods of `elem.classList`:
  - `elem.classList.add/remove("class")` – adds/removes the class.
  - `elem.classList.toggle("class")` – adds the class if it doesn’t exist, otherwise removes it.
  - `elem.classList.contains("class")` – checks for the given class, returns true/false.
