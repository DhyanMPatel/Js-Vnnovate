export default function GridItem({ row, column, sample }) {
  // const search = useSelector((state) => state.search.value);
  // console.log(row, column);
  // console.log(`Grid Item: ${value}`)

  console.log(`Sample: ${sample}`);
  return (
    <>
      {(row || column) && (
        <div className={`flex justify-center items-center rounded-sm min-w-12`}>
          <div>
            {row}x{column}
          </div>
        </div>
      )}
      {sample && (
        <div className={`flex justify-center items-center rounded-sm min-w-12`}>
          <div>{sample.name}</div>
        </div>
      )}
    </>
  );
}

// ${ isMatch ? "border" : null}
