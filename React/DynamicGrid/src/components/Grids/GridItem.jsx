import { useSelector } from "react-redux";

export default function GridItem({ row, column }) {
  const search = useSelector((state) => state.search.value);

  const isMatch =
    search === "" ||
    row.toString().includes(search) ||
    column.toString().includes(search);

  return (
    <>
      <div className="flex justify-center items-center border rounded-sm min-w-12">
        {isMatch ? (
          <div>
            {row}x{column}
          </div>
        ) : null}
      </div>
    </>
  );
}
