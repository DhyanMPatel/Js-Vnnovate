## Angular JS

- Angular is a `free` and `open-source` JavaScript framework that helps developers build modern web applications. It **extends HTML with new attributes** and it is perfect for single-page applications (`SPAs`).

- AngularJS, developed by `Google`. 
- latest version is `1.2.21`.


### What is AngularJS?

- Angular is a `free` and `open-source` JavaScript framework that helps developers build modern web applications. Angular introduce Model-View-Controller (`MVC`) architecture.

    1. **Model** : Represents your application's `data` and business `logic`.
    2. **View** : Handles the `user interface` and `presentation layer`.
    3. **Controller** : Acts as the **glue**, `binding the model and view together` and `handling user interactions`.

### Why Choose AngularJS? / Advantages of AngularJS

- **Easy to Work With** : AngularJS requires only basic knowledge of HTML, CSS, and JavaScript.

- **Time-Saving Components** : AngularJS allows to work with `reusable components`, saving time and reducing unnecessary code. Components are the building blocks of application.

- **Ready-to-Use Templates** : AngularJS leverages plain HTML templates, which it compiles and makes ready for use. No complex setup—just write HTML and let AngularJS do the heavy lifting.

- **Directives** : AngularJS extends HTML with custom `elements` and `attributes` called directives.

### Key Features of AngularJS

1. Model-View-Controller (MVC) Architecture :
    - AngularJS follows the MVC pattern, which separates the application logic into three interconnected components: Model, View and Controller.

2. Routing and Single-Page Applications (SPAs) :
    - Implement client-side routing to create SPAs.
    - Handle route parameters and navigation seamlessly.

3. Services and Dependency Injection :
    - **Services** are `reusable components` that provide specific functionality.
    - **Dependency injection** ensures loose coupling between components, making your code more maintainable.

4. Custom Directives and Components:
    - Build reusable components using custom directives.
    - Isolate scope and communicate between components.

### Key Concepts in AngularJS

1. MVC Architecture
    - **Model**: Represents the data and business logic.
    - **View**: Handles the presentation and user interface.
    - **Controller**: Manages communication between the Model and the View.

2. Two-Way Data Binding
    - One of AngularJS’s standout features is its two-way data binding.
    - Changes in the user interface automatically update the underlying(inherent) data model and vice versa.

3. Directives
    - Directives are markers in the DOM that instruct AngularJS to attach specific behavior to a DOM element or transform the DOM’s structure.
    - They enhance HTML with new functionalities and enable the creation of reusable components.

4. Services
    - AngularJS provides a set of built-in services that offer common functionalities, such as HTTP requests, routing, and more.
    - Developers can also create custom services to encapsulate specific logic and make it reusable throughout application.

5. Dependency Injection
    - Dependency Injection (DI) is a design pattern used in AngularJS, allowing components to be `loosely coupled`. This enhances modularity and simplifies testing.


## Installation
The below steps demonstrate the basic installation process:

### Step 1: Install Node and NMP

1. Install Node.js: Download Node.js from the official website.
2. Verify Versions: Open your terminal and verify Node.js and NPM versions.

### Step 2: Install the Angular CLI

```
npm install -g @angular/cli
```

### Step 3: Setting Up Your Environment

- Once we have the Angular CLI installed, we can `use the CLI to create a new Angular project`. Now, in order to check whether the Angular CLI is properly installed or not, we can check for their version installed by typing the below command:

    ```
    ng v
    ```

### Step 4: Creating a New Angular Project

- Open the terminal and navigate to the directory where you want to create your project. Run the below command

    ```
    ng new angular-app
    ```

### Step 5: Navigate to project directory

- Next, navigate into the project directory by running the following command:

    ```
    cd angular-app
    ```

### Step 6: Run the application

```
ng serve --o
```


## Architecture

-  Angular follows the `MVC` (Model-View-Controller) and `MVVM` (Model-View-ViewModel) design patterns

1. Modules 
    - Angular applications are divided into modules. Each module is a collection of related components, services, and other
    - Modules are created using the `@NgModule` decorator.
    - Types of Modules:
        1. Core Module/Root Module
        2. Feature Module
        3. Shared Module

2. Components
    - A Component is the building block of the angular application.
    - To indicate a class as component `@Component` decorator is used.
    - The @Component decorator provides metadata to the component.

3. Templates
    - The `user interface` or the `view` of the end users is defined using the template.
    - Templates are `created using HTML` and it `binds the component properties and methods` thus helping us to render data dynamically.

4. Directives
    - Directives are `instructions in the DOM`.
    - Directives are used in **templates** to `customize the behavior of the elements`.
    - built-in directives like `*ngIf` and `*ngFor`, as well as custom directives created by developers.
    - Types of directives :
        1. Component Directives :
            - Associated with the Template of a component
        2. Structural Directives :
            - Used to change the structure of DOM.
        3. Attribute Directives :
            - Used to change the behaviour of the DOM using ngStyle,ngModel and ngClass
        4. Custom Directives :
            - We can create custom directives using @Directive decorator and define the desired behaviour in the class.

5. Services
    - Services are used when specific data or logic needs to be used across different components.
    - Components can inject services to access their functionality and data.
    - Services are typically used to `centralize data access`, `HTTP requests`, `state management`, and other common tasks.

6. Dependency Injection(DI)
    - Dependency injection simplifies dependency management, facilitates code reusability and simplifies testing.
    - We can inject services, configuration values, and other objects into components and services.
    - Components and services can declare their dependencies and have them injected automatically using @Injectable decorator.

7. Router
    - The Angular Router `manages navigation` within the application for changing from one view to another view.
    - Routes are defined in the `app-routing.module.ts` file and map to specific components

8. State Management
    - State management in angular is achieved using `RxJS` (Reactive Extensions for JavaScript)
    - RxJS is used for handling `asynchronous operations`, such as handling HTTP requests, user interactions, and event-driven programming.

9. HTTP Client
    - HTTP client module in angular is used for making HTTP requests to interact with backend services(API calls) to fetch or send data.

# Note : Now Learn about Angular Components
