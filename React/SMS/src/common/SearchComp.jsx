import { Input } from "reactstrap";

export const Search = ({ searchData, setSearchData }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "8px",
          justifyContent: "flex-end",
        }}
      >
        <h4
          style={{
            color: "black",
            fontSize: "15px",
            margin: "14px",
          }}
        >
          Search
        </h4>
        <Input
          type="text"
          value={searchData}
          placeholder="Search here..."
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>
    </>
  );
};
