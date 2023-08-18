import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const App: React.FC = () => {
  const [xyz, setXYZ] = useState("");
  const [yyy, setYYY] = useState("");
  const [zzz, setZZZ] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        // no funciona colocarle el proxy
        `http://localhost:5000/get_plugin_info?xyz=${xyz}&yyy=${yyy}&zzz=${zzz}`
      );

      // Create a Blob with the JSON data
      const jsonData = JSON.stringify(response.data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "Report_Plugin#" + xyz + ".json";
      a.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClear = () => {
    setXYZ("");
    setYYY("");
    setZZZ("");
  };

  return (
    <>
      <div class="container text-center">
        <h4>Reporte en .JSON</h4>
        <div class="row justify-content-evenly">
          <div class="col-2">
            <TextField
              label="PluginID"
              value={xyz}
              onChange={(e) => setXYZ(e.target.value)}
            />
          </div>
          <div class="col-3">
            <TextField
              label="ACCESS Key"
              value={yyy}
              onChange={(e) => setYYY(e.target.value)}
            />
          </div>
          <div class="col-3">
            <TextField
              label="SECRET Key"
              value={zzz}
              onChange={(e) => setZZZ(e.target.value)}
            />
          </div>
          <div class="col-2 my-auto">
            <Button variant="contained" onClick={handleSubmit}>
              Exportar
            </Button>
          </div>
          <div class="col-2 my-auto">
            <Button
              variant="contained"
              onClick={handleClear}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      &nbsp;
    </>
  );
};

export default App;
