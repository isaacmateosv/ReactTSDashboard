import React, { useState } from "react";

interface JsonUploaderProps {
  onFileUpload: (file: File) => void;
}

const JsonUploader: React.FC<JsonUploaderProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={() => document.querySelector("input[type='file']")?.click()}
      >
        Cargar archivo .JSON
      </button>
      {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
    </div>
  );
};

export default JsonUploader;
