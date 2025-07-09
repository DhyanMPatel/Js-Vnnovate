import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "./TableStyle.css";

const TableView = ({ data }) => {
  return (
    <div className="table-container">
      <Typography variant="h5" component="h2" gutterBottom>
        User Data
      </Typography>
      {data.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No Data found.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="user data table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Hobbies</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.hobbies.join(", ")}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.profession}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TableView;
