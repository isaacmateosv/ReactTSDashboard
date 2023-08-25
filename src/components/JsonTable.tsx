import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ParsedJson from "./UploadJSONFile";

interface JsonTableProps {
  parsedJson: ParsedJson;
}

const JsonTable: React.FC<JsonTableProps> = ({ parsedJson }) => {
  const { keys, data } = parsedJson;

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "100%", overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key} style={{ verticalAlign: "top" }}>
                {getValue(data[key])}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const getValue = (value: any): string => {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "Info no disponible ni provista.";
      }
      return value.join(", ");
    } else {
      if (Object.keys(value).length === 0) {
        return "Info no disponible ni provista.";
      }
      return JSON.stringify(value, null, 2);
    }
  } else if (value === null || value === undefined || value === "") {
    return "Info no disponible ni provista.";
  } else {
    return String(value);
  }
};

export default JsonTable;
