import { Container } from "@mui/material";

export default function GridItem({ row, column }) {
  return (
    <>
      <div className=" flex justify-center items-center border rounded-sm min-w-12">
        <div>
          {row}x{column}
        </div>
      </div>
    </>
  );
}
