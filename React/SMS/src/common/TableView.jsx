import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TableView = ({ add, title, columns, data, customStyles }) => {
  const navigate = useNavigate();
  return (
    <>
      {title && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 20px",
              position: "relative",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            {add && (
              <Button style={{ zIndex: 1 }} onClick={() => navigate("/")}>
                Add
              </Button>
            )}
            <h2
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "20px",
                margin: 0,
              }}
            >
              {title}
            </h2>
            <div style={{ width: "70px" }} />
          </div>
          <hr />
        </>
      )}

      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        paginationPerPage={2}
        paginationRowsPerPageOptions={[2, 5, 10, 15, 20]}
        highlightOnHover
        striped
        responsive
        fixedHeader
      />
    </>
  );
};
