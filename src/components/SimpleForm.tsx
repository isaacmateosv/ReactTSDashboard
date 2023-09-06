import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const App: React.FC = () => {
  const [xyz, setXYZ] = useState("");
  const [yyy, setYYY] = useState("");
  const [zzz, setZZZ] = useState("");
  const [jsonData, setJsonData] = useState(""); // State to store parsed JSON data

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        // no funciona colocarle el proxy
        `http://localhost:5000/get_plugin_info?xyz=${xyz}&yyy=${yyy}&zzz=${zzz}`
      );

      // Store parsed JSON data in state
      setJsonData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error al traer la data:", error);
    }
  };

  const handleDownload = () => {
    // Create a Blob with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "Reporte_Plugin#" + xyz + ".json";
    a.click();

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setXYZ("");
    setYYY("");
    setZZZ("");
    setJsonData(""); // Clear parsed JSON data
  };

  return (
    <>
      <div className="container text-center">
        <h4>Añadir Plugin con .JSON desde Tenable API</h4>
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                backgroundColor: "green",
                color: "white",
                width: "100%",
              }}
            >
              Cargar Plugin
            </Button>
          </div>
          <div className="col">
            <Button
              variant="contained"
              onClick={handleDownload}
              style={{ width: "100%" }}
            >
              Descargar Plugin
            </Button>
          </div>
          <div className="col">
            <Button
              variant="contained"
              onClick={handleClear}
              style={{ backgroundColor: "red", color: "white", width: "100%" }}
            >
              Limpiar campos
            </Button>
          </div>
        </div>
      </div>
      &nbsp;
    </>
  );
};

export default App;
