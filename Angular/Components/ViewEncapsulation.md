## View Encapsulation (Style scoping)

- View Encapsulation in Angular is a way to control how styles (like CSS) apply to the components in your application. Think of it as putting your component's styles in a protective bubble, so they don’t accidentally change other parts of your app.

- There are three types of View encapsulation in Angular: `Emulated`, `ShadowDom`, and `None`.
    1. **Emulated**: This is the default encapsulation mode. Styles from the `component are applied to the component and do not leak outside`, but the `component's elements are not truly isolated`.

        ```
        encapsulation: ViewEncapsulation.Emulated
        ```

    2. **ShadowDom**: This encapsulation mode uses browser native Shadow DOM which means that `styles are scoped to the component and do not leak into other areas of the application`.

        ```
        encapsulation: ViewEncapsulation.ShadowDom
        ```

    3. **None**: In this instance, there is `no encapsulation applied`; hence we have **global styles** that can affect other components.

        ```
        encapsulation: ViewEncapsulation.None
        ```

# Note: Now Learn about Angular Modules

[Angular Modules](../Modules/intro.md)