# Angular Templates

Every Angular component has a template that defines the `DOM` that the component renders onto the page.

Templates are based on `HTML syntax`, with additional features such as `built-in template functions`, `data binding`, `event listening`, `variables`, and more.

### Differences from standard HTML

1. Component and directive elements can be self-closed (e.g., `<UserProfile />`).
2. Attributes with certain characters (i.e., `[]`, `()`, etc.) have special meaning to Angular.
3. Angular ignores and collapses unnecessary whitespace characters.
4. Angular may add comment nodes to a page as placeholders for dynamic content, but developers can ignore these.
5. Angular does not support `<script>` element in templates.

### Use of Templates:
- **Data Binding**: To dynamically display data and interact with the component class.
- **Directives**: To `manipulate the DOM` based on the data and application logic.
- **Pipes**: To `transform data` before displaying it in the view.

<!-- ## Binding dynamic text, properties and attributes

In Angular, a binding creates a `dynamic connection between a component's template and its data`. This connection ensures that changes to the component's data automatically update the rendered template.

### Render dynamic text with text interpolation

- You can bind dynamic text in templates with `double curly braces`, which tells Angular that it is responsible for the expression inside and ensuring it is updated correctly. This is called **text interpolation**.

```js
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
``` -->

### Data Binding in Templates

Data binding is a powerful feature of Angular that **connects** the `template` (`view`) to the `component class` (`model`). There are several types of data binding in Angular:

1. Interpolation :
    - Interpolation is used to `display dynamic data from the component class in the template`.

        ```html
        <!-- Template -->
        <p>{{ name }}</p> <!-- Displays the value of name property -->
        ```

2. Property Binding :
    - Property binding allows you to `bind values from the component class to HTML element properties`.

        ```html
        <!-- Template -->
        <input [value]="name"> <!-- Binds the input value to the name property -->
        ```
3. Event binding :
    - Event binding lets you `respond to user actions` like clicks, input changes, and form submissions.

        ```html
        <!-- Template -->
        <button (click)="sayHello()">Click Me</button>
        ```

        ```js
        // Component class
        sayHello() {
            alert('Hello, Angular!');
        }
        ```
4. Two-Way Data Binding
    - Two-way data binding allows synchronization between the component class and the template using `[(ngModel)]`. This is often used in form inputs.

        ```html
        <!-- Template -->
        <input [(ngModel)]="name">
        <p>{{ name }}</p> <!-- Displays the updated value as user types -->
        ```
    - To use ngModel, you need to import the `FormsModule` from **@angular/forms** in your module.


## CSS class and style property bindings

### CSS classes

```js
@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses"> ... </section>
    <button [class]="buttonClasses"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = ['expandable', 'elevated'];
  buttonClasses = {
    highlighted: true,
    embiggened: false,
  };
}
```
- above Example render like,
    ```html
    <ul class="full-width outlined"> ... </ul>
    <section class="expandable elevated"> ... </section>
    <button class="highlighted"> ... </button>
    ```

- Angular ignores any string values that are not valid CSS class names.

### CSS style properties

You can also bind to CSS style properties directly on an element.

```html
<!-- Set the CSS `display` property based on the `isExpanded` property. -->
<section [style.display]="isExpanded ? 'block' : 'none'">
```

Example:-
```js
@Component({
  template: `
    <ul [style]="listStyles"> ... </ul>
    <section [style]="sectionStyles"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = 'display: flex; padding: 8px';
  sectionStyles = {
    border: '1px solid black',
    'font-weight': 'bold',
  };
}
```

- above code rendered like,
    ```html
    <ul style="display: flex; padding: 8px"> ... </ul>
    <section style="border: 1px solid black; font-weight: bold"> ... </section>
    ```

## Two-Way Data binding

The syntax for two-way binding is a combination of square brackets and parentheses, `[()]`.

### Two-way binding with form controls

-  when a user fills out a text input, it should update the state in the component.

```js
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `
})
export class AppComponent {
  firstName = 'Ada';
}
```

- To use two-way binding with native form controls, you need to:

    1. Import the `FormsModule` from `@angular/forms`.
    2. Use the `ngModel` directive with the two-way binding syntax (e.g., `[(ngModel)]`)
    3. Assign it the state that you want it to update (e.g., `firstName`).

### Two-way binding between components

Two-way binding between a `parent` and `child` component requires more configuration compared to form elements.


```js
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

```js
// './counter/counter.component.ts';
import { Component, model } from '@angular/core';
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count() }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  count = model<number>(0);
  updateCount(amount: number): void {
    this.count.update(currentCount => currentCount + amount);
  }
}
```
- **`Note`** : 
    - The child component must contain a `model` property.
    - The parent component must:
        - Wrap the `model` property name in the two-way binding syntax.
        - Assign a property or a signal to the `model` property.

# Note : Now you Learn Control flow

[Control flow](./Control_flow.md)