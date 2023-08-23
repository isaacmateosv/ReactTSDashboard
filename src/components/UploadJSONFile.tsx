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
        onJsonParsed({ keys, data: jsonData });
      } catch (error) {
        console.error("Error leyendo el .JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div class="container text-center">
      <h4>Lectura de .JSON local</h4>
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
      &nbsp;
    </div>
  );
};

export default JsonUpload;
