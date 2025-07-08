## Component Lifecycle

The component lifecycle in Angular consists of several stages:

1. **Creation** : The component is instantiated and its dependencies are injected.
2. **Change Detection** : Angular checks for changes in the data-bound properties.
3. **Rendering** :  The component's template is rendered or updated.
4. **Destruction** :  The component is destroyed and cleaned up.

### Lifecycle Hooks

Angular provides a set of lifecycle hooks that allow developers to execute code at specific stages of a component’s lifecycle.

1. ngOnChanges :
    - It is `called before ngOnInit` (if the component has bound inputs) and whenever one or more data-bound input properties change. 
    - It is used to respond to changes in input properties.
        ```
        ngOnChanges(changes: SimpleChanges) {
            console.log('ngOnChanges called.', changes);
        }
        ```

2. ngOnInit :
    - It is **Called once**, `after the first ngOnChanges`. It is used to initialize the component after Angular first displays the data-bound properties.
        ```
        ngOnInit() {
            console.log('ngOnInit called.');
        }
        ```

3. ngDoCheck :
    - It is `called during every change detection run`, immediately **after ngOnChanges** and **ngOnInit**. It is `used to detect and act upon changes` that Angular can't or won't detect on its own.
        ```
        ngOnCheck() {
            console.log("Custom changes Detection.");
        }
        ```
4. ngAfterContentInit :
    - It is called **once after** the `first ngDoCheck`. 
    - It is used to `perform any additional initialization` required for the content.
        ```
        ngAfterContentInit() {
            console.log("Contnet Initialized.");
        }

5. ngAfterContentChecked :
    - It is called `after ngAfterContentInit` and `every subsequent ngDoCheck`. 
    - It is used to `act upon any changes` after the content has been checked.
        ```
        ngAftercontentChecked() {
            console.log("Content Checked");
        }

6. ngAfterViewInit :
    - It is called **once after** the **first ngAfterContentChecked**.
    - It is used to `perform additional initialization` required for the view.
        ```
        ngAfterViewInit() {
            console.log("View Initialized.");
        }
        ```

7. ngAfterViewChecked :
    - It is called `after ngAfterViewInit` and `every subsequent ngAfterContentChecked`.
    - It is used to `act upon any changes after the view has been checked`.
        ```
        ngAfterViewChecked() {
            console.log("View Checked");
        }
        ```

8. ngOnDestroy :
    - It is called `immediately before Angular destroys the component`.
    - It is used to `clean up any resources`, such as **subscriptions** and **event handlers**, to avoid **memory leaks**.
        ```
        ngOnDestroy() {
            console.log("Component Destroyed");
        }
        ```

# Note: Now learn Use of ViewChild.

[ViewChild](./viewChild.md)