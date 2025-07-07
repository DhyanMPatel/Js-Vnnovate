## Standalone Component

- standalone components are a new feature that allows to `create components without the need for a module`. This can **simplify application structure** and **reduce boilerplate code**.


### What are Standalone Component?

- Standalone components are **`self-contained`**, meaning they include all the **necessary dependencies** and **configurations** within the **component itself**.

### Basic Standalone Component

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-basic-standalone',
    templateUrl: './basic-standalone.component.html',
    styleUrls: ['./basic-standalone.component.css'],
    standalone: true
})
export class BasicStandaloneComponent {
    // Component logic here
}
```
- In this approach, the component is **declared as standalone** by setting the `standalone property to true`. This allows the **component to be used** independently `without being part of a module`.

### Standalone Component with Dependencies

```js
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-standalone-with-deps',
    templateUrl: './standalone-with-deps.component.html',
    styleUrls: ['./standalone-with-deps.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class StandaloneWithDepsComponent {
    // Component logic here
}
```

- This approach demonstrates how to use standalone components with **additional dependencies**. By `importing the CommonModule` or `other Angular modules directly` within the **component's metadata**.

### Migrating from NgModules to Standalone Components

```js
// Before (using NgModule):
@NgModule({
    declarations: [OldComponent],
    imports: [CommonModule],
})
export class OldModule { }
```

```js
// After (standalone component):
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-standalone',
    templateUrl: './standalone.component.html',
    styleUrls: ['./standalone.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class StandaloneComponent { }
```

### Integration with Router for Lazy-Loading Standalone Components

- One of the powerful features of standalone components is their ability to be `lazy-loaded with Angular's router`. This is particularly `useful for optimizing application performance`.

```js
import { Routes } from `@angular/router`;

const routes : Routes = [
    {
        path: 'standalone',
        loadComponent: () => import('./standalone/standalone.component').then((m) => m.StandaloneComponent),
    },
];
```
- This configuration ensures that the StandaloneComponent is loaded only when the user navigates to the `/standalone` route, **reducing the initial load time**.

# Note: Now learn View Encapsulation