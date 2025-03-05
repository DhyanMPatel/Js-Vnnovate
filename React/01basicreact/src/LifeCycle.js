import React from "react";

class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red", status: true };
    console.log("Constructor: Initialize state.");
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      `getDerivedStateFromProps: static mathod called that take updated props '${props.favoriteColor}' and state '${state.favoriteColor}'.`
    );
    return null;
  }

  componentDidMount() {
    console.log(
      "componentDidMount: Component Finally Mounted in DOM. This is right time to fetch data."
    );
    setTimeout(() => {
      this.setState({ favoriteColor: "blue" });
      // this.props.favoriteColor = "green";      // Props in child Comp is Immutable.
    }, 2000);
  }

  shouldComponentUpdate() {
    console.log(
      "shouldComponentUpdate: This determine that component should update or not"
    );
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      `getSnapshotBeforeUpdate: This contain previous props ${prevProps.favoriteColor} and previous state ${prevState.favoriteColor}.`
    );
    return null;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate: Now Component Finally Updated.");
  }

  removeElem = () => {
    this.setState({ status: false });
  };

  render() {
    console.log("Render: Now Component is Rendering or Updating in DOM.");
    let element;
    if (this.state.status) {
      element = <Child favoriteColor={this.state.favoriteColor} />;
    }
    return (
      <div>
        {element}
        <button onClick={this.removeElem}>Remove Element</button>
      </div>
    );
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    console.log(
      "componentWillUnmount: use for cleanup data to make better performance."
    );
  }

  render() {
    return (
      <>
        <h2>LifeCycle</h2>
        <h3>My Favorite Color is {this.props.favoriteColor} </h3>
      </>
    );
  }
}

export default LifeCycle;
