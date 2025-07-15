## Angular Modules

- Angular modules are core concepts in Angular application, which help to `organize the application structure` by grouping the related components, services, etc.

### What are Angular Modules?

- In Angular, a module refers to a container where we can group the `components`, `directives`, `pipes`, and `services`, which are related to the application. This helps organize the application, making it easier to understand and manage dependencies efficiently.

### Types of Angular Modules

1. Root Module : In Angular, the root module is named **AppModule**, which is the `entry point of the angular application`.
2. Feature Module : This module helps partition the application into focused areas for better organization. It `shares a common features or functionalities` across the application. (Custom Module)
3. Shared Module : The Shared module allows developers to access its `components`, `directives`, `pipes`, etc., throughout the application. (Custom Module)
4. Routing Module : In Angular, a Routing Module is a special module that `handles the configuration` and `management of routes` within an application. It defines the routes (**paths**) for the various components to navigate between views or components.

### Steps to Create a new Module in Angular:

There are mainly two methods for creating a module:

1. Using the Angular CLI
2. Manually Creating Module

### Creating Module Using the Angular CLI

In most cases this Approach is highly recommended ,as it is easy, quick and Efficient. Angular provides you command to generate new Modules,

```
ng generate module [name]

<!-- OR -->

ng g m [name]
```

### Manually Creating new module

**Step 1**: Go to app Directory, right click on it select New folder and give it a name.

**Step 2**: In that folder right click and select new file and name it as "job.module.ts" or anything else of your choice.

**Step 3**: Now we have to Import ng module from '@angular/core' and add some lines of code in

### Importing Module into Another:

When one module needs to access the components or services provided by another module, it imports that module using the imports array in the `@NgModule` decorator.

```js
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; // Importing the module to be used
import { MyComponent } from "./my-component"; // Importing components from the module

@NgModule({
  declarations: [MyComponent], // Declaring components, directives, and pipes
  imports: [CommonModule], // Importing other modules
  exports: [MyComponent], // Exporting components, directives, and pipes
})
export class MyModule {}
```

### Advantages for importing a module into another module

- **Dependency Management**: Importing modules allows Angular's dependency injection system to `resolve and inject the services` provided by those modules into components and other dependencies within the importing module.
- **Encapsulation**: Modules encapsulate related functionality, promoting `code organization` and `reusability`. Importing modules into other modules allows for **modular development** and **separation of concerns**.
- **Shared Functionality**: Importing modules `enables sharing of components, directives, pipes, and services` across different parts of the application. This promotes `code reuse` and helps maintain a consistent user experience.

## Lazy-Loading

Lazy loading in Angular relies on the router configuration. When the user navigates to a specific route, Angular dynamically loads the corresponding feature module.

### Traditional Lazy-Loading with Routes

- The standard method for lazy-loading in Angular involves configuring your app's routes to load modules on demand. In this approach, the **loadChildren** syntax is used to lazy-load the FeatureModule when the user navigates to the `/feature` route.

```js
// If we use modules
const routes: Routes = [
  {
    path: "feature",
    loadChildren: () =>
      import("./feature/feature.module").then((m) => m.FeatureModule),
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];

// If we use Standard component
const routes: Routes = [
  {
    path: "feature",
    loadComponent: () => import("./feature/feature").then((m) => m.FeatureComp),
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];
```

### Preloading Strategy

- To improve the user experience, you can preload some lazy-loaded modules after the initial application load. Angular provides a built-in strategy for this.
- With PreloadAllModules, Angular will load the modules in the background, minimizing the delay when the user navigates to a route that requires a lazy-loaded module.

# Note : Now Learn about Templates

[Introduction of Template](../Template/intro.md)