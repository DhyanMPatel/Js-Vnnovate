# DOM Tree

- The backbone of an HTML document is tags.
- `document.body` is the object representing the `<body>` tag.

  ![tags as Document](./tag%20as%20document.png)

- The text inside elements forms text nodes, labelled as `#text`. A text node contains only a string. It may not have children and is always a leaf of the tree.
- Spaces and newlines are totally valid characters
- Spaces at string start/end and space-only text nodes are usually hidden in tools
- Tables always have `<tbody>`
- In the DOM world `null` means “doesn’t exist”

  ```js
    <html> = document.documentElement

    <body> = document.body

    <head> = document.head
  ```

- The `childNodes` collection lists all child nodes, including text nodes.

  ```html
  <html>
    <body>
      <div>Begin</div>

      <ul>
        <li>Information</li>
      </ul>

      <div>End</div>

      <script>
        for (let i = 0; i < document.body.childNodes.length; i++) {
          alert(document.body.childNodes[i]); // Text, DIV, Text, UL, ..., SCRIPT
        }
      </script>
      ...more stuff...
    </body>
  </html>
  ```

## Go back to Browser Environment

- [Browser Environment & specs](./01%20Browser_Environment.md)

## Now Learn about Walking with DOM

- [Walking with DOM](./03%20Walking%20with%20DOM.md)





