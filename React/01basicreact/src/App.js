import Test from "./Test";

function App() {
  return (
    <>
      <div>React App</div>
      <Test />
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </>
  );
}

export default App;
