# Variable in Angular

- Angular has two types of variable declarations in templates: `local template variables` and `template reference variables`.

## local Template Variable with `@let`

- Angular's `@let` syntax allows you to define a local variable and re-use it across a template

```js
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
@let longExpression = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna ' + 'Ut enim ad minim veniam...';
```

## Template reference variables

- A template reference variable is a way to get a `reference to a DOM element` or `Angular component` from your HTML template.

- Example:-

  - You’re building a **basic newsletter form**.
  - When a user enters their email and clicks Subscribe, you grab the input value using a template reference variable (without needing `[(ngModel)]` or a reactive form).

  - app.component.ts

  ```js
  // app.component.ts
  import { Component } from "@angular/core";

  @Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    standalone: true,
  })
  export class AppComponent {
    submitEmail(email: string) {
      console.log("Subscribed email:", email);
      alert(`Thanks for subscribing with: ${email}`);
    }
  }
  ```

  - app.component.html

  ```html
  <!-- app.component.html -->
  <div style="margin: 20px; max-width: 400px;">
    <h2>Subscribe to our Newsletter</h2>

    <input
      #emailInput
      type="email"
      placeholder="Enter your email"
      class="form-control"
    />

    <button
      (click)="submitEmail(emailInput.value)"
      class="btn btn-primary mt-2"
    >
      Subscribe
    </button>
  </div>
  ```

# Note : Now Learn Directives

[Directives are markers of DOM](../Directives/intro.md)