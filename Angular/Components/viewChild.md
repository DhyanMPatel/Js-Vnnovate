## Use of viewChild Decorator

ViewChild is a powerful `decorator` that allows you to **access** and **manipulate** `child components`, `directives`, or `DOM elements` from a parent component.


### Steps to use ViewChild in Angular

Step 1: Create the Angular Application
```
ng new viewchild-demo
cd viewchild-demo
```

Step 2: Create a Child Component
```
ng generate component child
```

Step 3: Update the Child Component
```Js
// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true, 
  // Make sure this is true for standalone components
  template: `<h2>Child Component</h2>
             <p>{{ message }}</p>
             <button (click)="changeMessage()">Change Message</button>`,
})
export class ChildComponent {
  message: string = 'Hello from Child!';

  changeMessage() {
    this.message = 'Message changed!';
  }
}
```

Step 4: Update the Parent Component

```js
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Parent Component</h1>
             <app-child></app-child>
             <button (click)="callChildMethod()">Call Child Method</button>`,
  imports: [ChildComponent], 
})
export class AppComponent {
  @ViewChild(ChildComponent) child!: ChildComponent;

  callChildMethod() {
    if (this.child) {
      this.child.changeMessage();
    }
  }
}
```

Step 5: Update the App Module

```js
// app.module.ts
import { isStandalone, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component'; 

@NgModule({
    declarations: [
        AppComponent,
        ChildComponent 
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Step 6: Run the Application

```
ng serve
```

### How It Works

1. **Child Component**: The ChildComponent has a `message` that can be `changed via a button click`.

2. **Parent Component**: The AppComponent uses `ViewChild` to access the ChildComponent instance. The `callChildMethod()` function calls the `changeMessage()` method from the ChildComponent, changing the message displayed there.

### Why Use ViewChild?

1. **Encapsulation** : It enables you to keep child components encapsulated while `still allowing the parent to interact with them`.

2. **Dynamic Interaction** : You can `respond to user actions in the parent component` and `dynamically change the behavior` or `data` in the child component.

3. **Improved Performance** : Direct access to child components can `sometimes lead to performance benefits` over `event emitters`, especially in complex component hierarchies.

### Common Use Cases

1. **Accessing Methods** : Call a `method` defined `in a child component` when an `event` occurs `in the parent`.
2. **Manipulating Data** : Change properties in the child component based on user input or events in the parent.
3. **DOM Manipulation** : Access native DOM elements to perform `low-level operations`.

# Note: Now learn Standalone Component

[Standalone Component](./StandaloneComp.md)