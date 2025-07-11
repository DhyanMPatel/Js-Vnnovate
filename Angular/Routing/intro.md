# Angular Routing

Angular Router is a powerful navigation library that allows you to manage navigation and state within Angular applications.

```js
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "products/:id", component: ProductDetailComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  { path: "**", redirectTo: "/" }, // Redirects unmatched paths to the home route
];
```

## Features of Angular Router

1. **Component-Based Routing**: Angular Router enables to define routes for different components. Each route maps a URL path to a specific component, enabling navigation to different views within the application.
2. **Nested Routing**: Angular Router supports nested routing, allowing you to define child routes within parent routes. This enables the creation of complex navigational hierarchies and nested views within Angular applications.
3. **Route Parameters**: Angular Router allows you to define route parameters in the URL path. Route parameters are placeholders in the URL that can be used to pass dynamic data to components, enabling dynamic routing and content generation.
4. **Router Guards**: Angular Router provides router guards that protect routes and control navigation based on certain conditions. Router guards include canActivate, canActivateChild, canDeactivate, and resolve guards, enabling authentication, authorization, and data preloading.
5. **Lazy Loading**: Angular Router supports lazy loading, that helps to load modules and components asynchronously when navigating to a particular route.

## Steps to create an Angular app with Routes

**Step 1**: Set Up Angular CLI

```
npm install -g @angular/cli
```

**Step 2**: Create a New Angular Project

```
ng new my-angular-app
```

**Step 3**: Generate Components for Routing

- Generate components for demonstration purposes. For example, let's create four components named `home` and `about`:

  ```
  ng generate component navbar
  ng generate component home
  ng generate component about
  ng generate component user
  ```

**Step 4**: Add there following codes in the required files.
- Bellow HTML and Javascript code for Angular routing,
    ```HTML
    <!-- // app.component.html -->
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

    <!-- Navbar.component.html -->
    <nav>
        <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about">About</a></li>
            <li><a routerLink="/user">User</a></li>
        </ul>
    </nav>
    <style>
        nav {
            background-color: rgb(129, 236, 125);
            padding: 6px;
        }

        li {
            display: inline;
            align-items: center;
            margin: 12px;
        }
    </style>

    <!-- home.component.html -->
    <p>home works!</p>
    <p>Angular router project overview</p>

    <style>
        p {
            background-color: white;
            border: 1px solid #777;
            padding: 5px;
        }
    </style>

    <!-- about.component.html -->
    <p>about works! the Project all about routing in Angular</p>
    <style>
        p {
            background-color: white;
            border: 1px solid #777;
            padding: 5px;
        }
    </style>

    <!-- user.component.html -->
    <p>user works!</p>
    <p>Angular router project overview</p>
    <style>
        p {
            background-color: white;
            border: 1px solid #777;
            padding: 5px;
        }
    </style>
    ```

    ```JS
    //
    /// app.component.ts 
    //
    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterOutlet } from '@angular/router';
    import { NavbarComponent } from './navbar/navbar.component';

    @Component({
        selector: 'app-root',
        standalone: true,
        templateUrl: './app.component.html',
        styleUrl: './app.component.css',
        imports: [CommonModule, RouterOutlet, NavbarComponent]
    })

    export class AppComponent {
        title = 'routing-demo';
    }

    //
    /// navbar.component.ts
    //
    import { Component } from '@angular/core';
    import { RouterLink } from '@angular/router';

    @Component({
        selector: 'app-navbar',
        standalone: true,
        imports: [RouterLink],
        templateUrl: './navbar.component.html',
        styleUrl: './navbar.component.css'
    })
    export class NavbarComponent {

    }

    //
    /// app.routes.ts 
    //
    import { Routes } from '@angular/router';
    import { HomeComponent } from './home/home.component';
    import { AboutComponent } from './about/about.component';
    import { UserComponent } from './user/user.component';


    export const routes: Routes = [
        { 'path': '', component: HomeComponent },
        { 'path': 'about', component: AboutComponent },
        { 'path': 'user', component: UserComponent },
    ];
    ```

**Step 5**: Serve the Application

```
ng serve --open
```

# Note : Now learn Router Outlet

[Router Outlet are viewport within the application layout]()