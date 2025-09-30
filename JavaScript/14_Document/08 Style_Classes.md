## className

- the `elem.className` corresponds to the "class" attribute.
- `elem.className`, it replaces the whole string of classes. Sometimes that’s what we need, but often we want to add/remove a single class.

## classList

- The `elem.classList` is a special object with methods to `add/remove/toggle` a single class.
- Methods of `elem.classList`:
  - `elem.classList.add/remove("class")` – adds/removes the class.
  - `elem.classList.toggle("class")` – adds the class if it doesn’t exist, otherwise removes it.
  - `elem.classList.contains("class")` – checks for the given class, returns true/false.

## Element Style

- use to perform CSS operation using JS
- also we can use `style.cssText` to write css like:

```js
document.body.style.backgroundColor = prompt("background color?", "green");
document.body.style.cssText = "backgroundColor: green";
```

## getcomputedStyle (element, [pseudo])

- without this method we can't get any CSS value

```js
let list = document.getElementsByClassName("list")[0];
let computeStyle = getComputedStyle(list);

console.log(list.style.padding); // Empty

console.log(computeStyle.padding); // Return - 10px
```

## Resetting Properties

- `style.removeProperty('name of Property')` - use to remove perticuler CSS.
- also we can remove any perticular element style using removeProperty('style Property Name')
- there value is include only vanila CSS type values

```js
document.body.style.removeProperty("backgroundColor");
```

# Experiment

- create notification display for welcome.

```js
function showNotification({ top = 0, right = 0, className, html }) {
  let notification = document.createElement("div");
  notification.className = className;

  notification.innerHTML = `${html}`;
  notification.style.top = `${top}px`;
  notification.style.right = `${right}px`;

  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 1500);
}

// test it
let i = 1;
setInterval(() => {
  showNotification({
    top: 10,
    right: 10,
    html: "Hello " + i++,
    className: "welcome",
  });
}, 2000);
```

## Go back to Modifying the Document

- [Modifying the Document](./07%20Modlify_Document.md)

## Now Learn about Element Size and Scrolling

- [Element Size & Scrolling](./09%20Element_size_scrolling.md)