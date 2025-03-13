import { Container } from "@mui/material";

export default function GridItem({ row, column }) {
  return (
    <>
      <div
        // maxWidth="xs"
        className=" flex justify-center items-center border rounded-sm min-w-3.5"
      >
        <div>
          {row}x{column}
        </div>
      </div>
    </>
  );
}
