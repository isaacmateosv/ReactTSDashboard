import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SimpleForm from "./components/SimpleForm";
import UploadJSONFile from "./components/UploadJSONFile";
import JsonTable from "./components/JsonTable";
import PieChart from "./components/PieChart";

function App() {
  const [parsedJson, setParsedJson] = useState(null);

  const handleJsonParsed = (parsedJsonData) => {
    // Handle the parsed JSON data by updating the state
    setParsedJson(parsedJsonData);
  };

  return (
    <div>
      <Navbar onJsonParsed={handleJsonParsed} />{" "}
      {/* Pass the handler as a prop */}
      {/* <Fechas /> */}
      <SimpleForm />
      <UploadJSONFile onJsonParsed={handleJsonParsed} />
      {parsedJson && <JsonTable parsedJson={parsedJson} />}
      <PieChart />
    </div>
  );
}

export default App;
