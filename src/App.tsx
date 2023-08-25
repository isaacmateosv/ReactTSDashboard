import { useState } from "react";
import Navbar from "./components/Navbar";
import Fechas from "./components/Fechas";
import SimpleForm from "./components/SimpleForm";
import UploadJSONFile from "./components/UploadJSONFile";
import JsonTable from "./components/JsonTable"; // Import the new component
import PieChart from "./components/PieChart";

function App() {
  const [jsonData, setJsonData] = useState<ParsedJson | null>(null);

  const handleJsonParsed = (parsedJson: ParsedJson) => {
    // Handle the parsed JSON data by updating the state
    console.log("Parsed JSON data:", parsedJson);
    setJsonData(parsedJson);
  };

  return (
    <div>
      <Navbar />
      {/* <Fechas /> */}
      <SimpleForm />
      <UploadJSONFile onJsonParsed={handleJsonParsed} />
      {jsonData && <JsonTable parsedJson={jsonData} />} <PieChart />
    </div>
  );
}

export default App;
