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
        `http://127.0.0.1:5000/get_plugin_info?xyz=${xyz}&yyy=${yyy}&zzz=${zzz}`
      );
      const jsonData = JSON.stringify(response.data);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PluginInfo.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Plugin Info Exporter</h1>
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
