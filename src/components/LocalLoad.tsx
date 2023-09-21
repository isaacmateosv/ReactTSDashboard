import React, { useState } from "react";

interface ParsedJson {
  keys: string[];
  data: object;
}

interface JsonUploadProps {
  LocalJsonParsed: (parsedJson: ParsedJson) => void;
}

const LocalLoad: React.FC<JsonUploadProps> = ({ LocalJsonParsed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [jsonObject, setJsonObject] = useState<object | null>(null); // Renamed state to jsonObject

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      parseJsonFile(file);
    }
  };

  const handleClick = () => {
    const input = document.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;
    input.click();
  };

  const parseJsonFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const keys = Object.keys(jsonData);
        LocalJsonParsed({ keys, data: jsonData });
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
        <h5>Lectura de Plugins con .JSON local</h5>
        &nbsp;
        <div>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleClick}
            style={{ width: "25%" }}
          >
            Carga local
          </button>
        </div>
        &nbsp;
        {selectedFile && <p>Archivo: {selectedFile.name}</p>}
        {/* Aquí me mostraría el texto al que se le hizo Parsing. */}
        {/* {jsonObject && <p>JSON Data: {JSON.stringify(jsonObject)}</p>} */}
      </div>
      &nbsp;
    </>
  );
};

export default LocalLoad;
