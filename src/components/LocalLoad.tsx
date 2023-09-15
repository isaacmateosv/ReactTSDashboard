import React, { useState } from "react";
import Button from "@mui/material/Button";

interface ParsedJson {
  keys: string[];
  data: object;
}

interface JsonUploadProps {
  onJsonParsed: (parsedJson: ParsedJson) => void;
}

const JsonUpload: React.FC<JsonUploadProps> = ({ onJsonParsed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonObject, setJsonObject] = useState<object | null>(null); // Renamed state to jsonObject

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      parseJsonFile(file);
    }
  };

  const parseJsonFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const keys = Object.keys(jsonData);
        setJsonObject(jsonData); // Set the jsonData in the state
        onJsonParsed({ keys, data: jsonData });
      } catch (error) {
        console.error("Error leyendo el .JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      &nbsp;
      <div className="container text-center">
        <h4>Lectura de Plugins con .JSON local</h4>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          onClick={() => document.querySelector("input[type='file']")?.click()}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Carga local
        </Button>
        {selectedFile && <p>Archivo: {selectedFile.name}</p>}
        {/* Aquí me mostraría el texto al que se le hizo Parsing. */}
        {/* {jsonObject && <p>JSON Data: {JSON.stringify(jsonObject)}</p>} */}
      </div>
      &nbsp;
    </>
  );
};

export default JsonUpload;
