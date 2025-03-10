import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./numSlice";

function Number() {
  const numState = useSelector((state) => state.number.num);
  const dispatch = useDispatch();

  return (
    <>
      <div>This is Number Component {numState}</div>
      <button onClick={() => dispatch(increment())}> + </button>
      <button onClick={() => dispatch(decrement())}> - </button>
    </>
  );
}

export default Number;
