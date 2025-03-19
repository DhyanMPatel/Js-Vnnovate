export default function GridItem({ row, column }) {
  // const search = useSelector((state) => state.search.value);
  // console.log(row, column);
  // console.log(`Grid Item: ${value}`)
  return (
    <>
      <div className={`flex justify-center items-center rounded-sm min-w-12`}>
        <div>
          {row}x{column}
        </div>
      </div>
    </>
  );
}

// ${ isMatch ? "border" : null}
