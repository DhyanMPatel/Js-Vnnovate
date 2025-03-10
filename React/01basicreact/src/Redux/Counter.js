import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, incrementByAmount } from "./counterSlice";
import { increment } from "./numSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value); // counter is same as name property in counterSlice .
  const numState = useSelector((state) => state.number.num); // Also Possible and vise versa
  const dispatch = useDispatch();

  return (
    <>
      <h1>Count: {count}</h1> <h1>Number: {numState}</h1>
      <button onClick={() => dispatch(increase())}>Increase</button>
      <button onClick={() => dispatch(decrease())}>Decrease</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
      <button onClick={() => dispatch(increment())}> Increment </button>
    </>
  );
}

export default Counter;
