import React from "react";
import Navbar from "./components/Navbar";
import SimpleForm from "./components/SimpleForm";
import UploadJSONFile from "./components/UploadJSONFile";
import JsonTable from "./components/JsonTable"; // Import the new component
import PieChart from "./components/PieChart";

function App() {
  const [parsedJson, setParsedJson] = React.useState(null);

  const handleJsonParsed = (parsedJsonData) => {
    // Handle the parsed JSON data by updating the state
    console.log("Parsed JSON data:", parsedJson);
    setParsedJson(parsedJsonData);
  };

  return (
    <div>
      <Navbar />
      {/* <Fechas /> */}
      <SimpleForm />
      <UploadJSONFile onJsonParsed={handleJsonParsed} />
      {parsedJson && <JsonTable parsedJson={parsedJson} />} <PieChart />
    </div>
  );
}

export default App;
