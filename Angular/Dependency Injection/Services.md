# Services in Angular

- A services is a `self-contained`, `reusable piece of code` that **perform a specific task**, making it easilly shareable across multiple components within application.

## When to use Service?

- when share data between components.

    ```js
    //
    /// profile.component.ts
    //
    export class ProfileComponent {
        dummyData: any;
        constructor(private _sharedData: SharedDataServices){ // Get Service data and copy in dummyData
            this.dummyData = this._sharedData.userData;
        }
    }

    //
    /// shared-data.service.ts
    //
    @injectable({
        provideId: "root"
    })

    export class SharedDataServices {
        constructor() {}
        userData = {
            name : "John",
            id : 1,
            username : 'john',
            email : 'john@gmail.com',
        }
    }
    ```

- Share business logic between components.
- Interact with a database or external data sources.


# Note : Now learn about Angular Forms

[Creating a Form in Angular includes the use of directives](../Form/intro.md)