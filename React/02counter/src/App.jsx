import { useState } from 'react'
import './App.css'
import User from './learn Props/user'

function App() {
  const [count, setCount] = useState(0)

  const addValue =()=>{
    setCount(count+1)
  }
  const removeValue=()=>{
    setCount(count-1)
  }

  let myArr = [1,2,3,4,5]

  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={addValue}>Increase</button> {" "}
      <button onClick={removeValue}>Decrease</button>

      <br /><br /><br /><br />
      <User name="Dhyan" discription="This is Dhyan" arr={myArr}/>
      {/* <User name={"Nidhi"} discription={"This is Nidhi"} date='2 Mar 2025'/>  */}
      {/* <User /> */}

    </>
  )
}

export default App
