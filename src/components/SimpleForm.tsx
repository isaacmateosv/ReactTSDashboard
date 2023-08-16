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
        `/get_plugin_info?xyz=${xyz}&yyy=${yyy}&zzz=${zzz}`
      );

      // Create a Blob with the JSON data
      const jsonData = JSON.stringify(response.data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "PluginInfo.json";
      a.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Prueba para obtener JSON</h1>
      <TextField
        label="XYZ"
        value={xyz}
        onChange={(e) => setXYZ(e.target.value)}
      />
      <TextField
        label="YYY"
        value={yyy}
        onChange={(e) => setYYY(e.target.value)}
      />
      <TextField
        label="ZZZ"
        value={zzz}
        onChange={(e) => setZZZ(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Export to JSON
      </Button>
    </div>
  );
};

export default App;
