import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import EditDialog from "./EditDialog";

const CenteredTable: React.FC = () => {
  return (
    <Box
      sx={{
        display: "block",
        height: "100vh",
        margin: "100px 200px",
      }}
    >
      <TableContainer>
        <Table sx={{ border: 1 }}>
          <TableHead sx={{ border: 1 }}>
            <TableRow style={{ background: "#f2f2f2" }}>
              <TableCell sx={{ fontWeight: 800, border: 1 }}>Gesture</TableCell>
              <TableCell sx={{ fontWeight: 800, border: 1 }}>Word</TableCell>
              <TableCell sx={{ fontWeight: 800, border: 1 }}> Edit</TableCell>
              <TableCell sx={{ fontWeight: 800, border: 1 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1 }}>
                  Row {index + 1}, Cell 1
                </TableCell>
                <TableCell sx={{ border: 1 }}>
                  Row {index + 1}, Cell 2
                </TableCell>
                <TableCell sx={{ border: 1 }}>
                  Row {index + 1}, Cell 3
                </TableCell>
                <TableCell sx={{ border: 1 }}>
                  Row {index + 1}, Cell 4
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          margin: "20px 0",
        }}
        size="large"
      >
        Add
      </Button>
      <EditDialog />
    </Box>
  );
};

export default CenteredTable;
