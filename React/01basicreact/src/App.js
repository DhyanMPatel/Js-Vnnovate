import Blog from "./test";

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
      <div>React App</div>
      <Blog posts={posts} />
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </>
  );
}

export default App;
