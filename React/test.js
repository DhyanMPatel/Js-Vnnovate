const one = 1;

const data = (
  <a href="https://www.reactjs.org" className="Links">
    Link {one}
  </a>
);

const title = response.potentiallyMaliciousInput;
const input = <h1>{title}</h1>;

///  State
class Clock extends React.Component {
  constructor(props) {
    super(props); // pass props to base constructor.
    this.state = { date: new Date() };
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
