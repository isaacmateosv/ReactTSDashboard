import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ParsedJson from "./UploadJSONFile";
import jsonMongoCollection from "./Navbar"; // Import the jsonMongoCollection variable

interface JsonTableProps {
  parsedJson: ParsedJson;
}

const cellStyle: React.CSSProperties = {
  borderRight: "1px solid #ccc",
  padding: "8px 16px",
  verticalAlign: "top",
};

const JsonTable: React.FC<JsonTableProps> = ({ parsedJson }) => {
  const { keys, data } = parsedJson;
  console.log(jsonMongoCollection); // Use the fetched JSON data here

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "100%", overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key} style={cellStyle}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonMongoCollection.map((item, index) => (
            <TableRow key={index}>
              {keys.map((key) => (
                <TableCell key={key} style={cellStyle}>
                  {getValue(item[key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const getValue = (value: any): React.ReactNode => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "Info no disponible ni provista desde la herramienta.";
    }
    return value.join(", ");
  } else if (typeof value === "object" && value !== null) {
    if (value.subpropertyA1) {
      // Handle nested properties with subproperty structure
      return (
        <div className="nested-table">
          <JsonTable parsedJson={{ keys: Object.keys(value), data: [value] }} />
        </div>
      );
    } else {
      // Handle regular nested objects
      return (
        <div className="nested-table">
          <JsonTable parsedJson={{ keys: Object.keys(value), data: value }} />
        </div>
      );
    }
  } else if (value === null || value === undefined || value === "") {
    return "Info no disponible ni provista desde la herramienta.";
  } else if (typeof value === "object") {
    // Handle subproperties
    return (
      <div className="nested-table">
        <JsonTable parsedJson={{ keys: Object.keys(value), data: value }} />
      </div>
    );
  } else {
    return String(value);
  }
};

export default JsonTable;
