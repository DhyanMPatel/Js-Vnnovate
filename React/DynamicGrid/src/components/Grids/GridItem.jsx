import { Container } from "@mui/material";

export default function GridItem({ row, column }) {
  return (
    <>
      <Container
        maxWidth="sm"
        className=" flex justify-center items-center border rounded-sm"
      >
        {row}x{column}
      </Container>
    </>
  );
}
