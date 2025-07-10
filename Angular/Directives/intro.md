# Directives

- Directives are markers of DOM.
- Directives can be `used with any controller` or `HTML tag` which will tell the compiler what exact operation or behavior is expected.

- There are some directives are predefined but if a developer want to create custom directive then it can 

- There are basically 3 types of directives and each type has some built-in directives.
    1. Component directives
    2. Attribute directives
    3. Structural directives

## Component Directives

- Components are directives with templates.
- They are the `building blocks` of Angular applications, **encapsulating** both the `UI` (User Interface) and the `behavior` of a part of the application.

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {}
```

## Attribute Directives 

- Attribute directives are used to change appearance and behavior of DOM element by applying custom attributes.

- These directives are applied to elements as `attributes` and are **denoted** by `square brackets`.

- Attribute directives are often **used for tasks** such as `dynamic styling`, `input validation`, or `DOM manipulation`.

### Built-in Attribute Directives:

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

## Structural Directives

- Structural directives are responsible for `manipulating the DOM layout` by adding, removing, or manipulating elements based on conditions.
- They are denoted by an asterisk (*) preceding the directive name and are commonly used to alter the structure of the DOM based on conditions.

### Built-in Structural Directives:
1. **ngIf** : `Conditionally includes` or `removes` an element based on a provided expression.

    ```html
    <element *ngIf="condition">
    <!-- Content to display when condition is true -->
    </element>
    ```
2. **ngFor** : `Iterates over a collection` and instantiates a template once for each item in the collection.
    ```html
    <element *ngFor="let item of items">
       <!-- Content to repeat for each item -->
    </element>
    ```

3. **ngSwitch** : The ngSwitch Directive is `similar to a switch statement in programming languages`. It displays one element from a set of elements based on a provided expression.

    ```html
    <element [ngSwitch]="expression">
        <element *ngSwitchCase="value1"> 
            <!-- Content for case 1 -->
        </element>
        <element *ngSwitchCase="value2"> 
            <!-- Content for case 2 -->
        </element>
        
        <!-- More ngSwitchCase elements for other cases -->
        
        <element *ngSwitchDefault> 
            <!-- Default content -->
        </element>
    </element>
    ```

- Example:- 

```js
// app.component.ts

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isLoggedIn: boolean = true;
    username: string = 'GFG';
    items: string[] = ['Item 1', 'Item 2', 'Item 3'];
    color: string = 'red';
}
```
```css
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

.message {
    font-size: 20px;
    color: green;
    margin-bottom: 20px;
}

.list {
    list-style-type: none;
    padding: 0;
}

.list-item {
    font-size: 16px;
    margin-bottom: 5px;
}

.color-switch {
    margin-top: 20px;
}

.color-message {
    font-size: 18px;
    margin-top: 10px;
}
```
```html
<!-- app.component.html -->

<div class="container">
    <h1 class="title">GeeksforGeeks</h1>

    <div class="content">
        <div *ngIf="isLoggedIn" class="message">
            Welcome to {{ username }}!
        </div>

        <ul *ngIf="items.length > 0" class="list">
            <li *ngFor="let item of items" class="list-item">
                {{ item }}
            </li>
        </ul>

        <div [ngSwitch]="color" class="color-switch">
            <p *ngSwitchCase="'red'" class="color-message">Red color selected</p>
            <p *ngSwitchCase="'blue'" class="color-message">Blue color selected</p>
            <p *ngSwitchCase="'green'" class="color-message">Green color selected</p>
            <p *ngSwitchDefault class="color-message">Please select a color</p>
        </div>
    </div>
</div>
```

# Note : Now you will Learn Attribute Directives

[Deep Dive in Attribute Directive](./Attribute.md)