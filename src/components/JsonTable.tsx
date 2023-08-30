import React from "react";
import Button from "@mui/material/Button";

interface JsonTableProps {
  parsedJson: {
    [key: string]: any;
  };
}

const renderCellValue = (value: any): React.ReactNode => {
  if (Array.isArray(value) && value.length === 0) {
    return (
      <span style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}>
        Array vacío.
      </span>
    );
  } else if (
    typeof value === "object" &&
    value !== null &&
    Object.keys(value).length === 0
  ) {
    return (
      <span style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}>
        Subcolección vacía.
      </span>
    );
  } else if (Array.isArray(value)) {
    return value.join(", ");
  } else if (typeof value === "object" && value !== null) {
    return <JsonTable parsedJson={value} />;
  } else if (value === true) {
    return <span style={{ fontFamily: "monospace", color: "red" }}>TRUE</span>;
  } else if (value === false) {
    return <span style={{ fontFamily: "monospace", color: "red" }}>FALSE</span>;
  } else if (value === null || value === undefined || value === "") {
    return (
      <span style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}>
        Info no disponible ni provista desde la herramienta.
      </span>
    );
  } else {
    return value;
  }
};

const JsonTable: React.FC<JsonTableProps> = ({ parsedJson }) => {
  const keys = Object.keys(parsedJson);

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {keys.map((key, index) => (
            <tr key={index}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  fontWeight: "bold",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {key}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {renderCellValue(parsedJson[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      &nbsp;
    </div>
  );
};

export default JsonTable;
