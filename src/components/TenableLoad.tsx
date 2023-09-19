import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

interface ParsedJson {
  keys: string[];
  data: object;
}

interface TenableLoadProps {
  onJsonParsed: (parsedJson: ParsedJson) => void;
}

const TenableLoad: React.FC<TenableLoadProps> = ({ onJsonParsed }) => {
  const [xyz, setXYZ] = useState("");
  const [yyy, setYYY] = useState("");
  const [zzz, setZZZ] = useState("");
  const [jsonParsed, setJsonParsed] = useState<object | null>(null); // State to store parsed JSON data

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get_plugin_info?xyz=${xyz}&yyy=${yyy}&zzz=${zzz}`
      );

      const jsonData = response.data;

      // Store parsed JSON data in state
      setJsonParsed(jsonData);

      // Invoke the onJsonParsed callback to pass data to the parent component
      onJsonParsed({ keys: Object.keys(jsonData), data: jsonData });
    } catch (error) {
      console.error("Error al traer la data.", error);
    }
  };

  const handleDownload = () => {
    if (jsonParsed) {
      // Create a Blob with the JSON data
      const blob = new Blob([JSON.stringify(jsonParsed, null, 2)], {
        type: "application/json",
      });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "Reporte_Plugin_" + xyz + ".json";
      a.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setXYZ("");
    setYYY("");
    setZZZ("");
    setJsonParsed(null); // Clear parsed JSON data
  };

  return (
    <>
      &nbsp;
      <div className="container text-center">
        <h5>Añadir Plugin con .JSON desde Tenable API</h5>
        &nbsp;
        <div className="row">
          <div className="col-2">
            <TextField
              label="PluginID"
              value={xyz}
              onChange={(e) => setXYZ(e.target.value)}
              fullWidth
            />
          </div>
          <div className="col-5">
            <TextField
              label="ACCESS Key"
              value={yyy}
              onChange={(e) => setYYY(e.target.value)}
              fullWidth
            />
          </div>
          <div className="col-5">
            <TextField
              label="SECRET Key"
              value={zzz}
              onChange={(e) => setZZZ(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={fetchData}
              style={{
                width: "80%",
              }}
            >
              Cargar Plugin
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-primary ms-2"
              type="button"
              onClick={handleDownload}
              style={{ width: "80%", borderColor: "blue" }}
            >
              Descargar Plugin
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-danger ms-2 clear-button"
              type="button"
              onClick={handleClear}
              style={{
                borderColor: "red",
                width: "80%",
              }}
            >
              Limpiar campos
            </button>
          </div>
        </div>
      </div>
      &nbsp;
    </>
  );
};

export default TenableLoad;
