import Blog from "./test";
import LifeCycle from "./LifeCycle";
import Parent from "./Parent";
import StateComponent from "./StateComponent";

function App() {
  const posts = [
    { id: 1, title: "Hello World", content: "Welcome to learning React!" },
    {
      id: 2,
      title: "Installation",
      content: "You can install React from npm.",
    },
  ];
  return (
    <>
      <h1>React App</h1>
      {/* <Blog posts={posts} /> */}
      <h2>It is {new Date().toLocaleTimeString()}</h2>
      <hr />

      <LifeCycle favoriteColor="Yellow" />
      <hr />

      <Parent />
      <hr />

      <StateComponent />
      <hr />
    </>
  );
}

export default App;
