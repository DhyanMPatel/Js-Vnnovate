# React

## What is React?

- Reactjs is a `component-based` javascript library that create dynamic and interactive UI (user interface). It create the `single-page application` with focus on perfomance and maintainability.

## How it work?

- React create `in memory` virtual DOM rather than directly manupulation actual DOM. It performing necessory manipulation within this vertual representation before applying changes in `Real DOM`.

## Why React?

- There are some Features that React provide

  1. Component-based Architecture.
  2. State management:- Using `useState` hook manage State.
  3. Vertual DOM.
  4. React Hooks:- Allow Functional components to use state and lifcycle.
  5. JSX:- Allow developers to write `HTML` inside Javascript.
  6. One way data binding:- only Parent Component can pass data to child component through props.
  7. React Router:- Dynamic navigation in single page App.

- Unlike other framework or library React has `largest Community & EcoSystem` support.
- React has framework that enhance React like `Next.js` for server side rendering, `React Native` for Mobile apps.
- React has other framworks like **Redux** for state management, **React Query** for Data fatching, Easy integration with **GraphQL**, **Backend Frameworks**.

## Advantages

- There are some advantages:
  1. Easy to learn and use
     - Because use JSX syntax.
  2. Reusable Components
     - Because of it follow `Component-based` Architecture.
  3. Performance Enhancement
     - Because it use Virtual DOM that efficiently update changes part of DOM.
  4. SEO friendly
     - Because SPA setup can be optimized for SEO.

## Disadvantages

- There are some disadvantages:
  1. React Covers only the UI layers of app and nothing else.
  2. use of JSX, can be difficult for beginners.

## What is JSX?

- JSX stands for `Javascript XML`.
- JSX is syntax extention to Javascript.
- JSX allow developers to write Javascript and HTML in single file.
- `Babel` compiles JSX into Javascript that browser can execute.

  ```js
  function Test() {
    return (
      <div>
        <h1>This is JSX</h1>
      </div>
    );
  }

  export default Test;
  ```

## Babel

- Babel is Javascript compiler that convert Modern Js(ES6 or JSX) into older Js(ES5) so that browser can understand and run it.

  ```js
  const Test = React.createElement("div", null, "This is Non-JSX.");
  ```

## Render Element

- Render Element is a process where React uses `rendering` to display elements inside the Browser's DOM.

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

## Lifecycle methods

- In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

- Lifecycle refers to the different phases of a component goes through during it's time in a React Application.

- There are total 4 Phases:
  
    ![Lifecycle Methods](./Screenshot%20from%202025-03-04%2018-18-31.png)

  1.  **Initialization** :- When we tacking about class-based components. It occurs in the constructor of component. also it occurs only one time.

      - There are 2 methods,

        1. **getInitialState()** : This method invoked just before creation of component. It is usefull to set default value of state.
        2. **getDefaultProps()** : This method is also invoked just before component created and before props are recieved by the child components.

      - `Note`: **getInitialState** and **getDefaultProps** methods are used when ES6 is not comes.

  2.  **Mounting** :- It occurs When component first time created in DOM.

      - There are 4 methods,

        1. **constructor** : This method called first in mounting phase. This initialize state and bind methods.

           ```js
           constructor(props) {

             super(props); // Always call super(props) before using this.props

             this.state = {
               count: 0, // Initial state
             };

             console.log("Constructor called");

           }
           ```

        2. **static getDerivedStateFromProps** : this is a static method that is called just before the render() method in both the mounting and updating phase in React.

           - It takes updated props and current state as arguments.

           ```js
           static getDerivedStateFromProps(props, state){
           if(props.value !== state.value){
             return {value: props.value}; // Update state based on new props
           }
           return null; // There is not changes
           }
           ```

        3. **render()** : Responsible to rendering JSX and updating DOM.

           ```js
             render(){
              return (
                <div>
                  This is Rendering
                </div>
              )
             }
           ```

        4. **componentDidMount** : This function is invoked right after the component is mounted on the DOM, i.e. this function gets invoked once after the render() function is executed for the first time.

           ```js
           componentDidMount() {
               console.log("Component has been mounted");

               // Example: Fetch data from an API
               fetch("https://api.example.com/data")
                   .then(response => response.json())
                   .then(data => this.setState({ data }));
           }
           ```

  3.  **Updating** :- This happened whenever the component's state or props changed. It occurs as many times as need.

      - There are 5 methods,

        1. **static getDerivedStateFromProps** : this is a static method that is called just before the render() method in both the mounting and updating phase in React.

        - It takes updated props and current state as arguments.

          ```js
          static getDerivedStateFromProps(props, state){
          if(props.value !== state.value){
            return {value: props.value}; // Update state based on new props
          }
          return null; // There is not changes
          }
          ```

        2. **setState()** : This is not properly lifecycle function. used to update the state of a component.

        ```js
        this.setState((prevState, props) => ({
          counter: prevState.count + props.diff,
        }));
        ```

        3. **shouldComponentUpdate** : This method return a `Boolean value` that specifies whether React should continue with the rendering or not.

        ```js
        shouldComponentUpdate() {
          return false; // will not re-render component
        }
        ```

        4. **render()** : Responsible to rendering JSX and updating DOM.

        ```js
        render(){
        return (
          <div>
            This is Rendering
          </div>
        )
        }
        ```

        5. **getSnapshotBeforeUpdate()** : invoked just after render() complete in updating phase.

        - This method can store previous value of props and state after the upadte.

        ```js
        getSnapshotBeforeUpdate(prevProps, prevState){
          document.getElementById("div2").innerHTML =
            "The updated favorite is " + prevState.favoritecolor;
        }
        ```

        6. **componentDidUpdate** : Method is called just after component updated in the DOM.

        ```js
        componentDidUpdate(){
          document.getElementById("mydiv").innerHTML =
            "The updated favorite is " + this.state.favoritecolor;
        }
        ```

  4.  **Unmounting** :- This phase in the lifecycle is when a component is removed from the DOM.

      - There are 1 method

        1. **componentWillUnmount** : method is called just before component is removed from the DOM.

        ```js
        componentWillUnmount() {
            alert("The component named Header is about to be unmounted.");
          }

        ```

- `Note` :- In functional component `useEffect` handle this 3 phases.

## Event Handling

- Event Handling in React is `similar to HTML` but some difference
  1. Events are written in camelCase format.
  2. With JSX, passed `function reference` instead of a string.
  3. React automatically handles `event binding` in function components.

## Props

-`Props` use to Pass **data or functions from a parent component to a child component**.

- `Note`:- All React components must act like `pure functions` with respect to their `props`.

## State

- `State` stores dynamic value **inside Component** and Update UI when changed.
- State allows React components to change their output over time in response to `user actions`, `network responses`, and anything else.
