# Structural Directives

- Structural directives are responsible for `manipulating the DOM layout` by adding, removing, or manipulating elements based on conditions.
- They are denoted by an asterisk (*) preceding the directive name and are commonly used to alter the structure of the DOM based on conditions.

### Built-in Structural Directives:
1. **ngIf** : `Conditionally includes` or `removes` an element based on a provided expression.

    ```html
    <element *ngIf="condition">
    <!-- Content to display when condition is true -->
    </element>
    ```

2. **ngIf-else** : works like a simple If-else statement, wherein if the condition is true then 'If' DOM element is rendered, else the other DOM Element is rendered.

- Angular uses `ng-template` with element selector in order to display the else section on DOM.

```html
<div *ngIf="boolean; else id_selector">  </div>
<ng-template #id_selector>  </ng-template>
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

    ```JS
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
    ```HTML
    <!-- app.component.html -->

    <div class="container">
        <h1 class="title">GeeksforGeeks</h1>

        <div class="content">
            <div *ngIf="isLoggedIn" class="message">
                Welcome to {{ username }}!
            </div>

            <div *ngif="isLoggedIn; else notLogged" class="alterMessage">
                Welcome to {{username}}
            </div>
            <ng-template #notLogged>
                Welcome Guest
            </ng-template>

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

# Note : Now learn Custom Directives

[Know how to create Custom Directives](./Custom.md)