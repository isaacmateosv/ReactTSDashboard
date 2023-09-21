/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface JsonTableProps {
  parsedJson: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

const JsonTable: React.FC<JsonTableProps> = ({ parsedJson }) => {
  const keys = Object.keys(parsedJson);

  const [tableRendered, setTableRendered] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCellValue = (key: string, value: any): React.ReactNode => {
    if (Array.isArray(value) && value.length === 0) {
      return (
        <span
          style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}
        >
          Info not available or provided by the tool. Empty array.
        </span>
      );
    } else if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return (
        <span
          style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}
        >
          Empty sub-collection.
        </span>
      );
    } else if (key === "owasp" || (key === "owasp" && Array.isArray(value))) {
      return (
        <ol>
          {value.map((item: any, index: number) => (
            <li key={index}>
              <div>
                <strong>Category:</strong> {item.category}
              </div>
              <div>
                <strong>Year:</strong> {item.year}
              </div>
            </li>
          ))}
        </ol>
      );
    } else if (Array.isArray(value)) {
      // Check if the property is "see_also1" or "see_also2"
      if (
        value === parsedJson["see_also"] ||
        value === parsedJson["Referencias"]
      ) {
        return (
          <ol style={{ listStyleType: "decimal" }}>
            {value.map((link: string, index: number) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ol>
        );
      } else {
        return value.join(", ");
      }
    } else if (typeof value === "object" && value !== null) {
      return <JsonTable parsedJson={value} />;
    } else if (value === true) {
      return (
        <span style={{ fontFamily: "monospace", color: "red" }}>TRUE</span>
      );
    } else if (value === false) {
      return (
        <span style={{ fontFamily: "monospace", color: "red" }}>FALSE</span>
      );
    } else if (value === null || value === undefined || value === "") {
      return (
        <span
          style={{ fontStyle: "italic", color: "#999", textAlign: "center" }}
        >
          Info not available or provided by the tool.
        </span>
      );
    } else {
      return value;
    }
  };

  const handleTableRender = () => {
    setTableRendered(true);
  };

  const handleUploadNowClick = () => {
    // Handle the "Upload Now" button click
    console.log("You selected Local Upload");
    // Replace with your actual functionality
  };

  return (
    <>
      {tableRendered && (
        <button onClick={handleUploadNowClick}>Upload Now</button>
      )}

      <div>
        <table
          style={{ borderCollapse: "collapse", width: "100%" }}
          onLoad={handleTableRender}
        >
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
                  {renderCellValue(key, parsedJson[key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JsonTable;
