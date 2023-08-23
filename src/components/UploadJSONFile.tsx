import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRef } from "react";

interface UploadJSONFileProps {
  onFileUpload: (file: File) => void;
}

const UploadJSONFile: React.FC<UploadJSONFileProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      onFileUpload(file);

      // Save the file to the specified path
      const fileName = file.name;
      const filePath = `src/assets/uploads/${fileName}`;
      file.save(filePath);
    }
  };

  return (
    <div class="container text-center">
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        onClick={() => inputRef.current.click()}
        style={{ backgroundColor: "green", color: "white" }}
      >
        Cargar archivo .JSON
      </Button>
      {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadJSONFile;
