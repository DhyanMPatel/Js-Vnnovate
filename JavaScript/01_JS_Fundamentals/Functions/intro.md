# Function

- Reusable Block of Code that design to perform some specific task is called Function.
- If we need to perform similar action in many places.
- Example - we need to show a nice-looking message when visitor log in, log out and may be somewhere else.
- Function with no return or empty return always equal to undefined
- Never add newline between return and value
- call many times without repetition.
- like
  - alert(message), prompt(message, default), confirm(question)

## Parameter

- Parameters are just input passed to function
- During function declaration function create their local variable which is use to take value when it is called

## Argument

- During function calling we pass some values are called Arguments

## function Invocation

- process of executing a function
- There is many way to invoce function
  1. function invocation (simple)
  2. method invocation (obj)
  3. Arrow function invocation
  4. Constructor invocation (using new)

## function Expression

- If Function is created as a part of expression is called function expression.
- Function Declaration can processed before the code block is executed. they are visible everywhere in the code.
- Where, Function Expression are created when execution flow reaches them. 

## Types of function

1. [Arrow Function](./ArrowFunction.js)
2. [IIFE (Immediate invocked function expression)](./IIFE.js)
3. [Callback function](./callBack.js)
4. [Named Function](./Function.js) (Normal function)
5. [Anonymous Function](./Anonymous.js)
6. [Nested Function](./NestedFunction.js)
7. [Pure Function](./PureFunc.js)

## Key Characteristics

  1. Parameters, Arguments
  2. Return Values
  3. Default parameter

## Advantages

- Reusability
- Improve Readability
- Maintainability
- Modularity - devide complex problem in smaller part to understand that

## Note

- Arrow function has no it's `this`, but ragular function has their own `this` context.

## Go Back to 

[JS Fundamentals](../intro.md), [Loops](../Loops/intro.md)

## Now get deep knowledge in Code Quality

[Code Quality](../../02_Code_Quality/Debugging.md)
