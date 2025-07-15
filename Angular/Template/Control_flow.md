# Control flow

- Angular templates support control flow blocks that let you conditionally `show`, `hide`, and `repeat` elements.

- There are Control flow structural directives like `@if`, `@else-if`, `@else`, `@for`.

```js
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

### Referencing the conditional expression's result

The `@if` conditional supports saving the result of the conditional expression into a **variable** for `reuse inside of the block`.

```js
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```
- This can be useful for `referencing longer expressions` that would be easier to read and maintain within the template.

### Repeat content with the @for block

```js
@for (item of items; track item.id) {
  {{ item.name }}
}
```
- Angular's `@for` block does not support flow-modifying statements like JavaScript's `continue` or `break`.

- The **`track`** expression allows Angular to **maintain a relationship** between your `data` and the `DOM nodes` on the page. This allows Angular to optimize performance by executing the minimum necessary DOM operations when the data changes.

  ![Contextual Variable in @for block](./Contextual%20Variable%20in%20for%20block.png)

- Example:-

```js
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

### Providing a fallback for @for blocks with the @empty block

- You can optionally include an @empty section immediately after the @for block content. The content of the @empty block **displays when there are no items**:

  ```js
  @for (item of items; track item.name) {
    <li> {{ item.name }}</li>
  } @empty {
    <li aria-hidden="true"> There are no items. </li>
  }
  ```

### Conditionally display content with the @switch block

- While the @if block is great for most scenarios, the @switch block provides an alternate syntax to conditionally render data. Its syntax closely resembles JavaScript's switch statement.

  ```js
  @switch (userPermissions) {
    @case ('admin') {
      <app-admin-dashboard />
    }
    @case ('reviewer') {
      <app-reviewer-dashboard />
    }
    @case ('editor') {
      <app-editor-dashboard />
    }
    @default {
      <app-viewer-dashboard />
    }
  }
  ```

# Note : Now learn about pipe in Template

[Pipes for transform data declaratively](./pipes.md)