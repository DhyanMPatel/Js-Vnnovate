# Pipes

- Pipes are a special operator in Angular template expressions that `allows you to transform data declaratively` in your template.

- Angular pipes use the vertical bar character (`|`).
- Pipe operator has **lower precedence** then other binary operators like, `+`,`-`,`*`,`/`,`%`,`&&`,`||`,`??`. But **higher precedence** then `ternary` operator.

- Example:-

  ```js
  import { Component } from "@angular/core";
  import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
  @Component({
    selector: "app-root",
    imports: [CurrencyPipe, DatePipe, TitleCasePipe],
    template: `
      <main>
        <!-- Transform the company name to title-case and
      transform the purchasedOn date to a locale-formatted string -->

        <h1>
          Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}
        </h1>

        <!-- Transform the amount to a currency-formatted string -->

        <p>Total: {{ amount | currency }}</p>
      </main>
    `,
  })
  export class ShoppingCartComponent {
    amount = 123.45;
    company = "acme corporation";
    purchasedOn = "2024-07-08";
  }
  ```

- Output:
  ```html
  <main>
    <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
    <p>Total: $123.45</p>
  </main>
  ```

## Built-in Pipes

- Angular provide multiple Pipes where we can use in Templates

  ![Built-in pipes](./Built-in%20piplines.png)

## Combining multiple pipes in the same expression

- You can **apply multiple transformations** to a value by using multiple pipe operators. `Angular runs the pipes from left to right`.

```html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```

### Passing parameters to pipes

- Some pipes accept parameters to configure the transformation.
- To specify a parameter, append the pipe name with a colon (`:`) followed by the parameter value.
- Some pipes may `accept multiple parameters`. You can specify additional parameter values separated by the colon character (`:`).

```html
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>

<!-- Accept multiple parameters -->
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```

## Creating custom pipes

Define a custom pipe by implementing a TypeScript class with the `@Pipe` decorator. A pipe must have two things:

- A `name`, specified in the pipe decorator. **camelCase** is recommended. **Do not use hyphens**.
- A method named `transform` that performs the value transformation.

TypeScript class should additionally implement the `PipeTransform` interface to ensure that **it satisfies the type signature for a pipe**.

```js
// kebab-case.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "reverseCase",
})
export class ReverseCasePipe implements PipeTransform {
  transform(value: string): string {
    // return value.toLowerCase().replace(/ /g, '-');
    return value.split("").reverse().join("");
  }
}
```

### Adding parameters to a custom pipe

- Add parameters to your transformation by adding additional parameters to the transform method:

```js
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "myCustomTransformation",
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`;
    if (format === "uppercase") {
      return msg.toUpperCase();
    } else {
      return msg;
    }
  }
}
```

### Detecting change within arrays or objects

- When you want a pipe to detect changes within **arrays** or **objects**, it `must be marked as an impure function` by passing the **pure flag** with a value of `false`.

```js
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "joinNamesImpure",
  pure: false,
})
export class JoinNamesImpurePipe implements PipeTransform {
  transform(names: string[]): string {
    return names.join();
  }
}
```

# Note : Now Learn Variable in Template

[Variables in Template](./Variables.md)