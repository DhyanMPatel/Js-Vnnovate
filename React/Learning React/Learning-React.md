# React

## What is React?

- Reactjs is a `component-based` javascript library that create dynamic and interactive user interface. It create the `single-page application` with focus on perfomance and maintainability.

## How it work?

- React create `in memory` virtual DOM rather than directly manupulation actual DOM. It performing necessory manipulation within this vertual representation before applying changes in `Real DOM`.

## Why React?

- There are some Features that React provide
  1. Component-based Architecture
  2. Vertual DOM
  3. State management:- Using `useState` hook manage State.
  4. React Hooks:- Allow Functional components to use state and lifcycle.
  5. JSX:- Allow developers to write `HTML` inside Javascript.
  6. One way data binding:- only Parent Component can pass data to child component through props.
  7. React Router:- Dynamic navigation in single page App.

## Advantages

- There are some advantages:
  1. Easy to learn and use
  2. Reusable Components
  3. Performance Enhancement
  4. SEO friendly
  5. Provide Scope for code testing

## Disadvantages

- There are some disadvantages:
  1. Poor Documentation
     - React technologies `updating` and `accelerating` so fast that there is no time to make proper documentation.
  2. View part
     - React Covers only the UI layers of app and onthing else.
  3. JSX
     - JSX provide `html` + `Javascript` approach.

## What is JSX?

- JSX stands for `Javascript XML`.
- JSX is syntax extention to Javascript.
- JSX allow developers to write Javascript and HTML in single file.
- `Babel` compiles JSX into Javascript that browser can execute.

## Babel

- Babel is Javascript compiler that convert Modern Js(ES6 or JSX) into older Js(ES5) so that browser can understand and run it.

## Render Element

- To render any element first pass DOM element to `ReactDOM.createRoot()`, then pass react element to `root.render()`.

- `React DOM` compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

## Components

- Conceptually, components are `Javascript function`. They accept arbitrary inputs (`Props`) and return `React elements` describing what should appear on the screen.

- There are 2 types of components

  - Both are same in respect to React.

  1. function component

     ```js
     function Welcome(props) {
       return <h1>This is Function Component {props.name}</h1>;
     }
     ```

  2. class component

     ```js
     class Welcom extends React.Component {
       render() {
         return <h1>This is Class Component. {this.props.name}</h1>;
       }
     }
     ```

- A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.

## Props

- `Note`:- All React components must act like `pure functions` with respect to their `props`.

## State

- State allows React components to change their output over time in response to `user actions`, `network responses`, and anything else.

## Lifecycle methods

- In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

- Lifecycle refers to the different phases of a component goes through during it's time in a React Application.

- There are total 3 Phases:

  1. **Mounting** :- When component first time created in DOM. Methods like `componentDidMount`.
  2. **Updating** :- When any component updated in DOM. Methods like `componrntDidUpdate`.
  3. **Unmounting** :- When any component removed in DOM. Methods like `componentWillUnmount`.

- `Note` :- In functional component `useEffect` handle this 3 phases.

- State and props can be an asynchronous. So `pass function` in setState() rather then `pass Object`.

  ```js
  this.setState((state, props) => ({
    counter: state.counter + props.increment;
  }));
  ```

- There are some Methods,
  1. `componentDidMount()` :- Method run after component output has been rendered to the DOM.
  2.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props); // pass props to base constructor.
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h2>Time is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Clock />);
```

- The `Clock` is rendered to the DOM first time. This is called `mounting` in react.
- We also wants to `clear that timer` whenever the DOM produced by the `Clock` is removed. This is called `unmounting` in react.

## Event Handling

- Event Handling in React is `similar to HTML` but some difference
  1. Events are written in `camelCase`.
  2. With JSX, passed `function reference` instead of a string.
  3. React automatically handles `event binding` in function components.
