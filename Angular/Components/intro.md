# Components

- Angular components are the `building blocks` of Angular applications.
- They encapsulate a part of the user interface, including its template, styles, and behavior.
- Each component represents a **reusable piece of UI functionality** and can be composed together to create complex applications.

## Component Structure

The structure of an Angular component consists of three main parts:

1. Template :
   - The template defines the HTML markup of the component's view.
   - It contains `placeholders` and Angular `directives` that are `replaced with dynamic data and logic during runtime`.
2. Styles :
   - The styles define the component's visual appearance, including CSS rules and stylesheets
   - Styles can be defined using `inline styles`, `external CSS files`, or `CSS preprocessors` like Sass or Less.
3. TypeScript Code :
   - The TypeScript code defines the component's `behavior` and `logic`.
   - It includes properties, methods, and lifecycle hooks

## Component Lifecycle

- Angular components have a lifecycle consisting of various `lifecycle hooks` that are executed at different stages of the component's lifecycle.
- These lifecycle hooks allow to hook into specific moments in the component's lifecycle and perform actions such as initialization, cleanup, or handling changes.

Some of the most commonly used lifecycle hooks include:
1. **ngOnInit** : Called after the `component's inputs are initialized` and `the component's view has been initialized`.
2. **ngOnChanges** : Called whenever the `component's inputs change`.
3. **ngOnDestroy** : Called when the component is being destroyed and cleaned up.

## Data Binding

Data binding in Angular allows for communication between the `component's TypeScript code` and its `template`.
1. **One-Way Binding** : 
    - Data flows from the `component's TypeScript` code to its `template`.
    - Changes in the component's properties are reflected in the template, but changes in the template do not affect the component's properties.
2. **Two-Way Binding** :
    - Data flows `both ways` between the `component's TypeScript code` and its `template`.
    - Changes in the component's properties are reflected in the template, and changes in the template are propagated back to the component's properties.
3. **Event Binding** : 
    - `Allows the template to listen` for events triggered by the user or the browser and `execute corresponding methods in the component's TypeScript code`.

## Input and Output Properties

- Input properties `allow data` to be `passed` into a `component` from its `parent component`. 
- While output properties allow a component to `emit events` to its `parent component`. 
- Input properties are defined using the `@Input` decorator, while output properties are defined using the `@Output` decorator along with EventEmitter.

## Component communication

Component communication in Angular involves `passing data between components` and `coordinating their behavior`.

1. **Parent-Child Communication** :
    - Data can be passed from a parent component to a child component using input properties, and events can be emitted from the child component to the parent component using output properties.

2. **Siblings Communication** :
    - Sibling components can **communicate indirectly** through their common parent component by passing data through input and output properties or using a shared service to store and exchange data.

3. **Communication between unrelated components** :
    - Components that are not directly related can communicate through a shared service. The shared service acts as a mediator, allowing components to exchange data and coordinate their behavior without having a direct relationship.

## Features

- **Reusability** : Components promote code reusability by encapsulating functionality and UI elements.
- **Encapsulation** : Components have their own scope and encapsulate their template, styles, and behavior.
- **Maintainability** : Components make it easier to maintain and organize code by breaking it into smaller, manageable pieces.


### Steps to Create App, Example with Output:

Step 1: Create a new Angular app:

```
ng new angular-app
```

Step 2: Move to the Project Directory:

```
cd angular-app
```

Step 3: Generate a new component:

```
ng generate component my-comp

/* OR */

ng g c my-comp
```

# Note : Now Learn LifeCycle of Component

[Component LifeCycle](./Lifecycle.md)