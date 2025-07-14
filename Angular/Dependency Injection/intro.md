# Dipendency Injection

- Dependency Injection is a `design pattern` in which `components or services are provided with their dependencies` instead of creating or locating them internally.

-  In Angular, the Dependency Injection system **manages the dependencies between various parts of an application**, providing loose coupling and modular development.

## Key Concepts of Dependency Injection in Angular

### 1. Providers:
- Providers are responsible for `registering dependencies with the Angular Dependency Injection system`.
- Providers are typically **registered at the module level** using the `providers` array in the module metadata or at the component level using the `providers` property in the component metadata.

### 2. Injection Tokens:
- Injection tokens serve as `keys` for looking up dependencies in Angular's Dependency Injection system.
- They are typically `classes` or `values` that act as unique identifiers for specific dependencies.
- Angular provides **built-in injection tokens** for commonly used services like `HttpClient`, `RouterModule`, etc.

### 3. Injection Mechanism:
- Components, services, or other Angular constructs `declare dependencies in their constructors` by **specifying the corresponding injection tokens as parameters**.

- When Angular creates an instance of a component or service, it resolves the dependencies by looking up the providers registered in the current injector hierarchy.

### 4. Hierarchical Nature:
- Angular's Dependency Injection system is `hierarchical`, meaning that **each component has its own injector** that can access dependencies provided by its parent component or any ancestor component.

- This hierarchical nature `allows dependencies to be scoped` at different levels of the application, promoting **encapsulation** and **reusability**.

## Steps to Create Angular Application And Installing Module:

**Step 1**: Create a Angular application using the following command:
```
ng new my-App
```

**Step 2**: Go to your project directory
```
cd my-App
```

**Step 3**: Create a service using the following command.
```
ng generate service my-service
```

- Example:-
    - Below is the example of performing dependency injection in Angular.

```HTML
<!-- app.component.html -->

<button (click)="user()">Get Users</button>
<div *ngIf="status">
    <table>
        <tr>
            <th>Name</th>
            <th>Country</th>
        </tr>
        <tr *ngFor="let user of users">
            <td>{{user.name}}</td>
            <td>{{user.country}}</td>
        </tr>
    </table>
</div>
```

```JS
//
/// my-service.service.ts
//
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyService {

    baseUrl = 'http://localhost:8080/';
    constructor(private http: HttpClient) { }

    getusers() {
        return this.http.get(this.baseUrl + 'getusers').pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    return user;
                }
            })
        );
    }
}

//
/// app.component.ts
//
import { Component } from '@angular/core';
import { MyService } from './_services/my-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    users: any;
    status: boolean = false;
    constructor(private service: MyService, private router: Router) {

    }
    ngOnInit(): void {

    }
    user() {
        this.service.getusers().subscribe({
            next: (users) => {
                this.users = users;
                console.log(this.users);
                this.status = true;
            },
        })
    }
}
```

## Benefits of Dependency Injection in Angular
- **Modularity and Encapsulation**: Dependency Injection helps in modular development by `allowing components and services to declare their dependencies explicitly`.

- **Testability**: Dependency Injection `provides unit testing` by making it easy to replace dependencies with mock objects or stubs during testing. `Components and services can be tested in isolation`, leading to more reliable and maintainable tests.

- **Reusability and Maintainability**: Dependency Injection promotes code reuse by enabling components and services to be `easily composed and reused` across different parts of the application. It `improves maintainability` by reducing code duplication and making it easier to understand and refactor code.


# Note : Now learn Services

[What are Services and how works with DI ](./Services.md)