# Attribute Directives

- Directives are the fundamental concepts in angular that help us to `add` or `modify` the **behavior or appearance of HTML elements**.

### Benefits of Attribute Directive:

1. **Dynamic Styling** : Used to `dynamically apply styles` to HTML elements based on certain conditions.

2. **DOM Manipulation** : Enable you to `interact with` and `manipulate` **the DOM** based on user actions or application state changes.

3. **Reusability** : Promote code reuse by `encapsulating behavior` that can be applied to multiple elements across the application.

4. **Enhanced Functionality** : Extend HTML with custom functionality, improving the overall user experience.


### Built-in Attribute Directive:

1. **ngClass** : Allows us to conditionally `apply CSS classes` to HTML elements.
    ```html
    <div [ngClass]="{'class-name': condition}">
    <!-- Content here -->
    </div>
    ```
2. **ngStyle** : enables you to conditionally `apply inline styles` to HTML elements.
    ```html
    <div [ngStyle]="{'property': 'value'}">
    <!-- Content here -->
    </div>
    ```
3. **ngModel** : provides `two-way data binding` for form elements, syncing data between the model and the view
    ```html
    <input [(ngModel)]="property">
    ```

- Example:-

    ```js
    //app.module.ts
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            FormsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }


    // app.component.ts
    import { Component } from '@angular/core';

    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })

    export class AppComponent {
        isHighlighted: boolean = true;
        isItalic: boolean = false;
        textColor: string = 'blue';
        fontSize: number = 18;
        username: string = '';
    }
    ```
    ```CSS
    /* app.component.css */

    .container {
        text-align: center;
    }

    .title {
        color: green;
    }

    .content {
        margin-top: 20px;
    }

    .input-field {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .greeting {
        margin-top: 20px;
    }
    ```
    ```HTML
    <!-- app.component.html -->

    <div class="container">
        <h1 class="title">GeeksforGeeks</h1>

        <div class="content">
            <div [ngClass]="{'highlight': isHighlighted, 'italic': isItalic}">
                This div's classes are dynamically applied based on conditions.
            </div>

            <div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
                This div's styles are dynamically applied based on properties.
            </div>

            <input type="text" [(ngModel)]="username" class="input-field">
            <p class="greeting">Hello, {{ username }}!</p>
        </div>
    </div>
    ```

# Note : Now you learn Structural Directive

[Deep dive in Structural Directives](./Structural.md)